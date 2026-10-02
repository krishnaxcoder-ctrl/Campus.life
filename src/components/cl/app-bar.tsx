import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Image, type ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { T } from '@/components/cl/text';
import { BAR_H, Colors, Fonts } from '@/constants/cl';
import { Mask, px } from '@/constants/cl-assets';

type BarIcon = { src: ImageSourcePropType; w: number; h: number; centerFromRight: number; onPress?: () => void };

function RightIcon({ src, w, h, centerFromRight, onPress }: BarIcon) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={[styles.rightIcon, { right: centerFromRight - w / 2, width: w, height: h, marginTop: -h / 2 }]}>
      <Image source={src} style={{ width: w, height: h, tintColor: Colors.white }} />
    </Pressable>
  );
}

/** Purple area painted behind the transparent status bar. */
export function StatusFill() {
  const insets = useSafeAreaInsets();
  return <View style={{ height: insets.top, backgroundColor: Colors.purple }} />;
}

/** "Campus.Life" toolbar used on the bottom-tab screens. */
export function MainBar({ menu, noInset }: { menu?: boolean; noInset?: boolean }) {
  const insets = useSafeAreaInsets();
  const onProfile = () => router.push('/profile');
  const onBell = () => router.push('/notifications');
  const profile = { src: Mask.profile, w: px(74), h: px(74) };
  const bell = { src: Mask.bell, w: px(60), h: px(68) };
  return (
    <View style={{ backgroundColor: Colors.purple, paddingTop: noInset ? 0 : insets.top }}>
      <View style={styles.bar}>
        <T style={styles.mainTitle}>Campus.Life</T>
        {menu ? (
          <>
            <RightIcon {...profile} centerFromRight={127.1} onPress={onProfile} />
            <RightIcon {...bell} centerFromRight={78.3} onPress={onBell} />
            <RightIcon
              src={Mask.group}
              w={px(74)}
              h={px(52)}
              centerFromRight={31.6}
              onPress={() => router.push('/friend-requests')}
            />
          </>
        ) : (
          <>
            <RightIcon {...profile} centerFromRight={73.5} onPress={onProfile} />
            <RightIcon {...bell} centerFromRight={24.8} onPress={onBell} />
          </>
        )}
      </View>
    </View>
  );
}

/**
 * Toolbar with a back arrow. Title styles seen in the app:
 * - 'tight': title right after the arrow (Campus detail, My Events)
 * - 'std': title at 72dp (most screens); `web` adds the refresh button of the web pages
 * - 'large': larger regular-weight title (Terms & Privacy, Contact Us, App Instructions)
 */
export function BackBar({
  title,
  web,
  variant = 'std',
  onRefresh,
  people,
  menu,
  right,
  noInset,
}: {
  title: string;
  web?: boolean;
  variant?: 'tight' | 'std' | 'large' | 'regular';
  onRefresh?: () => void;
  people?: boolean;
  menu?: boolean;
  right?: ReactNode;
  noInset?: boolean;
}) {
  const safe = useSafeAreaInsets();
  const insets = noInset ? { top: 0 } : safe;
  const titleStyle = {
    tight: styles.tightTitle,
    std: styles.stdTitle,
    large: styles.largeTitle,
    regular: styles.regularTitle,
  }[variant];
  return (
    <View style={[{ backgroundColor: Colors.purple, paddingTop: insets.top }, !web && !noInset && styles.elevated]}>
      <View style={styles.bar}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
          <Image source={Mask.back} style={styles.backImg} />
        </Pressable>
        <T numberOfLines={1} style={titleStyle}>
          {title}
        </T>
        {web && (
          <Pressable onPress={onRefresh} hitSlop={12} style={styles.refresh}>
            <Image source={Mask.refresh} style={styles.refreshImg} />
          </Pressable>
        )}
        {people && (
          <RightIcon
            src={Mask.group}
            w={px(74)}
            h={px(52)}
            centerFromRight={31.6}
            onPress={() => router.push('/friend-requests')}
          />
        )}
        {menu && <MaterialIcons name="more-vert" size={24} color={Colors.white} style={styles.more} />}
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { height: BAR_H, flexDirection: 'row', alignItems: 'center' },
  elevated: { zIndex: 2, boxShadow: '0px 2px 4px rgba(0,0,0,0.22)' },
  mainTitle: { marginLeft: 16, fontFamily: Fonts.os6, fontSize: 15, color: Colors.white },
  rightIcon: { position: 'absolute', top: BAR_H / 2 },
  back: { position: 'absolute', left: px(44), top: (BAR_H - px(54)) / 2 },
  backImg: { width: px(58), height: px(54), tintColor: Colors.white },
  tightTitle: { flex: 1, marginLeft: 53, marginRight: 9, fontFamily: Fonts.os6, fontSize: 15, color: Colors.white },
  stdTitle: { flex: 1, marginLeft: 72.4, marginRight: 48, fontFamily: Fonts.os6, fontSize: 15.5, color: Colors.white },
  largeTitle: { flex: 1, marginLeft: 71.5, marginRight: 16, fontSize: 21, color: Colors.white },
  regularTitle: { flex: 1, marginLeft: 72.4, marginRight: 16, fontFamily: Fonts.os4, fontSize: 15.7, color: Colors.white },
  refresh: { position: 'absolute', right: 9.8, top: (BAR_H - px(54)) / 2 },
  more: { position: 'absolute', right: 14.2, top: (BAR_H - 24) / 2 },
  refreshImg: { width: px(54), height: px(54), tintColor: Colors.white },
});
