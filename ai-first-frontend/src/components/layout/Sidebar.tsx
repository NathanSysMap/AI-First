import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  Database,
  Brain,
} from 'lucide-react';
import Logo from '../Logo';
import { useAuth } from '../../context/AuthContext';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  return (
    <aside className="hidden lg:flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-900/70">
      <div className="p-4 border-b border-slate-800">
        <Logo />
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-1">
          <SidebarLink
            to="/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />
          <SidebarLink
            to="/orders"
            icon={<ShoppingBag size={18} />}
            label="Orders"
          />
          <SidebarLink
            to="/products"
            icon={<Package size={18} />}
            label="Products"
          />
          <SidebarLink
            to="/ai-assistant"
            icon={<Brain size={18} />}
            label="AI Assistant"
          />
          <SidebarLink
            to="/company"
            icon={<Database size={18} />}
            label="Company Data"
          />
          <SidebarLink
            to="/employees"
            icon={<Users size={18} />}
            label="Employees"
          />
          <SidebarLink
            to="/settings"
            icon={<Settings size={18} />}
            label="Settings"
          />
        </div>
      </nav>
      <div className="p-4 border-t border-slate-800 bg-slate-800/50">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Users size={16} className="text-primary" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{user?.companyName}</p>
            <p className="text-xs text-slate-400">Professional Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
};