import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { galleryAPI } from '../api';

const FullWidthSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await galleryAPI.getAll();
        setPhotos(response.data);
      } catch (error) {
        console.error('Failed to load photos');
      }
    };
    fetchPhotos();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = photos.filter(photo =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPhotos(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setFilteredPhotos([]);
      setShowDropdown(false);
    }
  }, [searchTerm, photos]);

  const handlePhotoClick = (photo) => {
    const categorySlug = photo.category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/portfolio/${categorySlug}`);
    setSearchTerm('');
    setShowDropdown(false);
  };

  return (
    <div className="full-width-search">
      <Container>
        <div className="search-wrapper">
          <Form.Control
            type="text"
            placeholder="Search this site"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="full-width-search-input"
          />
          {showDropdown && (
            <div className="full-width-search-dropdown">
              {filteredPhotos.slice(0, 5).map((photo) => (
                <div
                  key={photo.id}
                  className="search-item"
                  onClick={() => handlePhotoClick(photo)}
                >
                  <img src={photo.imageUrl} alt={photo.title} className="search-thumb" />
                  <div className="search-info">
                    <div className="search-title">{photo.title}</div>
                    <div className="search-category">{photo.category}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default FullWidthSearch;