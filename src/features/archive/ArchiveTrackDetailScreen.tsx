import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { primitiveTokens, semanticTokens, typography } from '@/styles';

import ArchiveRecordEmptyState from './ArchiveRecordEmptyState';
import ArchiveRecordLayout from './ArchiveRecordLayout';
import ArchiveRecordTimeline from './ArchiveRecordTimeline';
import { groupArchiveRecords, type ArchiveRecordAlbum, type ArchiveTrack } from './archiveRecords';
import { getArchiveTrackRecords } from './archiveRecordsMock';

const { unit } = primitiveTokens;

export default function ArchiveTrackDetailScreen({
  album,
  track,
  onBack,
}: {
  album: ArchiveRecordAlbum;
  track: ArchiveTrack;
  onBack: () => void;
}) {
  const records = getArchiveTrackRecords(track.id);
  const groups = groupArchiveRecords(records);
  const [yearOffsets, setYearOffsets] = useState<Record<string, number>>({});
  return (
    <ArchiveRecordLayout
      album={album}
      title={`${track.number}. ${track.title} (수록곡)`}
      count={records.length}
      onBack={onBack}
      yearHeaders={groups
        .filter(({ year }) => yearOffsets[year] !== undefined)
        .map(({ year }) => ({ year, y: yearOffsets[year] }))}
    >
      {groups.length ? (
        groups.flatMap(({ year, data }, index) => [
          <View
            key={`${year}-header`}
            style={[styles.yearHeader, index === 0 && styles.firstYear]}
            onLayout={({ nativeEvent }) => {
              const y = nativeEvent.layout.y;
              setYearOffsets((previous) =>
                previous[year] === y ? previous : { ...previous, [year]: y },
              );
            }}
          >
            <Text style={styles.year}>{year}.</Text>
          </View>,
          <View key={year}>
            <ArchiveRecordTimeline records={data} shortDate />
          </View>,
        ])
      ) : (
        <View style={styles.emptySheet}>
          <ArchiveRecordEmptyState target="track" />
        </View>
      )}
    </ArchiveRecordLayout>
  );
}

const styles = StyleSheet.create({
  yearHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: unit[22],
    paddingVertical: unit[12],
  },
  firstYear: {
    borderTopLeftRadius: unit[12],
    borderTopRightRadius: unit[12],
    paddingTop: unit[28],
    marginTop: -unit[20],
  },
  year: { ...typography.body1, color: semanticTokens.color.text.primary },
  emptySheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: unit[12],
    borderTopRightRadius: unit[12],
    paddingTop: unit[16],
    marginTop: -unit[20],
  },
});
