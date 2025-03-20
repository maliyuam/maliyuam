// Enhanced main.js - Core Initialization and Preloader
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initCustomCursor();
    initNavigation();
    initScrollEffects();
    initTypeWriter();
    initAnimations();
    initSkillsVisualization();
    initRadarSkills();
    initMagneticElements();
    initTiltCards();
    initProjectFilter();
    initProjectModal();
    initTimeline();
    initFormInteractions();
    initMobileTimeline();
    initProgressIndicator();
    initSectionObserver();
    initParticleBackground();

    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
            once: true,
            mirror: false,
            disable: 'mobile'
        });
    }
});

// ======= PRELOADER =======
function initPreloader() {
    const preloader = document.querySelector('.preloader');

    if (!preloader) return;

    // Add a counter animation to preloader
    let counter = 0;
    const loadingText = preloader.querySelector('p');

    if (loadingText) {
        const counterInterval = setInterval(() => {
            counter += Math.floor(Math.random() * 5) + 1; // Random increment for more natural feel
            loadingText.textContent = `Loading ${Math.min(counter, 100)}%`;

            if (counter >= 100) {
                clearInterval(counterInterval);
            }
        }, 100);
    }

    // Handle page load complete
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');

            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');

                // Trigger entrance animations for hero section
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.classList.add('animate-hero');
                }
            }, 500);
        }, 1000);
    });
}

// ======= CUSTOM CURSOR =======
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');

    if (!cursorDot || !cursorCircle) return;
    
    // Don't use custom cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursorDot.style.display = 'none';
        cursorCircle.style.display = 'none';
        return;
    }

    // Hide default cursor
    document.body.style.cursor = 'none';

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let circleX = 0;
    let circleY = 0;

    // Improved smooth following for cursor elements
    function updateCursorPosition() {
        // Calculate smooth movement with lerp (linear interpolation)
        dotX += (mouseX - dotX) * 0.8;
        dotY += (mouseY - dotY) * 0.8;
        circleX += (mouseX - circleX) * 0.3; // Slower follow for circle
        circleY += (mouseY - circleY) * 0.3;

        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        cursorCircle.style.left = `${circleX}px`;
        cursorCircle.style.top = `${circleY}px`;

        requestAnimationFrame(updateCursorPosition);
    }

    // Show custom cursor when mouse moves
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursorDot.style.opacity !== '1') {
            cursorDot.style.opacity = '1';
            cursorCircle.style.opacity = '1';
        }
    });

    // Start the animation
    updateCursorPosition();

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorCircle.style.opacity = '0';
    });

    // Add hover effect for interactive elements 
    const interactiveElements = document.querySelectorAll('a, button, .project, .filter-btn, .scroll-top, input, textarea, .modal-close, .card-side, .timeline-card, .showcase-arrow, .indicator');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorCircle.style.width = '60px';
            cursorCircle.style.height = '60px';
            cursorCircle.style.borderColor = 'var(--accent-color)';
            cursorCircle.classList.add('cursor-active');
        });

        element.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorCircle.style.width = '40px';
            cursorCircle.style.height = '40px';
            cursorCircle.style.borderColor = 'var(--primary-color)';
            cursorCircle.classList.remove('cursor-active');
        });
    });
}
// ======= NAVIGATION =======
function initNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile navigation with improved animation
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle navigation
            nav.classList.toggle('nav-active');

            // Toggle burger animation
            burger.classList.toggle('toggle');

            // Prevent scrolling when menu is open
            document.body.classList.toggle('menu-open');

            // Staggered animation for links with improved timing
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    // Use cubic-bezier for more natural motion
                    link.style.animation = `navLinkFade 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards ${index / 10 + 0.15}s`;
                }
            });

            // Add backdrop blur when menu is open
            if (nav.classList.contains('nav-active')) {
                document.body.insertAdjacentHTML('beforeend', '<div class="nav-backdrop"></div>');
                setTimeout(() => {
                    document.querySelector('.nav-backdrop').classList.add('active');
                }, 10);
            } else {
                const backdrop = document.querySelector('.nav-backdrop');
                if (backdrop) {
                    backdrop.classList.remove('active');
                    setTimeout(() => {
                        backdrop.remove();
                    }, 300);
                }
            }
        });
    }

    // Mobile dropdown toggles with enhanced animation
    if (window.innerWidth <= 768) {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();

                const dropdown = toggle.nextElementSibling;

                // Close all other open dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu !== dropdown && menu.classList.contains('show')) {
                        menu.style.height = '0px';
                        setTimeout(() => {
                            menu.classList.remove('show');
                            menu.removeAttribute('style');
                        }, 300);

                        // Reset arrow direction
                        const toggleIcon = menu.previousElementSibling.querySelector('i');
                        toggleIcon.classList.remove('fa-chevron-up');
                        toggleIcon.classList.add('fa-chevron-down');
                    }
                });

                // Toggle this dropdown with height animation
                if (dropdown.classList.contains('show')) {
                    dropdown.style.height = dropdown.scrollHeight + 'px';
                    setTimeout(() => {
                        dropdown.style.height = '0px';
                        setTimeout(() => {
                            dropdown.classList.remove('show');
                            dropdown.removeAttribute('style');
                        }, 300);
                    }, 10);
                } else {
                    dropdown.classList.add('show');
                    dropdown.style.height = '0px';
                    setTimeout(() => {
                        dropdown.style.height = dropdown.scrollHeight + 'px';
                        setTimeout(() => {
                            dropdown.removeAttribute('style');
                        }, 300);
                    }, 10);
                }

                // Toggle arrow direction with rotation animation
                const toggleIcon = toggle.querySelector('i');
                toggleIcon.classList.toggle('fa-chevron-up');
                toggleIcon.classList.toggle('fa-chevron-down');
            });
        });
    }

    // Enhanced Sticky Navigation & Hide on Scroll Down
    let lastScrollTop = 0;
    let scrollTimer;
    let scrollDistance = 0;
    let isNavHidden = false;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollDistance = Math.abs(scrollTop - lastScrollTop);

        // Only process if significant scroll happened (improves performance)
        if (scrollDistance > 5) {
            clearTimeout(scrollTimer);

            // Add scrolled class with transition
            if (scrollTop > 50) {
                if (!navbar.classList.contains('navbar-scrolled')) {
                    navbar.classList.add('navbar-scrolled');
                    navbar.style.backdropFilter = 'blur(10px)';
                }
            } else {
                navbar.classList.remove('navbar-scrolled');
                setTimeout(() => {
                    if (!navbar.classList.contains('navbar-scrolled')) {
                        navbar.style.backdropFilter = 'none';
                    }
                }, 300);
            }

            // Hide/show navbar based on scroll direction with improved threshold
            if (scrollTop > lastScrollTop && scrollTop > 300 && !isNavHidden) {
                // Scrolling down - hide navbar
                navbar.classList.add('navbar-hidden');
                isNavHidden = true;
            } else if ((scrollTop < lastScrollTop || scrollTop <= 300) && isNavHidden) {
                // Scrolling up or near top - show navbar
                navbar.classList.remove('navbar-hidden');
                isNavHidden = false;
            }

            lastScrollTop = scrollTop;

            // Set a timer to check if scrolling has stopped
            scrollTimer = setTimeout(() => {
                // If we're at the top, ensure navbar is fully visible
                if (scrollTop <= 50) {
                    navbar.classList.remove('navbar-scrolled', 'navbar-hidden');
                    navbar.style.backdropFilter = 'none';
                    isNavHidden = false;
                } else if (scrollTop <= 300) {
                    navbar.classList.remove('navbar-hidden');
                    isNavHidden = false;
                }
            }, 150);
        }
    });

    // Close mobile menu on window resize with proper cleanup
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            document.body.classList.remove('menu-open');

            navLinks.forEach(link => {
                link.style.animation = '';
            });

            // Remove backdrop if it exists
            const backdrop = document.querySelector('.nav-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                document.body.classList.remove('menu-open');

                navLinks.forEach(link => {
                    link.style.animation = '';
                });

                // Remove backdrop if it exists
                const backdrop = document.querySelector('.nav-backdrop');
                if (backdrop) {
                    backdrop.classList.remove('active');
                    setTimeout(() => {
                        backdrop.remove();
                    }, 300);
                }
            }
        });
    });
}

// ======= SECTION OBSERVER =======
function initSectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links li a');

    // Create an observer for each section
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When a section is in viewport
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.getAttribute('id');

                // Update navigation highlighting
                navItems.forEach(item => {
                    item.classList.remove('active');
                    const href = item.getAttribute('href');

                    if (href && href.substring(1) === currentSectionId) {
                        item.classList.add('active');

                        // If item is in dropdown, highlight parent too
                        const parentLi = item.closest('li.nav-dropdown');
                        if (parentLi) {
                            const parentLink = parentLi.querySelector('.dropdown-toggle');
                            if (parentLink) {
                                parentLink.classList.add('active');
                            }
                        }
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        if (section.getAttribute('id')) {
            observer.observe(section);
        }
    });
}

// ======= SCROLL EFFECTS =======
function initScrollEffects() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');

    // Enhanced scroll to top button with bounce effect
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                if (!scrollTopBtn.classList.contains('show')) {
                    scrollTopBtn.classList.add('show');
                    // Add bounce animation
                    scrollTopBtn.classList.add('bounce');
                    setTimeout(() => {
                        scrollTopBtn.classList.remove('bounce');
                    }, 1000);
                }
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            // Add rotation on click
            scrollTopBtn.classList.add('rotate');

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            setTimeout(() => {
                scrollTopBtn.classList.remove('rotate');
            }, 500);
        });
    }

    // Improved scroll indicator (progress bar) with gradient animation
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;

            scrollIndicator.style.width = `${scrolled}%`;

            // Change gradient position based on scroll percentage
            scrollIndicator.style.backgroundPosition = `${scrolled}% 0`;
        });
    }

    // Enhanced hero scroll indicator (mouse animation)
    if (heroScrollIndicator) {
        // Make it pulse periodically to draw attention
        setInterval(() => {
            heroScrollIndicator.classList.add('pulse');
            setTimeout(() => {
                heroScrollIndicator.classList.remove('pulse');
            }, 1000);
        }, 5000);

        heroScrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');

            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Enhanced smooth scrolling for all internal links with variable offset based on screen size
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Calculate offset based on viewport height and navbar height
                    let offset = 80;
                    if (window.innerWidth <= 768) {
                        offset = 70; // Smaller offset for mobile
                    }

                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL hash without jumping
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

// ======= PROGRESS INDICATOR =======
function initProgressIndicator() {
    // Create progress indicator if it doesn't exist
    if (!document.querySelector('.section-progress-indicator')) {
        const indicator = document.createElement('div');
        indicator.className = 'section-progress-indicator';
        document.body.appendChild(indicator);
    }

    const progressIndicator = document.querySelector('.section-progress-indicator');
    const sections = document.querySelectorAll('section[id]');
    const totalSections = sections.length;

    // Create bubbles for each section
    sections.forEach((section, index) => {
        const bubble = document.createElement('div');
        bubble.className = 'progress-bubble';
        bubble.setAttribute('data-section', section.id);
        bubble.style.top = `${(index / (totalSections - 1)) * 100}%`;

        // Add tooltip with section name
        const tooltip = document.createElement('span');
        tooltip.className = 'bubble-tooltip';
        tooltip.textContent = section.id.charAt(0).toUpperCase() + section.id.slice(1);
        bubble.appendChild(tooltip);

        // Make bubbles clickable
        bubble.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });

        progressIndicator.appendChild(bubble);
    });

    // Update active bubble on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            const bubble = document.querySelector(`.progress-bubble[data-section="${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.progress-bubble').forEach(b => b.classList.remove('active'));
                bubble.classList.add('active');
            }
        });
    });

    // Hide on mobile
    function checkMobile() {
        if (window.innerWidth <= 768) {
            progressIndicator.style.display = 'none';
        } else {
            progressIndicator.style.display = 'block';
        }
    }

    checkMobile();
    window.addEventListener('resize', checkMobile);
}
// ======= TYPEWRITER EFFECT =======
function initTypeWriter() {
    const txtElement = document.querySelector('.txt-type');

    if (!txtElement) return;

    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = parseInt(txtElement.getAttribute('data-wait'), 10);

    // Initialize TypeWriter with enhanced typing effect
    new TypeWriter(txtElement, words, wait);
}

// Enhanced TypeWriter Class with smoother transitions
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = wait;
        this.type();
        this.isDeleting = false;
        this.isWaiting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char with variable speed based on length
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char with variable speed based on length
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element with blinking cursor effect
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Dynamic Type Speed based on state
        let typeSpeed = 100;

        if (this.isDeleting) {
            // Faster when deleting
            typeSpeed = Math.max(30, 60 - (fullTxt.length - this.txt.length) * 2);
        } else if (!this.isDeleting && !this.isWaiting) {
            // Variable speed when typing based on position in word
            typeSpeed = Math.max(40, 100 - (this.txt.length * 2));

            // Add slight random variation to make it feel more natural
            typeSpeed += Math.random() * 30 - 15;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt && !this.isWaiting) {
            // Set waiting flag
            this.isWaiting = true;
            // Wait at end
            typeSpeed = this.wait;

            setTimeout(() => {
                this.isDeleting = true;
                this.isWaiting = false;
            }, typeSpeed);
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 700;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ======= ANIMATIONS =======
function initAnimations() {
    // Elements to animate
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');

    // Enhanced element animations with interaction capabilities
    function animateElements() {
        const triggerPoint = window.innerHeight * 0.85; // Slightly higher trigger point

        // Fade in animations
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerPoint) {
                if (!element.classList.contains('appear')) {
                    element.classList.add('appear');

                    // Add data attribute to track animation completion
                    setTimeout(() => {
                        element.setAttribute('data-animated', 'true');
                    }, 700); // Match with CSS transition duration
                }
            }
        });

        // Slide from left animations
        slideLeftElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerPoint) {
                if (!element.classList.contains('appear')) {
                    element.classList.add('appear');

                    setTimeout(() => {
                        element.setAttribute('data-animated', 'true');
                    }, 700);
                }
            }
        });

        // Slide from right animations
        slideRightElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerPoint) {
                if (!element.classList.contains('appear')) {
                    element.classList.add('appear');

                    setTimeout(() => {
                        element.setAttribute('data-animated', 'true');
                    }, 700);
                }
            }
        });
    }

    // Add subtle hover interactions to animated elements
    function addHoverInteractions() {
        const allAnimatedElements = document.querySelectorAll('[data-animated="true"]');

        allAnimatedElements.forEach(element => {
            if (!element.hasAttribute('data-hover-added')) {
                element.addEventListener('mouseenter', () => {
                    element.style.transform = 'scale(1.02)';
                    element.style.transition = 'transform 0.3s ease';
                });

                element.addEventListener('mouseleave', () => {
                    element.style.transform = '';
                });

                element.setAttribute('data-hover-added', 'true');
            }
        });
    }

    // Run animations on load, scroll and resize
    animateElements();
    window.addEventListener('scroll', () => {
        animateElements();
        // Check for new animated elements to add hover effect
        addHoverInteractions();
    });
    window.addEventListener('resize', animateElements);

    // Run hover interaction check periodically
    setInterval(addHoverInteractions, 1000);
}

// ======= SKILLS VISUALIZATION =======
function initSkillsVisualization() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    if (!skillCards.length) return;
    
    // Intersection Observer to animate skill cards when they enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                
                // Add animated class to start the bar filling animation
                setTimeout(() => {
                    card.classList.add('animated');
                    
                    // Set the width directly in case CSS attr() isn't fully supported
                    const level = card.getAttribute('data-level');
                    const fillBar = card.querySelector('.skill-level-fill');
                    if (fillBar) {
                        fillBar.style.width = `${level}%`;
                    }
                }, 300);
                
                // Unobserve after animation is triggered
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe all skill cards
    skillCards.forEach(card => {
        observer.observe(card);
        
        // Add flip effect on hover/click
        card.addEventListener('click', function() {
            // Toggle flipped class on card click (for mobile)
            this.classList.toggle('flipped');
        });
        
        // Handle mouseleave for desktop
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.classList.remove('flipped');
            }
        });
    });
}

// ======= RADAR SKILLS VISUALIZATION =======
function initRadarSkills() {
    const radarSkills = document.querySelectorAll('.radar-skill');
    const skillsRadar = document.querySelector('.skills-radar');

    if (!radarSkills.length || !skillsRadar) return;

    // Animate radar skills appearance
    function animateRadarSkills() {
        if (skillsRadar.classList.contains('animated')) return;

        const isInViewport = skillsRadar.getBoundingClientRect().top <= window.innerHeight * 0.8;

        if (isInViewport) {
            // Mark as animated
            skillsRadar.classList.add('animated');

            // Animate radar levels with delay
            const levels = skillsRadar.querySelectorAll('.radar-level');
            levels.forEach((level, index) => {
                setTimeout(() => {
                    level.style.opacity = '1';
                    level.style.transform = 'scale(1)';
                }, index * 200);
            });

            // Animate radar center
            const center = skillsRadar.querySelector('.radar-center');
            if (center) {
                setTimeout(() => {
                    center.style.opacity = '1';
                    center.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 100);
            }

            // Position skills around the radar with enhanced interaction
            radarSkills.forEach((skill, index) => {
                const value = parseInt(skill.getAttribute('data-value'), 10);
                const angle = (index * (360 / radarSkills.length)) * (Math.PI / 180);
                const radius = (value / 100) * 150; // Scale radius based on skill level (max 150px)
                
                // Calculate position around the circle
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                // Position skill correctly
                skill.style.transform = `rotate(${index * (360 / radarSkills.length)}deg)`;
                
                // Set point position based on radius
                const point = skill.querySelector('.radar-point');
                if (point) {
                    point.style.left = `${radius}px`;
                    point.style.width = `${Math.max(8, value / 10)}px`;
                    point.style.height = `${Math.max(8, value / 10)}px`;
                    
                    // Initial styles for animation
                    point.style.opacity = '0';
                    point.style.transform = 'translate(-50%, -50%) scale(0)';
                    
                    // Animate point appearance with delay
                    setTimeout(() => {
                        point.style.opacity = '1';
                        point.style.transform = 'translate(-50%, -50%) scale(1)';
                    }, 600 + index * 150);
                }
                
                // Position and animate label
                const label = skill.querySelector('.radar-label');
                if (label) {
                    label.style.left = `${radius}px`;
                    label.style.opacity = '0';
                    label.style.transform = 'translate(-50%, -50%) scale(0.8)';
                    
                    // Animate label appearance with delay
                    setTimeout(() => {
                        label.style.opacity = '1';
                        label.style.transform = 'translate(-50%, -50%) scale(1)';
                    }, 750 + index * 150);
                }
                
                // Enhanced hover effects
                skill.addEventListener('mouseenter', () => {
                    if (point) {
                        point.style.transform = 'translate(-50%, -50%) scale(1.5)';
                        point.style.backgroundColor = 'var(--accent-color)';
                        point.style.boxShadow = '0 0 15px rgba(255, 109, 0, 0.7)';
                    }
                    
                    if (label) {
                        label.style.transform = 'translate(-50%, -50%) scale(1.2)';
                        label.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
                        label.style.fontWeight = '600';
                    }
                    
                    // Add connecting line from center to point
                    if (!skillsRadar.querySelector(`.skill-line-${index}`)) {
                        const line = document.createElement('div');
                        line.className = `skill-line skill-line-${index}`;
                        line.style.position = 'absolute';
                        line.style.top = '50%';
                        line.style.left = '50%';
                        line.style.width = `${radius}px`;
                        line.style.height = '2px';
                        line.style.backgroundColor = 'var(--accent-color)';
                        line.style.opacity = '0';
                        line.style.transformOrigin = 'left center';
                        line.style.transform = `rotate(${index * (360 / radarSkills.length)}deg)`;
                        skillsRadar.appendChild(line);
                        
                        // Animate line appearance
                        setTimeout(() => {
                            line.style.opacity = '0.5';
                        }, 10);
                    }
                });
                
                skill.addEventListener('mouseleave', () => {
                    if (point) {
                        point.style.transform = 'translate(-50%, -50%) scale(1)';
                        point.style.backgroundColor = 'var(--accent-color)';
                        point.style.boxShadow = '0 0 10px rgba(255, 109, 0, 0.5)';
                    }
                    
                    if (label) {
                        label.style.transform = 'translate(-50%, -50%) scale(1)';
                        label.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                        label.style.fontWeight = '500';
                    }
                    
                    // Remove connecting line
                    const line = skillsRadar.querySelector(`.skill-line-${index}`);
                    if (line) {
                        line.style.opacity = '0';
                        setTimeout(() => {
                            line.remove();
                        }, 300);
                    }
                });
            });
        }
    }

    // Run animation on scroll and page load
    window.addEventListener('scroll', animateRadarSkills);
    window.addEventListener('load', animateRadarSkills);
}

// ======= PARTICLE BACKGROUND EFFECT =======
function initParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mousePosition = { x: null, y: null };
    const hoverRadius = 100;
    
    // Get theme colors from CSS variables
    const computedStyle = getComputedStyle(document.documentElement);
    const primaryColorRGB = computedStyle.getPropertyValue('--primary-color-rgb').trim() || '13, 71, 161';
    const accentColorRGB = computedStyle.getPropertyValue('--accent-color-rgb').trim() || '255, 109, 0';
    
    // Set canvas dimensions
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = canvas.closest('.hero') ? 
            canvas.closest('.hero').offsetHeight : 
            window.innerHeight;
            
        // Reinitialize particles
        initParticles();
    }
    
    // Create particles
    function initParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
        
        for (let i = 0; i < particleCount; i++) {
            // Randomly use primary or accent color
            const useAccentColor = Math.random() > 0.7;
            const colorRGB = useAccentColor ? accentColorRGB : primaryColorRGB;
            
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                color: `rgba(${colorRGB}, ${Math.random() * 0.5 + 0.2})`,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                originalRadius: Math.random() * 3 + 1,
                pulsating: Math.random() > 0.8, // Some particles will pulsate
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulseDirection: 1,
                connectionRadius: 150 // Distance to draw connections
            });
        }
    }
    
    // Handle mouse movement
    function handleMouseMove(event) {
        const rect = canvas.getBoundingClientRect();
        mousePosition.x = event.clientX - rect.left;
        mousePosition.y = event.clientY - rect.top;
    }
    
    function handleMouseOut() {
        mousePosition.x = null;
        mousePosition.y = null;
    }
    
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Boundary check and repositioning
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX = -particle.speedX;
            }
            
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY = -particle.speedY;
            }
            
            // Pulsating effect for some particles
            if (particle.pulsating) {
                particle.radius += particle.pulseSpeed * particle.pulseDirection;
                
                if (particle.radius > particle.originalRadius * 1.5) {
                    particle.pulseDirection = -1;
                } else if (particle.radius < particle.originalRadius * 0.7) {
                    particle.pulseDirection = 1;
                }
            }
            
            // Mouse interaction
            if (mousePosition.x !== null && mousePosition.y !== null) {
                const dx = mousePosition.x - particle.x;
                const dy = mousePosition.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < hoverRadius) {
                    // Repel particles
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (hoverRadius - distance) / hoverRadius;
                    
                    particle.x -= forceDirectionX * force * 1.5;
                    particle.y -= forceDirectionY * force * 1.5;
                    
                    // Increase size slightly
                    particle.radius = particle.originalRadius * 1.2;
                }
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Draw connections between particles
            for (let j = i + 1; j < particles.length; j++) {
                const otherParticle = particles[j];
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < particle.connectionRadius) {
                    // Calculate opacity based on distance
                    const opacity = 1 - (distance / particle.connectionRadius);
                    
                    // Draw line
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(${primaryColorRGB}, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        
        // Request next frame
        requestAnimationFrame(animate);
    }
    
    // Initialize
    resize();
    
    // Add event listeners
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseout', handleMouseOut);
    
    // Start animation
    animate();
}
// ======= MAGNETIC BUTTON EFFECTS =======
function initMagneticElements() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        // Enhanced magnetic effect with momentum
        let momentum = { x: 0, y: 0 };
        let animationId = null;

        function updatePosition() {
            // Apply momentum with friction
            momentum.x *= 0.9;
            momentum.y *= 0.9;

            // Apply transform only if movement is significant
            if (Math.abs(momentum.x) > 0.01 || Math.abs(momentum.y) > 0.01) {
                btn.style.transform = `translate(${momentum.x}px, ${momentum.y}px)`;
                animationId = requestAnimationFrame(updatePosition);
            } else {
                btn.style.transform = '';
                animationId = null;
            }
        }

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Scale the movement (adjust the divisor to control sensitivity)
            const moveX = x / 8;
            const moveY = y / 8;

            // Update momentum
            momentum.x = moveX;
            momentum.y = moveY;

            // Start animation if not already running
            if (!animationId) {
                animationId = requestAnimationFrame(updatePosition);
            }

            // Add subtle rotation effect
            btn.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`;

            // Add hover state shadow
            btn.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });

        btn.addEventListener('mouseleave', () => {
            // Start return animation with current momentum
            if (!animationId) {
                animationId = requestAnimationFrame(updatePosition);
            }

            // Reset shadow
            btn.style.boxShadow = '';
        });

        // Add click effect
        btn.addEventListener('mousedown', () => {
            btn.style.transform = `translate(${momentum.x * 0.7}px, ${momentum.y * 0.7}px) scale(0.95)`;
        });

        btn.addEventListener('mouseup', () => {
            btn.style.transform = `translate(${momentum.x}px, ${momentum.y}px) scale(1)`;
        });
    });
}

// ======= 3D TILT CARD EFFECTS =======
function initTiltCards() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        // Enhanced 3D tilt with momentum
        let momentum = { x: 0, y: 0, tiltX: 0, tiltY: 0 };
        let animationId = null;
        let isHovering = false;

        function updateCardTilt() {
            if (!isHovering) {
                // Apply friction to slow down movement when not hovering
                momentum.tiltX *= 0.9;
                momentum.tiltY *= 0.9;

                // Return to flat position when movement is minimal
                if (Math.abs(momentum.tiltX) < 0.2 && Math.abs(momentum.tiltY) < 0.2) {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';

                    const cardInfo = card.querySelector('.project-info, .card-content');
                    if (cardInfo) {
                        cardInfo.style.transform = 'translateZ(0)';
                    }

                    cancelAnimationFrame(animationId);
                    animationId = null;
                    return;
                }
            }

            // Apply transform based on current tilt values
            card.style.transform = `perspective(1000px) rotateX(${momentum.tiltX}deg) rotateY(${momentum.tiltY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Move the content for parallax effect
            const cardInfo = card.querySelector('.project-info, .card-content');
            if (cardInfo) {
                cardInfo.style.transform = `translateZ(20px) rotateX(${-momentum.tiltX * 0.3}deg) rotateY(${-momentum.tiltY * 0.3}deg)`;
            }

            animationId = requestAnimationFrame(updateCardTilt);
        }

        card.addEventListener('mouseenter', () => {
            isHovering = true;

            // Add shadow and highlight effect
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';

            // Add subtle border highlight
            card.style.border = '1px solid rgba(var(--primary-color-rgb), 0.3)';

            // Start animation if not already running
            if (!animationId) {
                animationId = requestAnimationFrame(updateCardTilt);
            }
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation angles with dampening
            momentum.tiltX = ((y - rect.height / 2) / rect.height) * 10;
            momentum.tiltY = ((x - rect.width / 2) / rect.width) * -10;
        });

        card.addEventListener('mouseleave', () => {
            isHovering = false;

            // Reset shadow and border
            card.style.boxShadow = '';
            card.style.border = '';

            // Animation will naturally return to flat in updateCardTilt
        });
    });
}

// ======= PROJECT FILTER =======
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project');

    if (!filterBtns.length || !projectItems.length) return;

    // Add counter badges to filter buttons
    filterBtns.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        let count = 0;

        if (filter === 'all') {
            count = projectItems.length;
        } else {
            projectItems.forEach(project => {
                if (project.classList.contains(filter)) {
                    count++;
                }
            });
        }

        // Create and append badge
        const badge = document.createElement('span');
        badge.className = 'filter-badge';
        badge.textContent = count;
        btn.appendChild(badge);
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // If already active, do nothing
            if (btn.classList.contains('active')) return;

            // Remove active class from all buttons with animation
            filterBtns.forEach(btn => {
                if (btn.classList.contains('active')) {
                    btn.classList.add('deactivating');
                    setTimeout(() => {
                        btn.classList.remove('active', 'deactivating');
                    }, 300);
                } else {
                    btn.classList.remove('active');
                }
            });

            // Add active class to clicked button with animation
            btn.classList.add('activating');
            setTimeout(() => {
                btn.classList.add('active');
                btn.classList.remove('activating');
            }, 300);

            // Get filter value
            const filter = btn.getAttribute('data-filter');

            // Track visible projects count
            let visibleCount = 0;

            // Filter projects with enhanced transitions
            projectItems.forEach(project => {
                project.style.transition = 'opacity 0.4s ease, transform 0.4s ease, height 0.4s ease';

                if (filter === 'all' || project.classList.contains(filter)) {
                    // Show this project
                    visibleCount++;

                    if (project.classList.contains('hidden-project')) {
                        // If previously hidden, animate in
                        project.style.opacity = '0';
                        project.style.transform = 'scale(0.8)';
                        project.style.display = 'block';

                        // Force reflow
                        void project.offsetWidth;

                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                        project.classList.remove('hidden-project');

                        setTimeout(() => {
                            project.style.pointerEvents = 'auto';
                        }, 400);
                    }
                } else {
                    // Hide this project
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';
                    project.style.pointerEvents = 'none';
                    project.classList.add('hidden-project');

                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 400);
                }
            });

            // Adjust container height if needed for a smooth height transition
            const projectsGrid = document.querySelector('.projects-grid');
            if (projectsGrid) {
                // Calculate appropriate height based on visible items and layout
                const columns = window.innerWidth > 992 ? 3 : window.innerWidth > 576 ? 2 : 1;
                const rows = Math.ceil(visibleCount / columns);

                // Use auto height for smooth transition
                projectsGrid.style.transition = 'height 0.5s ease';
                projectsGrid.style.height = 'auto';
            }
        });
    });
}

// ======= PROJECT MODAL =======
function initProjectModal() {
    const projectItems = document.querySelectorAll('.project');
    const projectModalContainer = document.querySelector('.project-modal-container');
    const projectModal = document.querySelector('.project-modal');
    const modalClose = document.querySelector('.modal-close');

    if (!projectModalContainer || !projectItems.length) return;

    // Open modal when clicking on project with enhanced animations
    projectItems.forEach(project => {
        project.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            const tags = Array.from(this.querySelectorAll('.project-tags span')).map(tag => tag.textContent);

            // Set modal content
            projectModal.querySelector('.modal-title').textContent = title;
            projectModal.querySelector('.modal-description').textContent = description;

            // Set tags with animated appearance
            const tagsHTML = tags.map(tag => `<span>${tag}</span>`).join('');
            const tagsContainer = projectModal.querySelector('.modal-tags');
            tagsContainer.innerHTML = tagsHTML;

            // Animate tags appearance
            setTimeout(() => {
                Array.from(tagsContainer.children).forEach((tag, index) => {
                    tag.style.opacity = '0';
                    tag.style.transform = 'translateY(10px)';

                    setTimeout(() => {
                        tag.style.transition = 'all 0.3s ease';
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 300);

            // Add additional details with enhanced presentation
            projectModal.querySelector('.modal-details').innerHTML = `
            <div class="modal-detail-item">
                <h4>Objective</h4>
                <p>The primary goal of ${title} was to address key challenges in the specified domain through innovative approaches and collaborative efforts.</p>
            </div>
            <div class="modal-detail-item">
                <h4>Impact</h4>
                <p>This initiative has directly benefited over 200 individuals and contributed to sustainable development goals through its implementation and outcomes.</p>
            </div>
            <div class="modal-detail-item">
                <h4>Methodology</h4>
                <p>The project employed a multi-disciplinary approach combining research, stakeholder engagement, and iterative development to achieve optimal results.</p>
            </div>
            `;

            // Show modal with enhanced entrance animation
            document.body.classList.add('modal-open');
            projectModalContainer.classList.add('prepare-show');

            // Create snapshot of project card position for transition
            const projectRect = project.getBoundingClientRect();
            const initialPosition = {
                top: projectRect.top,
                left: projectRect.left,
                width: projectRect.width,
                height: projectRect.height
            };

            // Position the modal at the same place as the clicked project
            projectModal.style.position = 'fixed';
            projectModal.style.top = `${initialPosition.top}px`;
            projectModal.style.left = `${initialPosition.left}px`;
            projectModal.style.width = `${initialPosition.width}px`;
            projectModal.style.height = `${initialPosition.height}px`;
            projectModal.style.opacity = '0';
            projectModal.style.overflow = 'hidden';

            // Show container
            projectModalContainer.classList.add('show');

            // Animate modal to center position
            setTimeout(() => {
                projectModal.style.transition = 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
                projectModal.style.top = '50%';
                projectModal.style.left = '50%';
                projectModal.style.width = '90%';
                projectModal.style.maxWidth = '800px';
                projectModal.style.height = 'auto';
                projectModal.style.maxHeight = '90vh';
                projectModal.style.transform = 'translate(-50%, -50%)';
                projectModal.style.opacity = '1';
                projectModal.style.overflow = 'auto';
            }, 50);
        });
    });

    // Close modal functions with improved animations
    function closeModal() {
        projectModal.style.transform = 'translate(-50%, -50%) scale(0.9)';
        projectModal.style.opacity = '0';

        setTimeout(() => {
            projectModalContainer.classList.remove('show');
            document.body.classList.remove('modal-open');

            // Reset modal styles
            setTimeout(() => {
                projectModal.style = '';
                projectModalContainer.classList.remove('prepare-show');
            }, 300);
        }, 300);
    }

    // Close modal when clicking the close button
    if (modalClose) {
        modalClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    // Close modal when clicking outside
    if (projectModalContainer) {
        projectModalContainer.addEventListener('click', (e) => {
            if (e.target === projectModalContainer) {
                closeModal();
            }
        });
    }

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModalContainer.classList.contains('show')) {
            closeModal();
        }
    });
}

// ======= PROJECT SHOWCASE =======
function initProjectShowcase() {
    const showcaseContainer = document.querySelector('.project-showcase-container');
    const projectCards = document.querySelectorAll('.project-showcase .project-card');
    const prevBtn = document.querySelector('.showcase-arrow.prev');
    const nextBtn = document.querySelector('.showcase-arrow.next');
    const indicatorsContainer = document.querySelector('.showcase-indicators');
    
    if (!showcaseContainer || !projectCards.length) return;
    
    // State variables
    let currentIndex = 0;
    let isAnimating = false;
    const totalProjects = projectCards.length;
    
    // Create indicators
    for (let i = 0; i < totalProjects; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.setAttribute('data-index', i);
        indicatorsContainer.appendChild(indicator);
        
        // Add click event to indicators
        indicator.addEventListener('click', () => {
            if (isAnimating || i === currentIndex) return;
            goToProject(i);
        });
    }
    
    // Set initial positions
    function setupProjects() {
        projectCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === getPrevIndex()) {
                card.classList.add('prev');
            } else if (index === getNextIndex()) {
                card.classList.add('next');
            }
            
            // Setup flip buttons
            const flipBtns = card.querySelectorAll('.flip-btn');
            flipBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    card.classList.toggle('flipped');
                });
            });
            
            // Setup close button
            const closeBtn = card.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    card.classList.remove('flipped');
                });
            }
        });
    }
    
    // Helper functions
    function getPrevIndex() {
        return (currentIndex - 1 + totalProjects) % totalProjects;
    }
    
    function getNextIndex() {
        return (currentIndex + 1) % totalProjects;
    }
    
    // Update indicators
    function updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Navigation functions
    function goToProject(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Reset flip state
        projectCards.forEach(card => {
            card.classList.remove('flipped');
        });
        
        // Remove all position classes
        projectCards.forEach(card => {
            card.classList.remove('active', 'prev', 'next');
        });
        
        // Apply new position classes
        projectCards[index].classList.add('active');
        projectCards[(index - 1 + totalProjects) % totalProjects].classList.add('prev');
        projectCards[(index + 1) % totalProjects].classList.add('next');
        
        // Update current index
        currentIndex = index;
        
        // Update indicators
        updateIndicators();
        
        // Re-enable after animation completes
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    function goToPrev() {
        goToProject(getPrevIndex());
    }
    
    function goToNext() {
        goToProject(getNextIndex());
    }
    
    // Add navigation events
    if (prevBtn) prevBtn.addEventListener('click', goToPrev);
    if (nextBtn) nextBtn.addEventListener('click', goToNext);
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Only respond to keyboard navigation when showcase is in viewport
        const rect = showcaseContainer.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isInViewport) return;
        
        if (e.key === 'ArrowLeft') {
            goToPrev();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    });
    
    // Add touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    showcaseContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    showcaseContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left -> next project
            goToNext();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right -> previous project
            goToPrev();
        }
    }
    
    // Add card hover effects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('active')) return;
            
            const cardImage = card.querySelector('.card-image img');
            if (cardImage) {
                cardImage.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const cardImage = card.querySelector('.card-image img');
            if (cardImage) {
                cardImage.style.transform = '';
            }
        });
    });
    
    // Auto-rotation (optional)
    let autoRotateInterval;
    
    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            goToNext();
        }, 6000);
    }
    
    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }
    
    // Pause auto-rotation on hover
    showcaseContainer.addEventListener('mouseenter', stopAutoRotate);
    showcaseContainer.addEventListener('mouseleave', startAutoRotate);
    
    // Initial setup
    setupProjects();
    startAutoRotate();
}
// ======= TIMELINE INTERACTION =======
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineDots = document.querySelectorAll('.timeline-dot');

    if (!timelineItems.length) return;

    // Set custom animation order
    timelineItems.forEach((item, index) => {
        item.style.setProperty('--animation-order', index + 1);
    });

    // Add enhanced focus effect when timeline items enter viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                // Highlight the current timeline item
                item.classList.add('timeline-active');
                
                // Find and highlight its dot
                const dot = item.querySelector('.timeline-dot');
                if (dot) {
                    // Remove active state from all dots first
                    timelineDots.forEach(d => d.classList.remove('dot-active'));
                    // Add active state to current dot
                    dot.classList.add('dot-active');
                    
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    ripple.className = 'dot-ripple';
                    dot.appendChild(ripple);
                    
                    // Remove ripple after animation completes
                    setTimeout(() => {
                        if (ripple.parentNode === dot) {
                            ripple.remove();
                        }
                    }, 1000);
                }
            } else {
                // Remove highlight when item leaves viewport
                entry.target.classList.remove('timeline-active');
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-10% 0px -50% 0px'
    });
    
    // Observe all timeline items
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Add connection lines between active items
    function updateConnectionLines() {
        const activeItems = document.querySelectorAll('.timeline-item.timeline-active');
        
        // Remove existing connection lines
        document.querySelectorAll('.timeline-connector').forEach(c => c.remove());
        
        // Connect active items
        if (activeItems.length > 1) {
            for (let i = 0; i < activeItems.length - 1; i++) {
                const currentDot = activeItems[i].querySelector('.timeline-dot');
                const nextDot = activeItems[i + 1].querySelector('.timeline-dot');
                
                if (currentDot && nextDot) {
                    const connector = document.createElement('div');
                    connector.className = 'timeline-connector';
                    
                    // Position connector between dots
                    const currentRect = currentDot.getBoundingClientRect();
                    const nextRect = nextDot.getBoundingClientRect();
                    
                    // Calculate positions and dimensions
                    const startX = currentRect.left + currentRect.width / 2;
                    const startY = currentRect.top + currentRect.height / 2;
                    const endX = nextRect.left + nextRect.width / 2;
                    const endY = nextRect.top + nextRect.height / 2;
                    
                    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
                    
                    // Style the connector
                    connector.style.width = `${length}px`;
                    connector.style.transformOrigin = 'left center';
                    connector.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}deg)`;
                    
                    document.body.appendChild(connector);
                    
                    // Animate connector appearance
                    setTimeout(() => {
                        connector.style.opacity = '1';
                    }, 100);
                }
            }
        }
    }
    
    // Update connection lines on scroll
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateConnectionLines);
    });

    // Enhanced timeline dot hover effects
    timelineDots.forEach(dot => {
        dot.addEventListener('mouseenter', () => {
            dot.style.transform = 'scale(1.5)';
            dot.style.backgroundColor = 'var(--accent-color)';
            dot.style.boxShadow = '0 0 0 5px rgba(255, 109, 0, 0.2), 0 0 20px rgba(255, 109, 0, 0.4)';
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'dot-ripple';
            dot.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode === dot) {
                    ripple.remove();
                }
            }, 1000);
            
            // Add animation to timeline card
            const timelineCard = dot.closest('.timeline-item').querySelector('.timeline-card');
            if (timelineCard) {
                timelineCard.style.transform = 'translateY(-8px)';
                timelineCard.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            }
        });
        
        dot.addEventListener('mouseleave', () => {
            dot.style.transform = '';
            dot.style.backgroundColor = '';
            dot.style.boxShadow = '';
            
            // Reset timeline card
            const timelineCard = dot.closest('.timeline-item').querySelector('.timeline-card');
            if (timelineCard) {
                timelineCard.style.transform = '';
                timelineCard.style.boxShadow = '';
            }
        });
    });
}

// ======= MOBILE TIMELINE =======
function initMobileTimeline() {
    const horizontalTimeline = document.querySelector('.horizontal-timeline');
    const timelineEvents = document.querySelectorAll('.horizontal-event');
    
    if (!horizontalTimeline || !timelineEvents.length) return;
    
    // Show horizontal timeline on mobile with entrance animation
    if (window.innerWidth <= 768) {
        horizontalTimeline.style.display = 'block';
        
        // Animate timeline appearance when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !horizontalTimeline.classList.contains('animated')) {
                    horizontalTimeline.classList.add('animated');
                    
                    // Animate progress line
                    const progressLine = horizontalTimeline.querySelector('.horizontal-timeline-progress');
                    if (progressLine) {
                        progressLine.style.width = '0';
                        progressLine.style.transition = 'width 1s ease-in-out';
                        
                        setTimeout(() => {
                            progressLine.style.width = '100%';
                        }, 300);
                    }
                    
                    // Animate events with staggered delay
                    timelineEvents.forEach((event, index) => {
                        const dot = event.querySelector('.event-dot');
                        const content = event.querySelector('.event-content');
                        const date = event.querySelector('.event-date');
                        
                        if (dot) {
                            dot.style.opacity = '0';
                            dot.style.transform = 'translate(-50%, -50%) scale(0)';
                            
                            setTimeout(() => {
                                dot.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                                dot.style.opacity = '1';
                                dot.style.transform = 'translate(-50%, -50%) scale(1)';
                            }, 600 + index * 150);
                        }
                        
                        if (content) {
                            content.style.opacity = '0';
                            content.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                content.style.transition = 'all 0.5s ease';
                                content.style.opacity = '1';
                                content.style.transform = 'translateY(0)';
                            }, 900 + index * 150);
                        }
                        
                        if (date) {
                            date.style.opacity = '0';
                            date.style.transform = 'translateY(-10px)';
                            
                            setTimeout(() => {
                                date.style.transition = 'all 0.5s ease';
                                date.style.opacity = '1';
                                date.style.transform = 'translateY(0)';
                            }, 750 + index * 150);
                        }
                    });
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(horizontalTimeline);
    }
    
    // Enhanced timeline event hover effects
    timelineEvents.forEach(event => {
        event.addEventListener('mouseenter', () => {
            const dot = event.querySelector('.event-dot');
            if (dot) {
                dot.style.transform = 'translate(-50%, -50%) scale(1.3)';
                dot.style.backgroundColor = 'var(--primary-color)';
                dot.style.boxShadow = '0 0 0 5px rgba(13, 71, 161, 0.3)';
            }
            
            // Add glow effect to content
            const content = event.querySelector('.event-content');
            if (content) {
                content.style.boxShadow = '0 10px 30px rgba(13, 71, 161, 0.15)';
                content.style.borderColor = 'rgba(13, 71, 161, 0.3)';
                content.style.transform = 'translateY(-8px)';
            }
            
            // Highlight date
            const date = event.querySelector('.event-date');
            if (date) {
                date.style.color = 'var(--primary-color)';
                date.style.fontWeight = '700';
            }
            
            // Highlight adjacent events slightly
            const index = Array.from(timelineEvents).indexOf(event);
            if (index > 0) {
                const prevDot = timelineEvents[index-1].querySelector('.event-dot');
                if (prevDot) {
                    prevDot.style.transform = 'translate(-50%, -50%) scale(1.1)';
                    prevDot.style.backgroundColor = 'rgba(13, 71, 161, 0.5)';
                }
            }
            
            if (index < timelineEvents.length - 1) {
                const nextDot = timelineEvents[index+1].querySelector('.event-dot');
                if (nextDot) {
                    nextDot.style.transform = 'translate(-50%, -50%) scale(1.1)';
                    nextDot.style.backgroundColor = 'rgba(13, 71, 161, 0.5)';
                }
            }
        });
        
        event.addEventListener('mouseleave', () => {
            const dot = event.querySelector('.event-dot');
            if (dot) {
                dot.style.transform = 'translate(-50%, -50%) scale(1)';
                dot.style.backgroundColor = 'white';
                dot.style.boxShadow = 'none';
            }
            
            // Reset content styles
            const content = event.querySelector('.event-content');
            if (content) {
                content.style.boxShadow = '';
                content.style.borderColor = '';
                content.style.transform = '';
            }
            
            // Reset date
            const date = event.querySelector('.event-date');
            if (date) {
                date.style.color = '';
                date.style.fontWeight = '';
            }
            
            // Reset adjacent events
            const index = Array.from(timelineEvents).indexOf(event);
            if (index > 0) {
                const prevDot = timelineEvents[index-1].querySelector('.event-dot');
                if (prevDot) {
                    prevDot.style.transform = 'translate(-50%, -50%) scale(1)';
                    prevDot.style.backgroundColor = 'white';
                }
            }
            
            if (index < timelineEvents.length - 1) {
                const nextDot = timelineEvents[index+1].querySelector('.event-dot');
                if (nextDot) {
                    nextDot.style.transform = 'translate(-50%, -50%) scale(1)';
                    nextDot.style.backgroundColor = 'white';
                }
            }
        });
    });
    
    // Scroll functionality for horizontal timeline on mobile
    if (horizontalTimeline) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        horizontalTimeline.addEventListener('mousedown', (e) => {
            isDown = true;
            horizontalTimeline.style.cursor = 'grabbing';
            startX = e.pageX - horizontalTimeline.offsetLeft;
            scrollLeft = horizontalTimeline.scrollLeft;
        });
        
        horizontalTimeline.addEventListener('mouseleave', () => {
            isDown = false;
            horizontalTimeline.style.cursor = 'grab';
        });
        
        horizontalTimeline.addEventListener('mouseup', () => {
            isDown = false;
            horizontalTimeline.style.cursor = 'grab';
        });
        
        horizontalTimeline.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - horizontalTimeline.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            horizontalTimeline.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Responsive updates on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            horizontalTimeline.style.display = 'block';
            
            // Reset animation state if going from desktop to mobile
            if (!horizontalTimeline.classList.contains('animated')) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            horizontalTimeline.classList.add('animated');
                        }
                    });
                }, { threshold: 0.3 });
                
                observer.observe(horizontalTimeline);
            }
        } else {
            horizontalTimeline.style.display = 'none';
        }
    });
}

// ======= FORM INTERACTIONS =======
function initFormInteractions() {
    const contactForm = document.getElementById('contact-form');
    const formInputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
    
    if (!contactForm || !formInputs.length) return;
    
    // Add character counter for message field
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'char-counter';
        counterDiv.innerHTML = '<span class="current">0</span>/<span class="maximum">1000</span>';
        messageTextarea.parentNode.appendChild(counterDiv);
        
        // Update counter on input
        messageTextarea.addEventListener('input', function() {
            const current = this.value.length;
            const counter = this.parentNode.querySelector('.char-counter');
            const currentSpan = counter.querySelector('.current');
            
            currentSpan.textContent = current;
            
            // Visual feedback
            if (current > 800) {
                counter.className = 'char-counter warning';
            } else if (current > 950) {
                counter.className = 'char-counter danger';
            } else {
                counter.className = 'char-counter';
            }
        });
    }
    
    // Add floating labels effect with character animations
    formInputs.forEach(input => {
        const label = input.parentNode.querySelector('label');
        if (label) {
            // Split label text into individual spans for animation
            const labelText = label.textContent.trim();
            let letterHtml = '';
            
            for (let i = 0; i < labelText.length; i++) {
                letterHtml += `<span class="label-letter" style="transition-delay: ${i * 30}ms;">${labelText[i]}</span>`;
            }
            
            label.innerHTML = letterHtml;
        }
        
        // Set initial state for inputs with values (like browser autofill)
        if (input.value.trim() !== '') {
            input.parentNode.classList.add('has-value');
        }
        
        // Focus effects
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
            
            // Animate letters in label
            const letters = this.parentNode.querySelectorAll('.label-letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.classList.add('focused-letter');
                }, index * 30);
            });
            
            // Add ripple effect to focus border
            const focusBorder = this.parentNode.querySelector('.input-focus-border');
            if (focusBorder) {
                focusBorder.classList.add('ripple');
            }
        });
        
        // Blur effects and validation
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
            
            // Reset letter animations
            const letters = this.parentNode.querySelectorAll('.label-letter');
            letters.forEach(letter => {
                letter.classList.remove('focused-letter');
            });
            
            // Remove ripple effect
            const focusBorder = this.parentNode.querySelector('.input-focus-border');
            if (focusBorder) {
                focusBorder.classList.remove('ripple');
            }
            
            // Check if input has value for "filled" styling
            if (this.value.trim() !== '') {
                this.parentNode.classList.add('has-value');
            } else {
                this.parentNode.classList.remove('has-value');
            }
            
            // Validate on blur
            validateInput(this);
        });
        
        // Real-time validation with visual feedback
        input.addEventListener('input', function() {
            // Check if input has value for styling
            if (this.value.trim() !== '') {
                this.parentNode.classList.add('has-value');
            } else {
                this.parentNode.classList.remove('has-value');
            }
            
            // Validate after short delay for better UX
            clearTimeout(this.validateTimeout);
            this.validateTimeout = setTimeout(() => {
                validateInput(this, true); // true = is typing
            }, 300);
        });
    });
    
    // Enhanced validation with specific feedback
    function validateInput(input, isTyping = false) {
        const wrapper = input.parentNode;
        let isValid = true;
        
        // Don't show errors immediately while user is typing
        if (isTyping && input.value.trim() === '') {
            // Remove any existing error messages
            const existingError = wrapper.querySelector('.error-message');
            if (existingError) {
                wrapper.removeChild(existingError);
            }
            
            // Don't mark empty as invalid while typing
            wrapper.classList.remove('valid', 'invalid');
            return true;
        }
        
        // Remove any existing error messages
        const existingError = wrapper.querySelector('.error-message');
        if (existingError) {
            existingError.classList.add('fade-out');
            setTimeout(() => {
                if (existingError.parentNode === wrapper) {
                    wrapper.removeChild(existingError);
                }
            }, 300);
        }
        
        // Enhanced validation with specific feedback
        if (input.value.trim() === '') {
            addErrorMessage(wrapper, 'This field is required');
            isValid = false;
        } else if (input.type === 'email') {
            if (!isValidEmail(input.value)) {
                addErrorMessage(wrapper, 'Please enter a valid email address');
                isValid = false;
            } else if (!input.value.includes('.')) {
                addErrorMessage(wrapper, 'Email must include a domain (e.g. .com)');
                isValid = false;
            }
        } else if (input.id === 'name') {
            if (input.value.trim().length < 2) {
                addErrorMessage(wrapper, 'Name must be at least 2 characters');
                isValid = false;
            } else if (/\d/.test(input.value)) {
                addErrorMessage(wrapper, 'Name should not contain numbers');
                isValid = false;
            }
        } else if (input.id === 'message') {
            if (input.value.trim().length < 10) {
                addErrorMessage(wrapper, 'Message must be at least 10 characters');
                isValid = false;
            } else if (input.value.trim().length > 1000) {
                addErrorMessage(wrapper, 'Message is too long (max 1000 characters)');
                isValid = false;
            }
        }
        
        // Update UI based on validation with transition
        if (isValid) {
            wrapper.classList.remove('invalid');
            
            // Don't immediately mark as valid while typing
            if (!isTyping || input.value.trim().length > 3) {
                wrapper.classList.add('valid');
                
                // Add checkmark indicator for valid state
                if (!wrapper.querySelector('.valid-indicator')) {
                    const validIndicator = document.createElement('span');
                    validIndicator.className = 'valid-indicator';
                    validIndicator.innerHTML = '<i class="fas fa-check"></i>';
                    wrapper.appendChild(validIndicator);
                    
                    // Animate entrance
                    setTimeout(() => {
                        validIndicator.style.opacity = '1';
                        validIndicator.style.transform = 'translateY(-50%) scale(1)';
                    }, 10);
                }
            }
        } else {
            wrapper.classList.remove('valid');
            wrapper.classList.add('invalid');
            
            // Add shake animation to invalid fields
            if (!isTyping) {
                wrapper.classList.add('shake');
                setTimeout(() => {
                    wrapper.classList.remove('shake');
                }, 600);
            }
            
            // Remove valid indicator if present
            const validIndicator = wrapper.querySelector('.valid-indicator');
            if (validIndicator) {
                validIndicator.style.opacity = '0';
                validIndicator.style.transform = 'translateY(-50%) scale(0.8)';
                
                setTimeout(() => {
                    if (validIndicator.parentNode === wrapper) {
                        wrapper.removeChild(validIndicator);
                    }
                }, 300);
            }
        }
        
        return isValid;
    }
    
    // Helper function to add error message with animation
    function addErrorMessage(wrapper, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <span class="error-icon"><i class="fas fa-exclamation-circle"></i></span>
            <span class="error-text">${message}</span>
        `;
        
        // Set initial state for animation
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translateY(-10px)';
        
        wrapper.appendChild(errorDiv);
        
        // Trigger animation
        setTimeout(() => {
            errorDiv.style.opacity = '1';
            errorDiv.style.transform = 'translateY(0)';
        }, 10);
    }
    
    // Improved email validation with common typo detection
    function isValidEmail(email) {
        // Basic format check
        const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!basicRegex.test(email)) return false;
        
        // Common domain typo check
        const commonTypos = {
            'gmial': 'gmail',
            'gmil': 'gmail',
            'gmal': 'gmail',
            'gamil': 'gmail',
            'yaho': 'yahoo',
            'ymail': 'yahoo',
            'hotmial': 'hotmail',
            'hotmal': 'hotmail',
            'outloo': 'outlook',
            'outlok': 'outlook'
        };
        
        // Check for common domain typos
        const domain = email.split('@')[1].split('.')[0].toLowerCase();
        if (commonTypos[domain]) {
            return false;
        }
        
        return true;
    }
    
    // Enhanced form submission with visual feedback
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Add form submitting state
            this.classList.add('submitting');
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading-spinner"></span> <span class="sending-text">Sending</span>';
            submitBtn.disabled = true;
            
            // Animate the sending text with dots
            const sendingText = submitBtn.querySelector('.sending-text');
            let dotCount = 0;
            const dotInterval = setInterval(() => {
                dotCount = (dotCount + 1) % 4;
                let dots = '';
                for (let i = 0; i < dotCount; i++) {
                    dots += '.';
                }
                sendingText.textContent = 'Sending' + dots;
            }, 300);
            
            // Simulate form submission (replace with actual AJAX)
            setTimeout(() => {
                // Clear animation interval
                clearInterval(dotInterval);
                
                // Show success state in button
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.classList.add('success');
                
                // Reset form after delay
                setTimeout(() => {
                    // Reset form
                    this.reset();
                    this.classList.remove('submitting');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                    
                    // Reset input states
                    formInputs.forEach(input => {
                        input.parentNode.classList.remove('valid', 'invalid', 'has-value');
                        // Remove any remaining error messages or indicators
                        const error = input.parentNode.querySelector('.error-message');
                        if (error) error.remove();
                        const indicator = input.parentNode.querySelector('.valid-indicator');
                        if (indicator) indicator.remove();
                    });
                    
                    // Show success message
                    alert('Thank you for your message! I will get back to you soon.');
                }, 2000);
            }, 2000);
        }
    });
}

// ======= UTILITY FUNCTIONS =======

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Function to debounce events (prevents excessive function calls)
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Function to throttle events (limits rate of function calls)
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Function to preload images for smoother transitions
function preloadImages(images) {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Add event listeners only after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document fully loaded and parsed');
});

// Handle page visibility changes (pause animations when tab not visible)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause intensive animations
        console.log('Page visibility: hidden');
    } else {
        // Page is visible again, resume animations
        console.log('Page visibility: visible');
    }
});