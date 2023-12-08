import React from 'react';
import classes from './NavPages.module.scss';
import { NavLink } from 'react-router-dom';

const NavPages: React.FC = () => {
  return (
    <nav>
      <NavLink to="/delivery" className={({ isActive }) => (isActive ? classes.active : '')}>
        Delivery
      </NavLink>
      <NavLink to="/payment" className={({ isActive }) => (isActive ? classes.active : '')}>
        Payment
      </NavLink>
      <NavLink to="/company" className={({ isActive }) => (isActive ? classes.active : '')}>
        Company
      </NavLink>
    </nav>
  );
};

export default NavPages;
