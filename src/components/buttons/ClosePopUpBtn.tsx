import React from 'react';
import classes from './buttons.module.scss';

interface Props {
  handleOnClick: () => void;
}

const ClosePopUpBtn: React.FC<Props> = ({ handleOnClick }) => {
  return <span className={classes.x} onClick={handleOnClick}></span>;
};

export default ClosePopUpBtn;
