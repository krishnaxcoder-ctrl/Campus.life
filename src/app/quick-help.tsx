import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { T } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';

const ISSUES = ['Unable to Join', 'Unable to Invite', 'Others'];

export default function QuickHelp() {
  const [issue, setIssue] = useState<string | null>(null);

  const submit = () => {
    if (!issue) {
      Alert.alert('Campus.Life', 'Please select an issue');
      return;
    }
    Alert.alert('Campus.Life', 'Your request has been submitted', [{ text: 'OK', onPress: () => router.back() }]);
  };

  return (
    <View style={styles.flex}>
      <BackBar title="Request a Quick Help" />
      <View style={styles.card}>
        <T style={styles.title}>Tell us about your issue</T>
        {ISSUES.map((it) => (
          <Pressable key={it} style={styles.option} onPress={() => setIssue(it)}>
            <View style={[styles.radio, issue === it && styles.radioOn]}>{issue === it && <View style={styles.dot} />}</View>
            <T style={styles.optionText}>{it}</T>
          </Pressable>
        ))}
        <Pressable style={styles.submit} onPress={submit}>
          <T style={styles.submitText}>SUBMIT</T>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FAFAFA' },
  card: {
    height: 239.5,
    marginTop: 13.1,
    marginHorizontal: 13,
    paddingTop: 18.6,
    borderRadius: 3,
    backgroundColor: Colors.white,
    boxShadow: '0px 1px 4px rgba(0,0,0,0.2)',
  },
  title: { marginLeft: 18.5, fontFamily: Fonts.os6, fontSize: 14.8, color: '#444444' },
  option: { height: 38.1, flexDirection: 'row', alignItems: 'center', marginLeft: 19 },
  radio: { width: 19.8, height: 19.8, borderRadius: 9.9, borderWidth: 2, borderColor: '#666666', alignItems: 'center', justifyContent: 'center' },
  radioOn: { borderColor: Colors.purple },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.purple },
  optionText: { marginLeft: 6, fontSize: 14.8, color: '#222222' },
  submit: {
    position: 'absolute',
    top: 174.7,
    alignSelf: 'center',
    width: 129.5,
    height: 48,
    borderRadius: 6,
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 3px rgba(0,0,0,0.2)',
  },
  submitText: { fontFamily: Fonts.os6, fontSize: 14, color: Colors.white },
});
