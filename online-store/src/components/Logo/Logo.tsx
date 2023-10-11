import React from 'react';
import classes from './Logo.module.scss';
import { NavLink } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <NavLink to="/">
      <h1 className={classes.logo}>Online-Store</h1>
    </NavLink>
  );
};

export default Logo;
