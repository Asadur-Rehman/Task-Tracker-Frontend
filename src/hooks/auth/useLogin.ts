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

      localStorage.setItem('localId', data.localId);
      document.cookie = `localId=${data.localId}`;

      window.location.href = '/dashboard';
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
