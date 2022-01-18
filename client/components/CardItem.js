import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <>
      <div className='card_item'>
        <figure className='cards__item__pic-wrap' data-category={props.label}>
          <img
            className='cards__item__img'
            alt='Travel Image'
            src={props.images}
          />
        </figure>
        <div className='cards__item__info'>
          <h5 className='cards__item__text'>{props.title}</h5>
          <h5>Sex: {props.sex}</h5>
          <h5></h5>
        </div>
        <div className='button_wrapper'>
          <button
            onClick={() => props.handleClick(props)}
            className='button is-primary is-outlined'
          >
            Add
          </button>
          <Link className='button is-info is-outlined' to={props.path}>
            View Profile
          </Link>
        </div>
      </div>
    </>
  );
}

export default CardItem;
