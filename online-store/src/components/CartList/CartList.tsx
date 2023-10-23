import * as React from 'react';
import classes from './CartList.module.scss';
import { useAppSelector } from '../../hooks/redux';
import CartProduct from '../CartProduct/CartProduct';

interface Props {
  children: React.ReactNode;
}

const CartList: React.FC<Props> = ({ children }) => {
  const cart = useAppSelector((state) => state.user.cart);
  return (
    <ul className={classes.wrapper_cart_products}>
      {cart.map((product) => (
        <CartProduct key={product.id} product={product} />
      ))}
      {children}
    </ul>
  );
};

export default CartList;
