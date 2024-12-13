import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/AdminDashboard.css';
import Header from './Header';
import EventList from './EventList';
import EventCreationBox from './EventCreationBox';

const AdminDashboard = () => {
  const location = useLocation();
  const admin = location.state?.admin;
  const [isEventBoxVisible, setEventBoxVisible] = useState(false);

  const handleCreateEventClick = () => {
    setEventBoxVisible(true);
  };

  const handleCloseEventBox = () => {
    setEventBoxVisible(false);
  };

  return (
    <>
      <Header title="СместиМе!"></Header>
      <div className={`container ${isEventBoxVisible ? 'blurred' : ''}`}>
        <div className="partition">
          <h1>Добродошли на страницу администратора, {admin?.name}!</h1>
          <div className="create-new-event">
            <button className="action-button" onClick={handleCreateEventClick}>
              Креирајте нови догађај
            </button>
          </div>
          <div className="manage-venues">
            <button className="action-button">Управљајте местима одржавања</button>
          </div>
        </div>
        <EventList />
      </div>
      {isEventBoxVisible && <EventCreationBox onClose={handleCloseEventBox} />}
    </>
  );
};

export default AdminDashboard;