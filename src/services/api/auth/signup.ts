export interface SignupPayload {
    email: string;
    password: string;
    preferences: {
      theme: 'light' | 'dark';
      tasksPerPage: number;
      defaultSort: string;
    };
  }

export async function signupUser(payload: SignupPayload) {
    const res = await fetch('http://localhost:8000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to sign up');
    }
  
    return res.json();
  }
    