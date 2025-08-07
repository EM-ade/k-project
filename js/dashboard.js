// Dashboard functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize dashboard
  initializeDashboard();

  // Add event listeners
  setupEventListeners();

  // Load user data
  loadUserData();
});

function initializeDashboard() {
  // Add fade-in animation to cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Animate sidebar
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.opacity = "0";
  sidebar.style.transform = "translateX(20px)";

  setTimeout(() => {
    sidebar.style.transition = "all 0.6s ease";
    sidebar.style.opacity = "1";
    sidebar.style.transform = "translateX(0)";
  }, 300);
}

function setupEventListeners() {
  // Navigation menu interactions
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const section = this.querySelector("span").textContent;

      // Handle navigation based on section
      switch (section) {
        case "GENERAL":
          // Stay on dashboard (current page)
          window.location.href = "dashboard.html";
          break;
        case "ACADEMIC":
          // Navigate to courses page
          window.location.href = "courses.html";
          break;
        case "RESULTS":
          // Navigate to results page (to be created)
          alert("Results page coming soon!");
          break;
      }
    });
  });

  // Card click interactions
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const title = this.querySelector("h3").textContent;
      console.log(`Clicked on ${title} card`);

      // Add click animation
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "translateY(-5px)";
      }, 150);
    });
  });
}

function loadUserData() {
  // Get user data from localStorage (set during signup/login)
  const storedUserData = localStorage.getItem("userData");
  let userName = "Kolawole"; // Default name

  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    userName = userData.firstName || userData.name || "Kolawole";
  }

  const userData = {
    name: userName,
    department: "Electrical and Information Engineering",
    program: "Computer Engineering",
    level: "500 Level",
    totalCredits: 215,
    achievedCredits: 161,
    upcomingEvents: [],
    todaySchedule: [],
    upcomingCA: [],
  };

  // Update progress bar
  const progressPercentage =
    (userData.achievedCredits / userData.totalCredits) * 100;
  const progressFill = document.querySelector(".progress-fill");
  if (progressFill) {
    progressFill.style.width = `${progressPercentage}%`;
  }

  // Update greeting with current time
  updateGreeting(userData.name);

  // Load schedule data
  loadTodaySchedule(userData.todaySchedule);
  loadUpcomingCA(userData.upcomingCA);
  loadNewsAndEvents(userData.upcomingEvents);
}

function updateGreeting(name) {
  const hour = new Date().getHours();
  let greeting = "Hi";

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const greetingElement = document.querySelector(".greeting h1");
  if (greetingElement) {
    greetingElement.textContent = `${greeting}, ${name}`;
  }
}

function loadTodaySchedule(schedule) {
  const scheduleContainer = document.querySelector(".schedule-placeholder");

  if (schedule.length === 0) {
    scheduleContainer.innerHTML = "<p>No classes scheduled for today</p>";
  } else {
    // Display schedule items
    scheduleContainer.innerHTML = schedule
      .map(
        (item) =>
          `<div class="schedule-item">
                <span class="time">${item.time}</span>
                <span class="subject">${item.subject}</span>
            </div>`
      )
      .join("");
  }
}

function loadUpcomingCA(assessments) {
  const caContainer = document.querySelector(".ca-placeholder");

  if (assessments.length === 0) {
    caContainer.innerHTML = "<p>No upcoming assessments</p>";
  } else {
    // Display upcoming assessments
    caContainer.innerHTML = assessments
      .map(
        (ca) =>
          `<div class="ca-item">
                <span class="ca-subject">${ca.subject}</span>
                <span class="ca-date">${ca.date}</span>
            </div>`
      )
      .join("");
  }
}

function loadNewsAndEvents(events) {
  const newsContainer = document.querySelector(".news-placeholder");

  if (events.length === 0) {
    newsContainer.innerHTML = "<p>Check back for latest updates</p>";
  } else {
    // Display news and events
    newsContainer.innerHTML = events
      .map(
        (event) =>
          `<div class="news-item">
                <span class="news-title">${event.title}</span>
                <span class="news-date">${event.date}</span>
            </div>`
      )
      .join("");
  }
}

// Utility function to format dates
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Function to show different sections based on dropdown selection
function showSection(sectionName) {
  const contentArea = document.querySelector(".content-area");

  switch (sectionName) {
    case "profiles":
      showProfilesSection(contentArea);
      break;
    case "news":
      showNewsSection(contentArea);
      break;
    case "settings":
      showSettingsSection(contentArea);
      break;
    default:
      showDefaultDashboard(contentArea);
  }
}

function showProfilesSection(container) {
  container.innerHTML = `
    <div class="section-header">
      <h1>PROFILES</h1>
    </div>
    <div class="profiles-content">
      <div class="profile-card">
        <h3>Student Profile</h3>
        <p>View and edit your personal information</p>
      </div>
      <div class="profile-card">
        <h3>Academic Profile</h3>
        <p>Track your academic progress and achievements</p>
      </div>
    </div>
  `;
}

function showNewsSection(container) {
  container.innerHTML = `
    <div class="section-header">
      <h1>NEWS AND EVENTS</h1>
    </div>
    <div class="news-content">
      <div class="news-item">
        <h3>UNESCO Inaugurates Plant Biotechnology Chair in Covenant</h3>
        <p>Latest developments in biotechnology research at the university...</p>
        <span class="news-date">December 15, 2024</span>
      </div>
      <div class="news-item">
        <h3>Final Year Project Exhibition</h3>
        <p>Students showcase their innovative projects...</p>
        <span class="news-date">December 10, 2024</span>
      </div>
    </div>
  `;
}

function showSettingsSection(container) {
  container.innerHTML = `
    <div class="section-header">
      <h1>SETTINGS</h1>
    </div>
    <div class="settings-content">
      <div class="setting-group">
        <h3>Account Settings</h3>
        <p>Manage your account preferences</p>
      </div>
      <div class="setting-group">
        <h3>Notification Settings</h3>
        <p>Configure your notification preferences</p>
      </div>
    </div>
  `;
}

function showDefaultDashboard(container) {
  // Reload the original dashboard content
  window.location.reload();
}

// Make showSection globally available
window.showSection = showSection;

// Add smooth scrolling for any internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
