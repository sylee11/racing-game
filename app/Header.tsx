import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Header() {
    const username = 'SYLEE';
    const walletAddress = '30e7...a282';
    const assets = [
        { key: 'cash', icon: 'dollar-sign', iconColor: '#21C933', value: '11.67K', label: 'Cash' },
        { key: 'diamond', icon: 'ticket-alt', iconColor: '#FF2DC9', value: '9.79K', label: 'Pink Token' },
        { key: 'gold', icon: 'coins', iconColor: '#FFD700', value: '944.39', label: 'Gold Coins' },
      ];
  return (
    <>
    <Image
            source={{ uri: 'https://i.imgur.com/GXJ3T71.jpg' }} // Placeholder Cyberpunk city image blurred
            blurRadius={Platform.OS === 'android' ? 5 : 12}
            style={styles.background}
            resizeMode="cover"
          />
    <View style={styles.topBar}>
          <View style={styles.userInfo}>
              <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                  style={styles.avatar} />
              <Text style={styles.username}>{username}</Text>
          </View>

          <View style={styles.wallet}>
              <Text style={styles.walletText}>{walletAddress}</Text>
              <Icon name="wallet" size={20} color="#fff" style={{ marginLeft: 6 }} />
          </View>
      </View><View style={styles.assetsContainer}>
              {assets.map(({ key, icon, iconColor, value }) => (
                  <View key={key} style={styles.assetCard}>
                      <View style={[styles.assetIconWrapper, { backgroundColor: iconColor + '33' }]}>
                          <Icon name={icon} size={22} color={iconColor} />
                      </View>
                      <Text style={styles.assetValue}>{value}</Text>
                  </View>
              ))}
          </View></>
  );
}

const styles = StyleSheet.create({
    background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  }
});
