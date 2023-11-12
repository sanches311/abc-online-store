import * as React from 'react';
import classes from './BagShoppingPage.module.scss';
import { useAppSelector } from '../../../hooks/redux';
import BagShoppingList from '../../BagShopping/BagShoppingList/BagShoppingList';
import CheckOutBtn from '../../buttons/CheckoutBtn';
import VisaSvg from '../../../assets/icons/paysystem/visa.svg';
import MaestroSvg from '../../../assets/icons/paysystem/maestro.svg';
import MasterSvg from '../../../assets/icons/paysystem/master card.svg';
import QiwiSvg from '../../../assets/icons/paysystem/qiwi.svg';
import PaykeeperSvg from '../../../assets/icons/paysystem/paykeeper.svg';
import PayPalSvg from '../../../assets/icons/paysystem/paypal.svg';
import PayPassSvg from '../../../assets/icons/paysystem/paypass.svg';
import GooglePaySvg from '../../../assets/icons/paysystem/googlePay.svg';
import WebMoneySvg from '../../../assets/icons/paysystem/webmoney.svg';
import WesternUnionSvg from '../../../assets/icons/paysystem/wester union.svg';

const BagShoppingPage: React.FC = () => {
  const cart = useAppSelector((state) => state.user.cart);
  const countProducts = cart.reduce((sum, product) => sum + product.quantity, 0);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className={classes.wrapper}>
      <h1>Shopping Bag</h1>
      <div className={classes.wrapper_head_cart}>
        <div className={classes.small_text}>
          In cart {countProducts} products estimated total ${totalPrice.toFixed(2)}
        </div>
        <input type="text" placeholder="Enter promo code" />
      </div>
      {cart.length === 0 ? (
        <div>Cart is empty</div>
      ) : currentUser.length === 0 ? (
        <BagShoppingList cart={cart}>
          <div className={classes.wrapper_bottom}>
            <span className={classes.price}>Total price:</span>
            <div className={classes.price}>${totalPrice.toFixed(2)}</div>
          </div>
          <div className={classes.wrapper_checkout_btn}>
            <CheckOutBtn />
          </div>
          <div className={classes.wrapper_item_pay}>
            <VisaSvg className={classes.item_pay} />
            <MaestroSvg className={classes.item_pay} />
            <MasterSvg className={classes.item_pay} />
            <QiwiSvg className={classes.item_pay} />
            <PaykeeperSvg className={classes.item_pay} />
            <PayPalSvg className={classes.item_pay} />
            <PayPassSvg className={classes.item_pay} />
            <GooglePaySvg className={classes.item_pay} />
            <WebMoneySvg className={classes.item_pay} />
            <WesternUnionSvg className={classes.item_pay} />
          </div>
        </BagShoppingList>
      ) : (
        <div>Auth user. Request to server</div>
      )}
    </div>
  );
};

export default BagShoppingPage;
