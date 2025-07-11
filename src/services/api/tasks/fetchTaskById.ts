export interface Task {
    id: string;
    name: string;
    description: string;
    deadline: string;
    status: string;
  }
  
  export async function fetchTaskById(taskId: string): Promise<Task> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  

    if (!res.ok) {
      const errMsg = await res.text();
      throw new Error(`Failed to fetch task: ${res.status} - ${errMsg}`);
    }
  
    const data = await res.json();

    return data;
  }
  