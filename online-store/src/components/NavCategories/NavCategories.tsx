import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '../../store/apiSlice';
import classes from './NavCategories.module.scss';

const NavCategories = () => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery();

  return (
    <div className={classes.wrapper}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${classes.nav_link} ${classes.active}` : classes.nav_link
        }
        to="/products"
      >
        All
      </NavLink>
      {isLoading
        ? 'Loading...'
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
    </div>
  );
};

export default NavCategories;
