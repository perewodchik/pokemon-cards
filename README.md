# Pokemon Card Search

Проект доступен на github pages: [perewodchik.github.io/pokemon-cards](https://perewodchik.github.io/pokemon-cards).

## Бинес логика приложения

### Авторизация

На первом окне вводится логин и пароль
`kode@kode.ru`
`Enk0deng`
СМС-код после авторизации можно посмотреть в консоли

### Главный экран
На главном экране делаются запросы к pokemonTCG API и выводятся карты, соотвутствующие параметрам запроса

### Информация
На странице с информацией выводятся имя, типы, способности, атаки и т.д.

## Декомпозиция проекта на задачи

- Страница входа
  - Оценка сложности: 3
  - Время выполнения: 1 день
- Страница OTP
  - Оценка сложности: 2
  - Время выполнения: 3 часа
- Главная страница
  - Оценка сложности: 8
  - Время выполнения: 2 дня
  - Трудности: придумать дизайн страницы, распарсить запрос
- Страница с информацией о покемонах 
  - Оценка сложности: 5
  - Время выполнения: 1 день
  - Трудности: решить вопрос, какую информацию отображать, и где она будет располагаться
    
## Задачи со звездочкой

- [x] Селект с поиском категорий
- [x] Пагинация карточек
- [x] Анимации
    - Анимация карточки во время загрузки
    - Анимация иконок в шапке
- [ ] Быстрый просмотр по клику **отклонено, т.к. при клике происходит переход на другой экран**
- [x] Сохранение сесси через localStorage
- [x] Адаптивный дизайн
