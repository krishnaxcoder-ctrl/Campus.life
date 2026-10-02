import { Pressable, StyleSheet } from 'react-native';

import { EmptyPage } from '@/components/cl/empty-page';
import { T } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';

export default function MyActivities() {
  return (
    <EmptyPage title="My Activities" message="Sorry! no activities found." bg="#F4F4F4">
      <Pressable style={styles.retry}>
        <T style={styles.retryText}>RETRY</T>
      </Pressable>
    </EmptyPage>
  );
}

const styles = StyleSheet.create({
  retry: {
    marginTop: 13.8,
    width: 104,
    height: 45.3,
    borderRadius: 6,
    backgroundColor: '#EDC003',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 3px rgba(0,0,0,0.2)',
  },
  retryText: { fontFamily: Fonts.os6, fontSize: 14, color: Colors.white },
});
