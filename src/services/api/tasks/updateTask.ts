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
    const res = await fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
  