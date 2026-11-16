import { router } from 'expo-router';

import ArchiveScreen from '@/features/archive/ArchiveScreen';
import { archiveMockData } from '@/features/archive/archiveMockData';

export default function ArchiveTab() {
  return (
    <ArchiveScreen
      {...archiveMockData}
      onDatePress={(date) => router.push({ pathname: '/archive/date/[date]', params: { date } })}
    />
  );
}
