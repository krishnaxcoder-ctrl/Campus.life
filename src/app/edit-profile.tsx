import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackBar, StatusFill } from '@/components/cl/app-bar';
import { T, TInput } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';
import { Img } from '@/constants/cl-assets';
import { EDIT_PROFILE } from '@/data/cl';

type Values = typeof EDIT_PROFILE;
type Key = keyof Values;

export default function EditProfile() {
  const insets = useSafeAreaInsets();
  const [v, setV] = useState<Values>(EDIT_PROFILE);
  const [privateMode, setPrivateMode] = useState(false);
  const set = (k: Key) => (t: string) => setV((s) => ({ ...s, [k]: t }));

  const field = (k: Key, label: string, opts: Partial<FieldProps> = {}) => (
    <Field label={label} value={v[k]} onChangeText={set(k)} {...opts} />
  );

  return (
    <View style={styles.flex}>
      <StatusFill />
      <ScrollView style={styles.flex} keyboardShouldPersistTaps="handled">
        <View>
          <View style={styles.hero}>
            <BackBar title="Profile" variant="large" noInset />
            <T style={styles.heroTitle}>Profile</T>
          </View>
          <View style={styles.sheet}>
            <T style={styles.name}>{v.displayName}</T>
            <T style={styles.district}>{v.city}</T>
          </View>
          <View style={styles.ring}>
            <Image source={Img.avatarProfile} style={styles.avatar} />
          </View>
          <Pressable style={styles.pencil}>
            <MaterialIcons name="edit" size={20} color="#111111" />
          </Pressable>
        </View>

        <Band title="PERSONAL INFORMATION" />
        <View style={styles.form}>
          <Row>
            {field('mobile', 'MobileNumber', { readOnly: true })}
            {field('memberId', 'Member ID', { readOnly: true })}
          </Row>
          <Row>
            {field('firstName', 'FirstName')}
            {field('lastName', 'LastName')}
          </Row>
          {field('displayName', 'Display Name')}
          {field('email', 'Email ID', { readOnly: true })}
          {field('organization', 'Organization', { placeholderOnly: true })}
        </View>

        <Band title="MEMBER INFORMATION" />
        <View style={styles.form}>
          <Row>
            {field('dob', 'Date of Birth', { accent: true, labelStyle: styles.memberLabel, inset: 3.9 })}
            <Field
              label="Gender"
              value={v.gender}
              accent
              readOnly
              labelStyle={[styles.memberLabel, styles.genderLabel]}
              valueStyle={styles.genderValue}
              inset={11}
              right={<MaterialIcons name="arrow-drop-down" size={26} color="#555555" style={styles.caret} />}
            />
          </Row>
          <Row>
            {field('height', 'Height (Cms)', { placeholderOnly: true, keyboardType: 'numeric' })}
            {field('weight', 'Weight (Kgs)', { placeholderOnly: true, keyboardType: 'numeric' })}
          </Row>
        </View>

        <Band title="LOCATION INFORMATION" />
        <View style={styles.form}>
          <Row>
            {field('country', 'Country')}
            {field('state', 'State')}
          </Row>
          {field('city', 'City', { compact: true })}
        </View>

        <View style={styles.privateRow}>
          <T style={styles.privateText}>Private Mode</T>
          <Switch
            value={privateMode}
            onValueChange={setPrivateMode}
            trackColor={{ false: '#C7C7C7', true: '#B79CE6' }}
            thumbColor={privateMode ? Colors.purple : '#FAFAFA'}
          />
        </View>

        <Pressable
          style={[styles.update, { marginBottom: 12.6 + insets.bottom }]}
          onPress={() => Alert.alert('Campus.Life', 'Profile updated successfully')}>
          <T style={styles.updateText}>UPDATE</T>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function Band({ title }: { title: string }) {
  return (
    <View style={styles.band}>
      <T style={styles.bandText}>{title}</T>
    </View>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText?: (t: string) => void;
  readOnly?: boolean;
  // Empty field whose label is shown as the placeholder (Organization, Height, Weight).
  placeholderOnly?: boolean;
  // Purple underline (date / dropdown fields).
  accent?: boolean;
  // Label sits right above the value (City).
  compact?: boolean;
  inset?: number;
  keyboardType?: 'default' | 'numeric';
  labelStyle?: object;
  valueStyle?: object;
  right?: React.ReactNode;
};

function Field({ label, value, onChangeText, readOnly, placeholderOnly, accent, compact, inset, keyboardType, labelStyle, valueStyle, right }: FieldProps) {
  return (
    <View style={[styles.field, inset ? { paddingLeft: inset } : null]}>
      <T style={[styles.label, placeholderOnly && styles.hidden, labelStyle]}>{label}</T>
      <View style={[styles.valueRow, compact && styles.valueCompact]}>
        <TInput
          value={value}
          onChangeText={onChangeText}
          editable={!readOnly}
          placeholder={placeholderOnly ? label : undefined}
          placeholderTextColor="#555555"
          keyboardType={keyboardType}
          style={[styles.value, readOnly && !accent && styles.valueReadOnly, valueStyle]}
        />
        {right}
      </View>
      <View style={[styles.underline, readOnly && !accent && styles.underlineReadOnly, accent && styles.underlineAccent, compact && styles.underlineCompact]} />
    </View>
  );
}

const AVATAR = 103.5;

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.white },
  hero: { height: 145.3 + 22.5 + 56, backgroundColor: Colors.purple },
  heroTitle: { marginTop: 25, textAlign: 'center', fontFamily: Fonts.os6, fontSize: 15.5, color: Colors.white },
  sheet: {
    marginTop: -22.5,
    paddingTop: 24.7,
    borderTopLeftRadius: 22.5,
    borderTopRightRadius: 22.5,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    top: 56 + 60.3,
    alignSelf: 'center',
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: { width: AVATAR - 8, height: AVATAR - 8, borderRadius: (AVATAR - 8) / 2 },
  pencil: {
    position: 'absolute',
    top: 56 + 125.8,
    left: '50%',
    marginLeft: 238 - 205.7 - 19,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontFamily: Fonts.os6, fontSize: 19.4, color: Colors.black, textAlign: 'center' },
  district: { marginTop: 6.8, marginBottom: 13.8, fontFamily: Fonts.os4, fontSize: 13.1, color: '#222222' },

  band: { height: 32.1, backgroundColor: '#F4F0EF', alignItems: 'center', justifyContent: 'center' },
  bandText: { fontFamily: Fonts.os5, fontSize: 13, letterSpacing: 0.5, color: '#111111' },

  form: { paddingHorizontal: 10.7, paddingTop: 12.7 },
  row: { flexDirection: 'row', columnGap: 7.8 },
  field: { flex: 1, marginBottom: 21.7 },
  label: { fontFamily: Fonts.os4, fontSize: 11.8, lineHeight: 16.1, color: '#555555' },
  hidden: { opacity: 0 },
  valueRow: { marginTop: 15.7, flexDirection: 'row', alignItems: 'center' },
  valueCompact: { marginTop: 4.7 },
  value: { flex: 1, height: 17.3, padding: 0, fontFamily: Fonts.os4, fontSize: 13.3, color: '#111111' },
  valueReadOnly: { color: '#968787' },
  underline: { marginTop: 12.5, height: 1, backgroundColor: '#555555' },
  underlineReadOnly: { backgroundColor: '#D8D8D8' },
  underlineAccent: { height: 1.5, backgroundColor: Colors.purple },
  underlineCompact: { marginTop: 2.9 },
  memberLabel: { fontSize: 13.2, lineHeight: 18 },
  genderLabel: { color: '#888888' },
  genderValue: { height: 22, fontSize: 15.9, color: '#111111' },
  caret: { marginRight: 14 },

  privateRow: { marginTop: 6.8, marginHorizontal: 14, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  privateText: { fontFamily: Fonts.os6, fontSize: 14.2, color: '#111111' },
  update: {
    marginTop: 14,
    marginHorizontal: 12.4,
    height: 48.4,
    borderRadius: 4.5,
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.25)',
  },
  updateText: { fontFamily: Fonts.os5, fontSize: 13.9, letterSpacing: 0.5, color: Colors.white },
});
