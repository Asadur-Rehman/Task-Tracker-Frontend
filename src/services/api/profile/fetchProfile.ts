interface User {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    createdAt: Date;
    updatedAt: Date;
    preferences?: {
        theme: 'light' | 'dark';
        tasksPerPage: number;
        defaultSort: 'dueDate' | 'priority' | 'createDate';
    };
}
    
export async function fetchUserProfile(): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');

    const localId = localStorage.getItem('localId');
    if (!localId) throw new Error('User not authenticated');

    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/users/${localId}`);


    if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(`Failed to fetch Profie Information: ${res.status} - ${errMsg}`);
    }

    const data = await res.json();


    return data;
}
