import { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { T } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';
import { Img, px } from '@/constants/cl-assets';

const KINDS = ['Trophies', 'Gifts', 'Coupons'];

export default function Rewards() {
  const [tab, setTab] = useState(0);

  return (
    <View style={styles.flex}>
      <BackBar title="Your winnings so far" />
      <View style={styles.line} />
      <View style={styles.summary}>
        <View style={styles.cols}>
          {KINDS.map((k) => (
            <View key={k} style={styles.col}>
              <T style={styles.colTitle}>{k}</T>
              <T style={styles.colCount}>0</T>
            </View>
          ))}
        </View>
        <View style={[styles.divider, styles.div1]} />
        <View style={[styles.divider, styles.div2]} />
        <Image source={Img.giftRewards} style={styles.gift} />
      </View>
      <View style={styles.tabs}>
        {KINDS.map((k, i) => (
          <Pressable key={k} style={[styles.tab, i < 2 ? styles.tabFixed : styles.tabRest]} onPress={() => setTab(i)}>
            <T style={[styles.tabText, tab === i && styles.tabTextOn]}>{k}</T>
            {tab === i && <View style={styles.indicator} />}
          </Pressable>
        ))}
      </View>
      <View style={styles.body}>
        <Image source={Img.emptyRewards} style={styles.emptyImg} />
        <T style={styles.emptyText}>No Rewards found</T>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#F4F0EF' },
  line: { height: 1, backgroundColor: '#8949BF' },
  summary: { height: 168.5, backgroundColor: '#6200C5' },
  cols: { flexDirection: 'row', paddingHorizontal: 12.8 },
  col: { flex: 1, alignItems: 'center' },
  colTitle: { marginTop: 15.5, fontFamily: Fonts.os6, fontSize: 18, color: Colors.white },
  colCount: { marginTop: 9.9, fontFamily: Fonts.os6, fontSize: 22.7, color: Colors.white },
  divider: { position: 'absolute', top: 50.8, height: 36.6, backgroundColor: Colors.white },
  div1: { left: '33.3%', marginLeft: 3.9, width: 1, opacity: 0.8 },
  div2: { left: '66.6%', marginLeft: -5.4, width: 2 },
  gift: { position: 'absolute', right: 12.2, top: 113.7, width: px(146), height: px(124) },
  tabs: { height: 42.3, flexDirection: 'row', backgroundColor: Colors.white },
  tab: { alignItems: 'center', justifyContent: 'center' },
  tabFixed: { width: 132.6 },
  tabRest: { flex: 1 },
  tabText: { fontFamily: Fonts.os6, fontSize: 15.4, color: '#555555' },
  tabTextOn: { color: '#424242' },
  indicator: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 2.7, backgroundColor: Colors.purple },
  body: { flex: 1, alignItems: 'center', paddingTop: 124.6 },
  emptyImg: { width: px(247), height: px(163) },
  emptyText: { marginTop: 13.8, fontFamily: Fonts.os4, fontSize: 19.3, color: '#111111' },
});
