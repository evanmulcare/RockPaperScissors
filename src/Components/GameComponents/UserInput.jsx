import React from 'react';
import { useFighterContext } from '../../Contexts/FighterContext';

const UserInput = () => {
  const { updateChoice, currentFighter } = useFighterContext();

  return (
    <div>
      <div className="flex space-x-4">
        <button
          onClick={() => updateChoice({ choice: "rock", image: currentFighter.imageRock })}
          className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 shadow-md transition-transform transform -skew-x-6"
        >
          <img
            src={currentFighter.imageRock}
            className="w-10 h-10  rounded-lg object-contain mr-2"
          />
          <h3 className='text-xs mt-1'>Rock</h3>
        </button>

        <button
          onClick={() => updateChoice({ choice: "paper", image: currentFighter.imagePaper })}
          className="bg-green-500 text-white font-bold py-4 px-7 rounded-lg hover-bg-green-700 shadow-md transition-transform transform -skew-x-6"
        >
          <img
            src={currentFighter.imagePaper}
            className="w-10 h-10  rounded-lg object-contain mr-2"
          />
          <h3 className='text-xs mt-1'>Paper</h3>
        </button>

        <button
          onClick={() => updateChoice({ choice: "scissors", image: currentFighter.imageScissors })}
          className="bg-red-500 text-white font-bold py-4 px-5 rounded-lg hover:bg-red-700 shadow-md transition-transform transform -skew-x-6"
        >
          <img
            src={currentFighter.imageScissors}
            className="w-10 h-10  rounded-lg object-contain mr-2"
          />
          <h3 className='text-xs mt-1'>Scissors</h3>
        </button>
      </div>
    </div>
  );
};

export default UserInput;
