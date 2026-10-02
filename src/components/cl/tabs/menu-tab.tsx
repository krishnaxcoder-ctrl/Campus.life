import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Fragment, type ReactNode, useState } from 'react';
import { Alert, Image, type ImageSourcePropType, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { MainBar } from '@/components/cl/app-bar';
import { JoinPopup } from '@/components/cl/join-card';
import { T } from '@/components/cl/text';
import { Colors } from '@/constants/cl';
import { Icon, Img, px } from '@/constants/cl-assets';
import { useProfile } from '@/data/user';

type Row = { label: string; icon?: ImageSourcePropType; node?: ReactNode; onPress?: () => void };

export function MenuTab() {
  const [join, setJoin] = useState(false);
  const { data: profile } = useProfile();
  const logout = () =>
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive' },
    ]);

  const sections: { title: string; rows: Row[] }[] = [
    {
      title: 'ACCOUNT',
      rows: [
        { label: 'My Activities', icon: Icon.menu.activities, onPress: () => router.push('/my-activities') },
        { label: 'My Rewards', icon: Icon.menu.rewards, onPress: () => router.push('/rewards') },
        { label: 'Join Clubs/Events', icon: Icon.menu.join, onPress: () => setJoin(true) },
      ],
    },
    {
      title: 'SUPPORT',
      rows: [
        { label: 'Terms & Privacy', icon: Icon.menu.terms, onPress: () => router.push('/terms') },
        { label: 'Contact Us', icon: Icon.menu.contact, onPress: () => router.push('/contact') },
        { label: 'Request a Quick Help', icon: Icon.menu.help, onPress: () => router.push('/quick-help') },
      ],
    },
    {
      title: 'SETTINGS',
      rows: [
        { label: 'App Instructions', icon: Icon.menu.instructions, onPress: () => router.push('/app-instructions') },
        {
          label: 'Offline Activities',
          node: <MaterialCommunityIcons name="cloud-off-outline" size={24} color={Colors.purple} />,
          onPress: () => router.push('/offline'),
        },
        {
          label: 'Logout',
          node: <MaterialCommunityIcons name="logout" size={24} color={Colors.purple} />,
          onPress: logout,
        },
      ],
    },
  ];

  return (
    <View style={styles.flex}>
      <JoinPopup visible={join} onClose={() => setJoin(false)} />
      <MainBar menu />
      <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
        <View style={styles.profile}>
          <Image source={Img.avatarMenu} style={styles.avatar} />
          <View style={styles.profileText}>
            <T style={styles.name} numberOfLines={1}>
              {profile?.name}
            </T>
            <T style={styles.member}>Member ID: {profile?.memberId}</T>
          </View>
        </View>
        {sections.map((s) => (
          <Fragment key={s.title}>
            <T style={styles.section}>{s.title}</T>
            <View style={styles.card}>
              {s.rows.map((r, i) => (
                <Pressable
                  key={r.label}
                  onPress={r.onPress}
                  android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
                  style={[styles.row, i > 0 && styles.rowSep]}>
                  <View style={styles.iconBox}>
                    {r.icon ? <Image source={r.icon} style={styles.icon} /> : r.node}
                  </View>
                  <T style={styles.rowText}>{r.label}</T>
                </Pressable>
              ))}
            </View>
          </Fragment>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.menuBg },
  content: { paddingHorizontal: 13.3, paddingTop: 14.9, paddingBottom: 24 },
  profile: {
    height: 81.5,
    borderRadius: 16,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 1px 4px rgba(0,0,0,0.10)',
  },
  avatar: { marginLeft: 20.6, width: px(110), height: px(110) },
  profileText: { flex: 1, marginLeft: 18.6, marginRight: 12 },
  name: { fontSize: 16.8, fontWeight: '700', color: Colors.black },
  member: { marginTop: 1, fontSize: 11.8, color: '#777777' },
  section: { marginTop: 25.2, marginBottom: 10.2, marginLeft: 9.7, fontSize: 13, color: '#6D6D72' },
  card: { borderRadius: 16, backgroundColor: Colors.white, overflow: 'hidden', boxShadow: '0px 1px 4px rgba(0,0,0,0.10)' },
  row: { height: 66.8, flexDirection: 'row', alignItems: 'center' },
  rowSep: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E6E6E6' },
  iconBox: { marginLeft: 19.5, width: px(80), height: px(80), alignItems: 'center', justifyContent: 'center' },
  icon: { width: px(80), height: px(80) },
  rowText: { marginLeft: 16.7, fontSize: 16.3, color: Colors.black },
});
