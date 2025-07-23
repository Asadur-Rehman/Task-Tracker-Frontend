export interface CreateTaskInput {
    id?: string;
    name: string;
    description: string;
    startDate: string;
    deadline: string;
    status: string;
  }
  
  export async function createTask(task: CreateTaskInput): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
  
    if (!res.ok) {
      throw new Error(`Failed to create task: ${res.statusText}`);
    }
  }
  