'use client';

import { useState } from 'react';
import { useAddTask } from '../hooks/tasks/useAddTask';

export default function AddTaskForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { mutate, isPending } = useAddTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      name,
      description,
      startDate: new Date(),
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // +3 days
    });

    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="border p-2"
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="border p-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" disabled={isPending} className="bg-blue-500 text-white px-4 py-2">
        {isPending ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
}
