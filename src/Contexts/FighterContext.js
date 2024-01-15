import React, { createContext, useContext, useState } from 'react';

const FighterContext = createContext();

const initialCurrentFighter = {
  name: '',
  imageFighter: '',
  imageRock: '',
  imagePaper: '',
  imageScissors: '',
};

const initialMap = {
  name: '',
  image: '',
};

const initialChoice = {
  choice: '',
  image: '',
};

export function FighterProvider({ children }) {
  // Create state variables to manage current fighter, map, and choice.
  const [currentFighter, setCurrentFighter] = useState(initialCurrentFighter);
  const [map, setMap] = useState(initialMap);
  const [choice, setChoice] = useState(initialChoice);

  // Functions to update current fighter, map, and choice.
  const updateCurrentFighter = (newFighter) => {
    setCurrentFighter({ ...currentFighter, ...newFighter });
  };

  const updateMap = (newMap) => {
    setMap({ ...map, ...newMap });
  };

  const updateChoice = (newChoice) => {
    setChoice({ ...choice, ...newChoice });
  };

  return (
    // Provide the fighter-related data to child components through the context.
    <FighterContext.Provider
      value={{
        currentFighter,
        updateCurrentFighter,
        map,
        updateMap,
        choice,
        updateChoice
      }}
    >
      {children}
    </FighterContext.Provider>
  );
}

export function useFighterContext() {
  return useContext(FighterContext);
}
