"use client";

import { useEffect, useContext } from "react";
import { getCurrentUser } from "@/app/actions";

import { useCurrentUserContext } from "@/components/UserContext";

export default function ProfilePage() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  useEffect(() => {
    const fetchUser = async () => {
      const updatedViews = await getCurrentUser();
      console.log(updatedViews);
      setCurrentUser(updatedViews?.data);
    };
    fetchUser();
  }, [setCurrentUser]);

  const handleAvatarChange = () => {
    // Add functionality for avatar change here
  };

  const handlePasswordChange = () => {
    // Add functionality for password change here
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">User Profile</h2>
        <div>
          <button
            onClick={handleAvatarChange}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 focus:outline-none hover:bg-blue-600"
          >
            Change Avatar
          </button>
          <button
            onClick={handlePasswordChange}
            className="bg-gray-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600"
          >
            Change Password
          </button>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <img
          src={currentUser?.avatar?.url}
          alt="Avatar"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {currentUser?.username}
          </h3>
          <p className="text-sm text-gray-600">{currentUser?.email}</p>
        </div>
      </div>
    </div>
  );
}
