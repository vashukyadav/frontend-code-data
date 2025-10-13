import React from 'react';
import { Container } from 'react-bootstrap';
import CategoryButton from './CategoryButton';

const ProductGrid = ({ photos }) => {
  if (!photos || photos.length === 0) return null;

  // Group photos for visual storytelling
  const groupPhotos = (photos) => {
    const groups = [];
    let currentGroup = [];
    
    photos.forEach((photo, index) => {
      currentGroup.push(photo);
      
      // Create groups of 3-5 photos for visual balance
      if (currentGroup.length >= 3 && (index + 1) % 4 === 0) {
        groups.push([...currentGroup]);
        currentGroup = [];
      }
    });
    
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }
    
    return groups;
  };

  const photoGroups = groupPhotos(photos);

  return (
    <Container className="product-grid-container">
      {photoGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="photo-group">
          <div className="grid-layout">
            {group.map((photo, photoIndex) => {
              // Assign grid positions for dynamic layout
              const gridClass = getGridClass(photoIndex, group.length);
              
              return (
                <div key={photo._id || photo.id || photoIndex} className={`grid-item ${gridClass}`}>
                  <div className="photo-wrapper">
                    <img 
                      src={photo.imageUrl} 
                      alt={photo.title}
                      className="grid-photo"
                    />
                    <div className="photo-overlay">
                      <CategoryButton category={photo.category} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </Container>
  );
};

// Helper function to assign grid classes for dynamic sizing
const getGridClass = (index, groupSize) => {
  const patterns = {
    3: ['large', 'medium', 'medium'],
    4: ['large', 'small', 'medium', 'small'],
    5: ['medium', 'large', 'small', 'small', 'medium']
  };
  
  const pattern = patterns[groupSize] || patterns[4];
  return pattern[index % pattern.length];
};

export default ProductGrid;