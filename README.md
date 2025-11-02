# Блог "Пишу про IT"

Современный технический блог с темной темой и адаптивным дизайном для GitHub Pages.

## Особенности

- Темная тема оформления
- Полностью адаптивный дизайн для мобильных устройств
- Подсветка синтаксиса кода (highlight.js)
- Поддержка различных элементов: код, цитаты, изображения, ссылки
- Чистый HTML/CSS/JS без зависимостей от генераторов статических сайтов
- Автоматический деплой на GitHub Pages через GitHub Actions

## Структура проекта

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow для деплоя
├── .gitignore                  # Игнорируемые файлы
├── README.md                   # Этот файл
└── public/                     # Корневая папка сайта
    ├── index.html              # Главная страница со списком статей
    ├── about.html              # Страница "О себе"
    ├── assets/
    │   ├── css/
    │   │   └── style.css       # Основные стили
    │   ├── js/
    │   │   └── script.js       # JavaScript для навигации и интерактивности
    │   └── img/                # Изображения
    └── posts/                  # Статьи блога
        ├── hello-world.html
        └── go-context.html
```

## Локальная разработка

Для локальной разработки просто откройте `public/index.html` в браузере или используйте любой локальный веб-сервер:

```bash
# Вариант 1: Python
cd public
python3 -m http.server 8000

# Вариант 2: Node.js (npx)
npx serve public

# Вариант 3: PHP
cd public
php -S localhost:8000
```

После запуска откройте в браузере: http://localhost:8000

## Деплой на GitHub Pages

### Шаг 1: Создайте репозиторий на GitHub

1. Перейдите на https://github.com
2. Нажмите "New repository" (или "+")
3. Укажите имя репозитория (например, "blog" или "articles")
4. Выберите Public или Private (оба варианта работают с GitHub Pages)
5. **НЕ** инициализируйте с README, .gitignore или license (у вас уже есть эти файлы)
6. Нажмите "Create repository"

### Шаг 2: Загрузите код в GitHub

```bash
# Если у вас уже есть другой remote:
git remote remove origin

# Добавьте GitHub как remote (замените YOUR_USERNAME и YOUR_REPO):
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Закоммитьте все изменения
git add .
git commit -m "Инициализация блога для GitHub Pages"

# Отправьте в GitHub
git push -u origin main
```

### Шаг 3: Настройте GitHub Pages

После пуша кода:

1. Перейдите в настройки репозитория: `Settings` → `Pages`
2. В разделе "Build and deployment":
   - **Source**: выберите `GitHub Actions`
3. Вернитесь на главную страницу репозитория
4. Перейдите на вкладку `Actions`
5. Вы увидите запущенный workflow "Deploy to GitHub Pages"
6. Дождитесь завершения (зеленая галочка)
7. Вернитесь в `Settings` → `Pages` - там появится URL вашего сайта

**URL будет:** `https://YOUR_USERNAME.github.io/YOUR_REPO`

Готово! Ваш блог опубликован и доступен по указанному URL.

### Важно

- Файлы должны быть в папке `public/` (уже настроено в workflow)
- Сайт обновляется автоматически при каждом пуше в ветку `main`
- Первый деплой может занять 2-5 минут
- Изменения на сайте могут отображаться с задержкой до 10 минут из-за CDN кэша GitHub

## Добавление новых статей

Чтобы добавить новую статью:

1. Создайте новый HTML файл в папке `public/posts/` (например, `my-new-post.html`)
2. Используйте шаблон существующих статей
3. Добавьте карточку статьи в `public/index.html` в секцию `.articles-grid`
4. Закоммитьте и запушьте изменения:

```bash
git add .
git commit -m "Добавлена новая статья: название"
git push
```

### Шаблон статьи

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Описание статьи">
    <title>Название статьи - Пишу про IT</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
</head>
<body>
    <header>
        <nav>
            <a href="../index.html" class="logo">Пишу про IT</a>
            <button class="mobile-menu-btn">☰</button>
            <ul class="nav-links">
                <li><a href="../index.html">Главная</a></li>
                <li><a href="../about.html">Обо мне</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <a href="../index.html" class="back-link">← Назад к статьям</a>
        <article>
            <header>
                <h1>Название статьи</h1>
                <div class="article-meta">
                    <span>Дата</span>
                    <span>•</span>
                    <span>Категория</span>
                </div>
                <div class="article-tags">
                    <span class="tag">тег1</span>
                    <span class="tag">тег2</span>
                </div>
            </header>

            <div class="article-content">
                <!-- Содержимое статьи -->
            </div>
        </article>
    </main>

    <footer>
        <p>&copy; 2025 Владислав Дедов. Все права защищены.</p>
    </footer>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script src="../assets/js/script.js"></script>
</body>
</html>
```

## Кастомизация

### Изменение цветовой схемы

Цвета определены в CSS переменных в файле `public/assets/css/style.css`:

```css
:root {
  --bg-primary: #0d1117;
  --bg-secondary: #161b22;
  --text-primary: #c9d1d9;
  --accent: #58a6ff;
  /* и другие... */
}
```

### Изменение информации об авторе

Отредактируйте файл `public/about.html`

### Изменение контактов

Обновите секцию `.contact-links` в файле `public/about.html`

## Технологии

- HTML5
- CSS3 (с CSS переменными)
- Vanilla JavaScript
- highlight.js для подсветки синтаксиса
- GitHub Actions для автоматического деплоя

## Лицензия

MIT License - вы можете свободно использовать и модифицировать этот код

## Автор

Владислав Дедов - Golang разработчик

- GitHub: [@vdedov](https://github.com/vdedov)
- Telegram: [@vdedov](https://t.me/vdedov)

---

Если возникли вопросы или нужна помощь - создавайте issue в репозитории!
