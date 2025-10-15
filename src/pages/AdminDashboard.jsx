import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Form, Modal, Alert, Nav, Tab, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { galleryAPI, contactAPI, adminAPI } from '../api';
import api from '../api';

const AdminDashboard = () => {
  const [photos, setPhotos] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [newPhoto, setNewPhoto] = useState({ title: '', category: 'PORTRAIT', description: '', image: null });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('gallery');
  const navigate = useNavigate();

  const categories = ['PORTRAIT', 'COUPLE PORTRAIT', 'WEDDING', 'COCKTAIL', 'MONOCHROME', 'EDITORIAL', 'PRE WEDDING'];
  
  const groupedPhotos = categories.reduce((acc, category) => {
    acc[category] = Array.isArray(photos) ? photos.filter(photo => photo.category === category) : [];
    return acc;
  }, {});

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchPhotos();
    fetchContacts();
  }, [navigate]);

  const fetchPhotos = async () => {
    try {
      const response = await galleryAPI.getAll();
      const data = Array.isArray(response.data) ? response.data : [];
      setPhotos(data);
    } catch (error) {
      setMessage('Failed to load photos');
      setPhotos([]);
    }
  };

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setMessage('No admin token found');
        return;
      }
      const response = await api.get('/api/admin/contacts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = Array.isArray(response.data) ? response.data : [];
      setContacts(data);
    } catch (error) {
      console.error('Contact fetch error:', error);
      setMessage('Failed to load contacts: ' + (error.response?.data?.error || error.message));
      setContacts([]);
    }
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('title', newPhoto.title);
    formData.append('category', newPhoto.category);
    formData.append('description', newPhoto.description);
    formData.append('image', newPhoto.image);

    try {
      const token = localStorage.getItem('adminToken');
      await api.post('/api/admin/gallery', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Photo added successfully');
      setShowAddModal(false);
      setNewPhoto({ title: '', category: 'PORTRAIT', description: '', image: null });
      fetchPhotos();
    } catch (error) {
      setMessage('Failed to add photo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleDeletePhoto = async () => {
    if (!photoToDelete) return;

    try {
      const token = localStorage.getItem('adminToken');
      await api.delete(`/api/admin/gallery/${photoToDelete.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMessage('Photo deleted successfully');
      setShowDeleteModal(false);
      setPhotoToDelete(null);
      fetchPhotos();
    } catch (error) {
      setMessage('Failed to delete photo');
      setShowDeleteModal(false);
      setPhotoToDelete(null);
    }
  };

  const confirmDelete = (photo) => {
    setPhotoToDelete(photo);
    setShowDeleteModal(true);
  };

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await api.put(`/api/admin/contacts/${id}/read`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchContacts();
    } catch (error) {
      setMessage('Failed to mark as read');
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await api.delete(`/api/admin/contacts/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMessage('Contact deleted successfully');
      fetchContacts();
    } catch (error) {
      setMessage('Failed to delete contact');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const unreadCount = Array.isArray(contacts) ? contacts.filter(c => !c.read).length : 0;

  return (
    <Container className="admin-dashboard">
      <Row className="mb-4">
        <Col>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <h2 className="mb-3 mb-md-0">Admin Dashboard</h2>
            <div className="d-flex flex-column flex-sm-row gap-2">
              <Button variant="success" onClick={() => setShowAddModal(true)}>
                Add Photo
              </Button>
              <Button variant="outline-secondary" onClick={handleLogout} className="d-none d-lg-block">
                Logout
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {message && <Alert variant="info" onClose={() => setMessage('')} dismissible>{message}</Alert>}

      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="gallery">Gallery Management</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="inbox">
              Inbox {unreadCount > 0 && <Badge bg="danger">{unreadCount}</Badge>}
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="gallery">
            {categories.map((category) => (
              <div key={category} className="mb-5">
                <h4 className="category-section-title">{category} ({groupedPhotos[category].length})</h4>
                <Row className="g-3">
                  {groupedPhotos[category].map((photo) => (
                    <Col key={photo.id} xxl={2} xl={3} lg={4} md={6} sm={12}>
                      <Card className="admin-photo-card">
                        <Card.Img variant="top" src={photo.imageUrl} alt={photo.title} />
                        <Card.Body>
                          <Card.Title className="small">{photo.title}</Card.Title>
                          <Button variant="danger" size="sm" className="w-100" onClick={() => confirmDelete(photo)}>
                            Delete
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                  {groupedPhotos[category].length === 0 && (
                    <Col>
                      <p className="text-muted">No photos in this category</p>
                    </Col>
                  )}
                </Row>
              </div>
            ))}
          </Tab.Pane>

          <Tab.Pane eventKey="inbox">
            <div className="inbox-section">
              <h4 className="mb-4">Contact Messages ({contacts.length})</h4>
              {contacts.length === 0 ? (
                <Alert variant="info">No messages yet.</Alert>
              ) : (
                <div className="contacts-list">
                  {contacts.map((contact) => (
                    <Card key={contact._id || contact.id} className={`mb-3 ${!contact.read ? 'border-primary' : ''}`}>
                      <Card.Header className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{contact.name}</strong>
                          {!contact.read && <Badge bg="primary" className="ms-2">New</Badge>}
                        </div>
                        <small className="text-muted">
                          {new Date(contact.timestamp).toLocaleString()}
                        </small>
                      </Card.Header>
                      <Card.Body>
                        <div className="mb-2">
                          <strong>Email:</strong> {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="mb-2">
                            <strong>Phone:</strong> {contact.phone}
                          </div>
                        )}
                        <div className="mb-3">
                          <strong>Message:</strong>
                          <p className="mt-1">{contact.message}</p>
                        </div>
                        <div className="d-flex gap-2">
                          {!contact.read && (
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              onClick={() => handleMarkAsRead(contact.id)}
                            >
                              Mark as Read
                            </Button>
                          )}
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            onClick={() => handleDeleteContact(contact.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddPhoto}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newPhoto.title}
                onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={newPhoto.category}
                onChange={(e) => setNewPhoto({...newPhoto, category: e.target.value})}
              >
                {categories.map((cat, index) => (
                  <option key={`${cat}-${index}`} value={cat}>{cat}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newPhoto.description}
                onChange={(e) => setNewPhoto({...newPhoto, description: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setNewPhoto({...newPhoto, image: e.target.files[0]})}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success" disabled={loading}>
              {loading ? 'Adding...' : 'Add Photo'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-danger">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          {photoToDelete && (
            <div>
              <img 
                src={photoToDelete.imageUrl} 
                alt={photoToDelete.title}
                className="img-thumbnail mb-3"
                style={{ maxWidth: '150px', maxHeight: '150px' }}
              />
              <h5 className="mb-3">{photoToDelete.title}</h5>
              <p className="text-muted mb-4">
                Are you sure you want to delete this photo? This action cannot be undone.
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowDeleteModal(false)}
            className="px-4"
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeletePhoto}
            className="px-4 ms-3"
          >
            <i className="fas fa-trash me-2"></i>
            Delete Photo
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;