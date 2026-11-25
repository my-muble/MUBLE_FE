import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { componentTokens, primitiveTokens, typography } from '@/styles';

import ArchiveRecordEmptyState from './ArchiveRecordEmptyState';
import ArchiveRecordLayout from './ArchiveRecordLayout';
import ArchiveRecordTimeline from './ArchiveRecordTimeline';
import { type ArchiveRecordAlbum } from './archiveRecords';
import {
  getArchiveAlbumRecordCount,
  getArchiveAlbumRecords,
  getArchiveTrackRecords,
} from './archiveRecordsMock';
import ArchiveTrackRow from './ArchiveTrackRow';

type ArchiveAlbumDetailScreenProps = {
  album: ArchiveRecordAlbum;
  allRecords?: boolean;
  onBack: () => void;
  onTrackPress?: (id: string) => void;
  onAllRecordsPress?: () => void;
};

const { unit } = primitiveTokens;

export default function ArchiveAlbumDetailScreen({
  album,
  allRecords = false,
  onBack,
  onTrackPress,
  onAllRecordsPress,
}: ArchiveAlbumDetailScreenProps) {
  const records = getArchiveAlbumRecords(album.id);
  const tracks = [...album.tracks].sort((a, b) => a.number - b.number);
  const trackRecordCount = tracks.reduce(
    (total, track) => total + getArchiveTrackRecords(track.id).length,
    0,
  );

  return (
    <ArchiveRecordLayout
      album={album}
      title={album.title}
      count={getArchiveAlbumRecordCount(album.id)}
      onBack={onBack}
    >
      <View style={styles.sheet}>
        {!allRecords && (
          <>
            <View style={styles.heading}>
              <Text style={styles.title}>곡 기록</Text>
              <Text style={styles.count}>{trackRecordCount}</Text>
            </View>
            {tracks.map((track) => (
              <ArchiveTrackRow
                key={track.id}
                track={track}
                count={getArchiveTrackRecords(track.id).length}
                onPress={() => onTrackPress?.(track.id)}
              />
            ))}
            <View style={styles.gap} />
          </>
        )}
        <View style={styles.heading}>
          <Text style={styles.title}>앨범 기록</Text>
          <Text style={styles.count}>{records.length}</Text>
          {!allRecords && records.length > 3 && (
            <Pressable
              accessibilityRole="button"
              onPress={onAllRecordsPress}
              style={styles.viewAll}
            >
              <Text style={styles.viewAllLabel}>전체보기</Text>
              <Image
                source={require('@/assets/archive/record-more-chevron.svg')}
                style={styles.chevron}
              />
            </Pressable>
          )}
        </View>
        {records.length ? (
          <ArchiveRecordTimeline records={allRecords ? records : records.slice(0, 3)} />
        ) : (
          <ArchiveRecordEmptyState target="album" />
        )}
      </View>
    </ArchiveRecordLayout>
  );
}

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: unit[12],
    borderTopRightRadius: unit[12],
    paddingTop: unit[16],
    marginTop: -unit[20],
    minHeight: 400,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: unit[8],
    paddingLeft: unit[22],
    paddingRight: unit[16],
    paddingVertical: unit[12],
    minHeight: unit[56],
  },
  title: { ...typography.title1, color: componentTokens.sectionHeader.text.title },
  count: { ...typography.body2, color: componentTokens.sectionHeader.text.meta },
  viewAll: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', minHeight: unit[32] },
  viewAllLabel: { ...typography.body2, color: componentTokens.sectionHeader.text.default },
  chevron: { width: unit[20], height: unit[20] },
  gap: { height: unit[20] },
});
