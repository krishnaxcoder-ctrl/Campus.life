import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { T } from '@/components/cl/text';
import { BAR_H, Colors, Fonts } from '@/constants/cl';
import { Img, px } from '@/constants/cl-assets';
import { type UserId, USERS } from '@/data/cl';

/** Another member's profile (opened from a post). */
export default function UserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = USERS[id as UserId] ?? USERS.khalander;
  const [following, setFollowing] = useState(false);

  const reportBlock = () =>
    Alert.alert('Report / Block', user.name, [
      { text: 'Report' },
      { text: 'Block', style: 'destructive' },
      { text: 'Cancel', style: 'cancel' },
    ]);

  return (
    <View style={styles.flex}>
      <BackBar
        title="Profile"
        right={
          <Pressable style={styles.reportBtn} onPress={reportBlock}>
            <T style={styles.reportText}>Report / Block</T>
          </Pressable>
        }
      />
      <View style={styles.top}>
        <Image source={Img[user.photo]} style={styles.avatar} />
        <T style={styles.name} numberOfLines={1}>
          {user.name}
        </T>
        {user.district && <T style={styles.district}>{user.district}</T>}

        <T style={[styles.count, { left: 10 }]}>0</T>
        <T style={[styles.countLabel, { left: 10.3 }]}>FOLLOWING</T>
        <View style={styles.countBar} />
        <T style={[styles.count, { left: 96.1 }]}>0</T>
        <T style={[styles.countLabel, { left: 96.4 }]}>FOLLOWERS</T>

        <Pressable style={styles.follow} onPress={() => setFollowing((v) => !v)}>
          <T style={styles.followText}>{following ? 'Unfollow' : 'Follow'}</T>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.feedBg },
  reportBtn: {
    position: 'absolute',
    right: 7.2,
    top: (BAR_H - 30.9) / 2,
    width: 111.2,
    height: 30.9,
    borderWidth: 1.5,
    borderColor: Colors.white,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportText: { fontFamily: Fonts.os4, fontSize: 13, color: Colors.white },
  top: { height: 142.7, backgroundColor: Colors.white },
  avatar: { position: 'absolute', left: 18.3, top: 18.3, width: px(178), height: px(178), borderRadius: px(178) / 2 },
  name: { position: 'absolute', left: 104.5, right: 16, top: 28.3, fontFamily: Fonts.os6, fontSize: 15.7, color: Colors.black },
  district: { position: 'absolute', left: 104.4, top: 56.4, fontFamily: Fonts.os4, fontSize: 13, color: '#222222' },
  count: { position: 'absolute', top: 104.1, fontFamily: Fonts.os4, fontSize: 14.7, color: Colors.purple },
  countLabel: { position: 'absolute', top: 124.8, fontFamily: Fonts.os4, fontSize: 12.3, color: '#555555' },
  countBar: { position: 'absolute', left: 83, top: 105.9, width: 1.1, height: 14.9, backgroundColor: '#555555' },
  follow: {
    position: 'absolute',
    right: 19.4,
    top: 104,
    minWidth: 57.1,
    height: 32.4,
    paddingHorizontal: 6,
    borderWidth: 1.5,
    borderColor: Colors.purple,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followText: { fontFamily: Fonts.os6, fontSize: 14.5, color: Colors.purple },
});
