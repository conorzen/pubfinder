import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LONDON_PUBS } from '../data/londonPubs';

// External PubSelector Component
const PubSelector = ({ 
    visible, 
    onClose, 
    selectedPubs, 
    onUpdateSelectedPubs,
    onConfirm 
  }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [tempSelectedPubs, setTempSelectedPubs] = useState(selectedPubs);
  
    const filteredPubs = LONDON_PUBS.filter(pub => 
      pub.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const handlePubToggle = (pub) => {
      if (tempSelectedPubs.find(p => p.id === pub.id)) {
        setTempSelectedPubs(tempSelectedPubs.filter(p => p.id !== pub.id));
      } else if (tempSelectedPubs.length < 12) {
        setTempSelectedPubs([...tempSelectedPubs, pub]);
      } else {
        alert('Maximum 12 pubs allowed');
      }
    };
  
    const handleConfirm = () => {
      onUpdateSelectedPubs(tempSelectedPubs);
      onConfirm();
    };
  
    const handleCancel = () => {
      setTempSelectedPubs(selectedPubs);
      onClose();
    };
  
    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.selectorModal}>
          <View style={styles.selectorContent}>
            <View style={styles.selectorHeader}>
              <Text style={styles.selectorTitle}>Select Pubs</Text>
              <TouchableOpacity onPress={handleCancel}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
  
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={24} color="#666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search pubs..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#666"
              />
              {searchQuery ? (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <MaterialIcons name="clear" size={24} color="#666" />
                </TouchableOpacity>
              ) : null}
            </View>
  
            <Text style={styles.selectionCount}>
              Selected: {tempSelectedPubs.length}/10 pubs
            </Text>
  
            <ScrollView style={styles.pubList}>
              {filteredPubs.map(pub => (
                <TouchableOpacity
                  key={pub.id}
                  style={[
                    styles.pubItem,
                    tempSelectedPubs.find(p => p.id === pub.id) && styles.selectedPubItem
                  ]}
                  onPress={() => handlePubToggle(pub)}
                >
                  <View style={styles.checkboxContainer}>
                    <MaterialIcons
                      name={tempSelectedPubs.find(p => p.id === pub.id) 
                        ? "check-box" 
                        : "check-box-outline-blank"}
                      size={24}
                      color={tempSelectedPubs.find(p => p.id === pub.id) 
                        ? "#4a90e2" 
                        : "#666"}
                    />
                  </View>
                  <View style={styles.pubInfo}>
                    <Text style={styles.pubName}>{pub.name}</Text>
                    <Text style={styles.pubDrinks}>
                      {Object.keys(pub.drinks).length} drinks available
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
  
            <View style={styles.selectorFooter}>
              <TouchableOpacity 
                style={[styles.footerButton, styles.cancelButton]} 
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.footerButton, 
                  styles.confirmButton,
                  tempSelectedPubs.length === 0 && styles.disabledButton
                ]} 
                onPress={handleConfirm}
                disabled={tempSelectedPubs.length === 0}
              >
                <Text style={styles.confirmButtonText}>
                  Add {tempSelectedPubs.length} {tempSelectedPubs.length === 1 ? 'Pub' : 'Pubs'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  

const CustomRouteModal = ({
  visible,
  onClose,
  onCreateRoute,
}) => {
  const [selectedPubs, setSelectedPubs] = useState([]);
  const [showPubSelector, setShowPubSelector] = useState(false);
  const [routeName, setRouteName] = useState('');

  const resetModal = () => {
    setSelectedPubs([]);
    setRouteName('');
    setShowPubSelector(false);
  };

  const handleRemovePub = (pubId) => {
    setSelectedPubs(selectedPubs.filter(pub => pub.id !== pubId));
  };

  const handleReorderPub = (fromIndex, toIndex) => {
    const updatedPubs = [...selectedPubs];
    const [movedPub] = updatedPubs.splice(fromIndex, 1);
    updatedPubs.splice(toIndex, 0, movedPub);
    setSelectedPubs(updatedPubs);
  };

  const handleCreateRoute = () => {
    if (selectedPubs.length < 2) {
      alert('Please select at least 2 pubs for your route');
      return;
    }

    const customRoute = {
      id: 'custom-' + Date.now(),
      name: routeName || 'Custom Route',
      description: `Custom route with ${selectedPubs.length} pubs`,
      pubSequence: selectedPubs.map(pub => pub.id),
      duration: `${Math.ceil(selectedPubs.length * 0.5)} hours`,
      isCustom: true
    };

    onCreateRoute(customRoute);
    resetModal();
    onClose();
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
            <Text style={styles.title}>Build Custom Route</Text>
            <TouchableOpacity 
              onPress={() => {
                resetModal();
                onClose();
              }} 
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.routeNameInput}
            placeholder="Enter route name"
            value={routeName}
            onChangeText={setRouteName}
            placeholderTextColor="#666"
          />

          <TouchableOpacity 
            style={styles.addPubButton}
            onPress={() => setShowPubSelector(true)}
          >
            <MaterialIcons name="add" size={24} color="white" />
            <Text style={styles.addPubButtonText}>Add Pubs to Route</Text>
          </TouchableOpacity>

          <Text style={styles.selectedPubsTitle}>
            Selected Pubs ({selectedPubs.length}/10)
          </Text>
          
          <ScrollView style={styles.selectedPubsList}>
            {selectedPubs.map((pub, index) => (
              <View key={pub.id} style={styles.selectedPubItem}>
                <Text style={styles.pubNumber}>{index + 1}</Text>
                <Text style={styles.selectedPubName}>{pub.name}</Text>
                <View style={styles.pubActions}>
                  {index > 0 && (
                    <TouchableOpacity 
                      onPress={() => handleReorderPub(index, index - 1)}
                      style={styles.actionButton}
                    >
                      <MaterialIcons name="arrow-upward" size={20} color="#4a90e2" />
                    </TouchableOpacity>
                  )}
                  {index < selectedPubs.length - 1 && (
                    <TouchableOpacity 
                      onPress={() => handleReorderPub(index, index + 1)}
                      style={styles.actionButton}
                    >
                      <MaterialIcons name="arrow-downward" size={20} color="#4a90e2" />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity 
                    onPress={() => handleRemovePub(pub.id)}
                    style={styles.actionButton}
                  >
                    <MaterialIcons name="remove-circle" size={20} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          {selectedPubs.length > 0 && (
            <TouchableOpacity 
              style={styles.createButton}
              onPress={handleCreateRoute}
            >
              <MaterialIcons name="route" size={24} color="white" />
              <Text style={styles.createButtonText}>Create Route</Text>
            </TouchableOpacity>
          )}

          {/* Use the external PubSelector */}
          <PubSelector
            visible={showPubSelector}
            onClose={() => setShowPubSelector(false)}
            selectedPubs={selectedPubs}
            onUpdateSelectedPubs={setSelectedPubs}
            onConfirm={() => setShowPubSelector(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  routeNameInput: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  addPubButton: {
    backgroundColor: '#4a90e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  addPubButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  selectedPubsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  selectedPubsList: {
    flex: 1,
  },
  selectedPubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  pubNumber: {
    backgroundColor: '#4a90e2',
    color: 'white',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 10,
  },
  selectedPubName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  pubActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    padding: 5,
  },
  createButton: {
    backgroundColor: '#4a90e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  selectorModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  selectorContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  selectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pubList: {
    maxHeight: 400,
  },
  pubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pubInfo: {
    marginLeft: 10,
    flex: 1,
  },
  pubName: {
    fontSize: 16,
    color: '#333',
  },
  pubDrinks: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  selectionCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  selectorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 10,
  },
  footerButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
  },
  confirmButton: {
    backgroundColor: '#4a90e2',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomRouteModal;
