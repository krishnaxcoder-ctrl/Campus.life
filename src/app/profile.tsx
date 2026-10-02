import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { T } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';
import { Img, px } from '@/constants/cl-assets';
import { useProfile } from '@/data/user';

const TABS = ["I'm Following", 'My Followers', 'My Activities'];

export default function Profile() {
  const [tab, setTab] = useState(0);
  const { data: profile } = useProfile();

  return (
    <View style={styles.flex}>
      <BackBar title="Profile" people />
      <View style={styles.top}>
        <Image source={Img.avatarProfile} style={styles.avatar} />
        <T style={styles.name} numberOfLines={1} ellipsizeMode="clip">
          {profile?.name}
        </T>
        <T style={styles.member}>Member ID: {profile?.memberId}</T>
        <T style={styles.district}>Dakshina Kannada</T>

        <T style={[styles.count, { left: 10 }]}>0</T>
        <T style={[styles.countLabel, { left: 10 }]}>FOLLOWING</T>
        <View style={styles.countBar} />
        <T style={[styles.count, { left: 80.4 }]}>0</T>
        <T style={[styles.countLabel, { left: 80.4 }]}>FOLLOWERS</T>

        <Pressable style={styles.edit} onPress={() => router.push('/edit-profile')}>
          <T style={styles.editText}>Edit Profile</T>
        </Pressable>
      </View>

      <View style={styles.tabs}>
        {TABS.map((t, i) => (
          <Pressable key={t} style={styles.tab} onPress={() => setTab(i)}>
            <T style={styles.tabText}>{t}</T>
            {tab === i && <View style={styles.indicator} />}
          </Pressable>
        ))}
      </View>

      <View style={styles.empty}>
        <Image source={Img.emptyWhite} style={styles.emptyImg} />
        <T style={styles.emptyText}>No records found.</T>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },
  top: { height: 181 },
  avatar: { position: 'absolute', left: 18.3, top: 18.3, width: px(245), height: px(245), borderRadius: px(245) / 2 },
  name: { position: 'absolute', left: 130.8, right: 18, top: 26.3, fontFamily: Fonts.os6, fontSize: 19.5, color: Colors.black },
  member: { position: 'absolute', left: 130.3, top: 59.8, fontFamily: Fonts.os6, fontSize: 12.9, color: '#2196F3' },
  district: { position: 'absolute', left: 130.3, top: 84.1, fontFamily: Fonts.os4, fontSize: 13.1, color: '#222222' },
  count: { position: 'absolute', top: 136.5, fontFamily: Fonts.os4, fontSize: 14.7, color: Colors.purple },
  countLabel: { position: 'absolute', top: 156.9, fontFamily: Fonts.os4, fontSize: 9.9, color: '#444444' },
  countBar: { position: 'absolute', left: 69.3, top: 138.3, width: 1.1, height: 14.9, backgroundColor: '#555555' },
  edit: {
    position: 'absolute',
    right: 21.7,
    top: 137.9,
    width: 81.1,
    height: 30.9,
    borderWidth: 1.5,
    borderColor: Colors.purple,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editText: { fontFamily: Fonts.os6, fontSize: 12.9, color: Colors.purple },
  tabs: { height: 47.7, flexDirection: 'row', backgroundColor: Colors.purple },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabText: { fontFamily: Fonts.os6, fontSize: 12.9, color: Colors.white },
  indicator: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 3.8, backgroundColor: '#FED700' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 30 },
  emptyImg: { width: px(247), height: px(163) },
  emptyText: { marginTop: 13.7, fontFamily: Fonts.os4, fontSize: 19.3, color: '#111111' },
});
