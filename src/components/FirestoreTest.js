// src/components/FirestoreTest.js
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const FirestoreTest = () => {
  const [testResult, setTestResult] = useState('');
  const db = getFirestore();

  const testWrite = async () => {
    try {
      const docRef = await addDoc(collection(db, 'test'), {
        timestamp: new Date(),
        message: 'Test document'
      });
      setTestResult(`Write Test Successful - Doc ID: ${docRef.id}`);
    } catch (error) {
      setTestResult(`Write Test Failed: ${error.message}`);
    }
  };

  const testRead = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'test'));
      const documentCount = querySnapshot.size;
      setTestResult(`Read Test Successful - Found ${documentCount} documents`);
    } catch (error) {
      setTestResult(`Read Test Failed: ${error.message}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Test Write to Firestore" onPress={testWrite} />
      <Button title="Test Read from Firestore" onPress={testRead} />
      <Text style={{ marginTop: 20 }}>{testResult}</Text>
    </View>
  );
};

export default FirestoreTest;