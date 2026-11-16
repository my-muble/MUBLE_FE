import { router, useLocalSearchParams } from 'expo-router';

import ArchiveDateDetailScreen from '@/features/archive/ArchiveDateDetailScreen';
import { getArchiveDateDetailMock } from '@/features/archive/archiveDateDetailMock';

export default function ArchiveDateDetailRoute() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const detail = typeof date === 'string' ? getArchiveDateDetailMock(date) : undefined;

  return (
    <ArchiveDateDetailScreen
      key={date}
      detail={detail}
      onBack={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace('/archive');
        }
      }}
    />
  );
}
