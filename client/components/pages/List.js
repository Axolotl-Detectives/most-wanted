import React, { useState, useEffect } from 'react';
import '../../App.css';
import { getConvictsFromDb } from '../../async';
import CardItem from '../CardItem';

export default function List() {
  const [myConvicts, setMyConvicts] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getConvictsFromDb().then((data) => {
      console.log(data); //array of crim obj
      setMyConvicts(data);
      setLoad(false);
    });
  }, []);

  function renderMyConvicts() {
    return myConvicts.map((convict) => {
      return (
        <CardItem
          key={convict._uid}
          title={convict.title}
          images={convict.images}
          details={convict.details}
          reward_text={convict.reward_text}
          sex={convict.sex}
          hair_raw={convict.hair_raw}
          publication={convict.publication}
          url={convict.url}
          field_offices={convict.field_offices}
          criminal_id={convict.uid}
          path={`/profile/${convict.criminal_id}`}
        />
      );
    });
  }

  return (
    <section className='my-convicts'>{!load && renderMyConvicts()}</section>
  );
}
