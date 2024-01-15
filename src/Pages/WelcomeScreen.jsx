import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchUserData from '../Hooks/useFetchUserData';

const WelcomeScreen = () => {
    // Fetch user data and sort it by score
    const { userData } = useFetchUserData();
    const sortedUserData = userData.sort((a, b) => b.score - a.score);

    const navigate = useNavigate();

    return (
        <div className='bg-yellow-200'>
            <div className='marquee'>
                <h2 className="fixed top-5 left-10 text-2xl font-semibold text-white text-left">
                    Rock Paper Scissors
                </h2>
            </div>
            <div className='mid-section'>
                <div className="crt-frame">
                    <div className="crt-content">
                        <div className='grid grid-rows-5'>
                            {/* Title */}
                            <div className="row-span-2 flex flex-col items-center justify-center w-full">
                                <h1 className="text-4xl font-extrabold text-white animate-bounce">
                                    ROCK PAPER SCISSORS
                                </h1>
                            </div>

                            {/* Leaderboard */}
                            <div className="row-span-2 rounded-2xl w-4/5 mx-auto p-4 text-center overflow-hidden mt-1 bg-opacity-70 bg-gray-900">
                                <ul className="w-full h-full divide-y divide-gray-600 overflow-y-auto">
                                    {/* Display the top 3 users based on their score */}
                                    {sortedUserData.slice(0, 3).map((user, index) => (
                                        <li key={index} className="flex items-center justify-between p-2 text-white font-semibold text-md">
                                            <span className="w-1/5">{index + 1}</span>
                                            <span className="w-3/5">{user?.email}</span>
                                            <span className="w-1/5">{user?.score}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Start Prompt */}
                            <div className="row-span-1 flex flex-col items-center justify-center w-full">
                                <h2 className="text-2xl font-bold text-white animate-pulse">
                                    PRESS S TO START
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decoration buttons and a start button */}
            <div className="controls">
                <div className="joystick"></div>
                <div className="joystick">
                    <div className="stick"></div>
                </div>
                <div className="buttons">
                    <button className="button button-a">R</button>
                    <button className="button button-b">P</button>
                    {/* Clicking this button navigates to the signin route */}
                    <button className="button button-b" onClick={() => navigate('/signin')}>S</button>
                </div>
            </div>

            <div className="stand"></div>
        </div>
    );
};

export default WelcomeScreen;
