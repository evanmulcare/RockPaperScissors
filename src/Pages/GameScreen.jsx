import React from 'react';
import GameBoard from '../Components/GameComponents/GameBoard';

const GameScreen = () => {
  return (
    <div>
      <div class="crt-frame-main">
        <div className='.crt-content-main'>
          <GameBoard />
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
