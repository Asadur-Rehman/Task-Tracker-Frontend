'use client';

import { useState } from 'react';
import { useDeleteTask } from '../../hooks/tasks/useDeleteTask';
import { useUpdateTaskStatus } from '../../hooks/tasks/useUpdateTaskStatus';
import EditTaskModal from './EditTaskModal';

interface TaskTileProps {
  id: string;
  name: string;
  description: string;
  deadline: string; 
  color: string;
}

export default function TaskTile({ id, name, description, deadline, color }: TaskTileProps) {
  const [showActions, setShowActions] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const deleteMutation = useDeleteTask(id);
  const statusMutation = useUpdateTaskStatus(id);

  const onEdit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/dashboard/tasks/${id}/edit`;
  };

  const onDelete = (e: React.FormEvent) => {
    e.preventDefault();
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;
    deleteMutation.mutate();
  };

  const handleStatusUpdate = (newStatus: string) => {
    statusMutation.mutate(newStatus);
  };

  const renderStatusButton = () => {
    if (color === 'blue') {
      return (
        <button
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded-lg text-sm font-medium transition"
          onClick={() => handleStatusUpdate('InProgress')}
        >
          Start Task
        </button>
      );
    }

    if (color === 'orange') {
      return (
        <button
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-1.5 rounded-lg text-sm font-medium transition"
          onClick={() => handleStatusUpdate('Completed')}
        >
          Mark as Complete
        </button>
      );
    }

    return null;
  };

  const formattedDeadline = new Date(deadline).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <div
        className="rounded-lg border border-gray-200 p-4 shadow-sm bg-white dark:bg-gray-800 relative hover:shadow-md transition"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Deadline: {formattedDeadline}</p>
        </div>

        {renderStatusButton()}

        {showActions && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => setIsEditOpen(true)}
              className="text-blue-600 text-sm hover:underline"
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

      <EditTaskModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        task={{
          id,
          name,
          description,
          deadline,
          
          status: color === 'blue' ? 'Todo' : color === 'orange' ? 'In Progress' : 'Completed',
        }}
      />
    </>
  );
}
