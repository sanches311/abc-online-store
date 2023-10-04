import React from 'react';
import classes from './CardList.module.scss';
import CardProduct from '../CardProduct/CardProduct';
import { IProduct } from '../../interfaces/products';
import ControlPanel from '../ControlPanel/ControlPanel';
import { useSearchParams } from 'react-router-dom';
import { sortBy } from '../../utils/utils';

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
          ? sortBy([...products], sort).map((data: IProduct) => (
              <CardProduct product={data} key={data.id} />
            ))
          : ''}
      </div>
    </div>
  );
};

export default CardList;
