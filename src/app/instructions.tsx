import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Fragment, type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { T } from '@/components/cl/text';
import { WebPage } from '@/components/cl/web-page';
import { Colors, Fonts, PURPLE } from '@/constants/cl';

const B = ({ children }: { children: ReactNode }) => <T style={styles.bold}>{children}</T>;

const POINTS_SIMPLE = [
  { label: 'Regular (4 years)', value: '100', bg: '#EDF3FF' },
  { label: 'Lateral Entry', value: '75', bg: '#F4F9FF' },
  { label: 'Transfers to 5th Sem', value: '50', bg: '#FFF6ED' },
];

const POINTS = [
  { label: 'REGULAR (4 YEARS)', value: '100', icon: 'graduation-cap', size: 25 },
  { label: 'LATERAL ENTRY', value: '75', icon: 'user-plus', size: 23 },
  { label: 'TRANSFER (5TH SEM)', value: '50', icon: 'right-left', size: 23 },
] as const;

const NEED: { icon: string; color: string; text: ReactNode }[] = [
  {
    icon: 'circle-check',
    color: '#4CAF50',
    text: (
      <>
        Complete activities worth the required points <B>before the 8th semester</B> Grade Card.
      </>
    ),
  },
  {
    icon: 'clock',
    color: '#4CAF50',
    text: (
      <>
        Each major activity is approximately <B>2 weeks</B> or <B>80–90 hours</B> of work.
      </>
    ),
  },
  {
    icon: 'star',
    color: '#4CAF50',
    text: (
      <>
        Maximum points from a single activity is capped at <B>20 points</B>.
      </>
    ),
  },
  { icon: 'calendar-days', color: '#4CAF50', text: 'Activities can be done anytime: during the semester, weekends, or holidays.' },
  {
    icon: 'circle-info',
    color: '#4CAF50',
    text: (
      <>
        Points do <B>NOT</B> affect your SGPA or CGPA, but are mandatory for the degree.
      </>
    ),
  },
  {
    icon: 'triangle-exclamation',
    color: '#FF9800',
    text: (
      <>
        Without the required activity points, <B>no degree will be issued</B>.
      </>
    ),
  },
];

const ACCEPTED = [
  'Teaching or helping school students',
  'Village development & income improvement',
  'Water management & waste systems',
  'Tourism promotion & awareness campaigns',
  'Digital literacy & cashless campaigns',
  'Rural skill training & women empowerment',
  'Swachh Bharat & National initiatives',
  'Rainwater harvesting awareness',
];

const STEPS = [
  'Maintain a simple activity summary sheet / report.',
  'Get validation from Faculty, NSS, or YRC coordinator.',
  'College compiles the data and sends the final report to VTU.',
];

export default function Instructions() {
  return (
    <WebPage title="Instructions">
      <ScrollView contentContainerStyle={styles.content}>
        {/* Section 1 */}
        <View style={styles.card}>
          <T style={styles.serif}>VTU AICTE Activity Points</T>
          <T style={[styles.h2, { marginTop: 24 }]}>Required Points</T>
          {POINTS_SIMPLE.map((p, i) => (
            <View key={p.label} style={[styles.simpleBox, { backgroundColor: p.bg, marginTop: i ? 29.7 : 38.6 }]}>
              <T style={styles.simpleLabel}>{p.label}</T>
              <T style={styles.simpleValue}>{p.value}</T>
            </View>
          ))}

          <T style={[styles.h2, styles.h2Gap]}>What You Actually Need To Do</T>
          <View style={styles.paras}>
            <T style={styles.p}>✔ Complete activities worth the required points before the 8th sem Grade Card.</T>
            <T style={styles.p}>
              ✔ Each activity = <B>2 weeks + 80–90 hours</B>.
            </T>
            <T style={styles.p}>
              ✔ Maximum you get from one activity = <B>20 points</B>.
            </T>
            <T style={styles.p}>✔ Activities can be done anytime: semester, weekends, or holidays.</T>
            <T style={styles.p}>✔ Points do NOT affect SGPA/CGPA.</T>
            <T style={styles.p}>✔ Without required points → No degree issued.</T>
          </View>

          <T style={[styles.h2, styles.h2Gap]}>Examples of Accepted Activities</T>
          <View style={styles.paras}>
            {[
              'Teaching/helping school students.',
              'Village development / income improvement tasks.',
              'Water management, cleanliness, waste systems.',
              'Tourism / awareness campaigns.',
              'Digital literacy, cashless transaction campaigns.',
              'Rural skill training, women empowerment clubs.',
              'National initiatives (Digital India, Skill India, Swachh Bharat).',
              'Rainwater harvesting awareness.',
            ].map((t) => (
              <T key={t} style={styles.p}>
                • {t}
              </T>
            ))}
          </View>

          <T style={[styles.h2, styles.h2Gap]}>Submission</T>
          <View style={styles.paras}>
            {[
              'Maintain a simple activity summary sheet.',
              'Get faculty/NSS/YRC validation.',
              'College compiles and sends final report to VTU.',
            ].map((t) => (
              <T key={t} style={styles.p}>
                • {t}
              </T>
            ))}
          </View>
        </View>

        {/* Section 2 */}
        <View style={[styles.card, styles.hero]}>
          <T style={styles.heroTitle}>{'\u{1F393}'} AICTE Activity Points</T>
          <T style={styles.heroSub}>Your simplified guide to earning activity points for your degree.</T>
        </View>

        <View style={styles.sectionHead}>
          <FontAwesome6 solid name="chart-pie" size={21} color="#111111" />
          <T style={[styles.h2, styles.onGradient]}>Required Points</T>
        </View>
        {POINTS.map((p) => (
          <View key={p.label} style={styles.pointCard}>
            <View style={styles.pointIcon}>
              <FontAwesome6 solid name={p.icon} size={p.size} color={Colors.gradStart} />
            </View>
            <View style={styles.pointText}>
              <T style={styles.pointValue}>{p.value}</T>
              <T style={styles.pointLabel}>{p.label}</T>
            </View>
          </View>
        ))}

        <View style={[styles.card, styles.blockCard]}>
          <View style={styles.blockHead}>
            <FontAwesome6 solid name="clipboard-check" size={24} color={PURPLE} />
            <T style={styles.blockTitle}>What You Need To Do</T>
          </View>
          {NEED.map((n, i) => (
            <View key={i} style={styles.need}>
              <FontAwesome6 solid name={n.icon} size={18} color={n.color} style={styles.needIcon} />
              <T style={styles.needText}>{n.text}</T>
            </View>
          ))}
        </View>

        <View style={[styles.card, styles.blockCard]}>
          <View style={styles.blockHead}>
            <FontAwesome6 solid name="list-check" size={22} color={PURPLE} />
            <T style={styles.blockTitle}>Accepted Activities</T>
          </View>
          {ACCEPTED.map((a) => (
            <View key={a} style={styles.accepted}>
              <View style={styles.dot} />
              <T style={styles.acceptedText}>{a}</T>
            </View>
          ))}
        </View>

        <LinearGradient colors={[Colors.gradStart, Colors.gradEnd]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.submit}>
          <View style={styles.submitHead}>
            <FontAwesome6 solid name="paper-plane" size={18} color={Colors.white} />
            <T style={styles.submitTitle}>Submission Process</T>
          </View>
          {STEPS.map((s, i) => (
            <Fragment key={s}>
              <View style={styles.step}>
                <View style={styles.stepNum}>
                  <T style={styles.stepNumText}>{i + 1}</T>
                </View>
                <T style={styles.stepText}>{s}</T>
              </View>
            </Fragment>
          ))}
        </LinearGradient>

        <T style={styles.footer}>Official VTU guidelines may update. Always check with your coordinator.</T>
      </ScrollView>
    </WebPage>
  );
}

const shadowText = { textShadowColor: 'rgba(0,0,0,0.18)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4 };

const styles = StyleSheet.create({
  content: { paddingHorizontal: 12.2, paddingTop: 48.4, paddingBottom: 30 },
  card: { borderRadius: 20, backgroundColor: Colors.white, paddingHorizontal: 27.8 },

  serif: { marginTop: 25, fontFamily: Fonts.pf7, fontSize: 32, lineHeight: 48, color: '#222222' },
  h2: { fontFamily: Fonts.pp6, fontSize: 20, lineHeight: 30, color: '#111111', ...shadowText },
  h2Gap: { marginTop: 36 },
  simpleBox: { height: 94.1, borderRadius: 14, alignItems: 'center', paddingTop: 10 },
  simpleLabel: { fontFamily: Fonts.pp4, fontSize: 16, lineHeight: 24, color: '#666666' },
  simpleValue: { marginTop: 2.7, fontFamily: Fonts.pp7, fontSize: 28, lineHeight: 42, color: Colors.primary },
  paras: { marginTop: 12.8, paddingBottom: 14 },
  p: { marginTop: 16, fontFamily: Fonts.pp4, fontSize: 16, lineHeight: 24, color: '#222222' },
  bold: { fontFamily: Fonts.pp7 },

  hero: { marginTop: 30, paddingTop: 30, paddingBottom: 40, alignItems: 'center' },
  heroTitle: { fontFamily: Fonts.pp7, fontSize: 24, lineHeight: 34, color: '#333333', textAlign: 'center' },
  heroSub: { marginTop: 10, fontFamily: Fonts.pp4, fontSize: 16, lineHeight: 24, color: '#666666', textAlign: 'center' },

  sectionHead: { marginTop: 27.5, flexDirection: 'row', alignItems: 'center', paddingLeft: 0.8 },
  onGradient: { marginLeft: 11.7, color: '#1A1A1A' },
  pointCard: { marginTop: 15.3, height: 93.3, borderRadius: 18, backgroundColor: Colors.white, flexDirection: 'row', alignItems: 'center' },
  pointIcon: { marginLeft: 14.8, width: 50, height: 50, borderRadius: 25, backgroundColor: '#F0F2FF', alignItems: 'center', justifyContent: 'center' },
  pointText: { marginLeft: 15.2 },
  pointValue: { fontFamily: Fonts.pp7, fontSize: 36, lineHeight: 40, color: '#333333' },
  pointLabel: { marginTop: 4.6, fontFamily: Fonts.pp5, fontSize: 13, lineHeight: 20, letterSpacing: 1, color: '#666666' },

  blockCard: { marginTop: 34.6, paddingHorizontal: 29.7, paddingTop: 25, paddingBottom: 30 },
  blockHead: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 22.6,
    marginBottom: 9.6,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  blockTitle: { marginLeft: 12, fontFamily: Fonts.pp6, fontSize: 20, lineHeight: 30, color: '#333333' },
  need: { marginTop: 16, marginLeft: 32, flexDirection: 'row', alignItems: 'flex-start', padding: 12, paddingVertical: 14, borderRadius: 12, backgroundColor: '#F8F9FE' },
  needIcon: { marginTop: 1.5, width: 20 },
  needText: { flex: 1, marginLeft: 13.6, fontFamily: Fonts.pp4, fontSize: 14.2, lineHeight: 21, color: '#555555' },
  accepted: {
    marginTop: 16,
    minHeight: 52.2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.gradStart },
  acceptedText: { flex: 1, marginLeft: 12.2, fontFamily: Fonts.pp4, fontSize: 14, lineHeight: 21, color: '#555555' },

  submit: { marginTop: 30.6, borderRadius: 20, paddingHorizontal: 24.8, paddingTop: 24, paddingBottom: 14.3 },
  submitHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  submitTitle: { marginLeft: 11, fontFamily: Fonts.pp6, fontSize: 18, lineHeight: 27, color: Colors.white },
  step: {
    marginTop: 10,
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  stepNum: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center' },
  stepNumText: { fontFamily: Fonts.pp7, fontSize: 12.3, lineHeight: 16, color: Colors.gradStart },
  stepText: { flex: 1, marginLeft: 11.4, fontFamily: Fonts.pp4, fontSize: 14, lineHeight: 21, color: Colors.white },

  footer: { marginTop: 33, marginHorizontal: 12, fontFamily: Fonts.pp4, fontSize: 12, lineHeight: 18, color: 'rgba(255,255,255,0.8)', textAlign: 'center' },
});
