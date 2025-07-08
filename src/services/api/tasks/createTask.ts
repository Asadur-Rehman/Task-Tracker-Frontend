export interface CreateTaskInput {
    id: string;
    name: string;
    description: string;
    startDate: string;
    deadline: string;
    status: string;
  }
  
  export async function createTask(task: CreateTaskInput): Promise<void> {
    const res = await fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(task),
    });
  
    if (!res.ok) {
      throw new Error(`Failed to create task: ${res.statusText}`);
    }
  }
  