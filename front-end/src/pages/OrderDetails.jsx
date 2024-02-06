import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import NavBar from '../components/CustomerNavBar';
import SocketContext from '../contexts/SocketContext';

function OrdersDetails({ match }) {
  const [order, setOrder] = useState(null);
  const {
    orderStatus, setOrderStatus, clientEmitStatus, setOrderId,
  } = useContext(SocketContext);
  const [disableButton, setdisableButton] = useState(true);
  const { id } = match.params;
  const statsDTid = 'customer_order_details__element-order-details-label-delivery-status';

  useEffect(() => {
    async function buttonStatus() {
      if (orderStatus !== 'Em Trânsito') {
        setdisableButton(true);
      } else {
        setdisableButton(false);
      }
    }
    buttonStatus();
  }, [orderStatus]);

  const { token } = JSON.parse(localStorage.getItem('user'));

  async function setSaleStatus(status) {
    await axios.patch(`http://localhost:3001/sales/${id}`,
      { status },
      { headers: { Authorization: token },
      });
    setOrderStatus(status);
    clientEmitStatus(status, id);
  }

  useEffect(() => {
    async function getOrder() {
      const request = await axios.get(`http://localhost:3001/sales/${id}`, { headers: { Authorization: token } });
      const mySale = request.data;
      setOrder({ ...mySale });
      setOrderStatus(mySale.status);
    }
    getOrder();
    setOrderId(id);
  }, [id, setOrderId, setOrderStatus, token]);

  function tableRow() {
    return (
      <tr>
        <th>
          PEDIDO 000
          <span
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {id}
          </span>
        </th>
        <th
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {order.seller.name}
        </th>
        <th
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { moment(order.saleDate).format(('DD/MM/YYYY')) }
        </th>
        <th
          data-testid={ statsDTid }
        >
          {orderStatus}
        </th>
        <th>
          <Button
            variant="success"
            data-testid="customer_order_details__button-delivery-check"
            onClick={ () => setSaleStatus('Entregue') }
            disabled={ disableButton }
          >
            MARCAR COMO ENTREGUE
          </Button>
        </th>
      </tr>
    );
  }

  if (!order) return <p>Carregando...</p>;

  return (
    <div>
      <NavBar fixed="top" />
      <h3>Detalhe do Pedido</h3>
      <br />
      <Table>
        <thead>
          { tableRow() }
        </thead>
      </Table>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            order.products.map((item, index) => (
              <tr key={ item.name }>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-name-${index}`
                  }
                >
                  { item.name }
                </td>
                <td>
                  <span
                    data-testid={
                      `seller_order_details__element-order-table-quantity-${index}`
                    }
                  >
                    { item.salesProducts.quantity }
                  </span>
                </td>
                <td>
                  R$
                  <span
                    data-testid={
                      `seller_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    { item.price.replace('.', ',') }
                  </span>
                </td>
                <td>
                  R$
                  <span
                    data-testid={
                      `seller_order_details__element-order-table-sub-total-${index}`
                    }
                  >
                    { (item.price * item.salesProducts.quantity)
                      .toFixed(2).toString().replace('.', ',')}
                  </span>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <Button
        variant="success"
        data-testid="customer_order_details__element-order-total-price"
      >
        { `Total: R$ ${order.totalPrice.replace('.', ',')}` }
      </Button>
    </div>
  );
}

OrdersDetails.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default OrdersDetails;
