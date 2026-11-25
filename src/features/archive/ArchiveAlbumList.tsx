import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { BackHandler, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { componentTokens, layout, primitiveTokens, semanticTokens, typography } from '@/styles';

import { sortArchiveAlbumsByRecent, type ArchiveAlbumListItem } from './archiveAlbumListData';
import ArchiveAlbumShelf from './ArchiveAlbumShelf';

const { unit } = primitiveTokens;
const { dropdown, sectionHeader } = componentTokens;

export default function ArchiveAlbumList({
  albums,
  onAlbumPress,
}: {
  albums: readonly ArchiveAlbumListItem[];
  onAlbumPress?: (id: string) => void;
}) {
  const list = useRef<FlatList<ArchiveAlbumListItem[]>>(null);
  const lastOffset = useRef(0);
  const focused = useRef(false);
  const [width, setWidth] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [awayFromTop, setAwayFromTop] = useState(false);
  const sorted = useMemo(() => sortArchiveAlbumsByRecent(albums), [albums]);
  const shelves = useMemo(
    () =>
      Array.from({ length: Math.ceil(sorted.length / 3) }, (_, index) =>
        sorted.slice(index * 3, index * 3 + 3),
      ),
    [sorted],
  );

  useFocusEffect(
    useCallback(() => {
      const offset = lastOffset.current;
      const frame = requestAnimationFrame(() => {
        list.current?.scrollToOffset({ offset, animated: false });
        focused.current = true;
      });
      return () => {
        focused.current = false;
        cancelAnimationFrame(frame);
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (!menuOpen) return;
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        setMenuOpen(false);
        return true;
      });
      return () => subscription.remove();
    }, [menuOpen]),
  );

  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent }) => {
        if (nativeEvent.layout.width > 0) setWidth(nativeEvent.layout.width);
      }}
    >
      <View style={styles.toolbar}>
        <Text style={styles.total}>{albums.length} 앨범</Text>
      </View>
      {width > 0 && (
        <FlatList
          ref={list}
          data={shelves}
          keyExtractor={(row) => row.map(({ id }) => id).join(',')}
          renderItem={({ item }) => (
            <ArchiveAlbumShelf albums={item} width={width} onAlbumPress={onAlbumPress} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onLayout={({ nativeEvent }) => {
            if (nativeEvent.layout.height > 0) setViewportHeight(nativeEvent.layout.height);
          }}
          onContentSizeChange={(_, height) => setContentHeight(height)}
          onScroll={({ nativeEvent }) => {
            if (!focused.current) return;
            lastOffset.current = nativeEvent.contentOffset.y;
            setAwayFromTop(nativeEvent.contentOffset.y > unit[24]);
          }}
          scrollEventThrottle={32}
        />
      )}
      {contentHeight > viewportHeight + 1 && awayFromTop && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="목록 최상단으로 이동"
          onPress={() => list.current?.scrollToOffset({ offset: 0, animated: true })}
          style={styles.scrollTop}
        >
          <Image
            source={require('@/assets/archive/album-scroll-top.svg')}
            style={styles.scrollTopIcon}
          />
        </Pressable>
      )}
      {menuOpen && (
        <Pressable accessible={false} onPress={() => setMenuOpen(false)} style={styles.backdrop} />
      )}
      <View style={styles.sort}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="앨범 정렬, 최근순"
          aria-expanded={menuOpen}
          onPress={() => setMenuOpen((open) => !open)}
          style={styles.trigger}
        >
          <Text style={styles.sortLabel}>최근순</Text>
          <Image
            source={
              menuOpen
                ? require('@/assets/archive/chevron-up.svg')
                : require('@/assets/archive/chevron-down.svg')
            }
            style={styles.chevron}
          />
        </Pressable>
        {menuOpen && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="최근순 선택"
            onPress={() => setMenuOpen(false)}
            style={styles.option}
          >
            <Text style={styles.sortLabel}>최근순</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toolbar: {
    height: unit[60],
    justifyContent: 'center',
    paddingLeft: unit[22],
    paddingRight: unit[80],
  },
  total: { ...typography.title2, color: sectionHeader.text.title },
  list: { paddingTop: unit[16], paddingBottom: unit[24], gap: unit[24] },
  sort: { position: 'absolute', right: layout.screenPaddingHorizontal, top: unit[16], zIndex: 3 },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: unit[4],
    paddingLeft: unit[8],
    paddingRight: unit[4],
    paddingVertical: unit[4],
    borderRadius: unit[4],
    backgroundColor: dropdown.background.default,
  },
  sortLabel: { ...typography.caption2, color: dropdown.text.default },
  chevron: { width: unit[20], height: unit[20] },
  option: {
    marginTop: unit[4],
    paddingHorizontal: unit[8],
    paddingVertical: unit[6],
    borderRadius: unit[4],
    backgroundColor: dropdown.background.default,
  },
  backdrop: { ...StyleSheet.absoluteFill, zIndex: 2 },
  scrollTop: {
    position: 'absolute',
    right: unit[20],
    bottom: unit[16],
    width: unit[48],
    height: unit[48],
    borderRadius: unit[80],
    borderWidth: 1,
    borderColor: semanticTokens.color.background.tertiary,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 2px rgba(17,17,19,0.01), 0 4px 20px rgba(17,17,19,0.04)',
  },
  scrollTopIcon: { width: unit[24], height: unit[24] },
});
