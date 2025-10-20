import React from 'react';
import Header from '../reusables/Header';
import { useNavigate } from 'react-router-dom';
import AboutSection from '../reusables/AboutSection';
import '../../style/General.css';

const AdminDashboard = () => {
    const loggedAdmin = JSON.parse(localStorage.getItem("loggedUser"));
    const navigate = useNavigate();

    const headerButtons = [
    { title: "Догађаји", action: () => navigate("/events") },
    { title: "Места", action: () => navigate("/venues") },
  ];

  return (
    <>
    <Header title="главна страница" name={loggedAdmin.name + " " + loggedAdmin.surname} buttons={headerButtons}/>
    <div className='main'>
         <div className='main-content' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <strong style={{color: 'white', fontSize: 80, fontStyle: 'italic'}}>Организујте са лакоћом</strong>
         </div>
    </div>
    </>
  );
};

export default AdminDashboard;