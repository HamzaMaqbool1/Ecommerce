import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/cardstyle.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products} = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className='container-fluid bg-info'>
      <Container className="py-5">
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4}>
              <Card className="mb-4 card">
                <Card.Img className='card-img-top' variant="top" src={product.image} />
                <Card.Body className='card-body text-truncate'>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Link to={`/products/${product.id}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;