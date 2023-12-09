import React, { useRef, useState } from 'react';
import classes from './BurgerMenu.module.scss';
import { useGetAllCategoriesQuery } from '../../store/apiSlice';
import { Link } from 'react-router-dom';
import useOnClickOutside from '../../hooks/onClickOutSide';
import { changesDisplayPrice, upperFirstLetter } from '../../utils/utils';
import { useAppSelector } from '../../hooks/redux';

import BagSVG from '../../assets/icons/shopping-bag.svg';
import HeartSVG from '../../assets/icons/heart.svg';
import FacebookSVG from '../../assets/icons/social_media/facebook.svg';
import LinkedinSVG from '../../assets/icons/social_media/linkedin.svg';
import YoutubeSVG from '../../assets/icons/social_media/youtube.svg';
import InstagramSVG from '../../assets/icons/social_media/instagram.svg';
import { FaGithub } from 'react-icons/fa';
import { BsTelephone } from 'react-icons/bs';

const BurgerMenu: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const { data: categories, isError, isSuccess, isLoading } = useGetAllCategoriesQuery();
  const bag = useAppSelector((state) => state.user.cart);
  const countProductswishList = useAppSelector((state) => state.user.favorites.length);
  const countProductsBag = changesDisplayPrice(
    bag.reduce((sum, product) => sum + product.quantity, 0)
  );
  const burgerMenu = useRef(null);
  const hideBurgerMenu = () => {
    setChecked(false);
  };
  const {} = useAppSelector((state) => state.user.cart);
  useOnClickOutside(burgerMenu, hideBurgerMenu, checked);

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
      <div className={classes.overlay}>
        <div className={classes.wrapper_menu_list} ref={burgerMenu}>
          <ul className={classes.menu_list}>
            <Link to="/products" onClick={() => setChecked(false)}>
              <li>All categories</li>
            </Link>
            {!isError && isSuccess && !isLoading
              ? categories.map((category: string) => (
                  <Link to={category} key={category} onClick={() => setChecked(false)}>
                    <li>{upperFirstLetter(category)}</li>
                  </Link>
                ))
              : ''}
            <Link to="/bag" onClick={() => setChecked(false)}>
              <li>
                <BagSVG /> Bag shopping <span className={classes.circle}>{countProductsBag}</span>
              </li>
            </Link>
            <Link to="/wishlist" onClick={() => setChecked(false)}>
              <li>
                <HeartSVG />
                Wishlist <span className={classes.circle}>{countProductswishList}</span>
              </li>
            </Link>
            <Link to="tel:">
              <li>
                <BsTelephone /> +375295138467
              </li>
            </Link>
          </ul>
          <div className={classes.wrapper_social_media}>
            <FacebookSVG style={{ height: '25px', width: '25px' }} />
            <YoutubeSVG style={{ height: '25px', width: '25px' }} />
            <Link to="https://www.linkedin.com/in/alexandrnaumenok/">
              <LinkedinSVG style={{ height: '25px', width: '25px' }} />
            </Link>
            <InstagramSVG style={{ height: '25px', width: '25px' }} />
            <Link to="https://github.com/sanches311">
              <FaGithub style={{ height: '25px', width: '25px' }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
