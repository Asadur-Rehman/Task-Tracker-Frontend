
import { cookies } from 'next/headers';

type CookieOptions = {
  maxAge?: number;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
};

export function setCookie(
  key: string,
  value: string,
  options: CookieOptions = {}
) {

    if (typeof window !== 'undefined') {
    let cookieStr = `${key}=${value}`;

    if (options.maxAge) {
      const expires = new Date(Date.now() + options.maxAge * 1000).toUTCString();
      cookieStr += `; expires=${expires}`;
    }

    cookieStr += `; path=${options.path || '/'}`;
    if (options.secure) cookieStr += '; secure';
    if (!options.httpOnly) cookieStr += '; SameSite=Lax';

    document.cookie = cookieStr;
  }
}


export async function getCookie(key: string): Promise<string | undefined> {

    if (typeof window !== 'undefined') {
    const value = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${key}=`));
    return value?.split('=')[1];
  }

  try {
    return (await cookies()).get(key)?.value;
  } catch {
    return undefined;
  }
}


export function deleteCookie(key: string) {

    if (typeof window !== 'undefined') {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }
}
