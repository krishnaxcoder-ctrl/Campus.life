import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Share, StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { FitImage } from '@/components/cl/fit-image';
import { Grid2 } from '@/components/cl/grid';
import { IconTile, type Tile } from '@/components/cl/icon-tile';
import { Colors } from '@/constants/cl';
import { Img, Mask } from '@/constants/cl-assets';
import { findMyEvent } from '@/data/cl';

/** Page of an event opened from My Events: banner + 2-column grid of actions. */
export default function MyEventPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { event, index } = findMyEvent(id);
  const params = { id: event.id };

  // The door icons sit left of the card centre in the original.
  const tiles: Tile[] = [
    {
      label: 'Event Info',
      icon: Mask.event.info,
      w: 154,
      h: 155,
      top: 32.8,
      onPress: () => router.push({ pathname: '/my-event/[id]/info', params }),
    },
    {
      label: 'Check-In',
      icon: Mask.event.checkIn,
      w: 124,
      h: 154,
      top: 32.4,
      dx: -5.3,
      onPress: () => router.push({ pathname: '/my-event/[id]/scan', params: { ...params, mode: 'in' } }),
    },
    {
      label: 'Check-Out',
      icon: Mask.event.checkOut,
      w: 123,
      h: 153,
      top: 32.4,
      dx: -4.8,
      onPress: () => router.push({ pathname: '/my-event/[id]/scan', params: { ...params, mode: 'out' } }),
    },
    {
      label: 'Photos & Videos',
      icon: Mask.event.photos,
      w: 177,
      h: 156,
      top: 32.4,
      onPress: () => router.push({ pathname: '/my-event/[id]/media', params }),
    },
    {
      label: 'Invite',
      icon: Mask.event.invite,
      w: 177,
      h: 155,
      top: 32.8,
      // No screenshot of the invite flow; share the event through the system sheet.
      onPress: () => Share.share({ message: `Join me at "${event.title}" on Campus.Life` }).catch(() => {}),
    },
    {
      label: 'Quick Help',
      icon: Mask.event.help,
      w: 165,
      h: 155,
      top: 32.4,
      onPress: () => router.push({ pathname: '/quick-help', params: { topic: 'club' } }),
    },
  ];

  return (
    <View style={styles.flex}>
      <BackBar title={event.title} menu />
      <ScrollView style={styles.flex}>
        <FitImage source={Img.myEventHeroes[index]} ratio={1080 / 546} />
        <Grid2
          items={tiles}
          keyOf={(t) => t.label}
          columnGap={25.9}
          rowGap={19.8}
          style={styles.grid}
          renderItem={(t) => <IconTile tile={t} aspectRatio={173.7 / 153.9} />}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },
  grid: { paddingHorizontal: 19.05, paddingTop: 13.7, paddingBottom: 40 },
});
