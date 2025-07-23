'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchTaskById } from '../../services/api/tasks/fetchTaskById';

export function useTask(taskId: string) {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: () => fetchTaskById(taskId),
    enabled: !!taskId,
  });
}
