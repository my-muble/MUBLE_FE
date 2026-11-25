import { getArchiveAlbumList } from './archiveAlbumListData';
import { archiveRecordAlbums, archiveRecordsMock } from './archiveRecordsMock';

const scenarios = {
  multiple: archiveRecordAlbums,
  single: archiveRecordAlbums.filter(({ id }) => id === 'modern-times'),
  partial: archiveRecordAlbums.slice(0, -1),
  empty: [],
};

export const archiveAlbumListScenario: keyof typeof scenarios = 'multiple';

export function getArchiveAlbumListMock(scenario: keyof typeof scenarios) {
  return getArchiveAlbumList(scenarios[scenario], archiveRecordsMock);
}
