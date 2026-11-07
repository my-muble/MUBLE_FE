import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { componentTokens, primitiveTokens, semanticTokens, typography } from '@/styles';

import type { ArchiveDay } from './archiveTimeline';

type ArchiveDateCardProps = {
  day: ArchiveDay;
  width: number;
  onPress?: (date: string) => void;
};

const { unit } = primitiveTokens;
const { archiveTimeline, chevronButton } = componentTokens;
const { dateCard } = archiveTimeline;
const vinyl = require('@/assets/archive/vinyl.png');
const maxCovers = 5;
const coverStep = 0.34;
const overlayWidth = 43;

export default function ArchiveDateCard({ day, width, onPress }: ArchiveDateCardProps) {
  const [, month, date] = day.date.split('-');
  const dateLabel = `${Number(month)}.${Number(date)}.`;
  const covers = day.albums.slice(0, maxCovers);
  const remaining = day.albums.length - covers.length;
  const hasOverflow = remaining > 0;
  const coverSize = Math.min(
    100,
    (width - overlayWidth - unit[12] - unit[8] - unit[24]) / (1 + (maxCovers - 1) * coverStep),
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${Number(month)}월 ${Number(date)}일, 기록 ${day.recordCount}개, 앨범 ${day.albums.length}개`}
      disabled={!onPress}
      onPress={() => onPress?.(day.date)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {hasOverflow && (
        <View style={styles.vinylPreview}>
          <View style={styles.vinylCrop}>
            <Image source={vinyl} contentFit="fill" style={styles.vinyl} />
          </View>
          <View style={styles.vinylOverlay}>
            <View style={styles.vinylCrop}>
              <Image source={vinyl} contentFit="fill" blurRadius={6} style={styles.vinyl} />
            </View>
            <View style={styles.overlayTint} />
          </View>
        </View>
      )}

      <View style={styles.header}>
        <Text style={styles.date}>{dateLabel}</Text>
        <View style={styles.metadata}>
          <Text style={styles.count}>{day.recordCount} 기록</Text>
          <Image source={require('@/assets/archive/separator.svg')} style={styles.separator} />
          <Text style={styles.count}>{day.albums.length} 앨범</Text>
        </View>
      </View>

      <View style={[styles.covers, { minHeight: coverSize }]}>
        {covers.map((album, index) => (
          <View
            key={album.id}
            style={[
              styles.cover,
              {
                width: coverSize,
                height: coverSize,
                marginLeft: index === 0 ? 0 : -coverSize * (1 - coverStep),
              },
            ]}
          >
            {album.artwork && (
              <Image
                source={album.artwork}
                contentFit="cover"
                recyclingKey={album.id}
                style={styles.coverImage}
              />
            )}
          </View>
        ))}
        {hasOverflow && (
          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>+{remaining}</Text>
          </View>
        )}
      </View>

      <View style={[styles.chevron, hasOverflow && styles.chevronInverse]}>
        <Image
          source={
            hasOverflow
              ? require('@/assets/archive/chevron-right-inverse.svg')
              : require('@/assets/archive/chevron-right.svg')
          }
          style={styles.chevronIcon}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    gap: unit[12],
    paddingTop: unit[12],
    paddingBottom: unit[16],
    paddingHorizontal: unit[12],
    borderRadius: unit[12],
    backgroundColor: dateCard.background.default,
  },
  pressed: { backgroundColor: semanticTokens.color.background.tertiary },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    columnGap: unit[8],
  },
  date: { ...typography.label2, color: dateCard.date.text, includeFontPadding: false },
  metadata: { flexDirection: 'row', alignItems: 'center', gap: unit[4] },
  count: { ...typography.caption2, color: dateCard.metadata.text, includeFontPadding: false },
  separator: { width: 2.5083, height: 2.5083 },
  covers: { flexDirection: 'row', alignItems: 'center' },
  cover: {
    borderRadius: unit[6],
    backgroundColor: dateCard.background.default,
    boxShadow: '-1px 0.5px 2px rgba(17,17,19,0.2), -2px 1px 24px rgba(17,17,19,0.12)',
  },
  coverImage: { flex: 1, borderRadius: unit[6] },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: unit[24],
    minHeight: unit[24],
    paddingHorizontal: unit[4],
    marginLeft: -unit[12],
    borderRadius: unit[80],
    backgroundColor: semanticTokens.color.background.inverse,
  },
  badgeLabel: {
    ...typography.caption2,
    includeFontPadding: false,
    color: semanticTokens.color.text.inverse,
  },
  vinylPreview: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 70,
    pointerEvents: 'none',
  },
  vinylCrop: {
    position: 'absolute',
    overflow: 'hidden',
    right: -36.25,
    bottom: -3.59,
    width: 105.354,
    height: 130.019,
    transform: [{ scaleY: -1 }],
  },
  vinyl: {
    position: 'absolute',
    width: '191.38%',
    height: '155.07%',
    left: '-33.96%',
    top: '-27.47%',
  },
  vinylOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: overlayWidth,
    borderTopLeftRadius: unit[10],
    borderBottomLeftRadius: unit[10],
    overflow: 'hidden',
  },
  overlayTint: {
    ...StyleSheet.absoluteFill,
    backgroundColor: dateCard.recordOverlay.default,
  },
  chevron: {
    position: 'absolute',
    right: unit[8],
    bottom: unit[8],
    paddingHorizontal: unit[4],
    paddingVertical: unit[2],
    borderRadius: unit[4],
    backgroundColor: chevronButton.background.light,
  },
  chevronInverse: { backgroundColor: chevronButton.background.inverse },
  chevronIcon: { width: unit[20], height: unit[20] },
});
