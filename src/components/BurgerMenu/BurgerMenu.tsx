import React, { useState } from 'react';
import classes from './BurgerMenu.module.scss';
import { useGetAllCategoriesQuery } from '../../store/apiSlice';
import { Link } from 'react-router-dom';

const BurgerMenu: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const { data: categories, isError, isSuccess, isLoading } = useGetAllCategoriesQuery();

  return (
    <div className={classes.menu}>
      <label className={classes.burger}>
        <input
          type="checkbox"
          className={classes.checkbox}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        ></input>
      </label>
      <div className={classes.wrapper_menu_list}>
        <div className={classes.menu_list}>
          {!isError && isSuccess && !isLoading
            ? categories.map((category: string) => (
                <Link to={category} key={category} onClick={() => setChecked(false)}>
                  <div className={classes.wrapper_category}>
                    <div className={classes.wrapper_img}>
                      <img src={`/image/${category}.jpg`} alt="image" />
                    </div>
                    <div>{category}</div>
                  </div>
                </Link>
              ))
            : ''}
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
