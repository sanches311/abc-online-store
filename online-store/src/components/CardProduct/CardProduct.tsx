import React from 'react';
import classes from './CardProduct.module.scss';
import { IProduct } from '../../interfaces/products';
import RatingProduct from '../RatingProduct/RatingProduct';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import HeartSvg from '../../assets/icons/heart.svg';
import { addProductToFavorites } from '../../store/userSlice';
import ToBagBtn from '../buttons/ToBagBtn';

type Props = {
  product: IProduct;
  key: number;
};

const CardProduct: React.FC<Props> = ({ product }: Props) => {
  const dispatch = useAppDispatch();

  const addToFavorites = () => {
    if (product) {
      dispatch(
        addProductToFavorites({
          id: Date.now(),
          image: product.image,
          description: product.description,
          title: product.title,
          quantity: 1,
          price: product.price,
        })
      );
    }
  };
  return (
    <NavLink to={`/products/${product.id}`}>
      <div className={classes.card}>
        <li className={classes.wrapper_img}>
          <HeartSvg
            className={classes.heartIcon}
            onClick={(e: React.SyntheticEvent<SVGAElement>) => {
              e.preventDefault();
              addToFavorites();
            }}
          />
          <img src={product.image} alt="image" />
        </li>
        <li className={classes.wrapper_rating}>
          <RatingProduct rate={product.rating.rate}></RatingProduct>
          <div className={classes.small_text}>comments: {product.rating.count}</div>
        </li>
        <li className={classes.title}>{product.title}</li>
        <li className={classes.price}>{product.price}$</li>
        <ToBagBtn product={product} />
      </div>
    </NavLink>
  );
};

export default CardProduct;
