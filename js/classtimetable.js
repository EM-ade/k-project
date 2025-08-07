// Class Timetable functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeClassTimetable();
    setupEventListeners();
});

function initializeClassTimetable() {
    // Add animation to class cards
    const classCard = document.querySelector('.class-card');
    if (classCard) {
        classCard.style.opacity = '0';
        classCard.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            classCard.style.transition = 'all 0.6s ease';
            classCard.style.opacity = '1';
            classCard.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Animate additional classes
    const classItems = document.querySelectorAll('.class-item');
    classItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 200 + (index * 100));
    });
}

function setupEventListeners() {
    // Access button functionality
    const accessBtn = document.querySelector('.access-btn');
    if (accessBtn) {
        accessBtn.addEventListener('click', function() {
            handleCourseAccess();
        });
    }
    
    // Class item clicks
    const classItems = document.querySelectorAll('.class-item');
    classItems.forEach(item => {
        item.addEventListener('click', function() {
            const classTitle = this.querySelector('h4').textContent;
            const instructor = this.querySelector('p').textContent;
            const time = this.querySelector('.time').textContent;
            const date = this.querySelector('.date').textContent;
            
            showClassDetails(classTitle, instructor, time, date);
        });
    });
}

function handleCourseAccess() {
    const courseTitle = 'CEN523-COMPUTER NETWORKING AND SECURITY';
    const instructor = 'Dr Kennedy';
    
    // Show loading state
    const accessBtn = document.querySelector('.access-btn');
    const originalText = accessBtn.textContent;
    accessBtn.textContent = 'LOADING...';
    accessBtn.disabled = true;
    
    // Simulate loading
    setTimeout(() => {
        alert(`Welcome to ${courseTitle}!\n\nInstructor: ${instructor}\n\nCourse materials and live session will be loaded here.`);
        
        // Reset button
        accessBtn.textContent = originalText;
        accessBtn.disabled = false;
    }, 1500);
}

function showClassDetails(title, instructor, time, date) {
    const details = `
Class: ${title}
Instructor: ${instructor}
Time: ${time}
Date: ${date}

Would you like to join this class or add it to your calendar?
    `;
    
    if (confirm(details)) {
        alert('Class details saved to your schedule!');
    }
}

// Calendar integration functions
function addToGoogleCalendar() {
    const event = {
        title: 'CEN523-Computer Networking and Security',
        start: '2021-07-21T14:00:00',
        end: '2021-07-21T15:00:00',
        description: 'Computer Networking and Security class with Dr Kennedy',
        location: 'University Campus'
    };
    
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start.replace(/[-:]/g, '').replace('.000', '')}Z/${event.end.replace(/[-:]/g, '').replace('.000', '')}Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleUrl, '_blank');
}

function addToAppleCalendar() {
    const event = {
        title: 'CEN523-Computer Networking and Security',
        start: '20210721T140000Z',
        end: '20210721T150000Z',
        description: 'Computer Networking and Security class with Dr Kennedy',
        location: 'University Campus'
    };
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Academic Planner//EN
BEGIN:VEVENT
UID:${Date.now()}@academicplanner.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'class-event.ics';
    link.click();
    URL.revokeObjectURL(url);
}

function addToOutlookCalendar() {
    const event = {
        title: 'CEN523-Computer Networking and Security',
        start: '2021-07-21T14:00:00.000Z',
        end: '2021-07-21T15:00:00.000Z',
        description: 'Computer Networking and Security class with Dr Kennedy',
        location: 'University Campus'
    };
    
    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${event.start}&enddt=${event.end}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(outlookUrl, '_blank');
}

// Animation utilities
function animateElement(element, animation) {
    element.style.animation = animation;
    
    element.addEventListener('animationend', function() {
        element.style.animation = '';
    }, { once: true });
}

// Global functions
window.addToGoogleCalendar = addToGoogleCalendar;
window.addToAppleCalendar = addToAppleCalendar;
window.addToOutlookCalendar = addToOutlookCalendar;
