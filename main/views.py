from django.shortcuts import render
from django.http import JsonResponse

def home(request):
    """Home page with all sections"""
    context = {
        'name': 'Lakshay',
        'title': 'Software Developer',
        'email': 'lakshaydahiya67@gmail.com',
        'phone': '+91-8607684224',
        'linkedin': 'https:/www.linkedin.com/in/lakshaydahiya67/',
        'github': 'https://github.com/lakshaydahiya67',
        'summary': 'Software Developer specialized in Django Full Stack Development with expertise in REST APIs, ORM, and MVT architecture. Experienced in cybersecurity and secure coding practices through internship at Bharti Airtel. Proficient in MySQL database integration, Git/GitHub workflows, and implementing security measures in software development. Committed to driving organizational growth through innovative and secure solutions.',
        'skills': [
            {'name': 'Python', 'icon': 'fab fa-python'},
            {'name': 'Django', 'icon': 'fas fa-server'},
            {'name': 'FastAPI', 'icon': 'fas fa-bolt'},
            {'name': 'REST APIs', 'icon': 'fas fa-exchange-alt'},
            {'name': 'ORM', 'icon': 'fas fa-database'},
            {'name': 'MVT Architecture', 'icon': 'fas fa-sitemap'},
            {'name': 'MySQL', 'icon': 'fas fa-database'},
            {'name': 'HTML/CSS', 'icon': 'fab fa-html5'},
            {'name': 'JavaScript', 'icon': 'fab fa-js-square'},
            {'name': 'Git', 'icon': 'fab fa-git-alt'},
            {'name': 'GitHub', 'icon': 'fab fa-github'},
            {'name': 'Linux', 'icon': 'fab fa-linux'},
            {'name': 'Database Integration', 'icon': 'fas fa-plug'},
            {'name': 'Full Stack Development', 'icon': 'fas fa-layer-group'},
            {'name': 'Web Applications', 'icon': 'fas fa-globe'},
            {'name': 'API Development', 'icon': 'fas fa-cogs'},
            {'name': 'Version Control', 'icon': 'fas fa-code-branch'},
            {'name': 'Cybersecurity', 'icon': 'fas fa-shield-alt'},
            {'name': 'Secure Coding', 'icon': 'fas fa-lock'},
            {'name': 'Vulnerability Assessment', 'icon': 'fas fa-search'},
            {'name': 'Network Security', 'icon': 'fas fa-network-wired'},
            {'name': 'Threat Analysis', 'icon': 'fas fa-bug'},
            {'name': 'Data Protection', 'icon': 'fas fa-user-shield'}
        ],
        'projects': [
            {
                'title': 'SecureShare',
                'description': 'A secure file-sharing platform using Django and Django REST Framework with token-based authentication and role-based access control. Features Google Gemini AI for intelligent document analysis, encrypted file storage, single-use download tokens, and comprehensive audit logging capabilities.',
                'tech': ['Django', 'Django REST Framework', 'PostgreSQL', 'Google Gemini AI', 'Token Authentication', 'File Encryption', 'Python', 'HTML5', 'CSS3', 'JavaScript'],
                'github': 'https://github.com/lakshaydahiya67/SecureShare',
                'demo': 'https://secureshare-2cc7.onrender.com/',
                'image': 'images/projects/secureshare.jpg'
            },
            {
                'title': 'Task Master',
                'description': 'A modern RESTful API todo application built with FastAPI, featuring automatic OpenAPI documentation, Pydantic data validation, async request handling, and SQLAlchemy ORM integration. The application supports full CRUD operations with proper response models and status codes.',
                'tech': ['FastAPI', 'Python', 'SQLAlchemy', 'Pydantic', 'Docker', 'SQLite', 'RESTful API', 'OpenAPI', 'Async/Await'],
                'github': 'https://github.com/lakshaydahiya67/Task-Master',
                'demo': 'https://task-master-ebt4.onrender.com/',
                'image': 'images/projects/task-master.jpg'
            },
            {
                'title': 'Blood Bank Management System',
                'description': 'A comprehensive Django web application for managing blood bank operations including donor registration, blood inventory tracking, and request management with role-based access control.',
                'tech': ['Django', 'Python', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
                'github': 'https://github.com/lakshaydahiya67/bloodbankmanagement',
                'demo': 'https://bloodbankmanagement-wrmp.onrender.com/',
                'image': 'images/projects/blood-bank-management.jpg'
            },
            {
                'title': 'Project Management System',
                'description': 'A comprehensive enterprise-level project management platform built with Django featuring multi-tenant architecture, Kanban-style task boards, analytics dashboard, activity logging, notifications system, and role-based access control with responsive UI and dark mode support.',
                'tech': ['Django', 'Python', 'WebSocket', 'SQLite', 'HTML5', 'CSS3', 'JavaScript', 'REST APIs', 'Real-time Updates'],
                'github': 'https://github.com/lakshaydahiya67/projectmanagement',
                'demo': 'https://projectmanagement-c23m.onrender.com/',
                'image': 'images/projects/project-management-system.jpg'
            },
            {
                'title': 'Portfolio Website',
                'description': 'A modern, responsive portfolio website built with Django featuring dark/light theme toggle, smooth animations, and contact form integration to showcase professional skills and projects.',
                'tech': ['Django', 'Python', 'HTML5', 'CSS3', 'JavaScript', 'SQLite'],
                'github': 'https://github.com/lakshaydahiya67/portfolio',
                'demo': 'https://portfolio-24ye.onrender.com/',
                'image': 'images/projects/portfolio-website.jpg'
            },
        ],
        'experience': [
            {
                'title': 'Full Stack Developer',
                'company': 'Cincooni Systems Private Ltd',
                'period': 'December 2024 - March 2025',
                'description': 'Specialized in Django Full Stack Development with expertise in REST APIs, ORM, and MVT architecture. Successfully integrated MySQL databases and implemented Git/GitHub workflows for version control. Focused on creating scalable web applications and driving organizational growth through innovative solutions.'
            },
            {
                'title': 'Cybersecurity Intern',
                'company': 'Bharti Airtel Ltd.',
                'period': 'July 2024 - September 2024',
                'description': 'Conducted security assessments and automated scans, documenting remediation steps. Focused on secure coding practices and cybersecurity implementations with emphasis on data protection, vulnerability assessment, and security protocols.'
            },
            {
                'title': 'Cybersecurity Intern',
                'company': 'Bharti Airtel Ltd.',
                'period': 'July 2023 - August 2023',
                'description': 'Applied Linux administration and security best practices across networks, systems, and web applications. Gained hands-on experience in network security, threat analysis, and implementing security measures in software development lifecycle.'
            }
        ],
        'education': [
            {
                'degree': 'Bachelor of Computer Applications (BCA)',
                'specialization': 'Artificial Intelligence & Machine Learning',
                'institution': 'SGT University, Gurugram',
                'period': '2022 - 2025',
                'description': 'Specialized in AI/ML concepts, data structures, algorithms, and software development with focus on emerging technologies and practical applications.'
            }
        ],
        'extracurricular': [
            {
                'title': 'Competitive Programming',
                'description': 'Active problem solver on LeetCode',
                'link': 'https://leetcode.com/u/lakshaydahiya67/',
                'icon': 'fas fa-code',
                'period': '2025 - Present'
            },
            {
                'title': 'AIU National Chess Tournament 2023',
                'description': 'Represented SGT University at the national level chess competition',
                'icon': 'fas fa-chess',
                'period': '2023'
            },
            {
                'title': 'I-SHINE 2025',
                'description': 'Presented the Blood Bank Management System at the international technical summit hosted by SGT University',
                'icon': 'fas fa-microphone',
                'period': '2025'
            },
            {
                'title': 'Open Source Contribution',
                'description': 'Active contributor to various open-source projects on GitHub',
                'icon': 'fab fa-github',
                'period': '2024 - Present'
            }
        ]
    }
    return render(request, 'main/home.html', context)