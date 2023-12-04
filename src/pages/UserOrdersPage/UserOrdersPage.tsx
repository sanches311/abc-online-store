import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserOrdersQuery } from '../../store/userSlice';
import UserOrdersList from '../../components/User/UserOrders/UserOrdersList/UserOrdersList';
import styled from 'styled-components';

const WrapperPage = styled.div`
  margin: 10px 20px;
`;

const UserOrders: React.FC = () => {
  const { userId } = useParams<string>();
  const {
    data: orders,
    isSuccess,
    isError,
    isFetching,
    isLoading,
  } = useGetUserOrdersQuery(userId!, { skip: !userId });
  return (
    <WrapperPage>
      <h2>My orders</h2>
      {isFetching && isLoading ? (
        <div>Loading...</div>
      ) : isSuccess && !isError ? (
        <UserOrdersList orders={orders} />
      ) : (
        <div>Not</div>
      )}
    </WrapperPage>
  );
};

export default UserOrders;
