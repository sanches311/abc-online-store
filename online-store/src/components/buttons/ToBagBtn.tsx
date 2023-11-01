import * as React from 'react';
import classes from './buttons.module.scss';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { addProductToCart } from '../../store/userSlice';
import ShoppingBagSvg from '../../assets/icons/shopping-bag.svg';
import { IProduct } from '../../interfaces/products';

interface Props {
  product: IProduct | undefined;
}

const ToBagBtn: React.FC<Props> = ({ product }) => {
  const [textBtn, setTextBtn] = useState<string>('add to bag');
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const addToCart = () => {
    if (product) {
      const { id, image, title, price, description, size, color, quantity } = product;
      dispatch(
        addProductToCart({
          id,
          image,
          title,
          size: size ? size : '',
          color: color ? color : '',
          quantity: quantity ? quantity : 1,
          price,
          description,
        })
      );
    }
  };
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart();
    setTextBtn('it`s in the bag');
    setDisabledBtn(true);
    setTimeout(() => {
      setTextBtn('add to bag');
      setDisabledBtn(false);
    }, 2000);
  };
  return (
    <button className={classes.bag_btn} disabled={disabledBtn} onClick={(e) => handleOnClick(e)}>
      <span>
        <ShoppingBagSvg className={classes.shopping_bag_img_btn} />
      </span>
      <div className={classes.wrapper_text}>
        <span>{textBtn}</span>
      </div>
    </button>
  );
};

export default ToBagBtn;
