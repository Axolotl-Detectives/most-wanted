import React, { useState, useEffect } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import millerImg from '../images/Miller.jpg';
import britImg from '../images/brit.png';
import {
  getConvictsFromFBI,
  getConvictByFieldOffice,
  addConvictToDb,
} from '../async';

function Cards() {
  const [convicts, setConvicts] = useState([]);
  const [load, setLoad] = useState(true);

  const miller = {
    title: 'BIG BODY MILL',
    images: [{ original: 'https://i.imgur.com/6rOTAF5.jpg' }],
    details: 'Flexed way too hard',
    reward_text: '1 ON 1 SESSION WITH BIG BODY MILL HIMSELF',
    sex: '24/7',
    hair_raw: 'LUSCIOUS',
    publication: 'MILLER INC.',
    url: 'SHREDREADY.COM',
    field_offices: 'DA GYM',
    criminal_id: '123098135',
  };
  const brit = {
    title: 'BRIT',
    images: [{ original: 'https://i.imgur.com/n9WbzsT.png' }],
    details: 'Being taller than Michael Jordan',
    reward_text: 'Guide on how to become talelr',
    sex: '24/7',
    hair_raw: 'Always perfect',
    publication: 'BRIT INC.',
    url: 'SHREDREADY.COM',
    field_offices: 'DA GYM',
    criminal_id: '123091238135',
  };
  useEffect(() => {
    // examples of how to call our server.js from frontend
    getConvictsFromFBI().then((data) => {
      data.unshift(miller);
      data.unshift(brit);
      setConvicts(data);
      setLoad(false);
    });
    // getConvictByFieldOffice('dallas').then((data) => setConvicts(data));
  }, []);

  function handleClick(props) {
    const body = {
      title: props.title,
      images: props.images,
      details: props.details,
      reward_text: props.reward_text,
      sex: props.sex,
      hair_raw: props.hair_raw,
      publication: props.publication,
      url: props.url,
      field_offices: props.field_offices,
      criminal_id: props.criminal_id,
    };

    addConvictToDb(body).then((res) => {
      console.log('convict was added');
    });
  }

  const renderCards = () => {
    return convicts.map((convict) => {
      return (
        <CardItem
          title={convict.title}
          images={convict.images[0].original}
          details={convict.details}
          reward_text={convict.reward_text}
          sex={convict.sex}
          hair_raw={convict.hair_raw}
          publication={convict.publication}
          url={convict.url}
          field_offices={convict.field_offices}
          criminal_id={convict.uid}
          handleClick={handleClick}
          // this path should include template strings to interpolate the id into the path string
          path={`/profile/${convict.criminal_id}`}
        />
      );
    });
  };

  return (
    <div className='cards'>
      <h1>Have You Seen These Convicts</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>{!load && renderCards()}</div>
      </div>
    </div>
  );
}

export default Cards;
