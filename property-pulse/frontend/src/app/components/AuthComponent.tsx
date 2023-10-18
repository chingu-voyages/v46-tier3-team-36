
"use client"

import React, { useState } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const AuthComponent: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="h-[400px] p-8 bg-white rounded shadow-md w-80 md:w-96 flex flex-col justify-between">
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
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-6 p-2 w-full border rounded text-gray-900"
              />
            </>
          ) : (
            <>
              <input
                type="email"
                placeholder="Email"
                className="mb-4 p-2 w-full border rounded text-gray-900"
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-4 p-2 w-full border rounded text-gray-900"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="mb-6 p-2 w-full border rounded text-gray-900"
              />
            </>
          )}
        </div>

        <div>
          <button className="mb-4 w-full p-2 bg-green-800 hover:bg-green-600 text-white rounded">
            {isLogin ? 'Login' : 'Register'}
          </button>

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
