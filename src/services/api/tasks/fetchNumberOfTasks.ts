export async function fetchNumberOfTasks(): Promise<number> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/tasks/number`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      const errMsg = await res.text();
      throw new Error(`Failed to fetch total number of tasks: ${errMsg}`);
    }
  
    const data = await res.text();
  
    const number = parseInt(data, 10);
  
    if (isNaN(number)) {
      throw new Error('Invalid number returned from backend');
    }
  
    return number;
  }
  