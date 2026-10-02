import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, FeGaussianBlur, Filter, G, Path, Text as SvgText } from 'react-native-svg';

import { StatusFill } from '@/components/cl/app-bar';
import { Colors, Fonts } from '@/constants/cl';

// Ported 1:1 from the Campus.Life splash HTML.
const LOGO_PATH =
  'M18.0899 66.1258V40.4447C18.0899 40.1155 17.902 39.8152 17.6059 39.6714L4.7824 33.4429C4.11292 33.1177 4.14493 32.1532 4.8345 31.8731L72.5715 4.36147C72.7775 4.27781 73.0079 4.2772 73.2143 4.35977L141.818 31.8013C142.539 32.0895 142.539 33.1095 141.818 33.3977L73.2036 60.8435C73.0036 60.9235 72.7808 60.9255 72.5793 60.849L38.3818 47.8705C37.8193 47.657 37.2171 48.0725 37.2171 48.6742V87.0402C37.2171 87.3891 37.428 87.7034 37.7509 87.8357L72.5705 102.099C72.7771 102.184 73.0084 102.185 73.2157 102.102L108.887 87.8332C109.214 87.7026 109.428 87.3865 109.428 87.035V69.0942C109.428 68.4916 108.824 68.076 108.261 68.2912L73.2058 81.6947C73.0044 81.7717 72.7814 81.7702 72.581 81.6904L52.9057 73.8627';

const LOGO_W = 160; // .logo-container svg { width: 160px }
const PAD = 15; // room for the drop-shadow blur, in viewBox units
const SCALE = LOGO_W / 147;
const TEXT_SIZE = 38.4; // 2.4rem
const TEXT_H = 52.5; // Manrope line box at 2.4rem

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvgText = Animated.createAnimatedComponent(SvgText);

const easeInOut = Easing.bezier(0.42, 0, 0.58, 1);
const easeOut = Easing.bezier(0, 0, 0.58, 1);

export default function Splash() {
  const dash = useSharedValue(1000);
  const reveal = useSharedValue(0);

  useEffect(() => {
    // .logo-path { animation: draw 2.5s ease-in-out forwards }
    dash.value = withTiming(0, { duration: 2500, easing: easeInOut });
    // .campus-life-text { animation: textReveal 0.8s ease-out 1.8s forwards }
    reveal.value = withDelay(1800, withTiming(1, { duration: 800, easing: easeOut }));
    const t = setTimeout(() => router.replace('/main'), 3000);
    return () => clearTimeout(t);
  }, [dash, reveal]);

  const pathProps = useAnimatedProps(() => ({ strokeDashoffset: dash.value }));
  const textProps = useAnimatedProps(() => ({ fillOpacity: reveal.value, strokeWidth: 1 - reveal.value }));
  const textStyle = useAnimatedStyle(() => ({
    opacity: reveal.value,
    transform: [{ translateY: 20 * (1 - reveal.value) }],
  }));

  return (
    <View style={styles.root}>
      <View style={styles.center}>
        <View style={styles.wrapper}>
          <Svg
            width={(147 + PAD * 2) * SCALE}
            height={(107 + PAD * 2) * SCALE}
            viewBox={`${-PAD} ${-PAD} ${147 + PAD * 2} ${107 + PAD * 2}`}
            style={{ margin: -PAD * SCALE }}>
            <Defs>
              {/* filter: drop-shadow(0px 4px 10px rgba(125, 96, 245, 0.2)) */}
              <Filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <FeGaussianBlur stdDeviation={5 / SCALE} />
              </Filter>
            </Defs>
            <G translateY={4 / SCALE} filter="url(#glow)">
              <AnimatedPath
                d={LOGO_PATH}
                stroke="rgba(125,96,245,0.2)"
                strokeWidth={8.59649}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={[1000, 1000]}
                animatedProps={pathProps}
              />
            </G>
            <AnimatedPath
              d={LOGO_PATH}
              stroke={Colors.splash}
              strokeWidth={8.59649}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={[1000, 1000]}
              animatedProps={pathProps}
            />
          </Svg>
          <Animated.View style={[styles.textWrap, textStyle]}>
            <Svg width={300} height={TEXT_H}>
              <AnimatedSvgText
                x={150}
                y={40.95}
                textAnchor="middle"
                fontFamily={Fonts.mr8}
                fontSize={TEXT_SIZE}
                letterSpacing={-0.5}
                fill={Colors.splash}
                stroke={Colors.splash}
                animatedProps={textProps}>
                Campus.Life
              </AnimatedSvgText>
            </Svg>
          </Animated.View>
        </View>
      </View>
      <View style={styles.statusBar}>
        <StatusFill />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },
  // Centered on the whole screen (100vh), the status bar strip is drawn on top.
  center: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  statusBar: { position: 'absolute', top: 0, left: 0, right: 0 },
  wrapper: { padding: 20, alignItems: 'center' },
  textWrap: { marginTop: 12, height: TEXT_H },
});
