'use client';

import { useQuery } from '@tanstack/react-query';
import TaskTile from './TaskTile';
import { fetchTasksByStatus, Task } from '../../services/api/tasks/fetchTasksByStatus';

interface TaskColumnProps {
  title: string;
  color: 'blue' | 'orange' | 'green';
}



export default function TaskColumn({ title, color }: TaskColumnProps) {
  const borderColor = {
    blue: 'border-blue-400',
    orange: 'border-orange-400',
    green: 'border-green-400',
  }[color];

  const titleColor = {
    blue: 'text-blue-600',
    orange: 'text-orange-600',
    green: 'text-green-600',
  }[color];

  const taskStatus = {'blue': 'todo', 'orange': 'inprogress', 'green': 'completed'}

  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['tasks', color],
    queryFn: () => fetchTasksByStatus(taskStatus[color] as 'todo' | 'inprogress' | 'completed'),
  });

  return (
    <div className={`flex flex-col rounded-lg border-2 ${borderColor} bg-white p-4 shadow-sm min-h-[500px]`}>
      <h2 className={`text-lg font-semibold ${titleColor} mb-4`}>{title}</h2>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <p className="text-gray-400 italic">Loading tasks...</p>
        ) : isError ? (
          <p className="text-red-500 italic">Error: {(error as Error).message}</p>
        ) : tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskTile
              key={task.id}
              id={task.id}
              name={task.name}
              description={task.description}
              deadline={task.deadline}
              color={color}
            />
          ))
        ) : (
          <p className="text-gray-400 italic">No tasks to show</p>
        )}
      </div>
    </div>
  );
}
