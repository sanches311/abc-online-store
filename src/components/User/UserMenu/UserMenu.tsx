import React, { useRef } from 'react';
import classes from './UserMenu.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  toggleVisibleUserLoginForm,
  toggleVisibleUserMenu,
  toggleVisibleUserSignInForm,
  useGetUserQuery,
} from '../../../store/userSlice';
import useOnClickOutside from '../../../hooks/onClickOutSide';
import { Link } from 'react-router-dom';

const UserMenu: React.FC = () => {
  const userMenu = useRef(null);
  const userId = useAppSelector((state) => state.user.currentUserId);

  const dispatch = useAppDispatch();
  const visible = useAppSelector((state) => state.user.userMenu);
  const id = useAppSelector((state) => state.user.currentUserId);
  const { data } = useGetUserQuery(id, { skip: id === null });

  const showLogin = () => {
    dispatch(toggleVisibleUserLoginForm(true));
  };
  const showSignIn = () => {
    dispatch(toggleVisibleUserSignInForm(true));
  };
  const hideLogin = () => {
    dispatch(toggleVisibleUserLoginForm(false));
  };
  const hideSignIn = () => {
    dispatch(toggleVisibleUserSignInForm(false));
  };
  const hideUserMenu = () => {
    dispatch(toggleVisibleUserMenu(false));
  };
  const handleOnClickLogin = () => {
    showLogin();
    hideSignIn();
    hideUserMenu();
  };
  const handleOnClickSignIn = () => {
    showSignIn();
    hideLogin();
    hideUserMenu();
  };
  const handleOnClickOrders = () => {
    if (!userId) {
      showLogin();
    }

    hideUserMenu();
  };
  useOnClickOutside(userMenu, hideUserMenu, visible);
  return (
    <div
      ref={userMenu}
      className={visible ? `${classes.wrapper} ${classes.active}` : `${classes.wrapper}`}
    >
      <ul className={classes.wrapper_menu}>
        <li>Hello, {id === null ? 'Guest' : `${data?.username}`}! </li>
        <Link to={`/orders/user/${userId}`}>
          <li onClick={handleOnClickOrders}>My orders</li>
        </Link>
        <li onClick={handleOnClickLogin}>Log in</li>
        <li onClick={handleOnClickSignIn}>Sign in</li>
      </ul>
    </div>
  );
};

export default UserMenu;
