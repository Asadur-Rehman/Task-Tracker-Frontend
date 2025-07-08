export async function updateTaskStatus(taskId: string, newStatus: string): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');
  
    const res = await fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
  
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Failed to update task status: ${res.status} - ${msg}`);
    }
  }
  