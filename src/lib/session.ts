import 'server-only';
import { cookies } from 'next/headers';


export async function createSession(idToken: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const cookieStore = cookies();

  (await cookieStore).set('token', idToken, {
    httpOnly: true,
    secure: true, 
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}
