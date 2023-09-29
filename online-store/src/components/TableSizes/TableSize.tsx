import { useState } from 'react';
import React from 'react';
import classes from './TableSize.module.scss';

type Props = {
  updateSize(size: string | null): void;
};

const TableSize: React.FC<Props> = ({ updateSize }) => {
  const [size, setSize] = useState<null | string>();
  const hundlerOnClickSize = (e: React.MouseEvent<HTMLSpanElement>) => {
    setSize(e.currentTarget.textContent);
    updateSize(e.currentTarget.textContent);
  };
  return (
    <>
      <div style={{ fontSize: '1.1rem' } as React.CSSProperties}>Size: {size}</div>
      <div className={classes.wrapper_size}>
        <span onClick={hundlerOnClickSize} className={size === '2XS' ? classes.active : ''}>
          2XS
        </span>
        <span onClick={hundlerOnClickSize} className={size === 'XS' ? classes.active : ''}>
          XS
        </span>
        <span onClick={hundlerOnClickSize} className={size === 'S' ? classes.active : ''}>
          S
        </span>
        <span onClick={hundlerOnClickSize} className={size === 'L' ? classes.active : ''}>
          L
        </span>
        <span onClick={hundlerOnClickSize} className={size === 'XL' ? classes.active : ''}>
          XL
        </span>
        <span onClick={hundlerOnClickSize} className={size === '2XL' ? classes.active : ''}>
          2XL
        </span>
        <span onClick={hundlerOnClickSize} className={size === '3XL' ? classes.active : ''}>
          3XL
        </span>
      </div>
    </>
  );
};

export default TableSize;
