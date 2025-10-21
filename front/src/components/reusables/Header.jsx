import React from 'react';
import HeaderButtonList from './HeaderButtonList';
import '../../style/Header.css';

const Header = ({ title, name, buttons }) => {
  return (
    <header>
      <h1 style={{fontSize: 35}}>{title}</h1>
      {name?
        <strong>Пријављени корисник: {name}</strong> : null
      }
      
      <HeaderButtonList buttons={buttons}/>
    </header>
  );
};

export default Header;