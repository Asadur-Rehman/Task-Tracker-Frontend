'use client';

import { useState, useEffect } from 'react';
import { useUpdateTask } from '@/src/hooks/tasks/useUpdateTask';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: string;
    name: string;
    description: string;
    deadline: any;
    status: 'Todo' | 'In Progress' | 'Completed';
  };
}

export default function EditTaskModal({ isOpen, onClose, task }: EditTaskModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Todo');

  const updateMutation = useUpdateTask();

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
      const deadlineSeconds = task.deadline?._seconds;
      const deadlineDate = new Date(deadlineSeconds * 1000);
      setDate(deadlineDate.toISOString().split('T')[0]);
      setStatus(task.status);
    }
  }, [task]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();

    updateMutation.mutate({
      taskId: task.id,
      name,
      description,
      deadline: new Date(date).toISOString(),
      status,
    }, {
      onSuccess: () => {
        onClose(); // close modal on success
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Edit Task</h2>
        <form onSubmit={handleEdit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Task Name"
            className="w-full px-4 py-2 rounded border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full px-4 py-2 rounded border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 rounded border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full text-center text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
