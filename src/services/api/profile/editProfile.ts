
interface UpdateUserProfile {
  email: string;
  displayName?: string;
  preferences?: {
    theme: 'light' | 'dark';
    tasksPerPage: number;
    defaultSort: 'startDate' | 'deadline';
  };
}

export async function updateUser(user: UpdateUserProfile): Promise<UpdateUserProfile> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const localId = localStorage.getItem('localId');
  if (!localId) throw new Error('User not authenticated');

  const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/users/${localId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to update profile: ${res.status} - ${msg}`);
  }

  const updatedUser = await res.json();
  return updatedUser;
}
