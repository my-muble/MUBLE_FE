import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RecentSearchProvider } from '@/features/search/RecentSearchContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <RecentSearchProvider>
        <StatusBar style="auto" />

        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'default',
          }}
        />
      </RecentSearchProvider>
    </SafeAreaProvider>
  );
}
