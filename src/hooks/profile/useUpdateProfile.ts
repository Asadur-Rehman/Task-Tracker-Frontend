// hooks/profile/useUpdateProfile.tsx
'use client';

import { useMutation } from '@tanstack/react-query';
import { updateUser } from '../../services/api/profile/editProfile';
import { toast } from 'sonner';

export function useUpdateUser() {
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      toast.success('Profile updated successfully!');
    },
    onError: (err: Error) => {
      console.error(err);
      toast.error('Failed to update profile.');
    },
  });
}
