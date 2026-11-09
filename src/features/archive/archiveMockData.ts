import type { ArchiveAlbum, ArchiveTimelineData } from './archiveTimeline';

const featuredAlbums: ArchiveAlbum[] = [
  { id: 'modern-times', artwork: require('@/assets/archive/cover.png') },
  { id: 'steady', artwork: require('@/assets/archive/cover-red.png') },
  { id: 'blue', artwork: require('@/assets/archive/cover-blue.png') },
  { id: 'floral', artwork: require('@/assets/archive/cover-floral.png') },
  { id: 'illustration', artwork: require('@/assets/archive/cover-illustration.png') },
];

const albums = [
  ...featuredAlbums,
  ...Array.from({ length: 7 }, (_, index) => ({ id: `archive-album-${index + 1}` })),
];

const archiveMockScenarios = {
  timeline: {
    latestYear: 2026,
    days: [
      { date: '2026-09-25', recordCount: 8, albums },
      { date: '2026-09-24', recordCount: 4, albums: albums.slice(0, 4) },
      { date: '2026-09-23', recordCount: 4, albums: albums.slice(0, 1) },
      { date: '2026-09-22', recordCount: 2, albums: albums.slice(0, 2) },
      { date: '2026-08-18', recordCount: 4, albums },
      { date: '2026-08-12', recordCount: 4, albums: albums.slice(0, 4) },
      { date: '2024-12-21', recordCount: 3, albums: albums.slice(0, 2) },
      { date: '2024-10-09', recordCount: 1, albums: albums.slice(3, 4) },
    ],
  },
  empty: { latestYear: 2026, days: [] },
} satisfies Record<'timeline' | 'empty', ArchiveTimelineData>;

export const archiveMockData: ArchiveTimelineData = archiveMockScenarios.timeline;
