import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useEvents } from '../hooks/useEvents';
import { useFavourites } from '../hooks/useFavourites';
import { useLanguage } from '../hooks/useLanguage';
import type { CityPulseEvent } from '../services/api';

import AppInput from '../components/AppInput';

const HomeScreen = ({ navigation }: any) => {
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const { events, loading, error, search } = useEvents();
  const { isFavourite, toggleFavourite } = useFavourites();
  const { isRTL } = useLanguage();

  useEffect(() => {
    search('', '');
  }, []);

  const handleSearch = useCallback(() => {
    search(keyword.trim(), city.trim());
  }, [keyword, city, search]);

  const renderItem = useCallback(
    ({ item }: { item: CityPulseEvent }) => {
      const fav = isFavourite(item.id);

      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('EventDetails', { event: item })}
        >
          <View style={styles.cardHeader}>
            <Text
              style={[styles.cardTitle, isRTL && styles.cardTitleRTL]}
              numberOfLines={2}
            >
              {item.Event.slice(0, 70)}...
            </Text>

            <TouchableOpacity onPress={() => toggleFavourite(item.id)}>
              <Text style={[styles.favIcon, fav && styles.favIconActive]}>
                {fav ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cityBadgeContainer}>
            <Text style={styles.cityBadgeText}>{item.City}</Text>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.cardCreatedBy}>By: {item.CreatedBy}</Text>

            <Text style={styles.viewDetailsText}>
              {isRTL ? `← View Details` : `View Details →`}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [isFavourite, toggleFavourite, navigation, isRTL],
  );

  const keyExtractor = useCallback((item: CityPulseEvent) => item.id, []);

  return (
    <View style={styles.screen}>
      {/* Smaller search card */}
      <View style={styles.searchContainer}>
        <Text style={[styles.title, isRTL && styles.textAlignRight]}>
          Search Events
        </Text>

        <AppInput
          // label="Keyword"
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Keyword"
          isRTL={isRTL}
        />

        <AppInput
          // label="City"
          value={city}
          onChangeText={setCity}
          placeholder="City"
          isRTL={isRTL}
        />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Status text moved OUTSIDE card so card height is smaller */}
      {loading && (
        <Text style={[styles.info, isRTL && styles.textAlignRight]}>
          Loading...
        </Text>
      )}

      {error && (
        <Text
          style={[styles.info, styles.error, isRTL && styles.textAlignRight]}
        >
          {error}
        </Text>
      )}

      {!loading && !events.length && !error && (
        <Text style={[styles.info, isRTL && styles.textAlignRight]}>
          No events found
        </Text>
      )}

      <FlatList
        data={events}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        extraData={isRTL}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={() =>
          events.length > 0 ? (
            <Text style={styles.footer}>-- You've reached the end --</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },

  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  searchButton: {
    backgroundColor: '#0d92eb',
    borderRadius: 8,
    paddingVertical: 9,
    alignItems: 'center',
    marginTop: 2,
  },

  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },

  info: {
    marginTop: 6,
    marginBottom: 4,
    color: '#777',
    fontSize: 13,
  },

  error: {
    color: 'red',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  cardTitle: {
    fontWeight: '600',
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },

  cardTitleRTL: {
    textAlign: 'left',
    marginRight: 0,
    marginLeft: 8,
    writingDirection: 'rtl',
  },

  favIcon: { fontSize: 22, color: '#f5a623', marginLeft: 16 },
  favIconActive: { color: '#f97316' },

  cityBadgeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#e0f2fe',
    marginBottom: 8,
    maxWidth: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cityBadgeText: {
    color: '#0369a1',
    fontWeight: '600',
    fontSize: 12,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardCreatedBy: {
    fontSize: 12,
    color: '#6b7280',
  },

  viewDetailsText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0d92eb',
    marginLeft: 8,
  },

  footer: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 12,
    marginVertical: 16,
  },

  listContent: {
    paddingVertical: 4,
  },

  textAlignRight: {
    writingDirection: 'rtl',
  },
});

export default HomeScreen;
