import { useEffect, useState } from 'react';
import { Animated, Easing, Image, Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { T } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';
import { Icon, px } from '@/constants/cl-assets';

const ROWS = [
  { label: 'Post', icon: Icon.act.post },
  { label: 'Walk', icon: Icon.act.walk },
  { label: 'Run', icon: Icon.act.run },
  { label: 'Cycle', icon: Icon.act.cycle },
  { label: 'Step', icon: Icon.act.step },
  { label: 'Surya Namaskar', icon: Icon.act.surya },
  { label: 'More', icon: Icon.act.more },
];

const HEAD_H = 52.2;
const ROW_H = 58.7;
const SHEET_H = HEAD_H + 1.1 + ROWS.length * ROW_H;

export function ActivitySheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const height = SHEET_H + insets.bottom;
  const [mounted, setMounted] = useState(visible);
  const [anim] = useState(() => new Animated.Value(0));
  // Mount immediately when opened; unmount only after the close animation finishes.
  if (visible && !mounted) setMounted(true);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: visible ? 1 : 0,
      duration: visible ? 250 : 200,
      easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !visible) setMounted(false);
    });
  }, [visible, anim]);

  return (
    <Modal visible={mounted} transparent statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.overlay, opacity: anim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      <Animated.View
        style={[
          styles.sheet,
          { height, transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [height, 0] }) }] },
        ]}>
        <View style={styles.head}>
          <T style={styles.title}>Select Activity</T>
        </View>
        <View style={styles.divider} />
        {ROWS.map((r) => (
          <Pressable
            key={r.label}
            onPress={onClose}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            style={styles.row}>
            <T style={styles.rowText}>{r.label}</T>
            <Image source={r.icon} style={styles.rowIcon} />
          </Pressable>
        ))}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: Colors.white },
  head: { height: HEAD_H, paddingTop: 12.9 },
  title: { marginLeft: 13, fontFamily: Fonts.os6, fontSize: 18.3, color: Colors.text },
  divider: { height: 1.1, backgroundColor: Colors.sheetDivider },
  row: {
    height: ROW_H,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EEEEEE',
  },
  rowText: { marginLeft: 13, fontFamily: Fonts.os6, fontSize: 13.2, color: Colors.text },
  rowIcon: { position: 'absolute', right: 3.8, top: (ROW_H - px(116)) / 2, width: px(130), height: px(116) },
});
