import React from 'react';
import CardList from '../../CardList/CardList';
import { useGetAllProductsQuery } from '../../../store/apiSlice';

const HomePage: React.FC = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();

  return <CardList products={products} isLoading={isLoading} />;
};
export default HomePage;
