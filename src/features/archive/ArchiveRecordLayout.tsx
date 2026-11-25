import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { componentTokens, primitiveTokens, typography } from '@/styles';

import ArchiveRecordCover from './ArchiveRecordCover';
import type { ArchiveRecordAlbum } from './archiveRecords';

type ArchiveRecordLayoutProps = {
  album: ArchiveRecordAlbum;
  title: string;
  count: number;
  onBack: () => void;
  children: ReactNode;
  yearHeaders?: { year: string; y: number }[];
};

const { unit } = primitiveTokens;

export default function ArchiveRecordLayout({
  album,
  title,
  count,
  onBack,
  children,
  yearHeaders,
}: ArchiveRecordLayoutProps) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [stickyYear, setStickyYear] = useState<string>();
  const toolbarHeight = insets.top + unit[64];
  const coverHeight = Math.max(300, Math.min(width - insets.left - insets.right, 500));

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        scrollEventThrottle={32}
        onScroll={({ nativeEvent }) => {
          const active = yearHeaders?.findLast(
            ({ y }) => y <= nativeEvent.contentOffset.y + toolbarHeight,
          );
          setStickyYear(active?.year);
        }}
        contentContainerStyle={{
          minHeight: height,
          paddingBottom: insets.bottom + unit[68] + unit[4],
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <ArchiveRecordCover album={album} title={title} count={count} height={coverHeight} />
        {children}
      </ScrollView>
      {stickyYear && (
        <View
          style={[
            styles.yearHeader,
            { top: toolbarHeight, left: insets.left, right: insets.right },
          ]}
        >
          <Text style={styles.year}>{stickyYear}.</Text>
        </View>
      )}
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0)']}
        style={[styles.header, { height: insets.top + unit[64] }]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="뒤로가기"
          hitSlop={unit[8]}
          onPress={onBack}
          style={[styles.back, { top: insets.top + unit[20], left: insets.left + unit[20] }]}
        >
          <Image source={require('@/assets/archive/date-back.svg')} style={styles.icon} />
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  yearHeader: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: unit[22],
    paddingVertical: unit[12],
  },
  year: { ...typography.body1, color: componentTokens.sectionHeader.text.title },
  header: { position: 'absolute', top: 0, left: 0, right: 0, pointerEvents: 'box-none' },
  back: {
    position: 'absolute',
    width: unit[32],
    height: unit[32],
    borderRadius: unit[4],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: componentTokens.topBar.background.default,
  },
  icon: { width: unit[24], height: unit[24] },
});
