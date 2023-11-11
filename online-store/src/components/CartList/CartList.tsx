import * as React from 'react';
import classes from './CartList.module.scss';
import CartProduct from '../CartProduct/CartProduct';
import { ICart } from '../../store/userSlice';

interface Props {
  children: React.ReactNode;
  cart: ICart[];
}

const CartList: React.FC<Props> = ({ children, cart }) => {
  return (
    <ul className={classes.wrapper_cart_products}>
      {cart.map((product) => (
        <CartProduct
          key={`(${product.id}${product.size ? product.size : ''}${
            product.color ? product.color : ''
          }`}
          product={product}
        />
      ))}
      {children}
    </ul>
  );
};

export default CartList;
