'use client';

import { useMutation } from '@tanstack/react-query';
import { signupUser } from '../../services/api/auth/signup';
import { toast } from 'sonner';

interface SignupInput {
  email: string;
  password: string;
}

export function useSignup() {
  return useMutation({
    mutationFn: ({ email, password }: SignupInput) =>
      signupUser({
        email,
        password,
        preferences: {
          theme: 'dark',
          tasksPerPage: 10,
          defaultSort: 'deadline',
        },
      }),
    onSuccess: () => {
      toast.success('Signup successful!');
      window.location.href = '/login';
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
