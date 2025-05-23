import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

type RootStackParamList = {
  Home: undefined;
  PlayScreen: undefined;
  ProfileScreen: undefined;
  HomeScreen: undefined;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function BottomNavigation() {
    const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
        <Icon name="home" size={22} color="#ccc" 
            onPress={() => navigation.navigate('HomeScreen')}
        />
        <Text style={styles.navLabel}>Home</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
        <Icon name="money-bill-wave" size={22} color="#21c933" />
        <Text style={[styles.navLabel, { color: '#21c933' }]}>Earn</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={[styles.navItem, styles.playButton]} activeOpacity={0.7}>
        <Icon name="play" size={30} color="#fff" 
            onPress={() => navigation.navigate('PlayScreen')}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
        <Icon name="gift" size={22} color="#c72dc9" />
        <Text style={[styles.navLabel, { color: '#c72dc9' }]}>Invite</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
        <Icon name="user" size={22} color="#ccc" 
            onPress={() => navigation.navigate('ProfileScreen')}
        />
        <Text style={styles.navLabel}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b60ff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    transform: [{ scale: 1.1 }],
    overflow: 'hidden',
  },
});
