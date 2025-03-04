
// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  
  // Sample data for charts and lists
  const procurementData = [
    { month: "Jan", requests: 14, approved: 12, rejected: 2 },
    { month: "Feb", requests: 19, approved: 15, rejected: 4 },
    { month: "Mar", requests: 23, approved: 20, rejected: 3 },
    { month: "Apr", requests: 18, approved: 14, rejected: 4 },
    { month: "May", requests: 25, approved: 22, rejected: 3 },
    { month: "Jun", requests: 28, approved: 24, rejected: 4 },
  ];

  const topVendors = [
    { name: "Acme Supplies Inc.", spend: "$45,280", category: "Office Supplies" },
    { name: "TechPro Solutions", spend: "$38,750", category: "IT Hardware" },
    { name: "Global Software Ltd", spend: "$32,400", category: "Software" },
    { name: "Meridian Services", spend: "$28,900", category: "Consulting" },
    { name: "Prime Logistics", spend: "$26,340", category: "Shipping" },
  ];

  const recentRequests = [
    { id: "RFQ-2023-1287", title: "Office Supplies Bulk Order", requester: "Jane Cooper", date: "2023-06-15", status: "approved", amount: "$1,250" },
    { id: "RFQ-2023-1286", title: "IT Hardware Procurement", requester: "Wade Warren", date: "2023-06-14", status: "pending", amount: "$12,750" },
    { id: "RFQ-2023-1285", title: "Software Licenses Renewal", requester: "Esther Howard", date: "2023-06-13", status: "draft", amount: "$8,500" },
    { id: "RFQ-2023-1284", title: "Marketing Materials", requester: "Cameron Williamson", date: "2023-06-12", status: "rejected", amount: "$3,200" },
  ];
  
  // Initialize chart
  initChart(procurementData);
  
  // Populate vendors list
  populateVendors(topVendors);
  
  // Populate recent requests
  populateRequests(recentRequests);
  
  // Setup event listeners
  setupEventListeners();
});

// Initialize the procurement chart
function initChart(data) {
  const ctx = document.getElementById('procurementChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.month),
      datasets: [
        {
          label: 'Total Requests',
          data: data.map(d => d.requests),
          backgroundColor: '#9b87f5',
          borderRadius: 4,
        },
        {
          label: 'Approved',
          data: data.map(d => d.approved),
          backgroundColor: '#10b981',
          borderRadius: 4,
        },
        {
          label: 'Rejected',
          data: data.map(d => d.rejected),
          backgroundColor: '#ef4444',
          borderRadius: 4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  });
}

// Populate vendors list
function populateVendors(vendors) {
  const vendorsList = document.getElementById('topVendors');
  
  vendors.forEach(vendor => {
    const vendorItem = document.createElement('div');
    vendorItem.className = 'vendor-item';
    
    vendorItem.innerHTML = `
      <div class="vendor-indicator"></div>
      <div class="vendor-details">
        <p class="vendor-name">${vendor.name}</p>
        <p class="vendor-category">${vendor.category}</p>
      </div>
      <div class="vendor-spend">${vendor.spend}</div>
    `;
    
    vendorsList.appendChild(vendorItem);
  });
}

// Populate recent requests
function populateRequests(requests) {
  const requestsList = document.getElementById('recentRequests');
  
  requests.forEach(request => {
    const requestItem = document.createElement('div');
    requestItem.className = 'request-item';
    
    let iconHtml = '';
    if (request.status === 'approved') {
      iconHtml = '<div class="request-icon"><i data-lucide="check-circle" class="approved"></i></div>';
    } else if (request.status === 'pending') {
      iconHtml = '<div class="request-icon"><i data-lucide="clock" class="pending"></i></div>';
    } else if (request.status === 'rejected') {
      iconHtml = '<div class="request-icon"><i data-lucide="x-circle" class="rejected"></i></div>';
    } else if (request.status === 'draft') {
      iconHtml = '<div class="request-icon"><i data-lucide="file-text" class="draft"></i></div>';
    }
    
    requestItem.innerHTML = `
      ${iconHtml}
      <div class="request-details">
        <p class="request-title">${request.title}</p>
        <p class="request-meta">${request.id} • ${request.date}</p>
      </div>
      <div class="request-amount">${request.amount}</div>
    `;
    
    requestsList.appendChild(requestItem);
  });
  
  // Initialize Lucide icons for the newly added DOM elements
  lucide.createIcons();
}

// Setup all event listeners
function setupEventListeners() {
  // Sidebar toggle
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      
      // Create or remove overlay
      let overlay = document.querySelector('.sidebar-overlay');
      if (!overlay && sidebar.classList.contains('open')) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay active';
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => {
          sidebar.classList.remove('open');
          overlay.remove();
        });
      } else if (overlay && !sidebar.classList.contains('open')) {
        overlay.remove();
      }
    });
  }
  
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      themeIcon.setAttribute('data-lucide', 'sun');
    } else {
      themeIcon.setAttribute('data-lucide', 'moon');
    }
    
    lucide.createIcons();
  });
  
  // User dropdown
  const userAvatarButton = document.querySelector('.user-avatar-button');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  if (userAvatarButton) {
    userAvatarButton.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      dropdownMenu.classList.remove('active');
    });
  }
  
  // Tab switching
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show selected tab content
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabName) {
          content.classList.add('active');
        }
      });
    });
  });
}
