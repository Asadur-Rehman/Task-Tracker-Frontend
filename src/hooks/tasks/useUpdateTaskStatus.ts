'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTaskStatus } from '../../services/api/tasks/updateTaskStatus';
import { toast } from 'sonner';

export function useUpdateTaskStatus(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newStatus: string) => updateTaskStatus(taskId, newStatus),
    onSuccess: (_, newStatus) => {
      toast.success(`Task moved to "${newStatus}"`);
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      console.error('Status update error:', err);
      toast.error('Failed to update task status.');
    },
  });
}
