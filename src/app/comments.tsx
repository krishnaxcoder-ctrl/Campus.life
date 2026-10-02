import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackBar } from '@/components/cl/app-bar';
import { T, TInput } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';
import { useProfile } from '@/data/user';

export default function Comments() {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const { data: profile } = useProfile();

  const send = () => {
    if (!text.trim()) return;
    setComments((c) => [...c, text.trim()]);
    setText('');
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <BackBar title="Comments" variant="regular" />
      <View style={styles.flex}>
        {comments.length === 0 ? (
          <View style={styles.empty}>
            <T style={styles.emptyText}>Sorry! no comments found</T>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.list}>
            {comments.map((c, i) => (
              <View key={i} style={styles.comment}>
                <T style={styles.commentName}>{profile?.name}</T>
                <T style={styles.commentText}>{c}</T>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <View style={[styles.bar, { marginBottom: 12.9 + insets.bottom }]}>
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.16)']} style={styles.shadow} pointerEvents="none" />
        <TInput
          value={text}
          onChangeText={setText}
          placeholder="Write a comment..."
          placeholderTextColor="#444444"
          multiline
          style={styles.input}
        />
        <Pressable onPress={send} hitSlop={8} style={styles.send}>
          <MaterialIcons name="send" size={31} color={Colors.purple} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#F4F4F4' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 76 },
  emptyText: { fontFamily: Fonts.os4, fontSize: 18.3, color: '#111111' },
  list: { padding: 12, rowGap: 10 },
  comment: { padding: 12, borderRadius: 8, backgroundColor: Colors.white },
  commentName: { fontFamily: Fonts.os6, fontSize: 13, color: '#111111' },
  commentText: { marginTop: 4, fontFamily: Fonts.os4, fontSize: 14, color: '#333333' },
  bar: { height: 88.2, backgroundColor: Colors.white },
  shadow: { position: 'absolute', left: 0, right: 0, top: -3, height: 3 },
  input: {
    position: 'absolute',
    left: 13,
    right: 57.1,
    top: 12.6,
    height: 65.1,
    paddingHorizontal: 12.4,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 8,
    backgroundColor: '#F2EEEE',
    textAlignVertical: 'top',
    fontFamily: Fonts.os4,
    fontSize: 15.7,
    color: '#222222',
  },
  send: { position: 'absolute', right: 13.4, top: 29.5 },
});
