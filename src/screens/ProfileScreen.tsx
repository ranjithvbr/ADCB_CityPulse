import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../hooks/useLanguage';
import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from '../hooks/useAsyncStorage';

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

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    city: '',
  });

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setCity(profile.city || '');
    }
  }, [profile]);

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', email: '', city: '' };

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        newErrors.email = 'Invalid email format';
        valid = false;
      }
    }

    if (!city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const updated: Profile = { name, email, city };
    await setProfile(updated);

    Alert.alert('Profile updated successfully');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(profile?.name || '');
    setEmail(profile?.email || '');
    setCity(profile?.city || '');
    setIsEditing(false);
    setErrors({ name: '', email: '', city: '' });
  };

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['userProfile', 'favouriteEvents']);
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const handleToggleLanguage = async () => {
    await AsyncStorage.setItem('lastRoute', 'Home');
    toggleLanguage();
  };

  return (
    <View style={[styles.container, isRTL && styles.containerRTL]}>
      <Text style={[styles.title, isRTL && styles.textRTL]}>User Profile</Text>

      {/* VIEW */}
      {!isEditing && (
        <>
          <Text style={[styles.label, isRTL && styles.textRTL]}>Full Name</Text>
          <Text style={[styles.value, isRTL && styles.textRTL]}>
            {profile?.name || '-'}
          </Text>

          <Text style={[styles.label, isRTL && styles.textRTL]}>Email</Text>
          <Text style={[styles.value, isRTL && styles.textRTL]}>
            {profile?.email || '-'}
          </Text>

          <Text style={[styles.label, isRTL && styles.textRTL]}>City</Text>
          <Text style={[styles.value, isRTL && styles.textRTL]}>
            {profile?.city || '-'}
          </Text>

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
      )}

      {/* EDIT */}
      {isEditing && (
        <>
          <TextInput
            style={[styles.input, isRTL && styles.textRTL]}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#777"
          />
          {errors.name ? (
            <Text style={[styles.error, isRTL && styles.textRTL]}>
              {errors.name}
            </Text>
          ) : null}

          <TextInput
            style={[styles.input, isRTL && styles.textRTL]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#777"
          />
          {errors.email ? (
            <Text style={[styles.error, isRTL && styles.textRTL]}>
              {errors.email}
            </Text>
          ) : null}

          <TextInput
            style={[styles.input, isRTL && styles.textRTL]}
            placeholder="City"
            value={city}
            onChangeText={setCity}
            placeholderTextColor="#777"
          />
          {errors.city ? (
            <Text style={[styles.error, isRTL && styles.textRTL]}>
              {errors.city}
            </Text>
          ) : null}

          <View style={styles.row}>
            <Button title="Save" onPress={handleSave} />
            <View style={styles.rowGap} />
            <Button title="Cancel" color="#888" onPress={handleCancel} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  containerRTL: { flexDirection: 'column', direction: 'rtl' },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },

  label: {
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'left',
  },

  value: {
    fontSize: 16,
    color: '#444',
    marginTop: 4,
    textAlign: 'left',
  },

  textRTL: {
    textAlign: 'left',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
  },

  error: { color: 'red', fontSize: 12, marginTop: 4 },

  row: { flexDirection: 'row', marginTop: 20 },
  rowGap: { width: 10 },

  buttonSpacing: { marginTop: 20 },
});

export default ProfileScreen;
