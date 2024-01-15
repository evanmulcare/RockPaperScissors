import React from 'react'
import useFetchUserData from '../../Hooks/useFetchUserData';
import HealthBar from './HealthBar';

const GameTopbar = ({playerWins, computerWins, rounds}) => {

    const { currentUserData,CPUUserData } = useFetchUserData();
    const playerHealth = (10 - computerWins)* 10;
    const computerHealth = (10 - playerWins) * 10;
    
  return (
    <div className="w-full flex justify-between  text-white  items-center">
    <div className='w-1/3'>
      <HealthBar position="left" health={playerHealth} user={currentUserData} wins={playerWins}/>
    </div>
    <div className='w-1/3'>
      <h2 className='text-center text-4xl font-bold text-white'>{rounds}</h2>
      <h2 className='text-center text-xl font-bold text-white'>Rounds Remaining</h2>
    </div>
    <div className='w-1/3'>
      <HealthBar position="right" health={computerHealth} user={CPUUserData} wins={computerWins}/>
    </div>
  </div>
  )
}

export default GameTopbar