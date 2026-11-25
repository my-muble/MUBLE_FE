import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { componentTokens, primitiveTokens, typography } from '@/styles';

import { formatArchiveRecordDate, sortArchiveRecords, type ArchiveRecord } from './archiveRecords';

const { unit } = primitiveTokens;
const { text } = componentTokens.archiveTimeline.recordEntryItem;

function ArchiveRecordItem({ record, shortDate }: { record: ArchiveRecord; shortDate: boolean }) {
  const [lineHeight, setLineHeight] = useState(0);

  return (
    <View style={styles.item}>
      <View style={styles.rail}>
        <Image source={require('@/assets/archive/record-marker.svg')} style={styles.marker} />
        <View
          style={styles.line}
          onLayout={({ nativeEvent }) => setLineHeight(nativeEvent.layout.height)}
        >
          {Array.from({ length: Math.ceil(lineHeight / 70) }, (_, index) => (
            <View key={index} style={styles.lineSegment}>
              <Image
                source={require('@/assets/archive/record-line.svg')}
                style={styles.lineImage}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.metadata}>
          <Text style={styles.date}>{formatArchiveRecordDate(record.createdAt, shortDate)}</Text>
          {record.rating !== undefined && (
            <View accessibilityLabel={`별점 ${record.rating}점`} style={styles.stars}>
              {Array.from({ length: 5 }, (_, index) => (
                <Image
                  key={index}
                  source={require('@/assets/archive/record-star.svg')}
                  style={[styles.star, index >= record.rating! && styles.unfilledStar]}
                />
              ))}
            </View>
          )}
        </View>
        {record.content ? <Text style={styles.recordText}>{record.content}</Text> : null}
      </View>
    </View>
  );
}

export default function ArchiveRecordTimeline({
  records,
  shortDate = false,
}: {
  records: readonly ArchiveRecord[];
  shortDate?: boolean;
}) {
  return sortArchiveRecords(records).map((record) => (
    <ArchiveRecordItem key={record.id} record={record} shortDate={shortDate} />
  ));
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: unit[12],
    paddingLeft: unit[20],
    paddingRight: unit[22],
    paddingVertical: unit[20],
    backgroundColor: '#FFFFFF',
  },
  rail: { width: 7, alignItems: 'center', gap: unit[4] },
  marker: { width: 7, height: 7 },
  line: { flex: 1, width: 7, minHeight: unit[20], overflow: 'hidden' },
  lineSegment: {
    width: 7,
    height: 70,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineImage: { width: 70, height: 1, transform: [{ rotate: '90deg' }] },
  content: { flex: 1, minWidth: 0, gap: unit[8] },
  metadata: { gap: unit[4] },
  date: { ...typography.caption3, color: text.time, includeFontPadding: false },
  stars: { flexDirection: 'row', gap: unit[2] },
  star: { width: unit[12], height: unit[12] },
  unfilledStar: { opacity: 0.15 },
  recordText: { ...typography.body2, color: text.content, includeFontPadding: false },
});
