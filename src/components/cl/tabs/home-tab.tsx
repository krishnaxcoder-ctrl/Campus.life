import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import { MainBar, StatusFill } from '@/components/cl/app-bar';
import { JoinCard } from '@/components/cl/join-card';
import { ReportDialog } from '@/components/cl/report-dialog';
import { T } from '@/components/cl/text';
import { BAR_H, Colors, Fonts } from '@/constants/cl';
import { Icon, Img, px } from '@/constants/cl-assets';
import { POSTS, type Post, USERS } from '@/data/cl';

const TABS_H = 49.9;
const HEADER_H = BAR_H + TABS_H;

type ScrollHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => void;

export function HomeTab({ onPostActivity }: { onPostActivity: () => void }) {
  const win = useWindowDimensions();
  const [page, setPage] = useState(0);
  // Pages must have an explicit size, otherwise on web the feed grows and the whole page scrolls.
  const [size, setSize] = useState({ width: win.width, height: 0 });
  const pager = useRef<ScrollView>(null);

  // The toolbar slides away while scrolling down and comes back on scroll up;
  // the Following / My Activities tabs stay pinned (CoordinatorLayout behaviour).
  const [scrollY] = useState(() => new Animated.Value(0));
  const onFeedScroll = useMemo(
    () => Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true }) as ScrollHandler,
    [scrollY],
  );
  const translateY = useMemo(
    () =>
      Animated.diffClamp(
        scrollY.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolateLeft: 'clamp' }),
        0,
        BAR_H,
      ).interpolate({ inputRange: [0, BAR_H], outputRange: [0, -BAR_H] }),
    [scrollY],
  );

  const select = (i: number) => {
    setPage(i);
    pager.current?.scrollTo({ x: i * size.width, animated: true });
  };
  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPage(Math.round(e.nativeEvent.contentOffset.x / size.width));
  };
  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
    pager.current?.scrollTo({ x: page * width, animated: false });
  };

  return (
    <View style={styles.flex}>
      <StatusFill />
      <View style={styles.body} onLayout={onLayout}>
        {size.height > 0 && (
          <ScrollView
            ref={pager}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onScrollEnd}
            keyboardShouldPersistTaps="handled"
            style={size}>
            <View style={size}>
              <FollowingFeed onScroll={onFeedScroll} />
            </View>
            <View style={size}>
              <MyActivitiesFeed onPostActivity={onPostActivity} onScroll={onFeedScroll} />
            </View>
          </ScrollView>
        )}
        <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
          <MainBar noInset />
          <View style={styles.tabs}>
            {['Following', 'My Activities'].map((label, i) => {
              const on = page === i;
              return (
                <Pressable key={label} style={[styles.tab, on && styles.tabOn]} onPress={() => select(i)}>
                  <T style={[styles.tabText, on && styles.tabTextOn]}>{label}</T>
                  {on && <View style={styles.indicator} />}
                </Pressable>
              );
            })}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

function FollowingFeed({ onScroll }: { onScroll: ScrollHandler }) {
  const [reporting, setReporting] = useState(false);
  return (
    <>
      <Animated.ScrollView
        style={styles.feed}
        contentContainerStyle={styles.feedContent}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
        onScroll={onScroll}>
        <JoinCard />
        {POSTS.map((p) => (
          <PostCard key={p.id} post={p} onReport={() => setReporting(true)} />
        ))}
      </Animated.ScrollView>
      <ReportDialog visible={reporting} onClose={() => setReporting(false)} />
    </>
  );
}

function PostCard({ post, onReport }: { post: Post; onReport: () => void }) {
  const win = useWindowDimensions();
  const [w, setW] = useState(win.width);
  const col = w / 3;
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const user = USERS[post.user];
  const ratio = post.photo === 'postBeach' ? 1080 / 613 : 727 / 413;
  const openUser = () => router.push({ pathname: '/user/[id]', params: { id: post.user } });

  return (
    <View style={styles.post} onLayout={(e) => setW(e.nativeEvent.layout.width)}>
      <View style={styles.postHead}>
        <Pressable onPress={openUser} style={styles.avatarBox}>
          <Image source={Img[user.avatar]} style={styles.avatar} />
        </Pressable>
        <T style={styles.name} numberOfLines={1} onPress={openUser}>
          {user.name}
        </T>
        <T style={styles.activity} numberOfLines={1}>
          {post.activity}
        </T>
        <T style={styles.date}>{post.date}</T>
      </View>
      <Image source={Img[post.photo]} style={{ width: w, height: w / ratio }} />
      <T style={[styles.text, !post.long && styles.textShort]} numberOfLines={open || !post.long ? undefined : 2}>
        {post.body}
      </T>
      {post.long && (
        <View style={styles.chevronRow}>
          <Pressable onPress={() => setOpen((v) => !v)} hitSlop={10} style={styles.chevron}>
            <Feather name={open ? 'chevron-up' : 'chevron-down'} size={24} color={Colors.purple} />
          </Pressable>
        </View>
      )}
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
    </View>
  );
}

function MyActivitiesFeed({ onPostActivity, onScroll }: { onPostActivity: () => void; onScroll: ScrollHandler }) {
  const win = useWindowDimensions();
  const [w, setW] = useState(win.width);
  const bannerW = w - 5.4;
  return (
    <Animated.ScrollView style={styles.feed} contentContainerStyle={styles.feedContent} scrollEventThrottle={16} onScroll={onScroll}>
      <View style={styles.clCard} onLayout={(e) => setW(e.nativeEvent.layout.width)}>
        <View style={styles.clHead}>
          <Image source={Img.avatarCampusLife} style={styles.clAvatar} />
          <T style={styles.clName}>Campus.Life</T>
          <T style={styles.clDate}>{formatNow()}</T>
        </View>
        <Pressable onPress={onPostActivity}>
          <Image source={Img.bannerBeActive} style={{ width: bannerW, height: (bannerW * 678) / 1066, marginLeft: 2.7 }} />
        </Pressable>
      </View>
    </Animated.ScrollView>
  );
}

// "02-Oct-2026 at 01:37:45 pm"
function formatNow() {
  const d = new Date();
  const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
  const p = (n: number) => String(n).padStart(2, '0');
  const h = d.getHours() % 12 || 12;
  return `${p(d.getDate())}-${mon}-${d.getFullYear()} at ${p(h)}:${p(d.getMinutes())}:${p(d.getSeconds())} ${
    d.getHours() < 12 ? 'am' : 'pm'
  }`;
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.feedBg },
  body: { flex: 1, overflow: 'hidden' },
  header: { position: 'absolute', left: 0, right: 0, top: 0 },
  tabs: { flexDirection: 'row', height: TABS_H, backgroundColor: Colors.purple },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabOn: { backgroundColor: Colors.white },
  tabText: { fontSize: 15, color: Colors.white },
  tabTextOn: { color: Colors.black },
  indicator: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 1.1, backgroundColor: Colors.purple },
  feed: { flex: 1, backgroundColor: Colors.feedBg },
  feedContent: { paddingTop: HEADER_H },

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

  clCard: { marginTop: 3, backgroundColor: Colors.white },
  clHead: { height: 63.7 },
  clAvatar: { position: 'absolute', left: 10.3, top: 13.8, width: px(99), height: px(99) },
  clName: { position: 'absolute', left: 58, top: 13.6, fontFamily: Fonts.os6, fontSize: 14.5, color: Colors.black },
  clDate: { position: 'absolute', left: 57.7, top: 38.4, fontFamily: Fonts.os4, fontSize: 10.2, color: '#7A7A7A' },
});
