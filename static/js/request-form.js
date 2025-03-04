
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const requestForm = document.getElementById('request-form');
    const titleInput = document.getElementById('title');
    const requesterInput = document.getElementById('requester');
    const departmentSelect = document.getElementById('department');
    const amountInput = document.getElementById('amount');
    const prioritySelect = document.getElementById('priority');
    const descriptionTextarea = document.getElementById('description');
    const cancelButton = document.getElementById('cancel-button');
    const saveDraftButton = document.getElementById('save-draft-button');
    const submitButton = document.getElementById('submit-button');
    
    // Format amount input to currency
    amountInput.addEventListener('input', function(e) {
        // Remove non-numeric characters
        let value = this.value.replace(/[^0-9.]/g, '');
        
        // Ensure only one decimal point
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        // Format to 2 decimal places if there's a decimal point
        if (value.includes('.')) {
            const decimalPart = parts[1].substring(0, 2);
            value = parts[0] + '.' + decimalPart;
        }
        
        // Update input value
        this.value = value;
    });
    
    // Cancel button
    cancelButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
            window.location.href = '/requests';
        }
    });
    
    // Save as draft
    saveDraftButton.addEventListener('click', function() {
        submitRequest('draft');
    });
    
    // Submit the form
    requestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitRequest('pending');
    });
    
    // Function to submit the request
    function submitRequest(status) {
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Create request data
        const requestData = {
            title: titleInput.value.trim(),
            requester: requesterInput.value.trim(),
            department: departmentSelect.value,
            amount: formatAmountWithDollarSign(amountInput.value),
            priority: prioritySelect.value,
            description: descriptionTextarea.value.trim(),
            status: status
        };
        
        // Send request to server
        fetch('/api/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Error: ${data.error}`);
                return;
            }
            
            // Display success message
            alert(`Request successfully ${status === 'draft' ? 'saved as draft' : 'submitted'}`);
            
            // Redirect to request details page
            window.location.href = `/requests/${data.id}`;
        })
        .catch(error => {
            console.error('Error creating request:', error);
            alert('An error occurred while creating the request. Please try again.');
        });
    }
    
    // Validate form
    function validateForm() {
        let isValid = true;
        
        // Reset error states
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('has-error');
        });
        
        // Validate required fields
        if (!titleInput.value.trim()) {
            titleInput.parentElement.classList.add('has-error');
            isValid = false;
        }
        
        if (!requesterInput.value.trim()) {
            requesterInput.parentElement.classList.add('has-error');
            isValid = false;
        }
        
        if (!departmentSelect.value) {
            departmentSelect.parentElement.classList.add('has-error');
            isValid = false;
        }
        
        if (!amountInput.value.trim()) {
            amountInput.parentElement.classList.add('has-error');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Format amount with dollar sign
    function formatAmountWithDollarSign(amount) {
        // Parse float and round to 2 decimal places
        const parsedAmount = parseFloat(amount).toFixed(2);
        return `$${parsedAmount}`;
    }
    
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
    
    // Additional CSS for form validation
    const style = document.createElement('style');
    style.textContent = `
        .form-row {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -0.5rem 1rem;
        }
        
        .form-group {
            flex: 1;
            min-width: 0;
            padding: 0 0.5rem;
            margin-bottom: 1rem;
        }
        
        @media (max-width: 640px) {
            .form-row {
                flex-direction: column;
            }
            
            .form-group {
                width: 100%;
            }
        }
        
        .form-group.full-width {
            width: 100%;
            flex-basis: 100%;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
        }
        
        .form-group input, 
        .form-group select, 
        .form-group textarea {
            width: 100%;
            padding: 0.625rem 1rem;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            background-color: transparent;
            color: var(--text-color);
            font-size: 0.875rem;
            transition: border-color 0.2s;
        }
        
        .form-group input:focus, 
        .form-group select:focus, 
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary-color);
        }
        
        .form-group.has-error input, 
        .form-group.has-error select, 
        .form-group.has-error textarea {
            border-color: var(--danger-color);
        }
        
        .form-help {
            font-size: 0.75rem;
            color: var(--text-muted);
            margin-top: 0.25rem;
        }
        
        .input-with-prefix {
            display: flex;
            align-items: center;
        }
        
        .input-prefix {
            padding: 0.625rem 0.75rem;
            background-color: var(--border-color);
            border: 1px solid var(--border-color);
            border-right: none;
            border-radius: var(--border-radius) 0 0 var(--border-radius);
            color: var(--text-muted);
        }
        
        .input-with-prefix input {
            border-radius: 0 var(--border-radius) var(--border-radius) 0;
        }
        
        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 0.75rem;
            margin-top: 2rem;
        }
    `;
    document.head.appendChild(style);
});
