import React from 'react';
import classes from './UserBar.module.scss';
import Cart from '../../Cart/Cart';
import Favorites from '../../Favorites/Favorites';
import UserAccount from '../UserAccount/UserAccount';

const UserBar: React.FC = () => {
  return (
    <div id="user_bar" className={classes.wrapper}>
      <UserAccount />
      <Favorites />
      <Cart />
    </div>
  );
};

export default UserBar;
