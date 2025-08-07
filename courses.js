// Courses page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCoursesPage();
    setupCourseInteractions();
});

function initializeCoursesPage() {
    // Add staggered animation to course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add click tracking for analytics
    trackPageView('courses');
}

function setupCourseInteractions() {
    // Handle course access button clicks
    const accessButtons = document.querySelectorAll('.access-btn');
    accessButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('.course-title').textContent;
            const courseCode = courseCard.querySelector('.course-code').textContent;
            
            // Add loading state
            this.textContent = 'LOADING...';
            this.disabled = true;
            
            // Simulate course access
            setTimeout(() => {
                accessCourse(courseCode, courseTitle);
                this.textContent = 'ACCESS';
                this.disabled = false;
            }, 1500);
        });
    });
    
    // Handle course card clicks
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('click', function() {
            const courseTitle = this.querySelector('.course-title').textContent;
            const courseCode = this.querySelector('.course-code').textContent;
            
            // Add selection animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 150);
            
            // Show course details
            showCoursePreview(courseCode, courseTitle);
        });
    });
}

function accessCourse(courseCode, courseTitle) {
    // In a real application, this would navigate to the course content
    console.log(`Accessing course: ${courseCode} - ${courseTitle}`);
    
    // For demo purposes, show an alert
    alert(`Welcome to ${courseTitle}!\n\nCourse materials and assignments will be loaded here.`);
    
    // Track course access
    trackCourseAccess(courseCode, courseTitle);
}

function showCoursePreview(courseCode, courseTitle) {
    // Create and show a preview modal
    const modal = createCoursePreviewModal(courseCode, courseTitle);
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function createCoursePreviewModal(courseCode, courseTitle) {
    const modal = document.createElement('div');
    modal.className = 'course-preview-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeCoursePreview()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${courseCode}</h2>
                <button class="close-btn" onclick="closeCoursePreview()">&times;</button>
            </div>
            <div class="modal-body">
                <h3>${courseTitle}</h3>
                <div class="course-info">
                    <div class="info-section">
                        <h4>Course Description</h4>
                        <p>This course covers fundamental concepts and practical applications in ${courseTitle.toLowerCase()}.</p>
                    </div>
                    <div class="info-section">
                        <h4>Learning Objectives</h4>
                        <ul>
                            <li>Understand core principles and theories</li>
                            <li>Apply knowledge to practical scenarios</li>
                            <li>Develop problem-solving skills</li>
                            <li>Complete hands-on projects</li>
                        </ul>
                    </div>
                    <div class="info-section">
                        <h4>Assessment Methods</h4>
                        <ul>
                            <li>Continuous Assessment (30%)</li>
                            <li>Mid-term Examination (30%)</li>
                            <li>Final Examination (40%)</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="enrollInCourse('${courseCode}')">Enroll Now</button>
                    <button class="btn-secondary" onclick="closeCoursePreview()">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .course-preview-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .course-preview-modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 25px;
            border-bottom: 1px solid #eee;
            background: linear-gradient(135deg, #e91e63, #9c27b0);
            color: white;
            border-radius: 15px 15px 0 0;
        }
        
        .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .close-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .modal-body {
            padding: 25px;
        }
        
        .info-section {
            margin-bottom: 20px;
        }
        
        .info-section h4 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .info-section ul {
            padding-left: 20px;
        }
        
        .info-section li {
            margin-bottom: 5px;
            color: #666;
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
            justify-content: flex-end;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        
        .btn-primary, .btn-secondary {
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #e91e63, #9c27b0);
            color: white;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(233, 30, 99, 0.3);
        }
        
        .btn-secondary {
            background: #f8f9fa;
            color: #666;
            border: 1px solid #ddd;
        }
        
        .btn-secondary:hover {
            background: #e9ecef;
        }
    `;
    
    if (!document.querySelector('#course-modal-styles')) {
        style.id = 'course-modal-styles';
        document.head.appendChild(style);
    }
    
    return modal;
}

function closeCoursePreview() {
    const modal = document.querySelector('.course-preview-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function enrollInCourse(courseCode) {
    alert(`Enrollment request submitted for ${courseCode}!\n\nYou will receive a confirmation email shortly.`);
    closeCoursePreview();
    trackCourseEnrollment(courseCode);
}

// Analytics functions
function trackPageView(page) {
    console.log(`Page view: ${page}`);
    // In a real application, this would send data to analytics service
}

function trackCourseAccess(courseCode, courseTitle) {
    console.log(`Course accessed: ${courseCode} - ${courseTitle}`);
    // Track course access for analytics
}

function trackCourseEnrollment(courseCode) {
    console.log(`Course enrollment: ${courseCode}`);
    // Track enrollment for analytics
}

// Global function for modal close
window.closeCoursePreview = closeCoursePreview;
window.enrollInCourse = enrollInCourse;
