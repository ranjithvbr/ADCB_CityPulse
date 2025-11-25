import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../hooks/useLanguage';
import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from '../hooks/useAsyncStorage';
import AppInput from '../components/AppInput';

type Profile = {
  name: string;
  email: string;
  city: string;
};

const PROFILE_KEY = 'userProfile';

const ProfileScreen = () => {
  const { isRTL, toggleLanguage } = useLanguage();
  const navigation = useNavigation<any>();

  const { value: profile, setValue: setProfile } = useAsyncStorage<Profile>(
    PROFILE_KEY,
    { name: '', email: '', city: '' },
  );

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  const [errors, setErrors] = useState({ name: '', email: '', city: '' });

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setCity(profile.city);
    }
  }, [profile]);

  const validate = useCallback(() => {
    let valid = true;
    const newErrors = { name: '', email: '', city: '' };

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }, [name, email, city]);

  const handleSave = useCallback(async () => {
    if (!validate()) return;

    await setProfile({ name, email, city });
    Alert.alert('Profile updated successfully');
    setIsEditing(false);
  }, [validate, setProfile, name, email, city]);

  const handleCancel = useCallback(() => {
    setName(profile?.name || '');
    setEmail(profile?.email || '');
    setCity(profile?.city || '');
    setErrors({ name: '', email: '', city: '' });
    setIsEditing(false);
  }, [profile]);

  const handleLogout = useCallback(async () => {
    await AsyncStorage.multiRemove(['userProfile', 'favouriteEvents', 'lastRoute']);
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }, [navigation]);

  const handleToggleLanguage = useCallback(async () => {
    await AsyncStorage.setItem('lastRoute', 'Home');
    toggleLanguage();
  }, [toggleLanguage]);

  return (
    <View style={[styles.container, isRTL && styles.rtlContainer]}>
      <Text style={[styles.title, isRTL && styles.titleRTL]}>User Profile</Text>

      <View style={styles.card}>
        <AppInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          editable={isEditing}
          error={isEditing ? errors.name : ''}
          isRTL={isRTL}
        />

        <AppInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          editable={isEditing}
          error={isEditing ? errors.email : ''}
          isRTL={isRTL}
        />

        <AppInput
          label="City"
          value={city}
          onChangeText={setCity}
          editable={isEditing}
          error={isEditing ? errors.city : ''}
          isRTL={isRTL}
        />

        {!isEditing ? (
          <>
            <View style={styles.buttonSpacing}>
              <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
            </View>

            <View style={styles.buttonSpacing}>
              <Button
                title={isRTL ? 'Switch to English' : 'Switch to Arabic'}
                onPress={handleToggleLanguage}
              />
            </View>

            <View style={styles.buttonSpacing}>
              <Button title="Logout" color="#d9534f" onPress={handleLogout} />
            </View>
          </>
        ) : (
          <>
            <View style={styles.buttonSpacing}>
              <Button title="Save" onPress={handleSave} />
            </View>

            <View style={styles.buttonSpacing}>
              <Button title="Cancel" color="#6B7280" onPress={handleCancel} />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F3F4F6' },
  rtlContainer: { direction: 'rtl' },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  titleRTL: { writingDirection: 'rtl' },

  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  buttonSpacing: {
    marginTop: 14,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default ProfileScreen;
