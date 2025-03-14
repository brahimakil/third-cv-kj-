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
// Add touch support for mobile devices
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
    
    // Add touch support for mobile devices
    const interests = document.querySelectorAll('.interest');
    interests.forEach(interest => {
        interest.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-3px)';
        }, {passive: true});
        
        interest.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0)';
        }, {passive: true});
    });
    
    // Improve mobile scrolling experience
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add swipe detection for theme toggle on mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 100;
        if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right - toggle to light theme
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                toggleTheme();
            }
        } else if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left - toggle to dark theme
            if (document.documentElement.getAttribute('data-theme') === 'light') {
                toggleTheme();
            }
        }
    }
});