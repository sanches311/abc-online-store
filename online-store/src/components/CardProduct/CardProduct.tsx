import React from 'react';
import classes from './CardProduct.module.scss';
import { IProduct } from '../../interfaces/products';
import RatingProduct from '../RatingProduct/RatingProduct';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { addProductToCart, addProductToFavorites } from '../../store/userSlice';

type Props = {
  product: IProduct;
  key: number;
};

const CardProduct: React.FC<Props> = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const addToCart = () => {
    if (product) {
      dispatch(
        addProductToCart({
          id: product.id,
          img: product.image,
          title: product.title,
          quantity: 1,
          price: product.price,
          description: product.description,
        })
      );
    }
  };
  const addToFavorites = () => {
    if (product) {
      dispatch(
        addProductToFavorites({
          id: Date.now(),
          img: product.image,
          description: product.description,
          title: product.title,
          quantity: 1,
          price: product.price,
        })
      );
    }
  };
  return (
    <NavLink to={`products/${product.id}`}>
      <div className={classes.card}>
        <li className={classes.wrapper_img}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="fill"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={classes.heartIcon}
            onClick={(e) => {
              e.preventDefault();
              addToFavorites();
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <img src={product.image} alt="image" />
        </li>
        <li className={classes.wrapper_rating}>
          <RatingProduct rate={product.rating.rate}></RatingProduct>
          <div className={classes.small_text}>comments: {product.rating.count}</div>
        </li>
        <li className={classes.title}>{product.title}</li>
        <li className={classes.price}>{product.price}$</li>
        <button
          className={classes.cart_btn}
          onClick={(e) => {
            e.preventDefault();
            addToCart();
          }}
        >
          To cart
        </button>
      </div>
    </NavLink>
  );
};

export default CardProduct;
