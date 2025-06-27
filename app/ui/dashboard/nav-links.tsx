'use client';

import {
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Define your navigation links
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Tasks', href: '/dashboard/tasks', icon: DocumentDuplicateIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2"> {/* <- This fixes the spacing */}
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 transition',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-5" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
