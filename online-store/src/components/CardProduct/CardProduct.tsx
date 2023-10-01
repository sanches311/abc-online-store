import React from 'react';
import classes from './CardProduct.module.scss';
import { IProduct } from '../../interfaces/products';
import RatingProduct from '../RatingProduct/RatingProduct';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { addProductToCart } from '../../store/userSlice';

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
          <img src={product.image} alt="image" />
        </li>
        <li className={classes.wrapper_rating}>
          <RatingProduct rate={product.rating.rate}></RatingProduct>
          <div className={classes.small_text}>coments: {product.rating.count}</div>
        </li>
        <li className={classes.title}>{product.title}</li>
        <li className={classes.price}>{product.price}$</li>
        <button
          className={classes.tocart_btn}
          onClick={(e) => {
            addToCart();
            e.preventDefault();
          }}
        >
          To cart
        </button>
      </div>
    </NavLink>
  );
};

export default CardProduct;
