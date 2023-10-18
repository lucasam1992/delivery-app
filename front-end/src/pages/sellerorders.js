import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../api';
import ProductOrderCard from '../components/productordercard';
import { useAuth } from '../contexts/auth';

const OrdersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
`;

function SellerOrders() {
  const [data, setData] = useState([]);
  const { user, logoutNotAuthorized } = useAuth();

  useEffect(() => {
    api.sales.getAll(user.token).then(setData).catch(logoutNotAuthorized);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.length === 0) return <h1>Carregando...</h1>;

  return (
    <OrdersContainer>
      {data.map(({ deliveryAddress, saleDate, id, totalPrice, status }) => (
        <ProductOrderCard
          key={ id }
          address={ deliveryAddress }
          date={ (new Date(saleDate)).toLocaleDateString('pt-br') }
          orderId={ id }
          price={ totalPrice }
          status={ status.toLowerCase() }
          user="seller"
        />
      ))}
    </OrdersContainer>
  );
}

export default SellerOrders;
