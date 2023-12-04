import React, { useState } from 'react';
import { Product } from '../../../../interfaces/cart';
import UserOrderProduct from '../UserOrderProduct/UserOrderProduct';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: 1px solid gray;
`;
const TotalPrice = styled.div`
  font-weight: 700;
  text-align: right;
`;

interface Props {
  products: Product[];
}

const UserOrderProductList: React.FC<Props> = ({ products }) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const updateTotalPrice = (value: number) => {
    setTotalPrice(totalPrice + value);
  };
  return (
    <Wrapper>
      {products.map((product) => (
        <UserOrderProduct
          productId={product.productId}
          quantity={product.quantity}
          updateTotalPrice={updateTotalPrice}
          key={product.productId.toString()}
        />
      ))}
      <TotalPrice>Total price: ${totalPrice}</TotalPrice>
    </Wrapper>
  );
};

export default UserOrderProductList;
