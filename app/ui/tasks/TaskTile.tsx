'use client';

import { useState } from 'react';

interface TaskTileProps {
  id: string; 
  name: string;
  description: string;
//   onEdit?: () => void;
//   onDelete?: () => void;
}

    
export default function TaskTile({ id, name, description }: TaskTileProps) {
  const [showActions, setShowActions] = useState(false);

  const onEdit = (e: React.FormEvent) => {
    e.preventDefault();
    // alert(`Logged in as: ${email} (simulated)`);
    window.location.href = `/dashboard/tasks/${id}/edit`;
  };

const onDelete = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Task Deleted`);
  };


  return (
    <div
      className="rounded-lg border border-gray-200 p-4 shadow-sm bg-white dark:bg-gray-800 relative hover:shadow-md transition"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Task Content */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>

      {/* Action Buttons (Edit / Delete) */}
      {showActions && (
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition text-sm"
          >
            ✏️ Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition text-sm"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}
