import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, typography } from '@/styles';

const MUBLE_MARK = require('../../assets/auth/muble-mark.png');
const KAKAO_ICON = require('../../assets/auth/kakao.png');
const GOOGLE_ICON = require('../../assets/auth/google.png');
const APPLE_ICON = require('../../assets/auth/apple.png');

type SocialLoginButtonProps = {
  label: string;
  icon: number;
  onPress: () => void;
};

function SocialLoginButton({ label, icon, onPress }: SocialLoginButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.socialButton, pressed && styles.socialButtonPressed]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Image source={icon} style={styles.socialIcon} resizeMode="contain" />

      <Text style={styles.socialButtonText}>{label}</Text>
    </Pressable>
  );
}

export default function LoginScreen() {
  const insets = useSafeAreaInsets();

  // UI 테스트용 임시 이동
  // 실제 소셜 로그인 API 연동 시 교체
  const handleMockLogin = () => {
    router.replace('/(onboarding)/nickname');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={[styles.hero, { paddingTop: insets.top }]}>
        <Image source={MUBLE_MARK} style={styles.brandLogo} resizeMode="contain" />

        <View style={styles.brandTextGroup}>
          <Text style={styles.brandTitle}>Dear Music, Love MUBLE</Text>

          <Text style={styles.brandDescription}>음악에 담긴 나의 순간을 기록해보세요.</Text>
        </View>
      </View>

      <View
        style={[
          styles.loginArea,
          {
            paddingBottom: Math.max(insets.bottom, 16) + 64,
          },
        ]}
      >
        <SocialLoginButton label="카카오로 시작하기" icon={KAKAO_ICON} onPress={handleMockLogin} />

        <SocialLoginButton label="구글로 시작하기" icon={GOOGLE_ICON} onPress={handleMockLogin} />

        <SocialLoginButton label="애플로 시작하기" icon={APPLE_ICON} onPress={handleMockLogin} />
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  brandLogo: {
    width: 100,
    height: 133,
  },

  brandTextGroup: {
    marginTop: 36,
    alignItems: 'center',
    gap: 8,
  },

  brandTitle: {
    ...typography.head2,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: colors.gray[900],
    textAlign: 'center',
  },

  brandDescription: {
    ...typography.body2,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.gray[700],
    textAlign: 'center',
  },

  loginArea: {
    paddingTop: 16,
    paddingHorizontal: 20,
    gap: 12,
  },

  socialButton: {
    height: 56,
    borderRadius: 8,
    backgroundColor: colors.gray[50],
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  socialButtonPressed: {
    opacity: 0.75,
  },

  socialIcon: {
    position: 'absolute',
    left: 16,
    width: 24,
    height: 24,
  },

  socialButtonText: {
    ...typography.body2,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.gray[900],
  },
});
