import * as React from 'react';
import classes from './Header.module.scss';
import InputSearchProduct from '../InputSearchProduct/InputSearchProduct';
import Logo from '../Logo/Logo';
import UserBar from '../User/UserBar/UserBar';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
const Header: React.FC = () => {
  return (
    <div className={classes.wrapper_header}>
      <header>
        <BurgerMenu />
        <Logo />
        <div className={classes.wrapper_input_search}>
          <InputSearchProduct />
        </div>
        <UserBar />
      </header>
      <div className={classes.wrapper_input_search_mobile}>
        <InputSearchProduct />
      </div>
    </div>
  );
};

export default Header;
