'use client';

import { useState } from 'react';
import { useCreateTask } from '../../../../hooks/tasks/useCreateTask';

export default function Home() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const mutation = useCreateTask();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    const generateId = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return Array.from({ length: 16 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join('');
    };

    mutation.mutate({
      id: generateId(),
      name,
      description,
      startDate: new Date().toISOString(),
      deadline: new Date(date).toISOString(),
      status: 'Todo',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <form onSubmit={handleCreate} className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">Create Task</h2>

        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Task Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Task Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="relative">
          <label htmlFor="date" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Due Date
          </label>
          
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          {mutation.isPending ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}