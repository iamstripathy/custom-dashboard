
document.addEventListener('DOMContentLoaded', function() {
    // Get the request ID from the URL
    const requestId = window.location.pathname.split('/').pop();
    
    // Fetch request details
    fetch(`/api/requests/${requestId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Request not found');
            }
            return response.json();
        })
        .then(request => {
            // Update the UI with request details
            document.getElementById('request-id').textContent = request.id;
            document.getElementById('request-title').textContent = request.title;
            document.getElementById('request-requester').textContent = request.requester;
            document.getElementById('request-department').textContent = request.department || 'N/A';
            document.getElementById('request-date').textContent = formatDate(request.date);
            document.getElementById('request-amount').textContent = request.amount;
            
            // Update the status
            const statusElement = document.getElementById('request-status');
            statusElement.innerHTML = getStatusBadge(request.status);
            
            // Update action buttons based on status
            updateActionButtons(request.status);
            
            // Set page title
            document.title = `${request.id} - ${request.title} | ProcureFlow`;
        })
        .catch(error => {
            console.error('Error loading request details:', error);
            // Show error message
            document.querySelector('.request-detail-container').innerHTML = `
                <div class="error-message">
                    <h3>Request not found</h3>
                    <p>The requested purchase request could not be found. It may have been deleted or you don't have permission to view it.</p>
                    <a href="/requests" class="button primary">
                        <i class="fas fa-arrow-left"></i>
                        Back to Requests
                    </a>
                </div>
            `;
        });
    
    // Event listeners for action buttons
    document.getElementById('edit-request').addEventListener('click', function() {
        window.location.href = `/requests/${requestId}/edit`;
    });
    
    document.getElementById('approve-button').addEventListener('click', function() {
        updateRequestStatus('approved');
    });
    
    document.getElementById('reject-button').addEventListener('click', function() {
        updateRequestStatus('rejected');
    });
    
    document.getElementById('negotiate-button').addEventListener('click', function() {
        window.location.href = `/negotiations/new?request=${requestId}`;
    });
    
    document.getElementById('create-po-button').addEventListener('click', function() {
        window.location.href = `/orders/new?request=${requestId}`;
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
});

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
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

// Function to update action buttons based on status
function updateActionButtons(status) {
    const approveButton = document.getElementById('approve-button');
    const rejectButton = document.getElementById('reject-button');
    const negotiateButton = document.getElementById('negotiate-button');
    const createPoButton = document.getElementById('create-po-button');
    
    // Reset all buttons
    approveButton.style.display = 'inline-flex';
    rejectButton.style.display = 'inline-flex';
    negotiateButton.style.display = 'inline-flex';
    createPoButton.style.display = 'inline-flex';
    
    // Disable inappropriate actions based on status
    if (status === 'approved') {
        approveButton.style.display = 'none';
        rejectButton.style.display = 'none';
        negotiateButton.style.display = 'none';
    } else if (status === 'rejected') {
        approveButton.style.display = 'none';
        rejectButton.style.display = 'none';
        negotiateButton.style.display = 'none';
        createPoButton.style.display = 'none';
    } else if (status === 'completed') {
        approveButton.style.display = 'none';
        rejectButton.style.display = 'none';
        negotiateButton.style.display = 'none';
        createPoButton.style.display = 'none';
    }
}

// Function to update request status
function updateRequestStatus(newStatus) {
    const requestId = window.location.pathname.split('/').pop();
    
    fetch(`/api/requests/${requestId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status: newStatus
        }),
    })
    .then(response => response.json())
    .then(updatedRequest => {
        // Update the status badge
        document.getElementById('request-status').innerHTML = getStatusBadge(updatedRequest.status);
        
        // Update action buttons
        updateActionButtons(updatedRequest.status);
        
        // Show success message (in a real app, would use toast notification)
        alert(`Request status updated to ${newStatus}`);
    })
    .catch(error => {
        console.error('Error updating request status:', error);
        alert('Failed to update request status. Please try again.');
    });
}
