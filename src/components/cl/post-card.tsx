import { Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import { T } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';
import { Icon, Img, px } from '@/constants/cl-assets';
import { type Post, USERS } from '@/data/cl';

// Event "View Posts" photos have a fixed height and are cropped to the card width.
const EVENT_PHOTO_H = 235;

/**
 * A post with like / comment / report actions.
 * - 'feed': full-width posts of the Home feed
 * - 'event': inset cards of an event's View Posts screen (bigger subtitle, smaller action icons)
 */
export function PostCard({ post, onReport, variant = 'feed' }: { post: Post; onReport: () => void; variant?: 'feed' | 'event' }) {
  const win = useWindowDimensions();
  const [w, setW] = useState(win.width);
  const col = w / 3;
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const event = variant === 'event';
  const s = event ? ev : styles;
  const known = typeof post.user === 'string';
  const user = typeof post.user === 'string' ? USERS[post.user] : post.user;
  const openUser = () => {
    if (typeof post.user === 'string') router.push({ pathname: '/user/[id]', params: { id: post.user } });
  };

  return (
    <View style={s.post} onLayout={(e) => setW(e.nativeEvent.layout.width)}>
      <View style={s.postHead}>
        <Pressable onPress={openUser} disabled={!known} style={s.avatarBox}>
          <Image source={Img[user.avatar]} style={styles.avatar} />
        </Pressable>
        <T style={s.name} numberOfLines={1} onPress={known ? openUser : undefined}>
          {user.name}
        </T>
        <T style={s.activity} numberOfLines={1}>
          {post.activity}
        </T>
        <T style={s.date}>{post.date}</T>
      </View>
      {event ? <Photo post={post} width={w - 1.5} height={EVENT_PHOTO_H} inset={0.75} /> : <Photo post={post} width={w} />}
      <T style={[s.text, !post.long && s.textShort]} numberOfLines={open || !post.long ? undefined : 2}>
        {post.body}
      </T>
      {post.long && (
        <View style={styles.chevronRow}>
          <Pressable onPress={() => setOpen((v) => !v)} hitSlop={10} style={styles.chevron}>
            <Feather name={open ? 'chevron-up' : 'chevron-down'} size={24} color={Colors.purple} />
          </Pressable>
        </View>
      )}
      {event ? (
        // Fixed positions as a fraction of the card width, measured from the screenshot.
        <View style={ev.actions}>
          <Pressable style={[ev.action, { left: '3.75%' }]} onPress={() => setLiked((v) => !v)}>
            <Image source={Icon.like} style={ev.likeIcon} />
            <T style={ev.count} numberOfLines={1}>
              {liked ? 1 : 0} <T style={ev.label}>Like</T>
            </T>
          </Pressable>
          <Pressable style={[ev.action, { left: '43.9%' }]} onPress={() => router.push('/comments')}>
            <Image source={Icon.comment} style={ev.commentIcon} />
            <T style={[ev.count, { marginLeft: 25.2 }]} numberOfLines={1}>
              0
            </T>
          </Pressable>
          <Pressable style={[ev.action, { left: '78.2%' }]} onPress={onReport}>
            <Image source={Icon.report} style={ev.reportIcon} />
            <T style={[ev.label, { marginLeft: 15 }]} numberOfLines={1}>
              Report
            </T>
          </Pressable>
        </View>
      ) : (
        <View style={styles.actions}>
          {/* Three equal columns; content offset inside each column as in the original. */}
          <Pressable style={[styles.action, { paddingLeft: col * 0.236 }]} onPress={() => setLiked((v) => !v)}>
            <Image source={Icon.like} style={styles.likeIcon} />
            <T style={styles.count} numberOfLines={1}>
              {liked ? 1 : 0} <T style={styles.likeText}>Like</T>
            </T>
          </Pressable>
          <Pressable style={[styles.action, { paddingLeft: col * 0.247 }]} onPress={() => router.push('/comments')}>
            <Image source={Icon.comment} style={styles.commentIcon} />
            <T style={[styles.count, { marginLeft: 13 }]} numberOfLines={1}>
              0
            </T>
          </Pressable>
          <Pressable style={[styles.action, { paddingLeft: col * 0.175 }]} onPress={onReport}>
            <Image source={Icon.report} style={styles.reportIcon} />
            <T style={styles.report} numberOfLines={1}>
              Report
            </T>
          </Pressable>
        </View>
      )}
    </View>
  );
}

/** Photo crop from the screenshots, or media picked on the Upload screen (cover-cropped when a height is given). */
function Photo({ post, width, height, inset = 0 }: { post: Post; width: number; height?: number; inset?: number }) {
  if (post.photo) {
    const ratio = post.photo === 'postBeach' ? 1080 / 613 : post.photo === 'postBeach5' ? 1060 / 617 : 727 / 413;
    return <Image source={Img[post.photo]} style={{ width, height: height ?? width / ratio, marginHorizontal: inset }} />;
  }
  if (!post.media) return null;
  const h = height ?? width / (post.media.width / post.media.height || 16 / 9);
  if (post.media.type === 'image') return <Image source={{ uri: post.media.uri }} style={{ width, height: h, marginHorizontal: inset }} />;
  // Videos aren't played inline; show a placeholder frame.
  return (
    <View style={[styles.video, { width, height: h, marginHorizontal: inset }]}>
      <MaterialIcons name="play-circle-outline" size={64} color={Colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  post: { backgroundColor: Colors.white, marginBottom: 10.5 },
  postHead: { height: 68.9 },
  avatarBox: { position: 'absolute', left: 16.8, top: 16.4 },
  avatar: { width: px(117), height: px(117), borderRadius: px(117) / 2 },
  name: { position: 'absolute', left: 71.8, right: 16, top: 13.3, fontFamily: Fonts.os6, fontSize: 14, color: '#111111' },
  activity: { position: 'absolute', left: 71.8, right: 16, top: 33.8, fontFamily: Fonts.os6, fontSize: 10, color: '#111111' },
  date: { position: 'absolute', left: 71.6, top: 50.5, fontFamily: Fonts.os4, fontSize: 10, color: '#8A8A8A' },
  text: { marginTop: 20, marginHorizontal: 14, fontSize: 15, lineHeight: 19, color: '#222222' },
  textShort: { marginBottom: 20.3 },
  chevronRow: { height: 34 },
  chevron: { position: 'absolute', right: 7.1, top: 6.8 },
  actions: { height: 48.6, flexDirection: 'row', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#CFE9E6' },
  action: { flex: 1, flexDirection: 'row', alignItems: 'center', overflow: 'visible' },
  likeIcon: { width: px(100), height: px(88) },
  commentIcon: { width: px(94), height: px(88) },
  reportIcon: { width: px(80), height: px(80) },
  count: { marginLeft: 9, flexShrink: 0, fontSize: 13, color: '#111111' },
  likeText: { fontFamily: Fonts.os4, fontSize: 10.2, color: '#111111' },
  report: { marginLeft: 12.5, flexShrink: 0, fontFamily: Fonts.os4, fontSize: 12.3, color: '#111111' },
  video: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#222222' },
});

// Event variant: CardView inset 3dp from the screen edges.
const ev = StyleSheet.create({
  post: {
    marginHorizontal: 3,
    marginBottom: 5.7,
    borderRadius: 2,
    backgroundColor: Colors.white,
    boxShadow: '0px 1px 3px rgba(0,0,0,0.28)',
  },
  postHead: { height: 75.4 },
  avatarBox: { position: 'absolute', left: 7.2, top: 15.6 },
  name: { position: 'absolute', left: 65.9, right: 12, top: 9.7, fontFamily: Fonts.os7, fontSize: 14, color: '#111111' },
  activity: { position: 'absolute', left: 65.9, right: 12, top: 30.8, fontFamily: Fonts.os4, fontSize: 12.8, color: '#222222' },
  date: { position: 'absolute', left: 65.9, top: 51.9, fontFamily: Fonts.os4, fontSize: 11.5, color: '#333333' },
  text: { marginTop: 27.8, marginHorizontal: 14, fontSize: 15, lineHeight: 19, color: '#222222' },
  textShort: { marginBottom: 23.7 },
  actions: { height: 43.8, borderTopWidth: 1, borderTopColor: '#F3F3F3' },
  action: { position: 'absolute', top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center' },
  likeIcon: { width: 29, height: 25.5 },
  commentIcon: { width: 25.5, height: 23.9 },
  reportIcon: { width: 26.4, height: 26.4 },
  count: { marginLeft: 20.6, flexShrink: 0, fontFamily: Fonts.os4, fontSize: 12.3, color: '#111111' },
  label: { flexShrink: 0, fontFamily: Fonts.os4, fontSize: 11.4, color: '#111111' },
});
