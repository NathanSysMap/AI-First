import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import { AuthLayout } from './components/layout/AuthLayout';
import { AppLayout } from './components/layout/AppLayout';

// Auth Pages
import Login from './pages/auth/Login';
import EmployeeRegistration from './pages/auth/EmployeeRegistration';
import CompanyRegistration from './pages/auth/CompanyRegistration';
import ForgotPassword from './pages/auth/ForgotPassword';

// App Pages
import Dashboard from './pages/app/Dashboard';
import Orders from './pages/app/Orders';
import ProductCatalog from './pages/app/ProductCatalog';
import AIAssistantConfig from './pages/app/AIAssistantConfig';
import CompanyData from './pages/app/CompanyData';
import EmployeeData from './pages/app/EmployeeData';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="employee-registration" element={<EmployeeRegistration />} />
            <Route path="register-company" element={<CompanyRegistration />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="first-login" element={<EmployeeRegistration />} />
            <Route index element={<Navigate to="/auth/login" replace />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<AppLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<ProductCatalog />} />
              <Route path="ai-assistant" element={<AIAssistantConfig />} />
              <Route path="company" element={<CompanyData />} />
              <Route path="employees" element={<EmployeeData />} />
              <Route index element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>


          {/* Redirect to login for any other route */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;