import { useSyncExternalStore } from 'react';

export type RatingBin = {
  score: number;
  count: number;
};

export type MyStatistics = {
  totalRecords: number;
  albumRecords: number;
  songRecords: number;
  ratedRecords: number;
  averageRating: number;
  distribution: RatingBin[];
};

export const USE_DEMO_MY_DATA = true;

const demoDistribution: RatingBin[] = [
  { score: 0.5, count: 0 },
  { score: 1.0, count: 0 },
  { score: 1.5, count: 0 },
  { score: 2.0, count: 2 },
  { score: 2.5, count: 0 },
  { score: 3.0, count: 1 },
  { score: 3.5, count: 1 },
  { score: 4.0, count: 5 },
  { score: 4.5, count: 1 },
  { score: 5.0, count: 3 },
];

export const EMPTY_MY_STATISTICS: MyStatistics = {
  totalRecords: 0,
  albumRecords: 0,
  songRecords: 0,
  ratedRecords: 0,
  averageRating: 0,
  distribution: demoDistribution.map((item) => ({
    ...item,
    count: 0,
  })),
};

export const DEMO_ALL_STATISTICS: MyStatistics = {
  totalRecords: 32,
  albumRecords: 12,
  songRecords: 20,
  ratedRecords: 29,
  averageRating: 3.8,
  distribution: demoDistribution,
};

export const DEMO_MONTHLY_STATISTICS: MyStatistics = {
  totalRecords: 32,
  albumRecords: 12,
  songRecords: 20,
  ratedRecords: 12,
  averageRating: 4.0,
  distribution: demoDistribution,
};

export function getMyStatistics(
  mode: 'all' | 'monthly',
  year: number,
  month: number,
): MyStatistics {
  if (!USE_DEMO_MY_DATA) {
    return EMPTY_MY_STATISTICS;
  }

  if (mode === 'all') {
    return DEMO_ALL_STATISTICS;
  }

  if (year === 2026 && month === 10) {
    return DEMO_MONTHLY_STATISTICS;
  }

  return EMPTY_MY_STATISTICS;
}

export type MyProfile = {
  nickname: string;
  handle: string;
  photoUri: string | null;
};

let profile: MyProfile = {
  nickname: 'Rilla',
  handle: '@gorilla_zip',
  photoUri: null,
};

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getProfileSnapshot() {
  return profile;
}

export function useMyProfile() {
  return useSyncExternalStore(subscribe, getProfileSnapshot, getProfileSnapshot);
}

export function updateMyNickname(nickname: string) {
  const value = nickname.trim();

  if (!value) {
    return;
  }

  profile = {
    ...profile,
    nickname: value,
  };

  listeners.forEach((listener) => listener());
}

export function updateMyPhoto(photoUri: string | null) {
  profile = {
    ...profile,
    photoUri,
  };

  listeners.forEach((listener) => listener());
}
