import * as React from 'react';
import classes from './BagShoppingPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import BagShoppingList from '../../components/BagShopping/BagShoppingList/BagShoppingList';
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
import Button from '../../components/buttons/Button';
import { cleanCart, toggleVisibleUserLoginForm } from '../../store/userSlice';
import ModalWindow from '../../components/popUp/ModalWindow/ModalWindow';
import { useState } from 'react';

const BagShoppingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.user.cart);
  const userId = useAppSelector((state) => state.user.currentUserId);
  const countProducts = cart.reduce((sum, product) => sum + product.quantity, 0);
  const totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const showModal = () => {
    setVisibleModal(true);
  };
  const hideModal = () => {
    setVisibleModal(false);
    dispatch(cleanCart());
  };
  const showLogin = () => {
    dispatch(toggleVisibleUserLoginForm(true));
  };
  const handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userId) return showLogin();
    showModal();
  };

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
          <div className={classes.wrapper_checkout}>
            <div className={classes.wrapper_checkout_btn}>
              <Button
                handleOnClick={(e) => {
                  handleCheckout(e);
                }}
              >
                Proceed To Checkout
              </Button>
            </div>
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
      <ModalWindow
        visibleModalWindow={visibleModal}
        hideModalWindow={hideModal}
        justifyContent={'flex-end'}
        alignItems={'flex-start'}
      >
        <div className={classes.modal_wrapper_content}>
          <h3>Your order has been placed</h3>
          <h3>Order № 12</h3>
          <div className={classes.wrapper_orders_list}>
            {cart.map((product) => (
              <div
                className={classes.wrapper_order}
                key={`${product.id}${product.color}${product.size}`}
              >
                <div className={classes.wrapper_img}>
                  <img src={product.image} alt="image" />
                </div>
                <div className={classes.wrapper_desc}>
                  <div>{product.title}</div>
                  {product.size ? (
                    <div className={classes.small_text}>Size: {product.size}</div>
                  ) : (
                    ''
                  )}
                  {product.color ? (
                    <div className={classes.small_text}>Color: {product.color}</div>
                  ) : (
                    ''
                  )}
                  <div className={classes.small_text}>Quantity: {product.quantity}</div>
                  <div className={classes.small_text}>Price: {product.price}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={classes.price} style={{ textAlign: 'right', marginTop: '15px' }}>
            Total price: ${totalPrice.toFixed(2)}
          </div>
        </div>
      </ModalWindow>
    </div>
  );
};

export default BagShoppingPage;
