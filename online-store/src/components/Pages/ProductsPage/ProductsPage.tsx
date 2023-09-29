import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsCategoryQuery } from '../../../store/apiSlice';
import CardList from '../../CardList/CardList';

const ProductsPage: React.FC = () => {
  const { category } = useParams();
  const { data: products, isLoading } = useGetProductsCategoryQuery(category!);
  return <CardList products={products} isLoading={isLoading} />;
};

export default ProductsPage;
