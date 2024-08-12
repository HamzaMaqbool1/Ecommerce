import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../style/cardstyle.css';

const LandingPage = () => {
        const navigate = useNavigate();

        const handleBuyClick = () => {
          navigate('/products');
        };
  return (
    <div className='container-flui  d bg-info p-0' id='container'>
    <Container className="text-center py-5 bg-warning">
      <Row>
        <Col>
          <h1>Welcome to Our Store</h1>
          <p>Find the best products here!</p>
          <Button variant="primary" onClick={handleBuyClick}>Shop Now</Button>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default LandingPage;
