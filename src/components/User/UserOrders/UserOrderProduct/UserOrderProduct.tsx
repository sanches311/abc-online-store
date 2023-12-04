import React, { useEffect } from 'react';
import { Product } from '../../../../interfaces/cart';
import { useGetSingleProductQuery } from '../../../../store/apiSlice';
import classes from './UserOrderProduct.module.scss';
interface Props extends Product {
  key: string;
  updateTotalPrice: (value: number) => void;
}

const UserOrderProduct: React.FC<Props> = ({ productId, quantity, updateTotalPrice }) => {
  const {
    data: product,
    isFetching,
    isLoading,
    isSuccess,
    isError,
  } = useGetSingleProductQuery(productId.toString(), { skip: !productId });
  useEffect(() => {
    if (isSuccess) {
      updateTotalPrice(Number(product.price) * Number(quantity));
    }
  }, [product]);
  return (
    <div>
      {isFetching && isLoading ? (
        <div>Loading...</div>
      ) : isSuccess && !isError ? (
        <div className={classes.wrapper}>
          <div className={classes.wrapper_img}>
            <img src={product.image} alt="image" />
          </div>
          <div className={classes.wrapper_desc}>
            <div className={classes.bold_text}>{product.title}</div>
            <div className={classes.small_text}>Price: ${product.price}</div>
            <div className={classes.small_text}>Quantity: {quantity}</div>
          </div>
        </div>
      ) : isSuccess && isError ? (
        <div>Error</div>
      ) : (
        ''
      )}
    </div>
  );
};

export default UserOrderProduct;
