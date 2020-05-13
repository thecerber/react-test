Для развертывания проекта в системе должны быть установлены пакеты **NodeJS** и **NPM**:

```bash
sudo apt install nodejs npm
```

Клонируем репозиторий:

```bash
git clone https://github.com/thecerber/react-test.git
```

Перехожим в каталог с проектом и устанавливаем необходимые зависимости:

```bash
cd react-test
npm install
```

Запускаем сервер разработки:

```bash
npm start
```

Идём браузером по адресу http://localhost:3000/
и смотрим результат работы тестового приложения.

Собрать оптимизированное приложение можно командой:

```bash
npm run build
```
