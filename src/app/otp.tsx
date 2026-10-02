import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Svg, { Circle, Defs, G, Line, Path, Rect } from 'react-native-svg';

import { StatusFill } from '@/components/cl/app-bar';
import { T } from '@/components/cl/text';
import { Colors, Fonts } from '@/constants/cl';

const OTP_LEN = 6;
const TIMER_SECONDS = 180;

function MailIllustration() {
  return (
    <Svg width={120} height={100} viewBox="0 0 120 100">
      {/* sparkles */}
      <Path d="M32 18 L34 12 L36 18 L34 24 Z" fill="#7B5AFF" opacity={0.6} />
      <Path d="M88 14 L90 8 L92 14 L90 20 Z" fill="#7B5AFF" opacity={0.6} />
      <Path d="M22 52 L24 48 L26 52 L24 56 Z" fill="#7B5AFF" opacity={0.4} />
      <Path d="M98 48 L100 44 L102 48 L100 52 Z" fill="#7B5AFF" opacity={0.4} />
      <Circle cx={28} cy={72} r={2} fill="#7B5AFF" opacity={0.3} />
      <Circle cx={92} cy={68} r={2} fill="#7B5AFF" opacity={0.3} />
      <Circle cx={40} cy={80} r={1.5} fill="#7B5AFF" opacity={0.25} />
      <Circle cx={80} cy={78} r={1.5} fill="#7B5AFF" opacity={0.25} />
      {/* envelope body */}
      <Rect x={30} y={40} width={60} height={42} rx={4} fill="#7B5AFF" />
      {/* letter sticking out */}
      <G>
        <Rect x={36} y={24} width={48} height={36} rx={3} fill="#F0EEF8" />
        {[0, 1, 2, 3, 4].map((i) => (
          <Line
            key={i}
            x1={42}
            y1={32 + i * 6}
            x2={78}
            y2={32 + i * 6}
            stroke="#C8C0E0"
            strokeWidth={2}
            strokeLinecap="round"
          />
        ))}
      </G>
      {/* envelope flap */}
      <Path d="M30 42 L60 62 L90 42" fill="none" stroke="#6A4FE8" strokeWidth={2} />
      {/* envelope front overlay */}
      <Path d="M30 82 L30 48 L60 68 L90 48 L90 82 Z" fill="#8B6FFF" />
      <Defs />
    </Svg>
  );
}

export default function OtpScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LEN).fill(''));
  const [seconds, setSeconds] = useState(TIMER_SECONDS);
  const refs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  const progress = seconds / TIMER_SECONDS;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const handleChange = (text: string, idx: number) => {
    const next = [...otp];
    next[idx] = text;
    setOtp(next);
    if (text && idx < OTP_LEN - 1) {
      refs.current[idx + 1]?.focus();
    }
  };

  const handleKey = (key: string, idx: number) => {
    if (key === 'Backspace' && !otp[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  return (
    <View style={styles.root}>
      <StatusFill />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={26} color={Colors.black} />
        </Pressable>
      </View>

      <View style={styles.body}>
        <T style={styles.title}>VERIFICATION</T>

        {/* Circular timer */}
        <View style={styles.timerWrap}>
          <Svg width={140} height={140} viewBox="0 0 140 140">
            <Circle
              cx={70}
              cy={70}
              r={radius}
              stroke="#E8E4F0"
              strokeWidth={4}
              fill="none"
            />
            <Circle
              cx={70}
              cy={70}
              r={radius}
              stroke="#7B5AFF"
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 70 70)"
            />
          </Svg>
          <View style={styles.timerTextWrap}>
            <T style={styles.timerText}>{mins}:{secs}</T>
          </View>
        </View>

        <T style={styles.subtitle}>
          Please verify OTP sent to {phone || '0000000000'}
        </T>

        <MailIllustration />

        {/* OTP inputs */}
        <View style={styles.otpRow}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={(r) => { refs.current[i] = r; }}
              style={[styles.otpBox, i === 0 && otp[0] !== '' && styles.otpBoxActive]}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(t) => handleChange(t, i)}
              onKeyPress={({ nativeEvent }) => handleKey(nativeEvent.key, i)}
              selectTextOnFocus
            />
          ))}
        </View>

        <Pressable onPress={() => setSeconds(TIMER_SECONDS)}>
          <T style={styles.resend}>Resend OTP</T>
        </Pressable>

        <Pressable
          style={styles.verifyBtn}
          onPress={() => router.replace('/main')}
        >
          <LinearGradient
            colors={['#7B5AFF', '#6366F1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <T style={styles.verifyText}>VERIFY</T>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F0F5' },
  header: { paddingHorizontal: 16, paddingTop: 12 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  body: { flex: 1, alignItems: 'center', paddingTop: 10 },
  title: {
    fontSize: 22,
    fontFamily: Fonts.pp7,
    color: '#7B5AFF',
    letterSpacing: 2,
  },
  timerWrap: {
    marginTop: 24,
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerTextWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 24,
    fontFamily: Fonts.os4,
    color: '#7B5AFF',
  },
  subtitle: {
    marginTop: 24,
    fontSize: 15,
    fontFamily: Fonts.os4,
    color: '#444',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 30,
  },
  otpRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  otpBox: {
    width: 48,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: Fonts.os6,
    color: '#333',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  otpBoxActive: {
    borderWidth: 1.5,
    borderColor: '#7B5AFF',
  },
  resend: {
    marginTop: 20,
    fontSize: 15,
    fontFamily: Fonts.os4,
    color: '#AAAAAA',
  },
  verifyBtn: {
    marginTop: 24,
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
  verifyText: {
    fontSize: 18,
    fontFamily: Fonts.os7,
    color: '#FFFFFF',
    letterSpacing: 2,
  },
});
