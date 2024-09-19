import React from 'react';
import AdminNav from './AdminNav';
import AdminDashboard from './AdminDashboard';

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminNav />
      <div className="ml-64 p-8 w-full">
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminLayout;
