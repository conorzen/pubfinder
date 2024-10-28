// App.js
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { PubProvider } from './src/context/PubContext';
import { db } from './src/firebase/firebase';

function App() {
  useEffect(() => {
    // Test Firestore connection
    const testFirestore = async () => {
      try {
        console.log('Firestore initialized successfully');
      } catch (error) {
        console.error('Error initializing Firestore:', error);
      }
    };

    testFirestore();
  }, []);

  return (
    <PubProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </PubProvider>
  );
}

export default App;