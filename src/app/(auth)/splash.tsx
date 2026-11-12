import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { Image, StyleSheet, View } from 'react-native';

const MUBLE_WORDMARK = require('../../assets/auth/muble-wordmark.png');

export default function SplashScreen() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Image source={MUBLE_WORDMARK} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B0B0B',
  },

  logo: {
    width: 159,
    height: 39,
    transform: [{ translateY: -26 }],
  },
});
