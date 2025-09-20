import React from 'react';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import {useNavigate} from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const buttonList = [
    {title: 'Dogadjaji', action: ()=>navigate(`/participant/${loggedUser.id}/events`)}
  ];
  return (
    <>
    <Header title='FON Event Manager' name={loggedUser.name} buttons = {buttonList}></Header>
    <div className='main'>
      <AboutSection title='Stranica pocetna' description=''></AboutSection>
      <div className='main-content'></div>
    </div>
    <div>
    </div>
    </>
  );
};

export default Dashboard;