import React from 'react';
import UserOrderProductList from '../UserOrderProductList/UserOrderListProduct';
import { Product } from '../../../../interfaces/cart';
import styled from 'styled-components';

const WrapperOrder = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 0 10px 0;
`;
const Date = styled.div`
  margin-bottom: 15px;
`;

interface Props {
  products: Product[];
  date: string;
  key: string;
}

const UserOrder: React.FC<Props> = ({ products, date }) => {
  return (
    <WrapperOrder>
      <Date>Date: {date}</Date>
      <UserOrderProductList products={products} />
    </WrapperOrder>
  );
};

export default UserOrder;
