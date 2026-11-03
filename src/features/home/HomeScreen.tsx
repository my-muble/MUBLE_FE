import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, radius, typography } from '@/styles';

const RANK_WIDTH = 150;
const RECORD_WIDTH = 313;
const RECORD_GAP = 12;

export type RankingAlbum = {
  id: string;
  title: string;
  artist: string;
  artwork?: ImageSourcePropType;
};

export type PublicRecord = {
  id: string;
  nickname: string;
  title: string;
  artist: string;
  content: string;
  date: string;
  rating: number;
  artwork?: ImageSourcePropType;
};

type HomeScreenProps = {
  rankings?: RankingAlbum[];
  records?: PublicRecord[];
  onSearchPress?: () => void;
  onAlbumPress?: (id: string) => void;
  onRecordPress?: (id: string) => void;
};

// API 연결 전 화면 확인용 임시 데이터
const mockRankings: RankingAlbum[] = [
  { id: '1', title: '드라마', artist: 'MEOVV' },
  { id: '2', title: 'thisisalbum', artist: 'TWICE' },
  { id: '3', title: 'Yours', artist: 'Red Velvet' },
  { id: '4', title: 'Album', artist: 'BLACKPINK' },
  { id: '5', title: 'Album', artist: 'izna' },
  { id: '6', title: 'Album', artist: '제니' },
];

const mockRecords: PublicRecord[] = Array.from({ length: 10 }, (_, index) => ({
  id: String(index + 1),
  nickname: 'Nickname',
  title: 'yours',
  artist: 'ONE',
  content: '일본 여행하면서 정말 많이 들었어요. 그때의 분위기가 아직도 기억나요.',
  date: '2022.12.12.',
  rating: 5,
}));

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function HomeHeader({ topInset, onSearchPress }: { topInset: number; onSearchPress?: () => void }) {
  return (
    <View style={[styles.header, { paddingTop: topInset }]}>
      <View style={styles.logoArea}>
        <Text style={styles.logo}>MUBLE</Text>
      </View>

      <View style={styles.searchArea}>
        <Pressable
          style={styles.searchBar}
          onPress={onSearchPress}
          accessibilityRole="button"
          accessibilityLabel="음악 검색하기"
        >
          <Ionicons name="search-outline" size={20} color={colors.gray[500]} />

          <Text style={styles.searchText}>어떤 음악을 기록하고 싶나요?</Text>
        </Pressable>
      </View>
    </View>
  );
}

function RankingCard({ album, onPress }: { album: RankingAlbum; onPress?: () => void }) {
  return (
    <Pressable style={styles.rankingCard} onPress={onPress} accessibilityRole="button">
      <View style={styles.albumCover}>
        {album.artwork ? (
          <Image source={album.artwork} resizeMode="cover" style={styles.fill} />
        ) : (
          <View style={styles.albumPlaceholder}>
            <Ionicons name="musical-notes-outline" size={34} color={colors.gray[300]} />
          </View>
        )}

        <View style={styles.albumArrow}>
          <Ionicons name="chevron-forward" size={20} color={colors.gray.white} />
        </View>
      </View>

      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle} numberOfLines={1}>
          {album.title}
        </Text>

        <Text style={styles.albumArtist} numberOfLines={1}>
          {album.artist}
        </Text>
      </View>
    </Pressable>
  );
}

function EmptyRanking() {
  return (
    <View style={styles.emptyRanking}>
      <View style={styles.emptyIcon}>
        <Ionicons name="disc-outline" size={30} color={colors.gray[300]} />
      </View>

      <Text style={styles.emptyTitle}>최근 1시간 동안 등록된 기록이 없어요.</Text>

      <Text style={styles.emptyDescription}>새로운 기록이 등록되면 랭킹에 표시돼요.</Text>
    </View>
  );
}

function RankingSection({
  albums,
  onAlbumPress,
}: {
  albums: RankingAlbum[];
  onAlbumPress?: (id: string) => void;
}) {
  return (
    <View>
      <SectionHeader title="MUBLE 랭킹" />

      {albums.length === 0 ? (
        <EmptyRanking />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rankingList}
        >
          {albums.slice(0, 10).map((album) => (
            <RankingCard key={album.id} album={album} onPress={() => onAlbumPress?.(album.id)} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function VinylDisc() {
  const ringSizes = [208, 190, 170, 150, 128, 104, 80];

  return (
    <View style={styles.vinyl}>
      {ringSizes.map((size) => (
        <View
          key={size}
          style={[
            styles.vinylRing,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        />
      ))}

      <View style={styles.vinylLabel}>
        <View style={styles.vinylHole} />
      </View>
    </View>
  );
}

function Rating({ value }: { value: number }) {
  return (
    <View style={styles.rating}>
      {Array.from({ length: 5 }, (_, index) => (
        <Ionicons
          key={index}
          name={index < value ? 'star' : 'star-outline'}
          size={10}
          color={colors.gray.white}
        />
      ))}
    </View>
  );
}

function RecordCard({ record, onPress }: { record: PublicRecord; onPress?: () => void }) {
  return (
    <Pressable style={styles.recordCard} onPress={onPress} accessibilityRole="button">
      <VinylDisc />

      <View style={styles.recordCover}>
        {record.artwork ? (
          <Image source={record.artwork} resizeMode="cover" style={styles.fill} />
        ) : (
          <View style={styles.recordPlaceholder}>
            <Ionicons name="musical-notes" size={48} color={colors.gray[300]} />
          </View>
        )}

        <LinearGradient
          colors={['rgba(17,17,19,0)', 'rgba(17,1,19,0.80)', colors.gray[900]]}
          locations={[0, 0.45, 1]}
          style={styles.recordOverlay}
        >
          <View style={styles.authorRow}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={16} color={colors.gray[900]} />
            </View>

            <Text style={styles.nickname} numberOfLines={1}>
              {record.title} · {record.artist}
            </Text>
          </View>

          <Text style={styles.recordContent} numberOfLines={3}>
            {record.content}
          </Text>

          <Text style={styles.recordDate}>{record.date}</Text>
        </LinearGradient>
      </View>

      <View style={styles.recordArrow}>
        <Ionicons name="chevron-forward" size={22} color={colors.gray.white} />
      </View>
    </Pressable>
  );
}

function Pagination({ count, current }: { count: number; current: number }) {
  return (
    <View style={styles.pagination}>
      {Array.from({ length: count }, (_, index) => (
        <View key={index} style={[styles.dot, index === current && styles.activeDot]} />
      ))}
    </View>
  );
}

function RecordSection({
  records,
  onRecordPress,
}: {
  records: PublicRecord[];
  onRecordPress?: (id: string) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.x;

    const index = Math.round(offset / (RECORD_WIDTH + RECORD_GAP));

    setCurrentIndex(Math.max(0, Math.min(index, records.length - 1)));
  };

  if (records.length === 0) {
    return null;
  }

  return (
    <View>
      <SectionHeader title="타인 기록" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={RECORD_WIDTH + RECORD_GAP}
        onScroll={handleScrollEnd}
        scrollEventThrottle={32}
        contentContainerStyle={styles.recordList}
      >
        {records.map((record) => (
          <RecordCard key={record.id} record={record} onPress={() => onRecordPress?.(record.id)} />
        ))}
      </ScrollView>

      <Pagination count={records.length} current={currentIndex} />
    </View>
  );
}

function EmptyHome() {
  return (
    <View style={styles.emptyHome}>
      <View style={styles.emptyIcon}>
        <Ionicons name="albums-outline" size={32} color={colors.gray[500]} />
      </View>

      <Text style={styles.emptyTitle}>아직 보여드릴 음악 기록이 없어요</Text>

      <Text style={styles.emptyDescription}>다른 사람들의 음악 이야기를 기다리고 있어요.</Text>
    </View>
  );
}

export default function HomeScreen({
  rankings = mockRankings,
  records = mockRecords,
  onSearchPress,
  onAlbumPress,
  onRecordPress,
}: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  const isEmpty = rankings.length === 0 && records.length === 0;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <HomeHeader topInset={insets.top} onSearchPress={onSearchPress} />

      {isEmpty ? (
        <EmptyHome />
      ) : (
        <ScrollView
          style={styles.content}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <RankingSection albums={rankings} onAlbumPress={onAlbumPress} />

          <RecordSection records={records} onRecordPress={onRecordPress} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray.white,
  },

  fill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  header: {
    backgroundColor: colors.gray.white,
    zIndex: 1,
    elevation: 2,
    shadowColor: colors.gray[900],
    shadowOpacity: 0.03,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  logoArea: {
    height: 66,
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: 20,
    paddingBottom: 12,
    justifyContent: 'center',
  },

  logo: {
    ...typography.head1,
    color: colors.gray[900],
  },

  searchArea: {
    height: 56,
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: 4,
    paddingBottom: 12,
  },

  searchBar: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.gray[50],
    borderRadius: 4,
  },

  searchText: {
    ...typography.body2,
    color: colors.gray[300],
    flexShrink: 1,
  },

  content: {
    flex: 1,
  },

  contentContainer: {
    paddingTop: 8,
    paddingBottom: 48,
  },

  sectionHeader: {
    height: 56,
    paddingLeft: 22,
    paddingRight: 16,
    justifyContent: 'center',
  },

  sectionTitle: {
    ...typography.title1,
    color: colors.gray[900],
  },

  rankingList: {
    paddingHorizontal: layout.screenPaddingHorizontal,
    gap: 12,
  },

  rankingCard: {
    width: RANK_WIDTH,
    height: 207,
    gap: 12,
  },

  albumCover: {
    width: 150,
    height: 150,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.gray[50],
  },

  albumPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  albumArrow: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderTopLeftRadius: 4,
    backgroundColor: colors.gray[700],
    justifyContent: 'center',
    alignItems: 'center',
  },

  albumInfo: {
    width: 144,
    height: 45,
    marginLeft: 2,
  },

  albumTitle: {
    ...typography.label1,
    color: colors.gray[900],
  },

  albumArtist: {
    ...typography.body2,
    color: colors.gray[500],
  },

  emptyRanking: {
    height: 207,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: layout.screenPaddingHorizontal,
  },

  emptyIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.gray[50],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  emptyTitle: {
    ...typography.label1,
    color: colors.gray[500],
    textAlign: 'center',
  },

  emptyDescription: {
    ...typography.body2,
    color: colors.gray[500],
    textAlign: 'center',
  },

  recordList: {
    paddingHorizontal: layout.screenPaddingHorizontal,
    gap: RECORD_GAP,
  },

  recordCard: {
    width: RECORD_WIDTH,
    height: 226,
  },

  vinyl: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 226,
    height: 226,
    borderRadius: 113,
    backgroundColor: colors.gray[900],
    borderWidth: 2,
    borderColor: colors.gray[700],
    alignItems: 'center',
    justifyContent: 'center',
  },

  vinylRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: colors.gray[700],
  },

  vinylLabel: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.gray[500],
    alignItems: 'center',
    justifyContent: 'center',
  },

  vinylHole: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.gray[900],
  },

  recordCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 226,
    height: 226,
    borderRadius: radius.s,
    overflow: 'hidden',
    backgroundColor: colors.gray[100],
    elevation: 3,
  },

  recordPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray[100],
  },

  recordOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    padding: 12,
    justifyContent: 'flex-end',
    gap: 4,
  },

  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 3,
  },

  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },

  nickname: {
    ...typography.body2,
    flex: 1,
    color: colors.gray.white,
  },

  rating: {
    flexDirection: 'row',
    gap: 1,
  },

  recordMusic: {
    ...typography.body2,
    color: colors.gray.white,
  },

  recordContent: {
    ...typography.body2,
    color: colors.gray.white,
  },

  recordDate: {
    ...typography.caption1,
    color: colors.gray[300],
  },

  recordArrow: {
    position: 'absolute',
    right: 0,
    bottom: 12,
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: colors.gray[500],
    alignItems: 'center',
    justifyContent: 'center',
  },

  pagination: {
    height: 39,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.gray[200],
  },

  activeDot: {
    width: 13,
    backgroundColor: colors.gray[900],
  },

  emptyHome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: layout.screenPaddingHorizontal,
    gap: 8,
  },
});
