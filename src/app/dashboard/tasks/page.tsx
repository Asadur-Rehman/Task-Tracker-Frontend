'use client';

import TaskColumn from '@/src/ui/tasks/TaskColumn';
import { PlusIcon } from '@heroicons/react/24/outline';

const handleCreate = (e: React.FormEvent) => {
  e.preventDefault();
  // alert(`Logged in as: ${email} (simulated)`);
  window.location.href = "/dashboard/tasks/create";
};

export default function TasksPage() {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
        <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition" onClick={handleCreate}>
          <PlusIcon className="h-5 w-5" />
          Create Task
        </button>
      </div>

      {/* Side-by-side columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskColumn title="To Do" color="blue" />
        <TaskColumn title="In Progress" color="orange" />
        <TaskColumn title="Completed" color="green" />
      </div>
    </main>
  );
}
