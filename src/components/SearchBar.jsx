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

  const handleDesktopSearchToggle = () => {
    setShowDesktopSearch(!showDesktopSearch);
  };

  const closeDesktopSearch = () => {
    setShowDesktopSearch(false);
    setSearchTerm('');
    setShowDropdown(false);
  };

  if (isMobile) {
    return (
      <>
        <div className="mobile-search-wrapper">
          <button 
            className="search-icon-btn"
            onClick={handleMobileSearchToggle}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
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
    <>
      <div className="search-container">
        <button 
          className="search-icon-btn"
          onClick={handleDesktopSearchToggle}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>
      {showDesktopSearch && (
        <div className="desktop-search-fullscreen">
          <div className="desktop-search-header">
            <Form.Control
              type="text"
              placeholder="Search this site"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="desktop-search-input"
              autoFocus
            />
            <button className="close-search-btn" onClick={closeDesktopSearch}>
              ×
            </button>
          </div>
          {showDropdown && (
            <div className="desktop-search-results">
              {filteredPhotos.slice(0, 5).map((photo) => (
                <div
                  key={photo.id}
                  className="search-item"
                  onClick={() => {
                    handlePhotoClick(photo);
                    closeDesktopSearch();
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
};

export default SearchBar;