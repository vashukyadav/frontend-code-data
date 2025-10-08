import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { galleryAPI } from '../api';
import CategoryPhotoCard from '../components/CategoryPhotoCard';

const CategoryPage = () => {
  const { category } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await galleryAPI.getAll();
        const categoryName = category.replace(/-/g, ' ').toUpperCase();
        const filteredPhotos = response.data.filter(
          photo => photo.category === categoryName
        );
        setPhotos(filteredPhotos);
      } catch (err) {
        setError('Failed to load category photos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [category]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const categoryName = category.replace(/-/g, ' ').toUpperCase();

  return (
    <Container fluid className="category-page px-3">
      <Row className="mb-4">
        <Col>
          <Button as={Link} to="/" variant="outline-secondary" className="mb-3">
            ← Back to Gallery
          </Button>
          <h2 className="category-title">{categoryName}</h2>
        </Col>
      </Row>
      <Row className="g-3">
        {photos.map((photo) => (
          <Col key={photo.id} xs={12} sm={6} lg={4}>
            <CategoryPhotoCard photo={photo} />
          </Col>
        ))}
      </Row>
      {photos.length === 0 && (
        <Row>
          <Col className="text-center py-5">
            <p>No photos found in this category.</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CategoryPage;