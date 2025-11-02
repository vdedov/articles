// Управление статьями: только пагинация
class ArticleManager {
  constructor() {
    this.articles = [];
    this.currentPage = 1;
    this.articlesPerPage = 6;
  }

  // Загрузка статей из JSON
  async loadArticles() {
    try {
      const response = await fetch('data/articles.json');
      const data = await response.json();
      this.articles = data.articles;

      // Парсим URL параметр для страницы
      const params = new URLSearchParams(window.location.search);
      this.currentPage = parseInt(params.get('page')) || 1;

      this.renderArticles();
    } catch (error) {
      console.error('Error loading articles:', error);
      this.showError('Не удалось загрузить статьи');
    }
  }

  // Обновление URL без перезагрузки страницы
  updateUrl() {
    const params = new URLSearchParams();
    if (this.currentPage > 1) params.set('page', this.currentPage);

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.pushState({}, '', newUrl);
  }

  // Рендеринг статей с пагинацией
  renderArticles() {
    const container = document.getElementById('articles-container');

    if (this.articles.length === 0) {
      container.innerHTML = '<div class="no-results"><p>Статьи не найдены</p></div>';
      document.getElementById('pagination').innerHTML = '';
      return;
    }

    // Вычисляем диапазон статей для текущей страницы
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    const articlesToShow = this.articles.slice(startIndex, endIndex);

    // Рендерим статьи
    container.innerHTML = articlesToShow.map(article => `
      <a href="${article.url}" class="article-card">
        <h2>${article.title}</h2>
        <div class="article-meta">
          <span>${article.dateFormatted}</span>
          ${article.categories.length > 0 ? `<span>•</span><span>${article.categories.join(', ')}</span>` : ''}
        </div>
        <p>${article.excerpt}</p>
        <div class="article-tags">
          ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </a>
    `).join('');

    // Рендерим пагинацию
    this.renderPagination();

    // Скроллим наверх при смене страницы
    if (this.currentPage > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Рендеринг пагинации
  renderPagination() {
    const totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
    const paginationContainer = document.getElementById('pagination');

    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let paginationHTML = '';

    // Кнопка "Предыдущая"
    paginationHTML += `
      <button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''}
              onclick="articleManager.goToPage(${this.currentPage - 1})">
        ← Назад
      </button>
    `;

    // Логика отображения номеров страниц
    const maxVisible = 7; // Максимум видимых кнопок страниц
    const pages = this.getPageNumbers(totalPages, this.currentPage, maxVisible);

    pages.forEach((page, index) => {
      if (page === '...') {
        paginationHTML += '<span class="pagination-dots">...</span>';
      } else {
        paginationHTML += `
          <button class="pagination-btn ${page === this.currentPage ? 'active' : ''}"
                  onclick="articleManager.goToPage(${page})">
            ${page}
          </button>
        `;
      }
    });

    // Кнопка "Следующая"
    paginationHTML += `
      <button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''}
              onclick="articleManager.goToPage(${this.currentPage + 1})">
        Далее →
      </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
  }

  // Генерация массива номеров страниц для отображения
  getPageNumbers(total, current, maxVisible) {
    // Если страниц меньше или равно maxVisible, показываем все
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = [];
    const halfVisible = Math.floor(maxVisible / 2);

    // Всегда показываем первую страницу
    pages.push(1);

    // Вычисляем диапазон вокруг текущей страницы
    let start = Math.max(2, current - halfVisible);
    let end = Math.min(total - 1, current + halfVisible);

    // Корректируем диапазон если слишком близко к началу или концу
    if (current <= halfVisible + 1) {
      end = Math.min(total - 1, maxVisible - 1);
    }
    if (current >= total - halfVisible) {
      start = Math.max(2, total - maxVisible + 2);
    }

    // Добавляем многоточие после первой страницы если нужно
    if (start > 2) {
      pages.push('...');
    }

    // Добавляем страницы в диапазоне
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Добавляем многоточие перед последней страницей если нужно
    if (end < total - 1) {
      pages.push('...');
    }

    // Всегда показываем последнюю страницу
    if (total > 1) {
      pages.push(total);
    }

    return pages;
  }

  // Переход на страницу
  goToPage(page) {
    const totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
    if (page < 1 || page > totalPages) return;

    this.currentPage = page;
    this.updateUrl();
    this.renderArticles();
  }

  // Показать ошибку
  showError(message) {
    const container = document.getElementById('articles-container');
    container.innerHTML = `
      <div class="error-message">
        <p>${message}</p>
      </div>
    `;
  }
}

// Инициализация при загрузке страницы
const articleManager = new ArticleManager();

document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, что мы на главной странице
  if (document.getElementById('articles-container')) {
    articleManager.loadArticles();
  }
});

// Обработка кнопки "Назад" браузера
window.addEventListener('popstate', () => {
  if (document.getElementById('articles-container')) {
    const params = new URLSearchParams(window.location.search);
    articleManager.currentPage = parseInt(params.get('page')) || 1;
    articleManager.renderArticles();
  }
});
