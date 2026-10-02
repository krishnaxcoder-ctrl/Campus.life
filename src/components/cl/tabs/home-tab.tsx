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
import { PostCard } from '@/components/cl/post-card';
import { ReportDialog } from '@/components/cl/report-dialog';
import { T } from '@/components/cl/text';
import { BAR_H, Colors, Fonts } from '@/constants/cl';
import { Img, px } from '@/constants/cl-assets';
import { POSTS } from '@/data/cl';

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

  clCard: { marginTop: 3, backgroundColor: Colors.white },
  clHead: { height: 63.7 },
  clAvatar: { position: 'absolute', left: 10.3, top: 13.8, width: px(99), height: px(99) },
  clName: { position: 'absolute', left: 58, top: 13.6, fontFamily: Fonts.os6, fontSize: 14.5, color: Colors.black },
  clDate: { position: 'absolute', left: 57.7, top: 38.4, fontFamily: Fonts.os4, fontSize: 10.2, color: '#7A7A7A' },
});
