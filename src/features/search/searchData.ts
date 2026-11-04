import type { ImageSourcePropType } from 'react-native';

export type SearchItem = {
  id: string;
  title: string;
  subtitle: string;
  artwork?: ImageSourcePropType;
  detail?: string;
};

export type SearchData = {
  songs: SearchItem[];
  albums: SearchItem[];
  artists: SearchItem[];
};

export type SearchTab = 'all' | 'song' | 'album' | 'artist';

// UI 확인할 때만 true로 변경
export const USE_DEMO_DATA = true;

export const EMPTY_SEARCH_DATA: SearchData = {
  songs: [],
  albums: [],
  artists: [],
};

export const demoRecentSearches = ['I really want to stay at your house', 'departure!', '아이유'];

export const demoSuggestions = ['아이유', '아이돌아라', '아이이ㅣ', '아이24아'];

const iuSongs: SearchItem[] = [
  { id: 's1', title: '무릎', subtitle: '곡 · 아이유' },
  { id: 's2', title: 'My Sea', subtitle: '곡 · 아이유' },
  { id: 's3', title: 'Jam Jam', subtitle: '곡 · 아이유' },
  { id: 's4', title: 'Ending Scene', subtitle: '곡 · 아이유' },
  { id: 's5', title: '이 별로부터', subtitle: '곡 · 아이유' },
];

const dramaSongs: SearchItem[] = [
  { id: 'd1', title: 'Drama', subtitle: '곡 · aespa' },
  {
    id: 'd2',
    title: 'Drama',
    subtitle: '곡 · TOMORROW X TOGETHER',
  },
  {
    id: 'd3',
    title: '드라마',
    subtitle: '곡 · 나인뮤지스 (9MUSES)',
  },
  { id: 'd4', title: '드라마', subtitle: '곡 · BLOO' },
  { id: 'd5', title: '드라마', subtitle: '곡 · 아이유' },
];

const iuAlbums: SearchItem[] = [
  { id: 'a1', title: '밤편지', subtitle: 'EP · 아이유' },
  {
    id: 'a2',
    title: 'strawberry moon',
    subtitle: '싱글 · 아이유',
  },
  { id: 'a3', title: 'Love poem', subtitle: 'OST · 아이유' },
  { id: 'a4', title: 'The Winning', subtitle: 'OST · 아이유' },
  { id: 'a5', title: 'Palette', subtitle: '싱글 · 아이유' },
  { id: 'a6', title: 'Last Fantasy', subtitle: 'EP · 아이유' },
];

const iuArtists: SearchItem[] = [
  {
    id: 'r1',
    title: '아이유',
    subtitle: '솔로 · 발라드, 댄스, 록/메탈',
  },
  { id: 'r2', title: '로꼬', subtitle: '아티스트' },
  { id: 'r3', title: '권진아', subtitle: '아티스트' },
  { id: 'r4', title: '에이티즈', subtitle: '아티스트' },
  { id: 'r5', title: '최유리', subtitle: '아티스트' },
];

export function getDemoSearchData(query: string): SearchData {
  const value = query.trim().toLowerCase();

  if (value.includes('아이유') || value === 'iu') {
    return {
      songs: iuSongs,
      albums: iuAlbums,
      artists: iuArtists,
    };
  }

  if (value.includes('드라마') || value === 'drama') {
    return {
      songs: dramaSongs,
      albums: [
        {
          id: 'a7',
          title: 'Drama',
          subtitle: 'EP · aespa',
        },
        {
          id: 'a8',
          title: 'Drama',
          subtitle: 'EP · BLOO',
        },
      ],
      artists: [],
    };
  }

  return EMPTY_SEARCH_DATA;
}
