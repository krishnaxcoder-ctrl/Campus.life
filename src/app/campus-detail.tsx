import { router, type Href } from 'expo-router';
import { Image, type ImageSourcePropType, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { FitImage } from '@/components/cl/fit-image';
import { Grid2 } from '@/components/cl/grid';
import { T } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';
import { Img, Mask, px } from '@/constants/cl-assets';
import { INSTITUTE } from '@/data/cl';

type Card = { label: string; icon: ImageSourcePropType; w: number; h: number; top: number; href: Href; highlight?: boolean };

// Icon crop sizes (px) and their offset from the card top (dp), measured from the screenshot.
const CARDS: Card[] = [
  { label: 'Events', icon: Mask.calendar, w: 166, h: 162, top: 31.8, href: '/events' },
  { label: 'My Events', icon: Mask.calendar, w: 166, h: 162, top: 31.8, href: '/my-events' },
  { label: 'My Volunteering Journey', icon: Mask.hands, w: 151, h: 162, top: 32, href: '/journey' },
  { label: 'Instructions', icon: Mask.instructions, w: 156, h: 162, top: 32, href: '/instructions' },
  { label: 'FAQs', icon: Mask.faq, w: 166, h: 147, top: 28.7, href: '/faq', highlight: true },
];

export default function CampusDetail() {
  return (
    <View style={styles.flex}>
      <BackBar title={INSTITUTE} variant="tight" />
      <ScrollView style={styles.flex}>
        <FitImage source={Img.bannerVtu} ratio={1080 / 546} />
        <Grid2
          items={CARDS}
          keyOf={(c) => c.label}
          columnGap={26.1}
          rowGap={26}
          style={styles.grid}
          renderItem={(c) => (
            <Pressable onPress={() => router.push(c.href)} style={styles.card}>
              {({ pressed }) => {
                const on = pressed || c.highlight;
                return (
                  <>
                    <Image
                      source={c.icon}
                      style={{ marginTop: c.top, width: px(c.w), height: px(c.h), tintColor: Colors.purple }}
                    />
                    {/* The label sits in a bottom strip that turns purple when active, so it grows with 2-line labels. */}
                    <View style={[styles.strip, on && styles.stripOn]}>
                      <T style={[styles.label, on && styles.labelOn]}>{c.label}</T>
                    </View>
                  </>
                );
              }}
            </Pressable>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },
  grid: { paddingHorizontal: 19.4, paddingTop: 19.3, paddingBottom: 40 },
  card: {
    flex: 1,
    aspectRatio: 173.2 / 154,
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.16)',
  },
  strip: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingTop: 10.55, paddingBottom: 12.85, paddingHorizontal: 4 },
  stripOn: { backgroundColor: Colors.purple },
  label: {
    textAlign: 'center',
    fontFamily: Fonts.mr7,
    fontSize: 17.8,
    lineHeight: 20,
    color: Colors.purple,
  },
  labelOn: { color: Colors.white },
});
