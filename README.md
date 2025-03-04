
# ProcureFlow Dashboard

A modern procurement management dashboard built with HTML, CSS, and JavaScript for the frontend and Python Flask for the backend.

## Frontend Features

- Responsive dashboard with modern UI
- Interactive charts and statistics
- Tabbed interface for different data views
- Dark/light mode support
- Mobile-friendly design

## Backend Features

- RESTful API for procurement data
- Endpoints for requests, negotiations, purchase orders, and suppliers
- Simple authentication system
- Mock data for demonstration

## Prerequisites

- Python 3.7+
- Web browser

## Installation

1. Clone this repository
2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

## Running the Application

1. Start the Flask backend:

```bash
python app.py
```

2. Open your web browser and navigate to `http://localhost:5000`

## API Endpoints

- `/api/dashboard/summary` - Get dashboard summary statistics
- `/api/dashboard/procurement` - Get procurement activity data
- `/api/dashboard/vendors` - Get top vendors data
- `/api/dashboard/requests` - Get recent requests data
- `/api/requests` - Get, create, update, and delete procurement requests
- `/api/negotiations` - Get negotiation data
- `/api/purchase-orders` - Get purchase order data
- `/api/suppliers` - Get supplier data
- `/api/auth/login` - User authentication

## Further Development

For a production environment, consider:

1. Implementing a proper database (PostgreSQL, MongoDB)
2. Adding JWT authentication for secure API access
3. Implementing WebSockets for real-time features
4. Creating proper user management and role-based access control
5. Connecting to payment processing APIs (Stripe, PayPal)
6. Adding file upload capabilities for documents
7. Implementing notifications via email and in-app messaging
