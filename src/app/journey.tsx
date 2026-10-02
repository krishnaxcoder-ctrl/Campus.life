import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { T } from '@/components/cl/text';
import { WebPage } from '@/components/cl/web-page';
import { Colors, Fonts, PURPLE } from '@/constants/cl';
import { type CheckIn, type JourneyItem, useJourney } from '@/data/user';

export default function Journey() {
  const { data: journey, error, reload } = useJourney();
  // undefined until the user toggles a card: the newest activity starts expanded.
  const [toggled, setToggled] = useState<string | null>();
  const items = journey?.items ?? [];
  const open = toggled === undefined ? items[0]?.id : toggled;

  return (
    <WebPage title="My Volunteer Journey" onRefresh={reload}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <T style={styles.heroTitle}>
            {'\u{1F3AF}'} My Volunteering Journey
          </T>
          <T style={styles.heroSub}>Track your volunteering activities, check-in times, and total hours served</T>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <FontAwesome6 name="clock" solid size={32.4} color={PURPLE} />
            <T style={styles.statNum}>{journey?.totalHours ?? '–'}</T>
            <T style={styles.statLabel}>TOTAL HOURS</T>
          </View>
          <View style={styles.stat}>
            <FontAwesome6 solid name="list-check" size={30} color={PURPLE} style={{ marginTop: 1.2 }} />
            <T style={styles.statNum}>{journey ? items.length : '–'}</T>
            <T style={styles.statLabel}>ACTIVITIES</T>
          </View>
        </View>

        <View style={styles.journey}>
          <View style={styles.journeyHead}>
            <FontAwesome6 solid name="clock-rotate-left" size={24} color={PURPLE} />
            <T style={styles.journeyTitle}>Your Journey</T>
          </View>
          {journey ? (
            items.map((item) => (
              <JourneyCard
                key={item.id}
                item={item}
                open={open === item.id}
                onToggle={() => setToggled(open === item.id ? null : item.id)}
              />
            ))
          ) : error ? (
            <T style={styles.status}>Couldn&apos;t load your journey. Tap refresh to try again.</T>
          ) : (
            <ActivityIndicator color={PURPLE} style={styles.loading} />
          )}
        </View>
      </ScrollView>
    </WebPage>
  );
}

function JourneyCard({ item, open, onToggle }: { item: JourneyItem; open: boolean; onToggle: () => void }) {
  const n = item.checkIns.length;
  return (
    <View style={styles.item}>
      <Pressable style={styles.itemHead} onPress={onToggle}>
        <LinearGradient colors={[Colors.gradStart, Colors.gradEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.leaf}>
          <FontAwesome6 solid name="leaf" size={22} color={Colors.white} />
        </LinearGradient>
        <View style={styles.itemText}>
          <T style={styles.itemTitle}>
            {item.title}{' '}
            <T style={styles.count}>
              {' '}
              {n} check-ins{' '}
            </T>
          </T>
          <View style={styles.dur}>
            <FontAwesome6 name="clock" solid size={13} color="#999999" />
            <T style={styles.durText}>{item.total}</T>
          </View>
        </View>
        <FontAwesome6 solid name={open ? 'chevron-up' : 'chevron-down'} size={17} color={PURPLE} style={styles.chev} />
      </Pressable>
      {open && (
        <View style={styles.checkins}>
          {item.checkIns.map((c, i) => (
            <CheckInBox key={i} index={i + 1} c={c} />
          ))}
        </View>
      )}
    </View>
  );
}

function CheckInBox({ index, c }: { index: number; c: CheckIn }) {
  const rows: [string, string][] = [
    ['CHECK-IN', c.checkIn],
    ['CHECK-OUT', c.checkOut],
    ['DURATION', c.duration],
  ];
  return (
    <View style={styles.box}>
      <T style={styles.boxTitle}>CHECK-IN #{index}</T>
      {rows.map(([k, v]) => (
        <View key={k}>
          <T style={styles.boxLabel}>{k}</T>
          <T style={styles.boxValue}>{v}</T>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 9.9, paddingTop: 9.9, paddingBottom: 30 },

  hero: { paddingTop: 18.5, paddingBottom: 21, paddingHorizontal: 20, borderRadius: 20, backgroundColor: Colors.white, alignItems: 'center' },
  heroTitle: { fontFamily: Fonts.pp7, fontSize: 20, lineHeight: 28, color: PURPLE },
  heroSub: { marginTop: 11.9, fontFamily: Fonts.pp4, fontSize: 16, lineHeight: 24, color: '#666666', textAlign: 'center' },

  stats: { marginTop: 19.8, flexDirection: 'row', columnGap: 15.2 },
  stat: { flex: 1, height: 136.4, paddingTop: 14.5, borderRadius: 20, backgroundColor: Colors.white, alignItems: 'center' },
  statNum: { marginTop: 13.5, fontFamily: Fonts.pp7, fontSize: 22, lineHeight: 30, color: '#333333' },
  statLabel: { marginTop: 3.5, fontFamily: Fonts.pp4, fontSize: 14.2, letterSpacing: 0.4, color: '#888888' },

  journey: { marginTop: 30.1, padding: 15.2, paddingBottom: 31, borderRadius: 20, backgroundColor: Colors.white },
  journeyHead: { flexDirection: 'row', alignItems: 'center', paddingLeft: 0, paddingTop: 5.8, marginBottom: 21 },
  journeyTitle: { marginLeft: 10.7, fontFamily: Fonts.pp7, fontSize: 23.8, lineHeight: 34, color: PURPLE },
  loading: { marginVertical: 20 },
  status: { marginVertical: 20, fontFamily: Fonts.pp4, fontSize: 14.2, lineHeight: 21, color: '#888888', textAlign: 'center' },

  item: { marginBottom: 16, borderWidth: 1.5, borderColor: '#EEEEEE', borderRadius: 16, overflow: 'hidden' },
  itemHead: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15.7, paddingVertical: 20 },
  leaf: { width: 50.3, height: 50.3, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  itemText: { flex: 1, marginLeft: 15.9 },
  itemTitle: { fontFamily: Fonts.pp7, fontSize: 17, lineHeight: 25, color: '#333333' },
  count: { fontFamily: Fonts.pp6, fontSize: 11.2, color: PURPLE, backgroundColor: '#EFE1FE' },
  dur: { marginTop: 4, flexDirection: 'row', alignItems: 'center' },
  durText: { marginLeft: 5.5, fontFamily: Fonts.pp4, fontSize: 13.1, color: '#888888' },
  chev: { marginLeft: 6 },

  checkins: { marginHorizontal: 15.7, paddingTop: 15.7, paddingBottom: 12, borderTopWidth: 1, borderTopColor: '#EEEEEE' },
  box: {
    marginBottom: 12.6,
    paddingHorizontal: 17,
    paddingTop: 15,
    paddingBottom: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E3E6F3',
    backgroundColor: '#F8F9FE',
  },
  boxTitle: { marginBottom: 7, fontFamily: Fonts.pp7, fontSize: 11.4, lineHeight: 18, letterSpacing: 0.3, color: PURPLE },
  boxLabel: { fontFamily: Fonts.pp6, fontSize: 10.9, lineHeight: 17, letterSpacing: 0.6, color: '#9E9E9E' },
  boxValue: { marginTop: 3, marginBottom: 9.5, fontFamily: Fonts.pp4, fontSize: 14.2, lineHeight: 21, color: '#333333' },
});
