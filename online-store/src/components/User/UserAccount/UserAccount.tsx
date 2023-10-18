import React from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { toggleUserLoginForm } from '../../../store/userSlice';
import classes from './UserAccount.module.scss';

const UserAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleOnClickLogIn = () => {
    dispatch(toggleUserLoginForm(true));
  };
  return (
    <div className={classes.user} onClick={handleOnClickLogIn}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        width="25px"
        height="25px"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    </div>
  );
};

export default UserAccount;
