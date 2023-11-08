import * as React from 'react';
import classes from './CartProduct.module.scss';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import {
  delProductCart,
  descProductQuantity,
  incProductQuantity,
  setProductQuantity,
} from '../../store/userSlice';
import { ICart } from '../../store/userSlice';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/debounce';
import ShippingSvg from '../../assets/icons/shipping.svg';
import TrashSvg from '../../assets/icons/trash.svg';
import EditCount from '../EditCount/EditCount';

interface Props {
  key: string;
  product: ICart;
}

const CartProduct: React.FC<Props> = ({ product }) => {
  const { id, title, image, quantity, size, price, color } = product;
  const [count, setCount] = useState<number>(quantity);
  const debouncedValue = useDebounce(count, 500);
  const currentDate = new Date();
  const shippingDay = new Date(+currentDate + 24 * 3 * 3600 * 1000);
  const month = shippingDay.toLocaleString('default', { month: 'long' });
  const weekday = shippingDay.toLocaleString('default', { weekday: 'long' });
  const day = shippingDay.getDate();
  const dispatch = useAppDispatch();

  const delProduct = () => {
    dispatch(delProductCart(product));
  };
  const incQuantity = () => {
    if (quantity < 99) setCount(quantity - 1);
    setCount(quantity + 1);
    dispatch(incProductQuantity(product));
  };
  const descQuantity = () => {
    if (quantity > 1) setCount(quantity - 1);
    dispatch(descProductQuantity(product));
  };
  const handleOnChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > 99) setCount(99);
    else setCount(+e.target.value);
  };
  useEffect(() => {
    setQuantity(count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const setQuantity = (quantity: number) => {
    dispatch(setProductQuantity({ product, quantity }));
  };
  return (
    <li className={classes.wrapper_product}>
      <NavLink to={`/products/${id}`} className={classes.first_cell}>
        <div className={classes.wrapper_product_img}>
          <img src={image} alt="image product" />
        </div>
        <div className={classes.description}>
          <div className={classes.title}>{title}</div>
          {size && <div className={classes.size}>Size: {size}</div>}
          {color && <div className={classes.size}>Color: {color}</div>}
          <div className={classes.shipping_info}>
            <ShippingSvg />
            <span className={classes.small_text}>
              Standard Shipping Receive by {weekday}, {month} {day}
            </span>
          </div>
        </div>
      </NavLink>
      <div className={classes.product_edit}>
        <TrashSvg className={classes.trash_img} onClick={() => delProduct()} />
        <div>
          <EditCount
            descQuantity={descQuantity}
            incQuantity={incQuantity}
            handleOnChangeQuantity={handleOnChangeQuantity}
            count={count}
          />
          <div className={classes.small_text}>{price} usd/pc.</div>
        </div>
      </div>
      <div className={classes.price}>${(price * quantity).toFixed(2)}</div>
    </li>
  );
};

export default CartProduct;
