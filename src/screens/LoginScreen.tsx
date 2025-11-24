import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useLanguageContext } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('test@adcb.com');
  const [password, setPassword] = useState('testuser');
  const [showPassword, setShowPassword] = useState(false);

  const { isRTL, toggleLanguage } = useLanguageContext();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Invalid credentials');
      return;
    }
    if (email === 'test@adcb.com' && password === 'testuser') {
      navigation.replace('Home');
    } else {
      Alert.alert('Invalid credentials');
    }
  };

  const handleBiometric = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { available } = await rnBiometrics.isSensorAvailable();
      if (!available) return Alert.alert('Biometrics not available');

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Login with Biometrics',
      });

      if (success) navigation.replace('Home');
    } catch (e) {
      Alert.alert('Biometric auth failed');
    }
  };

  const handleToggleLanguage = async () => {
    await AsyncStorage.setItem('lastRoute', 'Login');
    toggleLanguage();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.appName}>ADCB CityPulse</Text>

        <TouchableOpacity onPress={handleToggleLanguage}>
          <Text style={styles.langToggle}>{isRTL ? 'English' : 'Arabic'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerContent}>
        <Text style={styles.title}>Login</Text>

        <Text style={[styles.label, isRTL && styles.labelRTL]}>Email</Text>
        <TextInput
          style={[styles.input, isRTL && styles.inputRTL]}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, isRTL && styles.labelRTL]}>Password</Text>

        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input, isRTL && styles.inputRTL]}
            placeholder="Enter password"
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.eyeIconWrapper, isRTL && styles.eyeIconWrapperRTL]}
            onPress={() => setShowPassword(prev => !prev)}
          >
            <Image
              source={
                showPassword
                  ? require('../assets/eye-open.png')
                  : require('../assets/eye-closed.png')
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bioBtn} onPress={handleBiometric}>
            <Image
              source={require('../assets/biometric.png')}
              style={styles.bioIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
          Don't have an account? Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7F7' },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  appName: { fontSize: 22, fontWeight: '700' },

  langToggle: { fontSize: 14, color: '#007AFF', fontWeight: '700' },

  centerContent: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },

  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    alignSelf: 'stretch',
    textAlign: 'left',
  },

  labelRTL: {
    textAlign: 'left',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
  },

  inputRTL: { textAlign: 'right' },

  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },

  eyeIconWrapper: {
    position: 'absolute',
    right: 12,
    top: 9,
    padding: 5,
  },

  eyeIconWrapperRTL: {
    right: 12,
    left: undefined,
  },

  eyeIcon: {
    width: 22,
    height: 16,
    tintColor: '#555',
  },

  btnRow: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  loginBtn: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 12,
    marginRight: 12,
    borderRadius: 10,
  },

  loginText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },

  bioBtn: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bioIcon: { width: 28, height: 28 },

  link: { color: '#007AFF', marginTop: 20, textAlign: 'center' },
});

export default LoginScreen;
