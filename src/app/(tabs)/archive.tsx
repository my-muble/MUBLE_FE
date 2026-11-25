import { router } from 'expo-router';

import ArchiveScreen from '@/features/archive/ArchiveScreen';
import {
  archiveAlbumListScenario,
  getArchiveAlbumListMock,
} from '@/features/archive/archiveAlbumListMock';
import { archiveMockData } from '@/features/archive/archiveMockData';

export default function ArchiveTab() {
  return (
    <ArchiveScreen
      {...archiveMockData}
      albumItems={getArchiveAlbumListMock(archiveAlbumListScenario)}
      onAlbumPress={(id) => router.push({ pathname: '/archive/album/[id]', params: { id } })}
      onDatePress={(date) => router.push({ pathname: '/archive/date/[date]', params: { date } })}
    />
  );
}
