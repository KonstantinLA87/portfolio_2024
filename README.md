# Портфолио 2024
Это проект является моим портфолио и одновременно песочницей, где я тестирую различные, новые для меня, технологии.
На дпнный момент в проекте реализованы:

- Аутентификация пользователя ( email/пароль ). При резгистрации данные о польхователе заносятся в базу данный firebase

- Чат с использованием технологии Websockets. Вы можете открыть вторую и более вкладку в инкогнито или другом браузере и имитировать общение с другим пользователем в реальном времени. ВАЖНО: Данный функционал пока урезан и имеет свои ограничения, например при переходе на другую вкладку в самом приложении история переписки слетает, так как данные переписки пока не хранятся нигде на сервере, но я исправлю это в ближайшее время

- База данных, которая подтягивается с Firebase-сервера


---

#### Версия Node.js: 18.16.0

#### **Как запустить проект:**
```
1.   Установить node.js нужной версии (18.16.0^)

2.1  В папке /client выполнить npm install     ( или yard install )
2.2  В папке /server выполнить npm install     ( или yard install )

3.   В папке /client Переименуйте файл .env.example в .env

4.1  В папке /client выполнить npm run dev     ( или yard dev     )
4.2  В папке /server выполнить npm run start   ( или yarn start   ) 
```



