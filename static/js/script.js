// Modern Portfolio JavaScript with Advanced Interactions
// Version 2.0 - Completely Redesigned

console.log('🚀 Modern Portfolio v2.0 Loading...');

// =============================================================================
// THEME MANAGEMENT
// =============================================================================

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.html = document.documentElement;
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.html.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon(this.currentTheme);
        this.bindEvents();
    }

    updateThemeIcon(theme) {
        if (!this.themeToggle) return;
        
        const icon = this.themeToggle.querySelector('i');
        
        // Add rotation animation
        this.themeToggle.style.transform = 'rotate(180deg)';
        
        setTimeout(() => {
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
            this.themeToggle.style.transform = 'rotate(0deg)';
        }, 150);
    }

    bindEvents() {
        if (!this.themeToggle) return;
        
        this.themeToggle.addEventListener('click', () => {
            const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            this.currentTheme = newTheme;
            
            this.html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
            
            // Add ripple effect
            this.createRipple(this.themeToggle);
        });
    }

    createRipple(element) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// =============================================================================
// NAVIGATION MANAGEMENT
// =============================================================================

class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.navMenu.classList.contains('active')) {
                    this.toggleMobileMenu();
                }
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll);
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        
        // Add stagger animation to menu items
        const menuItems = this.navMenu.querySelectorAll('.nav-link');
        menuItems.forEach((item, index) => {
            if (this.navMenu.classList.contains('active')) {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('slide-in');
            } else {
                item.classList.remove('slide-in');
            }
        });
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    handleScroll() {
        if (!this.navbar) return;
        
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

// =============================================================================
// PARTICLE SYSTEM (Three.js)
// =============================================================================

class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container || !window.THREE) return;
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createScene();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    createScene() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.offsetWidth / this.container.offsetHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
    }

    createParticles() {
        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;

            // Colors based on primary theme colors
            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colors[i] = 0;     // R for primary blue
                colors[i + 1] = 0.48; // G
                colors[i + 2] = 0.8;   // B
            } else if (colorChoice < 0.66) {
                colors[i] = 0.55;     // R for purple
                colors[i + 1] = 0.36; // G
                colors[i + 2] = 0.96; // B
            } else {
                colors[i] = 0.06;     // R for green
                colors[i + 1] = 0.73; // G
                colors[i + 2] = 0.51; // B
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.8
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        this.container.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / this.container.offsetWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / this.container.offsetHeight) * 2 + 1;
        });
    }

    handleResize() {
        this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.particles) {
            this.particles.rotation.x += 0.001;
            this.particles.rotation.y += 0.002;
            
            // Mouse interaction
            this.particles.rotation.x += this.mouse.y * 0.001;
            this.particles.rotation.y += this.mouse.x * 0.001;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// =============================================================================
// SKILLS INTERACTION
// =============================================================================

class SkillsManager {
    constructor() {
        this.skillCards = document.querySelectorAll('.skill-card');
        this.skillDetails = document.querySelector('.skill-detail-content');
        this.skillData = this.generateSkillData();
        this.init();
    }

    init() {
        this.bindEvents();
        this.setDefaultSkill();
    }

    generateSkillData() {
        return {
            'python': {
                name: 'Python',
                experience: '2+ years',
                proficiency: 'Advanced',
                projects: ['SecureShare Platform', 'Task Master API', 'Blood Bank Management', 'Project Management System', 'Portfolio Website'],
                features: ['Object-Oriented Programming', 'Backend Development', 'Data Structures & Algorithms', 'Web Frameworks'],
                aspects: ['Clean Syntax', 'Versatile Language', 'Strong Community', 'Rapid Development']
            },
            'django': {
                name: 'Django',
                experience: '1+ year',
                proficiency: 'Advanced',
                projects: ['SecureShare Platform', 'Blood Bank Management', 'Project Management System', 'Portfolio Website'],
                features: ['MVT Architecture', 'ORM & Database Integration', 'REST API Development', 'Authentication & Security', 'Admin Interface'],
                aspects: ['Rapid Development', 'Built-in Security', 'Scalable Architecture', 'Rich Ecosystem']
            },
            'fastapi': {
                name: 'FastAPI',
                experience: '6 months',
                proficiency: 'Intermediate',
                projects: ['Task Master API'],
                features: ['Automatic API Documentation', 'Type Hints Support', 'Async/Await Support', 'Pydantic Integration'],
                aspects: ['High Performance', 'Modern Python Features', 'Developer Experience', 'OpenAPI Standards']
            },
            'rest apis': {
                name: 'REST APIs',
                experience: '1+ year',
                proficiency: 'Advanced',
                projects: ['SecureShare Platform', 'Task Master API', 'Project Management System'],
                features: ['RESTful Design', 'HTTP Methods', 'JSON Responses', 'API Authentication'],
                aspects: ['Stateless Architecture', 'Scalable Design', 'Platform Independent', 'Easy Integration']
            },
            'orm': {
                name: 'ORM',
                experience: '1+ year',
                proficiency: 'Advanced',
                projects: ['Django Projects with Django ORM', 'FastAPI with SQLAlchemy'],
                features: ['Database Abstraction', 'Query Optimization', 'Model Relationships', 'Migration Management'],
                aspects: ['Database Agnostic', 'Reduced SQL Complexity', 'Object-Oriented Approach', 'Security Features']
            },
            'mvt architecture': {
                name: 'MVT Architecture',
                experience: '1+ year',
                proficiency: 'Advanced',
                projects: ['All Django Projects'],
                features: ['Model-View-Template Pattern', 'Separation of Concerns', 'Django Framework', 'Clean Code Structure'],
                aspects: ['Maintainable Code', 'Clear Structure', 'Django Best Practices', 'Scalable Design']
            },
            'mysql': {
                name: 'MySQL',
                experience: '1+ year',
                proficiency: 'Intermediate',
                projects: ['Blood Bank Management System'],
                features: ['Relational Database', 'SQL Queries', 'Database Design', 'Performance Tuning'],
                aspects: ['Data Integrity', 'ACID Properties', 'Widely Adopted', 'Enterprise Ready']
            },
            'html/css': {
                name: 'HTML/CSS',
                experience: '2+ years',
                proficiency: 'Advanced',
                projects: ['All Web Projects', 'Responsive Portfolio Design'],
                features: ['Semantic HTML', 'CSS Grid & Flexbox', 'Responsive Design', 'Modern CSS Features'],
                aspects: ['Web Standards', 'User Experience', 'Cross-browser Compatibility', 'Accessibility']
            },
            'javascript': {
                name: 'JavaScript',
                experience: '1+ year',
                proficiency: 'Intermediate',
                projects: ['Interactive Portfolio', 'Dynamic Web Applications', 'Project Management System'],
                features: ['ES6+ Features', 'DOM Manipulation', 'Async Programming', 'Event Handling'],
                aspects: ['Frontend Interactivity', 'Real-time Updates', 'User Experience', 'Modern Tooling']
            },
            'git': {
                name: 'Git',
                experience: '2+ years',
                proficiency: 'Advanced',
                projects: ['All Projects - Version Control'],
                features: ['Version Control', 'Branching & Merging', 'Collaboration', 'Code History'],
                aspects: ['Code Management', 'Team Collaboration', 'Project Tracking', 'Industry Standard']
            },
            'github': {
                name: 'GitHub',
                experience: '2+ years',
                proficiency: 'Advanced',
                projects: ['All Projects - Code Hosting & Collaboration'],
                features: ['Code Hosting', 'Issue Tracking', 'Pull Requests', 'CI/CD Integration'],
                aspects: ['Open Source Contribution', 'Portfolio Showcase', 'Collaboration Platform', 'Industry Standard']
            },
            'linux': {
                name: 'Linux',
                experience: '1+ year',
                proficiency: 'Intermediate',
                projects: ['Server Administration', 'Development Environment'],
                features: ['Command Line Interface', 'System Administration', 'Server Management', 'Shell Scripting'],
                aspects: ['Open Source', 'Server Environment', 'Developer Tools', 'System Control']
            },
            'database integration': {
                name: 'Database Integration',
                experience: '1+ year',
                proficiency: 'Advanced',
                projects: ['SecureShare with PostgreSQL', 'Blood Bank with MySQL', 'SQLite Projects'],
                features: ['Multiple Database Types', 'ORM Integration', 'Query Optimization', 'Data Migration'],
                aspects: ['Data Persistence', 'Scalable Storage', 'Performance Optimization', 'Data Security']
            },
            'full stack development': {
                name: 'Full Stack Development',
                experience: '1+ year',
                proficiency: 'Advanced',
                projects: ['All Web Applications'],
                features: ['Frontend & Backend', 'Database Design', 'API Development', 'Complete Solutions'],
                aspects: ['End-to-End Development', 'Versatile Skills', 'Problem Solving', 'Complete Ownership']
            },
            'web applications': {
                name: 'Web Applications',
                experience: '1+ year',
                proficiency: 'Advanced',
                projects: ['SecureShare', 'Blood Bank Management', 'Project Management System'],
                features: ['Responsive Design', 'User Authentication', 'Real-time Features', 'Security Implementation'],
                aspects: ['User-Centered Design', 'Modern UI/UX', 'Performance Optimization', 'Cross-Platform']
            },
            'api development': {
                name: 'API Development',
                experience: '1+ year',
                proficiency: 'Advanced',
                projects: ['SecureShare APIs', 'Task Master RESTful API'],
                features: ['RESTful Services', 'API Documentation', 'Authentication', 'Error Handling'],
                aspects: ['Service Integration', 'Scalable Architecture', 'Developer Experience', 'Industry Standards']
            },
            'version control': {
                name: 'Version Control',
                experience: '2+ years',
                proficiency: 'Advanced',
                projects: ['All Projects'],
                features: ['Git Workflows', 'Branching Strategies', 'Code Review', 'Release Management'],
                aspects: ['Code Quality', 'Team Collaboration', 'Project History', 'Deployment Management']
            },
            'cybersecurity': {
                name: 'Cybersecurity',
                experience: '6 months',
                proficiency: 'Intermediate',
                projects: ['Bharti Airtel Internship Projects', 'Secure Coding Practices'],
                features: ['Security Assessments', 'Vulnerability Analysis', 'Secure Coding', 'Risk Assessment'],
                aspects: ['Data Protection', 'Security Best Practices', 'Threat Analysis', 'Compliance']
            },
            'secure coding': {
                name: 'Secure Coding',
                experience: '6 months',
                proficiency: 'Intermediate',
                projects: ['SecureShare Platform', 'Cybersecurity Internship'],
                features: ['Input Validation', 'Authentication Security', 'Data Encryption', 'Security Protocols'],
                aspects: ['Vulnerability Prevention', 'Data Protection', 'Security Standards', 'Best Practices']
            },
            'vulnerability assessment': {
                name: 'Vulnerability Assessment',
                experience: '3 months',
                proficiency: 'Beginner',
                projects: ['Bharti Airtel Cybersecurity Internship'],
                features: ['Security Scanning', 'Risk Analysis', 'Remediation Planning', 'Documentation'],
                aspects: ['Security Evaluation', 'Risk Management', 'Compliance', 'Security Improvement']
            },
            'network security': {
                name: 'Network Security',
                experience: '3 months',
                proficiency: 'Beginner',
                projects: ['Bharti Airtel Cybersecurity Internship'],
                features: ['Network Analysis', 'Security Protocols', 'Threat Detection', 'Security Implementation'],
                aspects: ['Infrastructure Security', 'Network Protection', 'Monitoring', 'Incident Response']
            },
            'threat analysis': {
                name: 'Threat Analysis',
                experience: '3 months',
                proficiency: 'Beginner',
                projects: ['Bharti Airtel Cybersecurity Internship'],
                features: ['Threat Identification', 'Risk Assessment', 'Security Analysis', 'Incident Investigation'],
                aspects: ['Security Intelligence', 'Risk Evaluation', 'Proactive Security', 'Threat Mitigation']
            },
            'data protection': {
                name: 'Data Protection',
                experience: '6 months',
                proficiency: 'Intermediate',
                projects: ['SecureShare Platform', 'Cybersecurity Internship'],
                features: ['Data Encryption', 'Access Control', 'Privacy Implementation', 'Compliance'],
                aspects: ['Privacy Protection', 'Data Security', 'Regulatory Compliance', 'User Trust']
            }
        };
    }

    bindEvents() {
        this.skillCards.forEach(card => {
            card.addEventListener('click', () => {
                this.selectSkill(card);
            });
        });
    }

    selectSkill(selectedCard) {
        // Remove active class from all cards
        this.skillCards.forEach(card => {
            card.classList.remove('active');
        });

        // Add active class to selected card
        selectedCard.classList.add('active');

        // Get skill name and normalize it
        const skillName = selectedCard.getAttribute('data-skill');
        console.log('Selected skill:', skillName); // Debug log
        
        // Try to find the skill info, fallback to a default skill that exists
        const skillInfo = this.skillData[skillName] || this.skillData['python'];

        // Update skill details
        this.updateSkillDetails(skillInfo);
    }

    updateSkillDetails(skillInfo) {
        if (!this.skillDetails) return;

        const content = `{
  "currently_selected": "${skillInfo.name}",
  "experience": "${skillInfo.experience}",
  "proficiency": "${skillInfo.proficiency}",
  "projects_built": [
    ${skillInfo.projects.map(project => `"${project}"`).join(',\n    ')}
  ],
  "key_features_used": [
    ${skillInfo.features.map(feature => `"${feature}"`).join(',\n    ')}
  ],
  "favorite_aspects": [
    ${skillInfo.aspects.map(aspect => `"${aspect}"`).join(',\n    ')}
  ]
}`;

        this.skillDetails.innerHTML = `<pre><code class="language-json">${content}</code></pre>`;
        
        // Re-highlight syntax if Prism is available
        if (window.Prism) {
            window.Prism.highlightAll();
        }
    }

    setDefaultSkill() {
        const firstCard = this.skillCards[0];
        if (firstCard) {
            this.selectSkill(firstCard);
        }
    }
}

// =============================================================================
// PROJECT INTERACTION
// =============================================================================

class ProjectsManager {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.projectDetail = document.querySelector('.project-detail-content');
        this.projectData = this.generateProjectData();
        this.init();
    }

    init() {
        this.bindEvents();
    }

    generateProjectData() {
        return {
            0: {
                title: 'SecureShare Platform',
                description: 'A comprehensive secure file-sharing platform built with Django and Django REST Framework. Features include token-based authentication, role-based access control, Google Gemini AI integration for document analysis, encrypted file storage, and audit logging.',
                features: [
                    'Token-based authentication system',
                    'Role-based access control (RBAC)',
                    'Google Gemini AI for document analysis',
                    'End-to-end file encryption',
                    'Single-use download tokens',
                    'Comprehensive audit logging'
                ],
                tech: ['Django', 'Django REST Framework', 'PostgreSQL', 'Google Gemini AI', 'JavaScript', 'HTML5 & CSS3'],
                metrics: { uptime: '99.9%', loadTime: '<2s', security: 'A+' }
            },
            1: {
                title: 'Task Master API',
                description: 'A modern RESTful API todo application built with FastAPI, featuring automatic OpenAPI documentation, Pydantic data validation, async request handling, and SQLAlchemy ORM integration.',
                features: [
                    'RESTful API with OpenAPI documentation',
                    'Pydantic data validation',
                    'Async request handling',
                    'SQLAlchemy ORM integration',
                    'Docker containerization',
                    'Automatic API testing'
                ],
                tech: ['FastAPI', 'Python', 'SQLAlchemy', 'Pydantic', 'Docker', 'SQLite'],
                metrics: { performance: '95%', coverage: '85%', speed: '<500ms' }
            },
            2: {
                title: 'Blood Bank Management',
                description: 'A comprehensive Django web application for managing blood bank operations including donor registration, blood inventory tracking, and request management with role-based access control.',
                features: [
                    'Donor registration and management',
                    'Blood inventory tracking',
                    'Request management system',
                    'Role-based access control',
                    'Reporting and analytics',
                    'Email notifications'
                ],
                tech: ['Django', 'Python', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
                metrics: { efficiency: '90%', users: '500+', satisfaction: '4.8/5' }
            },
            3: {
                title: 'Project Management System',
                description: 'An enterprise-level project management platform with multi-tenant architecture, Kanban-style task boards, analytics dashboard, and real-time notifications.',
                features: [
                    'Multi-tenant architecture',
                    'Kanban-style task boards',
                    'Real-time notifications',
                    'Analytics dashboard',
                    'Team collaboration tools',
                    'Resource management'
                ],
                tech: ['Django', 'Python', 'WebSocket', 'SQLite', 'HTML5', 'CSS3', 'JavaScript'],
                metrics: { productivity: '85%', teams: '50+', tasks: '10k+' }
            },
            4: {
                title: 'Portfolio Website',
                description: 'A modern, responsive portfolio website built with Django featuring dark/light theme toggle, smooth animations, and contact form integration.',
                features: [
                    'Responsive design',
                    'Dark/light theme toggle',
                    'Smooth animations',
                    'Contact form integration',
                    'SEO optimization',
                    'Performance optimization'
                ],
                tech: ['Django', 'Python', 'HTML5', 'CSS3', 'JavaScript', 'Three.js'],
                metrics: { speed: 'A+', seo: '98%', mobile: '100%' }
            }
        };
    }

    bindEvents() {
        this.projectCards.forEach(card => {
            const expandBtn = card.querySelector('.project-expand');
            if (expandBtn) {
                expandBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showProjectDetail(card);
                });
            }
        });

        // Close detail panel
        const closeBtn = document.querySelector('.close-detail');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideProjectDetail();
            });
        }
    }

    showProjectDetail(card) {
        const projectIndex = parseInt(card.getAttribute('data-project'));
        const projectInfo = this.projectData[projectIndex];
        
        if (!projectInfo) return;

        this.updateProjectDetail(projectInfo);
        
        // Add active class to project detail
        const projectDetail = document.querySelector('.project-detail');
        if (projectDetail) {
            projectDetail.classList.add('active');
        }
    }

    hideProjectDetail() {
        const projectDetail = document.querySelector('.project-detail');
        if (projectDetail) {
            projectDetail.classList.remove('active');
        }
    }

    updateProjectDetail(projectInfo) {
        const detailBody = document.getElementById('project-detail-body');
        if (!detailBody) return;

        const metricsHtml = this.generateMetricsHtml(projectInfo.metrics);
        
        const content = `
            <div class="detail-section">
                <h3># ${projectInfo.title}</h3>
                <p class="project-detail-description">
                    ${projectInfo.description}
                </p>
            </div>
            <div class="detail-section">
                <h4>## 🚀 Key Features</h4>
                <ul class="feature-list">
                    ${projectInfo.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="detail-section">
                <h4>## 🛠 Tech Stack</h4>
                <div class="tech-grid">
                    ${projectInfo.tech.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                </div>
            </div>
            <div class="detail-section">
                <h4>## 📊 Performance Metrics</h4>
                <div class="metrics-grid">
                    ${metricsHtml}
                </div>
            </div>
        `;

        detailBody.innerHTML = content;
    }

    generateMetricsHtml(metrics) {
        return Object.entries(metrics).map(([key, value]) => `
            <div class="metric">
                <span class="metric-value">${value}</span>
                <span class="metric-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
            </div>
        `).join('');
    }
}

// =============================================================================
// SCROLL ANIMATIONS
// =============================================================================

class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.createScrollObserver();
        this.initTypingAnimation();
    }

    createScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, this.observerOptions);

        // Observe all elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    initTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            const text = typingElement.textContent;
            typingElement.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    typingElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 150);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }
}

// =============================================================================
// ENHANCED INTERACTIONS
// =============================================================================

class InteractionManager {
    constructor() {
        this.init();
    }

    init() {
        this.addButtonRipples();
        this.addCardHoverEffects();
        this.addParallaxEffects();
        this.initCodeRunButton();
    }

    addButtonRipples() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('btn-ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    addCardHoverEffects() {
        document.querySelectorAll('.glass-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    addParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const elements = document.querySelectorAll('.hero-bg-particles');
            
            elements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.2);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    initCodeRunButton() {
        const runButton = document.querySelector('.code-run-btn');
        const outputContent = document.getElementById('code-output-content');
        
        if (!runButton || !outputContent) return;
        
        let hasRun = false;
        
        runButton.addEventListener('click', () => {
            if (hasRun) return;
            
            // Add visual feedback
            runButton.style.color = 'var(--accent-color)';
            runButton.style.transform = 'scale(1.2)';
            
            // Clear the comment and show loading
            outputContent.innerHTML = `
                <div class="output-line">
                    <i class="fas fa-spinner fa-spin"></i>
                    Executing code...
                </div>
            `;
            
            // Simulate code execution delay
            setTimeout(() => {
                outputContent.innerHTML = `
                    <div class="output-line">Hello! I'm Lakshay</div>
                    <div class="output-line">Ready to build amazing things! 🚀</div>
                    <div class="output-line success">
                        <i class="fas fa-check"></i>
                        Process finished with exit code 0
                    </div>
                `;
                
                hasRun = true;
                runButton.style.transform = 'scale(1)';
            }, 1500);
        });
    }
}

// =============================================================================
// INITIALIZATION
// =============================================================================

class PortfolioApp {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initComponents();
            });
        } else {
            this.initComponents();
        }
    }

    initComponents() {
        console.log('🎯 Initializing portfolio components...');
        
        // Initialize core components
        this.components.theme = new ThemeManager();
        this.components.navigation = new NavigationManager();
        this.components.animations = new AnimationManager();
        this.components.interactions = new InteractionManager();
        
        // Initialize interactive sections
        this.components.skills = new SkillsManager();
        this.components.projects = new ProjectsManager();
        
        // Initialize particle system if Three.js is available
        if (window.THREE) {
            this.components.particles = new ParticleSystem('hero-particles');
        }
        
        console.log('✅ Portfolio loaded successfully!');
        console.log('💫 Components:', Object.keys(this.components));
    }
}

// Start the application
const portfolio = new PortfolioApp();