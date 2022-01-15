import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Have You Seen These Convicts</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/Miller.jpeg'
              text='Card'
              label='Hotel'
              path='/services'
            />
            <CardItem
              src='images/Miller.jpeg'
              text='Card'
              label='Airlines'
              path='/Airline'
            />
          
          

          
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
