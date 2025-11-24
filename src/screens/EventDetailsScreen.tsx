import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import type { CityPulseEvent } from '../services/api';
import { useFavourites } from '../hooks/useFavourites';
import { useLanguage } from '../hooks/useLanguage';

const STATIC_LOCATION = {
  latitude: 25.2048,
  longitude: 55.2708,
};

const EventDetailsScreen = ({ route }: any) => {
  const event: CityPulseEvent = route.params.event;
  const { isFavourite, toggleFavourite } = useFavourites();
  const fav = isFavourite(event.id);

  const { isRTL } = useLanguage();

  const details = [
    { label: 'Event', value: event.Event },
    { label: 'City', value: event.City },
    { label: 'Created By', value: event.CreatedBy },
    {
      label: 'Created At',
      value: new Date(event.createdAt).toLocaleString(),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {details.map(item => (
          <View key={item.label}>
            <Text style={[styles.label, isRTL && styles.textRTL]}>
              {item.label}
            </Text>
            <Text style={[styles.value, isRTL && styles.textRTL]}>
              {item.value}
            </Text>
          </View>
        ))}

        <Text
          style={styles.favToggle}
          onPress={() => toggleFavourite(event.id)}
        >
          {fav ? '★ Remove from favourites' : '☆ Add to favourites'}
        </Text>
      </View>

      <Text style={[styles.mapLabel, isRTL && { textAlign: 'left' }]}>
        Map Preview
      </Text>

      {Platform.OS === 'android' ? (
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>
            Map preview not available on Android
          </Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: STATIC_LOCATION.latitude,
            longitude: STATIC_LOCATION.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
        >
          <Marker
            coordinate={STATIC_LOCATION}
            title="Event Location"
            description="Static preview location"
          />
        </MapView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#F5F5F5',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 16,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  star: {
    fontSize: 24,
    color: '#999',
    marginLeft: 8,
  },

  starActive: {
    color: '#f5a623',
  },

  label: {
    fontWeight: '600',
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },

  textRTL: {
    textAlign: 'left',
  },

  value: {
    marginTop: 4,
    color: '#555',
    fontSize: 14,
  },

  favToggle: {
    marginTop: 30,
    color: '#f5a623',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },

  mapLabel: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },

  map: {
    height: 220,
    borderRadius: 12,
    marginTop: 8,
  },
  mapPlaceholder: {
    height: 220,
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mapPlaceholderText: {
    color: '#555',
    fontSize: 14,
  },
});

export default EventDetailsScreen;
