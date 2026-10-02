import { StyleSheet } from 'react-native';

import { EmptyPage } from '@/components/cl/empty-page';

export default function Notifications() {
  return <EmptyPage title="Notifications" message="No Notifications found" bg="#FFFFFF" messageStyle={styles.message} />;
}

const styles = StyleSheet.create({
  // This screen uses the phone's system font instead of Open Sans.
  message: { fontFamily: undefined, fontSize: 18.9 },
});
