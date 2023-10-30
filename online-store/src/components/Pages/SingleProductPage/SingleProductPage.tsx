import React, { useEffect, useState } from 'react';
import classes from './SingleProductPage.module.scss';
import { setProductApp, useGetSingleProductQuery } from '../../../store/apiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import RatingProduct from '../../RatingProduct/RatingProduct';
import TableSize from '../../TableSizes/TableSize';
import { useAppDispatch } from '../../../hooks/redux';
import { addProductToCart } from '../../../store/userSlice';
import CounterProduct from '../../CounterProduct/CounterProduct';
import TableColor from '../../TableColor/TableColor';

const SingleProductPage: React.FC = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const { data: product, isLoading, isSuccess } = useGetSingleProductQuery(id!);
  const [size, setSize] = useState<string | null>();
  const [color, setColor] = useState<string>();
  const [quantity, setQuantity] = useState<number>(1);
  useEffect(() => {
    if (product) dispatch(setProductApp([product]));
  });

  const updateSize = (size: string | null) => {
    setSize(size);
  };
  const updateColor = (color: string) => {
    setColor(color);
  };
  const updateQuantity = (quantity: number) => {
    setQuantity(quantity);
  };

  const dispatch = useAppDispatch();
  const addToCart = () => {
    if (product) {
      dispatch(
        addProductToCart({
          id: product.id,
          title: product.title,
          img: product.image,
          description: product.description,
          size: size,
          color: color,
          quantity: quantity,
          price: product.price,
        })
      );
    }
  };

  useEffect(() => {
    if (isSuccess && !product) navigate('/');
  });

  return (
    <div className={classes.wrapper_page}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.Layout_2_column}>
          <div className={classes.wrapper_img}>
            <img src={product?.image} alt="image" />
          </div>
          <div className={classes.wrapper_desc}>
            <h1 className={classes.title}>{product?.title}</h1>
            <div className={classes.desc}>{product?.description}</div>
            <div className={classes.wrapper_rate}>
              {product ? <RatingProduct rate={product.rating.rate} /> : ''}
              <div className={classes.rate}>{product?.rating.rate}</div>
              <div className={classes.comments}>comments: {product?.rating.count}</div>
            </div>
            {product?.category === "women's clothing" || product?.category === "men's clothing" ? (
              <>
                <TableSize updateSize={updateSize} />
                <TableColor updateColor={updateColor} />
              </>
            ) : (
              ''
            )}
            <CounterProduct updateQuantity={updateQuantity} />
            <div className={classes.price}>{product?.price}$</div>
            <div className={classes.wrapper_buy_btn}>
              <button className={classes.buy_btn} onClick={addToCart}>
                To cart
              </button>
              <button className={classes.buy_btn}>Buy now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductPage;
