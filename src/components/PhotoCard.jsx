import React from 'react';
import { Card } from 'react-bootstrap';
import CategoryButton from './CategoryButton';

const PhotoCard = ({ photo }) => {
  return (
    <Card className="photo-card h-100">
      <Card.Img 
        variant="top" 
        src={photo.imageUrl} 
        alt={photo.title}
        className="photo-image"
      />
      <Card.Body className="d-flex flex-column justify-content-end p-3">
        <CategoryButton category={photo.category} />
      </Card.Body>
    </Card>
  );
};

export default PhotoCard;