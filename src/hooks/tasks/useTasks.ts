import { useQuery } from '@tanstack/react-query';
import { authorizedFetcher } from '../../lib/authorizedFetcher';

export const useTasks = () =>
  useQuery({
    queryKey: ['tasks'],
    queryFn: () => authorizedFetcher('http://localhost:8000/tasks'),
  }
);
