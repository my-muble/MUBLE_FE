import { Redirect, router, useLocalSearchParams } from 'expo-router';

import ArchiveAlbumDetailScreen from '@/features/archive/ArchiveAlbumDetailScreen';
import { getArchiveRecordAlbum } from '@/features/archive/archiveRecordsMock';

export default function ArchiveAlbumRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const album = typeof id === 'string' ? getArchiveRecordAlbum(id) : undefined;
  if (!album) return <Redirect href="/archive" />;

  return (
    <ArchiveAlbumDetailScreen
      key={id}
      album={album}
      onBack={() => (router.canGoBack() ? router.back() : router.replace('/archive'))}
      onTrackPress={(trackId) =>
        router.push({ pathname: '/archive/track/[id]', params: { id: trackId } })
      }
      onAllRecordsPress={() =>
        router.push({ pathname: '/archive/album/[id]/records', params: { id } })
      }
    />
  );
}
