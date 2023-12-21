import React, { useRef } from 'react';
import classes from './UserMenu.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  delCurrentUser,
  toggleVisibleUserLoginForm,
  toggleVisibleUserMenu,
  toggleVisibleUserSignInForm,
  useGetUserQuery,
} from '../../../store/userSlice';
import useOnClickOutside from '../../../hooks/onClickOutSide';
import { Link, useNavigate } from 'react-router-dom';
import { changesDisplayPrice } from '../../../utils/utils';
import ClockSVG from '../../../assets/icons/clock.svg';
import ShoppingBagSVG from '../../../assets/icons/shopping-bag.svg';
import HeartSVG from '../../../assets/icons/heart.svg';

const UserMenu: React.FC = () => {
  const userMenu = useRef(null);
  const userId = useAppSelector((state) => state.user.currentUserId);
  const bag = useAppSelector((state) => state.user.cart);
  const wishList = useAppSelector((state) => state.user.wishlist.length);
  const countProducts = changesDisplayPrice(
    bag.reduce((sum, product) => sum + product.quantity, 0)
  );

  const dispatch = useAppDispatch();
  const visible = useAppSelector((state) => state.user.userMenu);
  const id = useAppSelector((state) => state.user.currentUserId);
  const { data } = useGetUserQuery(id, { skip: id === null });

  const navigate = useNavigate();

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
    } else navigate(`/orders/user/${userId}`);

    hideUserMenu();
  };
  const logOut = () => {
    dispatch(delCurrentUser());
  };
  useOnClickOutside(userMenu, hideUserMenu, visible);
  return (
    <div
      ref={userMenu}
      className={visible ? `${classes.wrapper} ${classes.active}` : `${classes.wrapper}`}
    >
      <ul className={classes.wrapper_menu}>
        <li>
          <span className={classes.text_bold}>
            Hello, {id === null ? 'Guest' : `${data?.username}`}!
          </span>
          <span className={classes.link} onClick={logOut}>
            Log out
          </span>
        </li>
        <li onClick={handleOnClickOrders}>
          <ClockSVG />
          <span className={classes.link}>My order history</span>
        </li>

        <li>
          <ShoppingBagSVG />
          <Link to="/bag">
            <span className={classes.link} onClick={hideUserMenu}>
              {countProducts} products in bag
            </span>
          </Link>
        </li>
        <li>
          <HeartSVG />
          <Link to="/wishlist">
            <span className={classes.link} onClick={hideUserMenu}>
              {wishList} products in wishList
            </span>
          </Link>
        </li>
        <li onClick={handleOnClickLogin} className={classes.link}>
          Log in
        </li>
        <li onClick={handleOnClickSignIn} className={classes.link}>
          Sign in
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
