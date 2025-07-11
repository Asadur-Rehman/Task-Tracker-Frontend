'use client';

import { useState, useEffect } from 'react';

interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences?: {
    theme: 'light' | 'dark';
    tasksPerPage: number;
    defaultSort: string;
  };
}

export default function ProfilePage() {
  // TODO: Replace with real user loading logic
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user from backend (replace this with actual fetch)
    setTimeout(() => {
      const fetchedUser: User = {
        uid: 'abc123',
        email: 'asad@example.com',
        createdAt: new Date('2024-06-10'),
        updatedAt: new Date(),
        displayName: '', // First time
        photoURL: '',
        preferences: undefined, // First time
      };

      setUser(fetchedUser);
      setLoading(false);
    }, 500);
  }, []);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 text-xl font-semibold">
        Loading profile...
      </div>
    );
  }

  const isFirstTime =
    !user.displayName || !user.photoURL || !user.preferences;

  if (isFirstTime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center px-4 py-12">
        <div className="bg-white/80 backdrop-blur-lg border border-blue-100 shadow-xl rounded-3xl p-8 max-w-xl w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome!</h1>
          <p className="text-gray-600 mb-6">
            Let's complete your profile setup so you can personalize your experience.
          </p>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition">
            Set Up Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center px-4 py-12">
      <div className="backdrop-blur-xl bg-white/70 border border-blue-200/40 shadow-xl rounded-3xl max-w-lg w-full overflow-hidden p-8 transition-transform hover:scale-[1.01] duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-28 h-28 mb-5">
            <img
              src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName}`}
              alt="User avatar"
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">{user.displayName}</h1>
          <p className="text-gray-600 text-sm mt-1">{user.email}</p>
          <p className="text-gray-400 text-xs mt-1">
            Joined on {new Date(user.createdAt).toLocaleDateString()}
          </p>

          <div className="mt-6 text-left w-full">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Preferences</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><strong>Theme:</strong> {user.preferences?.theme}</li>
              <li><strong>Tasks per page:</strong> {user.preferences?.tasksPerPage}</li>
              <li><strong>Default sort:</strong> {user.preferences?.defaultSort}</li>
            </ul>
          </div>

          <button
            className="mt-6 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition duration-200 shadow-md"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
