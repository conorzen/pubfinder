// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';  // Import the tab navigator
import { PubProvider } from './src/context/PubContext';

function App() {
  return (
    <PubProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </PubProvider>
  );
}

export default App;
