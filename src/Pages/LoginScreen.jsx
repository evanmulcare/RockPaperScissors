import React, { useState } from 'react';
import useFetchUserData from '../Hooks/useFetchUserData';
import LoginForm from '../Components/FormComponents/LoginForm';
import RegisterForm from '../Components/FormComponents/RegisterForm';

const LoginScreen = () => {
  const { userData } = useFetchUserData();

  // Sort user data based on their high scores.
  const sortedUserData = userData.sort((a, b) => b.score - a.score);

  // Define the active tab for switching between login and signup forms.
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div class="crt-frame-main">
      <div className='.crt-content-main'>
        <div className="w-full h-full">
          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-1'>
              <h1 className="mt-2 font-bold text-6xl text-white text-center">
                Rock Paper Scissors
              </h1>
              <div className="ml-10 h-full mx-auto">
                <div className='flex border-b'>
                  {/* Button to switch to the login form */}
                  <button
                    className={`flex-1 py-2 text-lg font-semibold ${activeTab === 'login' ? 'border-b-2 border-red-500 text-red-500' : 'text-white border-white'
                    }`}
                    onClick={() => setActiveTab('login')}
                  >
                    LOGIN
                  </button>
                  {/* Button to switch to the signup form */}
                  <button
                    className={`flex-1 py-2 text-lg font-semibold  ${activeTab === 'signup' ? 'border-b-2 border-red-500 text-red-500' : 'text-white border-white'
                    }`}
                    onClick={() => setActiveTab('signup')}
                  >
                    SIGN UP
                  </button>
                </div>
                <div className="mx-auto mt-10  max-w-md py-5">
                  {/* Render the login form when the login tab is active */}
                  {activeTab === 'login' && (
                    <LoginForm />
                  )}
                  {/* Render the signup form when the signup tab is active */}
                  {activeTab === 'signup' && (
                    <RegisterForm />
                  )}
                </div>
              </div>
            </div>
            <div className='col-span-1 bg-gray-900 h-screen bg-opacity-70'>
              <div className="mt-8 items-center space-y-4 ">
                <h1 className='text-center font-bold text-white text-2xl'>HIGH SCORES</h1>
                <div className="rounded-2xl p-4 text-center overflow-scroll">
                  <ul className="w-full h-full divide-y divide-gray-600">
                    {/* Render a list of high scores with user information */}
                    {sortedUserData.map((user, index) => (
                      <li key={index} className="flex items-center justify-between p-2 text-white font-semibold text-xl">
                        <span className="w-1/5">{index + 1}</span>
                        <span className="w-3/5">{user?.email}</span>
                        <span className="w-1/5">{user?.score}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
