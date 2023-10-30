import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

const DynamicProductBreadcrumb: React.FC = () => {
  const products = useAppSelector((state) => state.app);
  const { id } = useParams();
  return (
    <span>{id && products.currentProduct.length != 0 ? products.currentProduct[0].title : ''}</span>
  );
};
export default DynamicProductBreadcrumb;
