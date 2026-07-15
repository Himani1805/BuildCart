import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Materials from './pages/Materials';
import Cart from './pages/Cart';
import Orders from './pages/Orders';               // 1. Orders Import
import OrderDetails from './pages/OrderDetails';   // 2. Order Details Import
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="materials" element={<Materials />} />
            <Route path="cart" element={<Cart />} />

            {/* 3. Orders and Details Dynamic Params Routing Setup */}
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:orderId" element={<OrderDetails />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;