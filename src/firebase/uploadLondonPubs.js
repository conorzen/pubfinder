// src/firebase/uploadLondonPubs.js
import { db } from './firebase';
import { writeBatch, doc } from 'firebase/firestore';
import { LONDON_PUBS, COMMON_DRINKS } from '../data/londonPubs';

const uploadData = async () => {
  try {
    // Create two batches - one for pubs and one for metadata
    const pubsBatch = writeBatch(db);
    const metadataBatch = writeBatch(db);
    
    // Upload individual pubs
    LONDON_PUBS.forEach((pub) => {
      const pubRef = doc(db, 'pubs', pub.id.toString());
      pubsBatch.set(pubRef, {
        ...pub,
        createdAt: new Date(),
        location: {
          latitude: pub.latitude,
          longitude: pub.longitude
        }
      });
    });

    // Upload common drinks data and metadata
    const metadataRef = doc(db, 'metadata', 'drinks');
    metadataBatch.set(metadataRef, {
      ...COMMON_DRINKS,
      lastUpdated: new Date()
    });

    // Commit both batches
    await Promise.all([
      pubsBatch.commit(),
      metadataBatch.commit()
    ]);

    console.log('✅ Successfully uploaded:');
    console.log(`- ${LONDON_PUBS.length} pubs`);
    console.log(`- ${COMMON_DRINKS.beers.length} common drinks metadata`);
  } catch (error) {
    console.error('❌ Error uploading data:', error);
  }
};

// Run the upload
uploadData().then(() => {
  console.log('Upload script completed');
}).catch(error => {
  console.error('Script failed:', error);
});