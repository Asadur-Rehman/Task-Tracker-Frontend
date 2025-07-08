"use client";

import Link from 'next/link';
import NavLinks from '@/src/components/dashboard/nav-links'; // Keep this if it renders the navigation items
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  const handleSignOut = () => {

    localStorage.removeItem('token');
    localStorage.clear();
  
    document.cookie = 'idToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    window.location.href = "/";
  };
  
  
  return (
    <aside className="flex h-full flex-col bg-white border-r px-3 py-4 md:px-4 shadow-sm">

      <Link href="/" className="mb-6 flex items-center justify-center text-blue-600">
        <span className="text-2xl font-extrabold tracking-tight">Task Tracker</span>
      </Link>


      <nav className="flex grow flex-col justify-between space-y-4">
        <NavLinks />

        <div className="mt-auto">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full rounded-md bg-gray-100 p-3 text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
          >
            <PowerIcon className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
