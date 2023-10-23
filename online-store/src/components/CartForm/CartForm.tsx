import * as React from 'react';
import classes from './CartForm.module.scss';
import CartList from '../CartList/CartList';
import { useAppSelector } from '../../hooks/redux';

const CartForm: React.FC = () => {
  const cart = useAppSelector((state) => state.user.cart);
  const totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  return (
    <>
      <CartList>
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
