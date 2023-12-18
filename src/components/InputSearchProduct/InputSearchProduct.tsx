import React from 'react';
import classes from './InputSearchProduct.module.scss';
import { useSearchParams } from 'react-router-dom';

const InputSearchProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleOnKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.currentTarget;
      if (searchParams.has('limit')) params.set('limit', searchParams.get('limit') ?? '');
      if (searchParams.has('sort')) params.set('sort', searchParams.get('sort') ?? '');
      if (!target.value) {
        params.delete('query');
      } else {
        params.set('query', target.value);
      }
      target.value = '';
      setSearchParams(params);
    }
  };
  return (
    <input
      className={classes.search}
      type="search"
      placeholder="Search..."
      onKeyDown={handleOnKeyDownSearch}
    />
  );
};

export default InputSearchProduct;
