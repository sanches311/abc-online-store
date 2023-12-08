import React, { useState } from 'react';
import classes from './CardProduct.module.scss';
import { IProduct } from '../../interfaces/products';
import RatingProduct from '../RatingProduct/RatingProduct';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import HeartSvg from '../../assets/icons/heart.svg';
import {
  addProductToCart,
  addProductToFavorites,
  toggleVisibleModalWindowEditColorSize,
  toggleVisibleModalWindowShoppingBag,
} from '../../store/userSlice';
import Button from '../buttons/Button';
import ShoppingBagSvg from '../../assets/icons/shopping-bag.svg';

type Props = {
  product: IProduct;
  updateProductAdded: (value: IProduct) => void;
  key: number;
};

const CardProduct: React.FC<Props> = ({ product, updateProductAdded }: Props) => {
  const dispatch = useAppDispatch();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

  const showModalWindowEditColorSize = () => {
    dispatch(toggleVisibleModalWindowEditColorSize(true));
  };
  const showModalShoppingBag = () => {
    dispatch(toggleVisibleModalWindowShoppingBag(true));
  };

  const addProduct = () => {
    const { id, image, title, price, description, category } = product;
    dispatch(
      addProductToCart({
        id,
        image,
        title,
        category,
        size,
        color,
        quantity: 1,
        price,
        description,
      })
    );
    showModalShoppingBag();
  };

  const handleOnClickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateProductAdded(product);
    if (product.category === "men's clothing" || product.category === "women's clothing") {
      if (size != null && color != null) {
        if (product) {
          addProduct();
          setColor(null);
          setSize(null);
        }
      } else showModalWindowEditColorSize();
    } else {
      if (product) {
        addProduct();
      }
    }
  };

  const addToFavorites = () => {
    if (product) {
      const { id, image, title, price, description, category } = product;
      dispatch(
        addProductToFavorites({
          id,
          image,
          description,
          category,
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
          </li>
          <li className={classes.wrapper_rating}>
            <RatingProduct rate={product.rating.rate}></RatingProduct>
            <div className={classes.small_text}>comments: {product.rating.count}</div>
          </li>
          <li className={classes.title}>{product.title}</li>
          <li className={classes.old_price}>${(product.price - 10).toFixed(2)}</li>
          <li className={classes.price}>Sale ${product.price}</li>
          <div className={classes.wrapper_btn}>
              <Button handleOnClick={(e) => handleOnClickBtn(e)}>
                <span>
                  <ShoppingBagSvg className={classes.shopping_bag_img_btn} />
                </span>
                <div className={classes.wrapper_text_into_btn}>
                  <span>Add To Bag</span>
                </div>
              </Button>
            </div>
        </ul>
      </NavLink>
    </>
  );
};

export default CardProduct;
