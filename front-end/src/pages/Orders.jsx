import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import NavBar from '../components/CustomerNavBar';
import OrderCard from '../components/OrderCard';

function Orders() {
  const [sales, setSales] = useState([]);
  const { token, id } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function getSales() {
      const salesRequest = await axios.get(`http://localhost:3001/sales/findallsalesbyuserid/${id}`, {
        headers: { Authorization: token },
      });
      const allSales = salesRequest.data;
      setSales(allSales);
    }
    getSales();
  }, [token, id]);

  return (
    <div>
      <NavBar />
      {sales !== [] ? sales.map((sale, index) => (
        <OrderCard
          key={ index }
          id={ sale.id }
          status={ sale.status }
          totalPrice={ sale.totalPrice }
          saleDate={ moment(sale.sale_date).format(('DD/MM/YYYY')) }
        />
      )) : 'Loading' }
    </div>
  );
}

export default Orders;
