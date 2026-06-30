// header.js

(function() {
    // Check if we are on the home page
    const pathname = window.location.pathname;
    const isHome = pathname.endsWith('/') || pathname.endsWith('index.html') || pathname === '';
    
    // Prefix for anchor links if we are on a subpage
    const p = isHome ? '' : 'index.html';

    const headerHTML = `
    <header id="main-header">
        <div class="nav-container">
            <a href="${p}#home" class="brand-logo" aria-label="Solista Energies Home">
                <img src="assets/images/header_logo.png" alt="Solista Energies" class="brand-logo-img" style="height:60px;width:auto;object-fit:contain;margin-top:15px;">
                <div class="brand-logo-text">
                    <span class="text-solist">SOLISTA</span>
                    <span class="text-energies">ENERGIES</span>
                </div>
            </a>

            <div class="nav-right">
                <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle Light/Dark Theme">
                    <svg class="icon-sun" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    <svg class="icon-moon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button>

                <button class="menu-toggle" aria-label="Toggle Mobile Menu" id="menu-toggle-btn">
                    <span></span><span></span><span></span>
                </button>

                <nav class="nav-menu" id="nav-menu-bar">
                    <a href="${p}#home"             class="nav-link">Home</a>
                    <a href="${p}#about"            class="nav-link">About Us</a>
                    <a href="${p}#services"         class="nav-link">Our Services</a>
                    <a href="${p}#ppa-section"      class="nav-link">PPA Solutions</a>
                    <a href="${p}#investors-section" class="nav-link">Investors</a>
                    <a href="${p}#projects"         class="nav-link">Our Projects</a>
                    <a href="${p}#why-choose"       class="nav-link">Why Choose Us</a>
                    <a href="${p}#process-clients"  class="nav-link">Our Partners</a>
                    <a href="contact.html"          class="nav-link">Contact Us</a>
                    <button class="btn btn-primary" onclick="openModal('Get a Quote')">
                        Get a Quote
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12,5 19,12 12,19"></polyline></svg>
                    </button>
                </nav>
            </div>
        </div>
    </header>
    `;

    // Inject into the placeholder
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
        placeholder.innerHTML = headerHTML;
    }

    // Attach active class logic for the home page sections
    if (isHome) {
        setTimeout(() => {
            const sections = document.querySelectorAll('section[id], footer[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (scrollY >= (sectionTop - 150)) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(current) && current !== '') {
                        link.classList.add('active');
                    }
                });
            });
        }, 100);
    }

    // Attach theme toggle logic
    setTimeout(() => {
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        if (themeToggleBtn) {
            // Check for saved user preference, if any, on load of the website
            const savedTheme = localStorage.getItem('solista-theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
            } else if (savedTheme === 'light') {
                document.body.classList.remove('dark-theme');
            }

            themeToggleBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                if (document.body.classList.contains('dark-theme')) {
                    localStorage.setItem('solista-theme', 'dark');
                } else {
                    localStorage.setItem('solista-theme', 'light');
                }
            });
        }
    }, 50);
})();
