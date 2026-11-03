import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, typography } from '@/styles';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gray[900],
        tabBarInactiveTintColor: colors.gray[500],
        tabBarLabelStyle: typography.caption1,
        tabBarStyle: {
          backgroundColor: colors.gray[50],
          borderTopWidth: 0,
          elevation: 0,
          height: 71 + insets.bottom,
          paddingTop: 12,
          paddingBottom: insets.bottom,
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="archive"
        options={{
          title: 'Archive',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'archive' : 'archive-outline'} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="my"
        options={{
          title: 'My',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
