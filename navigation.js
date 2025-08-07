// Global navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  setupGlobalNavigation();
  setActiveNavItem();
});

function setupGlobalNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const section = this.querySelector("span").textContent;
      navigateToSection(section);
    });
  });
}

function navigateToSection(section) {
  switch (section) {
    case "GENERAL":
      // Navigate to dashboard
      window.location.href = "dashboard.html";
      break;
    case "PROFILE":
      // Navigate to profile page
      window.location.href = "profile.html";
      break;
    case "ACADEMIC":
      // Navigate to courses page (default academic page)
      window.location.href = "courses.html";
      break;
    case "COURSES":
      // Navigate to courses page
      window.location.href = "courses.html";
      break;
    case "PLANNER":
      // Navigate to planner page
      window.location.href = "planner.html";
      break;
    case "CLASS TIMETABLE":
      // Navigate to class timetable page
      window.location.href = "classtimetable.html";
      break;
    case "RESULTS":
      // Navigate to assignment scores page (default results page)
      window.location.href = "assignment-scores.html";
      break;
    case "ASSIGNMENT&C.A SCORES":
      // Navigate to assignment scores page
      window.location.href = "assignment-scores.html";
      break;
    case "DOCUMENTS":
      // Navigate to documents page
      window.location.href = "documents.html";
      break;
    case "RESULT BREAKDOWN":
      // Navigate to result breakdown page
      window.location.href = "result-breakdown.html";
      break;
    case "RESULT ANALYSIS":
      // Navigate to result analysis page
      window.location.href = "result-analysis.html";
      break;
    default:
      console.log(`Unknown section: ${section}`);
  }
}

function setActiveNavItem() {
  // Get current page from URL
  const currentPage = window.location.pathname.split("/").pop();
  const navItems = document.querySelectorAll(".nav-item");

  // Remove active class from all items
  navItems.forEach((item) => item.classList.remove("active"));

  // Set active based on current page
  switch (currentPage) {
    case "dashboard.html":
    case "profile.html":
    case "":
    case "index.html":
      setNavItemActive("GENERAL");
      break;
    case "courses.html":
    case "planner.html":
    case "classtimetable.html":
      setNavItemActive("ACADEMIC");
      break;
    case "assignment-scores.html":
    case "documents.html":
    case "result-breakdown.html":
    case "result-analysis.html":
      setNavItemActive("RESULTS");
      break;
  }
}

function setNavItemActive(sectionName) {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    const span = item.querySelector("span");
    if (span && span.textContent === sectionName) {
      item.classList.add("active");
    }
  });
}

// Export functions for use in other scripts
window.navigateToSection = navigateToSection;
window.setActiveNavItem = setActiveNavItem;
