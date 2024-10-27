import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PubDetailsScreen = ({ route }) => {
  // You can pass pub details via route.params
  const { pubName, pubDetails } = route.params || { pubName: 'Pub Name', pubDetails: 'Pub details go here.' };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pubName}</Text>
      <Text>{pubDetails}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PubDetailsScreen;

