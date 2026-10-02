import { ScrollView, StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { T } from '@/components/cl/text';
import { Colors } from '@/constants/cl';
import { TERMS, TERMS_UPDATED } from '@/data/terms';

export default function Terms() {
  return (
    <View style={styles.flex}>
      <BackBar title="Terms & Privacy" variant="large" />
      <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
        <T style={styles.updated}>{TERMS_UPDATED}</T>
        {TERMS.map((s, si) => (
          <View key={si} style={s.inset ? styles.inset : styles.normal}>
            {s.title && <T style={[styles.heading, si === 0 && styles.firstHeading]}>{s.title}</T>}
            {s.boxes.map((b, bi) => (
              <View key={bi} style={[styles.box, bi > 0 && styles.boxGap]}>
                <T style={styles.text}>{b.text}</T>
                {b.bullets?.map((li) => (
                  <View key={li} style={styles.li}>
                    <T style={styles.bullet}>{'•'}</T>
                    <T style={styles.text}>{li}</T>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },
  content: { paddingBottom: 30 },
  updated: { marginTop: 1, marginLeft: 16, fontSize: 14, lineHeight: 20, color: '#222222' },
  inset: { marginLeft: 29.7, marginRight: 30.7 },
  normal: { marginLeft: 14.5, marginRight: 15.4 },
  heading: { marginTop: 19, marginBottom: 21, marginLeft: 20.6, fontSize: 27, lineHeight: 39, color: '#222222' },
  firstHeading: { marginTop: 17.4 },
  box: { paddingVertical: 15, paddingHorizontal: 16.5, borderWidth: 1, borderColor: '#E3E3E3', borderRadius: 4 },
  boxGap: { marginTop: 20.7 },
  text: { flexShrink: 1, fontSize: 14, lineHeight: 20, color: '#333333' },
  li: { flexDirection: 'row' },
  bullet: { position: 'absolute', left: -11.8, fontSize: 14, lineHeight: 20, color: '#333333' },
});
