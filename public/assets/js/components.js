// Общие компоненты для всех страниц
class Components {
  // Header с навигацией
  static getHeader(basePath = '') {
    return `
      <header>
        <nav>
          <a href="${basePath}index.html" class="logo">Пишу про IT</a>
          <button class="mobile-menu-btn" aria-label="Menu" aria-expanded="false">☰</button>
          <ul class="nav-links">
            <li><a href="${basePath}index.html">Главная</a></li>
            <li><a href="${basePath}about.html">Обо мне</a></li>
          </ul>
        </nav>
      </header>
    `;
  }

  // Footer
  static getFooter() {
    return `
      <footer>
        <p>&copy; 2025 Владислав Дедов. Все права защищены.</p>
        <p>Блог о разработке и технологиях</p>
      </footer>
    `;
  }

  // Кнопка "Назад к статьям" для постов
  static getBackLink(basePath = '../') {
    return `<a href="${basePath}index.html" class="back-link">← Назад к статьям</a>`;
  }

  // Инициализация компонентов на странице
  static init(options = {}) {
    const { basePath = '', showBackLink = false } = options;

    // Вставляем header
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      headerContainer.innerHTML = this.getHeader(basePath);
    }

    // Вставляем back link если нужно (для постов)
    if (showBackLink) {
      const backLinkContainer = document.getElementById('back-link-container');
      if (backLinkContainer) {
        backLinkContainer.innerHTML = this.getBackLink(basePath);
      }
    }

    // Вставляем footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = this.getFooter();
    }

    // Инициализируем mobile menu и подсветку активной ссылки после вставки header
    this.initMobileMenu();
    this.highlightActiveLink();
  }

  // Инициализация mobile menu
  static initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        mobileMenuBtn.textContent = isExpanded ? '✕' : '☰';
      });
    }
  }

  // Подсветка активной навигационной ссылки
  static highlightActiveLink() {
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
  }
}

// Автоматическая инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  // Определяем тип страницы по наличию определенных элементов
  const isPostPage = document.querySelector('article') !== null;
  const basePath = isPostPage ? '../' : '';

  Components.init({
    basePath: basePath,
    showBackLink: isPostPage
  });
});
