import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './Contexts/AuthContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GameScreen from "./Pages/GameScreen";
import PlayerSelect from './Pages/PlayerSelect';
import LoginScreen from './Pages/LoginScreen';
import MapSelect from './Pages/MapSelect';
import WelcomeScreen from './Pages/WelcomeScreen';
function App() {

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/signin' />; //check if currentUser is true or false, return child component if true else navigate to sign in route
  };


  return (
    <div>    
          <BrowserRouter>
            <ToastContainer />
              <Routes>
                <Route path='/' element={<WelcomeScreen />} />
                <Route path='/signin' element={<LoginScreen />} />
                
                <Route path='/player-select' element={<RequireAuth><PlayerSelect /></RequireAuth>} />
                <Route path='/map-select' element={<RequireAuth><MapSelect /></RequireAuth>} />

                <Route path='/play' element={<RequireAuth><GameScreen /></RequireAuth>} />

                <Route path='*' element={<Navigate to='/' />} />
              </Routes>
    
          </BrowserRouter>
        </div>
  );
}


export default App;
