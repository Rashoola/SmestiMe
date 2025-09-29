import React from 'react';
import HeaderButtonList from './HeaderButtonList';
import '../../style/Header.css';

const Header = ({ title, name, buttons }) => {
  return (
    <header>
      <h1>{title}</h1>
      <strong>Prijavljeni korisnik: {name}</strong>
      <HeaderButtonList buttons={buttons}/>
    </header>
  );
};

export default Header;