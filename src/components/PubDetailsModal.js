// src/components/PubDetailsModal.js
import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const PubDetailsModal = ({ visible, pub, onClose }) => (
  <Modal
    visible={visible}
    animationType="slide"
    transparent={true}
  >
    {pub && (
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>{pub.name}</Text>
            <Text style={styles.emoji}>🍺</Text>
          </View>
          
          <ScrollView style={styles.drinksList}>
            {Object.entries(pub.drinks).map(([drinkName, info]) => (
              <View key={drinkName} style={styles.drinkItem}>
                <View style={styles.drinkHeader}>
                  <Text style={styles.drinkName}>{drinkName}</Text>
                  <Text style={styles.price}>£{info.price.toFixed(2)}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>
                    {[...Array(Math.floor(info.rating))].map((_, i) => '⭐️').join('')}
                  </Text>
                  <Text style={styles.ratingText}>
                    {info.rating.toFixed(1)} ({info.ratings_count} ratings)
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.directionButton}
              onPress={() => console.log('Get directions')}
            >
              <Text style={styles.directionButtonText}>📍 Get Directions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )}
  </Modal>
);

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
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  emoji: {
    fontSize: 24,
    marginLeft: 10,
  },
  drinksList: {
    maxHeight: 300,
  },
  drinkItem: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 10,
  },
  drinkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  drinkName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2ecc71',
  },
  ratingContainer: {
    marginTop: 5,
  },
  rating: {
    marginBottom: 2,
  },
  ratingText: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  directionButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  directionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PubDetailsModal;