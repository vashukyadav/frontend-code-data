import React from 'react';
import { Card } from 'react-bootstrap';

const CategoryPhotoCard = ({ photo }) => {
  return (
    <Card className="photo-card h-100 border-0">
      <Card.Img 
        variant="top" 
        src={photo.imageUrl} 
        alt={photo.title}
        className="photo-image"
        style={{ objectFit: 'cover', height: '400px', width: '100%' }}
      />
    </Card>
  );
};

export default CategoryPhotoCard;