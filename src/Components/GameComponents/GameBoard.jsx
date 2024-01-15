import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserInput from './UserInput';
import GameTopbar from './GameTopbar';
import GamePlayer from './GamePlayer';
import GameCPU from './GameCPU';
import useUpdateScore from '../../Hooks/useUpdateScore';

import { useFighterContext } from '../../Contexts/FighterContext';
import useFetchUserData from '../../Hooks/useFetchUserData';

import FighterThreeRock from '../../Assets/Fighters/FighterThree/FighterThreeRock.png';
import FighterThreePaper from '../../Assets/Fighters/FighterThree/FighterThreePaper.png';
import FighterThreeScissors from '../../Assets/Fighters/FighterThree/FighterThreeScissors.png';

const GameBoard = () => {

  const { choice, map } = useFighterContext();
  const choiceImages = {
    rock: FighterThreeRock,
    paper: FighterThreePaper,
    scissors: FighterThreeScissors,
};
  const { currentUserData } = useFetchUserData();  
  const navigate = useNavigate();


  const { updateScores } = useUpdateScore();
  const [computerChoice, setComputerChoice] = useState('');

  const choices = ['rock', 'paper', 'scissors'];
  const [round, setRound] = useState(10);

  const [over, setOver] = useState(false);
  const [playerWins, setPlayerWins] = useState(0);

  const [computerWins, setComputerWins] = useState(0);
  const [roundResult, setRoundResult] = useState('');
  const [gameResult, setGameResult] = useState('');
  const [countdown, setCountdown] = useState(3);


  const handleRoundOverLogic = () => {
      setOver(true);

      // Generate a random index to select the computer's choice
      const randomIndex = Math.floor(Math.random() * 3);
      const computerRoundChoice = choices[randomIndex];

      // Set the computer's choice
      setComputerChoice(computerRoundChoice);

      // Define the winning combinations for the game
      const winningCombinations = {
          rock: 'scissors',
          paper: 'rock',
          scissors: 'paper',
      };

      // Get the player's choice 
      let playerChoice = choice.choice;

      // Check the outcome of the round and update the results
      if (playerChoice === computerRoundChoice) {
          setRoundResult("that round was a tie!");
      } else if (winningCombinations[playerChoice] === computerRoundChoice) {
          // If the Player wins, display a message and update its win count
          setRoundResult(`${currentUserData.email} won the round`);
          setPlayerWins(playerWins + 1);
      } else {
          // If the CPU wins, display a message and update its win count
          setRoundResult('CPU won the round');
          setComputerWins(computerWins + 1);
      }

      setRound(round - 1);
  };

  const handleUpdateScores = () => {
      // Calculate the new score for the current user based on wins and a bonus for winning the game
      const newCurrentUserScore = playerWins * 10 + (playerWins > computerWins ? 1000 : playerWins === computerWins ? 500 : 0);

      // Calculate the new score for the CPU based on wins and a bonus for winning the game
      const newCPUScore = computerWins * 10 + (playerWins < computerWins ? 1000 : playerWins === computerWins ? 500 : 0);

      if (playerWins > computerWins) {
          setGameResult('You Win the Game!');
      } else if (playerWins < computerWins) {
          setGameResult('CPU Won the Game.');
      } else {
          setGameResult("It's a Tie.");
      }

      // Call a function to update the scores in firebase
      updateScores(newCurrentUserScore, newCPUScore);
  };

  useEffect(() => {
    const handleCountdown = () => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
        if (!over) {
          handleRoundOverLogic();
          if (round > 1) {
            setTimeout(() => {
              setOver(false);
              setCountdown(3);
            }, 2000);
          } else if (round === 1) {
            handleUpdateScores();
          }
        }
      }
    };
  
    const timer = setInterval(handleCountdown, 1000);
  
    return () => {
      clearInterval(timer);
    };
  }, [countdown, over, round]);
  
  
  
  return (
    <div
      className='h-screen w-screen flex justify-center items-center text-center overflow-hidden'
      style={{
        backgroundImage: `url(${map.imageOne})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {round !== 0 && (
        <div className="absolute top-0 left-0 w-full">
          <GameTopbar playerWins={playerWins} computerWins={computerWins} rounds={round} />
        </div>
      )}

      <div className="absolute bottom-0 left-0 p-4 text-white top-1/2 transform -translate-y-1/2  w-60 h-80">
        <GamePlayer />
      </div>


      <div className='fixed inset-0 flex items-center justify-center'>
        <div>
          {over ? (
            <>
              {round == 0 ? (
                <>
                  <h1 className='text-2xl font-bold text-white'>{roundResult}</h1>
                  <h1 className='text-4xl font-bold text-yellow-400'>{gameResult}</h1>
                  <button className='mt-2 px-4 py-2 border-2 border-gray-700 rounded-md bg-white text-2xl text-gray-800 font-semibold' onClick={() => navigate('/')}>Exit</button>
                </>
              ) : (
                <h1 className='text-4xl font-bold text-yellow-400'>{roundResult}</h1>
              )}
            </>
          ) : (
            <>
              <h1 className='text-4xl font-bold text-yellow-400'>REVEAL IN:</h1>
              <h1 className='text-9xl font-bold text-yellow-400'>{countdown}</h1>
            </>
          )}
        </div>

      </div>

      {over ? (
        <>
          <div className="fixed right-10 top-1/2 transform -translate-y-1/2 w-60 animate-slide-in ">
            <img src={choiceImages[computerChoice]} alt={computerChoice} />
          </div></>
      ) : (
        <div className="absolute bottom-0 right-0 p-4 ">
          <GameCPU />
        </div>)}


      {over ? (
        <>
          <div className="absolute bottom-0 left-0 p-4 text-white items-center">
            <h3 className='text-3xl text-white font-semibold'>{currentUserData.email} picked {choice.choice}</h3>
          </div>

          <div className="absolute bottom-0 right-0 p-4 text-white items-center">
            <h3 className='text-3xl text-white font-semibold'>CPU picked {computerChoice}</h3>
          </div>
        </>

      ) : (
        <div className="absolute bottom-0 left-0 p-4 text-white items-center">
          <UserInput />
        </div>
      )}
    </div>
  );
};

export default GameBoard;
