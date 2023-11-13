import React from 'react';
import CardList from '../../components/CardList/CardList';
import { useGetAllProductsQuery } from '../../store/apiSlice';
import { useSearchParams } from 'react-router-dom';

const ProductsAllPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const limit = searchParams.has('limit') ? searchParams.get('limit') ?? '' : '';
  const sort = searchParams.has('sort') ? searchParams.get('sort') ?? '' : '';
  const query = searchParams.has('query') ? searchParams.get('query') ?? '' : '';
  const params = {
    limit,
    sort,
    query,
  };
  const { data: products, isLoading, isSuccess, isError } = useGetAllProductsQuery(params);

  return (
    <CardList products={products} isLoading={isLoading} isSuccess={isSuccess} isError={isError} />
  );
};
export default ProductsAllPage;
