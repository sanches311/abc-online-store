import React from 'react';
import styled from 'styled-components';
import { IUserOrders } from '../../../../interfaces/cart';
import UserOrder from '../UserOrder/UserOrder';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface Props {
  orders: IUserOrders[];
}

const UserOrdersList: React.FC<Props> = ({ orders }) => {
  return (
    <Wrapper>
      {orders.map((order) => (
        <UserOrder products={order.products} date={order.date} key={order.id.toString()} />
      ))}
    </Wrapper>
  );
};

export default UserOrdersList;
