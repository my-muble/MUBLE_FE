import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Image, Pressable, StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/styles';

const DEFAULT_TURNTABLE = require('../../assets/my/default-turntable.png');
const DEFAULT_AVATAR = require('../../assets/my/default-avatar.png');

type HeaderProps = {
  showBack?: boolean;
  onSettingsPress?: () => void;
};

export function MyHeader({ showBack = false, onSettingsPress }: HeaderProps) {
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: insets.top,
          height: insets.top + 64,
        },
      ]}
    >
      <View style={styles.headerContent}>
        {showBack ? (
          <Pressable
            style={styles.headerButton}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel="뒤로가기"
          >
            <Ionicons name="chevron-back" size={24} color={colors.gray[500]} />
          </Pressable>
        ) : (
          <View style={styles.headerButtonSpace} />
        )}

        {onSettingsPress ? (
          <Pressable
            style={styles.headerButton}
            onPress={onSettingsPress}
            accessibilityRole="button"
            accessibilityLabel="설정"
          >
            <Ionicons name="settings-outline" size={24} color={colors.gray[500]} />
          </Pressable>
        ) : (
          <View style={styles.headerButton}>
            <Ionicons name="settings-outline" size={24} color={colors.gray[500]} />
          </View>
        )}
      </View>
    </View>
  );
}

type AvatarProps = {
  round?: boolean;
  editable?: boolean;
  photoUri?: string | null;
  onPress?: () => void;
};

export function MyAvatar({ round = false, editable = false, photoUri, onPress }: AvatarProps) {
  const hasPhoto = Boolean(photoUri);
  const isRound = round || hasPhoto;

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={onPress ? '프로필 사진 수정' : undefined}
      style={[styles.avatarContainer, isRound ? styles.roundContainer : styles.turntableContainer]}
    >
      {hasPhoto ? (
        <Image source={{ uri: photoUri! }} style={styles.profilePhoto} resizeMode="cover" />
      ) : round ? (
        <Image source={DEFAULT_AVATAR} style={styles.defaultRoundAvatar} resizeMode="contain" />
      ) : (
        <Image source={DEFAULT_TURNTABLE} style={styles.defaultTurntable} resizeMode="contain" />
      )}

      {editable && hasPhoto && (
        <View style={styles.editBadge}>
          <Ionicons name="pencil" size={12} color={colors.gray.white} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.gray.white,
    justifyContent: 'flex-end',
  },

  headerContent: {
    height: 64,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerButton: {
    width: 32,
    height: 32,
    backgroundColor: colors.gray[50],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerButtonSpace: {
    width: 32,
    height: 32,
  },

  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },

  turntableContainer: {
    width: 150,
    height: 129,
  },

  roundContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  defaultTurntable: {
    width: 150,
    height: 129,
  },

  defaultRoundAvatar: {
    width: 120,
    height: 120,
  },

  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  editBadge: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.gray[900],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 2,
  },
});
