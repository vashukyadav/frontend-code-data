import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Hero = () => {
  return (
    <Container>
      <Row className="hero-section">
        <Col lg={6} md={8} sm={10}>
          <h1 className="hero-title">Hi there!</h1>
          <p className="hero-text">
            I'm Aman Verma, a wedding photographer who loves capturing the beautiful moments of your special day. With 4 years of experience, I focus on genuine emotions and candid smiles, creating timeless images that tell your unique love story. Based in Mumbai, I believe every wedding is a celebration of love, and I'm here to help you cherish those memories forever. Let's create something magical together!
          </p>
          <hr className="hero-divider" />
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;