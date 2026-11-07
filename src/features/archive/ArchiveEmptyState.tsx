import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { componentTokens, layout, primitiveTokens, semanticTokens, typography } from '@/styles';

type ArchiveEmptyStateProps = {
  year?: number;
  onRecordPress?: () => void;
};

const { unit } = primitiveTokens;
const { button, emptyMessage } = componentTokens;

export default function ArchiveEmptyState({ year, onRecordPress }: ArchiveEmptyStateProps) {
  return (
    <ScrollView
      contentContainerStyle={[styles.content, year !== undefined && styles.yearContent]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.iconBackground}>
        <Image source={require('@/assets/archive/pencil.svg')} style={styles.icon} />
      </View>

      <View style={styles.message}>
        <Text style={styles.title}>
          {year === undefined ? '아직 작성한 기록이 없어요.' : `‘${year}’년에 작성한 기록이 없어요`}
        </Text>
        <Text style={styles.description}>
          {year === undefined
            ? '음악에 대한 감상을 기록하면 이곳에 모여요.'
            : '다른 연도를 선택해 확인해 보세요.'}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={!onRecordPress}
        onPress={onRecordPress}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>기록하러 가기</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: unit[16],
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingBottom: unit[80] + unit[10],
  },
  yearContent: { paddingHorizontal: 0, paddingBottom: unit[80] + unit[68] + unit[2] },
  iconBackground: {
    width: unit[48],
    height: unit[48],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: unit[4],
    backgroundColor: semanticTokens.color.background.primary,
  },
  icon: { width: unit[32], height: unit[32] },
  message: { gap: unit[4], alignItems: 'center' },
  title: {
    ...typography.label1,
    color: emptyMessage.message,
    textAlign: 'center',
    includeFontPadding: false,
  },
  description: {
    ...typography.body2,
    color: emptyMessage.message,
    textAlign: 'center',
    includeFontPadding: false,
  },
  button: {
    paddingHorizontal: unit[16],
    paddingVertical: unit[10],
    borderRadius: unit[4],
    backgroundColor: button.primary.background.default,
  },
  buttonPressed: { backgroundColor: button.primary.background.pressed },
  buttonText: {
    ...typography.label2,
    color: button.primary.text.default,
    includeFontPadding: false,
  },
});
