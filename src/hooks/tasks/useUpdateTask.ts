'use client';

import { useMutation } from '@tanstack/react-query';
import { updateTask } from '../../services/api/tasks/updateTask';
import { toast } from 'sonner';

export function useUpdateTask() {
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      toast.success('Task updated successfully!');
      window.location.href = '/dashboard/tasks';
    },
    onError: (err: Error) => {
      console.error(err);
      toast.error('Failed to update task');
    },
  });
}
