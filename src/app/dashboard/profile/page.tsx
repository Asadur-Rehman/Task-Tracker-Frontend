'use client';

import { useUser } from '../../../hooks/profile/useProfile';
import { useUpdateUser } from '../../../hooks/profile/useUpdateProfile';
import { useState, useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';
import { useUserContext } from '@/src/contexts/UserContext';


export default function ProfilePage() {
  const { user: userData, setUser: setGlobalUser, isLoading, isError } = useUserContext();
  const updateUser = useUpdateUser();

  const [user, setUser] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userData) setUser(userData);
  }, [userData]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 text-xl font-semibold">
        Loading profile...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-medium text-xl">
        Failed to load profile.
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => {
      if (!prev) return prev;

      if (['theme', 'tasksPerPage', 'defaultSort'].includes(name)) {
        return {
          ...prev,
          preferences: {
            ...prev.preferences!,
            [name]: name === 'tasksPerPage' ? parseInt(value) || 0 : value,
          },
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSave = () => {
    if (user) {
      const { createdAt, ...rest } = user;
      updateUser.mutate(rest, {
        onSuccess: (updatedUser) => {
          setGlobalUser({ ...user, ...updatedUser });
          setIsEditing(false);
        },
      });
    }
  };

  const formattedCreatedAt = new Date(user.createdAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center px-4 py-12">
      <div className="backdrop-blur-xl bg-white/70 border border-blue-200/40 shadow-xl rounded-3xl max-w-lg w-full overflow-hidden p-8 transition-transform hover:scale-[1.01] duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-28 h-28 mb-5">
            <img
              src={
                user.photoURL ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName}`
              }
              alt="User avatar"
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">{user.displayName}</h1>
          <p className="text-gray-600 text-sm mt-1">{user.email}</p>
          <p className="text-gray-400 text-xs mt-1">
            Joined on {formattedCreatedAt}
          </p>

          <div className="mt-6 text-left w-full">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Preferences</h3>

            {isEditing ? (
              <form className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <input
                    type="text"
                    name="displayName"
                    value={user.displayName}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  />
                </div>


                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">Theme</label>
                  <select
                    name="theme"
                    value={user.preferences?.theme}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">Tasks Per Page</label>
                  <input
                    type="number"
                    name="tasksPerPage"
                    min={1}
                    value={user.preferences?.tasksPerPage ?? 1}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">Default Sort</label>
                  <select
                    name="defaultSort"
                    value={user.preferences?.defaultSort}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  >
                    <option value="startDate">Start Date</option>
                    <option value="deadline">Deadline</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                >
                  Save
                </button>
              </form>
            ) : (
              <ul className="text-sm text-gray-700 space-y-1">

                <li><strong>Theme:</strong> {user.preferences?.theme}</li>
                <li><strong>Tasks per page:</strong> {user.preferences?.tasksPerPage}</li>
                <li><strong>Default sort:</strong> {user.preferences?.defaultSort}</li>
              </ul>

            )}
          </div>

          <button
            className="mt-6 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition duration-200 shadow-md"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}