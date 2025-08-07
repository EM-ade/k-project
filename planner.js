// Planner functionality
let currentDate = new Date();
let events = [];

document.addEventListener('DOMContentLoaded', function() {
    initializePlanner();
    loadSampleEvents();
    renderCalendar();
    setupEventListeners();
});

function initializePlanner() {
    // Set current date to August 2025 as shown in screenshot
    currentDate = new Date(2025, 7, 1); // August 2025 (month is 0-indexed)
}

function loadSampleEvents() {
    // Sample events matching the screenshot
    events = [
        {
            id: 1,
            title: 'Build my pr...',
            date: '2025-08-07',
            time: '10:00',
            type: 'project',
            description: 'Build my project - 10:00 AM - 2:00 PM'
        },
        {
            id: 2,
            title: 'Build my pr...',
            date: '2025-08-14',
            time: '10:00',
            type: 'project',
            description: 'Build my project - 10:00 AM - 2:00 PM'
        }
    ];
}

function setupEventListeners() {
    // Calendar navigation
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Event form submission
    document.getElementById('eventForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addEvent();
    });
}

function renderCalendar() {
    const monthYear = document.getElementById('monthYear');
    const calendarBody = document.getElementById('calendarBody');
    
    // Update month/year display
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
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
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
    
    if (isToday) {
        dayDiv.classList.add('today');
    }
    
    if (!isCurrentMonth) {
        dayDiv.classList.add('other-month');
    }
    
    // Day number
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = date.getDate();
    dayDiv.appendChild(dayNumber);
    
    // Add events for this day
    const dayEvents = getEventsForDate(date);
    dayEvents.forEach(event => {
        const eventElement = createEventElement(event);
        dayDiv.appendChild(eventElement);
    });
    
    // Add click listener to add events
    dayDiv.addEventListener('click', () => {
        openEventModal(date);
    });
    
    return dayDiv;
}

function createEventElement(event) {
    const eventDiv = document.createElement('div');
    eventDiv.className = `event-item ${event.type}`;
    eventDiv.textContent = event.title;
    eventDiv.title = event.description || event.title;
    
    eventDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        showEventDetails(event);
    });
    
    return eventDiv;
}

function getEventsForDate(date) {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
}

function openEventModal(date) {
    const modal = document.getElementById('eventModal');
    const eventDate = document.getElementById('eventDate');
    
    // Set the date in the form
    eventDate.value = date.toISOString().split('T')[0];
    
    modal.style.display = 'block';
}

function closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.style.display = 'none';
    
    // Reset form
    document.getElementById('eventForm').reset();
}

function addEvent() {
    const form = document.getElementById('eventForm');
    const formData = new FormData(form);
    
    const newEvent = {
        id: Date.now(),
        title: formData.get('eventTitle'),
        date: formData.get('eventDate'),
        time: formData.get('eventTime'),
        type: formData.get('eventType'),
        description: formData.get('eventDescription') || ''
    };
    
    events.push(newEvent);
    renderCalendar();
    closeEventModal();
    
    // Show success message
    alert('Event added successfully!');
}

function showEventDetails(event) {
    const details = `
        Event: ${event.title}
        Date: ${new Date(event.date).toLocaleDateString()}
        Time: ${event.time}
        Type: ${event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        ${event.description ? '\nDescription: ' + event.description : ''}
    `;
    
    alert(details);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('eventModal');
    if (event.target === modal) {
        closeEventModal();
    }
});

// Global functions
window.closeEventModal = closeEventModal;
