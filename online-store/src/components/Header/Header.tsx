import * as React from 'react';
import classes from './Header.module.scss';
import NavCategories from '../NavCategories/NavCategories';
import InputSearchProduct from '../InputSearchProduct/InputSearchProduct';
import NavPages from '../NavPages/NavPages';
import Logo from '../Logo/Logo';

const Header: React.FC = () => {
  return (
    <>
      <div className={classes.container}>
        <Logo />
        <div className={classes.search}>
          <InputSearchProduct />{' '}
        </div>
        <NavPages />
        <div className={classes.header_login}>
          <button className={classes.header_login_btn}>Log in</button>
          <button className={classes.header_sign_btn}>Sign up</button>
        </div>
        <div className={classes.cart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            width="25px"
            height="25px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
      </div>
      <NavCategories />
    </>
  );
};

export default Header;
