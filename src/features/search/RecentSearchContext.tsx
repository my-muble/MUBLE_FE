import { createContext, useContext, useState, type PropsWithChildren } from 'react';

import { demoRecentSearches, USE_DEMO_DATA } from './searchData';

type RecentSearchContextType = {
  recentSearches: string[];
  addRecentSearch: (keyword: string) => void;
  removeRecentSearch: (keyword: string) => void;
};

const RecentSearchContext = createContext<RecentSearchContextType | null>(null);

export function RecentSearchProvider({ children }: PropsWithChildren) {
  const [recentSearches, setRecentSearches] = useState<string[]>(
    USE_DEMO_DATA ? [...demoRecentSearches] : [],
  );

  const addRecentSearch = (keyword: string) => {
    const value = keyword.trim();

    if (!value) return;

    setRecentSearches((previous) =>
      [value, ...previous.filter((item) => item !== value)].slice(0, 10),
    );
  };

  const removeRecentSearch = (keyword: string) => {
    setRecentSearches((previous) => previous.filter((item) => item !== keyword));
  };

  return (
    <RecentSearchContext.Provider
      value={{
        recentSearches,
        addRecentSearch,
        removeRecentSearch,
      }}
    >
      {children}
    </RecentSearchContext.Provider>
  );
}

export function useRecentSearches() {
  const context = useContext(RecentSearchContext);

  if (!context) {
    throw new Error('useRecentSearches must be used within RecentSearchProvider');
  }

  return context;
}
