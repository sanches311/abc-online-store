import React from 'react';
import classes from './UserAvatar.module.scss';
import { useAppSelector } from '../../../hooks/redux';

const UserAvatar: React.FC = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  return (
    <div className={classes.wrapper}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        height="25px"
        width="25px"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <span>{currentUser.length === 0 ? 'Guest' : `${currentUser[0].username}`}</span>
    </div>
  );
};

export default UserAvatar;
