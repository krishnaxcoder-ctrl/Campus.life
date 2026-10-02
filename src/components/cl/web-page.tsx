import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { Colors } from '@/constants/cl';

/** Shell for the web-based pages: back/refresh toolbar over a fixed 135deg purple gradient. */
export function WebPage({ title, children, onRefresh }: { title: string; children: ReactNode; onRefresh?: () => void }) {
  return (
    <View style={styles.flex}>
      <BackBar title={title} web onRefresh={onRefresh} />
      <View style={styles.flex}>
        <LinearGradient
          colors={[Colors.gradStart, Colors.gradEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
