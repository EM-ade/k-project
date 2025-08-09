// Documents functionality
document.addEventListener('DOMContentLoaded', function() {
    loadUserDocuments();
    setupUploadForm();
    setupDragAndDrop();
});

function loadUserDocuments() {
    const savedDocuments = localStorage.getItem('userDocuments');
    const userDocuments = savedDocuments ? JSON.parse(savedDocuments) : [];
    
    const userDocumentsGrid = document.getElementById('userDocumentsGrid');
    if (!userDocumentsGrid) return;
    
    if (userDocuments.length === 0) {
        userDocumentsGrid.innerHTML = `
            <div class="no-documents">
                <div class="no-documents-icon">📄</div>
                <p>No documents uploaded yet</p>
                <small>Click "Upload New Document" to add your first document</small>
            </div>
        `;
        return;
    }
    
    userDocumentsGrid.innerHTML = userDocuments.map(doc => `
        <div class="document-card user-document" data-id="${doc.id}">
            <div class="document-icon">
                ${getDocumentIcon(doc.type)}
            </div>
            <div class="document-info">
                <h3 class="document-title">${doc.title}</h3>
                <p class="document-category">${doc.category}</p>
                <p class="document-date">Uploaded: ${new Date(doc.uploadDate).toLocaleDateString()}</p>
                <div class="document-actions">
                    <a href="#" class="download-link" onclick="downloadUserDocument('${doc.id}')">Download</a>
                    <a href="#" class="delete-link" onclick="deleteUserDocument('${doc.id}')">Delete</a>
                </div>
            </div>
        </div>
    `).join('');
}

function getDocumentIcon(fileType) {
    const iconMap = {
        'pdf': '📄',
        'doc': '📝',
        'docx': '📝',
        'jpg': '🖼️',
        'jpeg': '🖼️',
        'png': '🖼️',
        'default': '📄'
    };
    return iconMap[fileType] || iconMap.default;
}

function openUploadModal() {
    const modal = document.getElementById('uploadModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('uploadForm').reset();
    resetFileUpload();
}

function resetFileUpload() {
    const uploadArea = document.querySelector('.file-upload-area');
    const placeholder = uploadArea.querySelector('.upload-placeholder');
    const preview = uploadArea.querySelector('.file-preview');
    
    placeholder.style.display = 'flex';
    preview.style.display = 'none';
}

function setupUploadForm() {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('documentFile');
    
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            event.target.value = '';
            return;
        }
        
        showFilePreview(file);
    }
}

function showFilePreview(file) {
    const uploadArea = document.querySelector('.file-upload-area');
    const placeholder = uploadArea.querySelector('.upload-placeholder');
    const preview = uploadArea.querySelector('.file-preview');
    const fileName = preview.querySelector('.file-name');
    const fileSize = preview.querySelector('.file-size');
    
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    
    placeholder.style.display = 'none';
    preview.style.display = 'flex';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function setupDragAndDrop() {
    const uploadArea = document.querySelector('.file-upload-area');
    if (!uploadArea) return;
    
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
}

function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const fileInput = document.getElementById('documentFile');
        fileInput.files = files;
        handleFileSelect({ target: fileInput });
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const file = formData.get('documentFile');
    
    if (!file || file.size === 0) {
        alert('Please select a file to upload');
        return;
    }
    
    // Create document object
    const document = {
        id: Date.now().toString(),
        title: formData.get('documentTitle'),
        category: formData.get('documentCategory'),
        description: formData.get('documentDescription') || '',
        fileName: file.name,
        fileSize: file.size,
        type: file.name.split('.').pop().toLowerCase(),
        uploadDate: new Date().toISOString(),
        fileData: null // We'll store base64 data here
    };
    
    // Convert file to base64 for storage
    const reader = new FileReader();
    reader.onload = function(e) {
        document.fileData = e.target.result;
        saveDocument(document);
        closeUploadModal();
        showSuccessMessage('Document uploaded successfully!');
        loadUserDocuments();
    };
    reader.readAsDataURL(file);
}

function saveDocument(document) {
    const savedDocuments = localStorage.getItem('userDocuments');
    const userDocuments = savedDocuments ? JSON.parse(savedDocuments) : [];
    userDocuments.push(document);
    localStorage.setItem('userDocuments', JSON.stringify(userDocuments));
}

function downloadUserDocument(documentId) {
    const savedDocuments = localStorage.getItem('userDocuments');
    const userDocuments = savedDocuments ? JSON.parse(savedDocuments) : [];
    const document = userDocuments.find(doc => doc.id === documentId);
    
    if (document && document.fileData) {
        const link = document.createElement('a');
        link.href = document.fileData;
        link.download = document.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function deleteUserDocument(documentId) {
    if (confirm('Are you sure you want to delete this document?')) {
        const savedDocuments = localStorage.getItem('userDocuments');
        const userDocuments = savedDocuments ? JSON.parse(savedDocuments) : [];
        const filteredDocuments = userDocuments.filter(doc => doc.id !== documentId);
        localStorage.setItem('userDocuments', JSON.stringify(filteredDocuments));
        loadUserDocuments();
        showSuccessMessage('Document deleted successfully!');
    }
}

function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4caf50, #45a049);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        z-index: 1001;
        font-weight: 600;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('uploadModal');
    if (event.target === modal) {
        closeUploadModal();
    }
});

// Global functions for HTML onclick handlers
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.downloadUserDocument = downloadUserDocument;
window.deleteUserDocument = deleteUserDocument;
