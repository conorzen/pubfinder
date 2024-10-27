// src/screens/PubCrawlScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PubCrawlScreen = ({ pubs = [] }) => {
  const [numPeople, setNumPeople] = useState(4);
  const [numPubs, setNumPubs] = useState(4);
  const [duration, setDuration] = useState(3); // in hours
  const [selectedStartPub, setSelectedStartPub] = useState(null);
  const [showPubSelector, setShowPubSelector] = useState(false);

  const NumberSelector = ({ label, value, setValue, min, max, step = 1 }) => (
    <View style={styles.selectorContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.numberSelector}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => value > min && setValue(value - step)}
        >
          <MaterialIcons name="remove" size={24} color="#4a90e2" />
        </TouchableOpacity>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
          {label === 'Duration' && <Text style={styles.unit}>hours</Text>}
        </View>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => value < max && setValue(value + step)}
        >
          <MaterialIcons name="add" size={24} color="#4a90e2" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const PubSelector = () => (
    <Modal
      visible={showPubSelector}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Starting Pub</Text>
            <TouchableOpacity 
              onPress={() => setShowPubSelector(false)}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.pubList}>
            {pubs.map((pub) => (
              <TouchableOpacity
                key={pub.id}
                style={[
                  styles.pubItem,
                  selectedStartPub?.id === pub.id && styles.selectedPub
                ]}
                onPress={() => {
                  setSelectedStartPub(pub);
                  setShowPubSelector(false);
                }}
              >
                <MaterialIcons 
                  name="local-bar" 
                  size={24} 
                  color={selectedStartPub?.id === pub.id ? "white" : "#4a90e2"} 
                />
                <Text style={[
                  styles.pubName,
                  selectedStartPub?.id === pub.id && styles.selectedPubText
                ]}>{pub.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const Summary = () => (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Crawl Summary</Text>
      <View style={styles.summaryItem}>
        <MaterialIcons name="group" size={20} color="#4a90e2" />
        <Text style={styles.summaryText}>{numPeople} people</Text>
      </View>
      <View style={styles.summaryItem}>
        <MaterialIcons name="location-on" size={20} color="#4a90e2" />
        <Text style={styles.summaryText}>{numPubs} pubs</Text>
      </View>
      <View style={styles.summaryItem}>
        <MaterialIcons name="access-time" size={20} color="#4a90e2" />
        <Text style={styles.summaryText}>{duration} hours</Text>
      </View>
      <View style={styles.summaryItem}>
        <MaterialIcons name="flag" size={20} color="#4a90e2" />
        <Text style={styles.summaryText}>
          Starting at: {selectedStartPub?.name || 'Not selected'}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Plan Your Pub Crawl</Text>
      
      <View style={styles.card}>
        <NumberSelector 
          label="Number of People"
          value={numPeople}
          setValue={setNumPeople}
          min={2}
          max={20}
        />

        <NumberSelector 
          label="Number of Pubs"
          value={numPubs}
          setValue={setNumPubs}
          min={2}
          max={10}
        />

        <NumberSelector 
          label="Duration"
          value={duration}
          setValue={setDuration}
          min={1}
          max={12}
          step={0.5}
        />

        <View style={styles.selectorContainer}>
          <Text style={styles.label}>Starting Pub</Text>
          <TouchableOpacity 
            style={styles.pubSelector}
            onPress={() => setShowPubSelector(true)}
          >
            <MaterialIcons name="local-bar" size={24} color="#4a90e2" />
            <Text style={styles.pubSelectorText}>
              {selectedStartPub?.name || 'Select starting pub'}
            </Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#4a90e2" />
          </TouchableOpacity>
        </View>

        <Summary />

        <TouchableOpacity 
          style={styles.generateButton}
          onPress={() => {
            // Handle generate route logic
            console.log('Generating route...');
          }}
        >
          <MaterialIcons name="route" size={24} color="white" />
          <Text style={styles.generateButtonText}>Generate Route</Text>
        </TouchableOpacity>
      </View>

      <PubSelector />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectorContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  numberSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 10,
  },
  iconButton: {
    padding: 10,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 20,
  },
  unit: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  pubSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  pubSelectorText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  pubList: {
    maxHeight: 300,
  },
  pubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
  },
  selectedPub: {
    backgroundColor: '#4a90e2',
  },
  pubName: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  selectedPubText: {
    color: 'white',
  },
  summaryContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  generateButton: {
    backgroundColor: '#4a90e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default PubCrawlScreen;