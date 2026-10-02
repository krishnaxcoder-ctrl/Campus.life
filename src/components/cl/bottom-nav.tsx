import { LinearGradient } from 'expo-linear-gradient';
import { Image, type ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { T } from '@/components/cl/text';
import { Colors, NAV_H } from '@/constants/cl';
import { Icon, Mask, px } from '@/constants/cl-assets';

export type TabKey = 'home' | 'campus' | 'add' | 'people' | 'menu';

type Item = { key: TabKey; label?: string; src: ImageSourcePropType; w: number; h: number; top: number; tint: boolean };

// Icon sizes/offsets measured from the screenshots (offset = from the top of the bar).
const ITEMS: Item[] = [
  { key: 'home', label: 'Home', src: Mask.navHome, w: px(74), h: px(64), top: 6.1, tint: true },
  { key: 'campus', label: 'My Campus', src: Mask.navCampus, w: px(74), h: px(52), top: 9.5, tint: true },
  { key: 'add', src: Icon.navAdd, w: px(90), h: px(90), top: 10.3, tint: false },
  { key: 'people', label: 'People', src: Mask.navPeople, w: px(74), h: px(58), top: 8.4, tint: true },
  { key: 'menu', label: 'Menu', src: Mask.navMenu, w: px(18), h: px(48), top: 7.6, tint: true },
];

export function BottomNav({ active, onPress }: { active: TabKey; onPress: (key: TabKey) => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { height: NAV_H + insets.bottom }]}>
      <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.16)']} style={styles.shadow} pointerEvents="none" />
      {ITEMS.map((it) => {
        const on = it.key === active;
        return (
          <Pressable key={it.key} style={styles.item} onPress={() => onPress(it.key)}>
            <Image
              source={it.src}
              style={[
                { position: 'absolute', top: it.top, width: it.w, height: it.h },
                it.tint && { tintColor: on ? Colors.purple : Colors.black },
              ]}
            />
            {it.label && (
              <T style={[styles.label, on ? styles.labelOn : styles.labelOff]} numberOfLines={1}>
                {it.label}
              </T>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', backgroundColor: Colors.white },
  shadow: { position: 'absolute', left: 0, right: 0, top: -3, height: 3 },
  item: { flex: 1, height: NAV_H, alignItems: 'center' },
  label: { position: 'absolute', left: 0, right: 0, textAlign: 'center' },
  labelOn: { top: 33.7, fontSize: 11.6, fontWeight: '700', color: Colors.purple },
  labelOff: { top: 35, fontSize: 10.1, color: '#1C1C1C' },
});
