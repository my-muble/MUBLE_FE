import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';

import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '@/styles';

import { MyAvatar, MyHeader } from './MyCommon';

import { getMyStatistics, useMyProfile, type MyStatistics, type RatingBin } from './myData';

type StatisticsMode = 'all' | 'monthly';

type SelectedMonth = {
  year: number;
  month: number;
};

function changeMonth(current: SelectedMonth, amount: number): SelectedMonth {
  const date = new Date(current.year, current.month - 1 + amount, 1);

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
}

function StatisticsSwitch({
  mode,
  onChange,
}: {
  mode: StatisticsMode;
  onChange: (mode: StatisticsMode) => void;
}) {
  return (
    <View style={styles.switchOuter}>
      <View style={styles.switchTrack}>
        <Pressable
          style={[styles.switchItem, mode === 'all' && styles.switchSelected]}
          onPress={() => onChange('all')}
        >
          <Text style={[styles.switchText, mode === 'all' && styles.switchSelectedText]}>전체</Text>
        </Pressable>

        <Pressable
          style={[styles.switchItem, mode === 'monthly' && styles.switchSelected]}
          onPress={() => onChange('monthly')}
        >
          <Text style={[styles.switchText, mode === 'monthly' && styles.switchSelectedText]}>
            월별
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function MonthSelector({
  selected,
  onChange,
  onOpenPicker,
}: {
  selected: SelectedMonth;
  onChange: (month: SelectedMonth) => void;
  onOpenPicker: () => void;
}) {
  return (
    <View style={styles.monthSelector}>
      <Pressable
        style={styles.monthArrow}
        onPress={() => onChange(changeMonth(selected, -1))}
        accessibilityLabel="이전 달"
      >
        <Ionicons name="chevron-back" size={20} color={colors.gray[700]} />
      </Pressable>

      <Pressable style={styles.monthLabelButton} onPress={onOpenPicker}>
        <Text style={styles.monthLabel}>
          {selected.year}년 {selected.month}월
        </Text>

        <Ionicons name="chevron-down" size={14} color={colors.gray[900]} />
      </Pressable>

      <Pressable
        style={styles.monthArrow}
        onPress={() => onChange(changeMonth(selected, 1))}
        accessibilityLabel="다음 달"
      >
        <Ionicons name="chevron-forward" size={20} color={colors.gray[300]} />
      </Pressable>
    </View>
  );
}

function MonthPicker({
  visible,
  selected,
  onSelect,
  onClose,
}: {
  visible: boolean;
  selected: SelectedMonth;
  onSelect: (month: SelectedMonth) => void;
  onClose: () => void;
}) {
  const options = useMemo(
    () => Array.from({ length: 12 }, (_, index) => changeMonth({ year: 2026, month: 10 }, -index)),
    [],
  );

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalLayer}>
        <Pressable style={styles.modalOverlay} onPress={onClose} />

        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>월 선택</Text>

            <Pressable onPress={onClose}>
              <Ionicons name="close" size={22} color={colors.gray[700]} />
            </Pressable>
          </View>

          <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
            {options.map((month) => {
              const active = month.year === selected.year && month.month === selected.month;

              return (
                <Pressable
                  key={`${month.year}-${month.month}`}
                  style={styles.modalOption}
                  onPress={() => {
                    onSelect(month);
                    onClose();
                  }}
                >
                  <Text style={[styles.modalOptionText, active && styles.modalOptionSelected]}>
                    {month.year}년 {month.month}월
                  </Text>

                  {active && <Ionicons name="checkmark" size={18} color={colors.gray[900]} />}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function RecordCountCard({ statistics }: { statistics: MyStatistics }) {
  const items = [
    {
      label: '기록 수',
      value: statistics.totalRecords,
    },
    {
      label: '앨범 기록',
      value: statistics.albumRecords,
    },
    {
      label: '곡 기록',
      value: statistics.songRecords,
    },
  ];

  return (
    <View style={styles.recordCountCard}>
      {items.map((item, index) => (
        <View key={item.label} style={[styles.countItem, index > 0 && styles.countDivider]}>
          <Text style={styles.countLabel}>{item.label}</Text>

          <View style={styles.countValueRow}>
            <Text style={styles.countValue}>{item.value}</Text>

            <Text style={styles.countUnit}>개</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function RatingChart({ distribution }: { distribution: RatingBin[] }) {
  const maxCount = Math.max(0, ...distribution.map((item) => item.count));

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chartYAxis}>
        {[15, 10, 5, 0].map((value) => (
          <Text key={value} style={styles.axisLabel}>
            {value}
          </Text>
        ))}
      </View>

      <View style={styles.chartPlot}>
        <View style={styles.chartGrid} pointerEvents="none">
          {[15, 10, 5, 0].map((value) => (
            <View key={value} style={styles.gridLine} />
          ))}
        </View>

        <View style={styles.chartBars}>
          {distribution.map((item) => {
            const hasRecords = item.count > 0;

            const isHighest = hasRecords && item.count === maxCount;

            return (
              <View key={item.score} style={styles.barColumn}>
                {hasRecords && (
                  <View style={styles.barStack}>
                    <Text style={[styles.barCount, isHighest && styles.barCountHighlighted]}>
                      {item.count}
                    </Text>

                    <View
                      style={[
                        styles.bar,
                        {
                          backgroundColor: isHighest ? '#111113' : '#CDC DD5'.replace(' ', ''),
                        },
                      ]}
                    />
                  </View>
                )}

                <Text style={styles.scoreLabel}>{item.score.toFixed(1)}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function RatingDistributionCard({ statistics }: { statistics: MyStatistics }) {
  return (
    <View style={styles.ratingCard}>
      <View style={styles.ratingHeader}>
        <Text style={styles.ratingTitle}>별점 분포</Text>

        <View style={styles.ratedCountRow}>
          <Text style={styles.ratedCountLabel}>별점 기록</Text>

          <Text style={styles.ratedCountValue}>{statistics.ratedRecords}개</Text>
        </View>
      </View>

      <View style={styles.averageRow}>
        <Text style={styles.averageLabel}>평균 별점</Text>

        <Text style={styles.averageValue}>
          {statistics.ratedRecords === 0 ? '0' : statistics.averageRating.toFixed(1)}
        </Text>

        <Text style={styles.averageMax}>/ 5</Text>
      </View>

      <RatingChart distribution={statistics.distribution} />
    </View>
  );
}

export default function MyScreen() {
  const profile = useMyProfile();

  const [mode, setMode] = useState<StatisticsMode>('all');

  const [selectedMonth, setSelectedMonth] = useState<SelectedMonth>({
    year: 2026,
    month: 10,
  });

  const [pickerVisible, setPickerVisible] = useState(false);

  const statistics = getMyStatistics(mode, selectedMonth.year, selectedMonth.month);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <MyHeader onSettingsPress={() => router.push('/my/settings')} />

        <View style={styles.profileSection}>
          <MyAvatar
            editable
            photoUri={profile.photoUri}
            onPress={() => router.push('/my/edit-name')}
          />

          <View style={styles.profileInfo}>
            <Text style={styles.nickname} numberOfLines={1}>
              {profile.nickname}
            </Text>

            <Text style={styles.handle} numberOfLines={1}>
              {profile.handle}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.headingText}>나의 기록 통계</Text>
        </View>

        <StatisticsSwitch mode={mode} onChange={setMode} />

        {mode === 'monthly' ? (
          <MonthSelector
            selected={selectedMonth}
            onChange={setSelectedMonth}
            onOpenPicker={() => setPickerVisible(true)}
          />
        ) : (
          <View style={styles.allModeSpacer} />
        )}

        <View style={styles.statisticsArea}>
          <RecordCountCard statistics={statistics} />

          <RatingDistributionCard statistics={statistics} />
        </View>
      </ScrollView>

      <MonthPicker
        visible={pickerVisible}
        selected={selectedMonth}
        onSelect={setSelectedMonth}
        onClose={() => setPickerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray.white,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 32,
  },

  profileSection: {
    height: 158,
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
  },

  profileInfo: {
    flex: 1,
    marginBottom: 14,
    gap: 4,
  },

  nickname: {
    ...typography.title1,
    fontSize: 22,
    lineHeight: 33,
    fontWeight: '700',
    color: colors.gray[900],
  },

  handle: {
    ...typography.body2,
    fontWeight: '400',
    color: colors.gray[300],
  },

  sectionHeading: {
    height: 45,
    paddingHorizontal: 22,
    justifyContent: 'center',
  },

  headingText: {
    ...typography.body2,
    fontWeight: '600',
    color: colors.gray[900],
  },

  switchOuter: {
    height: 49,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },

  switchTrack: {
    flex: 1,
    flexDirection: 'row',
    padding: 4,
    borderRadius: 12,
    backgroundColor: colors.gray[50],
  },

  switchItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  switchSelected: {
    backgroundColor: colors.gray.white,
  },

  switchText: {
    ...typography.body2,
    color: colors.gray[500],
  },

  switchSelectedText: {
    fontWeight: '600',
    color: colors.gray[900],
  },

  allModeSpacer: {
    height: 16,
  },

  monthSelector: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  monthArrow: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  monthLabelButton: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  monthLabel: {
    ...typography.body2,
    fontWeight: '700',
    color: colors.gray[900],
  },

  statisticsArea: {
    paddingHorizontal: 20,
    gap: 16,
  },

  recordCountCard: {
    height: 80,
    borderRadius: 16,
    backgroundColor: colors.gray[50],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  countItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  countDivider: {
    borderLeftWidth: 1,
    borderLeftColor: colors.gray[100],
  },

  countLabel: {
    ...typography.caption1,
    fontWeight: '400',
    color: colors.gray[500],
  },

  countValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },

  countValue: {
    ...typography.title1,
    fontSize: 22,
    lineHeight: 30,
    color: colors.gray[900],
  },

  countUnit: {
    ...typography.caption1,
    color: colors.gray[500],
  },

  ratingCard: {
    height: 255,
    borderRadius: 16,
    backgroundColor: colors.gray[50],
    padding: 16,
  },

  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  ratingTitle: {
    ...typography.body2,
    fontWeight: '700',
    color: colors.gray[900],
  },

  ratedCountRow: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },

  ratedCountLabel: {
    ...typography.caption1,
    fontWeight: '400',
    color: colors.gray[300],
  },

  ratedCountValue: {
    ...typography.caption1,
    fontWeight: '600',
    color: colors.gray[900],
  },

  averageRow: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  averageLabel: {
    ...typography.caption1,
    fontWeight: '400',
    color: colors.gray[500],
    marginRight: 2,
  },

  averageValue: {
    ...typography.head2,
    fontSize: 26,
    lineHeight: 36,
    color: colors.gray[900],
  },

  averageMax: {
    ...typography.caption1,
    color: colors.gray[500],
  },

  chartContainer: {
    height: 145,
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },

  chartYAxis: {
    width: 22,
    height: 122,
    paddingTop: 4,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  axisLabel: {
    ...typography.caption2,
    fontSize: 10,
    lineHeight: 14,
    color: colors.gray[500],
  },

  chartPlot: {
    flex: 1,
    height: 145,
    minWidth: 0,
    position: 'relative',
  },

  chartGrid: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 8,
    height: 114,
    justifyContent: 'space-between',
  },

  gridLine: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
    borderStyle: 'dashed',
  },

  chartBars: {
    width: '100%',
    height: 145,
    flexDirection: 'row',
    gap: 4,
  },

  barColumn: {
    flex: 1,
    minWidth: 0,
    height: 145,
    position: 'relative',
    alignItems: 'center',
  },

  barStack: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },

  barCount: {
    ...typography.caption2,
    fontSize: 10,
    lineHeight: 14,
    color: colors.gray[300],
    textAlign: 'center',
  },

  barCountHighlighted: {
    color: colors.gray[900],
  },

  bar: {
    width: 22,
    height: 36,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },

  scoreLabel: {
    position: 'absolute',
    bottom: 6,
    left: 0,
    right: 0,
    fontSize: 10,
    lineHeight: 14,
    color: colors.gray[500],
    textAlign: 'center',
  },

  modalLayer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },

  modalCard: {
    width: '85%',
    maxWidth: 360,
    maxHeight: 450,
    backgroundColor: colors.gray.white,
    borderRadius: 16,
    padding: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  modalTitle: {
    ...typography.title2,
    color: colors.gray[900],
  },

  modalList: {
    maxHeight: 360,
  },

  modalOption: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  modalOptionText: {
    ...typography.body2,
    color: colors.gray[700],
  },

  modalOptionSelected: {
    fontWeight: '700',
    color: colors.gray[900],
  },
});
