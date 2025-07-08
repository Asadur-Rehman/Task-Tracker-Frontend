'use client';

import { useTasks } from '../hooks/tasks/useTasks';

export default function TaskList() {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks</p>;

  return (
    <ul>
      {tasks.map((task: any) => (
        <li key={task.id}>
          <strong>{task.name}</strong> — {task.status}
        </li>
      ))}
    </ul>
  );
}
