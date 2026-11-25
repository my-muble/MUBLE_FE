import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { primitiveTokens, semanticTokens, typography } from '@/styles';

import type { ArchiveTrack } from './archiveRecords';

const { unit } = primitiveTokens;

export default function ArchiveTrackRow({
  track,
  count,
  onPress,
}: {
  track: ArchiveTrack;
  count: number;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${track.number}. ${track.title}, ${count} 기록`}
      onPress={onPress}
      style={({ pressed }) => [styles.row, (count > 0 || pressed) && styles.highlight]}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {track.number}. {track.title}
        </Text>
        {count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.count}>{count}</Text>
          </View>
        )}
      </View>
      <Image source={require('@/assets/archive/record-track-chevron.svg')} style={styles.chevron} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: unit[22],
    paddingRight: unit[16],
    paddingVertical: unit[10],
  },
  highlight: { backgroundColor: semanticTokens.color.background.primary },
  content: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: unit[6] },
  title: { ...typography.body1, flexShrink: 1, color: semanticTokens.color.text.primary },
  badge: {
    minWidth: unit[20],
    minHeight: unit[20],
    paddingHorizontal: unit[4],
    borderRadius: unit[80],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: semanticTokens.color.action.primary,
  },
  count: { ...typography.caption2, color: semanticTokens.color.text.inverse },
  chevron: { width: unit[24], height: unit[24] },
});
