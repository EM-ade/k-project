// Global navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  try {
    setupGlobalNavigation();
    setActiveNavItem();
    setupBackButton();
  } catch (error) {
    console.error("Navigation initialization error:", error);
  }
});

function setupGlobalNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      // Don't navigate if clicking on dropdown items
      if (e.target.classList.contains("dropdown-item")) {
        return;
      }

      const section = this.querySelector("span").textContent;
      navigateToSection(section);
    });
  });

  // Handle dropdown item clicks
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const href = this.getAttribute("href");
      if (href) {
        const currentPath = window.location.pathname;
        const isInPagesDir = currentPath.includes("/pages/");
        const targetPath = isInPagesDir ? href : "pages/" + href;
        window.location.href = targetPath;
      }
    });
  });

  // Add logo click to go back to main page
  const logo = document.querySelector(".logo");
  const logoIcon = document.querySelector(".logo-icon");

  if (logo) {
    logo.addEventListener("click", function () {
      const currentPath = window.location.pathname;
      const isInPagesDir = currentPath.includes("/pages/");
      const homePath = isInPagesDir ? "../index.html" : "index.html";
      window.location.href = homePath;
    });
    logo.style.cursor = "pointer";
  }

  // Handle logo loading state
  if (logoIcon && logoIcon.tagName === "IMG") {
    logoIcon.addEventListener("load", function () {
      this.classList.add("loaded");
    });

    logoIcon.addEventListener("error", function () {
      // Fallback if logo fails to load
      this.style.display = "none";
      const fallbackText = document.createElement("div");
      fallbackText.textContent = "📚";
      fallbackText.className = "logo-icon loaded";
      fallbackText.style.fontSize = "2rem";
      this.parentNode.appendChild(fallbackText);
    });

    // If image is already loaded (cached)
    if (logoIcon.complete) {
      logoIcon.classList.add("loaded");
    }
  }
}

function navigateToSection(section) {
  // Check if we're already in the pages directory
  const currentPath = window.location.pathname;
  const isInPagesDir = currentPath.includes("/pages/");
  const basePath = isInPagesDir ? "" : "pages/";

  switch (section) {
    case "GENERAL":
      // Navigate to dashboard
      window.location.href = basePath + "dashboard.html";
      break;
    case "PROFILE":
      // Navigate to profile page
      window.location.href = basePath + "profile.html";
      break;
    case "ACADEMIC":
      // Navigate to courses page (default academic page)
      window.location.href = basePath + "courses.html";
      break;
    case "COURSES":
      // Navigate to courses page
      window.location.href = basePath + "courses.html";
      break;
    case "PLANNER":
      // Navigate to planner page
      window.location.href = basePath + "planner.html";
      break;
    case "CLASS TIMETABLE":
      // Navigate to class timetable page
      window.location.href = basePath + "classtimetable.html";
      break;
    case "EXAM TIMETABLE":
      // Navigate to exam timetable page
      window.location.href = basePath + "exam-timetable.html";
      break;
    case "COURSE REVIEWS":
      // Navigate to course reviews page
      window.location.href = basePath + "course-reviews.html";
      break;
    case "RESULTS":
      // Navigate to assignment scores page (default results page)
      window.location.href = basePath + "assignment-scores.html";
      break;
    case "ASSIGNMENT&C.A SCORES":
      // Navigate to assignment scores page
      window.location.href = basePath + "assignment-scores.html";
      break;
    case "DOCUMENTS":
      // Navigate to documents page
      window.location.href = basePath + "documents.html";
      break;
    case "RESULT BREAKDOWN":
      // Navigate to result breakdown page
      window.location.href = basePath + "result-breakdown.html";
      break;
    case "RESULT ANALYSIS":
      // Navigate to result analysis page
      window.location.href = basePath + "result-analysis.html";
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

function setupBackButton() {
  // Add browser back button functionality
  window.addEventListener("popstate", function (event) {
    // Handle browser back/forward navigation
    setActiveNavItem();
  });

  // Add keyboard navigation (Alt + Left Arrow for back)
  document.addEventListener("keydown", function (event) {
    if (event.altKey && event.key === "ArrowLeft") {
      event.preventDefault();
      window.history.back();
    }

    // Alt + Right Arrow for forward
    if (event.altKey && event.key === "ArrowRight") {
      event.preventDefault();
      window.history.forward();
    }

    // Escape key to go to dashboard
    if (event.key === "Escape") {
      const currentPath = window.location.pathname;
      const isInPagesDir = currentPath.includes("/pages/");
      const dashboardPath = isInPagesDir
        ? "dashboard.html"
        : "pages/dashboard.html";
      window.location.href = dashboardPath;
    }
  });
}

// Export functions for use in other scripts
window.navigateToSection = navigateToSection;
window.setActiveNavItem = setActiveNavItem;
window.setupBackButton = setupBackButton;
