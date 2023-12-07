import React from 'react';
import classes from './SideBar.module.scss';
import ClosePopUpBtn from '../../buttons/ClosePopUpBtn';

interface Props {
  children: React.ReactNode;
  handleOnClick: () => void;
  visible: boolean;
}

const SideBar: React.FC<Props> = ({ children, visible, handleOnClick }) => {
  return (
    <div
      className={
        visible ? `${classes.overlay} ${classes.active}` : `${classes.overlay} ${classes.inactive} `
      }
      onClick={handleOnClick}
    >
      <div className={classes.content} onClick={(event) => event.stopPropagation()}>
        <ClosePopUpBtn handleOnClick={handleOnClick} />
        {children}
      </div>
    </div>
  );
};

export default SideBar;
