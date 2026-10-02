import { type Href, router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { MainBar } from '@/components/cl/app-bar';
import { FitImage } from '@/components/cl/fit-image';
import { Grid2 } from '@/components/cl/grid';
import { TInput } from '@/components/cl/text';
import { Colors } from '@/constants/cl';
import { Icon, Img, px } from '@/constants/cl-assets';
import { CAMPUS_TILES } from '@/data/cl';

const sub = (id: string): Href => ({ pathname: '/campus/[id]', params: { id } });
const TILE_ROUTES: Record<string, Href> = {
  zap: sub('zap'),
  siu: sub('siu'),
  sricity: sub('sricity'),
  vtu: '/campus-detail',
  word: sub('word'),
};

export function CampusTab() {
  const [q, setQ] = useState('');
  const tiles = CAMPUS_TILES.filter((t) => t.name.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <View style={styles.flex}>
      <MainBar />
      <View style={styles.search}>
        <Image source={Icon.searchCampus} style={styles.searchIcon} />
        <View style={styles.searchDivider} />
        <TInput
          value={q}
          onChangeText={setQ}
          placeholder="Search"
          placeholderTextColor="#757575"
          style={styles.searchInput}
        />
      </View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Grid2
          items={tiles}
          keyOf={(t) => t.id}
          columnGap={11.4}
          rowGap={11}
          style={styles.grid}
          renderItem={(t) => (
            <Pressable onPress={() => router.push(TILE_ROUTES[t.id])} style={styles.tile}>
              <FitImage source={Img.tiles[t.image]} ratio={493 / 439} imageStyle={styles.tileImg} />
            </Pressable>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },
  search: {
    height: 51.4,
    marginTop: 10.7,
    marginHorizontal: 6.5,
    borderRadius: 3,
    backgroundColor: Colors.white,
    boxShadow: '0px 1px 3px rgba(0,0,0,0.22)',
  },
  searchIcon: { position: 'absolute', left: 18.6, top: 14.8, width: px(56), height: px(56) },
  searchDivider: { position: 'absolute', left: 50.7, top: 6, bottom: 6, width: 1, backgroundColor: '#BDBDBD' },
  searchInput: { flex: 1, paddingLeft: 63.7, paddingVertical: 0, fontSize: 15, color: '#212121' },
  grid: { paddingHorizontal: 12.2, paddingTop: 20.6, paddingBottom: 20 },
  tile: { flex: 1, borderRadius: 2, backgroundColor: Colors.white, boxShadow: '0px 1px 3px rgba(0,0,0,0.22)' },
  tileImg: { borderRadius: 2 },
});
