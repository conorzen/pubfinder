// src/screens/UpdateScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PubSelector from '../components/PubSelector';

const UpdateScreen = ({ pubs, onUpdatePub, onAddPub }) => {
  const [isNewPub, setIsNewPub] = useState(false);
  const [showPubSelector, setShowPubSelector] = useState(false);
  const [selectedPub, setSelectedPub] = useState(null);
  const [pubName, setPubName] = useState('');
  const [pubAddress, setPubAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [drinks, setDrinks] = useState([]);
  const [showAddDrink, setShowAddDrink] = useState(false);
  const [newDrinkName, setNewDrinkName] = useState('');
  const [newDrinkPrice, setNewDrinkPrice] = useState('');
  const [rating, setRating] = useState(0);

  const resetForm = () => {
    setPubName('');
    setPubAddress('');
    setLatitude('');
    setLongitude('');
    setDrinks([]);
    setSelectedPub(null);
    setNewDrinkName('');
    setNewDrinkPrice('');
    setRating(0);
  };

  const handleAddDrink = () => {
    if (!newDrinkName || !newDrinkPrice) {
      Alert.alert('Error', 'Please enter both drink name and price');
      return;
    }

    const newDrink = {
      name: newDrinkName,
      price: parseFloat(newDrinkPrice),
      rating: 0,
      ratings_count: 0,
    };

    setDrinks([...drinks, newDrink]);
    setNewDrinkName('');
    setNewDrinkPrice('');
    setShowAddDrink(false);
  };

  const handleSubmit = () => {
    if (isNewPub) {
      if (!pubName || !pubAddress || !latitude || !longitude || drinks.length === 0) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      const newPub = {
        id: Date.now(), // temporary ID generation
        name: pubName,
        address: pubAddress,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        drinks: drinks.reduce((acc, drink) => {
          acc[drink.name] = drink;
          return acc;
        }, {}),
      };

      onAddPub(newPub);
    } else {
      if (!selectedPub) {
        Alert.alert('Error', 'Please select a pub to update');
        return;
      }

      onUpdatePub(selectedPub.id, {
        ...selectedPub,
        drinks: drinks.reduce((acc, drink) => {
          acc[drink.name] = drink;
          return acc;
        }, {}),
      });
    }

    resetForm();
    Alert.alert('Success', `Pub successfully ${isNewPub ? 'added' : 'updated'}`);
  };

  const RatingStars = ({ value, onRate }) => (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onRate(star)}
        >
          <MaterialIcons
            name={star <= value ? 'star' : 'star-border'}
            size={32}
            color={star <= value ? '#FFD700' : '#666'}
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Update Pub Information</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Add New Pub</Text>
          <Switch
            value={isNewPub}
            onValueChange={setIsNewPub}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isNewPub ? '#4a90e2' : '#f4f3f4'}
          />
        </View>
      </View>

      {isNewPub ? (
        // New Pub Form
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Pub Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pub Name*</Text>
            <TextInput
              style={styles.input}
              value={pubName}
              onChangeText={setPubName}
              placeholder="Enter pub name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address*</Text>
            <TextInput
              style={styles.input}
              value={pubAddress}
              onChangeText={setPubAddress}
              placeholder="Enter pub address"
              multiline
            />
          </View>

          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Latitude*</Text>
              <TextInput
                style={styles.input}
                value={latitude}
                onChangeText={setLatitude}
                placeholder="Latitude"
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>Longitude*</Text>
              <TextInput
                style={styles.input}
                value={longitude}
                onChangeText={setLongitude}
                placeholder="Longitude"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      ) : (
        // Select Existing Pub
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Select Pub</Text>
          <TouchableOpacity 
            style={styles.pubSelector}
            onPress={() => setShowPubSelector(true)}
          >
            <MaterialIcons name="store" size={24} color="#4a90e2" />
            <Text style={styles.pubSelectorText}>
              {selectedPub?.name || 'Select a pub to update'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Drinks Section */}
      <View style={styles.formSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Drinks</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddDrink(true)}
          >
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {drinks.map((drink, index) => (
          <View key={index} style={styles.drinkItem}>
            <View style={styles.drinkHeader}>
              <Text style={styles.drinkName}>{drink.name}</Text>
              <Text style={styles.drinkPrice}>£{drink.price.toFixed(2)}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <RatingStars
                value={drink.rating}
                onRate={(newRating) => {
                  const updatedDrinks = [...drinks];
                  updatedDrinks[index] = {
                    ...drink,
                    rating: newRating,
                    ratings_count: drink.ratings_count + 1,
                  };
                  setDrinks(updatedDrinks);
                }}
              />
              <Text style={styles.ratingsCount}>
                ({drink.ratings_count} ratings)
              </Text>
            </View>
          </View>
        ))}

        {/* Add Drink Modal */}
        {showAddDrink && (
          <View style={styles.addDrinkForm}>
            <TextInput
              style={styles.input}
              value={newDrinkName}
              onChangeText={setNewDrinkName}
              placeholder="Drink name"
            />
            <TextInput
              style={styles.input}
              value={newDrinkPrice}
              onChangeText={setNewDrinkPrice}
              placeholder="Price"
              keyboardType="numeric"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowAddDrink(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.addButton]}
                onPress={handleAddDrink}
              >
                <Text style={styles.buttonText}>Add Drink</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>
          {isNewPub ? 'Add Pub' : 'Update Pub'}
        </Text>
      </TouchableOpacity>

      <PubSelector
        visible={showPubSelector}
        onClose={() => setShowPubSelector(false)}
        pubs={pubs}
        selectedPub={selectedPub}
        onSelectPub={(pub) => {
          setSelectedPub(pub);
          setDrinks(Object.entries(pub.drinks).map(([name, info]) => ({
            name,
            ...info
          })));
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    marginRight: 10,
    fontSize: 16,
    color: '#666',
  },
  formSection: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pubSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  pubSelectorText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  drinkItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  drinkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  drinkName: {
    fontSize: 16,
    fontWeight: '600',
  },
  drinkPrice: {
    fontSize: 16,
    color: '#4a90e2',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 5,
  },
  ratingsCount: {
    marginLeft: 10,
    color: '#666',
  },
  addDrinkForm: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  addButton: {
    backgroundColor: '#4a90e2',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default UpdateScreen;
