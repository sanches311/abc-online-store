import React from 'react';
import classes from './UserBar.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { NavLink } from 'react-router-dom';
import ShoppingBagSvg from '../../../assets/icons/shopping-bag.svg';
import HeartSvg from '../../../assets/icons/heart.svg';
import UserSvg from '../../../assets/icons/user.svg';
import { toggleVisibleUserLoginForm } from '../../../store/userSlice';
import { changesDisplayPrice } from '../../../utils/utils';

const UserBar: React.FC = () => {
  const bag = useAppSelector((state) => state.user.cart);
  const wishList = useAppSelector((state) => state.user.favorites.length);
  const countProducts = changesDisplayPrice(
    bag.reduce((sum, product) => sum + product.quantity, 0)
  );
  const totalPrice = bag.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const dispatch = useAppDispatch();
  const handleOnClickLogIn = () => {
    dispatch(toggleVisibleUserLoginForm(true));
  };

  return (
    <div id="user_bar" className={classes.wrapper}>
      <div className={classes.wrapper_item_user_bar} onClick={handleOnClickLogIn}>
        <UserSvg className={classes.item_user_bar_svg} />
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
