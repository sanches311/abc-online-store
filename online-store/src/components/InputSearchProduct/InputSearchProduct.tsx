import React from 'react';
import classes from './InputSearchProduct.module.scss';
import { useSearchParams } from 'react-router-dom';

const InputSearchProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const params = new URLSearchParams();

  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchParams.has('limit')) params.set('limit', searchParams.get('limit') ?? '');
    if (searchParams.has('sort')) params.set('sort', searchParams.get('sort') ?? '');
    if (!e.target.value) {
      params.delete('query');
    } else {
      params.set('query', e.target.value);
    }
    setSearchParams(params);
  };
  return (
    <input
      className={classes.search}
      type="search"
      placeholder="Search..."
      value={query}
      onChange={handleOnChangeSearch}
    />
  );
};

export default InputSearchProduct;
