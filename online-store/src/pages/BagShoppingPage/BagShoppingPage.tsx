import * as React from 'react';
import classes from './BagShoppingPage.module.scss';
import { useAppSelector } from '../../hooks/redux';
import BagShoppingList from '../../components/BagShopping/BagShoppingList/BagShoppingList';
import CheckOutBtn from '../../components/buttons/CheckoutBtn';
import VisaSvg from '../../assets/icons/paysystem/visa.svg';
import MaestroSvg from '../../assets/icons/paysystem/maestro.svg';
import MasterSvg from '../../assets/icons/paysystem/master card.svg';
import QiwiSvg from '../../assets/icons/paysystem/qiwi.svg';
import PaykeeperSvg from '../../assets/icons/paysystem/paykeeper.svg';
import PayPalSvg from '../../assets/icons/paysystem/paypal.svg';
import PayPassSvg from '../../assets/icons/paysystem/paypass.svg';
import GooglePaySvg from '../../assets/icons/paysystem/googlePay.svg';
import WebMoneySvg from '../../assets/icons/paysystem/webmoney.svg';
import WesternUnionSvg from '../../assets/icons/paysystem/wester union.svg';

const BagShoppingPage: React.FC = () => {
  const cart = useAppSelector((state) => state.user.cart);
  const countProducts = cart.reduce((sum, product) => sum + product.quantity, 0);
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
      ) : (
        <BagShoppingList cart={cart}>
          <div className={classes.wrapper_bottom}>
            <span className={classes.price}>Total price:</span>
            <div className={classes.price}>${totalPrice.toFixed(2)}</div>
          </div>
          <div className={classes.wrapper_checkout_btn}>
            <CheckOutBtn />
          </div>
          <div className={classes.wrapper_item_pay}>
            <VisaSvg style={{ width: 69, height: 21 }} />
            <MaestroSvg style={{ width: 64, height: 38 }} />
            <MasterSvg style={{ width: 65, height: 39 }} />
            <QiwiSvg style={{ width: 42, height: 43 }} />
            <PaykeeperSvg style={{ width: 108, height: 34 }} />
            <PayPalSvg style={{ width: 78, height: 19 }} />
            <PayPassSvg style={{ width: 89, height: 26 }} />
            <GooglePaySvg style={{ width: 71, height: 28 }} />
            <WebMoneySvg style={{ width: 42, height: 42 }} />
            <WesternUnionSvg style={{ width: 104, height: 31 }} />
          </div>
        </BagShoppingList>
      )}
    </div>
  );
};

export default BagShoppingPage;
