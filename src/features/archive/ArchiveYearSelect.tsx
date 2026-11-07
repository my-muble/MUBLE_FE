import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { componentTokens, primitiveTokens, semanticTokens, typography } from '@/styles';

type ArchiveYearSelectProps = {
  years: readonly number[];
  selectedYear: number;
  expanded: boolean;
  onToggle: () => void;
  onSelect: (year: number) => void;
};

const { unit } = primitiveTokens;
const { dropdown } = componentTokens;

export default function ArchiveYearSelect({
  years,
  selectedYear,
  expanded,
  onToggle,
  onSelect,
}: ArchiveYearSelectProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${selectedYear}년, 연도 선택`}
        aria-expanded={expanded}
        hitSlop={unit[8]}
        onPress={onToggle}
        style={styles.trigger}
      >
        <Text style={[styles.year, expanded && styles.expandedYear]}>{selectedYear}</Text>
        <Image
          source={
            expanded
              ? require('@/assets/archive/chevron-up.svg')
              : require('@/assets/archive/chevron-down.svg')
          }
          style={styles.icon}
        />
      </Pressable>

      {expanded && (
        <View style={styles.menu}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {years
              .filter((year) => years.length === 1 || year !== selectedYear)
              .map((year) => (
                <Pressable
                  key={year}
                  accessibilityRole="button"
                  accessibilityLabel={`${year}년`}
                  onPress={() => onSelect(year)}
                  style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
                >
                  <Text style={styles.optionText}>{year}</Text>
                </Pressable>
              ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: unit[16],
    bottom: 0,
    zIndex: 2,
    pointerEvents: 'box-none',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: unit[8],
    paddingLeft: unit[8],
    paddingRight: unit[4],
    paddingVertical: unit[4],
    borderRadius: unit[4],
    backgroundColor: dropdown.background.default,
  },
  year: { ...typography.caption2, color: dropdown.text.default, includeFontPadding: false },
  expandedYear: { color: dropdown.text.disabled },
  icon: { width: unit[20], height: unit[20] },
  menu: {
    marginTop: unit[4],
    maxHeight: 168,
    padding: unit[2],
    borderRadius: unit[4],
    backgroundColor: dropdown.background.default,
  },
  option: { paddingHorizontal: unit[6], paddingVertical: unit[4], borderRadius: unit[2] },
  optionPressed: { backgroundColor: semanticTokens.color.background.tertiary },
  optionText: {
    ...typography.caption2,
    color: semanticTokens.color.text.primary,
    includeFontPadding: false,
  },
});
