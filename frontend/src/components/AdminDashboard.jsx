import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/AdminDashboard.css';
import Header from './Header';
import EventList from './EventList';
import EventCreationBox from './EventCreationBox';
import VenueCreationBox from './VenueCreationBox';

const AdminDashboard = () => {
  const location = useLocation();
  const admin = location.state?.admin;
  const [isEventBoxVisible, setEventBoxVisible] = useState(false);
  const [isVenueBoxVisible, setVenueBoxVisible] = useState(false);

  const handleCreateEventClick = () => {
    setEventBoxVisible(true);
  };

  const handleCloseEventBox = () => {
    setEventBoxVisible(false);
  };

  const handleCreateVenueClick = () => {
    setVenueBoxVisible(true);
  };

  const handleCloseVenueBox = () => {
    setVenueBoxVisible(false);
  };

  return (
    <>
      <Header title="СместиМе!"></Header>
      <div className={`container ${isEventBoxVisible ? 'blurred' : ''}`}>
        <div className="partition">
          <h1>Добродошли на страницу администратора, {admin?.name}!</h1>
          <p>На овој страници можете креирати нове догађаје и нова места одржавања истих.
            У листи ниже имате преглед свих креираних догађаја.
          </p>
          <div className="create-new-event">
            <button className="action-button" onClick={handleCreateEventClick}>
              Креирајте нови догађај
            </button>
          </div>
          <div className="manage-venues">
            <button className="action-button" onClick={handleCreateVenueClick}>Креирајте ново место одржавања</button>
          </div>
        </div>
        <EventList />
      </div>
      {isEventBoxVisible && <EventCreationBox onClose={handleCloseEventBox} />}
      {isVenueBoxVisible && <VenueCreationBox onClose={handleCloseVenueBox} />}
    </>
  );
};

export default AdminDashboard;