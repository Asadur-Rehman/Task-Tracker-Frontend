'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

interface FormValues {
  name: string;
  description: string;
  deadline: string;
}

export default function EditTaskModal({ isOpen, onClose, task }: EditTaskModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const updateMutation = useUpdateTask();

  useEffect(() => {
    if (task) {
      let deadlineString = '';
  
      if (
        task.deadline &&
        typeof task.deadline === 'object' &&
        '_seconds' in task.deadline &&
        typeof task.deadline._seconds === 'number'
      ) {
        deadlineString = new Date(task.deadline._seconds * 1000).toISOString().split('T')[0];
      } else if (typeof task.deadline === 'string') {
        deadlineString = new Date(task.deadline).toISOString().split('T')[0];
      }
  
      reset({
        name: task.name,
        description: task.description,
        deadline: deadlineString,
      });
    }
  }, [task, reset]);
  

  const onSubmit = async (data: FormValues) => {
    updateMutation.mutate(
      {
        taskId: task.id,
        name: data.name,
        description: data.description,
        deadline: new Date(data.deadline).toISOString(),
        status: task.status,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Task Name</label>
                <input
                {...register('name', { required: true })}
                className="w-full px-4 py-2 rounded border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                {...register('description', { required: true })}
                rows={4}
                className="w-full px-4 py-2 rounded border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline</label>
                <input
                type="date"
                {...register('deadline', { required: true })}
                className="w-full px-4 py-2 rounded border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting || updateMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            >
                {isSubmitting || updateMutation.isPending ? 'Saving...' : 'Save Changes'}
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
