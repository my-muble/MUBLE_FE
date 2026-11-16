import { BlurTargetView, BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { componentTokens, layout, primitiveTokens, typography } from '@/styles';

import ArchiveDateAlbumRow from './ArchiveDateAlbumRow';
import type { ArchiveDateDetail } from './archiveDateDetailMock';

type ArchiveDateDetailScreenProps = {
  detail: ArchiveDateDetail;
  onBack: () => void;
};

const { unit } = primitiveTokens;
const { topBar, sectionHeader, archiveTimeline } = componentTokens;
const toolbarHeight = unit[20] + unit[32] + unit[12];

export default function ArchiveDateDetailScreen({ detail, onBack }: ArchiveDateDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const blurTarget = useRef<View>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerHeight = insets.top + toolbarHeight;
  const dateLabel = detail.date.split('-').map(Number).join('.');
  const recordCount = detail.albums.reduce((total, album) => total + album.recordCount, 0);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <BlurTargetView ref={blurTarget} style={styles.scroll}>
        <ScrollView
          style={styles.scroll}
          contentInsetAdjustmentBehavior="never"
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={({ nativeEvent }) => setScrolled(nativeEvent.contentOffset.y > 1)}
          contentContainerStyle={{
            paddingTop: headerHeight + unit[10],
            paddingBottom: insets.bottom + unit[24],
            paddingLeft: insets.left + layout.screenPaddingHorizontal,
            paddingRight: insets.right + unit[22],
          }}
        >
          <View style={styles.summary}>
            <Text accessibilityRole="header" style={styles.date}>
              {dateLabel}.
            </Text>
            <View style={styles.counts}>
              <Text style={styles.count}>{recordCount} 기록</Text>
              <Image
                source={require('@/assets/archive/date-separator.svg')}
                style={styles.separator}
              />
              <Text style={styles.count}>{detail.albums.length} 앨범</Text>
            </View>
          </View>
          <View style={styles.albums}>
            {detail.albums.map((album) => (
              <ArchiveDateAlbumRow key={album.id} album={album} />
            ))}
          </View>
        </ScrollView>
      </BlurTargetView>

      <View style={[styles.header, { height: headerHeight }]}>
        {scrolled && (
          <BlurView
            blurTarget={blurTarget}
            blurMethod="dimezisBlurView"
            intensity={24}
            tint="light"
            style={styles.backdrop}
          />
        )}
        <LinearGradient
          colors={
            scrolled
              ? ['rgba(255,255,255,0.55)', 'rgba(255,255,255,0)']
              : ['#FFFFFF', 'rgba(255,255,255,0)']
          }
          style={styles.backdrop}
        />
        <View
          style={[
            styles.toolbar,
            {
              marginTop: insets.top,
              marginLeft: insets.left + layout.screenPaddingHorizontal,
              marginRight: insets.right + layout.screenPaddingHorizontal,
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="뒤로가기"
            hitSlop={unit[8]}
            onPress={onBack}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          >
            <Image source={require('@/assets/archive/date-back.svg')} style={styles.backIcon} />
          </Pressable>
          <View style={styles.button}>
            <Image
              source={require('@/assets/archive/date-settings.svg')}
              style={styles.settingsIcon}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flex: 1 },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: unit[4],
    paddingLeft: unit[2],
    paddingVertical: unit[8],
  },
  date: { ...typography.title1, color: sectionHeader.text.title, includeFontPadding: false },
  counts: { flexDirection: 'row', alignItems: 'center', gap: unit[4] },
  count: {
    ...typography.body2,
    color: archiveTimeline.dateCard.metadata.text,
    includeFontPadding: false,
  },
  separator: { width: 2.5083, height: 2.5083 },
  albums: { gap: unit[20] },
  header: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, pointerEvents: 'box-none' },
  backdrop: { ...StyleSheet.absoluteFill, pointerEvents: 'none' },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: unit[20],
    paddingBottom: unit[12],
    pointerEvents: 'box-none',
  },
  button: {
    width: unit[32],
    height: unit[32],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: unit[4],
    backgroundColor: topBar.background.default,
  },
  pressed: { opacity: 0.7 },
  backIcon: { width: unit[24], height: unit[24] },
  settingsIcon: { width: 19.832, height: 20.1621 },
});
