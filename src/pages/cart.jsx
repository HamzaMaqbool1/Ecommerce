import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItem, clearCart } from '../redux/slices/cartslice';
import { addOrder } from '../redux/slices/orderslice';
import '../style/cardstyle.css';

const Cart = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const newOrder = {
      id: Date.now(),
      items: cart,
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };
    dispatch(addOrder(newOrder));
    dispatch(clearCart());
    navigate('/order-history');
  };

  return (
    <div className='bg-info'>
      <h2 className='text-center text-warning'>Shopping Cart</h2>
      <ul className='d-flex flex-column align-items-center'>
        {cart.map(item => (
          <li key={item.id} className='list-unstyled'>
            <div className="d-flex align-items-center">
              <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
              <div>{item.name} - ${item.price} x {item.quantity}</div>
            </div>
            <button className='btn btn-warning m-2' onClick={() => dispatch(removeItem(item.id))}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="container d-flex justify-content-center gap-2" id='container'>
        <button className='btn btn-warning' onClick={handlePlaceOrder}>Place Order</button>
        <button className="btn btn-warning" onClick={() => dispatch(clearCart())}>Clear Cart</button>
      </div>
    </div>
  );
};

export default Cart;