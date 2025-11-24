import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguageContext } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppInput from '../components/AppInput';

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({ email: '', password: '' });

  const { isRTL, toggleLanguage } = useLanguageContext();

  const validate = () => {
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
    } else if (password.trim().length < 6) {
      e.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(e);
    return valid;
  };

  const handleSignup = () => {
    if (!validate()) return;

    Alert.alert('Signup successful', 'You can now login.');
    navigation.navigate('Login');
  };

  const handleToggleLanguage = async () => {
    await AsyncStorage.setItem('lastRoute', 'Signup');
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
        <Text style={styles.title}>Sign Up</Text>

        <AppInput
          label="Email"
          value={email}
          onChangeText={v => {
            setEmail(v);
            if (errors.email) setErrors(p => ({ ...p, email: '' }));
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
            if (errors.password) setErrors(p => ({ ...p, password: '' }));
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

        <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Already have an account? Login
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  appName: {
    fontSize: 22,
    fontWeight: '700',
  },

  authInput: {
    paddingVertical: 14,
    paddingHorizontal: 12,
  },

  langToggle: {
    fontSize: 14,
    color: '#007AFF',
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

  eyeIcon: {
    width: 18,
    height: 16,
    tintColor: '#555',
    position: 'relative',
    top: 3,
  },

  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },

  signupBtn: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  signupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  link: {
    color: '#007AFF',
    marginTop: 30,
    textAlign: 'center',
  },
});

export default SignupScreen;
