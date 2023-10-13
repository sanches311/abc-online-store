import React from 'react';
import classes from './Favorites.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { NavLink } from 'react-router-dom';

const Fovorites: React.FC = () => {
  const favorites = useAppSelector((state) => state.user.favorites.length);
  return (
    <div className={classes.favorites}>
      <NavLink to="favorites">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="fill"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={classes.heartIcon}
          onClick={() => {}}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </NavLink>

      {favorites ? <span className={classes.counter}>{favorites}</span> : ''}
    </div>
  );
};

export default Fovorites;
