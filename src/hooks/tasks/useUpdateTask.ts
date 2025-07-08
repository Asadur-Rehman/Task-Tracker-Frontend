'use client';

import { useMutation } from '@tanstack/react-query';
import { updateTask } from '../../services/api/tasks/updateTask';

export function useUpdateTask() {
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      alert('Task updated successfully!');
      window.location.href = '/dashboard/tasks';
    },
    onError: (err: Error) => {
      console.error(err);
      alert('Failed to update task');
    },
  });
}
