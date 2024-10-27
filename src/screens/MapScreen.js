import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import FilterButton from '../components/FilterButton';
import FiltersModal from '../components/FiltersModal';
import MapMarker from '../components/MapMarker';
import PubDetailsModal from '../components/PubDetailsModal';
import { LONDON_PUBS } from '../data/londonPubs';

const MapScreen = () => {
  // Initial region centered on London
  const [region, setRegion] = useState({
    latitude: 51.5074,
    longitude: -0.1278,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // States
  const [pubs, setPubs] = useState(LONDON_PUBS);
  const [filteredPubs, setFilteredPubs] = useState(LONDON_PUBS);
  const [showFilters, setShowFilters] = useState(false);
  const [showPubDetails, setShowPubDetails] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState('');
  const [maxPrice, setMaxPrice] = useState(10);
  const [minRating, setMinRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(5);
  const [selectedPub, setSelectedPub] = useState(null);

  // Filter pubs based on selected criteria
  useEffect(() => {
    let filtered = LONDON_PUBS;

    if (selectedDrink) {
      filtered = filtered.filter(pub => {
        const drink = pub.drinks[selectedDrink];
        return drink && 
               drink.price <= maxPrice && 
               drink.rating >= minRating;
      });
    }

    // If no specific drink is selected, filter based on any drink meeting criteria
    if (!selectedDrink) {
      filtered = filtered.filter(pub => {
        return Object.values(pub.drinks).some(drink => 
          drink.price <= maxPrice && drink.rating >= minRating
        );
      });
    }

    setFilteredPubs(filtered);
  }, [selectedDrink, maxPrice, minRating, maxDistance]);

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

  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={handleRegionChange}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {filteredPubs.map((pub) => (
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
        pubs={pubs}
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