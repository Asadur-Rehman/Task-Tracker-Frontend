'use client';

import { useMutation } from '@tanstack/react-query';
import { createTask } from '../../services/api/tasks/createTask';
import { toast } from 'sonner';

export function useCreateTask() {
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast.success('Task created successfully!');
      window.location.href = '/dashboard/tasks';
    },
    onError: (err: Error) => {
      console.error(err);
      toast.error('Failed to create task');
    },
  });
}
