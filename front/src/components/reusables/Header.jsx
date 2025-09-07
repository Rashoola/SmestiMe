import React from 'react';
import HeaderButtonList from './HeaderButtonList';

const Header = ({ title, name, buttons }) => {
  return (
    <header>
      <h1>{title}</h1>
      <p>Prijavljeni administrator: {name}!</p>
      <HeaderButtonList buttons={buttons}/>
    </header>
  );
};

export default Header;