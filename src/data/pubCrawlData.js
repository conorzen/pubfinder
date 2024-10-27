// src/data/pubCrawlData.js

// Import the base pub data
import { LONDON_PUBS } from './londonPubs';

// Walking distances between pubs (in minutes)
export const PUB_DISTANCES = {
  // Using pub IDs from your LONDON_PUBS data
  "1-2": 15,
  "2-3": 12,
  "3-4": 8,
  "4-5": 10,
  "5-6": 14,
  "6-7": 11,
  "7-8": 9,
  "8-9": 13,
  "9-10": 7,
  // Add reverse directions
  "2-1": 15,
  "3-2": 12,
  "4-3": 8,
  "5-4": 10,
  "6-5": 14,
  "7-6": 11,
  "8-7": 9,
  "9-8": 13,
  "10-9": 7
};

// Additional metadata for each pub
export const PUB_METADATA = {
  1: {
    avgDuration: 45, // minutes
    bestTimes: ["18:00-21:00"],
    quietTimes: ["14:00-17:00"],
    busyDays: ["Friday", "Saturday"],
    quietDays: ["Monday", "Tuesday"],
    features: ["Beer Garden", "Live Music"],
    recommendations: ["London Pride", "Camden Hells"]
  },
  2: {
    avgDuration: 40,
    bestTimes: ["17:00-20:00"],
    quietTimes: ["15:00-17:00"],
    busyDays: ["Thursday", "Friday", "Saturday"],
    quietDays: ["Sunday", "Monday"],
    features: ["Historic Building", "Real Ales"],
    recommendations: ["Fuller's ESB", "Guinness"]
  },
  // Add metadata for all pubs...
};

// Predefined popular pub crawl routes
export const CRAWL_ROUTES = [
  {
    id: "central-historic",
    name: "Central London Historic Pubs",
    description: "A journey through London's most historic pubs",
    pubSequence: [1, 2, 3, 4],
    duration: "3-4 hours",
    totalDistance: 35, // minutes walking
    difficulty: "Easy",
    highlights: [
      "Historic venues",
      "Traditional ales",
      "Classic pub food"
    ],
    bestDays: ["Thursday", "Friday", "Saturday"],
    avoidDays: ["Sunday"],
    startTimes: ["16:00", "17:00", "18:00"]
  },
  {
    id: "craft-beer-tour",
    name: "Modern Craft Beer Tour",
    description: "Experience London's best craft beer pubs",
    pubSequence: [7, 8, 9, 10],
    duration: "2-3 hours",
    totalDistance: 29,
    difficulty: "Moderate",
    highlights: [
      "Craft beers",
      "Modern venues",
      "Beer tasting flights"
    ],
    bestDays: ["Wednesday", "Thursday", "Friday"],
    avoidDays: ["Monday"],
    startTimes: ["17:00", "18:00"]
  }
];

// Helper functions

export const getWalkingTime = (fromPubId, toPubId) => {
  const key = `${fromPubId}-${toPubId}`;
  return PUB_DISTANCES[key] || null;
};

export const getPubMetadata = (pubId) => {
  return PUB_METADATA[pubId] || null;
};

export const calculateRouteDetails = (pubIds) => {
    if (!pubIds || pubIds.length === 0) {
      return null;
    }
  
    let totalDuration = 0;
    let totalDistance = 0;
    const legs = [];
  
    for (let i = 0; i < pubIds.length - 1; i++) {
      const currentPubId = pubIds[i];
      const nextPubId = pubIds[i + 1];
      const walkingTime = getWalkingTime(currentPubId, nextPubId) || 15; // Default 15 mins if not found
      const currentPub = LONDON_PUBS.find(p => p.id === currentPubId);
      const nextPub = LONDON_PUBS.find(p => p.id === nextPubId);
      const metadata = getPubMetadata(currentPubId) || {
        avgDuration: 45, // Default duration if metadata not found
        bestTimes: [],
        quietTimes: [],
        busyDays: [],
        quietDays: [],
        features: [],
        recommendations: []
      };
  
      if (!currentPub || !nextPub) {
        console.warn(`Pub not found: ${!currentPub ? currentPubId : nextPubId}`);
        continue;
      }
  
      totalDistance += walkingTime;
      totalDuration += walkingTime + metadata.avgDuration;
  
      legs.push({
        from: {
          ...currentPub,
          metadata
        },
        to: nextPub,
        walkingTime,
        stayDuration: metadata.avgDuration
      });
    }
  
    // Handle last pub
    const lastPubId = pubIds[pubIds.length - 1];
    const lastPub = LONDON_PUBS.find(p => p.id === lastPubId);
    const lastPubMetadata = getPubMetadata(lastPubId) || {
      avgDuration: 45 // Default duration if metadata not found
    };
  
    if (lastPub) {
      totalDuration += lastPubMetadata.avgDuration;
    }
  
    return {
      legs,
      totalDuration,
      totalDistance,
      pubs: pubIds.map(id => {
        const pub = LONDON_PUBS.find(p => p.id === id);
        const metadata = getPubMetadata(id) || {
          avgDuration: 45,
          bestTimes: [],
          quietTimes: [],
          busyDays: [],
          quietDays: [],
          features: [],
          recommendations: []
        };
        return pub ? { ...pub, metadata } : null;
      }).filter(Boolean) // Remove any null values
    };
  };