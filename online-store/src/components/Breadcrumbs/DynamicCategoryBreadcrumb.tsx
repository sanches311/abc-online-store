import * as React from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

export const DynamicCategoryBreadcrumb: React.FC = () => {
  const category = useParams();
  return <>{category.category ? <NavLink to={`${category}`}>{category.category}</NavLink> : ''}</>;
};

export default DynamicCategoryBreadcrumb;
