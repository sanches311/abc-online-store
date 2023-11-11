import React from 'react';
import classes from './CardList.module.scss';
import CardProduct from '../CardProduct/CardProduct';
import { IProduct } from '../../interfaces/products';
import ControlPanel from '../ControlPanel/ControlPanel';
import { useSearchParams } from 'react-router-dom';
import { sortBy } from '../../utils/utils';
import { searchItem } from '../../utils/utils';

interface Props {
  products: IProduct[] | undefined;
  isLoading: boolean;
}

const CardList: React.FC<Props> = ({ products, isLoading }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') ?? '';
  const query = searchParams.get('query') ?? '';
  let data: IProduct[] | null;

  return (
    <div className={classes.wrapper}>
      <ControlPanel />
      <div className={classes.wrapper_product}>
        {isLoading ? (
          'Loading ...'
        ) : products ? (
          (data = searchItem(sortBy([...products], sort), query)) ? (
            data.length != 0 ? (
              data.map((product: IProduct) => <CardProduct product={product} key={product.id} />)
            ) : (
              <h2>Not found products</h2>
            )
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CardList;
