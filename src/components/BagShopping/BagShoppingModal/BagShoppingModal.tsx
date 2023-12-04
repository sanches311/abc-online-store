import React from 'react';
import classes from './BagShoppingModal.module.scss';
import ModalWindow from '../../popUp/ModalWindow/ModalWindow';
import Button from '../../buttons/Button';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleVisibleModalWindowShoppingBag } from '../../../store/userSlice';

const BagShoppingModal: React.FC = () => {
  const visibleModalShoppingBag = useAppSelector(
    (state) => state.user.visibleModalWindowShoppingBag
  );

  const lastAddedItemBag = useAppSelector((state) => state.user.lastAddItemCart);

  const dispatch = useAppDispatch();

  const hideModalShoppingBag = () => {
    dispatch(toggleVisibleModalWindowShoppingBag(false));
  };

  return (
    <ModalWindow
      visibleModalWindow={visibleModalShoppingBag}
      hideModalWindow={hideModalShoppingBag}
      justifyContent={'flex-end'}
      alignItems={'flex-start'}
    >
      <div className={classes.wrapper}>
        <div className={classes.modal_header}>
          <h3>ADDED TO BAG</h3>
        </div>
        <div className={classes.wrapper_product}>
          <div className={classes.wrapper_img}>
            <img src={lastAddedItemBag?.image} alt="image" />
          </div>
          <div className={classes.wrapper_desc}>
            {lastAddedItemBag ? (
              <>
                <div className={classes.desc_title}>{lastAddedItemBag.title}</div>
                {lastAddedItemBag.category === "men's clothing" ||
                lastAddedItemBag.category === "women's clothing" ? (
                  <>
                    <div>Color: {lastAddedItemBag.color}</div>
                    <div>Size: {lastAddedItemBag.size}</div>
                  </>
                ) : (
                  ''
                )}
                <div>Quantity: {lastAddedItemBag.quantity}</div>
                <div>${lastAddedItemBag.price}</div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className={classes.wrapper_btn}>
          <Button handleOnClick={hideModalShoppingBag}>CONTINUE SHOPPING</Button>
        </div>
        <div className={classes.wrapper_btn}>
          <NavLink to="/bag">
            <Button handleOnClick={hideModalShoppingBag}>VIEW BAG</Button>
          </NavLink>
        </div>
      </div>
    </ModalWindow>
  );
};

export default BagShoppingModal;
