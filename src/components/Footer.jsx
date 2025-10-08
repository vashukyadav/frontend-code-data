import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container fluid>
        <div className="footer-content">
          <span className="footer-text">© 2024 Aman Verma Photography</span>
          <span className="footer-icon">ℹ️</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;