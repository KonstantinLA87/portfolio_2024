# Портфолио 2024
Это проект является моим портфолио и одновременно песочницей, где я тестирую различные, новые для меня, технологии.
### Стек:
- Vue 3 / Composition API / Pinia / Vue-router
- Vite
- Typescript
- Firebase
- Websockets (socket.io)
- Axios
###
---
###
На данный момент в проекте реализованы:

- Аутентификация пользователя ( Email / Пароль ). При регистрации данные о польхователе заносятся в базу данный firebase

- Чат с использованием технологии Websockets. Вы можете открыть вторую и более вкладку в инкогнито или другом браузере и имитировать общение с другим пользователем в реальном времени. 
  
  **ВАЖНО:** Данный функционал пока урезан и имеет свои ограничения, например при переходе на другую вкладку в самом приложении история переписки слетает, так как данные переписки пока не хранятся нигде на сервере, но я исправлю это в ближайшее время

- База данных (Firebase), реализован функционал вывода/добавления/удаления данных.

###
---

#### Версия Node.js: 18.16.0

###
---
#### **Как запустить проект:**
```
1.   Установить node.js нужной версии (18.16.0^)

2.1  В папке /client выполнить npm install     ( или yarn install )
2.2  В папке /server выполнить npm install     ( или yarn install )

3.   В папке /client Переименуйте файл .env.example в .env

4.1  В папке /client выполнить npm run dev     ( или yarn dev     )
4.2  В папке /server выполнить npm run start   ( или yarn start   ) 
```



