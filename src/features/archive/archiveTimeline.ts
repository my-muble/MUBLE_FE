import type { ImageSource } from 'expo-image';

export type ArchiveAlbum = {
  id: string;
  artwork?: ImageSource | number;
};

export type ArchiveDay = {
  date: string;
  recordCount: number;
  albums: readonly ArchiveAlbum[];
};

export type ArchiveTimelineData = {
  days: readonly ArchiveDay[];
  latestYear: number;
};

type ArchiveMonth = {
  key: string;
  title: string;
  data: ArchiveDay[];
};

export function getArchiveYears(days: readonly ArchiveDay[], latestYear: number) {
  if (!days.length) return [];

  let firstYear = latestYear;
  let lastYear = latestYear;

  for (const { date } of days) {
    const year = Number(date.slice(0, 4));
    firstYear = Math.min(firstYear, year);
    lastYear = Math.max(lastYear, year);
  }

  return Array.from({ length: lastYear - firstYear + 1 }, (_, index) => lastYear - index);
}

export function getArchiveMonths(days: readonly ArchiveDay[], year: number) {
  const sortedDays = days
    .filter(({ date }) => date.startsWith(`${year}-`))
    .sort((a, b) => b.date.localeCompare(a.date));
  const months = new Map<string, ArchiveMonth>();

  for (const day of sortedDays) {
    const month = day.date.slice(0, 7);
    const section = months.get(month);

    if (section) {
      section.data.push(day);
    } else {
      months.set(month, { key: month, title: `${month.replace('-', '.')}.`, data: [day] });
    }
  }

  return [...months.values()];
}
