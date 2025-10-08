import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { galleryAPI } from '../api';
import PhotoCard from './PhotoCard';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await galleryAPI.getAll();
        setPhotos(response.data);
      } catch (err) {
        setError('Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

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
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const firstRowPhotos = photos.slice(0, 4);
  const secondRowPhotos = photos.slice(4, 7);

  return (
    <Container className="gallery-section">
      <Row className="g-4 mb-4">
        {firstRowPhotos.map((photo) => (
          <Col key={photo.id} xl={3} lg={6} md={6} sm={12}>
            <PhotoCard photo={photo} />
          </Col>
        ))}
      </Row>
      <Row className="g-4 justify-content-center">
        {secondRowPhotos.map((photo) => (
          <Col key={photo.id} xl={3} lg={4} md={6} sm={12}>
            <PhotoCard photo={photo} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;