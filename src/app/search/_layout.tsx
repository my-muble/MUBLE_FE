import { Stack } from 'expo-router';

import { RecentSearchProvider } from '@/features/search/RecentSearchContext';

export default function SearchLayout() {
  return (
    <RecentSearchProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </RecentSearchProvider>
  );
}
