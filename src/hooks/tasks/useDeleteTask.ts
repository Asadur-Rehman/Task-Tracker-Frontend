'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../../services/api/tasks/deleteTask';

export function useDeleteTask(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTask(taskId),
    onSuccess: () => {
      alert('Task deleted successfully!');
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      console.error('Delete error:', err);
      alert('Failed to delete task.');
    },
  });
}
