import React from 'react';
import HeaderButton from './HeaderButton';

const HeaderButtonList = ({ buttons }) => {
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
    </ul>
  );
};

export default HeaderButtonList;
