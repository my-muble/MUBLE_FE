import { Ionicons } from '@expo/vector-icons';

import { router, useLocalSearchParams } from 'expo-router';

import { StatusBar } from 'expo-status-bar';

import { useMemo, useState } from 'react';

import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, typography } from '@/styles';

import SearchResults from './SearchResults';

import {
  demoRecentSearches,
  demoSuggestions,
  EMPTY_SEARCH_DATA,
  getDemoSearchData,
  USE_DEMO_DATA,
  type SearchTab,
} from './searchData';

type SearchMode = 'initial' | 'preview' | 'result';

type Props = {
  mode: SearchMode;
};

function EmptyState({ message }: { message: string }) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Ionicons name="create-outline" size={32} color={colors.gray[300]} />
      </View>

      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

export default function SearchScreen({ mode }: Props) {
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams<{
    q?: string;
  }>();

  const initialQuery = typeof params.q === 'string' ? params.q : '';

  const [query, setQuery] = useState(initialQuery);

  const [activeTab, setActiveTab] = useState<SearchTab>('all');

  const [recentSearches, setRecentSearches] = useState<string[]>(
    USE_DEMO_DATA ? demoRecentSearches : [],
  );

  const searchData = useMemo(
    () => (USE_DEMO_DATA ? getDemoSearchData(query) : EMPTY_SEARCH_DATA),
    [query],
  );

  const suggestions = useMemo(() => {
    if (!USE_DEMO_DATA || !query.trim()) {
      return [];
    }

    return demoSuggestions.filter((item) =>
      item.toLowerCase().startsWith(query.trim().toLowerCase()),
    );
  }, [query]);

  const hasResults =
    searchData.songs.length > 0 || searchData.albums.length > 0 || searchData.artists.length > 0;

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const openPreview = (value = '') => {
    router.push({
      pathname: '/search/preview',
      params: {
        q: value,
      },
    });
  };

  const submitSearch = (value: string) => {
    const keyword = value.trim();

    if (!keyword) {
      return;
    }

    setRecentSearches((previous) =>
      [keyword, ...previous.filter((item) => item !== keyword)].slice(0, 10),
    );

    router.push({
      pathname: '/search/results',
      params: {
        q: keyword,
      },
    });
  };

  const removeRecent = (value: string) => {
    setRecentSearches((previous) => previous.filter((item) => item !== value));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <Pressable style={styles.backButton} onPress={goBack} accessibilityLabel="뒤로가기">
            <Ionicons name="chevron-back" size={24} color={colors.gray[500]} />
          </Pressable>

          {mode === 'preview' ? (
            <View style={[styles.searchBar, styles.focusedSearchBar]}>
              <Ionicons name="search-outline" size={20} color={colors.gray[500]} />

              <TextInput
                style={styles.searchInput}
                value={query}
                onChangeText={setQuery}
                placeholder="어떤 음악을 기록하고 싶나요?"
                placeholderTextColor={colors.gray[300]}
                returnKeyType="search"
                autoCorrect={false}
                autoFocus
                onSubmitEditing={() => submitSearch(query)}
              />

              {query.length > 0 && (
                <Pressable onPress={() => setQuery('')} accessibilityLabel="검색어 지우기">
                  <Ionicons name="close-circle-outline" size={20} color={colors.gray[500]} />
                </Pressable>
              )}
            </View>
          ) : (
            <Pressable
              style={styles.searchBar}
              onPress={() => openPreview(mode === 'result' ? query : '')}
              accessibilityLabel="검색어 입력"
            >
              <Ionicons name="search-outline" size={20} color={colors.gray[500]} />

              <Text
                style={[styles.searchLabel, !query && styles.searchPlaceholder]}
                numberOfLines={1}
              >
                {query || '어떤 음악을 기록하고 싶나요?'}
              </Text>

              {mode === 'result' && query.length > 0 && (
                <Ionicons name="close-circle-outline" size={20} color={colors.gray[500]} />
              )}
            </Pressable>
          )}
        </View>
      </View>

      {mode === 'initial' && (
        <View style={styles.body}>
          <View style={styles.centerEmpty}>
            <EmptyState message={'찾고 싶은 음악을\n검색해보세요'} />
          </View>

          <View style={styles.recentSection}>
            <Text style={styles.recentHeading}>최근 검색</Text>

            {recentSearches.map((item) => (
              <View key={item} style={styles.recentRow}>
                <Pressable style={styles.recentTextArea} onPress={() => submitSearch(item)}>
                  <Text style={styles.recentText} numberOfLines={1}>
                    {item}
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.removeButton}
                  onPress={() => removeRecent(item)}
                  accessibilityLabel={`${item} 삭제`}
                >
                  <Ionicons name="close" size={18} color={colors.gray[500]} />
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      )}

      {mode === 'preview' && (
        <ScrollView
          style={styles.body}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.previewContent}
        >
          {suggestions.map((item) => (
            <Pressable key={item} style={styles.suggestionRow} onPress={() => submitSearch(item)}>
              <Ionicons name="search-outline" size={20} color={colors.gray[500]} />

              <Text style={styles.suggestionText}>
                <Text style={styles.suggestionMatch}>{query}</Text>

                {item.slice(query.length)}
              </Text>
            </Pressable>
          ))}

          {USE_DEMO_DATA && query.trim().length > 0 && hasResults && (
            <View style={styles.previewResults}>
              {[...searchData.songs, ...searchData.albums, ...searchData.artists]
                .slice(0, 10)
                .map((item) => (
                  <Pressable
                    key={item.id}
                    style={styles.previewRow}
                    onPress={() => submitSearch(query)}
                  >
                    <View style={styles.previewArtwork}>
                      <Ionicons name="musical-notes-outline" size={18} color={colors.gray[300]} />
                    </View>

                    <View style={styles.previewInfo}>
                      <Text style={styles.previewTitle} numberOfLines={1}>
                        {item.title}
                      </Text>

                      <Text style={styles.previewSubtitle} numberOfLines={1}>
                        {item.subtitle}
                      </Text>
                    </View>

                    <Ionicons name="chevron-forward" size={20} color={colors.gray[500]} />
                  </Pressable>
                ))}
            </View>
          )}
        </ScrollView>
      )}

      {mode === 'result' &&
        (hasResults ? (
          <SearchResults data={searchData} activeTab={activeTab} onTabChange={setActiveTab} />
        ) : (
          <View style={styles.body}>
            <EmptyState message={`“${query}”\n검색 결과가 없습니다.`} />
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray.white,
  },

  header: {
    backgroundColor: colors.gray.white,
    zIndex: 2,
    elevation: 2,
    shadowColor: colors.gray[900],
    shadowOpacity: 0.03,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  headerRow: {
    height: 68,
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBar: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    backgroundColor: colors.gray[50],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 8,
  },

  focusedSearchBar: {
    borderWidth: 1,
    borderColor: colors.gray[900],
    backgroundColor: colors.gray.white,
  },

  searchInput: {
    ...typography.body2,
    color: colors.gray[900],
    flex: 1,
    minWidth: 0,
    padding: 0,
  },

  searchLabel: {
    ...typography.body2,
    color: colors.gray[900],
    flex: 1,
  },

  searchPlaceholder: {
    color: colors.gray[300],
  },

  body: {
    flex: 1,
  },

  centerEmpty: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    paddingBottom: 80,
    pointerEvents: 'none',
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingBottom: 48,
  },

  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  emptyText: {
    ...typography.body2,
    fontWeight: '600',
    color: colors.gray[500],
    textAlign: 'center',
  },

  recentSection: {
    paddingTop: 4,
    backgroundColor: colors.gray.white,
  },

  recentHeading: {
    ...typography.body2,
    fontWeight: '500',
    color: colors.gray[900],
    height: 45,
    paddingLeft: 22,
    paddingTop: 12,
  },

  recentRow: {
    height: 32,
    paddingLeft: 22,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  recentTextArea: {
    flex: 1,
    justifyContent: 'center',
  },

  recentText: {
    ...typography.body2,
    color: colors.gray[900],
  },

  removeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  previewContent: {
    paddingBottom: 48,
  },

  suggestionRow: {
    height: 46,
    paddingLeft: 20,
    paddingRight: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  suggestionText: {
    ...typography.body2,
    color: colors.gray[500],
  },

  suggestionMatch: {
    fontWeight: '600',
    color: colors.gray[900],
  },

  previewResults: {
    marginTop: 20,
  },

  previewRow: {
    height: 54,
    paddingLeft: 20,
    paddingRight: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  previewArtwork: {
    width: 42,
    height: 42,
    borderRadius: 4,
    backgroundColor: colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
  },

  previewInfo: {
    flex: 1,
  },

  previewTitle: {
    ...typography.caption1,
    color: colors.gray[900],
  },

  previewSubtitle: {
    ...typography.caption1,
    fontWeight: '400',
    color: colors.gray[500],
  },
});
