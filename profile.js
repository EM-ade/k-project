// Profile page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
    setupTabSwitching();
    animateElements();
});

function initializeProfile() {
    // Set default active tab
    const defaultTab = 'academic';
    showTab(defaultTab);
    
    // Add hover effects to info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = '#e91e63';
        });
        
        item.addEventListener('mouseleave', function() {
            // Reset border color based on tab
            const activeTab = document.querySelector('.tab-content.active').id;
            if (activeTab === 'academic-tab') {
                if (this.classList.contains('program')) {
                    this.style.borderColor = 'rgba(255, 152, 0, 0.2)';
                } else {
                    this.style.borderColor = 'rgba(233, 30, 99, 0.2)';
                }
            } else {
                this.style.borderColor = 'rgba(76, 175, 80, 0.2)';
            }
        });
    });
}

function setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showTab(tabName);
            setActiveTabButton(this);
        });
    });
}

function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(`${tabName}-tab`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

function setActiveTabButton(activeButton) {
    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to clicked button
    activeButton.classList.add('active');
}

function animateElements() {
    // Animate profile card on load
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.style.opacity = '0';
        profileCard.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            profileCard.style.transition = 'all 0.8s ease';
            profileCard.style.opacity = '1';
            profileCard.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Animate profile picture
    const profilePicture = document.querySelector('.profile-picture');
    if (profilePicture) {
        profilePicture.style.transform = 'scale(0.8)';
        profilePicture.style.opacity = '0';
        
        setTimeout(() => {
            profilePicture.style.transition = 'all 0.6s ease';
            profilePicture.style.transform = 'scale(1)';
            profilePicture.style.opacity = '1';
        }, 400);
    }
    
    // Animate info items with stagger effect
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 600 + (index * 100));
    });
}

function updateProfilePicture() {
    // Function to handle profile picture upload (for future implementation)
    const profilePicture = document.querySelector('.profile-picture');
    
    // Create file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePicture.style.backgroundImage = `url(${e.target.result})`;
                profilePicture.style.backgroundSize = 'cover';
                profilePicture.style.backgroundPosition = 'center';
                profilePicture.innerHTML = '';
            };
            reader.readAsDataURL(file);
        }
    });
    
    fileInput.click();
}

function editProfile() {
    // Function to enable profile editing (for future implementation)
    const infoValues = document.querySelectorAll('.info-value');
    
    infoValues.forEach(value => {
        const currentText = value.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'edit-input';
        input.style.cssText = `
            width: 100%;
            padding: 8px;
            border: 2px solid #e91e63;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            color: #2c3e50;
            background: white;
        `;
        
        value.innerHTML = '';
        value.appendChild(input);
        
        input.addEventListener('blur', function() {
            value.textContent = this.value;
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.blur();
            }
        });
    });
    
    showNotification('Profile editing enabled! Click outside fields to save changes.', 'info');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add click handler to profile picture for upload
document.addEventListener('DOMContentLoaded', function() {
    const profilePicture = document.querySelector('.profile-picture');
    if (profilePicture) {
        profilePicture.addEventListener('click', updateProfilePicture);
        profilePicture.style.cursor = 'pointer';
        profilePicture.title = 'Click to upload profile picture';
    }
});

// Global functions
window.updateProfilePicture = updateProfilePicture;
window.editProfile = editProfile;
