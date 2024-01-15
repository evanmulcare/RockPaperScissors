import React from 'react';
import { useFighterContext } from '../../Contexts/FighterContext';
const GamePlayer = () => {
  const { choice } = useFighterContext();

  return (
    <div className="animate-slide-in">
      <img
        src={choice.image}
        alt={choice.choice}
        className="w-full h-full object-fit"
      />
    </div>
  );
};

export default GamePlayer;
