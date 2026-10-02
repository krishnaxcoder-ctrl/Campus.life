import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { FitImage } from '@/components/cl/fit-image';
import { Grid2 } from '@/components/cl/grid';
import { T, TInput } from '@/components/cl/text';
import { Colors } from '@/constants/cl';
import { Img } from '@/constants/cl-assets';

const TILES = [
  { name: 'Getting Started', img: Img.help.gettingStarted },
  { name: 'Campus Admin', img: Img.help.campusAdmin },
  { name: 'Clubs', img: Img.help.clubs },
  { name: 'Events', img: Img.help.events },
  { name: 'Announcements', img: Img.help.announcements },
  { name: 'Campus Directory', img: Img.help.campusDirectory },
  { name: 'My Courses', img: Img.help.myCourses },
  { name: 'My Schedule', img: Img.help.mySchedule },
];

export default function AppInstructions() {
  const [q, setQ] = useState('');
  const tiles = TILES.filter((t) => t.name.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <View style={styles.flex}>
      <BackBar title="App Instructions" variant="large" />
      <ScrollView style={styles.flex} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <T style={styles.title}>How can we help you today?</T>
        <TInput
          value={q}
          onChangeText={setQ}
          placeholder="Search for instructions..."
          placeholderTextColor="#777777"
          style={styles.search}
        />
        {tiles.length > 0 && (
          <Grid2
            items={tiles}
            keyOf={(t) => t.name}
            columnGap={11.4}
            rowGap={11.4}
            style={styles.container}
            renderItem={(t) => (
              <Pressable accessibilityLabel={t.name} style={styles.tile}>
                <FitImage source={t.img} ratio={466 / 469} />
              </Pressable>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#F8F9FE' },
  content: { paddingBottom: 24 },
  title: { marginTop: 37.7, textAlign: 'center', fontSize: 20, fontWeight: '500', color: '#222222' },
  search: {
    marginTop: 15.2,
    marginHorizontal: 15.6,
    height: 45.7,
    paddingLeft: 21,
    paddingVertical: 0,
    borderWidth: 2,
    borderColor: '#E5DAF5',
    borderRadius: 22.9,
    backgroundColor: Colors.white,
    fontSize: 15,
    color: '#222222',
  },
  container: { marginTop: 30.3, marginHorizontal: 12.2, padding: 9.5, borderRadius: 20, backgroundColor: Colors.white },
  tile: { flex: 1, borderRadius: 11, overflow: 'hidden' },
});
