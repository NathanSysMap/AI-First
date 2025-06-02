import React, { useState } from 'react';
import { Bell, Menu, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { Logo } from '../Logo';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { logout, user } = useAuth();

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/70 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center lg:hidden">
        <Button variant="ghost" size="sm" className="mr-2">
          <Menu size={20} />
        </Button>
        <Logo size="lg" />
      </div>

      <div className="hidden lg:block">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            3
          </span>
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2"
            onClick={toggleUserMenu}
          >
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <img src={user?.image} alt="avatar" className='rounded-full'/>
            </div>
            <span className="hidden md:inline-block">{user?.name}</span>
          </Button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 rounded-md bg-card shadow-lg ring-1 ring-slate-700 z-50 animate-fade-in">
              <div className="py-1">
                <div className="px-4 py-2 border-b border-slate-700">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-slate-400 truncate">
                    {user?.email}
                  </p>
                </div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-slate-800"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-slate-800"
                >
                  Settings
                </a>
                <div className="border-t border-slate-700">
                  <a
                    href="#"
                    onClick={() => logout()}
                    className="block px-4 py-2 text-sm text-danger hover:bg-slate-800 flex items-center"
                  >
                    <LogOut size={14} className="mr-2" />
                    Logout
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};