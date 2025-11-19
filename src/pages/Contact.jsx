import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { contactAPI } from '../api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.submit(formData);
      setAlert({ show: true, message: 'Message sent successfully! I will get back to you soon.', variant: 'success' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setAlert({ show: true, message: 'Failed to send message. Please try again.', variant: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ show: false, message: '', variant: '' });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container className="contact-page">
      <Row className="justify-content-center">
        <Col lg={10} md={12}>
          <div className="contact-content">
            <h2 className="contact-title text-center mb-5">Get In Touch</h2>
            
            <Row className="align-items-start">
              <Col md={6}>
                <div className="contact-info-section">
                  <div className="contact-image mb-4">
                    <img 
                      src="/varma.png" 
                      alt="Tarun Sahu" 
                      className="photographer-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/333/fff?text=Aman+Verma';
                      }}
                    />
                  </div>
                  <div className="contact-info">
                    <h3>Tarun Sahu</h3>
                    <p className="contact-subtitle">Professional Photographer</p>
                    
                    <div className="contact-details">
                      <div className="contact-item">
                        <strong>Email:</strong>
                        <p>tarunsahu@gmail.com</p>
                      </div>
                      
                      <div className="contact-item">
                        <strong>Phone:</strong>
                        <p>+91 8085259745</p>
                      </div>
                      
                      <div className="contact-item">
                        <strong>Instagram:</strong>
                        <p><a href="https://www.instagram.com/heyy_.tarunnn?igsh=MTNwOXJjbHYyZmlqdQ==" target="_blank" rel="noopener noreferrer">@heyy_.tarunnn</a></p>
                      </div>
                      
                      <div className="contact-item">
                        <strong>Location:</strong>
                        <p>Mumbai, India</p>
                      </div>
                      
                      <div className="contact-item">
                        <strong>Specialties:</strong>
                        <p>Portraits, Weddings, Editorial, Fashion</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              
              <Col md={6}>
                <Card className="contact-form-card">
                  <Card.Body>
                    <h4 className="mb-4">Send me a message</h4>
                    
                    {alert.show && (
                      <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                        {alert.message}
                      </Alert>
                    )}
                    
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 8085259745"
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-4">
                        <Form.Label>Message *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Tell me about your photography needs..."
                        />
                      </Form.Group>
                      
                      <Button 
                        type="submit" 
                        variant="primary" 
                        size="lg" 
                        className="w-100"
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;