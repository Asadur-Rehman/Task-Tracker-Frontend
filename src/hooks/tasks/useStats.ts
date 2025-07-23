'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '../../services/api/tasks/fetchStats';

export function useStats(userId: string) {
    return useQuery({
        queryKey: [],
        queryFn: () => fetchStats(),
        enabled: !!userId,
    });
}