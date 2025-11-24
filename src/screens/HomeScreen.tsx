import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useEvents } from '../hooks/useEvents';
import { useFavourites } from '../hooks/useFavourites';
import { useLanguage } from '../hooks/useLanguage';
import type { CityPulseEvent } from '../services/api';

const HomeScreen = ({ navigation }: any) => {
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const { events, loading, error, search } = useEvents();
  const { isFavourite, toggleFavourite } = useFavourites();
  const { isRTL } = useLanguage();

  useEffect(() => {
    search('', '');
  }, []);

  const handleSearch = () => {
    search(keyword, city);
  };

  const renderItem = ({ item }: { item: CityPulseEvent }) => {
    const fav = isFavourite(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('EventDetails', { event: item })}
      >
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, isRTL && styles.cardTitleRTL]}>
            {item.Event.slice(0, 40)}...
          </Text>

          <TouchableOpacity onPress={() => toggleFavourite(item.id)}>
            <Text style={[styles.favIcon, fav && styles.favIconActive]}>
              {fav ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.cardCity, isRTL && styles.textAlignLeft]}>
          {item.City}
        </Text>

        <Text style={[styles.cardCreatedBy, isRTL && styles.textAlignLeft]}>
          By: {item.CreatedBy}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isRTL && styles.textAlignLeft]}>
        Search Events
      </Text>

      <TextInput
        style={[styles.input, isRTL && styles.textAlignRight]}
        placeholder="Keyword"
        value={keyword}
        onChangeText={setKeyword}
        placeholderTextColor="#777"
      />

      <TextInput
        style={[styles.input, isRTL && styles.textAlignRight]}
        placeholder="City"
        value={city}
        onChangeText={setCity}
        placeholderTextColor="#777"
      />

      <Button title="Search" onPress={handleSearch} />

      {loading && (
        <Text style={[styles.info, isRTL && styles.textAlignLeft]}>
          Loading...
        </Text>
      )}

      {error && (
        <Text
          style={[styles.info, styles.error, isRTL && styles.textAlignLeft]}
        >
          {error}
        </Text>
      )}

      {!loading && !events.length && !error && (
        <Text style={[styles.info, isRTL && styles.textAlignLeft]}>
          No events found.
        </Text>
      )}

      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={() =>
          events.length > 0 ? (
            <Text style={styles.footer}>----- END -----</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },

  info: {
    marginTop: 10,
    color: '#777',
  },

  error: {
    color: 'red',
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  cardTitle: { fontWeight: 'bold', flex: 1, marginRight: 8 },
  cardTitleRTL: { textAlign: 'left', marginRight: 0, marginLeft: 8 },

  favIcon: { fontSize: 20, color: '#999' },
  favIconActive: { color: '#f5a623' },

  cardCity: { fontSize: 13, color: '#555' },
  cardCreatedBy: { fontSize: 12, color: '#777', marginTop: 4 },

  footer: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginVertical: 16,
  },

  listContent: {
    paddingVertical: 12,
  },

  textAlignLeft: {
    textAlign: 'left',
  },

  textAlignRight: {
    textAlign: 'right',
  },
});

export default HomeScreen;
