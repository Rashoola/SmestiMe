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
        <AboutSection
         title="Главна страница администратора"
         description="Ова страница је полазна тачка система. У менију у заглављу налазе се 
         картице преко којих можете приступити страницама за уређивање догађаја и места на којима се 
         исти одржавају."
         />
         <div className='main-content'>
            <img src="" alt="" />
         </div>
    </div>
    </>
  );
};

export default AdminDashboard;