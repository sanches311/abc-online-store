import * as React from 'react';
import classes from './BagShoppingList.module.scss';
import BagShoppingProduct from '../BagShoppingProduct/BagShoppingProduct';
import { ICart } from '../../../interfaces/cart';

interface Props {
  children: React.ReactNode;
  cart: ICart[];
}

const BagShoppingList: React.FC<Props> = ({ children, cart }) => {
  return (
    <ul className={classes.wrapper_cart_products}>
      {cart.map((product) => (
        <BagShoppingProduct
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

export default BagShoppingList;
