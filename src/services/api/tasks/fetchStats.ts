export async function fetchStats(): Promise<any> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/tasks/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      const errMsg = await res.text();
      throw new Error(`Failed to fetch total number of tasks: ${errMsg}`);
    }
  
    const data = await res.json();
    
    return data;
  }
  