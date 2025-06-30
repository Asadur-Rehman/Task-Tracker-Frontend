'use client';

import { useEffect, useState } from 'react';
import TaskTile from './TaskTile';

interface Task {
  id: string;
  name: string;
  description: string;
}

interface TaskColumnProps {
  title: string;
  color: 'blue' | 'orange' | 'green';
}

export default function TaskColumn({ title, color }: TaskColumnProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const borderColor = {
    blue: 'border-blue-400',
    orange: 'border-orange-400',
    green: 'border-green-400',
  }[color];

  const titleColor = {
    blue: 'text-blue-600',
    orange: 'text-orange-600',
    green: 'text-green-600',
  }[color];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:8000/tasks/${color}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(`Failed to fetch ${color} tasks:`, error);
      }
    };

    fetchTasks();
  }, [color]);

  return (
    <div className={`flex flex-col rounded-lg border-2 ${borderColor} bg-white p-4 shadow-sm min-h-[500px]`}>
      <h2 className={`text-lg font-semibold ${titleColor} mb-4`}>
        {title}
      </h2>

      <div className="flex flex-col gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskTile
              key={task.id}
              id={task.id}
              name={task.name}
              description={task.description}
              color={color}
            />
          ))
        ) : (
          <p className="text-gray-400 italic">No tasks to show</p>
        )}
      </div>
    </div>
  );
}
