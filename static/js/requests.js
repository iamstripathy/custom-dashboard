
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentPage = 1;
    const pageSize = 10;
    let totalPages = 1;
    let currentStatus = 'all';
    let currentDepartment = 'all';
    let currentSearch = '';

    // DOM elements
    const requestsTable = document.getElementById('requests-table');
    const searchInput = document.getElementById('search-requests');
    const statusFilter = document.getElementById('status-filter');
    const departmentFilter = document.getElementById('department-filter');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const noResultsContainer = document.getElementById('no-results');

    // Function to format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Function to get status badge HTML
    function getStatusBadge(status) {
        const statusClasses = {
            'draft': 'status-draft',
            'pending': 'status-pending',
            'approved': 'status-approved',
            'rejected': 'status-rejected',
            'completed': 'status-completed'
        };
        
        const statusIcons = {
            'draft': '<i class="fas fa-file-alt"></i>',
            'pending': '<i class="fas fa-clock"></i>',
            'approved': '<i class="fas fa-check-circle"></i>',
            'rejected': '<i class="fas fa-times-circle"></i>',
            'completed': '<i class="fas fa-check-double"></i>'
        };
        
        return `<span class="status-badge ${statusClasses[status]}">${statusIcons[status]} ${status.charAt(0).toUpperCase() + status.slice(1)}</span>`;
    }

    // Function to load requests data
    function loadRequests() {
        const url = `/api/requests?page=${currentPage}&limit=${pageSize}&status=${currentStatus}&department=${currentDepartment}&search=${currentSearch}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const { data: requests, meta } = data;
                
                // Update pagination info
                totalPages = meta.pages;
                currentPage = meta.page;
                
                // Clear existing table data
                const tbody = requestsTable.querySelector('tbody');
                tbody.innerHTML = '';
                
                if (requests.length === 0) {
                    // Show no results message
                    requestsTable.style.display = 'none';
                    noResultsContainer.style.display = 'flex';
                } else {
                    // Hide no results message and show table
                    requestsTable.style.display = 'table';
                    noResultsContainer.style.display = 'none';
                    
                    // Populate table
                    requests.forEach(request => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td><a href="/requests/${request.id}" class="request-link">${request.id}</a></td>
                            <td>${request.title}</td>
                            <td class="hide-mobile">${request.requester}</td>
                            <td class="hide-tablet">${request.department}</td>
                            <td class="hide-mobile">${formatDate(request.date)}</td>
                            <td>${getStatusBadge(request.status)}</td>
                            <td class="text-right">${request.amount}</td>
                        `;
                        tbody.appendChild(row);
                        
                        // Add click event to row
                        row.addEventListener('click', (e) => {
                            if (!e.target.classList.contains('request-link')) {
                                window.location.href = `/requests/${request.id}`;
                            }
                        });
                    });
                }
            })
            .catch(error => {
                console.error('Error loading requests:', error);
            });
    }

    // Initialize page
    loadRequests();

    // Event listeners for filters
    searchInput.addEventListener('input', debounce(function() {
        currentSearch = this.value;
        currentPage = 1;
        loadRequests();
    }, 300));

    statusFilter.addEventListener('change', function() {
        currentStatus = this.value;
        currentPage = 1;
        loadRequests();
    });

    departmentFilter.addEventListener('change', function() {
        currentDepartment = this.value;
        currentPage = 1;
        loadRequests();
    });

    // Clear filters
    clearFiltersBtn.addEventListener('click', function(e) {
        e.preventDefault();
        currentStatus = 'all';
        currentDepartment = 'all';
        currentSearch = '';
        currentPage = 1;
        
        // Reset input values
        searchInput.value = '';
        statusFilter.value = 'all';
        departmentFilter.value = 'all';
        
        loadRequests();
    });

    // Sidebar toggle functionality
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const layout = document.querySelector('.layout');
    
    sidebarToggle.addEventListener('click', function() {
        layout.classList.toggle('sidebar-collapsed');
    });

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        // Update icon
        const icon = this.querySelector('i');
        if (body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Helper function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
});
