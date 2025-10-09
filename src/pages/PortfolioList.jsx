import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { galleryAPI } from '../api';
import ProductGrid from '../components/ProductGrid';

const PortfolioList = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await galleryAPI.getAll();
        setPhotos(response.data);
      } catch (err) {
        setError('Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <div>Loading...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <div>{error}</div>
      </Container>
    );
  }

  return (
    <div className="portfolio-list-page">
      <Container className="mb-4">
        <Row>
          <Col>
            <Button as={Link} to="/" variant="outline-secondary" className="mb-3">
              ← Back to Home
            </Button>
            <h2 className="category-title">All Portfolio</h2>
          </Col>
        </Row>
      </Container>
      
      {photos.length === 0 ? (
        <Container>
          <Row>
            <Col className="text-center py-5">
              <p>No photos found.</p>
            </Col>
          </Row>
        </Container>
      ) : (
        <ProductGrid photos={photos} />
      )}
    </div>
  );
};

export default PortfolioList;