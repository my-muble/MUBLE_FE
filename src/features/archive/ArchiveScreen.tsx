import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useMemo, useState } from 'react';
import { BackHandler, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { componentTokens, layout, primitiveTokens, typography } from '@/styles';

import ArchiveDateCard from './ArchiveDateCard';
import ArchiveEmptyState from './ArchiveEmptyState';
import { getArchiveMonths, getArchiveYears, type ArchiveTimelineData } from './archiveTimeline';
import ArchiveYearSelect from './ArchiveYearSelect';

type ArchiveScreenProps = ArchiveTimelineData & {
  onDatePress?: (date: string) => void;
  onRecordPress?: () => void;
};

const tabs = [
  { id: 'timeline', label: '시간순' },
  { id: 'album', label: '앨범순' },
] as const;

type ArchiveTab = (typeof tabs)[number]['id'];

const { unit } = primitiveTokens;
const { segmentedControl, topBar, sectionHeader } = componentTokens;

function DateSeparator() {
  return (
    <View style={styles.dateSeparator}>
      <Image source={require('@/assets/archive/timeline-line.svg')} style={styles.separatorLine} />
    </View>
  );
}

export default function ArchiveScreen({
  days,
  latestYear,
  onDatePress,
  onRecordPress,
}: ArchiveScreenProps) {
  const [tab, setTab] = useState<ArchiveTab>('timeline');
  const [year, setYear] = useState<number>();
  const [yearMenuOpen, setYearMenuOpen] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const years = useMemo(() => getArchiveYears(days, latestYear), [days, latestYear]);
  const selectedYear = year !== undefined && years.includes(year) ? year : (years[0] ?? latestYear);
  const months = useMemo(() => getArchiveMonths(days, selectedYear), [days, selectedYear]);

  useFocusEffect(
    useCallback(() => {
      if (!yearMenuOpen) return;

      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        setYearMenuOpen(false);
        return true;
      });

      return () => subscription.remove();
    }, [yearMenuOpen]),
  );

  const selectTab = (nextTab: ArchiveTab) => {
    setTab(nextTab);
    setYearMenuOpen(false);
  };

  const selectYear = (nextYear: number) => {
    setYear(nextYear);
    setYearMenuOpen(false);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text accessibilityRole="header" style={styles.title}>
          Archive
        </Text>
        <View accessibilityRole="tablist" style={styles.tabs}>
          {tabs.map(({ id, label }) => {
            const selected = tab === id;

            return (
              <Pressable
                key={id}
                accessibilityRole="tab"
                aria-selected={selected}
                onPress={() => selectTab(id)}
                style={[styles.segment, selected && styles.activeSegment]}
              >
                <Text style={selected ? styles.activeTabLabel : styles.tabLabel}>{label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {days.length === 0 ? (
        <ArchiveEmptyState onRecordPress={onRecordPress} />
      ) : (
        tab === 'timeline' && (
          <View
            style={styles.timeline}
            onLayout={({ nativeEvent }) => setCardWidth(nativeEvent.layout.width)}
          >
            <View style={styles.yearRow}>
              {months[0] && (
                <Text accessibilityRole="header" style={styles.monthLabel}>
                  {months[0].title}
                </Text>
              )}
            </View>

            {months.length === 0 ? (
              <ArchiveEmptyState year={selectedYear} onRecordPress={onRecordPress} />
            ) : (
              cardWidth > 0 && (
                <SectionList
                  key={selectedYear}
                  sections={months}
                  keyExtractor={(day) => day.date}
                  stickySectionHeadersEnabled={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.list}
                  ItemSeparatorComponent={DateSeparator}
                  renderSectionHeader={({ section }) =>
                    section.key === months[0].key ? null : (
                      <Text accessibilityRole="header" style={styles.monthHeading}>
                        {section.title}
                      </Text>
                    )
                  }
                  renderItem={({ item }) => (
                    <ArchiveDateCard day={item} width={cardWidth} onPress={onDatePress} />
                  )}
                />
              )
            )}

            {yearMenuOpen && (
              <Pressable
                accessible={false}
                onPress={() => setYearMenuOpen(false)}
                style={styles.menuBackdrop}
              />
            )}
            <ArchiveYearSelect
              years={years}
              selectedYear={selectedYear}
              expanded={yearMenuOpen}
              onToggle={() => setYearMenuOpen((open) => !open)}
              onSelect={selectYear}
            />
          </View>
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: unit[20],
    paddingBottom: unit[12],
    gap: unit[12],
  },
  title: { ...typography.head1, color: topBar.title.default, includeFontPadding: false },
  tabs: {
    flexDirection: 'row',
    gap: unit[4],
    padding: unit[4],
    borderRadius: unit[12],
    backgroundColor: segmentedControl.background.inactive,
  },
  segment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: unit[6],
    borderRadius: unit[8],
  },
  activeSegment: {
    backgroundColor: segmentedControl.background.active,
    boxShadow: '1px 3px 20px rgba(17,17,19,0.04), 0px 2px 2px rgba(17,17,19,0.03)',
  },
  tabLabel: {
    ...typography.body1,
    color: segmentedControl.text.inactive,
    includeFontPadding: false,
  },
  activeTabLabel: {
    ...typography.label2,
    color: segmentedControl.text.active,
    includeFontPadding: false,
  },
  timeline: { flex: 1, marginHorizontal: layout.screenPaddingHorizontal },
  yearRow: {
    minHeight: unit[60],
    justifyContent: 'center',
    paddingLeft: unit[2],
    paddingRight: unit[80],
  },
  monthLabel: { ...typography.title2, color: sectionHeader.text.title, includeFontPadding: false },
  monthHeading: {
    ...typography.title2,
    color: sectionHeader.text.title,
    includeFontPadding: false,
    paddingLeft: unit[2],
    paddingTop: unit[28],
    paddingBottom: unit[16],
  },
  list: { paddingBottom: unit[80] + unit[8] },
  dateSeparator: { height: unit[12], justifyContent: 'center', marginLeft: unit[24] - 6.5 },
  separatorLine: { width: 13, height: 1, transform: [{ rotate: '90deg' }] },
  menuBackdrop: { ...StyleSheet.absoluteFill, zIndex: 1 },
});
