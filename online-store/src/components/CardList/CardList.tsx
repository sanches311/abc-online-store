import React, { useEffect, useRef } from 'react';
import classes from './CardList.module.scss';
import { useGetAllProductsQuery } from '../../store/apiSlice';
import CardProduct from '../CardProduct/CardProduct';
import { IProduct } from '../../interfaces/products';

interface Props {
  products: IProduct[] | undefined;
  isLoading: boolean;
}

const CardList: React.FC<Props> = ({ products, isLoading }) => {
  return (
    <div className={classes.wrapper}>
      {isLoading
        ? 'Loading ...'
        : products
        ? products.map((product: IProduct) => <CardProduct product={product} key={product.id} />)
        : ''}
    </div>
  );
};

export default CardList;
