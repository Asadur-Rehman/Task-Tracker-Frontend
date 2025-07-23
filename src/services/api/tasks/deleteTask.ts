export async function deleteTask(taskId: string): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Failed to delete task: ${res.status} - ${msg}`);
    }
  }
  