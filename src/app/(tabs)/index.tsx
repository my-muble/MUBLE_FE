import { Alert } from 'react-native';

import HomeScreen from '@/features/home/HomeScreen';

export default function HomeTab() {
  return (
    <HomeScreen
      onSearchPress={() => {
        Alert.alert('검색', '검색 화면 연결 예정입니다.');
      }}
      onAlbumPress={(albumId) => {
        Alert.alert('앨범 상세', `앨범 ID: ${albumId}`);
      }}
      onRecordPress={(recordId) => {
        Alert.alert('기록 상세', `기록 ID: ${recordId}`);
      }}
    />
  );
}
