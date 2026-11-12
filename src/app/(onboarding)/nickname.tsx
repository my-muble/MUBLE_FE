import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, typography } from '@/styles';

export default function EditNicknameScreen() {
  const insets = useSafeAreaInsets();

  const [nickname, setNickname] = useState('');

  const normalizedNickname = nickname.trim();
  const canContinue = normalizedNickname.length > 0;

  const handleComplete = () => {
    if (!canContinue) return;

    Keyboard.dismiss();

    router.replace({
      pathname: '/(onboarding)/complete',
      params: {
        nickname: normalizedNickname,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.main, { paddingTop: insets.top + 64 }]}>
          <View style={styles.headingArea}>
            <Text style={styles.title}>닉네임을 입력해주세요</Text>
          </View>

          <View style={styles.inputArea}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
                placeholder="이름을 입력하세요"
                placeholderTextColor={colors.gray[300]}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleComplete}
                accessibilityLabel="닉네임 입력"
              />

              <Pressable
                style={styles.clearButton}
                onPress={() => setNickname('')}
                accessibilityRole="button"
                accessibilityLabel="입력한 닉네임 지우기"
              >
                <Ionicons name="close-circle-outline" size={20} color={colors.gray[500]} />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
          <Pressable
            disabled={!canContinue}
            onPress={handleComplete}
            style={({ pressed }) => [
              styles.completeButton,
              !canContinue && styles.disabledButton,
              pressed && styles.pressedButton,
            ]}
            accessibilityRole="button"
          >
            <Text style={[styles.completeButtonText, !canContinue && styles.disabledButtonText]}>
              완료
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray.white,
  },

  keyboardView: {
    flex: 1,
  },

  main: {
    flex: 1,
  },

  headingArea: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },

  title: {
    ...typography.head2,
    fontSize: 22,
    lineHeight: 31,
    fontWeight: '700',
    color: colors.gray[900],
  },

  description: {
    ...typography.body2,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
    color: colors.gray[500],
    marginLeft: 2,
  },

  inputArea: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  inputContainer: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    borderRadius: 6,
    paddingLeft: 16,
    paddingRight: 6,
  },

  input: {
    ...typography.body2,
    flex: 1,
    minWidth: 0,
    height: '100%',
    fontSize: 14,
    lineHeight: 21,
    color: colors.gray[900],
    padding: 0,
  },

  clearButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: colors.gray.white,
  },

  completeButton: {
    height: 56,
    borderRadius: 8,
    backgroundColor: '#0B0B0B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledButton: {
    backgroundColor: colors.gray[100],
  },

  pressedButton: {
    opacity: 0.8,
  },

  completeButtonText: {
    ...typography.body2,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.gray.white,
  },

  disabledButtonText: {
    color: colors.gray[300],
  },
});
