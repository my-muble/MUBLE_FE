import { Stack } from 'expo-router';

import MySettingsScreen from '@/features/my/MySettingsScreen';

export default function MySettings() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <MySettingsScreen />
    </>
  );
}
