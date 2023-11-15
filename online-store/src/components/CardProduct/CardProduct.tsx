import React from 'react';
import classes from './CardProduct.module.scss';
import { IProduct } from '../../interfaces/products';
import RatingProduct from '../RatingProduct/RatingProduct';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import HeartSvg from '../../assets/icons/heart.svg';
import { addProductToCart, addProductToFavorites } from '../../store/userSlice';
import ToBagBtn from '../buttons/ToBagBtn';
import { useSnackbar } from 'notistack';

type Props = {
  product: IProduct;
  key: number;
};

const CardProduct: React.FC<Props> = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const addProduct = () => {
    if (product) {
      const { id, image, title, price, description } = product;
      dispatch(
        addProductToCart({
          id,
          image,
          title,
          size: null,
          color: null,
          quantity: 1,
          price,
          description,
        })
      );
      enqueueSnackbar(`${title} Added To Bag`, {
        variant: 'success',
        autoHideDuration: 1500,
      });
    }
  };

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
      <ul className={classes.card}>
        <li className={classes.wrapper_img}>
          <HeartSvg
            className={classes.heartIcon}
            onClick={(e: React.MouseEvent<SVGElement>) => {
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
        <ToBagBtn addProduct={addProduct} />
      </ul>
    </NavLink>
  );
};

export default CardProduct;
