import React, { useState } from 'react';
import { auth } from '../../firebase';

import useSignInWithEmailAndPassword from '../../Hooks/useSignInWithEmailAndPassword';


const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useSignInWithEmailAndPassword();

    const handleLogin = (e) => {
        e.preventDefault();
        signIn(auth, email, password);
      }

    return (
        <form onSubmit={handleLogin}>
            <h1 className=' text-xl font-semibold text-white text-center mb-2'>Welcome back, Log In below</h1>
            <input
                type="email"
                placeholder="Email"
                className="w-full bg-opacity-70 border-2 border-white text-white bg-gray-900 rounded-lg px-3 py-2 mb-2"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg px-3 py-2 mb-2 border-2 border-white text-white bg-opacity-70 bg-gray-900"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="w-full text-white rounded-lg py-2 px-4 bg-gray-900  bg-opacity-70"
            >
                PLAY NOW!
            </button>
        </form>
    )
}

export default LoginForm