'use client';

import { useMutation } from '@tanstack/react-query';
import { createTask } from '../../services/api/tasks/createTask';

export function useCreateTask() {
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      alert('Task created successfully!');
      window.location.href = '/dashboard/tasks';
    },
    onError: (err: Error) => {
      console.error(err);
      alert('Failed to create task');
    },
  });
}
