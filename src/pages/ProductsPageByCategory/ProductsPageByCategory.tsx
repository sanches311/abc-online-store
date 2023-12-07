import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  useEffect(() => {
    if (
      category != 'electronics' &&
      category != 'jewelery' &&
      category != "men's clothing" &&
      category != "women's clothing"
    ) {
      navigate('*');
    }
  }, [category]);

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
