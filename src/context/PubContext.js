// src/context/PubContext.js
import React, { createContext, useState, useContext } from 'react';
import { LONDON_PUBS } from '../data/londonPubs';  // From context folder to data folder

const PubContext = createContext();

export const PubProvider = ({ children }) => {
  const [pubs, setPubs] = useState(LONDON_PUBS);

  const addPub = (newPub) => {
    setPubs(currentPubs => [...currentPubs, { ...newPub, id: Date.now() }]);
  };

  const updatePub = (pubId, updatedPub) => {
    setPubs(currentPubs => 
      currentPubs.map(pub => 
        pub.id === pubId ? { ...pub, ...updatedPub } : pub
      )
    );
  };

  const updateDrink = (pubId, drinkName, newPrice, newRating) => {
    setPubs(currentPubs =>
      currentPubs.map(pub => {
        if (pub.id === pubId && pub.drinks[drinkName]) {
          return {
            ...pub,
            drinks: {
              ...pub.drinks,
              [drinkName]: {
                ...pub.drinks[drinkName],
                price: newPrice || pub.drinks[drinkName].price,
                rating: newRating || pub.drinks[drinkName].rating,
                ratings_count: pub.drinks[drinkName].ratings_count + (newRating ? 1 : 0)
              }
            }
          };
        }
        return pub;
      })
    );
  };

  return (
    <PubContext.Provider value={{ 
      pubs, 
      addPub, 
      updatePub, 
      updateDrink 
    }}>
      {children}
    </PubContext.Provider>
  );
};

export const usePubs = () => {
  const context = useContext(PubContext);
  if (!context) {
    throw new Error('usePubs must be used within a PubProvider');
  }
  return context;
};