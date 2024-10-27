// src/navigation/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MapScreen from '../screens/MapScreen';
import UpdateScreen from '../screens/UpdateScreen';
import PubCrawlScreen from '../screens/PubCrawlScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Update') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Pub Crawl') {
            iconName = focused ? 'beer' : 'beer-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Update" component={UpdateScreen} />
      <Tab.Screen name="Pub Crawl" component={PubCrawlScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
