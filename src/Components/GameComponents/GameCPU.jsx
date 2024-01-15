import React, { useState, useEffect } from 'react';

const GameCPU = () => {
  const [grayscaleIndex, setGrayscaleIndex] = useState(0);

  const grayscaleClasses = [
    'text-gray-200',
    'text-gray-400',
    'text-gray-600',
    'text-gray-800',
  ];

  useEffect(() => {
    const updateGrayscaleIndex = () => {
      const newIndex = (grayscaleIndex + 1) % grayscaleClasses.length;
      setGrayscaleIndex(newIndex);
    };

    const timer = setInterval(updateGrayscaleIndex, 500);

    return () => {
      clearInterval(timer);
    };
  }, [grayscaleIndex, grayscaleClasses]);

  return (
    <div className="fixed right-10 top-1/2 transform -translate-y-1/2 w-60 animate-slide-in ">
      <h1 className={`text-[350px] ${grayscaleClasses[grayscaleIndex]}`}>?</h1>
    </div>
  );
};

export default GameCPU;
