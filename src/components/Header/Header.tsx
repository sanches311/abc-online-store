import * as React from 'react';
import classes from './Header.module.scss';
import NavCategories from '../NavCategories/NavCategories';
import InputSearchProduct from '../InputSearchProduct/InputSearchProduct';
import NavPages from '../NavPages/NavPages';
import Logo from '../Logo/Logo';
import UserBar from '../User/UserBar/UserBar';
import UserAvatar from '../User/UserAvatar/UserAvatar';

const Header: React.FC = () => {
  return (
    <>
      <header>
        <Logo />
        <div className={classes.search}>
          <InputSearchProduct />
        </div>
        <NavPages />
        <UserAvatar />
        <UserBar />
      </header>
      <NavCategories />
    </>
  );
};

export default Header;
