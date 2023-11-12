import * as React from 'react';
import classes from './buttons.module.scss';
import { useState } from 'react';
import ShoppingBagSvg from '../../assets/icons/shopping-bag.svg';

interface Props {
  addProduct: () => void;
}

const ToBagBtn: React.FC<Props> = ({ addProduct }) => {
  const [textBtn, setTextBtn] = useState<string>('add to bag');
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addProduct();
    setTextBtn('it`s in the bag');
    setDisabled(true);
    setTimeout(() => {
      setTextBtn('add to bag');
      setDisabled(false);
    }, 2000);
  };
  return (
    <button className={classes.btn} disabled={disabled} onClick={(e) => handleOnClick(e)}>
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
