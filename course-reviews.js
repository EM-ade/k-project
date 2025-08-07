// Course Reviews JavaScript

let currentStep = 1;
const totalSteps = 7;
let reviewData = {
    course: 'EIE501',
    matriculation: '',
    lecturerRating: '',
    experience: '',
    tutorialsNecessary: '',
    teachingTechnique: '',
    difficulty: '',
    email: ''
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeCourseReviews();
});

function initializeCourseReviews() {
    // Set up course tab listeners
    const courseTabs = document.querySelectorAll('.course-tab');
    courseTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            selectCourse(this.dataset.course);
        });
    });

    // Set up option selection listeners
    setupOptionListeners();
    
    // Update progress
    updateProgress();
}

function selectCourse(courseCode) {
    // Update active tab
    document.querySelectorAll('.course-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-course="${courseCode}"]`).classList.add('active');
    
    // Update review data
    reviewData.course = courseCode;
    
    // Reset form if needed
    resetForm();
}

function setupOptionListeners() {
    // Rating options
    document.querySelectorAll('.rating-option').forEach(option => {
        option.addEventListener('click', function() {
            selectOption(this, 'rating-option');
            reviewData.lecturerRating = this.dataset.value;
        });
    });

    // Experience options
    document.querySelectorAll('.experience-option').forEach(option => {
        option.addEventListener('click', function() {
            selectOption(this, 'experience-option');
            reviewData.experience = this.dataset.value;
        });
    });

    // Binary options (tutorials)
    document.querySelectorAll('#step-tutorials .binary-option').forEach(option => {
        option.addEventListener('click', function() {
            selectOption(this, 'binary-option', '#step-tutorials');
            reviewData.tutorialsNecessary = this.dataset.value;
        });
    });

    // Binary options (teaching technique)
    document.querySelectorAll('#step-technique .binary-option').forEach(option => {
        option.addEventListener('click', function() {
            selectOption(this, 'binary-option', '#step-technique');
            reviewData.teachingTechnique = this.dataset.value;
        });
    });

    // Difficulty options
    document.querySelectorAll('.difficulty-option').forEach(option => {
        option.addEventListener('click', function() {
            selectOption(this, 'difficulty-option');
            reviewData.difficulty = this.dataset.value;
        });
    });

    // Input listeners
    document.getElementById('matriculation').addEventListener('input', function() {
        reviewData.matriculation = this.value;
    });

    document.getElementById('email').addEventListener('input', function() {
        reviewData.email = this.value;
    });
}

function selectOption(selectedElement, className, container = null) {
    // Remove selected class from all options of this type
    const selector = container ? `${container} .${className}` : `.${className}`;
    document.querySelectorAll(selector).forEach(option => {
        option.querySelector('.option-card').classList.remove('selected');
    });
    
    // Add selected class to clicked option
    selectedElement.querySelector('.option-card').classList.add('selected');
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            // Hide current step
            document.getElementById(getStepId(currentStep)).classList.remove('active');
            
            // Show next step
            currentStep++;
            document.getElementById(getStepId(currentStep)).classList.add('active');
            
            // Update progress
            updateProgress();
            
            // Scroll to top
            document.querySelector('.reviews-container').scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        // Hide current step
        document.getElementById(getStepId(currentStep)).classList.remove('active');
        
        // Show previous step
        currentStep--;
        document.getElementById(getStepId(currentStep)).classList.add('active');
        
        // Update progress
        updateProgress();
        
        // Scroll to top
        document.querySelector('.reviews-container').scrollIntoView({ behavior: 'smooth' });
    }
}

function getStepId(stepNumber) {
    const stepIds = [
        'step-matriculation',
        'step-lecturer',
        'step-experience',
        'step-tutorials',
        'step-technique',
        'step-difficulty',
        'step-confirmation'
    ];
    return stepIds[stepNumber - 1];
}

function validateCurrentStep() {
    switch (currentStep) {
        case 1: // Matriculation
            if (!reviewData.matriculation.trim()) {
                showAlert('Please enter your matriculation number.');
                return false;
            }
            if (!/^[A-Z0-9]+$/i.test(reviewData.matriculation.trim())) {
                showAlert('Please enter a valid matriculation number.');
                return false;
            }
            break;
            
        case 2: // Lecturer rating
            if (!reviewData.lecturerRating) {
                showAlert('Please rate the lecturer.');
                return false;
            }
            break;
            
        case 3: // Experience
            if (!reviewData.experience) {
                showAlert('Please select your course experience.');
                return false;
            }
            break;
            
        case 4: // Tutorials
            if (!reviewData.tutorialsNecessary) {
                showAlert('Please indicate if tutorials were necessary.');
                return false;
            }
            break;
            
        case 5: // Teaching technique
            if (!reviewData.teachingTechnique) {
                showAlert('Please rate the teaching technique.');
                return false;
            }
            break;
            
        case 6: // Difficulty
            if (!reviewData.difficulty) {
                showAlert('Please rate the course difficulty.');
                return false;
            }
            break;
            
        case 7: // Email
            if (!reviewData.email.trim()) {
                showAlert('Please enter your email address.');
                return false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reviewData.email.trim())) {
                showAlert('Please enter a valid email address.');
                return false;
            }
            break;
    }
    return true;
}

function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const currentStepElement = document.querySelector('.current-step');
    
    const progressPercentage = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    currentStepElement.textContent = currentStep;
}

function submitReview() {
    if (validateCurrentStep()) {
        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showSuccessMessage();
            
            // Log the review data (in real app, this would be sent to server)
            console.log('Review submitted:', reviewData);
            
            // Reset form after delay
            setTimeout(() => {
                resetForm();
            }, 3000);
        }, 2000);
    }
}

function showSuccessMessage() {
    const stepContent = document.querySelector('#step-confirmation .step-content');
    stepContent.innerHTML = `
        <div class="success-message">
            <div class="success-icon">✅</div>
            <h2 class="step-title">Review Submitted Successfully!</h2>
            <p class="step-subtitle">Thank you for your feedback. Your review will help other students make informed decisions about this course.</p>
            <div class="review-summary">
                <h3>Review Summary:</h3>
                <p><strong>Course:</strong> ${reviewData.course}</p>
                <p><strong>Lecturer Rating:</strong> ${formatRating(reviewData.lecturerRating)}</p>
                <p><strong>Difficulty:</strong> ${formatDifficulty(reviewData.difficulty)}</p>
            </div>
            <button class="next-btn" onclick="resetForm()">Submit Another Review</button>
        </div>
    `;
}

function formatRating(rating) {
    return rating.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function formatDifficulty(difficulty) {
    return difficulty.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function resetForm() {
    // Reset step
    currentStep = 1;
    
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show first step
    document.getElementById('step-matriculation').classList.add('active');
    
    // Reset data
    reviewData = {
        course: reviewData.course, // Keep selected course
        matriculation: '',
        lecturerRating: '',
        experience: '',
        tutorialsNecessary: '',
        teachingTechnique: '',
        difficulty: '',
        email: ''
    };
    
    // Clear form inputs
    document.getElementById('matriculation').value = '';
    document.getElementById('email').value = '';
    
    // Clear selections
    document.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Reset confirmation step content
    document.querySelector('#step-confirmation .step-content').innerHTML = `
        <h2 class="step-title">Confirm Submission.</h2>
        <p class="step-subtitle">Thanks for taking the time to complete this form.<br>
        Please enter your email below and we will be in contact within 24 hours.</p>
        
        <div class="input-group">
            <input type="email" id="email" placeholder="Enter your email address" class="form-input">
        </div>
        
        <div class="step-navigation">
            <button class="prev-btn" onclick="prevStep()">Previous</button>
            <button class="submit-btn" onclick="submitReview()">Complete Submission</button>
        </div>
    `;
    
    // Re-setup listeners for new elements
    setupOptionListeners();
    
    // Update progress
    updateProgress();
    
    // Scroll to top
    document.querySelector('.reviews-container').scrollIntoView({ behavior: 'smooth' });
}

function showAlert(message) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = 'alert-message';
    alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">⚠️</span>
            <span class="alert-text">${message}</span>
        </div>
    `;
    
    // Add styles
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff5722;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(alert);
    
    // Remove after 3 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 300);
    }, 3000);
}

// Add CSS for alert animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .alert-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .success-message {
        text-align: center;
        padding: 20px;
    }
    
    .success-icon {
        font-size: 4rem;
        margin-bottom: 20px;
    }
    
    .review-summary {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 15px;
        margin: 20px 0;
        text-align: left;
    }
    
    .review-summary h3 {
        color: #e91e63;
        margin-bottom: 15px;
        font-size: 1.1rem;
    }
    
    .review-summary p {
        margin: 8px 0;
        color: #666;
    }
`;
document.head.appendChild(style);
