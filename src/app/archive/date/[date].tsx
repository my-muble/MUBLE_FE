import { Redirect, router, useLocalSearchParams } from 'expo-router';

import ArchiveDateDetailScreen from '@/features/archive/ArchiveDateDetailScreen';
import { getArchiveDateDetailMock } from '@/features/archive/archiveDateDetailMock';

export default function ArchiveDateDetailRoute() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const detail = typeof date === 'string' ? getArchiveDateDetailMock(date) : undefined;

  if (!detail || detail.albums.length === 0) {
    return <Redirect href="/archive" />;
  }

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
