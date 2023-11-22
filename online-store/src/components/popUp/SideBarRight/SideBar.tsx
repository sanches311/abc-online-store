import React from 'react';
import classes from './SideBar.module.scss';

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
        <span className={classes.x} onClick={handleOnClick}></span>
        {children}
      </div>
    </div>
  );
};

export default SideBar;
