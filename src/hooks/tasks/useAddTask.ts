import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authorizedFetcher } from '../../lib/authorizedFetcher';

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: {
      name: string;
      description: string;
      startDate: Date;
      deadline: Date;
    }) =>
      authorizedFetcher('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
