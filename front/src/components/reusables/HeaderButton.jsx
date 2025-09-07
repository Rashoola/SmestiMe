import React from 'react';

const HeaderButton = ({ title, action }) => {
  return (
    <button onClick={action}>{title}</button>
  );
};

export default HeaderButton;