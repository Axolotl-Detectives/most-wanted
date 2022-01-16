import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import defaultImg from '../images/Miller.jpg'

function Cards() {
  return (
    <div className='cards'>
      <h1>Have You Seen These Convicts</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={defaultImg}
              text='Card'
              label='Profile'
              path='/profile'
            />
            <CardItem
              src={defaultImg}
              text='Card'
              label='Profile'
              path='/profile'
            />    
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
