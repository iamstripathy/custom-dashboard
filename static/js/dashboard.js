
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the sidebar toggle functionality
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const layout = document.querySelector('.layout');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            layout.classList.toggle('sidebar-collapsed');
        });
    }

    // Initialize the theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            
            // Update the theme toggle icon
            const icon = this.querySelector('i');
            if (body.classList.contains('dark-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // Initialize the tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove the active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add the active class to the clicked tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Fetch and render dashboard data
    fetchDashboardData();
});

// Function to fetch and render dashboard data
function fetchDashboardData() {
    // Fetch procurement activity data for the chart
    fetch('/api/dashboard/procurement')
        .then(response => response.json())
        .then(data => {
            renderProcurementChart(data);
        })
        .catch(error => console.error('Error fetching procurement data:', error));
    
    // Fetch top vendors data
    fetch('/api/dashboard/vendors')
        .then(response => response.json())
        .then(data => {
            renderTopVendors(data);
        })
        .catch(error => console.error('Error fetching vendors data:', error));
    
    // Fetch recent requests data
    fetch('/api/dashboard/requests')
        .then(response => response.json())
        .then(data => {
            renderRecentRequests(data);
        })
        .catch(error => console.error('Error fetching requests data:', error));
}

// Function to render the procurement chart
function renderProcurementChart(data) {
    const ctx = document.getElementById('procurement-chart');
    
    if (ctx && window.Chart) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.month),
                datasets: [
                    {
                        label: 'Total Requests',
                        data: data.map(item => item.requests),
                        backgroundColor: '#6366f1',
                        borderRadius: 4
                    },
                    {
                        label: 'Approved',
                        data: data.map(item => item.approved),
                        backgroundColor: '#10b981',
                        borderRadius: 4
                    },
                    {
                        label: 'Rejected',
                        data: data.map(item => item.rejected),
                        backgroundColor: '#ef4444',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }
}

// Function to render top vendors
function renderTopVendors(vendors) {
    const container = document.getElementById('top-vendors');
    
    if (container) {
        container.innerHTML = '';
        
        vendors.forEach(vendor => {
            const item = document.createElement('div');
            item.className = 'vendor-item';
            item.innerHTML = `
                <div class="vendor-info">
                    <div class="vendor-dot"></div>
                    <div class="vendor-details">
                        <div class="vendor-name">${vendor.name}</div>
                        <div class="vendor-category">${vendor.category}</div>
                    </div>
                </div>
                <div class="vendor-spend">${vendor.spend}</div>
            `;
            container.appendChild(item);
        });
    }
}

// Function to render recent requests
function renderRecentRequests(requests) {
    const container = document.getElementById('recent-requests');
    
    if (container) {
        container.innerHTML = '';
        
        requests.forEach(request => {
            const statusIcons = {
                'draft': '<i class="fas fa-file-alt"></i>',
                'pending': '<i class="fas fa-clock"></i>',
                'approved': '<i class="fas fa-check-circle"></i>',
                'rejected': '<i class="fas fa-times-circle"></i>'
            };
            
            const statusClasses = {
                'draft': 'status-draft',
                'pending': 'status-pending',
                'approved': 'status-approved',
                'rejected': 'status-rejected'
            };
            
            const item = document.createElement('div');
            item.className = 'request-item';
            item.innerHTML = `
                <div class="request-status ${statusClasses[request.status]}">
                    ${statusIcons[request.status]}
                </div>
                <div class="request-details">
                    <div class="request-title">${request.title}</div>
                    <div class="request-info">${request.id} • ${formatDate(request.date)}</div>
                </div>
                <div class="request-amount">${request.amount}</div>
            `;
            container.appendChild(item);
            
            // Make the request item clickable
            item.addEventListener('click', function() {
                window.location.href = `/requests/${request.id}`;
            });
        });
    }
}

// Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Add custom styles for the dashboard
document.head.appendChild(document.createElement('style')).textContent = `
.vendor-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);
}

.vendor-item:last-child {
    border-bottom: none;
}

.vendor-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.vendor-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--primary-color);
}

.vendor-name {
    font-size: 0.875rem;
    font-weight: 500;
}

.vendor-category {
    font-size: 0.75rem;
    color: var(--text-muted);
}

.vendor-spend {
    font-size: 0.875rem;
    font-weight: 500;
}

.request-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;
    transition: background-color 0.2s;
}

.request-item:hover {
    background-color: rgba(0, 0, 0, 0.02);
}

.request-item:last-child {
    border-bottom: none;
}

.request-status {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    flex-shrink: 0;
}

.request-status.status-draft {
    background-color: #f3f4f6;
    color: #6b7280;
}

.request-status.status-pending {
    background-color: #fef3c7;
    color: #d97706;
}

.request-status.status-approved {
    background-color: #d1fae5;
    color: #059669;
}

.request-status.status-rejected {
    background-color: #fee2e2;
    color: #dc2626;
}

.request-details {
    flex: 1;
}

.request-title {
    font-size: 0.875rem;
    font-weight: 500;
}

.request-info {
    font-size: 0.75rem;
    color: var(--text-muted);
}

.request-amount {
    font-size: 0.875rem;
    font-weight: 500;
}
`;
