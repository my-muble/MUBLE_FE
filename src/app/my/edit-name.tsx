import { Stack } from 'expo-router';

import EditNicknameScreen from '@/features/my/EditNicknameScreen';

export default function EditName() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EditNicknameScreen />
    </>
  );
}
