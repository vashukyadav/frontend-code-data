import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { galleryAPI } from '../api';

const SearchBar = ({ isMobile = false, onSearchActive }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showDesktopSearch, setShowDesktopSearch] = useState(false);
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
    setShowMobileSearch(false);
  };

  const handleMobileSearchToggle = () => {
    const newState = !showMobileSearch;
    setShowMobileSearch(newState);
    if (onSearchActive) {
      onSearchActive(newState);
    }
  };

  const closeMobileSearch = () => {
    setShowMobileSearch(false);
    setSearchTerm('');
    setShowDropdown(false);
    if (onSearchActive) {
      onSearchActive(false);
    }
  };

  if (isMobile) {
    return (
      <>
        <div className="mobile-search-wrapper">
          <button 
            className="search-icon-btn"
            onClick={handleMobileSearchToggle}
          >
            🔍
          </button>
        </div>
        {showMobileSearch && (
          <div className="mobile-search-fullscreen">
            <div className="mobile-search-header">
              <Form.Control
                type="text"
                placeholder="Search this site"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mobile-search-input"
                autoFocus
              />
              <button className="close-search-btn" onClick={closeMobileSearch}>
                ×
              </button>
            </div>
            {showDropdown && (
              <div className="mobile-search-results">
                {filteredPhotos.slice(0, 5).map((photo) => (
                  <div
                    key={photo.id}
                    className="search-item"
                    onClick={() => {
                      handlePhotoClick(photo);
                      closeMobileSearch();
                    }}
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
        )}
      </>
    );
  }

  return (
    <div className="search-container">
      <button 
        className="search-icon-btn"
        onClick={() => setShowDesktopSearch(!showDesktopSearch)}
      >
        🔍
      </button>
      {showDesktopSearch && (
        <div className="desktop-search-dropdown">
          <Form.Control
            type="text"
            placeholder="Search this site"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="full-width-search-input"
            autoFocus
          />
          {showDropdown && (
            <div className="full-width-search-dropdown">
              {filteredPhotos.slice(0, 5).map((photo) => (
                <div
                  key={photo.id}
                  className="search-item"
                  onClick={() => {
                    handlePhotoClick(photo);
                    setShowDesktopSearch(false);
                  }}
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
      )}
    </div>
  );
};

export default SearchBar;