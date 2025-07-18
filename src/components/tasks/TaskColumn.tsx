'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import TaskTile from './TaskTile';
import {
  fetchPaginatedTasksByStatus,
  ParsedTask,
} from '../../services/api/tasks/fetchTasksByStatus';
import { useUserContext } from '@/src/contexts/UserContext';

interface TaskColumnProps {
  title: string;
  color: 'blue' | 'orange' | 'green';
}

export default function TaskColumn({ title, color }: TaskColumnProps) {
  const {user} = useUserContext();
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

  const taskStatus = {
    blue: 'Todo',
    orange: 'InProgress',
    green: 'Completed',
  }[color] as 'Todo' | 'InProgress' | 'Completed';

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    { tasks: ParsedTask[]; nextCursor: string | null },
    Error
  >({
    queryKey: ['tasks', color],
    queryFn: ({ pageParam }) =>
      fetchPaginatedTasksByStatus(taskStatus, pageParam as string | undefined, user?.preferences?.tasksPerPage, user?.preferences?.defaultSort),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  

  const tasks = data?.pages.flatMap((page) => page.tasks) ?? [];

  return (
    <div
      className={`flex flex-col rounded-lg border-2 ${borderColor} bg-white p-4 shadow-sm min-h-[500px]`}
    >
      <h2 className={`text-lg font-semibold ${titleColor} mb-4`}>{title}</h2>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <p className="text-gray-400 italic">Loading tasks...</p>
        ) : isError ? (
          <p className="text-red-500 italic">Error: {error.message}</p>
        ) : tasks.length > 0 ? (
          <>
            {tasks.map((task) => (
              <TaskTile
                key={task.id}
                id={task.id}
                name={task.name}
                description={task.description}
                deadline={task.deadline}
                color={color}
              />
            ))}
            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="mt-4 px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                {isFetchingNextPage ? 'Loading more...' : 'Load More'}
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-400 italic">No tasks to show</p>
        )}
      </div>
    </div>
  );
}
