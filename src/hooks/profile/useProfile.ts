'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '@/src/services/api/profile/fetchProfile';

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUserProfile,
  });
}