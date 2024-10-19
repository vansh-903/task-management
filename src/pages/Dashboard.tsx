import React from 'react';
import { Briefcase, CheckSquare, Users, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard icon={<Briefcase />} title="Active Projects" value="12" />
        <DashboardCard icon={<CheckSquare />} title="Pending Tasks" value="34" />
        <DashboardCard icon={<Users />} title="Team Members" value="8" />
        <DashboardCard icon={<Clock />} title="Hours Logged" value="120" />
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          <li>John updated Task A in Project X</li>
          <li>Sarah completed Task B in Project Y</li>
          <li>New project "Z" created by Mike</li>
        </ul>
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
      <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;