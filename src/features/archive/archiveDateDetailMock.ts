import { archiveMockData } from './archiveMockData';
import type { ArchiveAlbum } from './archiveTimeline';

export type ArchiveDateDetailAlbum = ArchiveAlbum & {
  title: string;
  artist: string;
  recordCount: number;
  rating: number;
  preview: string;
  showVinyl?: boolean;
};

export type ArchiveDateDetail = {
  date: string;
  albums: ArchiveDateDetailAlbum[];
};

const designAlbums: ArchiveAlbum[] = [
  { id: 'lilac', artwork: require('@/assets/archive/date-cover-lilac.png') },
  { id: 'yours', artwork: require('@/assets/archive/date-cover-yours.png') },
  { id: 'abbey-road', artwork: require('@/assets/archive/date-cover-abbey-road.png') },
  { id: 'steady', artwork: require('@/assets/archive/cover-red.png') },
  { id: 'floral', artwork: require('@/assets/archive/cover-floral.png') },
  { id: 'blue', artwork: require('@/assets/archive/cover-blue.png') },
  { id: 'illustration', artwork: require('@/assets/archive/cover-illustration.png') },
  { id: 'modern-times', artwork: require('@/assets/archive/cover.png') },
];

const vinylAlbums = new Set(['steady', 'illustration', 'modern-times']);
const preview = '“늦은 저녁 에스컬레이터를 타고 내려가는데 이 음악이 흘러나왔다.”';

export function getArchiveDateDetailMock(date: string): ArchiveDateDetail | undefined {
  const day = archiveMockData.days.find((item) => item.date === date);
  if (!day) return undefined;

  const isDesignDate = date === '2026-09-25';
  const albums = isDesignDate ? designAlbums : day.albums.slice(0, day.recordCount);
  const recordCount = isDesignDate ? 12 : day.recordCount;

  return {
    date,
    albums: albums.map((album, index) => ({
      ...album,
      title: '드라마',
      artist: '아이유',
      recordCount:
        Math.floor(recordCount / albums.length) +
        (index >= albums.length - (recordCount % albums.length) ? 1 : 0),
      rating: 4.5,
      preview,
      showVinyl: vinylAlbums.has(album.id),
    })),
  };
}
