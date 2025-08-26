// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('EvelX Moderation System loaded!');
    
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Function to switch between sections
    function switchSection(targetSection) {
        // Remove active class from all nav links and sections
        navLinks.forEach(link => link.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked nav link
        const clickedLink = document.querySelector(`[data-section="${targetSection}"]`);
        if (clickedLink) {
            clickedLink.classList.add('active');
        }
        
        // Show target section
        const targetSectionElement = document.getElementById(targetSection);
        if (targetSectionElement) {
            targetSectionElement.classList.add('active');
        }
        
        // Update URL hash
        window.location.hash = targetSection;
    }
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            switchSection(targetSection);
        });
    });
    
    // Handle initial page load with hash
    function handleInitialLoad() {
        const hash = window.location.hash.substring(1); // Remove # from hash
        if (hash && document.getElementById(hash)) {
            switchSection(hash);
        } else {
            // Default to team section
            switchSection('team');
        }
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            switchSection(hash);
        }
    });
    
    // Initialize page
    handleInitialLoad();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation to table rows
    function animateTableRows() {
        const tableRows = document.querySelectorAll('.team-table tbody tr');
        tableRows.forEach((row, index) => {
            row.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Add CSS for row animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-row {
            opacity: 0;
            animation: fadeInRow 0.5s ease-forward forwards;
        }
        
        @keyframes fadeInRow {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Animate table rows when team section is active
    const teamSection = document.getElementById('team');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTableRows();
                observer.unobserve(entry.target);
            }
        });
    });
    
    if (teamSection) {
        observer.observe(teamSection);
    }
    
    // Add search functionality for team table
    function addTableSearch() {
        // Create search input
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            margin-bottom: 1rem;
            display: flex;
            justify-content: center;
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Поиск по команде...';
        searchInput.className = 'team-search';
        searchInput.style.cssText = `
            padding: 0.8rem 1rem;
            border: 2px solid #e9ecef;
            border-radius: 25px;
            font-size: 1rem;
            width: 300px;
            max-width: 100%;
            outline: none;
            transition: all 0.3s ease;
        `;
        
        // Add focus styles
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = '#e9ecef';
        });
        
        searchContainer.appendChild(searchInput);
        
        // Insert search before table
        const tableContainer = document.querySelector('.table-container');
        if (tableContainer) {
            tableContainer.parentNode.insertBefore(searchContainer, tableContainer);
        }
        
        // Add search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('.team-table tbody tr');
            
            tableRows.forEach(row => {
                const position = row.querySelector('.position').textContent.toLowerCase();
                const nickname = row.querySelector('.nickname').textContent.toLowerCase();
                
                if (position.includes(searchTerm) || nickname.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Add search functionality when team section loads
    if (document.getElementById('team')) {
        addTableSearch();
    }
    
    // Add manual card hover effects
    const manualCards = document.querySelectorAll('.manual-card');
    manualCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    switchSection('team');
                    break;
                case '2':
                    e.preventDefault();
                    switchSection('regulations');
                    break;
                case '3':
                    e.preventDefault();
                    switchSection('candidates');
                    break;
                case '4':
                    e.preventDefault();
                    switchSection('manuals');
                    break;
            }
        }
    });

    document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('menu').hidePopover();
            });
        });
    
    // Show keyboard shortcuts in console
    console.log('Горячие клавиши:');
    console.log('Alt + 1: Команда Проекта');
    console.log('Alt + 2: Регламент');
    console.log('Alt + 3: Регламент Кандидатов');
    console.log('Alt + 4: Мануалы');
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    // Fade in page after load
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});