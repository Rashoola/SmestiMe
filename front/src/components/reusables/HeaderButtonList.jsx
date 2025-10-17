import React from 'react';
import HeaderButton from './HeaderButton';
import { useNavigate, useLocation } from 'react-router-dom';

const HeaderButtonList = ({ buttons }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <ul className='nav'>
      {buttons.map((btn, index) => (
        <li>
        <HeaderButton 
          key={index} 
          title={btn.title} 
          action={btn.action} 
        />
        </li>
      ))}
      {!['/', '/registration'].includes(location.pathname) && (
        <li>
          <button
            style={{
              backgroundColor: 'red',
              color: 'white',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/', { replace: true })}
          >
            Одјава
          </button>
        </li>
      )}
    </ul>
  );
};

export default HeaderButtonList;
