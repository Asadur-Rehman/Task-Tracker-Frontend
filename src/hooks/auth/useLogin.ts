'use client';

import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../services/api/auth/login';
import { toast } from 'sonner';

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {

      localStorage.setItem('token', data.idToken);
      document.cookie = `idToken=${data.idToken}; path=/`;

      window.location.href = '/dashboard';
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
