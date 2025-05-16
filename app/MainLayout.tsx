// MainLayout.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/app/HomeScreen';
import Header from '@/app/Header';
import Footer from '@/app/Footer';
import PlayScreen from '@/app/PlayScreen';
import ProfileScreen from '@/app/ProfileScreen';

const Stack = createStackNavigator();

export default function MainLayout() {
  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <View style={styles.body}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="PlayScreen" component={PlayScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
      </View>
      {/* <Footer /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: { flex: 1 },
});
