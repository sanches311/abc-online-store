import React, { useState } from 'react';
import classes from './CardProduct.module.scss';
import { IProduct } from '../../interfaces/products';
import RatingProduct from '../RatingProduct/RatingProduct';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import HeartSvg from '../../assets/icons/heart.svg';
import { addProductToCart, addProductToFavorites } from '../../store/userSlice';
import ToBagBtn from '../buttons/ToBagBtn';
import { useSnackbar } from 'notistack';
import ModalWindow from '../popUp/ModalWindow/ModalWindow';
import FormAddProduct from '../FormAddProduct/FormAddProduct';

type Props = {
  product: IProduct;
  key: number;
};

const CardProduct: React.FC<Props> = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
  const closeModalWindow = () => {
    setVisibleModalWindow(false);
  };

  const addProduct = () => {
    const { id, image, title, price, description } = product;
    dispatch(
      addProductToCart({
        id,
        image,
        title,
        size,
        color,
        quantity: 1,
        price,
        description,
      })
    );
    enqueueSnackbar(`${title} Added To Bag`, {
      variant: 'success',
      autoHideDuration: 1500,
    });
  };

  const handleOnClickBtn = () => {
    if (product.category === "men's clothing" || product.category === "women's clothing") {
      if (size != null && color != null) {
        if (product) {
          addProduct();
          setColor(null);
          setSize(null);
        }
      } else setVisibleModalWindow(true);
    } else {
      if (product) {
        addProduct();
      }
    }
  };

  const addToFavorites = () => {
    if (product) {
      const { id, image, title, price, description } = product;
      dispatch(
        addProductToFavorites({
          id,
          image,
          description,
          title,
          quantity: 1,
          price,
        })
      );
    }
  };
  return (
    <>
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
            <div className={classes.wrapper_btn}>
              <ToBagBtn addProduct={handleOnClickBtn} />
            </div>
          </li>
          <li className={classes.wrapper_rating}>
            <RatingProduct rate={product.rating.rate}></RatingProduct>
            <div className={classes.small_text}>comments: {product.rating.count}</div>
          </li>
          <li className={classes.title}>{product.title}</li>
          <li className={classes.old_price}>${(product.price - 10).toFixed(2)}</li>
          <li className={classes.price}>Sale ${product.price}</li>
        </ul>
      </NavLink>
      <ModalWindow closeModalWindow={closeModalWindow} visibleModalWindow={visibleModalWindow}>
        <FormAddProduct product={product} />
      </ModalWindow>
    </>
  );
};

export default CardProduct;
