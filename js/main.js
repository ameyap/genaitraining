// Main JavaScript for GenAI Training Website

document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const mobileNav = document.querySelector('.mobile-nav-toggle');
  if (mobileNav) {
    mobileNav.addEventListener('click', function() {
      const nav = document.querySelector('nav ul');
      nav.classList.toggle('active');
    });
  }
  
  // Syntax highlighting for code blocks
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('pre code').forEach((el) => {
      hljs.highlightElement(el);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Interactive sections toggle
  document.querySelectorAll('.toggle-content').forEach(button => {
    button.addEventListener('click', function() {
      const content = this.nextElementSibling;
      if (content) {
        content.classList.toggle('expanded');
        this.textContent = content.classList.contains('expanded') ? 'Hide Content' : 'Show Content';
      }
    });
  });

  // Progress tracking for course content
  document.querySelectorAll('.mark-complete').forEach(button => {
    button.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      // Store completion status in local storage
      localStorage.setItem('section_' + sectionId, 'completed');
      this.textContent = 'Completed';
      this.classList.add('completed');
      updateProgress();
    });
  });

  // Check for completed sections on page load
  function updateProgress() {
    const totalSections = document.querySelectorAll('.mark-complete').length;
    let completedSections = 0;
    
    document.querySelectorAll('.mark-complete').forEach(button => {
      const sectionId = button.getAttribute('data-section');
      if (localStorage.getItem('section_' + sectionId) === 'completed') {
        button.textContent = 'Completed';
        button.classList.add('completed');
        completedSections++;
      }
    });
    
    // Update progress indicator
    const progressElement = document.querySelector('.progress-indicator');
    if (progressElement && totalSections > 0) {
      const progressPercentage = Math.round((completedSections / totalSections) * 100);
      progressElement.textContent = progressPercentage + '% Complete';
      progressElement.style.width = progressPercentage + '%';
    }
  }
  
  // Initialize progress
  updateProgress();
});