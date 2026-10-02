import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { T, TInput } from '@/components/cl/text';
import { WebPage } from '@/components/cl/web-page';
import { Colors } from '@/constants/cl';
import { Img } from '@/constants/cl-assets';
import { CATEGORIES, CURRENT_EVENTS, CURRENT_TOTAL, type EventItem, INSTITUTE, UPCOMING_EVENTS } from '@/data/cl';

const PAGES = 10;

export default function Events() {
  const [tab, setTab] = useState<'current' | 'upcoming'>('current');
  const [q, setQ] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [picker, setPicker] = useState(false);
  const [page, setPage] = useState(1);
  const scroll = useRef<ScrollView>(null);

  const source = tab === 'current' ? CURRENT_EVENTS : UPCOMING_EVENTS;
  const filtered = source.filter(
    (e) =>
      (category === CATEGORIES[0] || e.category.toLowerCase() === category.toLowerCase()) &&
      e.title.toLowerCase().includes(q.trim().toLowerCase()),
  );
  const unfiltered = category === CATEGORIES[0] && !q.trim();
  const total = tab === 'current' && unfiltered ? CURRENT_TOTAL : filtered.length;

  const goPage = (p: number) => {
    setPage(p);
    scroll.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <WebPage title="Events" onRefresh={() => setPage(1)}>
      <ScrollView ref={scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.inst}>
          <Image source={Img.logoVtuSquare} style={styles.instLogo} />
          <T style={styles.instName}>{INSTITUTE}</T>
        </View>

        <View style={styles.filters}>
          <View style={styles.input}>
            <T style={styles.magnifier}>{'\u{1F50D}'}</T>
            <TInput
              value={q}
              onChangeText={setQ}
              placeholder="Search events..."
              placeholderTextColor="#757575"
              style={styles.inputText}
            />
          </View>
          <Pressable style={[styles.input, styles.select]} onPress={() => setPicker(true)}>
            <T style={styles.selectText} numberOfLines={1}>
              {category}
            </T>
            <Feather name="chevron-down" size={17.6} color="#333333" style={styles.selectChevron} />
          </Pressable>
        </View>

        <View style={styles.segment}>
          {(['current', 'upcoming'] as const).map((k) => {
            const on = tab === k;
            return (
              <Pressable key={k} style={[styles.segBtn, on && styles.segBtnOn]} onPress={() => setTab(k)}>
                <T style={[styles.segText, on && styles.segTextOn]}>{k === 'current' ? 'Current' : 'Upcoming'}</T>
                <View style={[styles.badge, { backgroundColor: k === 'current' ? Colors.success : Colors.orange }]}>
                  <T style={styles.badgeText}>{k === 'current' ? CURRENT_TOTAL : UPCOMING_EVENTS.length}</T>
                </View>
              </Pressable>
            );
          })}
        </View>

        <T style={styles.showing}>
          Showing {filtered.length} of {total} events
        </T>

        {filtered.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}

        {tab === 'current' && unfiltered && <Pager page={page} onPage={goPage} />}
      </ScrollView>

      <CategoryPicker
        visible={picker}
        value={category}
        onSelect={(c) => {
          setCategory(c);
          setPicker(false);
        }}
        onClose={() => setPicker(false)}
      />
    </WebPage>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const active = event.status === 'Active';
  return (
    <View style={styles.card}>
      <View style={styles.chip}>
        <T style={styles.chipText}>{event.category.toUpperCase()}</T>
      </View>
      <T style={styles.title}>{event.title}</T>
      <View style={[styles.datePill, styles.starts]}>
        <T style={[styles.dateText, { color: '#2E7D32' }]}>
          {'▶'} Starts: {event.starts}
        </T>
      </View>
      <View style={[styles.datePill, styles.ends]}>
        <T style={[styles.dateText, { color: Colors.orange }]}>
          {'\u{1F4C5}'} Ends: {event.ends}
        </T>
      </View>
      <T style={styles.desc} numberOfLines={2}>
        {event.description}
      </T>
      <View style={styles.cardFoot}>
        <View style={[styles.status, { backgroundColor: active ? Colors.success : Colors.primary }]}>
          <T style={styles.statusText}>{'●'} {event.status}</T>
        </View>
        <Pressable>
          <LinearGradient
            colors={[Colors.gradStart, Colors.gradEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.view}>
            <T style={styles.viewText}>View Details</T>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

function Pager({ page, onPage }: { page: number; onPage: (p: number) => void }) {
  const first = Math.min(Math.max(1, page - 2), PAGES - 4);
  const nums = [0, 1, 2, 3, 4].map((i) => first + i);
  return (
    <View style={styles.pager}>
      <View style={styles.pagerRow}>
        <Pressable disabled={page === 1} onPress={() => onPage(page - 1)} style={[styles.pill, styles.prev, page === 1 && styles.disabled]}>
          <T style={[styles.pillText, page === 1 && styles.disabledText]}>{'‹'} Previous</T>
        </Pressable>
        {nums.map((n) => (
          <Pressable key={n} onPress={() => onPage(n)} style={[styles.circle, n === page && styles.circleOn]}>
            <T style={[styles.pillText, n === page && { color: Colors.gradStart }]}>{n}</T>
          </Pressable>
        ))}
      </View>
      {page < PAGES && (
        <Pressable onPress={() => onPage(page + 1)} style={[styles.pill, styles.next]}>
          <T style={styles.pillText}>Next {'›'}</T>
        </Pressable>
      )}
      <T style={styles.pageOf}>
        Page {page} of {PAGES}
      </T>
    </View>
  );
}

function CategoryPicker({
  visible,
  value,
  onSelect,
  onClose,
}: {
  visible: boolean;
  value: string;
  onSelect: (c: string) => void;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.dim} onPress={onClose}>
        <Pressable style={styles.dialog}>
          <ScrollView>
            {CATEGORIES.map((c, i) => {
              const on = c === value;
              return (
                <Pressable key={c} onPress={() => onSelect(c)} style={[styles.option, i > 0 && styles.optionSep]}>
                  <T style={styles.optionText}>{c}</T>
                  <View style={[styles.radio, on && styles.radioOn]}>{on && <View style={styles.radioDot} />}</View>
                </Pressable>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20.2, paddingTop: 20.3, paddingBottom: 40 },

  inst: { height: 79.7, flexDirection: 'row', alignItems: 'center', borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)' },
  instLogo: { width: 79.7, height: 79.7, borderRadius: 12 },
  instName: { flex: 1, marginLeft: 19.8, marginRight: 10, fontSize: 18.4, lineHeight: 21.3, fontWeight: '700', color: Colors.white },

  filters: {
    marginTop: 29.9,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.white,
    boxShadow: '0px 4px 12px rgba(0,0,0,0.10)',
  },
  input: {
    height: 44.2,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 10,
  },
  magnifier: { marginLeft: 11, fontSize: 15.5, includeFontPadding: false },
  inputText: { flex: 1, marginLeft: 9.5, paddingVertical: 0, fontSize: 14, color: '#212121' },
  select: { marginTop: 12.2, height: 45.7 },
  selectText: { flex: 1, marginLeft: 19.7, fontSize: 14, color: Colors.black },
  selectChevron: { marginRight: 2.5 },

  segment: {
    marginTop: 20,
    height: 42.8,
    padding: 4,
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  segBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
  segBtnOn: { backgroundColor: Colors.white, boxShadow: '0px 2px 6px rgba(0,0,0,0.12)' },
  segText: { fontSize: 14.6, fontWeight: '600', color: 'rgba(255,255,255,0.7)' },
  segTextOn: { color: Colors.gradStart },
  badge: { marginLeft: 6, minWidth: 17.9, height: 15.2, paddingHorizontal: 5, borderRadius: 7.6, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 12, lineHeight: 15, fontWeight: '700', color: Colors.white },

  showing: { marginTop: 19.5, marginBottom: 13, fontSize: 14, color: 'rgba(255,255,255,0.9)' },

  card: {
    marginBottom: 12.6,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 19,
    paddingBottom: 17,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.gradStart,
    backgroundColor: Colors.white,
    boxShadow: '0px 4px 12px rgba(0,0,0,0.10)',
  },
  chip: { alignSelf: 'flex-start', height: 16.8, paddingHorizontal: 8, borderRadius: 8.4, backgroundColor: Colors.gradStart, justifyContent: 'center' },
  chipText: { fontSize: 10.9, lineHeight: 13, fontWeight: '700', color: Colors.white },
  title: { marginTop: 6.4, fontSize: 15.4, lineHeight: 19.6, fontWeight: '600', color: '#333333' },
  datePill: { alignSelf: 'flex-start', marginTop: 5.3, paddingHorizontal: 12, borderRadius: 13.4, borderWidth: 1.2, justifyContent: 'center' },
  starts: { height: 26.7, backgroundColor: '#E8F5E9', borderColor: '#A5D6A7' },
  ends: { marginTop: 9.1, height: 24.4, backgroundColor: '#FFF3E0', borderColor: '#FFCC80' },
  dateText: { fontSize: 13.5, fontWeight: '600' },
  desc: { marginTop: 6, fontSize: 12, lineHeight: 17, color: '#666666' },
  cardFoot: {
    marginTop: 11,
    paddingTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  status: { height: 21, paddingHorizontal: 10, borderRadius: 10.5, justifyContent: 'center' },
  statusText: { fontSize: 12.5, fontWeight: '700', color: Colors.white },
  view: { width: 81.1, height: 23.2, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  viewText: { fontSize: 11, fontWeight: '600', color: Colors.white },

  pager: { marginTop: 18.9, alignItems: 'center' },
  pagerRow: { flexDirection: 'row', alignItems: 'center', columnGap: 6.75 },
  pill: { height: 33.5, borderRadius: 16.75, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)', alignItems: 'center', justifyContent: 'center' },
  prev: { width: 95.4, marginRight: 1.8 },
  next: { marginTop: 9.5, width: 70.6 },
  disabled: { borderColor: 'rgba(255,255,255,0.25)' },
  disabledText: { color: 'rgba(255,255,255,0.35)' },
  pillText: { fontSize: 14, fontWeight: '700', color: Colors.white },
  circle: { width: 35, height: 35, borderRadius: 17.5, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)', alignItems: 'center', justifyContent: 'center' },
  circleOn: { backgroundColor: Colors.white, borderColor: Colors.white },
  pageOf: { marginTop: 9, fontSize: 11.4, color: 'rgba(255,255,255,0.8)' },

  dim: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  dialog: { width: '87%', maxHeight: '91.5%', backgroundColor: Colors.white, boxShadow: '0px 6px 20px rgba(0,0,0,0.3)' },
  option: { minHeight: 64.8, paddingVertical: 6, flexDirection: 'row', alignItems: 'center' },
  optionSep: { borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  optionText: { flex: 1, marginLeft: 12.6, marginRight: 14, fontSize: 22, lineHeight: 26, color: '#222222' },
  radio: { marginRight: 13.3, width: 19.3, height: 19.3, borderRadius: 9.65, borderWidth: 2, borderColor: '#666666', alignItems: 'center', justifyContent: 'center' },
  radioOn: { borderColor: '#7D60F5' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#7D60F5' },
});
