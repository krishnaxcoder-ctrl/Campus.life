import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { FitImage } from '@/components/cl/fit-image';
import { Grid2 } from '@/components/cl/grid';
import { Colors } from '@/constants/cl';
import { Img } from '@/constants/cl-assets';
import { MY_EVENTS } from '@/data/cl';

export default function MyEvents() {
  return (
    <View style={styles.flex}>
      <BackBar title="My Events" variant="tight" />
      <ScrollView>
        <Grid2
          items={MY_EVENTS}
          keyOf={(name) => name}
          columnGap={21.4}
          rowGap={20.6}
          style={styles.grid}
          renderItem={(name, i) => (
            <Pressable accessibilityLabel={name} style={styles.tile}>
              <FitImage source={Img.myEvents[i]} ratio={467 / 418} />
            </Pressable>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },
  grid: { paddingHorizontal: 17.1, paddingTop: 18.7, paddingBottom: 30 },
  tile: { flex: 1, backgroundColor: Colors.white, boxShadow: '0px 2px 5px rgba(0,0,0,0.18)' },
});
