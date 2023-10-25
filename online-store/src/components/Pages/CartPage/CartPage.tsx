import * as React from 'react';
import classes from './CartPage.module.scss';
import { useAppSelector } from '../../../hooks/redux';
import CartForm from '../../CartForm/CartForm';

const CartPage: React.FC = () => {
  const cart = useAppSelector((state) => state.user.cart);
  const countProducts = cart.reduce((sum, product) => sum + product.quantity, 0);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className={classes.wrapper}>
      <h1>Shopping Cart</h1>
      <div className={classes.wrapper_head_cart}>
        <div className={classes.small_text}>
          In cart {countProducts} products estimated total ${totalPrice.toFixed(2)}
        </div>
        <input type="text" placeholder="Enter promo code" />
      </div>
      {cart.length === 0 ? (
        <div>Cart is empty</div>
      ) : currentUser.length === 0 ? (
        <CartForm />
      ) : (
        <div>Auth user. Request to server</div>
      )}
    </div>
  );
};

export default CartPage;
