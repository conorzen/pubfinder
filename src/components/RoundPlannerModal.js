import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RoundPlannerModal = ({ visible, onClose, onSave }) => {
  const [groupSize, setGroupSize] = useState('');
  const [budget, setBudget] = useState('');
  const [equalRounds, setEqualRounds] = useState(true);
  const [skipRounds, setSkipRounds] = useState([]);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    const planDetails = {
      groupSize: parseInt(groupSize) || 0,
      budget: parseFloat(budget) || 0,
      equalRounds,
      skipRounds,
      notes,
    };
    onSave(planDetails);
    onClose();
  };

  const toggleSkipRound = (personIndex) => {
    if (skipRounds.includes(personIndex)) {
      setSkipRounds(skipRounds.filter(index => index !== personIndex));
    } else {
      setSkipRounds([...skipRounds, personIndex]);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Round Planner</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent}>
            {/* Group Size Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Number of People</Text>
              <TextInput
                style={styles.input}
                value={groupSize}
                onChangeText={setGroupSize}
                keyboardType="number-pad"
                placeholder="Enter number of people"
              />
            </View>

            {/* Budget Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Budget per Round (£)</Text>
              <TextInput
                style={styles.input}
                value={budget}
                onChangeText={setBudget}
                keyboardType="decimal-pad"
                placeholder="Enter budget per round"
              />
            </View>

            {/* Equal Rounds Toggle */}
            <View style={styles.toggleContainer}>
              <Text style={styles.label}>Equal Rounds</Text>
              <Switch
                value={equalRounds}
                onValueChange={setEqualRounds}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={equalRounds ? '#4a90e2' : '#f4f3f4'}
              />
            </View>

            {/* Skip Rounds Section */}
            {groupSize && parseInt(groupSize) > 0 && (
              <View style={styles.skipRoundsContainer}>
                <Text style={styles.label}>Skip Rounds For:</Text>
                {Array.from({ length: parseInt(groupSize) }).map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.personToggle}
                    onPress={() => toggleSkipRound(index)}
                  >
                    <MaterialIcons
                      name={skipRounds.includes(index) ? 'check-box' : 'check-box-outline-blank'}
                      size={24}
                      color="#4a90e2"
                    />
                    <Text style={styles.personText}>Person {index + 1}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Notes Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.notesInput]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Add any notes about rounds or preferences"
                multiline
                numberOfLines={4}
              />
            </View>

            {/* Summary Section */}
            {groupSize && budget && (
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Summary</Text>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Total People:</Text>
                  <Text style={styles.summaryValue}>{groupSize}</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Cost per Round:</Text>
                  <Text style={styles.summaryValue}>£{budget}</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>People Buying Rounds:</Text>
                  <Text style={styles.summaryValue}>{parseInt(groupSize) - skipRounds.length}</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Average Cost per Person:</Text>
                  <Text style={styles.summaryValue}>
                    £{((parseFloat(budget) * (parseInt(groupSize) - skipRounds.length)) / parseInt(groupSize)).toFixed(2)}
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Round Plan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  skipRoundsContainer: {
    marginBottom: 20,
  },
  personToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  personText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  summaryContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4a90e2',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RoundPlannerModal;