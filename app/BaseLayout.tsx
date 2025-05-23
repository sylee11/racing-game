// components/BaseLayout.tsx
import Footer from '@/app/Footer';
import Header from '@/app/Header';
import React from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const isSmallScreen = width <= 350 && height <= 600;

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header nếu cần */}
        <Header />

        <View style={styles.content}>
          {children}
        </View>

        {/* Footer nếu cần */}
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'flex-start',
    paddingTop: 40,
    height: isSmallScreen ? 600 : undefined,
    width: isSmallScreen ? 350 : undefined,
  },
  content: {
    flex: 1,
  },
});
