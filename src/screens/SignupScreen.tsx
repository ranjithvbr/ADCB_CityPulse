import React, { useState, useCallback } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useLanguageContext } from '../context/LanguageContext';
import AppInput from '../components/AppInput';
import AuthLayout from '../components/AuthLayout';

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({ email: '', password: '' });

  const { isRTL } = useLanguageContext();

  const handleSignup = useCallback(() => {
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
    if (!valid) return;

    Alert.alert('Signup successful', 'You can now login.');
    navigation.navigate('Login');
  }, [email, password, navigation]);

  return (
    <AuthLayout title="Sign Up" lastRouteKey="Signup">
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
