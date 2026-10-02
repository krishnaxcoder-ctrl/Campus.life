import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { Grid2 } from '@/components/cl/grid';
import { IconTile, type Tile } from '@/components/cl/icon-tile';
import { Colors } from '@/constants/cl';
import { Mask } from '@/constants/cl-assets';

/** Photos & Videos of an event: upload a post or view the event's posts. */
export default function EventMedia() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const params = { id };
  const tiles: Tile[] = [
    {
      label: 'Upload',
      icon: Mask.event.upload,
      w: 185,
      h: 151,
      top: 32.4,
      dx: 5.3,
      onPress: () => router.push({ pathname: '/my-event/[id]/upload', params }),
    },
    {
      label: 'View Or Like',
      icon: Mask.event.view,
      w: 199,
      h: 152,
      top: 32.4,
      onPress: () => router.push({ pathname: '/my-event/[id]/posts', params }),
    },
  ];

  return (
    <View style={styles.flex}>
      <BackBar title="Photos & Videos" />
      <Grid2
        items={tiles}
        keyOf={(t) => t.label}
        columnGap={28.2}
        rowGap={0}
        style={styles.grid}
        renderItem={(t) => <IconTile tile={t} aspectRatio={169.9 / 151.2} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },
  grid: { paddingHorizontal: 21.7, paddingTop: 15.6 },
});
