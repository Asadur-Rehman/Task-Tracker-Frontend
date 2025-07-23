'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNumberOfTasks } from '../../services/api/tasks/fetchNumberOfTasks';

export function useNumberOfTasks(userId: string) {
    return useQuery({
        queryKey: [],
        queryFn: () => fetchNumberOfTasks(),
        enabled: !!userId,
    });
}