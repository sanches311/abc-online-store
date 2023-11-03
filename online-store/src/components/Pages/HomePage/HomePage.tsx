import React, { useState } from 'react';
import classes from './HomePage.module.scss';
import { useGetProductsCategoryQuery } from '../../../store/apiSlice';
import { NavLink } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [index] = useState<number>(1);

  const { data: mensClothes } = useGetProductsCategoryQuery({
    category: "men's clothing",
    searchParams: { query: '', limit: '', sort: '' },
  });
  const { data: womensClothes } = useGetProductsCategoryQuery({
    category: "women's clothing",
    searchParams: { query: '', limit: '', sort: '' },
  });
  const { data: electronics } = useGetProductsCategoryQuery({
    category: 'electronics',
    searchParams: { query: '', limit: '', sort: '' },
  });
  const { data: jewelery } = useGetProductsCategoryQuery({
    category: 'jewelery',
    searchParams: { query: '', limit: '', sort: '' },
  });
  return (
    <div className={classes.wrapper}>
      <div className={classes.category}>
        <NavLink
          to="/men's clothing"
          className={`${classes.category_men_clothes} ${classes.category_box}`}
        >
          {mensClothes ? <img src={mensClothes[index].image} /> : ''}
          <div className={classes.category_title}> Mens clothing </div>
        </NavLink>
        <NavLink
          to="/women's clothing"
          className={`${classes.category_women_clothes} ${classes.category_box}`}
        >
          {womensClothes ? <img src={womensClothes[index].image} alt="" /> : ''}
          <div className={classes.category_title}> Women clothing </div>
        </NavLink>
        <NavLink
          to="/electronics"
          className={`${classes.category_electronics} ${classes.category_box}`}
        >
          {electronics ? <img src={electronics[index].image} alt="" /> : ' '}
          <div className={classes.category_title}> Electronics </div>
        </NavLink>
        <NavLink to="/jewelery" className={`${classes.category_jewelery} ${classes.category_box}`}>
          {jewelery ? <img src={jewelery[index].image} alt="" /> : ''}
          <div className={classes.category_title}> Jewelery </div>
        </NavLink>
      </div>
    </div>
  );
};
export default HomePage;
