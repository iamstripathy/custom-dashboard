
# ProcureFlow - Procurement Management System

ProcureFlow is a modern procurement and negotiation workflow management system built with Python Flask, HTML, CSS, and JavaScript.

## Features

- Dashboard with procurement metrics and activity visualization
- Purchase request management
- Supplier management
- Negotiation workflow
- Purchase order processing
- Role-based access control
- Dark/light theme toggle

## Getting Started

### Prerequisites

- Python 3.6 or higher
- pip (Python package manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/procureflow.git
   cd procureflow
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

### Running the Application

1. Start the Flask application:
   ```
   python app.py
   ```

2. Open your browser and navigate to:
   ```
   http://127.0.0.1:5000/
   ```

## Project Structure

```
procureflow/
├── app.py                  # Flask application and API routes
├── requirements.txt        # Python dependencies
├── static/                 # Static files (CSS, JS, images)
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   └── js/
│       ├── dashboard.js    # Dashboard functionality
│       ├── requests.js     # Request list functionality
│       ├── request-detail.js  # Request detail page
│       └── request-form.js    # Request form handling
└── templates/              # HTML templates
    ├── index.html          # Dashboard page
    ├── requests.html       # Request list page
    ├── request_detail.html # Request detail page
    └── request_form.html   # New/edit request form
```

## Usage

### Dashboard

The dashboard provides a comprehensive overview of procurement activities, including:
- Key metrics (total requests, pending approvals, total spent, active vendors)
- Monthly procurement activity chart
- Top vendors by spend
- Recent purchase requests

### Purchase Requests

- View all purchase requests with filtering and searching capabilities
- Create new purchase requests
- View detailed information about specific requests
- Approve, reject, or negotiate on requests

### User Interface

- Responsive design that works on desktop and mobile devices
- Dark/light theme toggle for user preference
- Collapsible sidebar for maximizing screen space

## API Documentation

The application provides a RESTful API for integration with other systems.

### Authentication

```
POST /api/auth/login
```

### Dashboard Data

```
GET /api/dashboard/summary
GET /api/dashboard/procurement
GET /api/dashboard/vendors
GET /api/dashboard/requests
```

### Requests

```
GET /api/requests
POST /api/requests
GET /api/requests/:id
PUT /api/requests/:id
DELETE /api/requests/:id
```

### Negotiations

```
GET /api/negotiations
```

### Purchase Orders

```
GET /api/purchase-orders
```

### Suppliers

```
GET /api/suppliers
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
