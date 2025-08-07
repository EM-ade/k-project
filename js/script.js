// Modal functionality
function openSignupModal() {
  document.getElementById("signupModal").style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeSignupModal() {
  document.getElementById("signupModal").style.display = "none";
  document.body.style.overflow = "auto"; // Restore scrolling
}

function openLoginModal() {
  document.getElementById("loginModal").style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none";
  document.body.style.overflow = "auto"; // Restore scrolling
}

// Close modal when clicking outside of it
window.onclick = function (event) {
  const signupModal = document.getElementById("signupModal");
  const loginModal = document.getElementById("loginModal");

  if (event.target === signupModal) {
    closeSignupModal();
  }
  if (event.target === loginModal) {
    closeLoginModal();
  }
};

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeSignupModal();
    closeLoginModal();
  }
});

// Handle form submission
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  // Basic validation
  if (
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.password
  ) {
    alert("Please fill in all fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Password validation (minimum 6 characters)
  if (formData.password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  // Store user data in localStorage for demo purposes
  localStorage.setItem("userData", JSON.stringify(formData));

  // Here you would typically send the data to your backend
  console.log("Form submitted:", formData);
  alert("Account created successfully!");

  // Reset form and close modal
  document.getElementById("signupForm").reset();
  closeSignupModal();
});

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const loginData = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value,
  };

  // Basic validation
  if (!loginData.email || !loginData.password) {
    alert("Please fill in all fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(loginData.email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Here you would typically send the data to your backend for authentication
  console.log("Login attempt:", loginData);

  // For demo purposes, redirect to dashboard
  window.location.href = "pages/dashboard.html";
});

// Add smooth animations
document.addEventListener("DOMContentLoaded", function () {
  // Animate elements on page load
  const title = document.querySelector(".main-title");
  const buttons = document.querySelectorAll(".btn");
  const banner = document.querySelector(".banner-image");

  // Add fade-in animation
  setTimeout(() => {
    title.style.opacity = "1";
    title.style.transform = "translateY(0)";
  }, 100);

  setTimeout(() => {
    buttons.forEach((btn, index) => {
      setTimeout(() => {
        btn.style.opacity = "1";
        btn.style.transform = "translateY(0)";
      }, index * 100);
    });
  }, 300);

  setTimeout(() => {
    banner.style.opacity = "1";
    banner.style.transform = "translateY(0)";
  }, 600);
});

// Add initial styles for animation
document.addEventListener("DOMContentLoaded", function () {
  const elementsToAnimate = [".main-title", ".btn", ".banner-image"];

  elementsToAnimate.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "all 0.6s ease";
    });
  });
});
