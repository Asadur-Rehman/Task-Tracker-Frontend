export interface UpdateTaskInput {
    taskId: string;
    name: string;
    description: string;
    deadline: string;
    status: string;
  }
  
  export async function updateTask({
    taskId,
    ...task
  }: UpdateTaskInput & { taskId: string }): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...task,
        startDate: new Date().toISOString(),
      }),
    });
  
    if (!res.ok) {
      throw new Error(`Failed to update task: ${res.statusText}`);
    }
  }
  