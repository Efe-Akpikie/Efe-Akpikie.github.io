# Portfolio Website Template

A modern, clean, single-page portfolio website template for CS + Math students specializing in Statistics/Data Science. Built with vanilla HTML, CSS, and JavaScript—no frameworks or build tools required.

## Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark mode toggle with system preference detection and localStorage persistence
- ✅ Smooth scrolling navigation with active section highlighting
- ✅ Mobile hamburger menu
- ✅ Scroll reveal animations (respects `prefers-reduced-motion`)
- ✅ Accessible (ARIA labels, semantic HTML, keyboard navigation)
- ✅ Contact form with client-side validation
- ✅ SEO-friendly meta tags
- ✅ Production-ready code

## How to Run Locally

1. **Clone or download** this repository to your computer

2. **Open the files** in your preferred code editor

3. **Run a local server** (choose one method):

   **Option A: Using Python (if installed)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then open: http://localhost:8000
   ```

   **Option B: Using Node.js (if installed)**
   ```bash
   npx http-server -p 8000
   
   # Then open: http://localhost:8000
   ```

   **Option C: Using VS Code Live Server**
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

   **Option D: Direct file opening**
   - Simply double-click `index.html` (some features may not work due to CORS)

4. **View the site** in your browser at `http://localhost:8000` (or the port you specified)

## Customization Guide

### 1. Personal Information

**In `index.html`:**

- **Name & Tagline** (Hero section, around line 40):
  ```html
  <h1 class="hero-title">Alex Chen</h1>
  <p class="hero-tagline">CS + Math student focused on...</p>
  ```

- **Email & Location** (Contact section, around line 380):
  ```html
  <a href="mailto:alex.chen@example.com">alex.chen@example.com</a>
  <span>Victoria, BC, Canada</span>
  ```

- **Social Links** (Hero section, around line 50):
  ```html
  <a href="https://github.com" ...>GitHub</a>
  <a href="https://linkedin.com" ...>LinkedIn</a>
  ```

### 2. Colors & Theme

**In `styles.css` (top of file, `:root` section):**

- **Light theme colors:**
  ```css
  --accent: #0d6efd;           /* Primary accent color */
  --bg-primary: #ffffff;        /* Main background */
  --text-primary: #212529;      /* Main text color */
  ```

- **Dark theme colors:**
  ```css
  [data-theme="dark"] {
    --accent: #4dabf7;          /* Dark mode accent */
    --bg-primary: #1a1d21;      /* Dark background */
    --text-primary: #e9ecef;    /* Light text */
  }
  ```

Change these values to match your brand colors.

### 3. Content Sections

**About Section:**
- Edit the paragraphs and bullet lists in the `#about` section (around line 80)

**Skills Section:**
- Modify skill tags in the `#skills` section (around line 100)
- Add/remove skill groups or individual tags as needed

**Projects Section:**
- See "How to Add a New Project" below

**Experience Section:**
- Edit experience items in the `#experience` section (around line 200)
- Each item has: title, date, organization, and details list

**Coursework Section:**
- Update course lists in the `#coursework` section (around line 250)

**Highlights Section:**
- Change numbers and labels in the `#highlights` section (around line 280)

### 4. Resume Download Link

**In `index.html` (Hero section, around line 45):**
```html
<a href="#" class="btn btn-secondary" download>Download Resume</a>
```

Replace `#` with the path to your resume PDF file (e.g., `resume.pdf`).

## How to Add a New Project Card

1. **Find the Projects section** in `index.html` (around line 150)

2. **Copy an existing project card** (the `<article class="project-card">` block)

3. **Paste it** inside the `<div class="projects-grid">` container

4. **Update the content:**
   ```html
   <article class="project-card">
     <h3 class="project-title">Your Project Name</h3>
     <p class="project-description">One-line value proposition</p>
     <ul class="project-highlights">
       <li>Highlight bullet 1</li>
       <li>Highlight bullet 2</li>
       <li>Highlight bullet 3</li>
     </ul>
     <div class="project-tags">
       <span class="project-tag">Python</span>
       <span class="project-tag">Pandas</span>
       <!-- Add more tags -->
     </div>
     <div class="project-links">
       <a href="https://github.com/yourusername/repo" target="_blank" rel="noopener noreferrer" class="project-link">GitHub</a>
       <a href="https://your-demo-url.com" class="project-link">Live Demo</a>
     </div>
   </article>
   ```

5. **Save and refresh** your browser

## How to Add a New Experience Item

1. **Find the Experience section** in `index.html` (around line 200)

2. **Copy an existing experience item** (the `<div class="experience-item">` block)

3. **Paste it** inside the `<div class="experience-list">` container

4. **Update the content:**
   ```html
   <div class="experience-item">
     <div class="experience-header">
       <h3 class="experience-title">Your Role Title</h3>
       <span class="experience-date">Start Date - End Date</span>
     </div>
     <p class="experience-org">Organization Name</p>
     <ul class="experience-details">
       <li>Detail bullet 1</li>
       <li>Detail bullet 2</li>
       <li>Detail bullet 3</li>
     </ul>
   </div>
   ```

5. **Save and refresh** your browser

## File Structure

```
Portfolio/
├── index.html      # Main HTML file
├── styles.css      # All styles and theming
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Browser Support

Works in all modern evergreen browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Performance Notes

- No external dependencies or CDN links
- Minimal JavaScript (vanilla JS only)
- CSS animations respect `prefers-reduced-motion`
- All icons are inline SVG (no image files)
- Optimized for fast loading

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Visible focus indicators
- High contrast color schemes
- Screen reader friendly

## License

Free to use and modify for personal or commercial projects.

---

**Need help?** Check the code comments in each file for additional guidance.

