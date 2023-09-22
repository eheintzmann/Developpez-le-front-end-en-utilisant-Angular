# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

## Option 1 : Docker Compose
* With docker installed : [Get Docker](https://docs.docker.com/get-docker/)
* With docker compose plugin installed : [Install Docker Compose](https://docs.docker.com/compose/install/)

1. Go to docker directory (`cd docker`)
2. Run Docker Compose (`docker compose up`)
3. Navigate to `http://localhost` or `http://127.0.0.1` (Don't use `https`)

## Option 2
Don't forget to install your node_modules before starting (`npm install`).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Architecture of the project 

* `shared` folder: contains every reusable components
* `pages` folder: contains components used for routing
* `core` folder: contains the business logic
