import React from 'react';
import classes from './CardList.module.scss';
import CardProduct from '../CardProduct/CardProduct';
import { IProduct } from '../../interfaces/products';
import ControlPanel from '../ControlPanel/ControlPanel';
import { useSearchParams } from 'react-router-dom';

interface Props {
  products: IProduct[] | undefined;
  isLoading: boolean;
}

const CardList: React.FC<Props> = ({ products, isLoading }) => {
  const [serchParams] = useSearchParams();
  const sort = serchParams.get('sort');
  return (
    <div className={classes.wrapper}>
      <ControlPanel />
      <div className={classes.wrapper_product}>
        {isLoading
          ? 'Loading ...'
          : products
          ? sort === 'popular'
            ? [...products]
                .sort((a, b) => (a.rating.rate > b.rating.rate ? 1 : -1))
                .map((data: IProduct) => <CardProduct product={data} key={data.id} />)
            : products.map((data: IProduct) => <CardProduct product={data} key={data.id} />)
          : ''}
      </div>
    </div>
  );
};

export default CardList;
