export interface Task {
    id: string;
    name: string;
    description: string;
    deadline: string;
  }
  
  export async function fetchTasksByStatus(status: 'todo' | 'inprogress' | 'completed'): Promise<Task[]> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');

    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/tasks/${status}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching tasks for ${status}: ${response.statusText}`);
    }
  
    return response.json();
  }
  