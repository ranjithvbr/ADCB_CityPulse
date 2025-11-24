import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguageContext } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({ email: '', password: '' });

  const { isRTL, toggleLanguage } = useLanguageContext();

  const validate = () => {
    let valid = true;
    const e: any = { email: '', password: '' };

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

        <Text style={[styles.label, isRTL && styles.labelRTL]}>Email</Text>

        <TextInput
          style={[styles.input, isRTL && styles.inputRTL]}
          placeholder="Enter email"
          value={email}
          autoCapitalize="none"
          onChangeText={v => {
            setEmail(v);
            if (errors.email) setErrors(p => ({ ...p, email: '' }));
          }}
          placeholderTextColor="#777"
        />

        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        <Text style={[styles.label, isRTL && styles.labelRTL]}>Password</Text>

        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input, isRTL && styles.inputRTL]}
            placeholder="Enter password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={v => {
              setPassword(v);
              if (errors.password) setErrors(p => ({ ...p, password: '' }));
            }}
            placeholderTextColor="#777"
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

        {errors.password ? (
          <Text style={styles.error}>{errors.password}</Text>
        ) : null}

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

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
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

  inputRTL: {
    textAlign: 'right',
  },

  passwordWrapper: {
    position: 'relative',
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
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SignupScreen;
