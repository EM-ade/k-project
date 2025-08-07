// Exam Timetable JavaScript

let currentDate = new Date();
let currentPeriod = 'current';
let currentView = 'calendar';
let examData = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeExamTimetable();
    loadExamData();
    renderCalendar();
    setupEventListeners();
});

function initializeExamTimetable() {
    // Set current date to May 2025 for exam period
    currentDate = new Date(2025, 4, 1); // May 2025 (month is 0-indexed)
}

function loadExamData() {
    // Sample exam data
    examData = [
        {
            id: 1,
            course: 'CEN523',
            title: 'Computer Networking and Security',
            type: 'theory',
            date: '2025-05-20',
            startTime: '09:00',
            endTime: '12:00',
            location: 'Exam Hall A',
            instructor: 'Dr. Kennedy',
            duration: 180
        },
        {
            id: 2,
            course: 'CEN520',
            title: 'Robotics & Automation',
            type: 'practical',
            date: '2025-05-22',
            startTime: '14:00',
            endTime: '17:00',
            location: 'Robotics Lab',
            instructor: 'Dr. Hope & Dr. Victoria',
            duration: 180
        },
        {
            id: 3,
            course: 'CEN521',
            title: 'Software Engineering',
            type: 'project',
            date: '2025-05-25',
            startTime: '10:00',
            endTime: '12:00',
            location: 'Conference Room B',
            instructor: 'Professor Sanjay Misra',
            duration: 120
        },
        {
            id: 4,
            course: 'CEN522',
            title: 'Microprocessor Systems',
            type: 'theory',
            date: '2025-05-19',
            startTime: '09:00',
            endTime: '12:00',
            location: 'Exam Hall B',
            instructor: 'Engineer Omoruyi',
            duration: 180
        },
        {
            id: 5,
            course: 'EIE501',
            title: 'Digital Signal Processing',
            type: 'oral',
            date: '2025-05-27',
            startTime: '14:00',
            endTime: '16:00',
            location: 'Faculty Office',
            instructor: 'Dr. Sarah Johnson',
            duration: 120
        }
    ];
}

function setupEventListeners() {
    // Period tab listeners
    document.querySelectorAll('.period-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchPeriod(this.dataset.period);
        });
    });

    // View toggle listeners
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchView(this.dataset.view);
        });
    });

    // Calendar navigation
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Action button listeners
    setupActionListeners();

    // Modal listeners
    setupModalListeners();
}

function switchPeriod(period) {
    currentPeriod = period;
    
    // Update active tab
    document.querySelectorAll('.period-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-period="${period}"]`).classList.add('active');
    
    // Update semester info based on period
    updateSemesterInfo(period);
    
    // Re-render current view
    if (currentView === 'calendar') {
        renderCalendar();
    } else {
        renderListView();
    }
}

function updateSemesterInfo(period) {
    const semesterLabel = document.querySelector('.semester-label');
    const examPeriod = document.querySelector('.exam-period');
    
    switch (period) {
        case 'current':
            semesterLabel.textContent = '2024/2025 Academic Session - Second Semester';
            examPeriod.textContent = 'Examination Period: May 15 - June 30, 2025';
            break;
        case 'upcoming':
            semesterLabel.textContent = '2025/2026 Academic Session - First Semester';
            examPeriod.textContent = 'Examination Period: December 1 - January 15, 2026';
            break;
        case 'past':
            semesterLabel.textContent = '2024/2025 Academic Session - First Semester';
            examPeriod.textContent = 'Examination Period: December 1 - January 15, 2025';
            break;
    }
}

function switchView(view) {
    currentView = view;
    
    // Update active button
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    // Show/hide view containers
    document.querySelectorAll('.view-container').forEach(container => {
        container.classList.remove('active');
    });
    document.querySelector(`.${view}-view`).classList.add('active');
    
    // Render appropriate view
    if (view === 'calendar') {
        renderCalendar();
    } else {
        renderListView();
    }
}

function renderCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    
    const monthYear = document.getElementById('monthYear');
    const calendarBody = document.getElementById('calendarBody');
    
    monthYear.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    // Clear calendar body
    calendarBody.innerHTML = '';
    
    // Get first day of month and number of days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // Generate calendar days
    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dayElement = createDayElement(date);
        calendarBody.appendChild(dayElement);
    }
}

function createDayElement(date) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
    
    if (isToday) {
        dayElement.classList.add('today');
    }
    
    if (!isCurrentMonth) {
        dayElement.classList.add('other-month');
    }
    
    // Day number
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = date.getDate();
    dayElement.appendChild(dayNumber);
    
    // Add exam indicators
    const dateString = date.toISOString().split('T')[0];
    const dayExams = examData.filter(exam => exam.date === dateString);
    
    dayExams.forEach(exam => {
        const examIndicator = document.createElement('div');
        examIndicator.className = `exam-indicator ${exam.type}`;
        examIndicator.textContent = exam.course;
        examIndicator.title = `${exam.course} - ${exam.title}`;
        examIndicator.addEventListener('click', (e) => {
            e.stopPropagation();
            showExamDetails(exam);
        });
        dayElement.appendChild(examIndicator);
    });
    
    return dayElement;
}

function renderListView() {
    // List view is already rendered in HTML, but we can update it dynamically here if needed
    console.log('List view rendered');
}

function setupActionListeners() {
    // Study plan buttons
    document.querySelectorAll('.study-plan').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseCode = this.closest('.exam-card').dataset.course;
            showStudyPlan(courseCode);
        });
    });

    // Add to calendar buttons
    document.querySelectorAll('.add-calendar').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseCode = this.closest('.exam-card').dataset.course;
            addToCalendar(courseCode);
        });
    });

    // Set reminder buttons
    document.querySelectorAll('.set-reminder').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseCode = this.closest('.exam-card').dataset.course;
            showReminderModal(courseCode);
        });
    });
}

function setupModalListeners() {
    // Close modal listeners
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });

    // Reminder form submission
    document.getElementById('reminderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        setReminder();
    });
}

function showExamDetails(exam) {
    const details = `
Exam: ${exam.course} - ${exam.title}
Date: ${formatDate(exam.date)}
Time: ${exam.startTime} - ${exam.endTime}
Location: ${exam.location}
Instructor: ${exam.instructor}
Duration: ${exam.duration} minutes

Would you like to add this exam to your calendar or set a reminder?
    `;
    
    if (confirm(details)) {
        addToCalendar(exam.course);
    }
}

function showStudyPlan(courseCode) {
    const exam = examData.find(e => e.course === courseCode);
    if (!exam) return;
    
    const modal = document.getElementById('studyPlanModal');
    const content = document.querySelector('.study-plan-content');
    
    const examDate = new Date(exam.date);
    const today = new Date();
    const daysUntilExam = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
    
    content.innerHTML = `
        <div class="study-plan">
            <h4>${exam.course} - ${exam.title}</h4>
            <p><strong>Exam Date:</strong> ${formatDate(exam.date)}</p>
            <p><strong>Days Until Exam:</strong> ${daysUntilExam} days</p>
            
            <div class="study-schedule">
                <h5>Recommended Study Schedule:</h5>
                <ul>
                    <li><strong>Week 1:</strong> Review lecture notes and textbook chapters</li>
                    <li><strong>Week 2:</strong> Practice problems and assignments</li>
                    <li><strong>Week 3:</strong> Group study sessions and mock tests</li>
                    <li><strong>Final Week:</strong> Revision and past papers</li>
                </ul>
            </div>
            
            <div class="study-resources">
                <h5>Study Resources:</h5>
                <ul>
                    <li>📚 Course textbook and materials</li>
                    <li>📝 Lecture slides and notes</li>
                    <li>💻 Online tutorials and videos</li>
                    <li>👥 Study group sessions</li>
                </ul>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function addToCalendar(courseCode) {
    const exam = examData.find(e => e.course === courseCode);
    if (!exam) return;
    
    const startDateTime = `${exam.date}T${exam.startTime}:00`;
    const endDateTime = `${exam.date}T${exam.endTime}:00`;
    
    const event = {
        title: `${exam.course} Exam - ${exam.title}`,
        start: startDateTime,
        end: endDateTime,
        description: `${exam.type.charAt(0).toUpperCase() + exam.type.slice(1)} exam for ${exam.title}. Location: ${exam.location}. Instructor: ${exam.instructor}`,
        location: exam.location
    };
    
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start.replace(/[-:]/g, '').replace('.000', '')}/${event.end.replace(/[-:]/g, '').replace('.000', '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleUrl, '_blank');
}

function showReminderModal(courseCode) {
    const modal = document.getElementById('reminderModal');
    modal.dataset.courseCode = courseCode;
    modal.style.display = 'block';
}

function setReminder() {
    const modal = document.getElementById('reminderModal');
    const courseCode = modal.dataset.courseCode;
    const reminderTime = document.getElementById('reminderTime').value;
    const reminderMethod = document.getElementById('reminderMethod').value;
    
    const exam = examData.find(e => e.course === courseCode);
    if (!exam) return;
    
    // Simulate setting reminder
    alert(`Reminder set! You will receive a ${reminderMethod} reminder ${reminderTime} day(s) before your ${exam.course} exam.`);
    
    modal.style.display = 'none';
    document.getElementById('reminderForm').reset();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Add some CSS for study plan modal content
const style = document.createElement('style');
style.textContent = `
    .study-plan h4 {
        color: #e91e63;
        margin-bottom: 15px;
        font-size: 1.2rem;
    }
    
    .study-plan p {
        margin: 8px 0;
        color: #666;
    }
    
    .study-schedule, .study-resources {
        margin: 20px 0;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 10px;
    }
    
    .study-schedule h5, .study-resources h5 {
        color: #2c3e50;
        margin-bottom: 10px;
        font-size: 1rem;
    }
    
    .study-schedule ul, .study-resources ul {
        margin: 0;
        padding-left: 20px;
    }
    
    .study-schedule li, .study-resources li {
        margin: 8px 0;
        color: #666;
        line-height: 1.4;
    }
`;
document.head.appendChild(style);
