import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PortfolioList = () => {
  const categories = [
    { name: 'COUPLE PORTRAIT', slug: 'couple-portrait', description: 'Intimate couple photography sessions' },
    { name: 'WEDDING', slug: 'wedding', description: 'Beautiful wedding ceremony and reception moments' },
    { name: 'COCKTAIL', slug: 'cocktail', description: 'Elegant cocktail party and event photography' },
    { name: 'MONOCHROME', slug: 'monochrome', description: 'Artistic black and white photography' },
    { name: 'EDITORIAL', slug: 'editorial', description: 'High-fashion editorial photography sessions' },
    { name: 'PRE WEDDING', slug: 'pre-wedding', description: 'Romantic pre-wedding photography shoots' }
  ];

  return (
    <Container className="portfolio-list-page">
      <Row className="mb-5">
        <Col>
          <h1 className="portfolio-main-title">Portfolio Categories</h1>
          <p className="portfolio-subtitle">Explore our diverse photography collections</p>
        </Col>
      </Row>
      <Row className="g-4">
        {categories.map((category) => (
          <Col key={category.slug} lg={4} md={6} sm={12}>
            <Card as={Link} to={`/portfolio/${category.slug}`} className="portfolio-category-card h-100">
              <Card.Body className="d-flex flex-column justify-content-center text-center">
                <Card.Title className="category-card-title">{category.name}</Card.Title>
                <Card.Text className="category-card-description">{category.description}</Card.Text>
                <div className="category-arrow">→</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PortfolioList;