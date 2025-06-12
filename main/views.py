from django.shortcuts import render
from django.http import JsonResponse

def home(request):
    """Home page with all sections"""
    context = {
        'name': 'Lakshay',
        'title': 'Python Developer',
        'email': 'lakshaydahiya67@gmail.com',
        'phone': '+91-8607684224',
        'linkedin': 'https://www.linkedin.com/in/lakshay-dahiya-010296199/',
        'github': 'https://github.com/lakshaydahiya67',
        'summary': 'Python Developer specialized in Django Full Stack Development with expertise in REST APIs, ORM, and MVT architecture. Experienced in cybersecurity and secure coding practices through internship at Bharti Airtel. Proficient in MySQL database integration, Git/GitHub workflows, and implementing security measures in software development. Committed to driving organizational growth through innovative and secure solutions.',
        'skills': [
            {'name': 'Python', 'icon': 'fab fa-python'},
            {'name': 'Django', 'icon': 'fas fa-server'},
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
                'title': 'Blood Bank Management System',
                'description': 'A comprehensive Django web application for managing blood bank operations including donor registration, blood inventory tracking, and request management with role-based access control.',
                'tech': ['Django', 'Python', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
                'github': 'https://github.com/lakshaydahiya67/bloodbankmanagement',
                'demo': 'https://bloodbankmanagement-wrmp.onrender.com/',
                'image': 'images/projects/blood-bank-management.jpg'
            },
            {
                'title': 'Project Management System',
                'description': 'A comprehensive enterprise-level project management platform built with Django featuring multi-tenant architecture, Kanban-style task boards, real-time WebSocket collaboration, analytics dashboard, activity logging, notifications system, and role-based access control with responsive UI and dark mode support.',
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
                'demo': '#',
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
                'company': 'Bharti Airtel',
                'period': 'June 2024 - August 2024',
                'description': 'Focused on secure coding practices and cybersecurity implementations. Developed secure web applications with emphasis on data protection, vulnerability assessment, and security protocols. Gained hands-on experience in network security, threat analysis, and implementing security measures in software development lifecycle.'
            }
        ]
    }
    return render(request, 'main/home.html', context)

def about(request):
    """About page"""
    return render(request, 'main/about.html')

def projects(request):
    """Projects page"""
    return render(request, 'main/projects.html')

def contact(request):
    """Contact page"""
    if request.method == 'POST':
        # Handle contact form submission
        return JsonResponse({'status': 'success', 'message': 'Message sent successfully!'})
    return render(request, 'main/contact.html')
