import * as React from 'react';
import classes from './Header.module.scss';
import NavCategories from '../NavCategories/NavCategories';
import InputSearchProduct from '../InputSearchProduct/InputSearchProduct';
import NavPages from '../NavPages/NavPages';
import Logo from '../Logo/Logo';
import Cart from '../Cart/Cart';
import Favorites from '../Favorites/Favorites';

const Header: React.FC = () => {
  return (
    <>
      <header>
        <Logo />
        <div className={classes.search}>
          <InputSearchProduct />{' '}
        </div>
        <NavPages />
        <div className={classes.header_login}>
          <button className={classes.header_login_btn}>Log in</button>
          <button className={classes.header_sign_btn}>Sign up</button>
        </div>
        <div id="user_bar" className={classes.top_profil}>
          <Favorites />
          <Cart />
        </div>
      </header>
      <NavCategories />
    </>
  );
};

export default Header;
