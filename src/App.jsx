import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cart from './pages/cart';
import OrderHistory from './pages/orderhistory';
import AdminPanel from './pages/adminpanel';
import ProductList from './pages/productListing';
import LandingPage from './pages/landingPage';
import ProductDetail from './pages/productDetail';
import Checkout from './pages/Checkout';

const App = () => {
  return (
    <Router> 
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/">Store</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/products">Product</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/cart">Cart</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/order-history">OrderHistory</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin">AdminPanel</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/checkout">Checkout</Link>
      </li>
    </ul>
  </div>
</nav>
   <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/checkout" element={<Checkout />} />
   </Routes>
 </Router>
  );
};

export default App;