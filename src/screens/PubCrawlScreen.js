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
import RoundPlannerModal from '../components/RoundPlannerModal';
import styles from '../styles/PubCrawlScreen.styles';


const PubCrawlScreen = () => {
  const [showBuildRoute, setShowBuildRoute] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
  const [customRoutes, setCustomRoutes] = useState([]);
  const [showRoundPlanner, setShowRoundPlanner] = useState(false);
  const [roundPlan, setRoundPlan] = useState(null);

  const handleSaveRoundPlan = (planDetails) => {
    setRoundPlan(planDetails);
  };

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

      
      {/* Round Planner Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowBuildRoute(true)}
        >
          <MaterialIcons name="add-circle" size={24} color="white" />
          <Text style={styles.createButtonText}>Create Custom Route</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.createButton, styles.roundPlannerButton]}
          onPress={() => setShowRoundPlanner(true)}
        >
          <MaterialIcons name="people" size={24} color="white" />
          <Text style={styles.createButtonText}>Plan Rounds</Text>
        </TouchableOpacity>
      </View>
      

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
       {/* Round Summary (if plan exists) */}
       {roundPlan && (
        <View style={styles.roundSummary}>
          <Text style={styles.sectionTitle}>Round Plan</Text>
          <View style={styles.roundCard}>
            <View style={styles.roundDetail}>
              <MaterialIcons name="people" size={20} color="#4a90e2" />
              <Text style={styles.roundDetailText}>
                {roundPlan.groupSize} people
              </Text>
            </View>
            <View style={styles.roundDetail}>
              <MaterialIcons name="attach-money" size={20} color="#4a90e2" />
              <Text style={styles.roundDetailText}>
                £{roundPlan.budget} per round
              </Text>
            </View>
            {roundPlan.skipRounds.length > 0 && (
              <View style={styles.roundDetail}>
                <MaterialIcons name="person-off" size={20} color="#4a90e2" />
                <Text style={styles.roundDetailText}>
                  {roundPlan.skipRounds.length} people skipping
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
 {/* Round Summary (if plan exists) */}
 {roundPlan && (
        <View style={styles.roundSummary}>
          <Text style={styles.sectionTitle}>Round Plan</Text>
          <View style={styles.roundCard}>
            <View style={styles.roundDetail}>
              <MaterialIcons name="people" size={20} color="#4a90e2" />
              <Text style={styles.roundDetailText}>
                {roundPlan.groupSize} people
              </Text>
            </View>
            <View style={styles.roundDetail}>
              <MaterialIcons name="attach-money" size={20} color="#4a90e2" />
              <Text style={styles.roundDetailText}>
                £{roundPlan.budget} per round
              </Text>
            </View>
            {roundPlan.skipRounds.length > 0 && (
              <View style={styles.roundDetail}>
                <MaterialIcons name="person-off" size={20} color="#4a90e2" />
                <Text style={styles.roundDetailText}>
                  {roundPlan.skipRounds.length} people skipping
                </Text>
              </View>
            )}
          </View>
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

      <RoundPlannerModal
        visible={showRoundPlanner}
        onClose={() => setShowRoundPlanner(false)}
        onSave={handleSaveRoundPlan}
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


export default PubCrawlScreen;