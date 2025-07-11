'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTask } from '../../../../../hooks/tasks/useTask';
import { useUpdateTask } from '../../../../../hooks/tasks/useUpdateTask';
import { Timestamp } from 'firebase/firestore';

interface Task {
  id: string;
  name: string;
  description: string;
  deadline: Timestamp | string | Date | null;
  status: 'Todo' | 'In Progress' | 'Completed';
}

export default function EditTaskPage() {
  const { id } = useParams();
  const taskId = id as string;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Todo');

  const {
    data: task,
    isLoading,
    isError,
  } = useTask(taskId) as {
    data: Task | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const updateMutation = useUpdateTask();

  useEffect(() => {
    if (task) {
      setName(task.name || '');
      setDescription(task.description || '');

      const deadlineDate =
        typeof task.deadline === 'string'
          ? new Date(task.deadline)
          : (task.deadline as Timestamp)?.toDate?.();

      const isoDate = deadlineDate?.toISOString().split('T')[0] || '';
      setDate(isoDate);

      setStatus(task.status || 'Todo');
    }
  }, [task]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();

    updateMutation.mutate({
      taskId,
      name,
      description,
      deadline: new Date(date).toISOString(),
      status,
    });
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isError) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Failed to load task.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleEdit}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Edit Task</h2>

        <div>
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Task Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="w-full px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Due Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
