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

interface Props {
  key: number;
  product: ICart;
}

const CartProduct: React.FC<Props> = (props) => {
  const { id, title, img, quantity, size, price, color } = props.product;
  const [count, setCount] = useState<number>(quantity);
  const debouncedValue = useDebounce(count, 500);
  const currentDate = new Date();
  const shippingDay = new Date(+currentDate + 24 * 3 * 3600 * 1000);
  const month = shippingDay.toLocaleString('default', { month: 'long' });
  const weekday = shippingDay.toLocaleString('default', { weekday: 'long' });
  const day = shippingDay.getDay();
  const dispatch = useAppDispatch();
  const delProduct = (product: ICart) => {
    dispatch(delProductCart(product));
  };
  const incQuantity = (product: ICart) => {
    dispatch(incProductQuantity(product));
  };
  const descQuantity = (product: ICart) => {
    dispatch(descProductQuantity(product));
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > 99) setCount(99);
    else setCount(+e.target.value);
  };
  useEffect(() => {
    if (count === 0) setCount(1);
    setQuantity(count);
  }, [debouncedValue]);
  const setQuantity = (quantity: number) => {
    const product = props.product;
    dispatch(setProductQuantity({ product, quantity }));
  };
  return (
    <li className={classes.wrapper_product}>
      <NavLink to={`/products/${id}`} className={classes.first_cell}>
        <div className={classes.wrapper_product_img}>
          <img src={img} alt="image product" />
        </div>
        <div className={classes.description}>
          <div className={classes.title}>{title}</div>
          {size && <div className={classes.size}>Size: {size}</div>}
          {color && <div className={classes.size}>Color: {color}</div>}
          <div className={classes.shipping_info}>
            <svg
              fill="#000000"
              height="20px"
              width="20px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 491.1 491.1"
              xmlSpace="preserve"
            >
              <g transform="translate(0 -540.36)">
                <g>
                  <g>
                    <path
                      d="M401.5,863.31c-12,0-23.4,4.7-32,13.2c-8.6,8.6-13.4,19.8-13.4,31.8s4.7,23.2,13.4,31.8c8.7,8.5,20,13.2,32,13.2
				c24.6,0,44.6-20.2,44.6-45S426.1,863.31,401.5,863.31z M401.5,933.31c-13.8,0-25.4-11.4-25.4-25s11.6-25,25.4-25
				c13.6,0,24.6,11.2,24.6,25S415.1,933.31,401.5,933.31z"
                    />
                    <path
                      d="M413.1,713.41c-1.8-1.7-4.2-2.6-6.7-2.6h-51.3c-5.5,0-10,4.5-10,10v82c0,5.5,4.5,10,10,10h81.4c5.5,0,10-4.5,10-10v-54.9
				c0-2.8-1.2-5.5-3.3-7.4L413.1,713.41z M426.5,792.81h-61.4v-62.1h37.4l24,21.6V792.81z"
                    />
                    <path
                      d="M157.3,863.31c-12,0-23.4,4.7-32,13.2c-8.6,8.6-13.4,19.8-13.4,31.8s4.7,23.2,13.4,31.8c8.7,8.5,20,13.2,32,13.2
				c24.6,0,44.6-20.2,44.6-45S181.9,863.31,157.3,863.31z M157.3,933.31c-13.8,0-25.4-11.4-25.4-25s11.6-25,25.4-25
				c13.6,0,24.6,11.2,24.6,25S170.9,933.31,157.3,933.31z"
                    />
                    <path
                      d="M90.6,875.61H70.5v-26.6c0-5.5-4.5-10-10-10s-10,4.5-10,10v36.6c0,5.5,4.5,10,10,10h30.1c5.5,0,10-4.5,10-10
				S96.1,875.61,90.6,875.61z"
                    />
                    <path d="M141.3,821.11c0-5.5-4.5-10-10-10H10c-5.5,0-10,4.5-10,10s4.5,10,10,10h121.3C136.8,831.11,141.3,826.71,141.3,821.11z" />
                    <path
                      d="M30.3,785.01l121.3,0.7c5.5,0,10-4.4,10.1-9.9c0.1-5.6-4.4-10.1-9.9-10.1l-121.3-0.7c-0.1,0-0.1,0-0.1,0
				c-5.5,0-10,4.4-10,9.9C20.3,780.51,24.8,785.01,30.3,785.01z"
                    />
                    <path d="M50.7,739.61H172c5.5,0,10-4.5,10-10s-4.5-10-10-10H50.7c-5.5,0-10,4.5-10,10S45.2,739.61,50.7,739.61z" />
                    <path
                      d="M487.4,726.11L487.4,726.11l-71.6-59.3c-1.8-1.5-4-2.3-6.4-2.3h-84.2v-36c0-5.5-4.5-10-10-10H60.5c-5.5,0-10,4.5-10,10
				v73.2c0,5.5,4.5,10,10,10s10-4.5,10-10v-63.2h234.8v237.1h-82c-5.5,0-10,4.5-10,10s4.5,10,10,10h122.1c5.5,0,10-4.5,10-10
				s-4.5-10-10-10h-20.1v-191.1h80.6l65.2,54l-0.7,136.9H460c-5.5,0-10,4.5-10,10s4.5,10,10,10h20.3c5.5,0,10-4.4,10-9.9l0.8-151.6
				C491,730.91,489.7,728.01,487.4,726.11z"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <span className={classes.small_text}>
              Standard Shipping Receive by {weekday}, {month} {day}
            </span>
          </div>
        </div>
      </NavLink>
      <div className={classes.product_edit}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          height="20px"
          width="20px"
          color="gray"
          className={classes.trash_img}
          onClick={() => {
            delProduct(props.product);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        <div>
          <div className={classes.edit_quantity}>
            <button
              className={classes.edit_quantity_btn}
              onClick={() => descQuantity(props.product)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
              </svg>
            </button>
            <input
              type="text"
              className={classes.quantity}
              value={String(count)}
              onChange={(e) => handleOnChange(e)}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                (e.target.value = e.target.value.replace(/\D/g, ''))
              }
            />
            <button
              className={classes.edit_quantity_btn}
              onClick={() => incQuantity(props.product)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
              </svg>
            </button>
          </div>
          <div className={classes.small_text}>{price} usd/pc.</div>
        </div>
      </div>
      <div className={classes.price}>${(price * quantity).toFixed(2)}</div>
    </li>
  );
};

export default CartProduct;
