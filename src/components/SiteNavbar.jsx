import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import FullWidthSearch from './FullWidthSearch';

const SiteNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsLoggedIn(!!token);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    navigate('/');
    closeSidebar();
  };

  return (
    <>
      <Navbar 
        bg={scrolled ? 'dark' : 'white'} 
        variant={scrolled ? 'dark' : 'light'}
        expand="lg" 
        className={`site-navbar ${scrolled ? 'scrolled' : ''}`}
        fixed="top"
      >
        <Container fluid>
          {/* Mobile Layout: Hamburger + Brand + Search */}
          <div className={`d-lg-none mobile-nav-layout ${searchActive ? 'search-active' : ''}`}>
            {!searchActive && (
              <button 
                className="hamburger-menu" 
                onClick={toggleSidebar}
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}
            <Navbar.Brand as={Link} to="/" className={`brand-name ${scrolled ? 'text-white' : ''} ${searchActive ? 'd-none' : ''}`}>
              AMAN VERMA
            </Navbar.Brand>
            <div className="mobile-search">
              <SearchBar isMobile={true} onSearchActive={setSearchActive} />
            </div>
          </div>
          
          {/* Desktop Layout */}
          <Navbar.Brand as={Link} to="/" className={`brand-name d-none d-lg-block ${scrolled ? 'text-white' : ''}`}>
            AMAN VERMA
          </Navbar.Brand>

          {/* Desktop Navigation */}
          <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
            <Nav className="ms-auto">
              <NavDropdown title="PORTFOLIO" id="portfolio-dropdown" className="portfolio-dropdown">
                <NavDropdown.Item as={Link} to="/portfolio/couple-portrait">
                  COUPLE PORTRAIT
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/portfolio/portrait">
                  PORTRAIT
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/portfolio/wedding">
                  WEDDING
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/portfolio/cocktail">
                  COCKTAIL
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/portfolio/monochrome">
                  BLACK & WHITE
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/portfolio/editorial">
                  EDITORIAL
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/portfolio/pre-wedding">
                  PRE WEDDING
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/contact" aria-label="Contact">
                CONTACT
              </Nav.Link>
              <div className="navbar-search">
                <SearchBar />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Sidebar */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
      <div className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={closeSidebar}>
            ×
          </button>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-section">
            <h3 className="sidebar-title">PORTFOLIO</h3>
            <Link to="/portfolio/couple-portrait" className="sidebar-link" onClick={closeSidebar}>
              Couple Portrait
            </Link>
            <Link to="/portfolio/portrait" className="sidebar-link" onClick={closeSidebar}>
              Portrait
            </Link>
            <Link to="/portfolio/wedding" className="sidebar-link" onClick={closeSidebar}>
              Wedding
            </Link>
            <Link to="/portfolio/cocktail" className="sidebar-link" onClick={closeSidebar}>
              Cocktail
            </Link>
            <Link to="/portfolio/monochrome" className="sidebar-link" onClick={closeSidebar}>
              Black & White
            </Link>
            <Link to="/portfolio/editorial" className="sidebar-link" onClick={closeSidebar}>
              Editorial
            </Link>
            <Link to="/portfolio/pre-wedding" className="sidebar-link" onClick={closeSidebar}>
              Pre Wedding
            </Link>
          </div>
          <Link to="/contact" className="sidebar-main-link" onClick={closeSidebar}>
            CONTACT
          </Link>
          {!isLoggedIn ? (
            <Link to="/admin/login" className="sidebar-main-link" onClick={closeSidebar}>
              ADMIN LOGIN
            </Link>
          ) : (
            <Link to="/admin/dashboard" className="sidebar-main-link" onClick={closeSidebar}>
              ADMIN DASHBOARD
            </Link>
          )}
          <button className="sidebar-main-link" onClick={handleLogout} style={{background: 'none', border: 'none', textAlign: 'left', width: '100%'}}>
            LOGOUT
          </button>
        </div>
      </div>
    </>
  );
};

export default SiteNavbar;