import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../hooks/useLanguage';

type AuthLayoutProps = {
  title: string;
  lastRouteKey: 'Login' | 'Signup';
  children: React.ReactNode;
};

const AuthLayout = ({ title, lastRouteKey, children }: AuthLayoutProps) => {
  const { isRTL, toggleLanguage } = useLanguage();

  const handleToggleLanguage = useCallback(async () => {
    await AsyncStorage.setItem('lastRoute', lastRouteKey);
    toggleLanguage();
  }, [lastRouteKey, toggleLanguage]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.languageContainer}>
        <TouchableOpacity onPress={handleToggleLanguage}>
          <Text style={styles.langToggle}>{isRTL ? 'English' : 'Arabic'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/event-calendar.png')}
          style={styles.logoIcon}
        />
        <Text style={styles.appName}>ADCB CityPulse</Text>
      </View>

      <View style={styles.centerContent}>
        <Text style={styles.title}>{title}</Text>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  langToggle: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '700',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },

  logoIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    marginBottom: 8,
    position: 'relative',
    top: 4,
    marginRight: 8,
  },

  appName: {
    fontSize: 22,
    fontWeight: '700',
  },

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default AuthLayout;
