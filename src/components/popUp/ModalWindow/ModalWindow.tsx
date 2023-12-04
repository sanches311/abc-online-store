import React from 'react';
import classes from './ModalWindow.module.scss';
import ClosePopUpBtn from '../../buttons/ClosePopUpBtn';

interface Props {
  children: React.ReactNode;
  visibleModalWindow: boolean;
  justifyContent: string;
  alignItems: string;
  hideModalWindow: () => void;
}

const ModalWindow: React.FC<Props> = ({
  children,
  visibleModalWindow,
  hideModalWindow,
  justifyContent,
  alignItems,
}) => {
  return (
    <div
      className={visibleModalWindow ? `${classes.overlay} ${classes.active}` : classes.overlay}
      style={{ justifyContent: justifyContent, alignItems: alignItems }}
      onClick={hideModalWindow}
    >
      <div
        className={classes.content}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <ClosePopUpBtn handleOnClick={hideModalWindow} />
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
