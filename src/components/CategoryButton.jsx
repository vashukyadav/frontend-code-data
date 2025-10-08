import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryButton = ({ category }) => {
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Button 
      as={Link}
      to={`/portfolio/${categorySlug}`}
      variant="outline-dark" 
      size="sm" 
      className="category-button"
      aria-label={`View ${category} portfolio`}
    >
      {category}
    </Button>
  );
};

export default CategoryButton;