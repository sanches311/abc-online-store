import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetProductsCategoryQuery } from '../../store/apiSlice';
import CardList from '../../components/CardList/CardList';

const ProductsPageByCategory: React.FC = () => {
  const [searchParams] = useSearchParams();
  const limit = searchParams.has('limit') ? searchParams.get('limit') ?? '' : '';
  const sort = searchParams.has('sort') ? searchParams.get('sort') ?? '' : '';
  const query = searchParams.has('query') ? searchParams.get('query') ?? '' : '';
  const params = {
    limit,
    sort,
    query,
  };
  const { category } = useParams();
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsCategoryQuery({
    category: category!,
    searchParams: params,
  });

  return (
    <CardList
      products={products}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
    />
  );
};

export default ProductsPageByCategory;
