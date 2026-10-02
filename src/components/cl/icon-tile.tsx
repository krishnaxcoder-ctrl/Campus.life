import { Image, type ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';

import { T } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';
import { px } from '@/constants/cl-assets';

export type Tile = {
  label: string;
  icon: ImageSourcePropType;
  // Icon crop size (px), its offset from the card top (dp) and from the card centre (dp).
  w: number;
  h: number;
  top: number;
  dx?: number;
  onPress: () => void;
};

/** White card with a thin purple line icon and a label strip that turns purple while pressed (event pages). */
export function IconTile({ tile, aspectRatio }: { tile: Tile; aspectRatio: number }) {
  return (
    <Pressable onPress={tile.onPress} accessibilityLabel={tile.label} style={[styles.card, { aspectRatio }]}>
      {({ pressed }) => (
        <>
          <Image
            source={tile.icon}
            style={{
              marginTop: tile.top,
              width: px(tile.w),
              height: px(tile.h),
              tintColor: Colors.purple,
              transform: [{ translateX: tile.dx ?? 0 }],
            }}
          />
          <View style={[styles.strip, pressed && styles.stripOn]}>
            <T style={[styles.label, pressed && styles.labelOn]}>{tile.label}</T>
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    boxShadow: '0px 7px 15px rgba(80,40,150,0.2)',
  },
  strip: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingTop: 10.55, paddingBottom: 12.85, paddingHorizontal: 4 },
  stripOn: { backgroundColor: Colors.purple },
  label: { textAlign: 'center', fontFamily: Fonts.mr7, fontSize: 17.8, lineHeight: 20, color: Colors.purple },
  labelOn: { color: Colors.white },
});
