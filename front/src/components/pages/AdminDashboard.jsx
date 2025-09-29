import React from 'react';
import Header from '../reusables/Header';
import { useNavigate } from 'react-router-dom';
import AboutSection from '../reusables/AboutSection';
import '../../style/General.css';

const AdminDashboard = () => {
    const loggedAdmin = JSON.parse(localStorage.getItem("loggedUser"));
    const navigate = useNavigate();

    const headerButtons = [
    { title: "Dogadjaji", action: () => navigate("/events") },
    { title: "Mesta", action: () => navigate("/venues") },
  ];

  return (
    <>
    <Header title="FON Events Manager" name={loggedAdmin.name + " " + loggedAdmin.surname} buttons={headerButtons}/>
    <div className='main'>
        <AboutSection
         title="Dobrodošli na glavnu stranicu administratora!"
         description="Ova stranica je polazna tacka rada na sistemu. 
         U meniju koji se nalazi vise, mozete odabrati sa cime zelite da radite."
         />
         <div className='main-content'>
            <img src="" alt="" />
         </div>
    </div>
    </>
  );
};

export default AdminDashboard;