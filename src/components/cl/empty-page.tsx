import type { ReactNode } from 'react';
import { Image, StyleSheet, type TextStyle, View } from 'react-native';

import { BackBar } from '@/components/cl/app-bar';
import { T } from '@/components/cl/text';
import { Fonts } from '@/constants/cl';
import { Img, px } from '@/constants/cl-assets';

/**
 * Plain screen with a single message (My Activities, Offline Activities, Notifications, Friend Requests).
 * The message sits at the same height in all screenshots: 41.9% down the content area.
 */
export function EmptyPage({
  title,
  message,
  bg,
  children,
  illustration,
  messageStyle,
}: {
  title: string;
  message: string;
  bg: string;
  children?: ReactNode;
  illustration?: boolean;
  messageStyle?: TextStyle;
}) {
  return (
    <View style={[styles.flex, { backgroundColor: bg }]}>
      <BackBar title={title} />
      <View style={styles.flex}>
        <View style={[styles.block, illustration && styles.withIllustration]}>
          {illustration && <Image source={Img.emptyWhite} style={styles.illustration} />}
          <T style={[styles.message, illustration && styles.messageUnderImage, messageStyle]}>{message}</T>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  block: { position: 'absolute', top: '41.9%', left: 0, right: 0, alignItems: 'center' },
  withIllustration: { top: '38%' },
  illustration: { width: px(247), height: px(163) },
  message: { fontFamily: Fonts.os4, fontSize: 19.4, color: '#111111', textAlign: 'center' },
  messageUnderImage: { marginTop: 13.7 },
});
