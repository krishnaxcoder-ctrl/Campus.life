import { Image, type ImageSourcePropType, Linking, Pressable, StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { T } from '@/components/cl/text';
import { Colors } from '@/constants/cl';
import { Img, px } from '@/constants/cl-assets';

const ROWS: { icon: ImageSourcePropType; label: string; url: string }[] = [
  { icon: Img.contactWeb, label: 'https://station-s.com', url: 'https://station-s.com' },
  { icon: Img.contactMail, label: 'clservices@station-s.org', url: 'mailto:clservices@station-s.org' },
  { icon: Img.contactPhone, label: '+91 92475 71505', url: 'tel:+919247571505' },
];

export default function Contact() {
  return (
    <View style={styles.flex}>
      <BackBar title="Contact Us" variant="large" />
      <View style={styles.card}>
        {ROWS.map((r, i) => (
          <Pressable key={r.label} style={styles.row} onPress={() => Linking.openURL(r.url)}>
            <Image source={r.icon} style={styles.icon} />
            <T style={styles.label}>{r.label}</T>
            {i < ROWS.length - 1 && <View style={styles.sep} />}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FAFAFA' },
  card: { marginTop: 9.9, marginHorizontal: 6.3, borderRadius: 2, backgroundColor: Colors.white, boxShadow: '0px 1px 3px rgba(0,0,0,0.2)' },
  row: { height: 83.4, flexDirection: 'row', alignItems: 'center' },
  icon: { marginLeft: 24.2, width: px(60), height: px(60) },
  label: { marginLeft: 29.6, fontSize: 18.3, color: '#333333' },
  sep: { position: 'absolute', left: 65.3, right: 0, bottom: 0, height: StyleSheet.hairlineWidth, backgroundColor: '#DDDDDD' },
});
