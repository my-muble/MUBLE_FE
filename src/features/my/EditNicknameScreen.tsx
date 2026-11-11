import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import {
  ActionSheetIOS,
  Alert,
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

import { MyAvatar, MyHeader } from './MyCommon';
import { updateMyNickname, updateMyPhoto, useMyProfile } from './myData';

export default function EditNicknameScreen() {
  const insets = useSafeAreaInsets();
  const profile = useMyProfile();

  const [nickname, setNickname] = useState(profile.nickname);
  const [focused, setFocused] = useState(false);
  const [selectedPhotoUri, setSelectedPhotoUri] = useState<string | null>(profile.photoUri);

  const nicknameChanged = nickname.trim().length > 0 && nickname.trim() !== profile.nickname;

  const photoChanged = selectedPhotoUri !== profile.photoUri;

  const canSave = nicknameChanged || photoChanged;

  const pickPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedPhotoUri(result.assets[0].uri);
      }
    } catch {
      Alert.alert('사진 선택 오류', '사진을 불러오지 못했습니다. 다시 시도해 주세요.');
    }
  };

  const openPhotoMenu = () => {
    if (!selectedPhotoUri) {
      pickPhoto();
      return;
    }

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['사진 변경하기', '기본 이미지로 변경', '취소'],
          cancelButtonIndex: 2,
          destructiveButtonIndex: 1,
        },
        (index) => {
          if (index === 0) {
            pickPhoto();
          } else if (index === 1) {
            setSelectedPhotoUri(null);
          }
        },
      );
    } else {
      Alert.alert('프로필 사진', '원하는 작업을 선택해 주세요.', [
        {
          text: '사진 변경하기',
          onPress: pickPhoto,
        },
        {
          text: '기본 이미지로 변경',
          style: 'destructive',
          onPress: () => setSelectedPhotoUri(null),
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ]);
    }
  };

  const handleSave = () => {
    if (!canSave) return;

    if (nicknameChanged) {
      updateMyNickname(nickname);
    }

    if (photoChanged) {
      updateMyPhoto(selectedPhotoUri);
    }

    Keyboard.dismiss();

    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <MyHeader showBack />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <View style={styles.avatarSection}>
            <MyAvatar round photoUri={selectedPhotoUri} onPress={openPhotoMenu} />
          </View>

          <View style={styles.spacer} />

          <View style={styles.fieldSection}>
            <Text style={styles.fieldLabel}>이름</Text>

            <View style={[styles.inputContainer, focused && styles.inputFocused]}>
              <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="이름을 입력하세요."
                placeholderTextColor={colors.gray[300]}
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleSave}
              />

              <Pressable
                style={styles.clearButton}
                onPress={() => setNickname('')}
                accessibilityRole="button"
                accessibilityLabel="이름 지우기"
              >
                <Ionicons name="close-circle-outline" size={20} color={colors.gray[500]} />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
          <Pressable
            disabled={!canSave}
            style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
            onPress={handleSave}
          >
            <Text style={[styles.saveButtonText, !canSave && styles.saveButtonTextDisabled]}>
              저장하기
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

  content: {
    flex: 1,
  },

  avatarSection: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },

  spacer: {
    height: 20,
  },

  fieldSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 10,
  },

  fieldLabel: {
    ...typography.body2,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.gray[900],
  },

  inputContainer: {
    height: 48,
    backgroundColor: colors.gray[50],
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.gray[50],
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 6,
  },

  inputFocused: {
    backgroundColor: colors.gray.white,
    borderColor: colors.gray[900],
  },

  input: {
    ...typography.body2,
    flex: 1,
    minWidth: 0,
    height: '100%',
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

  saveButton: {
    height: 56,
    borderRadius: 8,
    backgroundColor: colors.gray[900],
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonDisabled: {
    backgroundColor: colors.gray[100],
  },

  saveButtonText: {
    ...typography.body2,
    fontSize: 16,
    fontWeight: '500',
    color: colors.gray.white,
  },

  saveButtonTextDisabled: {
    color: colors.gray[300],
  },
});
