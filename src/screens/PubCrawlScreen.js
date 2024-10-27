// src/screens/PubCrawlScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CRAWL_ROUTES, calculateRouteDetails } from '../data/pubCrawlData';
import PubCrawlRouteModal from '../components/PubCrawlRouteModal';
import CustomRouteModal from '../components/CustomRouteModal';

const PubCrawlScreen = () => {
  const [showBuildRoute, setShowBuildRoute] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
  const [customRoutes, setCustomRoutes] = useState([]);

  const handleCreateCustomRoute = (route) => {
    setCustomRoutes([...customRoutes, route]);
  };

  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
    setRouteDetails(calculateRouteDetails(route.pubSequence));
    setShowRouteModal(true);
  };

  const handleDeleteCustomRoute = (routeId) => {
    setCustomRoutes(customRoutes.filter(route => route.id !== routeId));
  };

  const RouteCard = ({ route, onPress, onDelete }) => (
    <TouchableOpacity
      style={styles.routeCard}
      onPress={() => onPress(route)}
    >
      <View style={styles.routeHeader}>
        <View style={styles.routeInfo}>
          <Text style={styles.routeName}>{route.name}</Text>
          {route.isCustom && (
            <View style={styles.customBadge}>
              <Text style={styles.customBadgeText}>Custom</Text>
            </View>
          )}
        </View>
        <View style={styles.routeActions}>
          {route.isCustom && (
            <TouchableOpacity 
              onPress={() => onDelete(route.id)}
              style={styles.deleteButton}
            >
              <MaterialIcons name="delete" size={24} color="#ff4444" />
            </TouchableOpacity>
          )}
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </View>
      </View>
      
      <Text style={styles.routeDescription}>{route.description}</Text>
      
      <View style={styles.routeFooter}>
        <View style={styles.routeDetail}>
          <MaterialIcons name="schedule" size={16} color="#666" />
          <Text style={styles.detailText}>{route.duration}</Text>
        </View>
        <View style={styles.routeDetail}>
          <MaterialIcons name="place" size={16} color="#666" />
          <Text style={styles.detailText}>
            {route.pubSequence.length} stops
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Plan Your Pub Crawl</Text>

      {/* Create Custom Route Button */}
      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => setShowBuildRoute(true)}
      >
        <MaterialIcons name="add-circle" size={24} color="white" />
        <Text style={styles.createButtonText}>Create Custom Route</Text>
      </TouchableOpacity>

      {/* Custom Routes Section */}
      {customRoutes.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Custom Routes</Text>
          {customRoutes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              onPress={handleSelectRoute}
              onDelete={handleDeleteCustomRoute}
            />
          ))}
        </View>
      )}

      {/* Recommended Routes Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Routes</Text>
        {CRAWL_ROUTES.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            onPress={handleSelectRoute}
          />
        ))}
      </View>

      {/* Modals */}
      <CustomRouteModal
        visible={showBuildRoute}
        onClose={() => setShowBuildRoute(false)}
        onCreateRoute={handleCreateCustomRoute}
      />

      <PubCrawlRouteModal
        visible={showRouteModal}
        onClose={() => setShowRouteModal(false)}
        route={selectedRoute}
        routeDetails={routeDetails}
      />
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
  createButton: {
    backgroundColor: '#4a90e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    marginTop: 0,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  section: {
    marginTop: 20,
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  routeCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  routeInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  customBadge: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  customBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  routeActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginRight: 10,
    padding: 5,
  },
  routeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  routeFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
  },
  routeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
});

export default PubCrawlScreen;