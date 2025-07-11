'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../../services/api/tasks/deleteTask';
import { toast } from 'sonner';

export function useDeleteTask(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTask(taskId),
    onSuccess: () => {
      toast.success('Task deleted successfully!');
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      console.error('Delete error:', err);
      toast.error('Failed to delete task.');
    },
  });
}
