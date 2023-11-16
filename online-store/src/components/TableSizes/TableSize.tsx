import React from 'react';
import classes from './TableSize.module.scss';

type Props = {
  updateSize(size: string | null): void;
  size: string | null;
};

const TableSize: React.FC<Props> = ({ updateSize, size }) => {
  const handleOnClickSize = (e: React.MouseEvent<HTMLSpanElement>) => {
    updateSize(e.currentTarget.textContent);
  };
  return (
    <>
      <div style={{ fontSize: '1.1rem' } as React.CSSProperties}>Size: {size}</div>
      <div className={classes.wrapper_size}>
        <span onClick={handleOnClickSize} className={size === '2XS' ? classes.active : ''}>
          2XS
        </span>
        <span onClick={handleOnClickSize} className={size === 'XS' ? classes.active : ''}>
          XS
        </span>
        <span onClick={handleOnClickSize} className={size === 'S' ? classes.active : ''}>
          S
        </span>
        <span onClick={handleOnClickSize} className={size === 'L' ? classes.active : ''}>
          L
        </span>
        <span onClick={handleOnClickSize} className={size === 'XL' ? classes.active : ''}>
          XL
        </span>
        <span onClick={handleOnClickSize} className={size === '2XL' ? classes.active : ''}>
          2XL
        </span>
        <span onClick={handleOnClickSize} className={size === '3XL' ? classes.active : ''}>
          3XL
        </span>
      </div>
    </>
  );
};

export default TableSize;
