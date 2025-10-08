# Photography Portfolio Frontend

React.js frontend for photography portfolio website.

## Features

- Responsive photo gallery
- Category-based filtering
- Search functionality
- Contact form
- Admin dashboard
- Admin login
- Mobile-friendly design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Backend Integration

This frontend connects to the backend API. Make sure the backend is running on port 5000.

Backend Repository: https://github.com/vashukyadav/website_backend

## Tech Stack

- React 18
- React Router DOM
- React Bootstrap
- Axios for API calls
- Bootstrap 5 for styling

## Pages

- `/` - Home page with gallery
- `/portfolio` - Portfolio categories
- `/portfolio/:category` - Category-specific photos
- `/contact` - Contact form
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard with inbox

## Environment Variables

Create `.env.local` file:
```
REACT_APP_API_URL=http://localhost:5000
```