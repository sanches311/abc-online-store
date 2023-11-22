import React from 'react';
import classes from './ModalWindow.module.scss';
import ClosePopUpBtn from '../../buttons/ClosePopUpBtn';

interface Props {
  children: React.ReactNode;
  visibleModalWindow: boolean;
  closeModalWindow: () => void;
}

const ModalWindow: React.FC<Props> = ({ children, visibleModalWindow, closeModalWindow }) => {
  return (
    <div
      className={visibleModalWindow ? `${classes.overlay} ${classes.active}` : classes.overlay}
      onClick={closeModalWindow}
    >
      <div
        className={classes.content}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <ClosePopUpBtn handleOnClick={closeModalWindow} />
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
