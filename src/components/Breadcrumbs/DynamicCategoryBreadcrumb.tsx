import * as React from 'react';
import { useParams } from 'react-router';
import { upperFirstLetter } from '../../utils/utils';

export const DynamicCategoryBreadcrumb: React.FC = () => {
  const category = useParams();
  return <>{category.category ? <span>{upperFirstLetter(category.category)}</span> : ''}</>;
};

export default DynamicCategoryBreadcrumb;
