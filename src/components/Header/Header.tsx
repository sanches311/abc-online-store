import * as React from 'react';
import classes from './Header.module.scss';
import NavCategories from '../NavCategories/NavCategories';
import InputSearchProduct from '../InputSearchProduct/InputSearchProduct';
import Logo from '../Logo/Logo';
import UserBar from '../User/UserBar/UserBar';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
const Header: React.FC = () => {
  return (
    <>
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

      <NavCategories />
    </>
  );
};

export default Header;
