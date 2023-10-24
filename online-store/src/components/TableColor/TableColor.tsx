import * as React from 'react';
import classes from './TableColor.module.scss';
import { useState } from 'react';

interface Props {
  updateColor(color: string): void;
}

const TableColor: React.FC<Props> = ({ updateColor }) => {
  const [color, setColor] = useState<string>('');
  return (
    <>
      <div className={classes.currentColor}>Color: {color}</div>
      <ul className={classes.wrapper_color}>
        <li
          className={color === 'Gray' ? classes.active_color : ''}
          onClick={() => {
            setColor('Gray');
            updateColor('Gray');
          }}
        >
          <div className={`${classes.gray} ${classes.color_edit}`}></div>
          <div className={classes.tooltip}>Gray</div>
        </li>
        <li
          className={color === 'Blue' ? classes.active_color : ''}
          onClick={() => {
            setColor('Blue');
            updateColor('Blue');
          }}
        >
          <div className={`${classes.blue} ${classes.color_edit}`}></div>
          <div className={classes.tooltip}>Blue</div>
        </li>
        <li
          className={color === 'Brown' ? classes.active_color : ''}
          onClick={() => {
            setColor('Brown');
            updateColor('Brown');
          }}
        >
          <div className={`${classes.brown} ${classes.color_edit}`}></div>
          <div className={classes.tooltip}>Brown</div>
        </li>
        <li
          className={color === 'Black' ? classes.active_color : ''}
          onClick={() => {
            setColor('Black');
            updateColor('Black');
          }}
        >
          <div className={`${classes.black} ${classes.color_edit}`}></div>
          <div className={classes.tooltip}>Black</div>
        </li>
      </ul>
    </>
  );
};

export default TableColor;
