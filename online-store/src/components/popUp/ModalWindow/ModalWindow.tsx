import React from 'react';
import classes from './ModalWindow.module.scss';
import ClosePopUpBtn from '../../buttons/ClosePopUpBtn';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleVisibleModalWindow } from '../../../store/userSlice';

interface Props {
  children: React.ReactNode;
}

const ModalWindow: React.FC<Props> = ({ children }) => {
  const visibleModalWindow = useAppSelector((state) => state.user.visibleModalWindow);
  const dispatch = useAppDispatch();
  const closeModalWindow = () => {
    dispatch(toggleVisibleModalWindow(false));
  };
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
