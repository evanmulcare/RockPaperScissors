import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useSignUpWithEmailAndPassword = () => {

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const db = getFirestore();

    const signUp = async (auth, email, password) => {
        try {
            // Create a new user with the provided email and password.
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // make a document reference for the user and set initial user data in Firestore.
            const userDocRef = doc(db, 'users', user.uid);

            await setDoc(userDocRef, {
                email: email,
                score: 0,
            });

            // update the current user's state.
            dispatch({ type: "REGISTER", payload: user });

            // Redirect after successful sign-up.
            navigate(`/player-select`);

            toast.success('Sign up successful.', {
                position: 'top-center',
                autoClose: 2000,
            });
        } catch (error) {
            console.error('Error registering:', error);

            toast.error('Error in sign up.', {
                position: 'top-center',
                autoClose: 2000,
            });
        }
    };
    return { signUp };
};

export default useSignUpWithEmailAndPassword;
