'use client';

import { useForm } from 'react-hook-form';
import { useCreateTask } from '../../../../hooks/tasks/useCreateTask';


type FormValues = {
  name: string;
  description: string;
  deadline: string;
};

export default function CreateTaskPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const mutation = useCreateTask();

  const onSubmit = (data: FormValues) => {
    mutation.mutate(
      {
        name: data.name,
        description: data.description,
        startDate: new Date().toISOString(),
        deadline: new Date(data.deadline).toISOString(),
        status: 'Todo',
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">Create Task</h2>

        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Task Name
          </label>
          <input
            id="name"
            {...register('name', { required: true })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Task Description
          </label>
          <textarea
            id="description"
            rows={4}
            {...register('description', { required: true })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="deadline" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Due Date
          </label>
          <input
            type="date"
            id="deadline"
            {...register('deadline', { required: true })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || mutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          {isSubmitting || mutation.isPending ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}
