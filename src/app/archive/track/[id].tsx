import { Redirect, router, useLocalSearchParams } from 'expo-router';

import ArchiveTrackDetailScreen from '@/features/archive/ArchiveTrackDetailScreen';
import {
  getArchiveRecordAlbum,
  getArchiveRecordTrack,
} from '@/features/archive/archiveRecordsMock';

export default function ArchiveTrackRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const track = typeof id === 'string' ? getArchiveRecordTrack(id) : undefined;
  const album = track && getArchiveRecordAlbum(track.albumId);
  if (!track || !album) return <Redirect href="/archive" />;
  return (
    <ArchiveTrackDetailScreen
      key={id}
      album={album}
      track={track}
      onBack={() =>
        router.canGoBack()
          ? router.back()
          : router.replace({ pathname: '/archive/album/[id]', params: { id: album.id } })
      }
    />
  );
}
