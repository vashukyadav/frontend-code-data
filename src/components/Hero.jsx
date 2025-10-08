import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Hero = () => {
  return (
    <Container>
      <Row className="hero-section">
        <Col lg={6} md={8} sm={10}>
          <h1 className="hero-title">Hi there!</h1>
          <p className="hero-text">
            Welcome to my photography portfolio. I specialize in capturing life's most 
            precious moments through the lens of creativity and passion. From intimate 
            portraits to grand celebrations, every image tells a unique story.
          </p>
          <hr className="hero-divider" />
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;