import React from 'react';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Layers size={24} />
          <span className="text-xl font-bold">TaskCollab</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">Dashboard</Link></li>
            <li><Link to="/projects" className="hover:text-blue-200">Projects</Link></li>
            <li><Link to="/tasks" className="hover:text-blue-200">Tasks</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;