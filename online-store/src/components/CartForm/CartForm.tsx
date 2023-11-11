import * as React from 'react';
import classes from './CartForm.module.scss';
import CartList from '../CartList/CartList';
import { ICart } from '../../store/userSlice';

interface Props {
  totalPrice: number;
  cart: ICart[];
}

const CartForm: React.FC<Props> = ({ totalPrice, cart }) => {
  return (
    <>
      <CartList cart={cart}>
        <div className={classes.wrapper}>
          <span className={classes.price}>Total price:</span>
          <div>
            <div className={classes.price}>${totalPrice.toFixed(2)}</div>
          </div>
        </div>
        <div className={classes.wrapper_checkout_btn}>
          <button className={classes.checkout_btn}>PROCEED TO CHECKOUT</button>
        </div>
      </CartList>
    </>
  );
};

export default CartForm;
