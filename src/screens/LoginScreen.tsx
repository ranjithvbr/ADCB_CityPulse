import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import AppInput from '../components/AppInput';
import AuthLayout from '../components/AuthLayout';
import { useLanguage } from '../hooks/useLanguage';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('test@adcb.com');
  const [password, setPassword] = useState('testuser');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({ email: '', password: '' });

  const { isRTL } = useLanguage();

  const handleLogin = useCallback(() => {
    let valid = true;
    const e: { email: string; password: string } = { email: '', password: '' };

    if (!email.trim()) {
      e.email = 'Email is required';
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.email = 'Please enter a valid email';
        valid = false;
      }
    }

    if (!password.trim()) {
      e.password = 'Password is required';
      valid = false;
    }

    setErrors(e);
    if (!valid) return;

    if (email === 'test@adcb.com' && password === 'testuser') {
      navigation.replace('Home');
    } else {
      Alert.alert('Invalid credentials');
    }
  }, [email, password, navigation]);

  const handleBiometric = useCallback(async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { available } = await rnBiometrics.isSensorAvailable();

      if (!available) {
        Alert.alert('Biometrics not available');
        return;
      }

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Login with Biometrics',
      });

      if (success) {
        navigation.replace('Home');
      }
    } catch {
      Alert.alert('Biometric auth failed');
    }
  }, [navigation]);

  return (
    <AuthLayout title="Login" lastRouteKey="Login">
      <AppInput
        label="Email"
        value={email}
        onChangeText={v => {
          setEmail(v);
          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
        }}
        placeholder="Enter email"
        isRTL={isRTL}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
        customInputStyle={styles.authInput}
      />

      <AppInput
        label="Password"
        value={password}
        onChangeText={v => {
          setPassword(v);
          if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
        }}
        placeholder="Enter password"
        isRTL={isRTL}
        secureTextEntry={!showPassword}
        error={errors.password}
        customInputStyle={styles.authInput}
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
            <Image
              source={
                showPassword
                  ? require('../assets/eye-open.png')
                  : require('../assets/eye-closed.png')
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        }
      />

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
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  authInput: {
    paddingVertical: 14,
    paddingHorizontal: 12,
  },

  eyeIcon: {
    width: 18,
    height: 16,
    tintColor: '#555',
    position: 'relative',
    top: 3,
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

  link: { color: '#007AFF', marginTop: 30, textAlign: 'center' },
});

export default LoginScreen;
