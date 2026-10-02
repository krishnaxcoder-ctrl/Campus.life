import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { PostCard } from '@/components/cl/post-card';
import { ReportDialog } from '@/components/cl/report-dialog';
import { T } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';
import { useEventPosts } from '@/data/event-posts';

/** View Posts of an event: total count strip and the post cards. */
export default function EventPosts() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const posts = useEventPosts(id);
  const [reporting, setReporting] = useState(false);

  return (
    <View style={styles.flex}>
      <BackBar title="View Posts" />
      <View style={styles.total}>
        <T style={styles.totalText}>
          Total posts: {posts.length}/{posts.length}
        </T>
      </View>
      {posts.length ? (
        <ScrollView style={styles.flex} contentContainerStyle={styles.list}>
          {posts.map((p) => (
            <PostCard key={p.id} post={p} variant="event" onReport={() => setReporting(true)} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.empty}>
          <T style={styles.emptyText}>Sorry! no posts found.</T>
        </View>
      )}
      <ReportDialog visible={reporting} onClose={() => setReporting(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#F1F1F1' },
  total: { height: 39.2, justifyContent: 'center', paddingLeft: 9.5, backgroundColor: Colors.purple },
  totalText: { fontFamily: Fonts.os6, fontSize: 15.4, color: Colors.white },
  list: { paddingTop: 1, paddingBottom: 10 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontFamily: Fonts.os4, fontSize: 18.3, color: '#111111' },
});
