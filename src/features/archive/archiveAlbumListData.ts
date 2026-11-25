import type { ArchiveRecord, ArchiveRecordAlbum } from './archiveRecords';

export type ArchiveAlbumListItem = Pick<
  ArchiveRecordAlbum,
  'id' | 'title' | 'artist' | 'artwork'
> & {
  recordCount: number;
  latestRecordAt?: string;
  showVinyl: boolean;
};

export function getArchiveAlbumList(
  albums: readonly ArchiveRecordAlbum[],
  records: readonly ArchiveRecord[],
): ArchiveAlbumListItem[] {
  const uniqueAlbums = new Map(albums.map((album) => [album.id, album]));
  return [...uniqueAlbums.values()].map((album) => {
    const albumRecords = records.filter((record) => record.albumId === album.id);
    const latestRecordAt = albumRecords.reduce<string | undefined>(
      (latest, record) =>
        !latest || Date.parse(record.createdAt) > Date.parse(latest) ? record.createdAt : latest,
      undefined,
    );
    return {
      id: album.id,
      title: album.title,
      artist: album.artist,
      artwork: album.artwork,
      recordCount: albumRecords.length,
      latestRecordAt,
      showVinyl: album.id === 'steady' || album.id === 'illustration',
    };
  });
}

export function sortArchiveAlbumsByRecent(albums: readonly ArchiveAlbumListItem[]) {
  return [...albums].sort((a, b) => {
    const aDate = a.latestRecordAt ? Date.parse(a.latestRecordAt) : 0;
    const bDate = b.latestRecordAt ? Date.parse(b.latestRecordAt) : 0;
    return bDate - aDate || a.id.localeCompare(b.id);
  });
}
