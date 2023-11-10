"use client"

import React, { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectUser, userLoggedIn } from '@/features/users/userReducer';
import { useAppDispatch } from '@/store/store';
import { useUpdateProfileMutation, usePromoteSelfMutation, useDemoteSelfMutation } from '@/features/users/profileSlice';
import { $Enums } from '../../../../../backend/utils/prisma-proxy';
import { UserData } from '@/features/users/profileSlice';

const UserProfileUpdate = () => {
  const user = useSelector(selectUser);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [updateUserProfile] = useUpdateProfileMutation();
  const [promoteUser] = usePromoteSelfMutation();
  const [demoteUser] = useDemoteSelfMutation();
  const dispatch = useAppDispatch();

  if (!user){
    return(<p>Loading user</p>)
  }

  const onProfileUpdateSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
      let data:UserData = {} as UserData;
      if(showChangePassword) {
        if (formData.password !== formData.passwordConfirm) {
          toast.error("New passwords do not match.");
          return false;
        }
        data.password = String(formData.password);
        data.oldPassword = String(formData.oldPassword);
      }
      data = {
        ...data,
        name: String(formData.name),
        email: String(formData.email)
      }
      const response = await updateUserProfile(data).unwrap();
      const updatedUser = response.user;
      dispatch(userLoggedIn(updatedUser));
      sessionStorage.setItem('login', JSON.stringify(updatedUser));
      setShowChangePassword(false);
      toast.success("Profile updated successfully!");
    } catch(err:any) {
      toast.error(err?.data?.msg);
      return false;
    }
  };

  const onRoleChangeSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let updatedUser = null;
    let response = null;
    if(user.role === $Enums.Role.tenant) {
      try {
        const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
        response = await promoteUser({ code: String(formData.code) }).unwrap();
        toast.success("You have been successfully promoted!");
      } catch(err:any) {
        toast.error(err?.data?.msg);
        return false;
      }
    }
    if(user.role === $Enums.Role.manager) {
      try {
        response = await demoteUser().unwrap();
        toast.success("You have been successfully demoted!");
      } catch(err:any) {
        toast.error(err?.data?.msg);
        return false;
      }
    }
    updatedUser = response?.user;
    if(updatedUser) {
      dispatch(userLoggedIn(updatedUser));
      sessionStorage.setItem('login', JSON.stringify(updatedUser));
    }
  }

  return (
    <div className="flex items-center justify-center mt-4 py-4 min-h-[80vh] bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-full md:w-96">
        <form onSubmit={onProfileUpdateSubmit}>
          <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            className="mb-4 p-2 w-full border rounded text-gray-900"
            defaultValue={user.name}
            name="name"
            required
          />
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            className="mb-4 p-2 w-full border rounded text-gray-900"
            name="email"
            defaultValue={user.email}
            required
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
                  name="oldPassword"
                  className="p-2 w-full border rounded text-gray-900"
                  required
                />
                <label className="block mt-2 mb-2">New Password:</label>
                <input
                  type="password"
                  name="password"
                  className="p-2 w-full border rounded text-gray-900"
                  required
                />
                <label className="block mt-2 mb-2">Confirm New Password:</label>
                <input
                  type="password"
                  name="passwordConfirm"
                  className="p-2 w-full border rounded text-gray-900"
                  required
                />
              </>
            )}
          </div>
        
          <button
            className="w-full p-2 bg-green-800 hover:bg-green-600 text-white rounded"
            type="submit"
          >
            Update Profile
          </button>
        </form>
        <form onSubmit={onRoleChangeSubmit}>
          <div className="my-4">
            {user.role === $Enums.Role.manager ? (
              <button
                className="p-2 cursor-pointer text-blue-600 hover:bg-red-400 rounded"
                type="submit"
              >
                Demote to Tenant
              </button>
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
                      name="code"
                      required
                    />
                    <button
                      className="mt-2 w-full p-2 bg-green-800 hover:bg-green-600 text-white rounded"
                      type="submit"
                    >
                      Submit Code
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileUpdate;