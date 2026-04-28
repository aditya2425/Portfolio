// ============================================
// PORTFOLIO - Aditya | Generative AI Engineer
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // === Cursor Glow Effect ===
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
            });
        });
    }

    // === Navbar Scroll Effect ===
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // === Mobile Nav Toggle ===
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile nav on link click
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // === Active Nav Link on Scroll ===
    const sections = document.querySelectorAll('section[id]');
    const navLinkElements = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinkElements.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = '#a855f7';
                    } else {
                        link.style.color = '';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // === Counter Animation ===
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(start + (target - start) * easeOut);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        });
    }

    // Trigger counter animation when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroObserver.observe(heroStats);

    // === Scroll Reveal Animation ===
    const revealElements = document.querySelectorAll(
        '.project-card, .skill-category, .cert-card, .timeline-item, ' +
        '.achievement-card, .contact-card, .about-text, .about-terminal, ' +
        '.highlight, .section-header'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                const delay = index * 50;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // === Project Filters ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // === Smooth Scroll for anchor links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // === Terminal Typing Effect ===
    const terminalOutput = document.querySelector('.terminal-output');
    if (terminalOutput) {
        const text = terminalOutput.textContent;
        terminalOutput.textContent = '';
        let i = 0;
        let isVisible = false;

        const terminalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isVisible) {
                    isVisible = true;
                    typeWriter();
                    terminalObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        terminalObserver.observe(terminalOutput);

        function typeWriter() {
            if (i < text.length) {
                const chunkSize = Math.min(3, text.length - i);
                terminalOutput.textContent += text.substring(i, i + chunkSize);
                i += chunkSize;
                setTimeout(typeWriter, 15);
            }
        }
    }

    // === Tilt Effect on Project Cards ===
    if (window.innerWidth > 768) {
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // === Parallax Effect on Hero ===
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }

    // === Scroll Progress Bar ===
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const updateProgress = () => {
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
            scrollProgress.style.width = pct + '%';
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // === Back to Top Button ===
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        const toggleBackToTop = () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        };
        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // === Time-aware greeting ===
    const heroSalutation = document.getElementById('heroSalutation');
    const heroGreeting = document.getElementById('heroGreeting');
    if (heroSalutation || heroGreeting) {
        const hour = new Date().getHours();
        let salutation = 'Hi';
        let badge = 'Available for opportunities';
        if (hour < 5) { salutation = 'Up late'; badge = 'Burning the midnight oil'; }
        else if (hour < 12) { salutation = 'Good morning'; badge = 'Available for opportunities'; }
        else if (hour < 17) { salutation = 'Good afternoon'; badge = 'Available for opportunities'; }
        else if (hour < 21) { salutation = 'Good evening'; badge = 'Available for opportunities'; }
        else { salutation = 'Good night'; badge = 'Reach out — I\'ll see it tomorrow'; }
        if (heroSalutation) heroSalutation.textContent = salutation;
        if (heroGreeting) heroGreeting.textContent = badge;
    }

    // === Role rotator (typewriter cycling roles) ===
    const roleText = document.getElementById('roleText');
    if (roleText) {
        const roles = [
            'Generative AI / Agentic AI Engineer',
            'RAG Pipeline Architect',
            'Multi-Agent Systems Builder',
            'LLM Fine-Tuning Engineer',
            'AI Safety & MLOps Engineer'
        ];
        let roleIdx = 0;
        let charIdx = roles[0].length;
        let deleting = false;
        let lastText = roles[0];

        const typeStep = () => {
            const current = roles[roleIdx];
            if (!deleting) {
                charIdx++;
                if (charIdx > current.length) {
                    deleting = true;
                    setTimeout(typeStep, 2000); // pause at full text
                    return;
                }
            } else {
                charIdx--;
                if (charIdx <= 0) {
                    deleting = false;
                    roleIdx = (roleIdx + 1) % roles.length;
                    charIdx = 0;
                }
            }
            const next = roles[roleIdx].substring(0, charIdx);
            roleText.textContent = next;
            const delay = deleting ? 30 : 55;
            setTimeout(typeStep, delay);
        };

        // Start after initial render so the first role displays cleanly for a moment
        setTimeout(() => {
            deleting = true;
            charIdx = lastText.length;
            typeStep();
        }, 2500);
    }

    // === Magnetic hover for hero CTA buttons ===
    const heroButtons = document.querySelectorAll('.hero-cta .btn');
    if (window.innerWidth > 768) {
        heroButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const relX = e.clientX - rect.left - rect.width / 2;
                const relY = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // === Keyboard shortcut: press "/" to focus first nav link ===
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            const firstNav = document.querySelector('.nav-link');
            if (firstNav) firstNav.focus();
        }
    });
});
