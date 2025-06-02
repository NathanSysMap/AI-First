import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo } from '../Logo';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Logo size="lg" />
          <p className="mt-2 text-slate-400">
            Sales assistant powered by AI
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};