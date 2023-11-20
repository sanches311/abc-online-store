import * as React from 'react';
import classes from './EditCount.module.scss';
import MinusSvg from '../../assets/icons/minus.svg';
import PlusSvg from '../../assets/icons/plus.svg';

interface Props {
  descQuantity: () => void;
  incQuantity: () => void;
  handleOnChangeQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  count: number;
}

const EditCount: React.FC<Props> = ({
  descQuantity,
  incQuantity,
  handleOnChangeQuantity,
  count,
}) => {
  return (
    <div className={classes.edit_wrapper}>
      <button
        className={classes.edit_quantity_btn}
        onClick={(e) => {
          e.preventDefault();
          descQuantity();
        }}
      >
        <MinusSvg />
      </button>
      <input
        type="text"
        name="quantity"
        className={classes.quantity_input}
        value={String(count)}
        onChange={(e) => handleOnChangeQuantity(e)}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          (e.target.value = e.target.value.replace(/\D/g, ''))
        }
      />
      <button
        className={classes.edit_quantity_btn}
        onClick={(e) => {
          e.preventDefault();
          incQuantity();
        }}
      >
        <PlusSvg />
      </button>
    </div>
  );
};

export default EditCount;
