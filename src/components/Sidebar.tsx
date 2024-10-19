
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Briefcase, CheckSquare, Users, Settings } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/projects" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
              <Briefcase size={20} />
              <span>Projects</span>
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
              <CheckSquare size={20} />
              <span>Tasks</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;