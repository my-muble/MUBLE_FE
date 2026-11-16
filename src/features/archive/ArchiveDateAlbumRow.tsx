import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { componentTokens, primitiveTokens, semanticTokens, typography } from '@/styles';

import type { ArchiveDateDetailAlbum } from './archiveDateDetailMock';

const { unit } = primitiveTokens;
const { recordItem } = componentTokens.archiveTimeline;

export default function ArchiveDateAlbumRow({ album }: { album: ArchiveDateDetailAlbum }) {
  return (
    <View style={styles.row}>
      <View style={[styles.artwork, album.showVinyl && styles.vinylArtwork]}>
        {album.showVinyl && (
          <View style={styles.vinylCrop}>
            <Image source={require('@/assets/archive/vinyl.png')} style={styles.vinyl} />
          </View>
        )}
        <View style={[styles.cover, album.showVinyl && styles.vinylCover]}>
          {album.artwork && (
            <Image
              source={album.artwork}
              contentFit="cover"
              style={[styles.coverImage, album.showVinyl && styles.vinylCoverImage]}
            />
          )}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.heading}>
          <View style={styles.albumInfo}>
            <Text style={styles.title} numberOfLines={1}>
              {album.title}
            </Text>
            <Text style={styles.artist} numberOfLines={1}>
              {album.artist}
            </Text>
          </View>
          <Image source={require('@/assets/archive/date-chevron.svg')} style={styles.chevron} />
        </View>

        <View style={styles.metadata}>
          <Text style={styles.recordCount}>{album.recordCount}기록</Text>
          <View style={styles.rating}>
            <Image source={require('@/assets/archive/date-star.svg')} style={styles.star} />
            <Text style={styles.ratingLabel} accessibilityLabel={`평점 ${album.rating}`}>
              {album.rating.toFixed(1)}
            </Text>
          </View>
        </View>

        <Text style={styles.preview} numberOfLines={1}>
          {album.preview}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: unit[16] },
  artwork: { width: 100, height: 100 },
  vinylArtwork: { height: 87 },
  vinylCrop: {
    position: 'absolute',
    left: 41.46,
    right: 0,
    height: 84,
    top: 1.5,
    overflow: 'hidden',
    transform: [{ scaleY: -1 }],
  },
  vinyl: { position: 'absolute', width: 130, height: 130, left: -48, top: -23 },
  cover: {
    width: 100,
    height: 100,
    borderRadius: unit[6],
    backgroundColor: semanticTokens.color.background.primary,
    boxShadow: '-1px 0.5px 2px rgba(17,17,19,0.2), -2px 1px 24px rgba(17,17,19,0.12)',
  },
  vinylCover: { width: 87, height: 87, borderRadius: unit[4] },
  coverImage: { flex: 1, borderRadius: unit[6] },
  vinylCoverImage: { borderRadius: unit[4] },
  content: { flex: 1, minWidth: 0, alignSelf: 'stretch', justifyContent: 'space-between' },
  heading: { flexDirection: 'row', alignItems: 'flex-start' },
  albumInfo: { flex: 1, minWidth: 0 },
  title: { ...typography.title2, color: recordItem.text.title, includeFontPadding: false },
  artist: { ...typography.body2, color: recordItem.text.artist, includeFontPadding: false },
  chevron: { width: unit[24], height: unit[24] },
  metadata: { flexDirection: 'row', alignItems: 'center', gap: unit[4] },
  recordCount: {
    ...typography.body1,
    color: recordItem.text.recordCount,
    includeFontPadding: false,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: unit[4],
    paddingHorizontal: unit[4],
    paddingVertical: unit[2],
    borderRadius: unit[80],
    backgroundColor: semanticTokens.color.background.tertiary,
  },
  star: { width: unit[10], height: unit[10] },
  ratingLabel: {
    ...typography.caption3,
    color: semanticTokens.color.text.primary,
    includeFontPadding: false,
  },
  preview: { ...typography.body2, color: recordItem.text.preview, includeFontPadding: false },
});
