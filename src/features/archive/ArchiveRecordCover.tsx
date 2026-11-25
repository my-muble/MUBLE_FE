import { BlurTargetView, BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { componentTokens, primitiveTokens, typography } from '@/styles';

import type { ArchiveRecordAlbum } from './archiveRecords';

type ArchiveRecordCoverProps = {
  album: ArchiveRecordAlbum;
  title: string;
  count: number;
  height: number;
};

const { unit } = primitiveTokens;
const { infoOverlay } = componentTokens.archiveTimeline;

export default function ArchiveRecordCover({
  album,
  title,
  count,
  height,
}: ArchiveRecordCoverProps) {
  const target = useRef<View>(null);

  return (
    <View style={{ height }}>
      <BlurTargetView ref={target} style={StyleSheet.absoluteFill}>
        {album.artwork && (
          <Image source={album.artwork} contentFit="cover" style={styles.artwork} />
        )}
      </BlurTargetView>
      <View style={styles.fade}>
        {album.artwork && (
          <Image
            source={album.artwork}
            contentFit="cover"
            blurRadius={6}
            style={styles.fadeArtwork}
          />
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={StyleSheet.absoluteFill}
        />
      </View>
      <View style={styles.info}>
        <BlurView
          blurTarget={target}
          blurMethod="dimezisBlurView"
          intensity={100}
          tint="default"
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.tint} />
        <Text accessibilityRole="header" style={styles.title}>
          {title}
        </Text>
        <Text style={styles.meta}>
          {album.artist} · {count} 기록
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  artwork: { ...StyleSheet.absoluteFill },
  fade: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 67, overflow: 'hidden' },
  fadeArtwork: { position: 'absolute', bottom: 0, left: 0, right: 0, aspectRatio: 1 },
  info: {
    position: 'absolute',
    bottom: unit[32],
    left: unit[20],
    right: unit[20],
    paddingVertical: unit[8],
    paddingHorizontal: unit[12],
    borderRadius: unit[8],
    overflow: 'hidden',
    boxShadow: '0 -2px 2px rgba(17,17,19,0.08), 0 -4px 32px rgba(17,17,19,0.12)',
  },
  tint: { ...StyleSheet.absoluteFill, backgroundColor: infoOverlay.background },
  title: { ...typography.title2, color: infoOverlay.text.title, includeFontPadding: false },
  meta: { ...typography.body2, color: infoOverlay.text.meta, includeFontPadding: false },
});
