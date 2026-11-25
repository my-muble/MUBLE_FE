import type { ArchiveAlbum } from './archiveTimeline';

export type ArchiveRecord = {
  id: string;
  albumId: string;
  trackId?: string;
  createdAt: string;
  rating?: number;
  content?: string;
};

export type ArchiveTrack = {
  id: string;
  albumId: string;
  number: number;
  title: string;
};

export type ArchiveRecordAlbum = ArchiveAlbum & {
  title: string;
  artist: string;
  tracks: ArchiveTrack[];
};

export function sortArchiveRecords(records: readonly ArchiveRecord[]) {
  return [...records].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function groupArchiveRecords(records: readonly ArchiveRecord[]) {
  const groups = new Map<string, ArchiveRecord[]>();
  for (const record of sortArchiveRecords(records)) {
    const year = record.createdAt.slice(0, 4);
    const group = groups.get(year);
    if (group) group.push(record);
    else groups.set(year, [record]);
  }
  return [...groups].map(([year, data]) => ({ year, data }));
}

export function formatArchiveRecordDate(value: string, short: boolean) {
  const [year, month, day] = value.slice(0, 10).split('-');
  if (!short) return `${year}.${month}.${day}`;
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][
    new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))).getUTCDay()
  ];
  return `${month}.${day}. ${weekday}`;
}
