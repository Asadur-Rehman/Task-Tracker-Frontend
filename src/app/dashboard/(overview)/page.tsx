'use client';

import { useNumberOfTasks } from '@/src/hooks/tasks/useNumberOfTasks';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function Home() {

  const priorityData = [
    { name: 'High', value: 10 },
    { name: 'Medium', value: 15 },
    { name: 'Low', value: 7 },
  ];

  const COLORS = ['#EF4444', '#FBBF24', '#10B981'];

  const recentActivities = [
    'Created task: "Design UI"',
    'Completed task: "Fix bug #42"',
    'Updated task: "Write Docs"',
    'Started task: "Implement Auth"',
  ];

  const { data: totalTasks, isLoading, error } = useNumberOfTasks('userId');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Tasks"
          value={isLoading ? 'Loading...' : totalTasks?.toString() ?? '0'}
          color="bg-blue-500"
        />
        <StatCard title="Completed" value="18" color="bg-green-500" />
        <StatCard title="In Progress" value="10" color="bg-orange-400" />
        <StatCard title="To Do" value="4" color="bg-gray-500" />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Overdue" value="2" color="bg-red-500" />
        <StatCard title="Upcoming Deadlines" value="6" color="bg-yellow-400" />
        <StatCard title="Completion Rate" value="56%" color="bg-indigo-500" />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6 h-96">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Tasks by Priority</h2>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={priorityData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>


        <div className="bg-white rounded-2xl shadow-md p-6 h-96 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Recent Activity</h2>
          <ul className="space-y-3">
            {recentActivities.map((activity, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 bg-blue-50 p-3 rounded-xl border border-blue-100 shadow-sm"
              >
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className={`rounded-2xl shadow-lg p-6 text-white ${color} hover:scale-[1.03] transition-transform duration-200`}>
      <h3 className="text-sm font-medium uppercase tracking-wide">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
