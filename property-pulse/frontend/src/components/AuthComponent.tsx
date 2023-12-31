
"use client"

import React, { useState } from 'react';
import { apiSlice } from '@/features/api/apiSlice';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useAppDispatch } from '@/store/store';
import { useLoginUserMutation } from '@/features/users/usersSlice';
import { userLoggedIn } from '@/features/users/userReducer';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import LoadingSpinner from './LoadingSpinner';

const AuthComponent: React.FC = () => {
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
  
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        dispatch(userLoggedIn(data.user));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password }).unwrap();
      if(response.user) {
        dispatch(userLoggedIn(response.user));
        dispatch(apiSlice.util.resetApiState());
        sessionStorage.setItem('login', JSON.stringify(response.user));
        router.push('/dashboard');
      }
    } catch (error:any) {
      toast.error(error.data.msg, {
        toastId: 'login-failure',
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-80 md:w-96 flex flex-col justify-between gap-1">
        <div>
          <div className="flex justify-between text-xl font-semibold mb-6">
            <span
              className={`cursor-pointer px-4 py-2 rounded ${isLogin ? 'bg-green-800 hover:bg-green-600 text-white' : 'text-gray-700 hover:bg-green-200'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </span>
            <span
              className={`cursor-pointer px-4 py-2 rounded ${!isLogin ? 'bg-green-800 hover:bg-green-600 text-white' : 'text-gray-700 hover:bg-green-200'}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </span>
          </div>

          {isLogin ? (
            <>
              <input
                type="email"
                placeholder="Email"
                className="mb-4 p-2 w-full border rounded text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-6 p-2 w-full border rounded text-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Name"
                className="mb-4 p-2 w-full border rounded text-gray-900"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="mb-4 p-2 w-full border rounded text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-4 p-2 w-full border rounded text-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="mb-6 p-2 w-full border rounded text-gray-900"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}
        </div>
        {isLoggingIn && <LoadingSpinner />}
        <div>
          {isLogin ? 
          (<button className="mb-4 w-full p-2 bg-green-800 hover:bg-green-600 text-white rounded" onClick={handleLogin}>
            Login
          </button>) 
          : 
          (<button className="mb-4 w-full p-2 bg-green-800 hover:bg-green-600 text-white rounded" onClick={handleSignup}>
            Register
          </button>
            )}

          <div className="flex justify-center space-x-4">
            <button className="text-green-800 hover:text-green-600">
              <FaGoogle size={24} />
            </button>
            <button className="text-green-800 hover:text-green-600">
              <FaGithub size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
