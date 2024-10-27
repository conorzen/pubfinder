// src/components/PubSelector.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PubSelector = ({ 
  visible, 
  onClose, 
  pubs = [], 
  selectedPub, 
  onSelectPub,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPubs = pubs.filter(pub => 
    pub.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPub = (pub) => {
    onSelectPub(pub);
    onClose();
    setSearchQuery('');
  };

  const PubItem = ({ pub }) => (
    <TouchableOpacity
      style={[
        styles.pubItem,
        selectedPub?.id === pub.id && styles.selectedPubItem
      ]}
      onPress={() => handleSelectPub(pub)}
    >
      <View style={styles.pubMainInfo}>
        <MaterialIcons 
          name="store" 
          size={24} 
          color={selectedPub?.id === pub.id ? "#4a90e2" : "#666"} 
        />
        <View style={styles.pubDetails}>
          <Text style={styles.pubName}>{pub.name}</Text>
          <Text style={styles.pubDrinks}>
            {Object.keys(pub.drinks).length} drinks available
          </Text>
        </View>
      </View>
      <MaterialIcons 
        name="chevron-right" 
        size={24} 
        color="#666" 
      />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.closeButton}
            >
              <MaterialIcons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Select Pub</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search pubs..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <MaterialIcons name="clear" size={24} color="#666" />
              </TouchableOpacity>
            )}
          </View>

          {/* Results Count */}
          <Text style={styles.resultsCount}>
            {filteredPubs.length} {filteredPubs.length === 1 ? 'pub' : 'pubs'} found
          </Text>

          {/* Pubs List */}
          <ScrollView 
            style={styles.pubsList}
            showsVerticalScrollIndicator={false}
          >
            {filteredPubs.length > 0 ? (
              filteredPubs.map(pub => (
                <PubItem key={pub.id} pub={pub} />
              ))
            ) : (
              <View style={styles.noResults}>
                <MaterialIcons name="search-off" size={48} color="#666" />
                <Text style={styles.noResultsText}>No pubs found</Text>
                <Text style={styles.noResultsSubtext}>
                  Try adjusting your search
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 32, // Same as close button for alignment
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    margin: 16,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  resultsCount: {
    marginHorizontal: 16,
    marginBottom: 8,
    color: '#666',
    fontSize: 14,
  },
  pubsList: {
    flex: 1,
  },
  pubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedPubItem: {
    backgroundColor: '#f8f9fa',
  },
  pubMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pubDetails: {
    marginLeft: 12,
    flex: 1,
  },
  pubName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  pubDrinks: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  noResultsText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default PubSelector;