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

  // JS Animation: Typing effect for hero section
  const heroSpan = document.querySelector('.hero-content h1 span');
  if (heroSpan) {
    const text = heroSpan.getAttribute('data-text') || heroSpan.innerText;
    heroSpan.setAttribute('data-text', text); // Store original text
    heroSpan.innerText = '';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroSpan.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 120);
      }
    };
    setTimeout(typeWriter, 800); 
  }

  // JS 3D Animation: Enhanced Parallax & Tilt effect for hero section
  const heroSection = document.querySelector('.hero');
  const heroImageContainer = document.querySelector('.hero-image');
  const heroContent = document.querySelector('.hero-content');
  
  if (heroSection && heroImageContainer) {
    // Inject glare element for glossy 3D effect
    const glare = document.createElement('div');
    glare.className = 'hero-glare';
    glare.style.position = 'absolute';
    glare.style.top = '0';
    glare.style.left = '0';
    glare.style.width = '100%';
    glare.style.height = '100%';
    glare.style.borderRadius = '30px'; // Match image border radius
    glare.style.pointerEvents = 'none';
    glare.style.opacity = '0';
    glare.style.transition = 'opacity 0.5s ease';
    glare.style.zIndex = '5';
    heroImageContainer.appendChild(glare);

    // Apply 3D perspective to container's parent so child can pop out
    heroImageContainer.style.transformStyle = 'preserve-3d';
    
    // Ensure img pops out
    const heroImg = heroImageContainer.querySelector('img');
    if (heroImg) {
      heroImg.style.transform = 'translateZ(60px)'; // Make image pop out from container
      heroImg.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate 3D rotation (enhanced)
      const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg
      const rotateY = ((x - centerX) / centerX) * 15;
      
      // Calculate 2D parallax movement
      const transX = (centerX - x) / 30;
      const transY = (centerY - y) / 30;
      
      // Dynamic glare angle
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) - 90;
      glare.style.background = `linear-gradient(\${angle}deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)`;
      glare.style.opacity = '0.6';
      
      // Apply 3D transform to hero image container
      heroImageContainer.style.transform = `perspective(1200px) translateX(${transX}px) translateY(${transY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      heroImageContainer.style.transition = 'transform 0.1s ease-out';
      
      // Dynamic Drop Shadow
      heroImageContainer.style.filter = `drop-shadow(\${-rotateY * 2}px \${rotateX * 2}px 30px rgba(0,0,0,0.3))`;
      
      // Apply subtle opposite 3D transform to hero text for depth
      if(heroContent) {
        heroContent.style.transform = `perspective(1200px) rotateX(${rotateX * -0.5}deg) rotateY(${rotateY * -0.5}deg) translateZ(40px)`;
        heroContent.style.transition = 'transform 0.1s ease-out';
      }
    });
    
    heroSection.addEventListener("mouseleave", () => {
      glare.style.opacity = '0';
      heroImageContainer.style.transform = `perspective(1200px) translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      heroImageContainer.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      heroImageContainer.style.filter = 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.06))';
      
      if(heroContent) {
        heroContent.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
        heroContent.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }
    });
  }

  // JS 3D Animation: Tilt effect for product cards
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg tilt
      const rotateY = ((x - centerX) / centerX) * 15;
      
      // Preserve transform scale from CSS if any, and apply 3D rotations
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      card.style.transition = 'transform 0.1s ease';
      card.style.zIndex = '10';
      card.style.boxShadow = `\${-rotateY}px \${rotateX}px 20px rgba(0,0,0,0.2)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 0.5s ease';
      card.style.zIndex = '1';
      card.style.boxShadow = '';
    });
  });

});

// Background Floating Animation
function initBgAnimation() {
  const container = document.getElementById('bg-animation-container');
  if (!container) return;
  
  container.innerHTML = ''; // Clear previous if any
  
  const colors = ['#00bbae', '#f88e0f', '#f0344f', '#a3e4d7', '#fdebd0'];
  const shapeCount = 15; // Number of floating 3D shapes
  
  for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElement('div');
    shape.classList.add('bg-shape');
    
    // Randomize properties
    const size = Math.random() * 80 + 30; // 30px to 110px
    const left = Math.random() * 100; // 0 to 100vw
    const animDuration = Math.random() * 20 + 15; // between 15s and 35s
    const animDelay = Math.random() * -30; // negative delay so they start at different points
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    shape.style.width = `\${size}px`;
    shape.style.height = `\${size}px`;
    shape.style.left = `\${left}vw`;
    shape.style.backgroundColor = color;
    shape.style.animationDuration = `\${animDuration}s`;
    shape.style.animationDelay = `\${animDelay}s`;
    
    container.appendChild(shape);
  }
}
window.addEventListener('load', initBgAnimation);

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('loaded');
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
  }
});

