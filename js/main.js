// Main JavaScript for GenAI Training Website

// Function to load shared components (header and footer)
async function loadSharedComponents() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  
  try {
    // Determine relative path for components based on current page depth
    const path = window.location.pathname;
    let componentsPath = '';
    
    // If we're in a subdirectory, adjust the path accordingly
    if (path.includes('/day1/') || path.includes('/day2/') || path.includes('/day3/') ||
        path.includes('/resources/') || path.includes('/notebooks/')) {
      componentsPath = '../';
    }
    
    // Load header
    if (headerPlaceholder) {
      const headerResponse = await fetch(`${componentsPath}components/header.html`);
      let headerHtml = await headerResponse.text();
      
      // Fix paths in header based on current location
      if (componentsPath) {
        // Fix the logo link and navigation links
        headerHtml = headerHtml.replace(/href="index.html"/g, `href="${componentsPath}index.html"`)
                              .replace(/href="day1\//g, `href="${componentsPath}day1/`)
                              .replace(/href="day2\//g, `href="${componentsPath}day2/`)
                              .replace(/href="day3\//g, `href="${componentsPath}day3/`)
                              .replace(/href="notebooks\//g, `href="${componentsPath}notebooks/`);
      }
      
      headerPlaceholder.innerHTML = headerHtml;
    }
    
    // Load footer
    if (footerPlaceholder) {
      const footerResponse = await fetch(`${componentsPath}components/footer.html`);
      let footerHtml = await footerResponse.text();
      
      // Fix paths in footer based on current location
      if (componentsPath) {
        // Fix the footer links
        footerHtml = footerHtml.replace(/href="day1\//g, `href="${componentsPath}day1/`)
                              .replace(/href="day2\//g, `href="${componentsPath}day2/`)
                              .replace(/href="day3\//g, `href="${componentsPath}day3/`)
                              .replace(/href="resources\//g, `href="${componentsPath}resources/`)
                              .replace(/href="notebooks\//g, `href="${componentsPath}notebooks/`);
      }
      
      footerPlaceholder.innerHTML = footerHtml;
    }
    
    // After loading components, apply active class to current page
    highlightCurrentPage();
    
  } catch (error) {
    console.error('Error loading shared components:', error);
  }
}

// Function to highlight the current page in the navigation
function highlightCurrentPage() {
  const path = window.location.pathname;
  
  // Clear any existing active classes
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
  });
  
  // Set active class based on path
  if (path.endsWith('index.html') || path.endsWith('/')) {
    document.getElementById('nav-home')?.classList.add('active');
  } else if (path.includes('genai-evolution')) {
    document.getElementById('nav-genai-evolution')?.classList.add('active');
    document.getElementById('nav-day1')?.classList.add('active');
  } else if (path.includes('llm-basics')) {
    document.getElementById('nav-llm-basics')?.classList.add('active');
    document.getElementById('nav-day1')?.classList.add('active');
  } else if (path.includes('frameworks')) {
    document.getElementById('nav-frameworks')?.classList.add('active');
    document.getElementById('nav-day2')?.classList.add('active');
  } else if (path.includes('tools-mcp')) {
    document.getElementById('nav-tools-mcp')?.classList.add('active');
    document.getElementById('nav-day2')?.classList.add('active');
  } else if (path.includes('agents-vs-tools')) {
    document.getElementById('nav-agents-vs-tools')?.classList.add('active');
    document.getElementById('nav-day2')?.classList.add('active');
  } else if (path.includes('rag')) {
    document.getElementById('nav-rag')?.classList.add('active');
    document.getElementById('nav-day3')?.classList.add('active');
  } else if (path.includes('chatbots')) {
    document.getElementById('nav-chatbots')?.classList.add('active');
    document.getElementById('nav-day3')?.classList.add('active');
  } else if (path.includes('streamlit')) {
    document.getElementById('nav-streamlit')?.classList.add('active');
    document.getElementById('nav-day3')?.classList.add('active');
  } else if (path.includes('notebooks')) {
    document.getElementById('nav-notebooks')?.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Load shared components
  loadSharedComponents();
  
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