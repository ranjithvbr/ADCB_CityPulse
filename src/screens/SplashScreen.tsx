import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const loadRoute = async () => {
      const last = await AsyncStorage.getItem('lastRoute');

      setTimeout(() => {
        navigation?.replace(last || 'Login');
      }, 1000);
    };

    loadRoute();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/event-calendar.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>ADCB City Pulse</Text>
      <Text style={styles.subtitle}>Discover local events near you</Text>

      <ActivityIndicator style={{ marginTop: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default SplashScreen;
