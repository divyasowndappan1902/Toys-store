// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Dashboard Mobile Sidebar Toggle
  const dashMenuBtn = document.getElementById('dash-menu-btn');
  const dashSidebar = document.getElementById('dash-sidebar');
  if(dashMenuBtn && dashSidebar) {
    dashMenuBtn.addEventListener('click', () => {
      dashSidebar.classList.toggle('active');
    });
  }
  // Sticky Header Effect
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Highlight Active Link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-links a');
  
  navItems.forEach(item => {
    const itemHref = item.getAttribute('href');
    if (itemHref === currentPath) {
      item.classList.add('active');
    }
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if(question) {
      question.addEventListener('click', () => {
        // Close others
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        // Toggle current
        item.classList.toggle('active');
      });
    }
  });

  // Role Selection Toggle (Login & Signup)
  const roleCustomer = document.getElementById('role-customer');
  const roleAdmin = document.getElementById('role-admin');
  const toggleContainer = document.getElementById('role-toggle-container');
  const loginForm = document.getElementById('auth-form');
  const emailInput = document.getElementById('email');

  if (roleCustomer && roleAdmin && toggleContainer) {
    roleCustomer.addEventListener('click', () => {
      toggleContainer.classList.remove('admin-active');
      roleCustomer.classList.add('active');
      roleAdmin.classList.remove('active');
      if (loginForm) {
        loginForm.action = 'customer_dashboard.html';
      }
      if (emailInput) {
        emailInput.value = 'john@example.com';
      }
    });

    roleAdmin.addEventListener('click', () => {
      toggleContainer.classList.add('admin-active');
      roleAdmin.classList.add('active');
      roleCustomer.classList.remove('active');
      if (loginForm) {
        loginForm.action = 'admin_dashboard.html';
      }
      if (emailInput) {
        emailInput.value = 'admin@toyup.com';
      }
    });
  }

  // Dashboard Tabs Logic
  const dashLinks = document.querySelectorAll('.dashboard-nav a[data-target]');
  const dashSections = document.querySelectorAll('.dashboard-section');

  if (dashLinks.length > 0 && dashSections.length > 0) {
    dashLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links and sections
        dashLinks.forEach(l => l.classList.remove('active'));
        dashSections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close sidebar on mobile if open
        const dashSidebar = document.getElementById('dash-sidebar');
        const sidebarOverlay = document.getElementById('sidebar-overlay');
        if(window.innerWidth <= 992 && dashSidebar && dashSidebar.classList.contains('active')) {
          dashSidebar.classList.remove('active');
          if(sidebarOverlay) sidebarOverlay.classList.remove('active');
          
        }
        
        // Show target section
        const targetId = link.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.add('active');
        }
      });
    });
  }

  // Dynamic Email Display for Dashboards
  const displayEmail = document.getElementById('display-email');
  if (displayEmail) {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      // Basic validation to prevent XSS
      const safeEmail = emailParam.replace(/[^a-zA-Z0-9@._-]/g, '');
      if (safeEmail.length > 0) {
        displayEmail.textContent = safeEmail;
      }
    }
  }
});

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('loaded');
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
  }
});

