import BaseLayout from '@/app/BaseLayout';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

const isSmallScreen = width <= 350 && height <= 600;

export default function HomeScreen() {
  const totalAssets = '31.51K';
  const luckyDrawBadgeCount = 264;

  return (
    <BaseLayout>
    <View style={styles.container}>
      {/* Background cyberpunk city with neon blur */}
      <Image
        source={{ uri: 'https://i.imgur.com/GXJ3T71.jpg' }} // Placeholder Cyberpunk city image blurred
        blurRadius={Platform.OS === 'android' ? 5 : 12}
        style={styles.background}
        resizeMode="cover"
      />

      {/* Overlay neon gradient for color effect */}
      <View style={styles.neonOverlay} />

      {/* Total Assets */}
      <View style={styles.totalAssetsWrapper}>
        <Text style={styles.totalLabel}>Total Assets</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.totalButton}>
          <Text style={styles.totalButtonText}>{totalAssets} &gt;</Text>
        </TouchableOpacity>
      </View>

      {/* Pony Character */}
      <View style={styles.ponyWrapper}>
        <Image
          source={{
            uri:
              'https://i.ibb.co/60DLfcZ/blue-pony.png', // Sample pony image - blue pony with white-purple mane & tail
          }}
          style={styles.pony}
          resizeMode="contain"
        />
      </View>

      {/* Lucky Draw Badge bottom right */}
      <View style={styles.luckyDrawWrapper}>
        <TouchableOpacity style={styles.luckyDrawButton} activeOpacity={0.8}>
          <Icon name="gift" size={28} color="#fff" />
          {luckyDrawBadgeCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{luckyDrawBadgeCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
    </BaseLayout>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 10,
    height: isSmallScreen ? 600 : undefined,
    width: isSmallScreen ? 350 : undefined,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  neonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(24, 9, 80, 0.4)',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    paddingHorizontal: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#6f42c1',
  },
  username: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 10,
    textShadowColor: '#9d55ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  wallet: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e2e6f',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 12,
  },
  walletText: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 6,
  },
  assetsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  assetCard: {
    backgroundColor: '#1c1b3ccc',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#6f42c1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 7,
  },
  assetIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff5',
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetValue: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textShadowColor: '#6f42c1',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  totalAssetsWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  totalLabel: {
    color: '#c9c9ff',
    fontSize: 15,
    marginBottom: 6,
    fontWeight: '600',
  },
  totalButton: {
    backgroundColor: '#6f42c1',
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#ae85ff',
  },
  totalButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 20,
  },
  ponyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  pony: {
    width: 200,
    height: 200,
  },
  luckyDrawWrapper: {
    position: 'absolute',
    bottom: 80,
    right: 16,
  },
  luckyDrawButton: {
    backgroundColor: '#6f42c1cc',
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#a45eff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ff2dc9',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 72,
    backgroundColor: 'rgba(12, 9, 41, 0.95)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#6f42c1',
    borderTopWidth: 2,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navLabel: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  playButton: {
    position: 'relative',
    top: -16,
    backgroundColor: '#e1e5ff',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2962ff',
    shadowOpacity: 0.9,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
});