import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import NavBar from '../components/CustomerNavBar';
import SellerOrderCard from '../components/SellerOrderCard';

function SellerOrders() {
  const [sales, setSales] = useState([]);

  const { token } = JSON.parse(localStorage.getItem('user'));

  async function getOrders() {
    const salesReq = await axios.get('http://localhost:3001/sales', {
      headers: { Authorization: token },
    });
    const allSales = salesReq.data;
    setSales(allSales);
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <NavBar />
      { sales.map((sale, index) => (
        <SellerOrderCard
          key={ index }
          id={ sale.id }
          status={ sale.status }
          totalPrice={ sale.total_price }
          saleDate={ moment(sale.sale_date).format(('DD/MM/YYYY')) }
          deliveryAddress={ sale.delivery_address }
          deliveryNumber={ sale.delivery_number }
        />
      )) }
    </div>);
}

export default SellerOrders;
