// src/screens/MapScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import FilterButton from '../components/FilterButton';
import FiltersModal from '../components/FiltersModal';
import MapMarker from '../components/MapMarker';
import PubDetailsModal from '../components/PubDetailsModal';


const INITIAL_PUBS = [
  {
    id: 1,
    name: "The Crown & Sceptre",
    latitude: 51.5154,
    longitude: -0.1265,
    drinks: {
      "London Pride": { price: 6.50, rating: 4.5, ratings_count: 28 },
      "Camden Hells": { price: 5.80, rating: 4.2, ratings_count: 35 },
      "Guinness": { price: 6.20, rating: 4.7, ratings_count: 42 }
    }
  },
  {
    id: 2,
    name: "The George Inn",
    latitude: 51.5037,
    longitude: -0.1290,
    drinks: {
      "Guinness": { price: 6.20, rating: 4.7, ratings_count: 56 },
      "Fuller's ESB": { price: 5.90, rating: 4.4, ratings_count: 31 },
      "London Pride": { price: 6.30, rating: 4.3, ratings_count: 27 }
    }
  }
];

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 51.5074,
    longitude: -0.1278,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // States
  const [pubs] = useState(INITIAL_PUBS);
  const [showFilters, setShowFilters] = useState(false);
  const [showPubDetails, setShowPubDetails] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState('');
  const [maxPrice, setMaxPrice] = useState(10);
  const [minRating, setMinRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(5);
  const [selectedPub, setSelectedPub] = useState(null);

  const getAllDrinks = () => {
    const drinks = new Set();
    pubs.forEach(pub => {
      Object.keys(pub.drinks).forEach(drink => drinks.add(drink));
    });
    return Array.from(drinks).sort();
  };

  const handlePubPress = (pub) => {
    setSelectedPub(pub);
    setShowPubDetails(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {pubs.map((pub) => (
          <MapMarker
            key={pub.id}
            pub={pub}
            selectedDrink={selectedDrink}
            onPress={() => handlePubPress(pub)}
          />
        ))}
      </MapView>

      <View style={styles.buttonContainer}>
        <FilterButton onPress={() => setShowFilters(true)} />
      </View>

      <FiltersModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        selectedDrink={selectedDrink}
        setSelectedDrink={setSelectedDrink}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minRating={minRating}
        setMinRating={setMinRating}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
        pubs={pubs} // Make sure pubs is being passed
      />

      <PubDetailsModal
        visible={showPubDetails}
        pub={selectedPub}
        onClose={() => {
          setShowPubDetails(false);
          setSelectedPub(null);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    position: 'absolute',
    top: 50,
    right: 16,
    zIndex: 1,
  },
});

export default MapScreen;
