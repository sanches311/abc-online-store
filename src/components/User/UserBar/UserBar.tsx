import React, { useRef } from 'react';
import classes from './UserBar.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { NavLink } from 'react-router-dom';
import ShoppingBagSvg from '../../../assets/icons/shopping-bag.svg';
import HeartSvg from '../../../assets/icons/heart.svg';
import { toggleVisibleUserMenu } from '../../../store/userSlice';
import { changesDisplayPrice } from '../../../utils/utils';
import UserMenu from '../UserMenu/UserMenu';
import UserAvatar from '../UserAvatar/UserAvatar';
import ChevronDownSVG from '../../../assets/icons/chevron-down.svg';
import useOnClickOutside from '../../../hooks/onClickOutSide';

const UserBar: React.FC = () => {
  const toggle = useRef(null);
  const userMenu = useRef(null);
  const bag = useAppSelector((state) => state.user.cart);
  const wishList = useAppSelector((state) => state.user.wishlist.length);
  const countProducts = changesDisplayPrice(
    bag.reduce((sum, product) => sum + product.quantity, 0)
  );
  const totalPrice = bag.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const dispatch = useAppDispatch();
  const visibleUserMenu = useAppSelector((state) => state.user.userMenu);
  const hideUserMenu = () => {
    dispatch(toggleVisibleUserMenu(false));
  };
  const handleOnClickUser = () => {
    dispatch(toggleVisibleUserMenu(!visibleUserMenu));
  };
  useOnClickOutside(hideUserMenu, visibleUserMenu, userMenu, toggle);

  return (
    <div id="user_bar" className={classes.wrapper}>
      <div className={classes.wrapper_item_user_bar}>
        <UserAvatar />
        <div onClick={handleOnClickUser} ref={toggle}>
          <ChevronDownSVG
            className={visibleUserMenu ? classes.chevron_top : classes.chevron_down}
          />
        </div>
        <div ref={userMenu}>
          <UserMenu />
        </div>
      </div>
      <NavLink to="wishlist" className={classes.wrapper_item_user_bar}>
        <div className={classes.wishlist}>
          <HeartSvg className={classes.item_user_bar_svg} />
          {wishList ? <span className={classes.circle}>{wishList}</span> : ''}
        </div>
      </NavLink>
      <NavLink to="bag" className={classes.wrapper_item_user_bar}>
        <div className={classes.shopping_bag}>
          <ShoppingBagSvg className={classes.item_user_bar_svg} />
          <span className={classes.circle}>{countProducts}</span>
        </div>
      </NavLink>
      <span className={classes.price}>{totalPrice.toFixed(2)}$</span>
    </div>
  );
};

export default UserBar;
