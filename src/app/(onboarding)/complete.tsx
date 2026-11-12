import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { updateMyNickname } from '@/features/my/myData';
import { colors, typography } from '@/styles';

const MUBLE_MARK = require('../../assets/auth/muble-mark.png');

export default function OnboardingCompleteScreen() {
  const insets = useSafeAreaInsets();

  const { nickname } = useLocalSearchParams<{ nickname?: string }>();

  const displayName = typeof nickname === 'string' ? nickname.trim() || '사용자' : '사용자';

  const handleStart = () => {
    //실제 회원가입 api 연동 전 임시 프로필 반영
    updateMyNickname(displayName);

    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.hero}>
        <Image source={MUBLE_MARK} style={styles.brandLogo} resizeMode="contain" />

        <View style={styles.messageGroup}>
          <Text style={styles.title}>환영해요, {displayName}!</Text>

          <Text style={styles.description}>
            지금부터 MUBLE과{'\n'}
            즐거운 음악생활을 시작하세요
          </Text>
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
        <Pressable
          onPress={handleStart}
          style={({ pressed }) => [styles.startButton, pressed && styles.pressedButton]}
          accessibilityRole="button"
        >
          <Text style={styles.startButtonText}>기록 시작하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray.white,
  },

  hero: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 200,
    paddingHorizontal: 22,
  },

  brandLogo: {
    width: 80,
    height: 106,
  },

  messageGroup: {
    marginTop: 36,
    gap: 8,
    alignItems: 'center',
    width: '100%',
  },

  title: {
    ...typography.head2,
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '900',
    color: colors.gray[900],
    textAlign: 'center',
  },

  description: {
    ...typography.body2,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.gray[500],
    textAlign: 'center',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: colors.gray.white,
  },

  startButton: {
    height: 56,
    borderRadius: 8,
    backgroundColor: '#0B0B0B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pressedButton: {
    opacity: 0.8,
  },

  startButtonText: {
    ...typography.body2,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.gray.white,
  },
});
