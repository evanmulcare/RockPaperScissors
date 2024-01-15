import React, { useState } from 'react';
import FighterOne from '../Assets/Fighters/FighterOne/FigherOne.png'
import FighterOneRock from '../Assets/Fighters/FighterOne/rock.png'
import FighterOnePaper from '../Assets/Fighters/FighterOne/paper.png'
import FighterOneScissors from '../Assets/Fighters/FighterOne/Scissors.png'

import FighterTwo from '../Assets/Fighters/FighterTwo/FighterTwo.png'
import FighterTwoRock from '../Assets/Fighters/FighterTwo/FighterTwoRock.png'
import FighterTwoPaper from '../Assets/Fighters/FighterTwo/FighterTwoPaper.png'
import FighterTwoScissors from '../Assets/Fighters/FighterTwo/FighterTwoScissors.png'

import FighterThree from '../Assets/Fighters/FighterThree/FighterThree.png'
import FighterThreeRock from '../Assets/Fighters/FighterThree/FighterThreeRock.png'
import FighterThreePaper from '../Assets/Fighters/FighterThree/FighterThreePaper.png'
import FighterThreeScissors from '../Assets/Fighters/FighterThree/FighterThreeScissors.png'

import { useFighterContext } from '../Contexts/FighterContext';
import { useNavigate } from 'react-router-dom';

const fighters = [
  {
    name: '石头 剪子 布',
    image: FighterOne,
    rockImage: FighterOneRock,
    paperImage: FighterOnePaper,
    scissorsImage: FighterOneScissors,
  },
  {
    name: 'Rocky',
    image: FighterTwo,
    rockImage: FighterTwoRock,
    paperImage: FighterTwoPaper,
    scissorsImage: FighterTwoScissors,
  },
  {
    name: 'CPU-esque',
    image: FighterThree,
    rockImage: FighterThreeRock,
    paperImage: FighterThreePaper,
    scissorsImage: FighterThreeScissors,
  },
];


const PlayerSelect = () => {
  const navigate = useNavigate();
  const { updateCurrentFighter } = useFighterContext();

  // Initialize state variables with default values from the first fighter
  const [selectedFighter, setSelectedFighter] = useState(fighters[0].name);
  const [selectedFighterImage, setSelectedFighterImage] = useState(
    fighters[0].image
  );
  const [selectedFighterRockImage, setSelectedFighterRockImage] = useState(
    fighters[0].rockImage
  );
  const [selectedFighterPaperImage, setSelectedFighterPaperImage] = useState(
    fighters[0].paperImage
  );
  const [selectedFighterScissorsImage, setSelectedFighterScissorsImage] = useState(
    fighters[0].scissorsImage
  );

//get the images of the currently selected fighter, pass and update through the fighterContext and navigate to the map selection screen
  const handleUpdateCurrentFighter = () => {
    const fighterImages = {
      name: selectedFighter,
      imageFighter: selectedFighterImage,
      imageRock: selectedFighterRockImage,
      imagePaper: selectedFighterPaperImage,
      imageScissors: selectedFighterScissorsImage,
    };

    updateCurrentFighter(fighterImages);
    navigate('/map-select');
  };


//set the selected player and their associtaed images
  const selectFighter = (fighter) => {
    setSelectedFighter(fighter);

    const selectedFighterData = fighters.find((f) => f.name === fighter);
    setSelectedFighterImage(selectedFighterData.image);
    setSelectedFighterRockImage(selectedFighterData.rockImage);
    setSelectedFighterPaperImage(selectedFighterData.paperImage);
    setSelectedFighterScissorsImage(selectedFighterData.scissorsImage);
  };


  return (
    <div class="crt-frame-main">
      <div className='.crt-content-main'>
        <div className="h-screen text-white items-center justify-center relative">
          <h1 className="text-4xl font-bold text-center p-4">Choose Your Fighter</h1>

          <div className="rounded-lg space-y-4 text-center">
            <div className="grid grid-cols-3 gap-4">
              {fighters.map((fighter) => (
                <div key={fighter.name} className="flex flex-col items-center justify-center space-y-2">
                  <button
                    onClick={() => selectFighter(fighter.name)}
                    className={`${selectedFighter === fighter.name
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-800 hover:bg-gray-700'
                      } transition-all duration-300 ease-in-out py-2 px-4 rounded-lg text-xl font-semibold mb-2`}
                  >
                    <img
                      src={fighter.image}
                      alt={fighter.name}
                      className="sm:w-40 sm:h-40 md:w-72 md:h-72  object-contain rounded-lg"
                    />
                    {fighter.name}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {selectedFighter && (
            <div className="absolute bottom-20 left-0 p-4  text-white  items-center">
              <img
                src={selectedFighterImage}
                alt={selectedFighter}
                className="w-44 h-44  rounded-lg object-contain mr-2"
              />
              <div>
                <p className="text-xl font-semibold">{selectedFighter} Selected</p>
              </div>
            </div>
          )}

          <div className="absolute bottom-20 right-0 p-4  text-white  items-center">
            <button className='bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out py-2 px-4 rounded-lg text-xl font-semibold' onClick={(() => handleUpdateCurrentFighter())}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSelect;
