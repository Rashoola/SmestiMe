import React from 'react';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import {useNavigate} from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const buttonList = [
    {title: 'Моји догађаји', action: ()=>navigate(`/participant/${loggedUser.id}/events`)}
  ];
  return (
    <>
    <Header title='почетна страница' name={loggedUser.name + ' ' + loggedUser.surname} buttons = {buttonList}></Header>
    <div className='main'>
      <div className='main-content'></div>
    </div>
    <div>
    </div>
    </>
  );
};

export default Dashboard;