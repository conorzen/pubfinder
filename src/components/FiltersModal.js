// src/components/FiltersModal.js
import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FiltersModal = ({
  visible,
  onClose,
  selectedDrink,
  setSelectedDrink,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  maxDistance,
  setMaxDistance,
  pubs = []
}) => {
  const getAllDrinks = () => {
    if (!pubs || pubs.length === 0) return []; // Add safety check
    
    const drinks = new Set();
    pubs.forEach(pub => {
      if (pub?.drinks) { // Add safety check for pub.drinks
        Object.keys(pub.drinks).forEach(drink => drinks.add(drink));
      }
    });
    return Array.from(drinks).sort();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Drinks Filter */}
          <Text style={styles.filterLabel}>Select Drink</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.drinkSelector}>
            {getAllDrinks().map(drink => (
              <TouchableOpacity
                key={drink}
                style={[
                  styles.drinkButton,
                  selectedDrink === drink && styles.selectedDrinkButton
                ]}
                onPress={() => setSelectedDrink(drink)}
              >
                <Text style={[
                  styles.drinkButtonText,
                  selectedDrink === drink && styles.selectedDrinkText
                ]}>{drink}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Price Filter */}
          <Text style={styles.filterLabel}>Maximum Price</Text>
          <View style={styles.buttonGroup}>
            {[5, 6, 7, 8, 9, 10].map(price => (
              <TouchableOpacity
                key={price}
                style={[
                  styles.filterButton,
                  maxPrice === price && styles.selectedFilterButton
                ]}
                onPress={() => setMaxPrice(price)}
              >
                <Text style={[
                  styles.filterButtonText,
                  maxPrice === price && styles.selectedFilterText
                ]}>£{price}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Rating Filter */}
          <Text style={styles.filterLabel}>Minimum Rating</Text>
          <View style={styles.buttonGroup}>
            {[0, 1, 2, 3, 4, 5].map(rating => (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.filterButton,
                  minRating === rating && styles.selectedFilterButton
                ]}
                onPress={() => setMinRating(rating)}
              >
                <Text style={[
                  styles.filterButtonText,
                  minRating === rating && styles.selectedFilterText
                ]}>{rating} ⭐️</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Distance Filter */}
          <Text style={styles.filterLabel}>Maximum Distance</Text>
          <View style={styles.buttonGroup}>
            {[1, 2, 5, 10].map(distance => (
              <TouchableOpacity
                key={distance}
                style={[
                  styles.filterButton,
                  maxDistance === distance && styles.selectedFilterButton
                ]}
                onPress={() => setMaxDistance(distance)}
              >
                <Text style={[
                  styles.filterButtonText,
                  maxDistance === distance && styles.selectedFilterText
                ]}>{distance}km</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Apply Button */}
          <TouchableOpacity
            style={styles.applyButton}
            onPress={onClose}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeIcon: {
    padding: 5,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  drinkSelector: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  drinkButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedDrinkButton: {
    backgroundColor: '#4a90e2',
  },
  drinkButtonText: {
    color: '#333',
    fontSize: 14,
  },
  selectedDrinkText: {
    color: 'white',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedFilterButton: {
    backgroundColor: '#4a90e2',
  },
  filterButtonText: {
    color: '#333',
    fontSize: 14,
  },
  selectedFilterText: {
    color: 'white',
  },
  applyButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FiltersModal;