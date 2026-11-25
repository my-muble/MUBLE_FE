import { archiveMockData } from './archiveMockData';
import { sortArchiveRecords, type ArchiveRecord, type ArchiveRecordAlbum } from './archiveRecords';

const albumInfo = [
  {
    id: 'lilac',
    title: '라일락',
    artist: '아이유',
    artwork: require('@/assets/archive/date-cover-lilac.png'),
  },
  {
    id: 'yours',
    title: 'YOURS',
    artist: '데이먼스 이어',
    artwork: require('@/assets/archive/date-cover-yours.png'),
  },
  {
    id: 'abbey-road',
    title: 'Abbey Road',
    artist: 'The Beatles',
    artwork: require('@/assets/archive/date-cover-abbey-road.png'),
  },
  {
    id: 'steady',
    title: 'Steady',
    artist: 'NCT WISH',
    artwork: require('@/assets/archive/cover-red.png'),
  },
  {
    id: 'floral',
    title: 'WISH',
    artist: 'NCT WISH',
    artwork: require('@/assets/archive/cover-floral.png'),
  },
  {
    id: 'blue',
    title: 'Blue',
    artist: 'NCT WISH',
    artwork: require('@/assets/archive/cover-blue.png'),
  },
  {
    id: 'illustration',
    title: '마음의 조각',
    artist: '아이유',
    artwork: require('@/assets/archive/cover-illustration.png'),
  },
  {
    id: 'modern-times',
    title: 'Modern Times',
    artist: '아이유',
    artwork: require('@/assets/archive/cover.png'),
  },
];

const extraAlbums = archiveMockData.days
  .flatMap((day) => day.albums)
  .filter(
    (album, index, all) =>
      !albumInfo.some(({ id }) => id === album.id) &&
      all.findIndex(({ id }) => id === album.id) === index,
  );

export const archiveRecordAlbums: ArchiveRecordAlbum[] = [
  ...albumInfo,
  ...extraAlbums.map((album) => ({ ...album, title: '드라마', artist: '아이유' })),
].map((album) => ({
  ...album,
  tracks: ['Stroyberry', 'i love you 2', 'i lov', 'i love you 3'].map((title, index) => ({
    id: `${album.id}-${index + 1}`,
    albumId: album.id,
    number: index + 1,
    title,
  })),
}));

const content = '오늘 다시 들었는데 먼가 들으니까 별루당\n아닌가 아닌가 다시 들었는데 좋을수도';
const albumDates = [
  '2026-09-22',
  '2026-09-02',
  '2026-08-11',
  '2026-06-24',
  '2026-06-12',
  '2026-06-02',
  '2026-03-21',
  '2026-02-14',
  '2025-01-12',
];
const trackDates = [
  '2026-09-22',
  '2026-08-12',
  '2026-04-12',
  '2025-09-22',
  '2025-08-22',
  '2025-08-02',
  '2025-04-02',
];

export const archiveRecordsMock: ArchiveRecord[] = [
  ...albumDates.map((date, index) => ({
    id: `lilac-album-${index + 1}`,
    albumId: 'lilac',
    createdAt: `${date}T14:24:00+09:00`,
    rating: 5,
    content: index === 4 ? undefined : content,
  })),
  ...trackDates.map((date, index) => ({
    id: `lilac-track-1-${index + 1}`,
    albumId: 'lilac',
    trackId: 'lilac-1',
    createdAt: `${date}T19:24:00+09:00`,
    rating: index === 6 ? undefined : 5,
    content:
      index === 2 || index === 5
        ? undefined
        : index === 4
          ? `${content}\n${content}\n${content}`
          : index === 6
            ? '아ㅏ앙'
            : content,
  })),
  {
    id: 'lilac-track-4-1',
    albumId: 'lilac',
    trackId: 'lilac-4',
    createdAt: '2026-09-22T14:24:00+09:00',
    rating: 5,
    content,
  },
  {
    id: 'modern-times-album-1',
    albumId: 'modern-times',
    createdAt: '2026-09-23T14:24:00+09:00',
    rating: 4,
    content,
  },
];

export function getArchiveRecordAlbum(id: string) {
  return archiveRecordAlbums.find((album) => album.id === id);
}

export function getArchiveRecordTrack(id: string) {
  return archiveRecordAlbums.flatMap((album) => album.tracks).find((track) => track.id === id);
}

export function getArchiveAlbumRecords(albumId: string) {
  return sortArchiveRecords(
    archiveRecordsMock.filter((record) => record.albumId === albumId && !record.trackId),
  );
}

export function getArchiveTrackRecords(trackId: string) {
  return sortArchiveRecords(archiveRecordsMock.filter((record) => record.trackId === trackId));
}

export function getArchiveAlbumRecordCount(albumId: string) {
  return archiveRecordsMock.filter((record) => record.albumId === albumId).length;
}
