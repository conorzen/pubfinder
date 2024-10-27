import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapViewDirections from 'react-native-maps-directions'; // Import MapViewDirections for routing

const GOOGLE_MAPS_APIKEY = 'AIzaSyDXXq48tA76MLuuZT4_w6QqsGzJ3oROp-g';

const PubCrawlRouteModal = ({
  visible,
  onClose,
  route,
  routeDetails
}) => {
  if (!route || !routeDetails) return null;

  const getRegion = () => {
    const lats = routeDetails.pubs.map(pub => pub.latitude);
    const lngs = routeDetails.pubs.map(pub => pub.longitude);
    
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: (maxLat - minLat) * 1.5,
      longitudeDelta: (maxLng - minLng) * 1.5,
    };
  };

  // Extract pub coordinates for origin, destination, and waypoints
  const coordinates = routeDetails.pubs.map(pub => ({
    latitude: pub.latitude,
    longitude: pub.longitude,
  }));

  const origin = coordinates[0]; // First pub as origin
  const destination = coordinates[coordinates.length - 1]; // Last pub as destination
  const waypoints = coordinates.slice(1, -1); // All other pubs as waypoints

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{route.name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={getRegion()}
              scrollEnabled={true}
              zoomEnabled={true}
            >
              {/* Map markers for each pub */}
              {routeDetails.pubs.map((pub, index) => (
                <Marker
                  key={pub.id}
                  coordinate={{
                    latitude: pub.latitude,
                    longitude: pub.longitude,
                  }}
                >
                  <View style={styles.markerContainer}>
                    <Text style={styles.markerNumber}>{index + 1}</Text>
                  </View>
                </Marker>
              ))}

              {/* MapViewDirections to render the route */}
              {origin && destination && (
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  waypoints={waypoints}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor="blue"
                  onError={(error) => console.log('Directions error:', error)}
                />
              )}
            </MapView>
          </View>

          <ScrollView style={styles.details}>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryItem}>
                <MaterialIcons name="timer" size={20} color="#4a90e2" />
                <Text style={styles.summaryText}>
                  Total Time: {Math.round(routeDetails.totalDuration / 60)} hours
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <MaterialIcons name="directions-walk" size={20} color="#4a90e2" />
                <Text style={styles.summaryText}>
                  Walking: {routeDetails.totalDistance} mins
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Route Details</Text>
            {routeDetails.legs.map((leg, index) => (
              <View key={index} style={styles.legContainer}>
                <View style={styles.pubDetails}>
                  <Text style={styles.pubNumber}>{index + 1}</Text>
                  <View style={styles.pubInfo}>
                    <Text style={styles.pubName}>{leg.from.name}</Text>
                    <Text style={styles.stayDuration}>
                      Stay: {leg.stayDuration} mins
                    </Text>
                  </View>
                </View>
                
                {index < routeDetails.legs.length && (
                  <View style={styles.walkingDetails}>
                    <MaterialIcons name="directions-walk" size={20} color="#666" />
                    <Text style={styles.walkingTime}>
                      {leg.walkingTime} mins to next pub
                    </Text>
                  </View>
                )}
              </View>
            ))}
            
            {/* Last pub */}
            <View style={styles.legContainer}>
              <View style={styles.pubDetails}>
                <Text style={styles.pubNumber}>{routeDetails.pubs.length}</Text>
                <View style={styles.pubInfo}>
                  <Text style={styles.pubName}>
                    {routeDetails.pubs[routeDetails.pubs.length - 1].name}
                  </Text>
                  <Text style={styles.stayDuration}>
                    Stay: {routeDetails.pubs[routeDetails.pubs.length - 1].metadata.avgDuration} mins
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
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
  mapContainer: {
    height: 300,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    backgroundColor: '#4a90e2',
    borderRadius: 15,
    padding: 5,
    minWidth: 30,
    alignItems: 'center',
  },
  markerNumber: {
    color: 'white',
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
    padding: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    marginLeft: 5,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  legContainer: {
    marginBottom: 20,
  },
  pubDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pubNumber: {
    backgroundColor: '#4a90e2',
    color: 'white',
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 10,
  },
  pubInfo: {
    flex: 1,
  },
  pubName: {
    fontSize: 16,
    fontWeight: '500',
  },
  stayDuration: {
    color: '#666',
    fontSize: 14,
  },
  walkingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 34,
    marginTop: 10,
  },
  walkingTime: {
    marginLeft: 5,
    color: '#666',
  },
});

export default PubCrawlRouteModal;
