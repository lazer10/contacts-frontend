import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AdminDashboard = () => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('CONTACTS_TEST'))
      return history.push('/admin/login');
  });

  return (
    <div>
      <div className="headings-1 text-center mt-5">
        <h1>Welcome to your dashboard admin!!!!</h1>
        <h3>Good to have you</h3>
        <h5>Have a fun hahahahaha</h5>
      </div>
    </div>
  );
};

export default AdminDashboard;
