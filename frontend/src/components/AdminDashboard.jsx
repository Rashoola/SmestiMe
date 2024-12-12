import React from 'react';
import { useLocation } from 'react-router-dom';
import '../style/AdminDashboard.css';
import Header from './Header';
import EventList from './EventList';

const AdminDashboard = () => {
  const location = useLocation();
  const admin = location.state?.admin;

  return (
    <>
      <Header title="СместиМе!"></Header>
      <div className="container">
        <div className="partition">
          <h1>Добродошли на страницу администратора, {admin?.name}!</h1>
          <div className="create-new-event">
            <button className="action-button">Креирајте нови догађај</button>
          </div>
          <div className="manage-venues">
            <button className="action-button">Управљајте местима одржавања</button>
          </div>
        </div>
        <EventList />
      </div>
    </>
  );
};

export default AdminDashboard;