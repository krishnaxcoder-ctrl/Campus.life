import { useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { FitImage } from '@/components/cl/fit-image';
import { Grid2 } from '@/components/cl/grid';
import { Colors } from '@/constants/cl';
import { SUB_CAMPUS } from '@/data/campus-pages';

/** Inner page of a My Campus tile: banner + 2-column grid of image tiles. */
export default function SubCampusPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const page = SUB_CAMPUS[id] ?? SUB_CAMPUS.zap;

  return (
    <View style={styles.flex}>
      <BackBar title={page.title} variant={page.variant} menu={page.menu} />
      <ScrollView style={styles.flex}>
        <FitImage source={page.banner} ratio={731 / 369} />
        <Grid2
          items={page.tiles}
          keyOf={(t) => t.name}
          columnGap={26.4}
          rowGap={page.rowGap}
          style={[styles.grid, { paddingTop: page.gridTop }]}
          renderItem={(t) => (
            <Pressable accessibilityLabel={t.name} style={styles.tile}>
              <FitImage source={t.image} ratio={307 / 272} />
            </Pressable>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },
  grid: { paddingHorizontal: 19.7, paddingBottom: 30 },
  tile: { flex: 1, backgroundColor: Colors.white, boxShadow: '0px 4px 10px rgba(70,50,150,0.14)' },
});
