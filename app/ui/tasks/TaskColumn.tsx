import TaskTile from "./TaskTile";

interface TaskColumnProps {
    title: string;
    color: 'blue' | 'yellow' | 'green';
  }
  
  export default function TaskColumn({ title, color }: TaskColumnProps) {
    const borderColor = {
      blue: 'border-blue-400',
      yellow: 'border-yellow-400',
      green: 'border-green-400',
    }[color];
  
    const titleColor = {
      blue: 'text-blue-600',
      yellow: 'text-yellow-600',
      green: 'text-green-600',
    }[color];
  
    return (
      <div className={`flex flex-col rounded-lg border-2 ${borderColor} bg-white p-4 shadow-sm min-h-[500px]`}>
        <h2 className={`text-lg font-semibold ${titleColor} mb-4`}>
          {title}
        </h2>
  
        <div className="flex flex-col gap-4">
          {/* Dummy Task Cards */}
          <TaskTile id="123" name="Sample Task Title" description="Short description goes here." />
          <TaskTile id="123" name="Another Task" description="Details about this task." />
        </div>
      </div>
    );
  }
  