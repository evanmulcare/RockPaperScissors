import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './Contexts/AuthContext';
import { FighterProvider } from './Contexts/FighterContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
      <FighterProvider>
        <App />
        </FighterProvider>
      </AuthContextProvider>
  </React.StrictMode>
);


