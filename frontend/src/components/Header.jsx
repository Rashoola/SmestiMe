import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/Header.css';

const Header = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Clear any user-related data from localStorage or sessionStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Navigate the user back to the login page
    navigate('/', {replace: true});
  };

  return (
    <div className="header">
      <h1>{title}</h1>
      {location.pathname !== '/' && location.pathname !== '/register' && (
        <button onClick={handleLogout} style={{ backgroundColor: 'crimson' }}>
          Одјава
        </button>
      )}
    </div>
  );
};

export default Header;

