"use client";

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-white shadow-xl p-10 md:p-16 text-center">

        <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
          Welcome to Task Tracker!
        </h1>


        <p className="text-gray-600 max-w-md">
          Organize your tasks, stay productive, and never miss a deadline. Let’s get started.
        </p>


        <Link
          href="/login"
          className="inline-flex items-center gap-3 rounded-lg bg-blue-600 px-6 py-3 text-sm md:text-base font-medium text-white shadow-md hover:bg-blue-500 transition"
        >
          <span>Log in</span>
          <ArrowRightIcon className="w-5 md:w-6" />
        </Link>
      </div>
    </div>
  );
}
