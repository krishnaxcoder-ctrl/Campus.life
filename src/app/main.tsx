import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ActivitySheet } from '@/components/cl/activity-sheet';
import { BottomNav, type TabKey } from '@/components/cl/bottom-nav';
import { CampusTab } from '@/components/cl/tabs/campus-tab';
import { HomeTab } from '@/components/cl/tabs/home-tab';
import { MenuTab } from '@/components/cl/tabs/menu-tab';
import { PeopleTab } from '@/components/cl/tabs/people-tab';

type Tab = Exclude<TabKey, 'add'>;

export default function Main() {
  const [tab, setTab] = useState<Tab>('home');
  const [sheet, setSheet] = useState(false);

  const onNav = (key: TabKey) => (key === 'add' ? setSheet(true) : setTab(key));
  // Tabs stay mounted so each keeps its scroll position and input, like the original.
  const pane = (key: Tab) => [styles.pane, tab !== key && styles.hidden];

  return (
    <View style={styles.flex}>
      <View style={styles.flex}>
        <View style={pane('home')}>
          <HomeTab onPostActivity={() => setSheet(true)} />
        </View>
        <View style={pane('campus')}>
          <CampusTab />
        </View>
        <View style={pane('people')}>
          <PeopleTab />
        </View>
        <View style={pane('menu')}>
          <MenuTab />
        </View>
      </View>
      <BottomNav active={tab} onPress={onNav} />
      <ActivitySheet visible={sheet} onClose={() => setSheet(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FFFFFF' },
  pane: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  hidden: { display: 'none' },
});
