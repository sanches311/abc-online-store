import React, { useState } from 'react';
import classes from './CounterProduct.module.scss';

interface Props {
  updateQuantity(value: number): void;
}

const CounterProduct: React.FC<Props> = ({ updateQuantity }) => {
  const [count, setCount] = useState<number>(1);
  const increase = () => {
    if (count < 100) setCount(count + 1);
    updateQuantity(count + 1);
  };
  const decrease = () => {
    if (count > 1) setCount(count - 1);
    updateQuantity(count - 1);
  };
  return (
    <div className={classes.wrapper}>
      <button onClick={decrease}>-</button>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCount(Number(e.target.value))}
        value={String(count)}
      ></input>
      <button onClick={increase}>+</button>
    </div>
  );
};

export default CounterProduct;
