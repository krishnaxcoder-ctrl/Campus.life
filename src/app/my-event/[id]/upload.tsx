import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, type ImageSourcePropType, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { goBack, StatusFill } from '@/components/cl/app-bar';
import { T, TInput } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';
import { Img, Mask, px } from '@/constants/cl-assets';
import type { PickedMedia } from '@/data/cl';
import { addEventPost } from '@/data/event-posts';
import { useProfile } from '@/data/user';

const MAX = 3000;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** New post for an event's Photos & Videos. Posts are kept for the session only. */
export default function UploadPost() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { data: profile } = useProfile();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [media, setMedia] = useState<PickedMedia | null>(null);

  const pick = async (type: 'image' | 'video') => {
    // iOS asks for library access up front for videos when editing is off.
    if (type === 'video' && Platform.OS === 'ios') {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: [type === 'image' ? 'images' : 'videos'], quality: 0.8 });
    if (res.canceled || !res.assets[0]) return;
    const a = res.assets[0];
    setMedia({ uri: a.uri, type: a.type === 'video' ? 'video' : type, width: a.width, height: a.height });
  };

  const post = () => {
    if (!title.trim() && !body.trim() && !media) return;
    addEventPost(id, {
      id: `u${Date.now()}`,
      user: { name: profile?.name ?? 'You', avatar: 'avatarPlaceholder', photo: 'avatarImagePlaceholder' },
      activity: title.trim(),
      date: formatDate(new Date()),
      body: body.trim(),
      media: media ?? undefined,
      long: body.trim().length > 90 || body.trim().split('\n').length > 2,
    });
    goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusFill />
      <View style={styles.head}>
        <Pressable onPress={goBack} hitSlop={12} style={styles.back}>
          <Image source={Mask.back} style={styles.backImg} />
        </Pressable>
        <Image source={Img.avatarPlaceholder} style={styles.avatar} />
        <Pressable onPress={post} style={styles.post}>
          <T style={styles.postText}>Post</T>
        </Pressable>
      </View>

      <ScrollView style={styles.flex} keyboardShouldPersistTaps="handled">
        <TInput value={title} onChangeText={setTitle} placeholder="Title" placeholderTextColor="#555555" style={styles.title} />
        <TInput
          value={body}
          onChangeText={setBody}
          placeholder="What do you want to talk about?"
          placeholderTextColor="#555555"
          multiline
          maxLength={MAX}
          style={styles.body}
        />
        <View style={styles.helpRow}>
          <T style={styles.help}>Text should not be more than 3000 characters</T>
          <T style={styles.counter}>
            {body.length} / {MAX}
          </T>
        </View>
        {media && (
          <View style={styles.preview}>
            {media.type === 'image' ? (
              <Image source={{ uri: media.uri }} resizeMode="cover" style={styles.previewMedia} />
            ) : (
              <View style={[styles.previewMedia, styles.video]}>
                <MaterialIcons name="play-circle-outline" size={48} color={Colors.white} />
              </View>
            )}
            <Pressable onPress={() => setMedia(null)} hitSlop={8} style={styles.remove}>
              <MaterialIcons name="close" size={18} color={Colors.white} />
            </Pressable>
          </View>
        )}
      </ScrollView>

      <View style={[styles.pickers, { paddingBottom: 24.8 + insets.bottom }]}>
        <Picker label="Photo" icon={Mask.event.photo} w={75} h={57} onPress={() => pick('image')} />
        <Picker label="Video" icon={Mask.event.video} w={79} h={51} onPress={() => pick('video')} />
      </View>
    </KeyboardAvoidingView>
  );
}

function Picker({ label, icon, w, h, onPress }: { label: string; icon: ImageSourcePropType; w: number; h: number; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.picker}>
      <View style={styles.circle}>
        <Image source={icon} style={{ width: px(w), height: px(h), tintColor: Colors.purple }} />
      </View>
      <T style={styles.pickerText}>{label}</T>
    </Pressable>
  );
}

// "02 Oct 2026 10:41 PM", like the post dates in the feed.
function formatDate(d: Date) {
  const p = (n: number) => String(n).padStart(2, '0');
  const h = d.getHours() % 12 || 12;
  return `${p(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()} ${p(h)}:${p(d.getMinutes())} ${d.getHours() < 12 ? 'AM' : 'PM'}`;
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },
  head: { height: 75, justifyContent: 'center' },
  back: { position: 'absolute', left: 24, top: (75 - px(54)) / 2 },
  backImg: { width: px(58), height: px(54), tintColor: Colors.black },
  avatar: { position: 'absolute', left: 77.3, top: (75 - 49.5) / 2, width: 49.5, height: 49.5, borderRadius: 24.75 },
  post: {
    position: 'absolute',
    right: 25.9,
    top: (75 - 45) / 2,
    width: 83,
    height: 45,
    borderRadius: 2.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purple,
  },
  postText: { fontFamily: Fonts.os6, fontSize: 15.7, color: Colors.white },

  title: {
    marginTop: 22.6,
    marginHorizontal: 16.8,
    height: 28,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderBottomWidth: px(2),
    borderBottomColor: '#666666',
    fontFamily: Fonts.os4,
    fontSize: 16,
    color: '#222222',
  },
  body: {
    marginTop: 23.8,
    marginHorizontal: 16.8,
    minHeight: 28,
    maxHeight: 220,
    paddingTop: 2,
    paddingBottom: 2,
    paddingHorizontal: 0,
    borderBottomWidth: px(2),
    borderBottomColor: '#666666',
    textAlignVertical: 'top',
    fontFamily: Fonts.os4,
    fontSize: 16,
    lineHeight: 22,
    color: '#222222',
  },
  helpRow: { flexDirection: 'row', alignItems: 'center', marginTop: 7.7, marginLeft: 20.6, marginRight: 20 },
  help: { flex: 1, fontSize: 13.4, lineHeight: 18, fontStyle: 'italic', color: '#757575' },
  counter: { marginLeft: 8, fontSize: 13.7, color: '#222222' },
  preview: { alignSelf: 'flex-start', marginTop: 18, marginLeft: 16.8 },
  previewMedia: { width: 160, height: 120, borderRadius: 6 },
  video: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#222222' },
  remove: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  pickers: { flexDirection: 'row', justifyContent: 'center', columnGap: 51.4 },
  picker: { width: 72, alignItems: 'center' },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
  },
  pickerText: { marginTop: 11.9, fontFamily: Fonts.os6, fontSize: 15.7, color: Colors.black },
});
