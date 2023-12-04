import React, { useState } from 'react';
import classes from './CardList.module.scss';
import CardProduct from '../CardProduct/CardProduct';
import { IProduct } from '../../interfaces/products';
import ControlPanel from '../ControlPanel/ControlPanel';
import { useSearchParams } from 'react-router-dom';
import { searchItem, sortBy } from '../../utils/utils';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import FormAddProduct from '../FormAddProduct/FormAddProduct';
import ModalWindow from '../popUp/ModalWindow/ModalWindow';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleVisibleModalWindowEditColorSize } from '../../store/userSlice';

interface Props {
  products: IProduct[] | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

const CardList: React.FC<Props> = ({ products, isLoading, isError, error }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') ?? '';
  const query = searchParams.get('query') ?? '';

  const [productAdded, setProductAdded] = useState<IProduct | null>(null);
  let data: IProduct[] | null;

  const visibleModalWindowEditColorSize = useAppSelector(
    (state) => state.user.visibleModalWindowEditColorSize
  );
  const dispatch = useAppDispatch();

  const hideModalWindowEditColorSize = () => {
    dispatch(toggleVisibleModalWindowEditColorSize(false));
  };

  const showError = (err: FetchBaseQueryError | SerializedError | undefined): string => {
    let errorMessage = '';
    if (err) {
      if ('status' in err) {
        if ('error' in err) errorMessage = 'error' in err ? err.error : 'error'; //JSON.stringify(err.data)
      } else errorMessage = err.message!;
    }
    return errorMessage;
  };

  const updateProductAdded = (product: IProduct) => {
    setProductAdded(product);
  };

  return (
    <div className={classes.wrapper}>
      <ControlPanel />
      <div className={classes.wrapper_product}>
        {isLoading ? (
          'Loading ...'
        ) : isError ? (
          <div>{showError(error)}</div>
        ) : products ? (
          (data = searchItem(sortBy([...products], sort), query)) ? (
            data.length != 0 ? (
              data.map((product: IProduct) => (
                <CardProduct
                  product={product}
                  updateProductAdded={updateProductAdded}
                  key={product.id}
                />
              ))
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
      <ModalWindow
        visibleModalWindow={visibleModalWindowEditColorSize}
        hideModalWindow={hideModalWindowEditColorSize}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <FormAddProduct product={productAdded} />
      </ModalWindow>
    </div>
  );
};

export default CardList;
