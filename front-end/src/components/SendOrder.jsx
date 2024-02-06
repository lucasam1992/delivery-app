import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import CartContext from '../contexts/CartContext';

function SendOrder() {
  const { cart, totalPrice } = useContext(CartContext);
  const [sellers, setSellers] = useState([]);
  const [address, setAddress] = useState('');
  const [addressN, setAddressN] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [userId, setUserId] = useState('');
  // const [auth, setAuth] = useState('');

  const history = useHistory();

  const { token } = JSON.parse(localStorage.getItem('user'));

  function getUserId() {
    const myUser = JSON.parse(localStorage.getItem('user'));
    setUserId(myUser.id);
    // setAuth(myUser.token);
  }

  async function getSellers() {
    const sellersReq = await axios.get('http://localhost:3001/users', {
      headers: { Authorization: token },
    });

    const allSellers = sellersReq.data;
    setSellers(allSellers);
    setSellerId(allSellers[0].id);
  }

  useEffect(() => {
    getSellers();
    getUserId();
  }, []);

  function selectInput() {
    return (
      <Form.Group as={ Col } controlId="formGridState">
        <Form.Label>P. Vendedora Responsável</Form.Label>
        <Form.Select
          onChange={ (e) => setSellerId(e.target.value) }
          data-testid="customer_checkout__select-seller"
        >
          {
            sellers.map((seller) => (
              <option value={ seller.id } key={ seller.id }>{ seller.name }</option>
            ))
          }
        </Form.Select>
      </Form.Group>
    );
  }

  async function createSale() {
    const data = {
      cart,
      userId,
      sellerId,
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: addressN,
      saleDate: new Date(),
      status: 'Pendente',
    };
    const myBody = JSON.stringify(data);
    const request = await axios.post('http://localhost:3001/sales', myBody,
      { headers: { Authorization: token },
      });
    const saleId = await request;

    return saleId.data.id;
  }

  async function handleClick() {
    const saleId = await createSale();
    history.push(`orders/${saleId}`);
  }

  return (
    <div className="send-form">
      <h3>Detalhes e Endereço para Entrega</h3>
      <Form>
        <Row className="mb-3">
          { selectInput() }
          <Form.Group as={ Col } controlId="formGridPassword">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              value={ address }
              onChange={ (e) => setAddress(e.target.value) }
              data-testid="customer_checkout__input-address"
              type="text"
              placeholder="..."
            />
          </Form.Group>
          <Form.Group as={ Col } controlId="formGridPassword">
            <Form.Label>Número</Form.Label>
            <Form.Control
              value={ addressN }
              onChange={ (e) => setAddressN(e.target.value) }
              data-testid="customer_checkout__input-addressNumber"
              type="text"
              placeholder="#"
            />
          </Form.Group>
        </Row>
        <Button
          data-testid="customer_checkout__button-submit-order"
          variant="success"
          type="button"
          onClick={ handleClick }
        >
          FINALIZAR PEDIDO
        </Button>
      </Form>
    </div>
  );
}

export default SendOrder;
