import * as React from 'react';
import classes from './buttons.module.scss';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { addProductToCart } from '../../store/userSlice';
import ShoppingBagSvg from '../../assets/icons/shopping-bag.svg';
import { IProduct } from '../../interfaces/products';

interface Props {
  product: IProduct;
}

const ToBagBtn: React.FC<Props> = ({ product }) => {
  const [textBtn, setTextBtn] = useState<string>('add to bag');
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const addToCart = () => {
    if (product) {
      dispatch(
        addProductToCart({
          id: product.id,
          img: product.image,
          title: product.title,
          quantity: 1,
          price: product.price,
          description: product.description,
        })
      );
    }
  };
  return (
    <button
      className={classes.bag_btn}
      disabled={disabledBtn}
      onClick={(e) => {
        e.preventDefault();
        addToCart();
        setTextBtn('it`s in the bag');
        setDisabledBtn(true);
        setTimeout(() => {
          setTextBtn('add to bag');
          setDisabledBtn(false);
        }, 2000);
      }}
    >
      <span>
        <ShoppingBagSvg className={classes.shopping_bag_btn} />
      </span>
      {textBtn}
    </button>
  );
};

export default ToBagBtn;
