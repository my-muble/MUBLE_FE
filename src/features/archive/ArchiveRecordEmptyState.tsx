import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { componentTokens, primitiveTokens, semanticTokens, typography } from '@/styles';

const { unit } = primitiveTokens;

export default function ArchiveRecordEmptyState({ target }: { target: 'album' | 'track' }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBackground}>
        <Image source={require('@/assets/archive/pencil.svg')} style={styles.icon} />
      </View>
      <View style={styles.message}>
        <Text style={styles.title}>아직 남긴 기록이 없어요.</Text>
        <Text style={styles.description}>
          {target === 'track'
            ? '이 곡을 들으며 느낀 순간을 기록해보세요.'
            : '이 앨범을 들으며 느낀 순간을 기록해보세요.'}
        </Text>
      </View>
      <Pressable accessibilityRole="button" disabled style={styles.button}>
        <Text style={styles.buttonLabel}>기록하러 가기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 369,
    paddingTop: unit[32],
    paddingBottom: unit[48],
    paddingHorizontal: unit[20],
    justifyContent: 'center',
    alignItems: 'center',
    gap: unit[16],
  },
  iconBackground: {
    width: unit[48],
    height: unit[48],
    borderRadius: unit[4],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: semanticTokens.color.background.primary,
  },
  icon: { width: unit[32], height: unit[32] },
  message: { alignItems: 'center', gap: unit[4] },
  title: { ...typography.label1, color: componentTokens.emptyMessage.message, textAlign: 'center' },
  description: {
    ...typography.body2,
    color: componentTokens.emptyMessage.message,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: unit[16],
    paddingVertical: unit[10],
    borderRadius: unit[4],
    backgroundColor: componentTokens.button.primary.background.default,
  },
  buttonLabel: { ...typography.label2, color: componentTokens.button.primary.text.default },
});
