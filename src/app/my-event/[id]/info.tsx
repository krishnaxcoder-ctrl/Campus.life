import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { T } from '@/components/cl/text';
import { Colors } from '@/constants/cl';
import { Img } from '@/constants/cl-assets';
import { findMyEvent } from '@/data/cl';

/** Event Info web page: banner, title block and the detail cards. */
export default function EventInfo() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { event, index } = findMyEvent(id);
  const scroll = useRef<ScrollView>(null);
  const hero = Img.myEventHeroes[index];

  const open = (url: string) => Linking.openURL(url).catch(() => {});
  const openMaps = () => open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`);

  return (
    <View style={styles.flex}>
      <BackBar title="" web onRefresh={() => scroll.current?.scrollTo({ y: 0, animated: true })} />
      <ScrollView ref={scroll} style={styles.flex} contentContainerStyle={styles.content}>
        {/* The page shows the banner with background-size: cover in each box. */}
        <Image source={hero} resizeMode="cover" style={styles.hero} />
        <View style={styles.head}>
          <View style={styles.thumb}>
            <Image source={hero} resizeMode="cover" style={styles.thumbImg} />
          </View>
          <View style={styles.headText}>
            <T style={styles.title}>{event.title}</T>
            <View style={styles.status}>
              <T style={styles.statusText}>{'●'} {event.status}</T>
            </View>
            <LinearGradient colors={[Colors.gradStart, Colors.gradEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.category}>
              <T style={styles.categoryText}>{event.category}</T>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.institute}>
          <T style={styles.instituteText}>
            {'\u{1F3EB}'} {event.institute}
          </T>
        </View>

        <View style={[styles.card, styles.dateCard, { marginTop: 20.2 }]}>
          <T style={styles.label}>{'\u{1F4C5}'} START DATE</T>
          <T style={styles.date}>{event.starts}</T>
        </View>
        <View style={[styles.card, styles.dateCard, { marginTop: 13.3 }]}>
          <T style={styles.label}>{'\u{1F3C1}'} END DATE</T>
          <T style={styles.date}>{event.ends}</T>
        </View>
        <View style={[styles.card, styles.about]}>
          <T style={styles.label}>{'\u{1F4DD}'} ABOUT EVENT</T>
          <T style={styles.aboutText}>{event.about}</T>
        </View>

        <LinearGradient colors={[Colors.gradStart, Colors.gradEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.location}>
          <T style={styles.locLabel}>{'\u{1F4CD}'} EVENT LOCATION</T>
          <T style={styles.locTitle}>{event.location}</T>
          <T style={styles.locAddress}>{event.address}</T>
          <Pressable onPress={openMaps} style={styles.maps}>
            <T style={styles.mapsText}>{'\u{1F5FA}️'} Open in Maps</T>
          </Pressable>
        </LinearGradient>

        <View style={styles.contactRow}>
          <View style={[styles.card, styles.small, styles.inRow, styles.flex1]}>
            <T style={styles.label}>{'\u{1F464}'} POINT OF CONTACT</T>
            <T style={styles.value}>{event.contact}</T>
          </View>
          <View style={[styles.card, styles.small, styles.inRow]}>
            <T style={styles.label}>{'\u{1F4DE}'} CONTACT</T>
            <T style={[styles.value, styles.link]} onPress={() => open(`tel:${event.phone}`)}>
              {event.phone}
            </T>
          </View>
        </View>
        <View style={[styles.card, styles.small, { marginTop: 12.2 }]}>
          <T style={styles.label}>{'✉️'} EMAIL</T>
          <T style={[styles.value, styles.link]} onPress={() => open(`mailto:${event.email}`)}>
            {event.email}
          </T>
        </View>
      </ScrollView>
    </View>
  );
}

const PAD = 20.6;

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },
  flex1: { flex: 1 },
  content: { paddingBottom: 36.6 },

  hero: { width: '100%', height: 180.6 },
  head: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: PAD },
  thumb: {
    marginTop: -30.5,
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: Colors.white,
    boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
  },
  thumbImg: { width: 80, height: 80, borderRadius: 10 },
  headText: { flex: 1, marginLeft: 15.6, paddingTop: 24.7 },
  title: { fontSize: 18.7, lineHeight: 23.2, fontWeight: '700', color: '#222222' },
  status: {
    alignSelf: 'flex-start',
    marginTop: 0.5,
    marginLeft: 10.3,
    height: 27.4,
    paddingHorizontal: 12.2,
    borderRadius: 13.7,
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
  },
  statusText: { fontSize: 12.8, fontWeight: '700', color: '#2E7D32' },
  category: { marginTop: 6.5, paddingHorizontal: 11.4, paddingVertical: 4, borderRadius: 12 },
  categoryText: { fontSize: 12.6, lineHeight: 13.9, fontWeight: '600', color: Colors.white },

  institute: {
    alignSelf: 'flex-start',
    marginTop: 30.5,
    marginHorizontal: PAD,
    height: 25.9,
    paddingHorizontal: 11.8,
    borderRadius: 13,
    justifyContent: 'center',
    backgroundColor: '#E9F2FF',
  },
  instituteText: { fontSize: 13.4, fontWeight: '600', color: '#1565C0' },

  card: { marginHorizontal: PAD, borderRadius: 12, backgroundColor: '#F8FAFB' },
  dateCard: { height: 68.6, paddingTop: 13.7, alignItems: 'center' },
  label: { fontSize: 11.5, lineHeight: 16, fontWeight: '700', letterSpacing: 0.5, color: '#999999' },
  date: { marginTop: 4.8, fontSize: 15.5, lineHeight: 21, fontWeight: '700', color: '#333333' },
  about: { marginTop: 16.6, paddingHorizontal: 15.6, paddingTop: 14.1, paddingBottom: 15.8 },
  aboutText: { marginTop: 11.2, fontSize: 15.5, lineHeight: 21, color: '#333333' },

  location: {
    marginTop: 14.5,
    marginHorizontal: PAD,
    paddingHorizontal: PAD,
    paddingTop: 20.6,
    paddingBottom: 21.3,
    borderRadius: 12,
    boxShadow: '0px 4px 12px rgba(102,126,234,0.25)',
  },
  locLabel: { fontSize: 12, lineHeight: 16, fontWeight: '700', letterSpacing: 0.5, color: 'rgba(255,255,255,0.9)' },
  locTitle: { marginTop: 9.9, fontSize: 19, lineHeight: 25, fontWeight: '700', color: Colors.white },
  locAddress: { marginTop: 6.5, fontSize: 14.5, lineHeight: 20, color: 'rgba(255,255,255,0.85)' },
  maps: {
    alignSelf: 'flex-start',
    marginTop: 15.1,
    height: 36.2,
    paddingHorizontal: 21,
    borderRadius: 7.6,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  mapsText: { fontSize: 15, fontWeight: '700', color: Colors.gradStart },

  contactRow: { flexDirection: 'row', columnGap: 13.7, marginTop: 14.9, marginHorizontal: PAD },
  small: { height: 62, paddingHorizontal: 13.7, paddingTop: 11.4 },
  inRow: { marginHorizontal: 0 },
  value: { marginTop: 2.2, fontSize: 14.5, lineHeight: 20, color: '#222222' },
  link: { color: Colors.gradStart },
});
