import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container fluid>
        <div className="footer-content">
          <span className="footer-text">© 2025 Tarun Sahu </span>
          <span className="footer-icon">ℹ️</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;