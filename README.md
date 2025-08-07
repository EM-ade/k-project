# Kennedy Project - Academic Planner

A comprehensive academic planning and management system for university students.

## 📁 Project Structure

```
kennedy-project/
├── 📄 index.html                 # Landing page
├── 📄 README.md                  # Project documentation
├── 📄 update-paths.ps1           # Utility script for path updates
│
├── 📁 pages/                     # All HTML pages
│   ├── 📄 dashboard.html         # Main dashboard
│   ├── 📄 profile.html           # User profile management
│   ├── 📄 courses.html           # Course management
│   ├── 📄 planner.html           # Academic planner/calendar
│   ├── 📄 classtimetable.html    # Class schedule
│   ├── 📄 exam-timetable.html    # Exam schedule & planning
│   ├── 📄 course-reviews.html    # Course rating system
│   ├── 📄 assignment-scores.html # Assignment tracking
│   ├── 📄 documents.html         # Document management
│   ├── 📄 result-breakdown.html  # Academic results
│   └── 📄 result-analysis.html   # Performance analysis
│
├── 📁 css/                       # Stylesheets
│   ├── 📄 styles.css             # Landing page styles
│   ├── 📄 dashboard.css          # Dashboard styles
│   ├── 📄 profile.css            # Profile page styles
│   ├── 📄 courses.css            # Course management styles
│   ├── 📄 planner.css            # Planner/calendar styles
│   ├── 📄 classtimetable.css     # Class timetable styles
│   ├── 📄 exam-timetable.css     # Exam timetable styles
│   ├── 📄 course-reviews.css     # Course reviews styles
│   └── 📄 results.css            # Results pages styles
│
├── 📁 js/                        # JavaScript files
│   ├── 📄 script.js              # Landing page functionality
│   ├── 📄 navigation.js          # Global navigation
│   ├── 📄 dashboard.js           # Dashboard functionality
│   ├── 📄 profile.js             # Profile management
│   ├── 📄 courses.js             # Course management
│   ├── 📄 planner.js             # Calendar/planner logic
│   ├── 📄 classtimetable.js      # Class schedule logic
│   ├── 📄 exam-timetable.js      # Exam planning logic
│   ├── 📄 course-reviews.js      # Review system logic
│   └── 📄 results.js             # Results processing
│
└── 📁 assets/                    # Static assets
    ├── 📁 images/                # Image files
    │   ├── 🖼️ chrisland-university-logo-transparent.png
    │   └── 🖼️ home_logo.png
    └── 📁 icons/                 # Icon files (for future use)
```

## 🚀 Features

### 🏠 **Landing Page**
- University branding and welcome interface
- User authentication (Login/Signup modals)
- Responsive design with modern UI

### 📊 **Dashboard**
- Overview of academic progress
- Quick access to all modules
- Recent activities and notifications
- Performance metrics

### 👤 **Profile Management**
- Personal information management
- Academic details and settings
- Profile picture and preferences

### 📚 **Academic Management**
- **Courses**: Course registration and management
- **Planner**: Interactive calendar for academic planning
- **Class Timetable**: Weekly class schedule
- **Exam Timetable**: Comprehensive exam planning with:
  - Calendar and list views
  - Study plan generation
  - Reminder system
  - Calendar integration

### ⭐ **Course Reviews**
- Multi-step course evaluation system
- Lecturer ratings
- Course difficulty assessment
- Anonymous feedback system

### 📈 **Results & Analytics**
- Assignment and CA score tracking
- Result breakdown and analysis
- Performance visualization
- Document management

## 🎨 Design Features

- **Consistent Theme**: Pink/purple gradient design
- **Responsive Layout**: Mobile-first approach
- **Modern UI**: Card-based layouts with smooth animations
- **Accessibility**: Screen reader friendly
- **Interactive Elements**: Hover effects and transitions

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Unicode emojis and custom icons
- **Responsive**: Mobile-first responsive design
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1200px+)

## 🔧 Development

### File Organization
- All HTML pages are in the `pages/` directory
- CSS files are organized in the `css/` directory
- JavaScript files are in the `js/` directory
- Assets are properly organized in `assets/images/` and `assets/icons/`

### Path Structure
- HTML files use relative paths: `../css/`, `../js/`, `../assets/`
- All internal navigation uses relative paths within the `pages/` directory
- External resources use appropriate relative paths

### Maintenance
- Use the `update-paths.ps1` script when moving files
- Maintain consistent naming conventions
- Keep CSS and JS files modular and organized

## 🚀 Getting Started

1. Open `index.html` in a web browser
2. Navigate through the application using the landing page
3. All pages are interconnected through the navigation system

## 📝 Notes

- The project uses a modular approach with separate CSS and JS files for each page
- Navigation is handled through a global navigation system
- The design maintains consistency across all pages
- All forms include proper validation and user feedback

## 🔮 Future Enhancements

- Backend integration for data persistence
- Real-time notifications
- Advanced analytics and reporting
- Mobile app development
- Integration with university systems
