import { Redirect, router, useLocalSearchParams } from 'expo-router';

import ArchiveAlbumDetailScreen from '@/features/archive/ArchiveAlbumDetailScreen';
import { getArchiveRecordAlbum } from '@/features/archive/archiveRecordsMock';

export default function ArchiveAlbumRecordsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const album = typeof id === 'string' ? getArchiveRecordAlbum(id) : undefined;
  if (!album) return <Redirect href="/archive" />;
  return (
    <ArchiveAlbumDetailScreen
      key={id}
      album={album}
      allRecords
      onBack={() =>
        router.canGoBack()
          ? router.back()
          : router.replace({ pathname: '/archive/album/[id]', params: { id } })
      }
    />
  );
}
