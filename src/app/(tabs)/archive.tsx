import ArchiveScreen from '@/features/archive/ArchiveScreen';
import { archiveMockData } from '@/features/archive/archiveMockData';

export default function ArchiveTab() {
  return <ArchiveScreen {...archiveMockData} />;
}
