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
import TableSize from '../TableSizes/TableSize';
import TableColor from '../TableColor/TableColor';

type Props = {
  product: IProduct;
  key: number;
};

const CardProduct: React.FC<Props> = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const updateSize = (value: string | null) => {
    setSize(value);
  };

  const updateColor = (value: string | null) => {
    setColor(value);
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
          setVisible(false);
          setColor(null);
          setSize(null);
        }
      } else setVisible(true);
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
        <div
          className={visible ? `${classes.wrapper_edit_color_size}` : `${classes.inactive}`}
          onClick={(e) => e.preventDefault()}
        >
          <TableSize updateSize={updateSize} size={size} />
          <TableColor updateColor={updateColor} color={color} />
        </div>
        <ToBagBtn addProduct={handleOnClickBtn} />
      </ul>
    </NavLink>
  );
};

export default CardProduct;
