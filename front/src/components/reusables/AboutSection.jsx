import React from 'react';
import '../../style/AboutSection.css';

const AboutSection = ({title, description}) => {
  return (
    <div className='about-section'>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
};

export default AboutSection;