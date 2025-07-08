export interface Task {
    id: string;
    name: string;
    description: string;
    deadline: string;
  }
  
  export async function fetchTasksByStatus(status: 'blue' | 'orange' | 'green'): Promise<Task[]> {
    const response = await fetch(`http://localhost:8000/tasks/${status}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching tasks for ${status}: ${response.statusText}`);
    }
  
    return response.json();
  }
  