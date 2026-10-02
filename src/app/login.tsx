import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, TextInput, View } from 'react-native';
import Svg, { Circle, Defs, G, LinearGradient as SvgGrad, Path, Rect, Stop } from 'react-native-svg';

import { StatusFill } from '@/components/cl/app-bar';
import { T } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';

const { width: W } = Dimensions.get('window');

const LOGO_PATH =
  'M18.0899 66.1258V40.4447C18.0899 40.1155 17.902 39.8152 17.6059 39.6714L4.7824 33.4429C4.11292 33.1177 4.14493 32.1532 4.8345 31.8731L72.5715 4.36147C72.7775 4.27781 73.0079 4.2772 73.2143 4.35977L141.818 31.8013C142.539 32.0895 142.539 33.1095 141.818 33.3977L73.2036 60.8435C73.0036 60.9235 72.7808 60.9255 72.5793 60.849L38.3818 47.8705C37.8193 47.657 37.2171 48.0725 37.2171 48.6742V87.0402C37.2171 87.3891 37.428 87.7034 37.7509 87.8357L72.5705 102.099C72.7771 102.184 73.0084 102.185 73.2157 102.102L108.887 87.8332C109.214 87.7026 109.428 87.3865 109.428 87.035V69.0942C109.428 68.4916 108.824 68.076 108.261 68.2912L73.2058 81.6947C73.0044 81.7717 72.7814 81.7702 72.581 81.6904L52.9057 73.8627';

export default function Login() {
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.root}>
      <StatusFill />

      <View style={styles.body}>
        <View style={styles.logoRow}>
          <Svg width={48} height={40} viewBox="0 0 147 107">
            <Path
              d={LOGO_PATH}
              stroke={Colors.purple}
              strokeWidth={8.6}
              strokeLinecap="round"
              fill="none"
            />
          </Svg>
          <T style={styles.brand}>Campus.Life</T>
        </View>

        <T style={styles.tagline}>Connect. Engage. Thrive.</T>

        <View style={styles.inputCard}>
          <View style={styles.flagWrap}>
            <Svg width={28} height={20} viewBox="0 0 900 600">
              <Rect width="900" height="200" fill="#FF9933" />
              <Rect y="200" width="900" height="200" fill="#FFFFFF" />
              <Rect y="400" width="900" height="200" fill="#138808" />
              <G transform="translate(450,300)">
                <Circle r="60" fill="#000080" />
                <Circle r="52" fill="#FFFFFF" />
                <Circle r="16" fill="#000080" />
              </G>
            </Svg>
          </View>
          <T style={styles.code}>+91</T>
          <View style={styles.divider} />
          <MaterialCommunityIcons name="phone" size={22} color="#999" style={styles.phoneIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter 10 digit number"
            placeholderTextColor="#AAAAAA"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <Pressable
          style={styles.loginBtn}
          onPress={() => {
            if (phone.length === 10) router.push({ pathname: '/otp', params: { phone } });
          }}
        >
          <LinearGradient
            colors={['#7B5AFF', '#6366F1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <T style={styles.loginText}>LOGIN</T>
          </LinearGradient>
        </Pressable>
      </View>

      <View style={styles.wave}>
        <Svg width={W} height={200} viewBox={`0 0 ${W} 200`} preserveAspectRatio="none">
          <Defs>
            <SvgGrad id="wg" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#7B5AFF" stopOpacity="0.15" />
              <Stop offset="1" stopColor="#6366F1" />
            </SvgGrad>
          </Defs>
          <Path
            d={`M0 80 Q${W * 0.25} 0, ${W * 0.5} 60 Q${W * 0.75} 120, ${W} 40 L${W} 200 L0 200 Z`}
            fill="url(#wg)"
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F0F5' },
  body: { flex: 1, alignItems: 'center', paddingTop: 140 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brand: {
    fontSize: 32,
    fontFamily: Fonts.mr8,
    color: Colors.purple,
    letterSpacing: -0.5,
  },
  tagline: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: Fonts.os4,
    color: '#555',
  },
  inputCard: {
    marginTop: 48,
    width: '82%',
    height: 58,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  flagWrap: { width: 28, height: 20, borderRadius: 2, overflow: 'hidden' },
  code: { marginLeft: 8, fontSize: 16, fontFamily: Fonts.os6, color: '#333' },
  divider: { width: 1, height: 28, backgroundColor: '#DDD', marginHorizontal: 12 },
  phoneIcon: { marginRight: 8 },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.os4,
    color: '#333',
    padding: 0,
  },
  loginBtn: {
    marginTop: 32,
    width: '68%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradient: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  loginText: {
    fontSize: 18,
    fontFamily: Fonts.os7,
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
