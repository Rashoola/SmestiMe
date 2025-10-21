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
    <Header title='Почетна страница' name={loggedUser.name + ' ' + loggedUser.surname} buttons = {buttonList}></Header>
    <div className='main'>
      <div className='main-content' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <strong style={{color: 'white', fontSize: 80, fontStyle: 'italic'}}>ФОН Догађаји</strong>
        <strong style={{color: 'white', fontSize: 40, fontStyle: 'italic', fontWeight: 'normal'}}>Ви бирате своје место</strong>
      </div>
    </div>
    <div>
    </div>
    </>
  );
};

export default Dashboard;