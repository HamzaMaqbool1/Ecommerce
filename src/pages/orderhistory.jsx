// src/components/OrderHistory.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import '../style/cardstyle.css';

const OrderHistory = () => {
  const orders = useSelector(state => state.orders);

  return (
    <div className='container-fluid p-0 bg-info' id='container'>
      <h2 className='text-info bg-warning text-center'>Order History</h2>
      <ol>
        {orders.map(order => (
          <li key={order.id}>
            Order #{order.id} - Total: ${order.total}
            <ul>
              {order.items.map(item => (
                <li key={item.id}>{item.name} - ${item.price}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default OrderHistory;
