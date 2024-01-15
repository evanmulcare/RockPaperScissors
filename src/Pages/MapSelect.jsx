import React, { useState } from 'react';
import MapOne from '../Assets/Maps/MapOne.gif';
import MapTwo from '../Assets/Maps/MapTwo.gif';
import MapThree from '../Assets/Maps/MapThree.gif';
import { useNavigate } from 'react-router-dom';
import { useFighterContext } from '../Contexts/FighterContext';

// maps with their names and images.
const maps = [
  { name: 'Paper Thin', image: MapOne },
  { name: 'Cut Throat', image: MapTwo },
  { name: 'Rock Hard', image: MapThree },
];

const MapSelect = () => {
  // Initialize states for the selected map and its image.
  const [selectedMap, setSelectedMap] = useState(maps[0].name);
  const [selectedMapImage, setSelectedMapImage] = useState(maps[0].image);

  // Access the FighterContext to update the map and fighter choice.
  const { updateMap, updateChoice, currentFighter } = useFighterContext();
  const navigate = useNavigate();

  // Function to handle the update of the current map and fighter choice.
  const handleUpdateCurrentMap = () => {
    updateMap({
      name: selectedMap,
      imageOne: selectedMapImage,
    });
    updateChoice({ choice: "rock", image: currentFighter.imageRock }); // setting inital player choice to rock for game

    navigate('/play');
  };

  // set the selected map name and map image 
  const selectMap = (map) => {
    setSelectedMap(map);
    setSelectedMapImage(
      maps.find((m) => m.name === map)?.image || '' //search map array for match with name, if match is found set the selectedImage to the corresponding map
    );
  };

  return (
    <div class="crt-frame-main">
      <div className='.crt-content-main'>
        <div className="h-screen text-white items-center justify-center relative">
          <h1 className="text-4xl font-bold text-center p-4">Choose Your Map</h1>

          <div className="rounded-lg space-y-4 text-center">
            <div className="grid grid-cols-3 gap-4">
              {maps.map((map) => (
                <div key={map.name} className="flex flex-col items-center justify-center space-y-2">
                  <button
                    onClick={() => selectMap(map.name)}
                    className={`${selectedMap === map.name
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-800 hover:bg-gray-700'
                    } transition-all duration-300 ease-in-out py-2 px-4 rounded-lg text-xl font-semibold mb-2`}
                  >
                    <img
                      src={map.image}
                      alt={map.name}
                      className="sm:w-40 sm:h-40 md:w-72 md:h-72 object-contain rounded-lg"
                    />
                    {map.name}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {selectedMap && (
            <div className="absolute bottom-20 left-0 p-4 text-white items-center">
              <img
                src={selectedMapImage}
                alt={selectedMap}
                className="w-44 h-44 object-contain rounded-lg"
              />
              <div>
                <p className="text-xl font-semibold">{selectedMap} Selected</p>
              </div>
            </div>
          )}

          <div className="absolute bottom-20 right-0 p-4 text-white items-center">
            <button className='bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out py-2 px-4 rounded-lg text-xl font-semibold' onClick={() => handleUpdateCurrentMap()}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSelect;
