// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
      mobileMenuBtn.textContent = isExpanded ? '✕' : '☰';
    });
  }

  // Highlight active navigation link
  const currentPath = window.location.pathname;
  const navLinkElements = document.querySelectorAll('.nav-links a');

  navLinkElements.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath ||
        (currentPath.includes('/posts/') && linkPath.includes('index.html')) ||
        (currentPath.endsWith('/') && linkPath.includes('index.html') && currentPath === linkPath.replace('index.html', ''))) {
      link.classList.add('active');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

  // Add copy button to code blocks
  document.querySelectorAll('pre code').forEach((codeBlock) => {
    const pre = codeBlock.parentElement;
    const wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';

    const header = document.createElement('div');
    header.className = 'code-header';

    const language = codeBlock.className.match(/language-(\w+)/);
    const languageSpan = document.createElement('span');
    languageSpan.className = 'code-language';
    languageSpan.textContent = language ? language[1] : 'code';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = 'Copy';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(codeBlock.textContent).then(() => {
        copyBtn.innerHTML = 'Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = 'Copy';
        }, 2000);
      });
    };

    header.appendChild(languageSpan);
    header.appendChild(copyBtn);

    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);
  });

  // Initialize syntax highlighting if highlight.js is loaded
  if (window.hljs) {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }
});

// Add reading time estimate
function estimateReadingTime() {
  const article = document.querySelector('.article-content');
  if (!article) return;

  const text = article.textContent;
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  const meta = document.querySelector('.article-meta');
  if (meta) {
    const timeSpan = document.createElement('span');
    timeSpan.textContent = `${readingTime} мин. чтения`;
    meta.appendChild(timeSpan);
  }
}

estimateReadingTime();
