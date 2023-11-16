import * as React from 'react';
import classes from './buttons.module.scss';
import { useState } from 'react';
import ShoppingBagSvg from '../../assets/icons/shopping-bag.svg';

interface Props {
  addProduct: () => void;
}

const ToBagBtn: React.FC<Props> = ({ addProduct }) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addProduct();
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };
  return (
    <button
      className={`${classes.btn} ${classes.bag_btn} ${classes.capitalize}`}
      disabled={disabled}
      onClick={(e) => handleOnClick(e)}
    >
      <span>
        <ShoppingBagSvg className={classes.shopping_bag_img_btn} />
      </span>
      <div className={classes.wrapper_text}>
        <span>add to bag</span>
      </div>
    </button>
  );
};

export default ToBagBtn;
