import type { ImageSourcePropType } from 'react-native';

export type MusicDetailMode = 'album' | 'track';

export type MusicRecord = {
  id: string;
  rating?: number;
  comment?: string;
  date: string;
};

export type OtherMusicRecord = MusicRecord & {
  nickname: string;
  profileImage?: ImageSourcePropType;
};

export type Track = {
  id: string;
  number: number;
  title: string;
  duration: string;
};

export type MusicDetail = {
  title: string;
  artist: string;
  albumTitle: string;
  releaseDate: string;
  artwork?: ImageSourcePropType;
  totalDuration: string;
  tracks: Track[];
  myRecordCount: number;
  myRecords: MusicRecord[];
  otherRecordCount: number;
  otherRecords: OtherMusicRecord[];
};

// API 연동 전까지 목데이터 사용. 연동 후 false로 변경
export const USE_DEMO_DATA = true;

export const EMPTY_MUSIC_DETAIL: MusicDetail = {
  title: '',
  artist: '',
  albumTitle: '',
  releaseDate: '',
  totalDuration: '',
  tracks: [],
  myRecordCount: 0,
  myRecords: [],
  otherRecordCount: 0,
  otherRecords: [],
};

const COMMENT = `일본 여행하면서 정말 많이 들었던 노래.
낯선 거리에서 이 노래를 들을 때마다 괜히
마음이 더 몽글해졌던 것 같아.
지금도 이 노래를 들으면 그때가 바로 떠오른다.`;

const DATE = '2026.09.03';

const INFO = {
  title: 'I really want to stay at your house',
  artist: 'Rosa Walton & Hallie Coggins',
  albumTitle: 'Cyberpunk 2077 : Radio, Vol. 2 (Original Soundtrack)',
  releaseDate: '2020.12.18.',
};

const ALBUM_TRACKS = {
  totalDuration: '2시간 30분',
  tracks: [
    { id: '1', number: 1, title: 'i love you', duration: '3 : 30' },
    { id: '2', number: 2, title: 'i love you2', duration: '2 : 20' },
    { id: '3', number: 3, title: 'i love you', duration: '3 : 30' },
    { id: '4', number: 4, title: 'i love you', duration: '3 : 30' },
    { id: '5', number: 5, title: 'i love you', duration: '3 : 30' },
    { id: '6', number: 6, title: 'i love you', duration: '3 : 30' },
  ],
};

const MY_RECORDS: MusicRecord[] = [
  { id: 'my-1', comment: COMMENT, date: DATE },
  { id: 'my-2', rating: 4, date: DATE },
  { id: 'my-3', rating: 4, comment: COMMENT, date: DATE },
];

const OTHER_RECORDS: OtherMusicRecord[] = [
  { id: 'other-1', nickname: 'Nickname', comment: COMMENT, date: DATE },
  { id: 'other-2', nickname: 'Nickname', rating: 4, comment: COMMENT, date: DATE },
  { id: 'other-3', nickname: 'Nickname', rating: 4, date: DATE },
];

// id 1은 내 기록 있음, 그 외는 내 기록 없음
function getDemoMusicDetail(mode: MusicDetailMode, id: string): MusicDetail {
  const records =
    id === '1'
      ? {
          myRecordCount: mode === 'album' ? 5 : 3,
          myRecords: MY_RECORDS,
          otherRecordCount: 0,
          otherRecords: [],
        }
      : {
          myRecordCount: 0,
          myRecords: [],
          otherRecordCount: mode === 'album' ? 301 : 16,
          otherRecords: OTHER_RECORDS,
        };

  return { ...EMPTY_MUSIC_DETAIL, ...INFO, ...(mode === 'album' ? ALBUM_TRACKS : {}), ...records };
}

// API 연동 시 이 함수만 교체한다 (앨범의 수록곡 tracks, 내 기록, 타인의 기록 포함)
export function getMusicDetail(mode: MusicDetailMode, id: string): MusicDetail {
  return USE_DEMO_DATA ? getDemoMusicDetail(mode, id) : EMPTY_MUSIC_DETAIL;
}
