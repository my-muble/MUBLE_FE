import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '@/styles';

import { MyHeader } from './MyCommon';

type MenuIcon = keyof typeof Ionicons.glyphMap;

type MenuItem = {
  title: string;
  icon: MenuIcon;
  onPress: () => void;
};

function SettingsSection({ title, items }: { title: string; items: MenuItem[] }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <View style={styles.menuContainer}>
        <View style={styles.menuCard}>
          {items.map((item, index) => (
            <Pressable
              key={item.title}
              style={[styles.menuRow, index < items.length - 1 && styles.menuDivider]}
              onPress={item.onPress}
              accessibilityRole="button"
            >
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon} size={20} color={colors.gray[500]} />

                <Text style={styles.menuText}>{item.title}</Text>
              </View>

              <Ionicons name="chevron-forward" size={24} color={colors.gray[500]} />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

export default function MySettingsScreen() {
  const showPending = (feature: string) => {
    Alert.alert(feature, '추후 기능 연동 시 연결할 예정입니다.');
  };

  const accountMenus: MenuItem[] = [
    {
      title: '계정 정보',
      icon: 'person-outline',
      onPress: () => router.push('/my/edit-name'),
    },
    {
      title: '로그아웃',
      icon: 'log-out-outline',
      onPress: () => showPending('로그아웃'),
    },
  ];

  const otherMenus: MenuItem[] = [
    {
      title: '서비스 이용약관',
      icon: 'document-text-outline',
      onPress: () => showPending('서비스 이용약관'),
    },
    {
      title: '개인정보 처리방침',
      icon: 'shield-checkmark-outline',
      onPress: () => showPending('개인정보 처리방침'),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <MyHeader showBack />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SettingsSection title="계정" items={accountMenus} />

        <View style={styles.sectionGap} />

        <SettingsSection title="기타" items={otherMenus} />
      </ScrollView>
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
    paddingTop: 8,
    paddingBottom: 32,
  },

  section: {
    width: '100%',
  },

  sectionHeader: {
    height: 45,
    paddingHorizontal: 22,
    justifyContent: 'center',
  },

  sectionTitle: {
    ...typography.body2,
    fontWeight: '600',
    color: colors.gray[900],
  },

  menuContainer: {
    paddingHorizontal: 20,
  },

  menuCard: {
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    overflow: 'hidden',
  },

  menuRow: {
    height: 60,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  menuDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },

  menuLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  menuText: {
    ...typography.body2,
    color: colors.gray[700],
  },

  sectionGap: {
    height: 32,
  },
});
