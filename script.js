// Function to print/download CV
function printCV() {
    window.print();
}

// Function to toggle between light and dark themes
function toggleTheme() {
    const html = document.documentElement;
    const themeToggleIcon = document.querySelector('.theme-toggle i');
    
    if (html.getAttribute('data-theme') === 'dark') {
        html.setAttribute('data-theme', 'light');
        themeToggleIcon.classList.remove('fa-sun');
        themeToggleIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        themeToggleIcon.classList.remove('fa-moon');
        themeToggleIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

// Check for saved theme preference or respect OS preference
document.addEventListener('DOMContentLoaded', function() {
    const html = document.documentElement;
    const themeToggleIcon = document.querySelector('.theme-toggle i');
    
    // Check if user has previously selected a theme
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
        }
    } else {
        // Check if user prefers dark mode at OS level
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            html.setAttribute('data-theme', 'dark');
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Fade in elements on load
    document.body.classList.add('loaded');
    
    // Add hover effects for project items
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});