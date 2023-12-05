import * as React from 'react';
import classes from './Header.module.scss';
import NavCategories from '../NavCategories/NavCategories';
import InputSearchProduct from '../InputSearchProduct/InputSearchProduct';
import Logo from '../Logo/Logo';
import UserBar from '../User/UserBar/UserBar';
const Header: React.FC = () => {
  return (
    <>
      <header>
        <Logo />
        <div className={classes.wrapper_search}>
          <InputSearchProduct />
        </div>
        <UserBar />
      </header>
      <NavCategories />
    </>
  );
};

export default Header;
