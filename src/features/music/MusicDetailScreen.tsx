import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AvatarIcon,
  ChevronLeftIcon,
  ChevronRightSmIcon,
  LyricsIcon,
  StarIcon,
} from '@/components/common/icons';
import {
  componentTokens,
  primitiveTokens,
  radius,
  semanticTokens,
  typography,
  withOpacity,
} from '@/styles';

import {
  getMusicDetail,
  type MusicDetail,
  type MusicDetailMode,
  type MusicRecord,
  type OtherMusicRecord,
  type Track,
} from './musicData';

const { unit } = primitiveTokens;
const { color } = semanticTokens;
const { sectionHeader, record: recordTokens } = componentTokens;

const SCREEN_BACKGROUND = color.background.secondary;
const TOP_BAR_HEIGHT = unit[64];
const MAX_DISPLAY_COUNT = 300;

const ARTWORK_WIDTH = 243.58;
const ARTWORK_HEIGHT = 175.89;
const COVER_SIZE = 175.3;
const VINYL_WIDTH = 174.73;
const VINYL_LABEL_SIZE = 64.14;
const VINYL_HOLE_SIZE = 8.48;
// 시안의 AlbumArtwork 라벨 그라데이션 (앨범 커버 색상 기반 아님)
const VINYL_LABEL_COLORS = ['#E1DB00', '#7B7800'] as const;

const AVATAR_SIZE = unit[20];

function BackButton() {
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <Pressable
      style={styles.backButton}
      onPress={goBack}
      accessibilityRole="button"
      accessibilityLabel="뒤로가기"
    >
      <ChevronLeftIcon />
    </Pressable>
  );
}

function Artwork({ detail, showLyrics }: { detail: MusicDetail; showLyrics: boolean }) {
  return (
    <View style={styles.artwork}>
      <Image source={require('@/assets/images/vinyl.png')} style={styles.vinyl} />

      <LinearGradient colors={VINYL_LABEL_COLORS} style={styles.vinylLabel}>
        <View style={styles.vinylHole} />
      </LinearGradient>

      <View style={styles.coverShadow}>
        <View style={styles.cover}>
          {detail.artwork ? (
            <Image source={detail.artwork} resizeMode="cover" style={styles.coverImage} />
          ) : (
            <LyricsIcon size={48} color={color.icon.disabled} />
          )}

          {showLyrics && (
            <Pressable
              style={styles.lyricsArea}
              accessibilityRole="button"
              accessibilityLabel="가사"
            >
              <View style={styles.lyricsButton}>
                <LyricsIcon size={13.89} color={color.icon.disabled} />
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

function MusicHeader({ detail, mode }: { detail: MusicDetail; mode: MusicDetailMode }) {
  return (
    <View style={styles.header}>
      <Artwork detail={detail} showLyrics={mode === 'track'} />

      <View style={styles.info}>
        <Text style={styles.title}>{detail.title}</Text>
        <View>
          <Text style={styles.artist} numberOfLines={1}>
            {detail.artist}
          </Text>
          <Text style={styles.albumTitle} numberOfLines={1}>
            {detail.albumTitle}
          </Text>
          <Text style={styles.releaseDate} numberOfLines={1}>
            {detail.releaseDate}
          </Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [styles.recordButton, pressed && styles.recordButtonPressed]}
        accessibilityRole="button"
      >
        <Text style={styles.recordButtonLabel}>
          {mode === 'album' ? '앨범 기록하기' : '곡 기록하기'}
        </Text>
      </Pressable>
    </View>
  );
}

function TrackItem({ track }: { track: Track }) {
  return (
    <Pressable style={styles.trackItem} accessibilityRole="button">
      <View style={styles.trackContent}>
        <Text style={styles.trackTitle}>{`${track.number}.`}</Text>
        <Text style={styles.trackTitle} numberOfLines={1}>
          {track.title}
        </Text>
        <Text style={styles.trackDuration}>{track.duration}</Text>
      </View>
      <ChevronRightSmIcon />
    </Pressable>
  );
}

function TrackSection({ detail }: { detail: MusicDetail }) {
  return (
    <>
      <View style={styles.area} />
      <Text style={styles.trackSummary}>
        {`총 ${detail.tracks.length}곡  ${detail.totalDuration}`}
      </Text>
      {detail.tracks.map((track) => (
        <TrackItem key={track.id} track={track} />
      ))}
    </>
  );
}

function Rating({ value }: { value: number }) {
  return (
    <View style={styles.rating}>
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon key={index} size={10} filled={index < value} />
      ))}
    </View>
  );
}

function MyRecordItem({ record }: { record: MusicRecord }) {
  const tokens = recordTokens.myRecordItem.text;

  return (
    <View style={styles.myRecord}>
      {record.rating !== undefined && <Rating value={record.rating} />}
      {!!record.comment && (
        <Text style={[styles.recordComment, { color: tokens.content }]}>{record.comment}</Text>
      )}
      <Text style={[styles.recordDate, { color: tokens.date }]}>{record.date}</Text>
    </View>
  );
}

function Avatar({ source }: { source: OtherMusicRecord['profileImage'] }) {
  return (
    <View style={styles.avatar}>
      {source ? (
        <Image source={source} style={styles.avatarImage} />
      ) : (
        <AvatarIcon size={AVATAR_SIZE} />
      )}
    </View>
  );
}

function OtherRecordItem({ record }: { record: OtherMusicRecord }) {
  const tokens = recordTokens.othersRecordItem.text;

  return (
    <View style={styles.otherRecord}>
      <Avatar source={record.profileImage} />
      <View style={styles.otherRecordContent}>
        <View style={styles.authorRow}>
          <Text style={[styles.recordDate, { color: tokens.nickname }]}>{record.nickname}</Text>
          {record.rating !== undefined && <Rating value={record.rating} />}
        </View>
        {!!record.comment && (
          <Text style={[styles.recordComment, { color: tokens.content }]}>{record.comment}</Text>
        )}
        <Text style={[styles.recordDate, { color: tokens.date }]}>{record.date}</Text>
      </View>
    </View>
  );
}

function RecordSectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleGroup}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionCount}>
          {count > MAX_DISPLAY_COUNT ? `${MAX_DISPLAY_COUNT}+` : count}
        </Text>
      </View>

      <Pressable style={styles.viewAll} accessibilityRole="button">
        <Text style={styles.viewAllText}>전체보기</Text>
        <ChevronRightSmIcon size={20} color={sectionHeader.icon.default} />
      </Pressable>
    </View>
  );
}

function EmptyRecords() {
  return <Text style={styles.emptyMessage}>아직 작성한 기록이 없어요.</Text>;
}

export default function MusicDetailScreen({ mode }: { mode: MusicDetailMode }) {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const detail = getMusicDetail(mode, id);
  const topAreaHeight = insets.top + TOP_BAR_HEIGHT;

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={{
          paddingTop: topAreaHeight,
          paddingBottom: insets.bottom + unit[32],
        }}
        showsVerticalScrollIndicator={false}
      >
        <MusicHeader detail={detail} mode={mode} />

        {detail.tracks.length > 0 && <TrackSection detail={detail} />}

        <View style={styles.area} />
        <RecordSectionHeader title="나의 기록" count={detail.myRecordCount} />
        {detail.myRecords.length > 0 ? (
          detail.myRecords.map((record) => <MyRecordItem key={record.id} record={record} />)
        ) : (
          <EmptyRecords />
        )}

        <View style={styles.area} />
        <RecordSectionHeader title="타인의 기록" count={detail.otherRecordCount} />
        {detail.otherRecords.length > 0 ? (
          detail.otherRecords.map((record, index) => (
            <View key={record.id}>
              {index > 0 && <View style={styles.divider} />}
              <OtherRecordItem record={record} />
            </View>
          ))
        ) : (
          <EmptyRecords />
        )}
      </ScrollView>

      <LinearGradient
        colors={[SCREEN_BACKGROUND, withOpacity(SCREEN_BACKGROUND, 0)]}
        style={[styles.topArea, { height: topAreaHeight, paddingTop: insets.top }]}
      >
        <BackButton />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: SCREEN_BACKGROUND,
  },

  topArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    paddingHorizontal: unit[20],
    pointerEvents: 'box-none',
  },

  backButton: {
    width: unit[40],
    height: unit[40],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.s,
    backgroundColor: componentTokens.button.secondary.background.default,
  },

  header: {
    alignItems: 'center',
    gap: unit[16],
    paddingHorizontal: 66,
    paddingVertical: unit[10],
  },

  artwork: {
    width: ARTWORK_WIDTH,
    height: ARTWORK_HEIGHT,
  },

  vinyl: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: VINYL_WIDTH,
    height: ARTWORK_HEIGHT,
  },

  vinylLabel: {
    position: 'absolute',
    left: ARTWORK_WIDTH * 0.5097,
    top: ARTWORK_HEIGHT * 0.3172,
    width: VINYL_LABEL_SIZE,
    height: VINYL_LABEL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: VINYL_LABEL_SIZE / 2,
  },

  vinylHole: {
    width: VINYL_HOLE_SIZE,
    height: VINYL_HOLE_SIZE,
    borderRadius: VINYL_HOLE_SIZE / 2,
    backgroundColor: primitiveTokens.color.neutral[900],
  },

  coverShadow: {
    width: COVER_SIZE,
    height: COVER_SIZE,
    borderRadius: radius.s,
    boxShadow:
      '0.579px 1.157px 2.314px 0px rgba(17, 17, 19, 0.04), 1.157px 2.314px 13.886px 0px rgba(17, 17, 19, 0.12)',
  },

  cover: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: radius.s,
    backgroundColor: componentTokens.card.background.default,
  },

  coverImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  lyricsArea: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingHorizontal: 9.26,
    paddingVertical: 6.94,
  },

  lyricsButton: {
    paddingLeft: 9.26,
    paddingRight: 10.41,
    paddingVertical: 5.79,
    borderRadius: 2.31,
    backgroundColor: componentTokens.card.overlayIconButton.state.default,
  },

  info: {
    alignSelf: 'stretch',
    gap: unit[4],
  },

  title: {
    ...typography.head2,
    color: color.text.primary,
    textAlign: 'center',
  },

  artist: {
    ...typography.body2,
    color: color.text.secondary,
    textAlign: 'center',
  },

  albumTitle: {
    ...typography.body2,
    color: color.text.disabled,
    textAlign: 'center',
  },

  releaseDate: {
    ...typography.caption1,
    color: color.text.disabled,
    textAlign: 'center',
  },

  recordButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    padding: unit[16],
    borderRadius: unit[8],
    backgroundColor: componentTokens.button.primary.background.default,
  },

  recordButtonPressed: {
    backgroundColor: componentTokens.button.primary.background.pressed,
  },

  recordButtonLabel: {
    ...typography.label1,
    color: componentTokens.button.primary.text.default,
    textAlign: 'center',
  },

  area: {
    height: unit[32],
  },

  trackSummary: {
    ...typography.body1,
    color: color.text.primary,
    paddingHorizontal: unit[22],
    paddingVertical: unit[12],
  },

  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: unit[22],
    paddingRight: unit[16],
    paddingVertical: unit[10],
  },

  trackContent: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: unit[6],
  },

  trackTitle: {
    ...typography.body1,
    flexShrink: 1,
    color: color.text.primary,
  },

  trackDuration: {
    ...typography.body2,
    color: color.icon.secondary,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: unit[32] + unit[12] * 2,
    paddingLeft: unit[22],
    paddingRight: unit[16],
    paddingVertical: unit[12],
  },

  sectionTitleGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: unit[8],
  },

  sectionTitle: {
    ...typography.title1,
    color: sectionHeader.text.title,
  },

  sectionCount: {
    ...typography.body2,
    color: sectionHeader.text.meta,
  },

  viewAll: {
    height: unit[32],
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewAllText: {
    ...typography.body2,
    color: sectionHeader.text.default,
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1.67,
  },

  myRecord: {
    gap: unit[8],
    paddingHorizontal: unit[22],
    paddingVertical: unit[24],
  },

  otherRecord: {
    flexDirection: 'row',
    gap: unit[8],
    paddingHorizontal: unit[22],
    paddingVertical: unit[24],
  },

  otherRecordContent: {
    flex: 1,
    minWidth: 0,
    gap: unit[8],
  },

  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: unit[8],
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: primitiveTokens.color.neutral[200],
  },

  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },

  recordComment: {
    ...typography.body2,
  },

  recordDate: {
    ...typography.caption1,
  },

  divider: {
    height: 1,
    marginHorizontal: unit[20],
    backgroundColor: recordTokens.othersRecordItem.border.divider,
  },

  emptyMessage: {
    ...typography.body2,
    color: componentTokens.card.text.disabled,
    paddingHorizontal: unit[22],
  },
});
