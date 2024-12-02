import React from 'react';
import { Users, Calendar, Settings, Briefcase } from 'lucide-react';

interface SidebarProps {
  currentView: 'schedule' | 'resources' | 'projects' | 'settings';
  onViewChange: (view: 'schedule' | 'resources' | 'projects' | 'settings') => void;
}

const Sidebar = ({ currentView, onViewChange }: SidebarProps) => {
  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-8">
        <Users className="w-6 h-6 text-indigo-600" />
        <h1 className="text-xl font-bold text-gray-800">ResourceHub</h1>
      </div>
      
      <nav className="space-y-2">
        <NavItem
          icon={<Calendar />}
          text="Schedule"
          active={currentView === 'schedule'}
          onClick={() => onViewChange('schedule')}
        />
        <NavItem
          icon={<Users />}
          text="Resources"
          active={currentView === 'resources'}
          onClick={() => onViewChange('resources')}
        />
        <NavItem
          icon={<Briefcase />}
          text="Projects"
          active={currentView === 'projects'}
          onClick={() => onViewChange('projects')}
        />
        <NavItem
          icon={<Settings />}
          text="Settings"
          active={currentView === 'settings'}
          onClick={() => onViewChange('settings')}
        />
      </nav>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, text, active = false, onClick }: NavItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer ${
        active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
};

export default Sidebar;