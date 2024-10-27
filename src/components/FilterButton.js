// src/components/FilterButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FilterButton = ({ onPress }) => (
  <TouchableOpacity style={styles.filterButton} onPress={onPress}>
    <Icon name="filter-list" size={24} color="white" />
    <Text style={styles.filterButtonText}>Filters</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  filterButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: '#4a90e2',
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  filterButtonText: {
    color: 'white',
    marginLeft: 5,
  },
});

export default FilterButton;