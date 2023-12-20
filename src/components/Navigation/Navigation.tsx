import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '../../store/apiSlice';
import classes from './Navigation.module.scss';

const Navigation: React.FC = () => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery();

  return (
    <nav className={classes.wrapper_nav}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${classes.nav_link} ${classes.active}` : classes.nav_link
        }
        to="/products"
      >
        All categories
      </NavLink>
      {isLoading
        ? ''
        : categories
        ? categories.map((category: string, index: number) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.nav_link} ${classes.active}` : classes.nav_link
              }
              key={index}
              to={`${category}`}
            >
              {category}
            </NavLink>
          ))
        : ''}
    </nav>
  );
};

export default Navigation;
