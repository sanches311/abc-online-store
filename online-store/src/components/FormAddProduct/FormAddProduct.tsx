import React, { useRef } from 'react';
import classes from './FormAddProduct.module.scss';
import EditCount from '../EditCount/EditCount';
import ToBagBtn from '../buttons/ToBagBtn';

type Props = {
  updateSize(size: string | null): void;
  updateColor(color: string | null): void;
  descQuantity: () => void;
  incQuantity: () => void;
  handleOnChangeQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnClickBtn: () => void;
  count: number;
  checkedSize: string | null;
  checkedColor: string | null;
  children: React.ReactNode;
};

const TableSize: React.FC<Props> = ({
  updateSize,
  updateColor,
  descQuantity,
  incQuantity,
  handleOnChangeQuantity,
  handleOnClickBtn,
  checkedSize,
  checkedColor,
  count,
  children,
}) => {
  const sizes = ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
  const colors = ['#F08080', '#FFA07A', '#8B0000', '#FF69B4', '#FF6347', '#FFA500', '#EE82EE'];
  const form = useRef(null);

  const handleOnChangeColor = () => {
    if (form.current) {
      updateColor(form.current.color.value);
    }
  };
  const handleOnChangeSize = () => {
    if (form.current) {
      updateSize(form.current.size.value);
    }
  };
  return (
    <form ref={form} className={classes.wrapper_form}>
      <div>Size: {checkedSize ?? ''}</div>
      <div className={classes.wrapper_sizes}>
        {sizes.map((size) => (
          <label key={size}>
            <input
              type="radio"
              className={classes.input_radio_size}
              value={size}
              name={'size'}
              onChange={handleOnChangeSize}
              checked={checkedSize === size ? true : false}
            />
            <span className={classes.radio_size_custom}>{size}</span>
          </label>
        ))}
      </div>
      <div>Color: {checkedColor ?? ''}</div>
      <div className={classes.wrapper_colors}>
        {colors.map((color) => (
          <label key={color}>
            <input
              type="radio"
              className={classes.input_radio_color}
              value={color}
              name={'color'}
              onChange={handleOnChangeColor}
              checked={checkedColor === color ? true : false}
            />
            <span className={classes.radio_color_custom} style={{ backgroundColor: color }}></span>
          </label>
        ))}
      </div>
      <div className={classes.wrapper_quantity}>
        <EditCount
          incQuantity={incQuantity}
          descQuantity={descQuantity}
          handleOnChangeQuantity={handleOnChangeQuantity}
          count={count}
        ></EditCount>
      </div>
      {children}
      <ToBagBtn addProduct={handleOnClickBtn} />
    </form>
  );
};

export default TableSize;
