import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import './CustomerProducts.css';
import axios from 'axios';
import CustomerNavBar from '../components/CustomerNavBar';
import ProductCard from '../components/ProductCard';
import CheckoutBtn from '../components/CheckoutBtn';

function ClientProducts() {
  const [productList, setProductList] = useState([]);

  const { token } = JSON.parse(localStorage.getItem('user'));

  async function getProducts() {
    const productsReq = await axios.get('http://localhost:3001/products', {
      headers: { Authorization: token },
    });

    const products = productsReq.data;
    setProductList(products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <CustomerNavBar fixed="top" />
      <Row xs={ 2 } md={ 4 } className="g-2">
        {
          productList.map((prod) => (
            <div key={ prod.name } className="productCard">
              <ProductCard product={ prod } />
            </div>
          ))
        }
      </Row>
      <CheckoutBtn testId="customer_products__button-cart" />
    </div>
  );
}

export default ClientProducts;
