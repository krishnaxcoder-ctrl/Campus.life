import { useMemo, useState } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

import { MainBar, StatusFill } from '@/components/cl/app-bar';
import { T, TInput } from '@/components/cl/text';
import { BAR_H, Colors, Fonts } from '@/constants/cl';
import { Icon, px } from '@/constants/cl-assets';
import { PEOPLE } from '@/data/cl';

const AREA_H = 69.3;
const ROW_H = 57.9;

// The letter circle grows with the width of the letter, like the original.
function ringSize(letter: string) {
  if ('MW'.includes(letter)) return 35.6;
  if ('IJL'.includes(letter)) return 30.2;
  return 32.4;
}

export function PeopleTab() {
  const [q, setQ] = useState('');
  const [scrollY] = useState(() => new Animated.Value(0));
  const onScroll = useMemo(
    () => Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true }),
    [scrollY],
  );
  // Toolbar scrolls away with the list and comes back on scroll up (CoordinatorLayout behaviour).
  const translateY = useMemo(
    () =>
      Animated.diffClamp(
        scrollY.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolateLeft: 'clamp' }),
        0,
        BAR_H,
      ).interpolate({ inputRange: [0, BAR_H], outputRange: [0, -BAR_H] }),
    [scrollY],
  );
  const people = PEOPLE.filter((n) => n.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <View style={styles.flex}>
      <StatusFill />
      <View style={styles.flex}>
        <Animated.FlatList
          data={people}
          keyExtractor={(n) => n}
          contentContainerStyle={{ paddingTop: BAR_H + AREA_H }}
          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={16}
          onScroll={onScroll}
          renderItem={({ item }) => {
            const letter = item.charAt(0).toUpperCase();
            const size = ringSize(letter);
            return (
              <View style={styles.row}>
                <View style={[styles.ring, { width: size, height: size, borderRadius: size / 2 }]}>
                  <T style={styles.letter}>{letter}</T>
                </View>
                <T style={styles.name} numberOfLines={1}>
                  {item}
                </T>
              </View>
            );
          }}
        />
        <Animated.View style={[styles.top, { transform: [{ translateY }] }]}>
          <MainBar noInset />
          <View style={styles.area}>
            <View style={styles.pill}>
              <Image source={Icon.searchPeople} style={styles.icon} />
              <View style={styles.divider} />
              <TInput
                value={q}
                onChangeText={setQ}
                placeholder="Search here..."
                placeholderTextColor="#666666"
                style={styles.input}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },
  top: { position: 'absolute', left: 0, right: 0, top: 0 },
  area: { height: AREA_H, backgroundColor: '#FAFAFA' },
  pill: {
    position: 'absolute',
    left: 10.3,
    right: 10.2,
    top: 7.6,
    height: 51.8,
    borderRadius: 25.9,
    backgroundColor: Colors.white,
    boxShadow: '0px 1px 4px rgba(0,0,0,0.18)',
  },
  icon: { position: 'absolute', left: 20.9, top: 11.1, width: px(70), height: px(70) },
  divider: { position: 'absolute', left: 67.1, top: 1.4, bottom: 1.4, width: 1, backgroundColor: '#E0E0E0' },
  input: { flex: 1, paddingLeft: 80.1, paddingVertical: 0, fontFamily: Fonts.os4, fontSize: 17.7, color: '#212121' },
  row: {
    height: ROW_H,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8E8E8',
  },
  ring: {
    marginLeft: 13,
    borderWidth: 1.5,
    borderColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: { fontFamily: Fonts.os7, fontSize: 14.6, color: '#333333' },
  name: { flex: 1, marginLeft: 12.6, marginRight: 12, fontFamily: Fonts.os6, fontSize: 14, color: '#3A3A3A' },
});
