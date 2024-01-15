import { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};


// Create a context to provide authentication data to components.
export const AuthContext = createContext(INITIAL_STATE);

// Create an authentication context provider component.
export const AuthContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // update the user information in local storage whenever it changes.
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser))
  }, [state.currentUser])


  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
