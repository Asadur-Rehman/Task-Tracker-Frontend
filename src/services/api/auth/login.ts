// interface LoginPayload {
//     email: string;
//     password: string;
//   }
  
//   interface FirebaseLoginResponse {
//     idToken: string;
//     refreshToken: string;
//     expiresIn: string;
//     localId: string;
//     email: string;
//   }
  
//   export async function loginUser(payload: LoginPayload): Promise<FirebaseLoginResponse> {
//     const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

//     console.log("API", apiKey)
  
//     const response = await fetch(
//       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: payload.email,
//           password: payload.password,
//           returnSecureToken: true,
//         }),
//       }
//     );

    
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error?.error?.message || 'Firebase login failed');
//     }
    
//     return response.json();
//   }
  



interface LoginPayload {
  email: string;
  password: string;
}

export async function loginUser(payload: LoginPayload) {
  const res = await fetch('http://localhost:8000/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Login failed');
  }

  return res.json();
}
