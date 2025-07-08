'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTaskStatus } from '../../services/api/tasks/updateTaskStatus';

export function useUpdateTaskStatus(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newStatus: string) => updateTaskStatus(taskId, newStatus),
    onSuccess: (_, newStatus) => {
      alert(`Task moved to "${newStatus}"`);
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      console.error('Status update error:', err);
      alert('Failed to update task status.');
    },
  });
}
