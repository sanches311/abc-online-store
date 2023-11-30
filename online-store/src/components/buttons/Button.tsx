import React from 'react';
import classes from './buttons.module.scss';

interface Props {
  children: React.ReactNode | string;
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ children, handleOnClick }) => {
  return (
    <button className={classes.btn} onClick={handleOnClick}>
      {children}
    </button>
  );
};

export default Button;
