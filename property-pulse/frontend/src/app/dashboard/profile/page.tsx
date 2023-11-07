

"use client"

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useSelector } from 'react-redux';
import { selectUser, userLoggedIn } from '@/features/users/userReducer';
import { $Enums } from '../../../../../backend/utils/prisma-proxy';

const UserProfileUpdate = () => {


  // DUMMY USER! CONNECT WITH DATABASE
  // const [user, setUser] = useState({
  //   name: 'I am Example',
  //   email: 'user@example.com',
  //   role: 'tenant',
  // });
  //
  const user = useSelector(selectUser);


  // const [name, setName] = useState(user.name);
  // const [email, setEmail] = useState(user.email);
  // const [isManager, setIsManager] = useState(user.role === 'manager');

  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  if (!user){
    return(<p>Loading user</p>)
  }

  // useEffect(() => {
  //   setIsManager(user.role === 'manager');
  // }, [user]);

  // const handlePromoCodeSubmit = () => {
  //   if (promoCode === "promote") {
  //     setUser({ ...user, role: 'manager' });
  //     setIsManager(true);
  //     toast.success("You are now a manager!");
  //   } else if (promoCode === "demote" && isManager) {
  //     setUser({ ...user, role: 'tenant' });
  //     setIsManager(false);
  //     toast.success("You are now a tenant!");
  //   } else {
  //     toast.error("Invalid promo code");
  //   }
  //   setPromoCode("");
  //   setShowPromoInput(false);
  // };

  // const handleDemote = () => {
  //   setIsManager(false);
  //   setUser({ ...user, role: 'tenant' });
  //   toast.success("You are now a tenant!");
  // };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      toast.error("Please fill out all password fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    // ADD HERE FUNCTION TO CHANGE PASSWORD !!!

    toast.success("Password successfully changed!");
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setShowChangePassword(false);
  };

  const handleSubmit = () => {

    // HERE COMES THE UPDATE FUNCTION

    toast.success("Profile updated successfully!");
  };

  return (
  <div className="flex items-center justify-center mt-4 py-4 min-h-[80vh] bg-gray-100">
    <div className="p-6 bg-white rounded shadow-md w-full md:w-96">
      <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
      <label className="block mb-2">Name:</label>
      <input
        type="text"
        className="mb-4 p-2 w-full border rounded text-gray-900"
        value={user.name}
        // onChange={(e) => setName(e.target.value)}
      />
      <label className="block mb-2">Email:</label>
      <input
        type="email"
        className="mb-4 p-2 w-full border rounded text-gray-900"
        value={user.email}
        // onChange={(e) => setEmail(e.target.value)}
      />

<div className="mb-4">
        <span className="p-2 cursor-pointer text-blue-600" onClick={() => setShowChangePassword(!showChangePassword)}>
          Change Password
        </span>
        {showChangePassword && (
          <>
            <label className="block mt-2 mb-2">Old Password:</label>
            <input
              type="password"
              className="p-2 w-full border rounded text-gray-900"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <label className="block mt-2 mb-2">New Password:</label>
            <input
              type="password"
              className="p-2 w-full border rounded text-gray-900"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="block mt-2 mb-2">Confirm New Password:</label>
            <input
              type="password"
              className="p-2 w-full border rounded text-gray-900"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button
              className="mt-2 w-full p-2 bg-green-800 hover:bg-green-600 text-white rounded"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </>
        )}
      </div>

      <div className="mb-4">
        {user.role === $Enums.Role.manager ? (
          <span
            className="p-2 cursor-pointer text-blue-600 hover:bg-red-400 rounded"
            // onClick={handleDemote}
          >
            Demote to Tenant
          </span>
        ) : (
          <>
            <span className="p-2 cursor-pointer text-blue-600" onClick={() => setShowPromoInput(!showPromoInput)}>
              Are you a manager?
            </span>
            {showPromoInput && (
              <>
                <p className='text-sm text-gray-400 text-center'>secret code: (<span className='text-red-600'>promote)</span> </p>
                <input
                  type="text"
                  placeholder="Enter code to be promoted to manager"
                  className="mt-2 p-2 w-full border rounded text-gray-900"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  className="mt-2 w-full p-2 bg-green-800 hover:bg-green-600 text-white rounded"
                  // onClick={handlePromoCodeSubmit}
                >
                  Submit Code
                </button>
              </>
            )}
          </>
        )}
      </div>

      <button
        className="w-full p-2 bg-green-800 hover:bg-green-600 text-white rounded"
        onClick={handleSubmit}
      >
        Update Profile
      </button>
    </div>
  </div>
  );
};

export default UserProfileUpdate;