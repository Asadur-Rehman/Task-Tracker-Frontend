import { useUserContext } from "@/src/contexts/UserContext";

export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  userId: string;
  startDate: FirestoreTimestamp;
  deadline: FirestoreTimestamp;
}

export interface ParsedTask {
  id: string;
  name: string;
  description: string;
  status: string;
  userId: string;
  startDate: string;
  deadline: string;
}

export interface PaginatedTaskResponse {
  tasks: ParsedTask[];
  nextCursor: string | null;
}

function parseTimestamp(ts: FirestoreTimestamp): string {
  return new Date(ts._seconds * 1000).toISOString();
}

// const user = useUserContext();

export async function fetchPaginatedTasksByStatus(
  status: 'Todo' | 'InProgress' | 'Completed',
  cursor?: string,
  limit: number = 4
): Promise<PaginatedTaskResponse> {

  
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const params = new URLSearchParams({ status, limit: limit.toString() });
  if (cursor) params.append('cursor', cursor);

  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/tasks/status/paginated?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching tasks for ${status}: ${response.statusText}`);
  }


  const data = await response.json();

  const parsedTasks: ParsedTask[] = data.tasks.map((task: Task) => ({
    ...task,
    startDate: parseTimestamp(task.startDate),
    deadline: parseTimestamp(task.deadline),
  }));

  return {
    tasks: parsedTasks,
    nextCursor: data.nextCursor,
  };
}
