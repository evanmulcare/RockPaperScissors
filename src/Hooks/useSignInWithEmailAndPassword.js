import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useSignInWithEmailAndPassword = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const signIn = (auth, email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // If sign-in is successful, get the user and dispatch the LOGIN action.
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });

        // Redirect after successful login.
        navigate(`/player-select`);

        toast.success('Welcome, Login successfully', {
          position: 'top-center',
          autoClose: 2000,
        });
      })
      .catch((error) => {
        toast.error('Error logging in. Please check your credentials.', {
          position: 'top-center',
          autoClose: 2000,
        });
      });
  };

  return { signIn };
};

export default useSignInWithEmailAndPassword;
