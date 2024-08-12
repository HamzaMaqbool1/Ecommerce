// src/components/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct } from '../redux/productSlice';
import { addItem } from '../redux/slices/cartslice';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products.product);
  const status = useSelector((state) => state.products.status);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch,id]);

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }));
    navigate('/cart');
  };
  if (!product) {
    return <div>Loading...</div>; 
  }

  if (status === 'failed') {
    return <div>Error loading product. Please try again later.</div>;
  }


  return (
    <div className='container-fluid bg-info'>
      <Container className="py-5">
        <Row>
          <Col md={6}>
            <Image src={product.image} fluid />
          </Col>
          <Col md={6}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h3>${product.price}</h3>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
              />
            </Form.Group>
            <Button className='btn btn-warning mt-3' variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;
