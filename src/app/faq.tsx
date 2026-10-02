import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { T } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';
import { FAQS } from '@/data/cl';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <View style={styles.flex}>
      <BackBar title="FAQ" web onRefresh={() => setOpen(null)} />
      <ScrollView style={styles.flex}>
        <View style={styles.hero}>
          <View style={[styles.ring, { left: 119.7 - 90, top: 123 - 90, width: 180, height: 180, borderRadius: 90 }]} />
          <View style={[styles.ring, { left: 355.5 - 144, top: 69.3 - 144, width: 288, height: 288, borderRadius: 144 }]} />
          <T style={styles.heroTitle}>APTS FAQs</T>
        </View>

        <View style={styles.list}>
          {FAQS.map((f, i) => {
            const on = open === i;
            return (
              <Pressable key={f.q} style={styles.card} onPress={() => setOpen(on ? null : i)}>
                <View style={styles.badge}>
                  <T style={styles.badgeText}>Q{i + 1}</T>
                </View>
                <View style={styles.qa}>
                  <T style={styles.q}>{f.q}</T>
                  {on && <T style={styles.a}>{f.a}</T>}
                </View>
                <Feather name={on ? 'chevron-up' : 'chevron-down'} size={23} color="#999999" style={styles.chev} />
              </Pressable>
            );
          })}
        </View>

        <View style={styles.footer}>
          <T style={styles.need}>Need Additional Assistance?</T>
          <T style={styles.please}>
            Please contact your college coordinator for further support or to resolve any issues not covered in this FAQ.
          </T>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.faqBg },
  hero: { height: 135, backgroundColor: Colors.faqHero, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  ring: { position: 'absolute', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  heroTitle: { fontFamily: Fonts.sr7, fontSize: 38.2, color: Colors.white },

  list: { paddingHorizontal: 16, paddingTop: 32.3, paddingBottom: 61.7, rowGap: 11.8 },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 18,
    paddingBottom: 19.6,
    borderWidth: 1,
    borderColor: '#E6E4DF',
    borderRadius: 14,
    backgroundColor: Colors.white,
  },
  badge: {
    marginLeft: 16.8,
    marginTop: 1.8,
    width: 35,
    height: 22.9,
    borderWidth: 1,
    borderColor: '#EAE8E4',
    borderRadius: 4,
    backgroundColor: Colors.faqBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontFamily: Fonts.sr4, fontSize: 12, color: '#8A8A85' },
  qa: { flex: 1, marginLeft: 15.8, marginRight: 4 },
  q: { fontFamily: Fonts.sr4, fontSize: 14, lineHeight: 22.5, color: '#1A1A1A' },
  a: { marginTop: 8, fontFamily: Fonts.sr4, fontSize: 13.5, lineHeight: 22, color: '#555555' },
  chev: { marginTop: 1.2, marginRight: 14.4 },

  footer: {
    paddingTop: 48,
    paddingBottom: 50,
    paddingHorizontal: 36,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E9E8E4',
    alignItems: 'center',
  },
  need: { fontFamily: Fonts.sr5, fontSize: 12, lineHeight: 18, color: '#222222' },
  please: { marginTop: 3, fontFamily: Fonts.sr4, fontSize: 12, lineHeight: 21.2, color: '#666666', textAlign: 'center' },
});
