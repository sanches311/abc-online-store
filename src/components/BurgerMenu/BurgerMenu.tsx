import React, { useMemo, useRef, useState } from 'react';
import classes from './BurgerMenu.module.scss';
import { useGetAllCategoriesQuery } from '../../store/apiSlice';
import { Link } from 'react-router-dom';
import useOnClickOutside from '../../hooks/onClickOutSide';
import { changesDisplayPrice, upperFirstLetter } from '../../utils/utils';
import { useAppSelector } from '../../hooks/redux';

import BagSVG from '../../assets/icons/shopping-bag.svg';
import HeartSVG from '../../assets/icons/heart.svg';

import { BsTelephone } from 'react-icons/bs';
import useSwipe from '../../hooks/swipe';
import { RxTriangleRight } from 'react-icons/rx';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { CiLocationOn } from 'react-icons/ci';
import SocialNetworkBox from '../SocialNetworkBox/SocialNetworkBox';

const BurgerMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openContact, setOpenContact] = useState<boolean>(false);

  const { data: categories, isError, isSuccess, isLoading } = useGetAllCategoriesQuery();
  const bag = useAppSelector((state) => state.user.cart);
  const countProductsWishList = useAppSelector((state) => state.user.wishlist.length);
  const countProductsBag = useMemo(
    () => changesDisplayPrice(bag.reduce((sum, product) => sum + product.quantity, 0)),
    [bag]
  );
  const burgerMenu = useRef(null);
  const hideBurgerMenu = () => {
    setOpen(false);
    setOpenContact(false);
  };

  useOnClickOutside(hideBurgerMenu, open, burgerMenu);
  useSwipe(hideBurgerMenu, open);

  return (
    <div className={classes.menu}>
      <label className={classes.burger}>
        <input
          type="checkbox"
          id="toggle-burger"
          className={classes.checkbox}
          checked={open}
          onChange={() => setOpen(!open)}
        ></input>
      </label>
      <div className={`${classes.overlay} ${open ? classes.active_overlay : ''}`}>
        <div
          className={`${classes.content} ${open ? classes.active_content : ''}`}
          ref={burgerMenu}
        >
          <nav className={classes.navigate}>
            <li>
              <Link to="/products" onClick={hideBurgerMenu}>
                All categories
              </Link>
            </li>

            {!isError && isSuccess && !isLoading
              ? categories.map((category: string) => (
                  <li key={category}>
                    <Link to={category} onClick={hideBurgerMenu}>
                      {upperFirstLetter(category)}
                    </Link>
                  </li>
                ))
              : ''}
            <li>
              <Link to="/bag" onClick={hideBurgerMenu}>
                <BagSVG /> Bag shopping <span className={classes.circle}>{countProductsBag}</span>
              </Link>
            </li>
            <li>
              <Link to="/wishlist" onClick={hideBurgerMenu}>
                <HeartSVG />
                Wishlist <span className={classes.circle}>{countProductsWishList}</span>
              </Link>
            </li>
            <li>
              <Link to="tel:">
                <BsTelephone /> +375295138467
              </Link>
            </li>
            <li className={classes.nested_link}>
              <CiLocationOn /> Contact information
              <RxTriangleRight onClick={() => setOpenContact(true)} />
            </li>
          </nav>
          <div className={classes.wrapper_social_media}>
            <SocialNetworkBox />
          </div>
          <div
            className={`${classes.content} ${
              openContact ? `${classes.active_content} ${classes.left_right}` : classes.right_left
            }`}
          >
            <nav className={classes.navigate}>
              <li
                className={classes.back}
                onClick={() => {
                  setOpenContact(false), setOpen(true);
                }}
              >
                <IoIosArrowRoundBack /> Back
              </li>
              <li>Petrova, 20 220034 Minsk Belarus</li>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
