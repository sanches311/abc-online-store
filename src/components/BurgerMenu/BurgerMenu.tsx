import React from 'react';
import classes from './Burger.module.scss';

const BurgerMenu: React.FC = () => {
  return (
    <div className={classes.wrapper_burger_menu} onClick={() => {}}>
      <div className={classes.burger}>
        <span className={classes.burger_line}></span>
      </div>
    </div>
  );
};

export default BurgerMenu;
