import React, { useEffect, useState } from 'react';
import classes from './CounterProduct.module.scss';
import { useDebounce } from '../../hooks/debounce';

interface Props {
  updateQuantity(value: number): void;
}

const CounterProduct: React.FC<Props> = ({ updateQuantity }) => {
  const [count, setCount] = useState<number>(1);
  const debouncedValue = useDebounce<number>(count, 1000);
  const increase = () => {
    if (count < 99) setCount(count + 1);
    updateQuantity(count + 1);
  };
  const decrease = () => {
    if (count > 1) setCount(count - 1);
    updateQuantity(count - 1);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(+e.target.value);
    if (+e.target.value > 99) setCount(99);
  };
  useEffect(() => {
    updateQuantity(count);
  }, [debouncedValue]);

  return (
    <div className={classes.wrapper}>
      <button onClick={decrease}>-</button>
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          (e.target.value = e.target.value.replace(/\D/g, ''))
        }
        value={String(count)}
      />
      <button onClick={increase}>+</button>
    </div>
  );
};

export default CounterProduct;
