// Results functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeResults();
    setupEventListeners();
    animateElements();
});

function initializeResults() {
    // Check which page we're on and initialize accordingly
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'assignment-scores.html') {
        initializeScoresPage();
    } else if (currentPage === 'documents.html') {
        initializeDocumentsPage();
    }
}

function initializeScoresPage() {
    // Calculate and update summary statistics
    calculateSummaryStats();
    
    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('.scores-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function initializeDocumentsPage() {
    // Add click handlers to document cards
    const documentCards = document.querySelectorAll('.document-card');
    documentCards.forEach(card => {
        card.addEventListener('click', function() {
            const downloadLink = this.querySelector('.download-link');
            if (downloadLink) {
                downloadLink.click();
            }
        });
    });
}

function setupEventListeners() {
    // Add any additional event listeners here
}

function animateElements() {
    // Animate page elements on load
    const animatedElements = document.querySelectorAll('.scores-section, .documents-section, .summary-section');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 200));
    });
    
    // Animate document cards
    const documentCards = document.querySelectorAll('.document-card');
    documentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
    });
}

function calculateSummaryStats() {
    const table = document.querySelector('.scores-table');
    if (!table) return;
    
    const rows = table.querySelectorAll('tbody tr');
    let totalCourses = rows.length;
    let totalTestScores = 0;
    let totalAssignmentScores = 0;
    let testCount = 0;
    let assignmentCount = 0;
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        
        // Test scores (columns 1 and 2)
        if (cells[1]) {
            totalTestScores += parseFloat(cells[1].textContent) || 0;
            testCount++;
        }
        if (cells[2]) {
            totalTestScores += parseFloat(cells[2].textContent) || 0;
            testCount++;
        }
        
        // Assignment scores (columns 3, 4, and 5)
        if (cells[3]) {
            totalAssignmentScores += parseFloat(cells[3].textContent) || 0;
            assignmentCount++;
        }
        if (cells[4]) {
            totalAssignmentScores += parseFloat(cells[4].textContent) || 0;
            assignmentCount++;
        }
        if (cells[5]) {
            totalAssignmentScores += parseFloat(cells[5].textContent) || 0;
            assignmentCount++;
        }
    });
    
    // Update summary statistics
    const avgTestScore = testCount > 0 ? (totalTestScores / testCount).toFixed(1) : '0.0';
    const avgAssignmentScore = assignmentCount > 0 ? (totalAssignmentScores / assignmentCount).toFixed(1) : '0.0';
    
    // Update the DOM
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length >= 3) {
        statValues[0].textContent = totalCourses;
        statValues[1].textContent = `${avgTestScore}/15`;
        statValues[2].textContent = `${avgAssignmentScore}/10`;
    }
}

function downloadDocument(documentType) {
    // Simulate document download
    const documentNames = {
        'admission-letter': 'Admission_Letter.pdf',
        'jamb': 'JAMB_Result.pdf',
        'waec-result': 'WAEC_Result.pdf',
        'birth-certificate': 'Birth_Certificate.pdf',
        'school-id': 'School_ID_Card.pdf',
        'covenant-admission': 'Covenant_Admission_Letter.pdf'
    };
    
    const fileName = documentNames[documentType] || 'Document.pdf';
    
    // Show download notification
    showNotification(`Downloading ${fileName}...`);
    
    // In a real application, this would trigger an actual download
    // For demo purposes, we'll just show a success message
    setTimeout(() => {
        showNotification(`${fileName} downloaded successfully!`, 'success');
    }, 1500);
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
        background: ${type === 'success' ? '#4caf50' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function exportScores() {
    // Export scores to CSV
    const table = document.querySelector('.scores-table');
    if (!table) return;
    
    let csv = '';
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        const rowData = Array.from(cells).map(cell => cell.textContent.trim());
        csv += rowData.join(',') + '\n';
    });
    
    // Create and download CSV file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'assignment_scores.csv';
    link.click();
    URL.revokeObjectURL(url);
    
    showNotification('Scores exported successfully!', 'success');
}

// Global functions
window.downloadDocument = downloadDocument;
window.exportScores = exportScores;
