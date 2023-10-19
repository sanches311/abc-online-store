import * as React from 'react';
import classes from './CartPage.module.scss';
import { useAppSelector } from '../../../hooks/redux';

const CartPage: React.FC = () => {
  const cart = useAppSelector((state) => state.user.cart);
  const totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <div className={classes.wrapper}>
      {cart.length === 0 ? (
        <div>Cart is empty</div>
      ) : currentUser.length === 0 ? (
        <>
          <ul className={classes.cart}>
            {cart.map((product, index) => (
              <li key={product.id} className={classes.product_property}>
                <div className={classes.first_cell}>
                  <div className={classes.position}>{index + 1} </div>
                  <div className={classes.wrapper_img}>
                    <img src={product.img} alt="image product" />
                  </div>
                  <div className={classes.product_title}>{product.title}</div>
                </div>
                <input type="text" className={classes.product_quantity} value={product.quantity} />
                <div className={classes.product_price}>
                  {(product.price * product.quantity).toFixed(2)}$
                </div>
              </li>
            ))}
          </ul>
          <div>
            <span>Total price: </span>
            <span> {totalPrice.toFixed(2)}$</span>
          </div>
        </>
      ) : (
        <div>Auth user. Request to server</div>
      )}
    </div>
  );
};

export default CartPage;
