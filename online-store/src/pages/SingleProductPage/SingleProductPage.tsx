import React, { useEffect, useState } from 'react';
import classes from './SingleProductPage.module.scss';
import { setProductApp, useGetSingleProductQuery } from '../../store/apiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import RatingProduct from '../../components/RatingProduct/RatingProduct';
import TableSize from '../../components/TableSizes/TableSize';
import { useAppDispatch } from '../../hooks/redux';
import TableColor from '../../components/TableColor/TableColor';
import ToBagBtn from '../../components/buttons/ToBagBtn';
import { addProductToCart } from '../../store/userSlice';
import EditCount from '../../components/EditCount/EditCount';
import { useDebounce } from '../../hooks/debounce';

const SingleProductPage: React.FC = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const { data: product, isLoading, isSuccess } = useGetSingleProductQuery(id!);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const debouncedValue = useDebounce(quantity, 500);

  const incQuantity = () => {
    if (quantity < 99) setQuantity(quantity + 1);
    updateQuantity(quantity + 1);
  };
  const descQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
    updateQuantity(quantity - 1);
  };
  const handleOnChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(+e.target.value);
    if (+e.target.value > 99) setQuantity(99);
  };
  useEffect(() => {
    setQuantity(quantity);
  }, [debouncedValue]);

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

  const addProduct = () => {
    if (product) {
      const { id, image, title, price, description } = product;
      dispatch(
        addProductToCart({
          id,
          image,
          title,
          size: size,
          color: color,
          quantity: quantity,
          price,
          description,
        })
      );
    }
  };
  useEffect(() => {
    if (isSuccess && !product) navigate('/');
    if (product) dispatch(setProductApp([product]));
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
            <EditCount
              incQuantity={incQuantity}
              descQuantity={descQuantity}
              handleOnChangeQuantity={handleOnChangeQuantity}
              count={quantity}
            />
            <div className={classes.price}>{product?.price}$</div>
            <div className={classes.wrapper_btn}>
              <div className={classes.wrapper_to_bag_btn}>
                <ToBagBtn addProduct={addProduct} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductPage;
