from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_GET
from django.views.decorators.cache import cache_control
import json
import os
from django.conf import settings

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
                'title': 'WhatsApp Web Clone',
                'description': 'A full-stack WhatsApp Web clone built with FastAPI backend and React frontend, featuring real-time messaging via WebSocket, MongoDB for data persistence, simulated webhook data ingestion, and responsive UI with message status indicators and chat management.',
                'tech': ['FastAPI', 'React', 'MongoDB', 'WebSocket', 'Vite', 'Tailwind CSS', 'Python', 'JavaScript', 'Render', 'Vercel'],
                'github': 'https://github.com/lakshaydahiya67/WhatsApp_Web',
                'demo': 'https://whats-app-web-umber.vercel.app',
                'image': 'images/projects/whatsapp-web-clone.jpg'
            },
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
                'description': '''Specialized in Django Full Stack Development with comprehensive responsibilities including:
• Developed and maintained scalable web applications using Python and Django framework
• Designed and implemented RESTful APIs for seamless frontend-backend communication
• Built responsive user interfaces using HTML5, CSS3, and JavaScript
• Integrated MySQL databases with Django ORM for efficient data management
• Collaborated with cross-functional teams using Git/GitHub for version control and code review
• Containerized applications using Docker for consistent deployment environments
• Participated in agile development methodologies and sprint planning
• Conducted code reviews and maintained high code quality standards
• Implemented authentication and authorization systems for secure applications
• Optimized application performance and database queries for scalability
• Mentored junior developers and contributed to team knowledge sharing'''
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

@require_GET
@cache_control(max_age=3600)  # Cache for 1 hour
def service_worker(request):
    """Serve the service worker file"""
    try:
        sw_path = os.path.join(settings.STATIC_ROOT or settings.STATICFILES_DIRS[0], 'sw.js')
        with open(sw_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return HttpResponse(content, content_type='application/javascript')
    except (FileNotFoundError, IndexError):
        # Fallback: serve from static URL
        return HttpResponse(
            f"importScripts('{settings.STATIC_URL}sw.js');",
            content_type='application/javascript'
        )

@require_GET  
@cache_control(max_age=86400)  # Cache for 24 hours
def manifest(request):
    """Serve the PWA manifest"""
    manifest_data = {
        "name": "Lakshay Dahiya - Software Developer Portfolio",
        "short_name": "Lakshay Portfolio",
        "description": "Modern portfolio showcasing Django Full Stack Development expertise and projects",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#0D1117",
        "theme_color": "#007ACC",
        "orientation": "portrait-primary",
        "categories": ["portfolio", "developer", "business"],
        "lang": "en",
        "dir": "ltr",
        "icons": [
            {
                "src": f"{settings.STATIC_URL}images/Lakshay.jpeg",
                "sizes": "192x192",
                "type": "image/jpeg",
                "purpose": "any maskable"
            },
            {
                "src": f"{settings.STATIC_URL}images/Lakshay.jpeg", 
                "sizes": "512x512",
                "type": "image/jpeg",
                "purpose": "any maskable"
            }
        ],
        "shortcuts": [
            {
                "name": "View Projects",
                "short_name": "Projects",
                "url": "/#projects",
                "icons": [
                    {
                        "src": f"{settings.STATIC_URL}images/Lakshay.jpeg",
                        "sizes": "192x192"
                    }
                ]
            },
            {
                "name": "Contact Me", 
                "short_name": "Contact",
                "url": "/#contact",
                "icons": [
                    {
                        "src": f"{settings.STATIC_URL}images/Lakshay.jpeg",
                        "sizes": "192x192"
                    }
                ]
            }
        ]
    }
    
    return JsonResponse(manifest_data)