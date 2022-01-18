import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/Police.mp4' autoPlay loop muted />
      <h1>FBI Most Wanted</h1>
   
      </div>

  );
}

export default HeroSection;
