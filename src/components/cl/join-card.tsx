import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, Keyboard, Modal, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { T, TInput } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';

/** "Have a Join code?" card. `popup` is the full-width version shown from Menu > Join Clubs/Events. */
export function JoinCard({ popup }: { popup?: boolean }) {
  const [code, setCode] = useState('');
  const join = () => {
    Keyboard.dismiss();
    Alert.alert('Campus.Life', code.trim() ? 'Invalid join code' : 'Please enter join code');
  };
  const g = popup ? popupGeo : cardGeo;
  return (
    <LinearGradient
      colors={[Colors.joinStart, Colors.joinStart, Colors.joinEnd]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={g.card}>
      <T style={[styles.title, g.title]}>Have a Join code? Please fill in to Join</T>
      <TInput
        value={code}
        onChangeText={setCode}
        placeholder="Enter Join Code"
        placeholderTextColor={Colors.white}
        style={[styles.input, g.input]}
        autoCapitalize="characters"
      />
      <Pressable style={[styles.btn, g.btn]} onPress={join}>
        <T style={styles.btnText}>Join</T>
      </Pressable>
    </LinearGradient>
  );
}

export function JoinPopup({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={[styles.dim, { paddingTop: insets.top }]} onPress={onClose}>
        <Pressable>
          <JoinCard popup />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: { position: 'absolute', fontFamily: Fonts.os4, fontSize: 14, color: Colors.white },
  input: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: Colors.white,
    paddingVertical: 0,
    textAlign: 'center',
    fontSize: 15,
    color: Colors.white,
  },
  btn: { position: 'absolute', backgroundColor: Colors.joinButton, alignItems: 'center', justifyContent: 'center' },
  btnText: { fontFamily: Fonts.os6, fontSize: 14.4, color: Colors.white },
  dim: { flex: 1, backgroundColor: Colors.overlay, justifyContent: 'center' },
});

// Geometry measured from the two screenshots.
const cardGeo = StyleSheet.create({
  card: { height: 110.5, marginTop: 9.5, marginBottom: 6.9, marginLeft: 6.5, marginRight: 7, borderRadius: 11.5 },
  title: { left: 20, top: 12.6 },
  input: { left: 20.2, right: 99.8, top: 45.8, height: 45.3, borderRadius: 22.7 },
  btn: { right: 19, top: 46.1, width: 67.4, height: 44.2, borderRadius: 4 },
});

const popupGeo = StyleSheet.create({
  card: { height: 145.1, borderRadius: 13.5 },
  title: { left: 13.5, top: 26.3 },
  input: { left: 20.3, right: 100.8, top: 59.2, height: 45, borderRadius: 22.5 },
  btn: { right: 19.8, top: 59.1, width: 67, height: 46.5, borderRadius: 4 },
});
