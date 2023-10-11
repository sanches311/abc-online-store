import * as React from 'react';
import classes from './Header.module.scss';
import NavCategories from '../NavCategories/NavCategories';
import InputSearchProduct from '../InputSearchProduct/InputSearchProduct';
import NavPages from '../NavPages/NavPages';
import Logo from '../Logo/Logo';
import Cart from '../Cart/Cart';

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
          <div className={classes.favorites}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="fill"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={classes.heartIcon}
              onClick={() => {}}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>
          <Cart />
        </div>
      </header>
      <NavCategories />
    </>
  );
};

export default Header;
