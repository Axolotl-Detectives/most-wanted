import React, { useState, useEffect } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import defaultImg from '../images/Miller.jpg'
import { getConvictsFromFBI, getConvictByFieldOffice } from '../async';

function Cards() {
  const [convicts, setConvicts] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    // examples of how to call our server.js from frontend
    // getConvictsFromFBI().then(data => setConvicts(data));
    getConvictByFieldOffice('dallas').then(data => setConvicts(data));

    
    setLoad(false);
  }, [])

  const renderCards = () => {
    console.log(convicts);
    return convicts.map(convict => {
      console.log(convict);
      return (
        <CardItem
          src={defaultImg}
          text={convict?.title}
          lable={convict?.title}
          path='/profile'
        />
      )
    })
  }

  return (
    <div className='cards'>
      <h1>Have You Seen These Convicts</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          {!load && renderCards()}
        </div>
      </div>
    </div>
  );
}

export default Cards;
