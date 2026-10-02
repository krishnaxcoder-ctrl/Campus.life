import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { T } from '@/components/cl/text';
import { Colors } from '@/constants/cl';

const REASONS = ['Duplicate activity', 'Incorrect activity mode', 'Add your own report'];

/** Dialog shown from a post's "Report" action. */
export function ReportDialog({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const [reason, setReason] = useState<string | null>(null);
  const close = () => {
    setReason(null);
    onClose();
  };
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={close}>
      <Pressable style={[styles.dim, { paddingTop: insets.top }]} onPress={close}>
        <Pressable style={styles.dialog}>
          {REASONS.map((r) => (
            <Pressable key={r} style={styles.row} onPress={() => setReason(r)}>
              <View style={[styles.radio, reason === r && styles.radioOn]}>{reason === r && <View style={styles.dot} />}</View>
              <T style={styles.label}>{r}</T>
            </Pressable>
          ))}
          <Pressable style={styles.submit} onPress={close}>
            <T style={styles.submitText}>Submit</T>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  dim: { flex: 1, backgroundColor: Colors.overlay, justifyContent: 'center', alignItems: 'center' },
  dialog: { width: 349.5, height: 200.9, paddingTop: 19.25, borderRadius: 8, backgroundColor: Colors.white },
  row: { height: 38.3, flexDirection: 'row', alignItems: 'center', paddingLeft: 22.5 },
  radio: { width: 20.2, height: 20.2, borderRadius: 10.1, borderWidth: 2, borderColor: '#555555', alignItems: 'center', justifyContent: 'center' },
  radioOn: { borderColor: Colors.purple },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.purple },
  label: { marginLeft: 6.8, fontSize: 14.3, color: '#111111' },
  submit: {
    position: 'absolute',
    top: 145.2,
    alignSelf: 'center',
    width: 129.4,
    height: 38.8,
    borderRadius: 4,
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: { fontSize: 14.2, color: Colors.white },
});
