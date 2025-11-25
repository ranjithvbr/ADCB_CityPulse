import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguageContext } from '../context/LanguageContext';

const AppHeader: React.FC<NativeStackHeaderProps> = ({
  navigation,
  route,
  options,
  back,
}) => {
  const { isRTL } = useLanguageContext();
  const title = options.title ?? route.name;

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.innerRow}>
        {/* Back button */}
        {back ? (
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <Text style={styles.backText}>{(isRTL && Platform.OS === 'ios') ? '›' : '‹'}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        {/* Title */}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {/* Profile Pictue */}
        <TouchableOpacity
          style={styles.profileWrapper}
          onPress={handleProfilePress}
        >
          <Image
            source={require('../assets/user.png')}
            style={styles.profileImg}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  innerRow: {
    height: 44,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backBtn: {
    minWidth: 32,
    alignItems: 'flex-start',
  },
  backText: {
    fontSize: 28,
    marginTop: -2,
  },
  backPlaceholder: {
    minWidth: 32,
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },

  profileWrapper: {
    minWidth: 28,
    alignItems: 'flex-end',
  },
  profileImg: {
    width: 20,
    height: 20,
    borderRadius: 16,
  },
});

export default AppHeader;
