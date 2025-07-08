'use client';

import { useState } from 'react';
import { useLogin } from '../../hooks/auth/useLogin';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/signup";
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl md:-mt-20">
        <div className="flex items-center justify-center h-20 md:h-24 rounded-lg bg-blue-600 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Task Tracker</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Logging in...' : 'Log In'}
          </button>

          <button
            type="button"
            className="w-full text-blue-600 hover:text-blue-800 mt-2 text-sm"
            onClick={handleSignUp}
          >
            No Account? Sign Up
          </button>
        </form>
      </div>
    </main>
  );
}
