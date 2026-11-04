import { Ionicons } from '@expo/vector-icons';

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { colors, layout, radius, typography } from '@/styles';

import type { SearchData, SearchItem, SearchTab } from './searchData';

const TABS: { id: SearchTab; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'song', label: '곡' },
  { id: 'album', label: '앨범' },
  { id: 'artist', label: '아티스트' },
];

type Props = {
  data: SearchData;
  activeTab: SearchTab;
  onTabChange: (tab: SearchTab) => void;
  onItemPress?: (item: SearchItem) => void;
};

function Artwork({
  item,
  size,
  circle = false,
}: {
  item: SearchItem;
  size: number;
  circle?: boolean;
}) {
  return (
    <View
      style={[
        styles.artwork,
        {
          width: size,
          height: size,
          borderRadius: circle ? size / 2 : radius.s / 2,
        },
      ]}
    >
      {item.artwork ? (
        <Image source={item.artwork} resizeMode="cover" style={styles.image} />
      ) : (
        <Ionicons
          name={circle ? 'person-outline' : 'musical-notes-outline'}
          size={size >= 100 ? 28 : 18}
          color={colors.gray[300]}
        />
      )}
    </View>
  );
}

function SectionHeading({
  title,
  showAll = false,
  onViewAll,
}: {
  title: string;
  showAll?: boolean;
  onViewAll?: () => void;
}) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {showAll && (
        <Pressable style={styles.viewAll} onPress={onViewAll}>
          <Text style={styles.viewAllText}>전체보기</Text>

          <Ionicons name="chevron-forward" size={16} color={colors.gray[500]} />
        </Pressable>
      )}
    </View>
  );
}

function ResultRow({
  item,
  artist = false,
  album = false,
  onPress,
}: {
  item: SearchItem;
  artist?: boolean;
  album?: boolean;
  onPress?: () => void;
}) {
  const size = artist || album ? 64 : 42;

  return (
    <Pressable
      style={[styles.resultRow, (artist || album) && styles.largeResultRow]}
      onPress={onPress}
    >
      <Artwork item={item} size={size} circle={artist} />

      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.resultSubtitle} numberOfLines={1}>
          {item.subtitle}
        </Text>

        {item.detail ? <Text style={styles.resultSubtitle}>{item.detail}</Text> : null}
      </View>

      <Ionicons name="chevron-forward" size={20} color={colors.gray[500]} />
    </Pressable>
  );
}

function ArtistCarousel({
  items,
  onPressItem,
}: {
  items: SearchItem[];
  onPressItem?: (item: SearchItem) => void;
}) {
  return (
    <ScrollView
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.artistCarousel}
    >
      {items.map((item) => (
        <Pressable key={item.id} style={styles.artistCard} onPress={() => onPressItem?.(item)}>
          <Artwork item={item} size={64} circle />

          <Text style={styles.artistName} numberOfLines={1}>
            {item.title}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function AlbumGrid({
  items,
  onPressItem,
}: {
  items: SearchItem[];
  onPressItem?: (item: SearchItem) => void;
}) {
  const { width } = useWindowDimensions();

  const itemWidth = (width - 40 - 32) / 3;

  return (
    <View style={styles.albumGrid}>
      {items.map((item) => (
        <Pressable key={item.id} style={{ width: itemWidth }} onPress={() => onPressItem?.(item)}>
          <Artwork item={item} size={itemWidth} />

          <Text style={styles.albumTitle} numberOfLines={1}>
            {item.title}
          </Text>

          <Text style={styles.albumSubtitle} numberOfLines={1}>
            {item.subtitle}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function EmptySection() {
  return <Text style={styles.emptySection}>검색 결과가 없습니다.</Text>;
}

export default function SearchResults({ data, activeTab, onTabChange, onItemPress }: Props) {
  const isAll = activeTab === 'all';

  const showArtists = isAll || activeTab === 'artist';

  const showSongs = isAll || activeTab === 'song';

  const showAlbums = isAll || activeTab === 'album';

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <Pressable
              key={tab.id}
              style={[styles.tab, active && styles.activeTab]}
              onPress={() => onTabChange(tab.id)}
            >
              <Text style={[styles.tabText, active && styles.activeTabText]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {showArtists && isAll && data.artists.length > 0 && (
          <View style={styles.section}>
            <SectionHeading title="아티스트" showAll onViewAll={() => onTabChange('artist')} />

            <ArtistCarousel items={data.artists} onPressItem={onItemPress} />
          </View>
        )}

        {showSongs && (
          <View style={styles.section}>
            <SectionHeading
              title="곡"
              showAll={isAll && data.songs.length > 0}
              onViewAll={() => onTabChange('song')}
            />

            {data.songs.length === 0 ? (
              <EmptySection />
            ) : (
              data.songs
                .slice(0, isAll ? 5 : undefined)
                .map((item) => (
                  <ResultRow key={item.id} item={item} onPress={() => onItemPress?.(item)} />
                ))
            )}
          </View>
        )}

        {showAlbums && (
          <View style={styles.section}>
            <SectionHeading
              title="앨범"
              showAll={isAll && data.albums.length > 0}
              onViewAll={() => onTabChange('album')}
            />

            {data.albums.length === 0 ? (
              <EmptySection />
            ) : isAll ? (
              <AlbumGrid items={data.albums.slice(0, 6)} onPressItem={onItemPress} />
            ) : (
              data.albums.map((item) => (
                <ResultRow key={item.id} item={item} album onPress={() => onItemPress?.(item)} />
              ))
            )}
          </View>
        )}

        {showArtists && !isAll && (
          <View style={styles.section}>
            <SectionHeading title="아티스트" />

            {data.artists.length === 0 ? (
              <EmptySection />
            ) : (
              data.artists.map((item) => (
                <ResultRow key={item.id} item={item} artist onPress={() => onItemPress?.(item)} />
              ))
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray.white,
  },

  tabBar: {
    height: 45,
    paddingHorizontal: layout.screenPaddingHorizontal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },

  tab: {
    minWidth: 52,
    height: 45,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[900],
  },

  tabText: {
    ...typography.body2,
    fontWeight: '600',
    color: colors.gray[500],
  },

  activeTabText: {
    ...typography.label1,
    color: colors.gray[900],
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 48,
  },

  section: {
    paddingTop: 22,
    paddingBottom: 16,
  },

  sectionHeading: {
    minHeight: 44,
    paddingHorizontal: layout.screenPaddingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    ...typography.title1,
    color: colors.gray[900],
  },

  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewAllText: {
    ...typography.caption1,
    fontWeight: '400',
    color: colors.gray[500],
  },

  resultRow: {
    height: 54,
    paddingLeft: 20,
    paddingRight: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  largeResultRow: {
    height: 76,
    gap: 12,
  },

  artwork: {
    backgroundColor: colors.gray[50],
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  resultInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  resultTitle: {
    ...typography.caption1,
    color: colors.gray[900],
  },

  resultSubtitle: {
    ...typography.caption1,
    fontWeight: '400',
    color: colors.gray[500],
  },

  artistCarousel: {
    paddingHorizontal: 20,
    gap: 12,
  },

  artistCard: {
    width: 72,
    alignItems: 'center',
    gap: 6,
  },

  artistName: {
    ...typography.caption1,
    color: colors.gray[900],
    textAlign: 'center',
  },

  albumGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    columnGap: 16,
    rowGap: 16,
  },

  albumTitle: {
    ...typography.title2,
    color: colors.gray[900],
    marginTop: 6,
  },

  albumSubtitle: {
    ...typography.body2,
    color: colors.gray[500],
  },

  emptySection: {
    ...typography.body2,
    color: colors.gray[500],
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
