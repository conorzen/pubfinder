// src/components/MapMarker.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';

const MapMarker = ({ pub, selectedDrink, onPress }) => (
  <Marker
    coordinate={{
      latitude: pub.latitude,
      longitude: pub.longitude,
    }}
    title={pub.name}
    onPress={onPress}
  >
    <View style={styles.markerContainer}>
      <Text style={styles.markerEmoji}>🍺</Text>
      <Text style={styles.markerName}>{pub.name}</Text>
      {selectedDrink && pub.drinks[selectedDrink] && (
        <Text style={styles.markerPrice}>
          £{pub.drinks[selectedDrink].price.toFixed(2)}
        </Text>
      )}
    </View>
  </Marker>
);

const styles = StyleSheet.create({
  markerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: '#4a90e2',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerEmoji: {
    fontSize: 16,
  },
  markerName: {
    fontSize: 10,
    marginTop: 2,
    color: '#333',
    fontWeight: '500',
  },
  markerPrice: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginTop: 2,
  },
});

export default MapMarker;