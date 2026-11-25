import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { componentTokens, layout, primitiveTokens, semanticTokens, typography } from '@/styles';

import type { ArchiveAlbumListItem } from './archiveAlbumListData';

const { unit } = primitiveTokens;
const { albumItem } = componentTokens.archiveTimeline;

function ArchiveAlbumCard({
  album,
  size,
  onPress,
}: {
  album: ArchiveAlbumListItem;
  size: number;
  onPress?: (id: string) => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${album.title}, ${album.artist}, ${album.recordCount} 기록, 앨범 상세`}
      onPress={() => onPress?.(album.id)}
      disabled={!onPress}
      style={{ width: size }}
    >
      <View style={{ height: size }}>
        {album.showVinyl && album.artwork && (
          <View
            style={[
              styles.vinylCrop,
              {
                left: size * 0.8745,
                top: -size * 0.098,
                width: size * 0.2591,
                height: size * 1.1998,
              },
            ]}
          >
            <Image source={require('@/assets/archive/vinyl.png')} style={styles.vinyl} />
          </View>
        )}
        <View style={[styles.cover, { width: size, height: size }]}>
          {album.artwork ? (
            <Image source={album.artwork} contentFit="cover" style={styles.coverImage} />
          ) : (
            <Image source={require('@/assets/archive/album-music-note.svg')} style={styles.note} />
          )}
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {album.title}
        </Text>
        <View style={styles.metadata}>
          <Text style={styles.artist} numberOfLines={1}>
            {album.artist}
          </Text>
          <Text style={styles.count}>· {album.recordCount}기록</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function ArchiveAlbumShelf({
  albums,
  width,
  onAlbumPress,
}: {
  albums: ArchiveAlbumListItem[];
  width: number;
  onAlbumPress?: (id: string) => void;
}) {
  const innerWidth = width - 2 * layout.screenPaddingHorizontal;
  const size = (innerWidth - 35) / 3;
  return (
    <View style={styles.row}>
      <View
        style={[
          styles.shelf,
          { top: size - 3, width: albums.length === 1 ? innerWidth * (218.944 / 335) : innerWidth },
        ]}
      />
      {Array.from({ length: 3 }, (_, index) =>
        albums[index] ? (
          <ArchiveAlbumCard
            key={albums[index].id}
            album={albums[index]}
            size={size}
            onPress={onAlbumPress}
          />
        ) : (
          <View key={index} style={{ width: size }} />
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: layout.screenPaddingHorizontal,
  },
  shelf: {
    position: 'absolute',
    left: layout.screenPaddingHorizontal,
    height: unit[4],
    borderRadius: 222,
    backgroundColor: semanticTokens.color.background.tertiary,
    boxShadow: '0 4px 8px rgba(17,17,19,0.05)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  cover: {
    borderRadius: unit[6],
    backgroundColor: semanticTokens.color.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '-1px 0.5px 2px rgba(17,17,19,0.2), -2px 1px 24px rgba(17,17,19,0.12)',
  },
  coverImage: { width: '100%', height: '100%', borderRadius: unit[6] },
  vinylCrop: { position: 'absolute', overflow: 'hidden' },
  vinyl: {
    position: 'absolute',
    width: '718.09%',
    height: '155.07%',
    left: '-487.02%',
    top: '-27.47%',
  },
  note: { width: 18.3596, height: 18.9611 },
  info: { paddingHorizontal: unit[2], paddingVertical: unit[4] },
  title: { ...typography.title2, color: albumItem.text.title, includeFontPadding: false },
  metadata: { flexDirection: 'row', alignItems: 'center', gap: unit[2] },
  artist: {
    ...typography.body2,
    color: albumItem.text.meta,
    flex: 1,
    minWidth: 0,
    includeFontPadding: false,
  },
  count: { ...typography.body2, color: albumItem.text.meta, includeFontPadding: false },
});
