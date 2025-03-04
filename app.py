
from flask import Flask, request, jsonify, send_from_directory, render_template
from flask_cors import CORS
import json
import os
from datetime import datetime, timedelta
import uuid

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)  # Enable CORS for all routes

# In-memory data storage (in a real app, you would use a database)
procurement_data = [
    {"month": "Jan", "requests": 14, "approved": 12, "rejected": 2},
    {"month": "Feb", "requests": 19, "approved": 15, "rejected": 4},
    {"month": "Mar", "requests": 23, "approved": 20, "rejected": 3},
    {"month": "Apr", "requests": 18, "approved": 14, "rejected": 4},
    {"month": "May", "requests": 25, "approved": 22, "rejected": 3},
    {"month": "Jun", "requests": 28, "approved": 24, "rejected": 4},
]

top_vendors = [
    {"name": "Acme Supplies Inc.", "spend": "$45,280", "category": "Office Supplies"},
    {"name": "TechPro Solutions", "spend": "$38,750", "category": "IT Hardware"},
    {"name": "Global Software Ltd", "spend": "$32,400", "category": "Software"},
    {"name": "Meridian Services", "spend": "$28,900", "category": "Consulting"},
    {"name": "Prime Logistics", "spend": "$26,340", "category": "Shipping"},
]

requests_data = [
    {"id": "RFQ-2023-1287", "title": "Office Supplies Bulk Order", "requester": "Jane Cooper", "department": "Administration", "date": "2023-06-15", "status": "approved", "amount": "$1,250"},
    {"id": "RFQ-2023-1286", "title": "IT Hardware Procurement", "requester": "Wade Warren", "department": "IT", "date": "2023-06-14", "status": "pending", "amount": "$12,750"},
    {"id": "RFQ-2023-1285", "title": "Software Licenses Renewal", "requester": "Esther Howard", "department": "IT", "date": "2023-06-13", "status": "draft", "amount": "$8,500"},
    {"id": "RFQ-2023-1284", "title": "Marketing Materials", "requester": "Cameron Williamson", "department": "Marketing", "date": "2023-06-12", "status": "rejected", "amount": "$3,200"},
    {"id": "RFQ-2023-1283", "title": "Office Furniture", "requester": "Brooklyn Simmons", "department": "Facilities", "date": "2023-06-11", "status": "approved", "amount": "$5,800"},
    {"id": "RFQ-2023-1282", "title": "Training Program Materials", "requester": "Leslie Alexander", "department": "HR", "date": "2023-06-10", "status": "pending", "amount": "$2,300"},
    {"id": "RFQ-2023-1281", "title": "Sales Conference Equipment", "requester": "Dianne Russell", "department": "Sales", "date": "2023-06-09", "status": "approved", "amount": "$9,200"},
    {"id": "RFQ-2023-1280", "title": "Research Lab Supplies", "requester": "Robert Fox", "department": "Research", "date": "2023-06-08", "status": "draft", "amount": "$15,600"},
]

summary_data = {
    "total_requests": 127,
    "pending_approval": 24,
    "total_spent": "$284,543",
    "active_vendors": 38
}

# Routes to serve HTML pages
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/requests')
def request_list():
    return render_template('requests.html')

@app.route('/requests/new')
def request_new():
    return render_template('request_form.html')

@app.route('/requests/<request_id>')
def request_detail(request_id):
    return render_template('request_detail.html', request_id=request_id)

@app.route('/negotiations')
def negotiations():
    return render_template('negotiations.html')

@app.route('/orders')
def orders():
    return render_template('orders.html')

@app.route('/suppliers')
def suppliers():
    return render_template('suppliers.html')

# Routes to serve static files
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

# API routes
@app.route('/api/dashboard/summary', methods=['GET'])
def get_summary():
    return jsonify(summary_data)

@app.route('/api/dashboard/procurement', methods=['GET'])
def get_procurement_data():
    return jsonify(procurement_data)

@app.route('/api/dashboard/vendors', methods=['GET'])
def get_top_vendors():
    return jsonify(top_vendors)

@app.route('/api/dashboard/requests', methods=['GET'])
def get_recent_requests():
    return jsonify(requests_data[:4])  # Return only the 4 most recent requests

# API route to get all requests with pagination and filtering
@app.route('/api/requests', methods=['GET'])
def get_all_requests():
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    status = request.args.get('status')
    department = request.args.get('department')
    search = request.args.get('search', '')
    
    filtered_requests = requests_data
    
    # Apply filters
    if status and status != 'all':
        filtered_requests = [r for r in filtered_requests if r['status'] == status]
        
    if department and department != 'all':
        filtered_requests = [r for r in filtered_requests if r['department'] == department]
        
    if search:
        search = search.lower()
        filtered_requests = [r for r in filtered_requests if 
                            search in r['id'].lower() or 
                            search in r['title'].lower() or 
                            search in r['requester'].lower()]
    
    # Simulate pagination
    start_idx = (page - 1) * limit
    end_idx = start_idx + limit
    paginated_requests = filtered_requests[start_idx:end_idx]
    
    return jsonify({
        'data': paginated_requests,
        'meta': {
            'total': len(filtered_requests),
            'page': page,
            'limit': limit,
            'pages': (len(filtered_requests) + limit - 1) // limit
        }
    })

# API route to get a single request by ID
@app.route('/api/requests/<request_id>', methods=['GET'])
def get_request(request_id):
    for req in requests_data:
        if req['id'] == request_id:
            return jsonify(req)
    return jsonify({'error': 'Request not found'}), 404

# API route to create a new request
@app.route('/api/requests', methods=['POST'])
def create_request():
    data = request.json
    
    # Validate required fields
    required_fields = ['title', 'requester', 'amount', 'department']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Create new request
    new_request = {
        'id': f"RFQ-{datetime.now().year}-{len(requests_data) + 1288}",
        'title': data['title'],
        'requester': data['requester'],
        'department': data['department'],
        'date': datetime.now().strftime('%Y-%m-%d'),
        'status': 'draft',
        'amount': data['amount']
    }
    
    # Add the new request to our "database"
    requests_data.append(new_request)
    
    return jsonify(new_request), 201

# API route to update a request
@app.route('/api/requests/<request_id>', methods=['PUT'])
def update_request(request_id):
    data = request.json
    
    for i, req in enumerate(requests_data):
        if req['id'] == request_id:
            # Update the request
            for key, value in data.items():
                if key in req:
                    requests_data[i][key] = value
            
            return jsonify(requests_data[i])
    
    return jsonify({'error': 'Request not found'}), 404

# API route to delete a request
@app.route('/api/requests/<request_id>', methods=['DELETE'])
def delete_request(request_id):
    for i, req in enumerate(requests_data):
        if req['id'] == request_id:
            del requests_data[i]
            return jsonify({'success': True, 'message': 'Request deleted successfully'})
    
    return jsonify({'error': 'Request not found'}), 404

# API routes for negotiation module
@app.route('/api/negotiations', methods=['GET'])
def get_negotiations():
    # This would typically be fetched from a database
    negotiations = [
        {
            'id': 'NEG-2023-001',
            'request_id': 'RFQ-2023-1286',
            'supplier': 'TechPro Solutions',
            'status': 'active',
            'created_at': '2023-06-15',
            'last_message_at': '2023-06-16'
        },
        {
            'id': 'NEG-2023-002',
            'request_id': 'RFQ-2023-1285',
            'supplier': 'Global Software Ltd',
            'status': 'completed',
            'created_at': '2023-06-13',
            'last_message_at': '2023-06-14'
        }
    ]
    
    return jsonify(negotiations)

# API routes for purchase orders
@app.route('/api/purchase-orders', methods=['GET'])
def get_purchase_orders():
    # This would typically be fetched from a database
    purchase_orders = [
        {
            'id': 'PO-2023-001',
            'request_id': 'RFQ-2023-1287',
            'supplier': 'Acme Supplies Inc.',
            'status': 'processed',
            'created_at': '2023-06-16',
            'amount': '$1,250'
        }
    ]
    
    return jsonify(purchase_orders)

# API route for suppliers
@app.route('/api/suppliers', methods=['GET'])
def get_suppliers():
    suppliers = [
        {
            'id': 'SUP-001',
            'name': 'Acme Supplies Inc.',
            'category': 'Office Supplies',
            'contact_email': 'sales@acmesupplies.com',
            'rating': 4.5
        },
        {
            'id': 'SUP-002',
            'name': 'TechPro Solutions',
            'category': 'IT Hardware',
            'contact_email': 'info@techpro.com',
            'rating': 4.2
        },
        {
            'id': 'SUP-003',
            'name': 'Global Software Ltd',
            'category': 'Software',
            'contact_email': 'sales@globalsoftware.com',
            'rating': 4.8
        }
    ]
    
    return jsonify(suppliers)

# API route for user authentication (simplified for demonstration)
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    
    # This is a simplified example - in a real application,
    # you would verify credentials against a database
    if data.get('email') == 'admin@example.com' and data.get('password') == 'password':
        return jsonify({
            'user': {
                'id': 'user-001',
                'name': 'John Doe',
                'email': 'admin@example.com',
                'role': 'procurement_manager'
            },
            'token': 'sample-jwt-token-would-go-here'
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401

if __name__ == '__main__':
    # Ensure directories exist
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
