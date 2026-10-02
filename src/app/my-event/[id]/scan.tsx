import { type BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useLocalSearchParams } from 'expo-router';
import { type ReactNode, useEffect, useState } from 'react';
import { Image, Linking, Modal, Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { goBack } from '@/components/cl/app-bar';
import { T, TInput } from '@/components/cl/text';
import { BAR_H, Colors, Fonts } from '@/constants/cl';
import { Mask, px } from '@/constants/cl-assets';

const VIEW = 260; // camera viewport size
const BRACKET = 3.4; // corner bracket thickness
const RADIUS = 11.4;

/** Check-In / Check-Out: QR scanner with a manual code entry. */
export default function Scan() {
  const { mode } = useLocalSearchParams<{ id: string; mode?: string }>();
  const out = mode === 'out';
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [manual, setManual] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  // Red scan line sweeping over the viewport.
  const sweep = useSharedValue(0);
  useEffect(() => {
    sweep.value = withRepeat(withTiming(VIEW - 2, { duration: 2000, easing: Easing.inOut(Easing.quad) }), -1, true);
  }, [sweep]);
  const laser = useAnimatedStyle(() => ({ transform: [{ translateY: sweep.value }] }));

  const onScanned = (r: BarcodeScanningResult) => setCode(r.data);

  return (
    <View style={styles.flex}>
      <View style={{ paddingTop: insets.top, backgroundColor: Colors.purple }}>
        <View style={styles.bar}>
          <Pressable onPress={goBack} hitSlop={12} style={styles.back}>
            <Image source={Mask.back} style={styles.backImg} />
          </Pressable>
          <T style={styles.title}>{out ? 'Checkout' : 'Checkin'}</T>
          <Pressable onPress={() => setManual(true)} style={styles.manual}>
            <T style={styles.manualText}>Manual Entry</T>
          </Pressable>
        </View>
      </View>

      <View style={styles.frameWrap}>
        <View style={styles.frame}>
          {permission?.granted ? (
            <CameraView
              style={StyleSheet.absoluteFill}
              facing="back"
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
              // Paused while a dialog is open so one code isn't reported repeatedly.
              onBarcodeScanned={code === null && !manual ? onScanned : undefined}
            />
          ) : (
            permission && (
              <View style={styles.permission}>
                <T style={styles.permissionText}>Allow camera access to scan the event QR code.</T>
                {permission.canAskAgain || Platform.OS === 'web' ? (
                  <Pressable style={styles.button} onPress={requestPermission}>
                    <T style={styles.buttonText}>Allow camera</T>
                  </Pressable>
                ) : (
                  <Pressable style={styles.button} onPress={() => Linking.openSettings()}>
                    <T style={styles.buttonText}>Open settings</T>
                  </Pressable>
                )}
              </View>
            )
          )}
          <Animated.View style={[styles.laser, laser]} pointerEvents="none" />
        </View>
        <View style={[styles.corner, styles.tl]} />
        <View style={[styles.corner, styles.tr]} />
        <View style={[styles.corner, styles.bl]} />
        <View style={[styles.corner, styles.br]} />
      </View>

      <ManualEntry
        visible={manual}
        onClose={() => setManual(false)}
        onSubmit={(c) => {
          setManual(false);
          setCode(c);
        }}
      />
      {/* Check-ins can't be recorded yet (the app has read-only access to the database). */}
      <Dialog visible={code !== null} title={out ? 'Check-Out' : 'Check-In'} onClose={() => setCode(null)}>
        <T style={styles.dialogText}>
          Code: {code}
          {'\n\n'}
          Recording {out ? 'check-outs' : 'check-ins'} isn&apos;t connected yet, so nothing was saved.
        </T>
        <Pressable style={styles.button} onPress={() => setCode(null)}>
          <T style={styles.buttonText}>OK</T>
        </Pressable>
      </Dialog>
    </View>
  );
}

function ManualEntry({ visible, onClose, onSubmit }: { visible: boolean; onClose: () => void; onSubmit: (code: string) => void }) {
  const [text, setText] = useState('');
  const close = () => {
    setText('');
    onClose();
  };
  const submit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText('');
  };
  return (
    <Dialog visible={visible} title="Manual Entry" onClose={close}>
      <TInput
        value={text}
        onChangeText={setText}
        placeholder="Enter event code"
        placeholderTextColor="#777777"
        autoFocus
        autoCapitalize="characters"
        onSubmitEditing={submit}
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={submit}>
        <T style={styles.buttonText}>Submit</T>
      </Pressable>
    </Dialog>
  );
}

/** White dialog in the style of the Report dialog. */
function Dialog({ visible, title, onClose, children }: { visible: boolean; title: string; onClose: () => void; children: ReactNode }) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.dim} onPress={onClose}>
        <Pressable style={styles.dialog}>
          <T style={styles.dialogTitle}>{title}</T>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.black },
  bar: { height: BAR_H, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A' },
  back: { position: 'absolute', left: px(44), top: (BAR_H - px(54)) / 2 },
  backImg: { width: px(58), height: px(54), tintColor: '#CCCCCC' },
  title: { marginLeft: 72.4, fontFamily: Fonts.os6, fontSize: 15.5, color: Colors.white },
  manual: {
    position: 'absolute',
    right: 15.2,
    top: (BAR_H - 42.7) / 2,
    width: 111,
    height: 42.7,
    borderRadius: 21.35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A2A2A2',
    boxShadow: '0px 0px 5px rgba(0,0,0,0.9)',
  },
  manualText: { fontFamily: Fonts.os4, fontSize: 14.5, color: '#111111' },

  frameWrap: { alignSelf: 'center', marginTop: 133.3, width: VIEW, height: VIEW },
  frame: { flex: 1, borderRadius: RADIUS, overflow: 'hidden', backgroundColor: '#111111' },
  laser: { position: 'absolute', left: 0, right: 0, top: 0, height: 1.2, backgroundColor: 'rgba(255,0,0,0.85)' },
  corner: { position: 'absolute', width: 57, height: 57, borderColor: Colors.purple },
  tl: { left: -BRACKET, top: -BRACKET, borderLeftWidth: BRACKET, borderTopWidth: BRACKET, borderTopLeftRadius: RADIUS + BRACKET },
  tr: { right: -BRACKET, top: -BRACKET, borderRightWidth: BRACKET, borderTopWidth: BRACKET, borderTopRightRadius: RADIUS + BRACKET },
  bl: { left: -BRACKET, bottom: -BRACKET, borderLeftWidth: BRACKET, borderBottomWidth: BRACKET, borderBottomLeftRadius: RADIUS + BRACKET },
  br: { right: -BRACKET, bottom: -BRACKET, borderRightWidth: BRACKET, borderBottomWidth: BRACKET, borderBottomRightRadius: RADIUS + BRACKET },

  permission: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  permissionText: { fontFamily: Fonts.os4, fontSize: 14, lineHeight: 20, color: '#DDDDDD', textAlign: 'center' },

  dim: { flex: 1, backgroundColor: Colors.overlay, justifyContent: 'center', alignItems: 'center' },
  dialog: { width: '85%', maxWidth: 349.5, paddingHorizontal: 22.5, paddingTop: 19.25, paddingBottom: 18, borderRadius: 8, backgroundColor: Colors.white },
  dialogTitle: { fontFamily: Fonts.os6, fontSize: 16, color: '#111111' },
  dialogText: { marginTop: 10, fontFamily: Fonts.os4, fontSize: 14.3, lineHeight: 20, color: '#333333' },
  input: {
    marginTop: 12,
    height: 40,
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#666666',
    fontFamily: Fonts.os4,
    fontSize: 15,
    color: '#222222',
  },
  button: {
    alignSelf: 'center',
    marginTop: 18,
    width: 129.4,
    height: 38.8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purple,
  },
  buttonText: { fontSize: 14.2, color: Colors.white },
});
