import React from 'react';
import classes from './buttons.module.scss';

interface Props {
  isUninitialized: boolean;
  isError: boolean;
  isSuccess: boolean;
  name: string;
}

const LogInSignInBtn: React.FC<Props> = ({ isUninitialized, isError, isSuccess, name }) => {
  return (
    <button className={classes.btn}>
      {isUninitialized || isError || isSuccess ? name : 'Processing..'}
    </button>
  );
};

export default LogInSignInBtn;
