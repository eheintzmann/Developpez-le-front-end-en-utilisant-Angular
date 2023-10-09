[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)

# OlympicGamesStarter

The goal of OlympicGamesStarter is to provide users with a dashboard
allowing them to view information from previous Olympic Games
(number of medals by country, etc.).

## Technologies
- Typescript
- HTML
- CSS
- Angular 16
- Node.js 18 & npm
- Docker & Docker Compose

## Getting started
Don't forget to clone the project repository with [git](https://git-scm.com/).

`git clone https://github.com/eheintzmann/Developpez-le-front-end-en-utilisant-Angular.git`

### Option 1 : Docker Compose
#### Install dependencies

1. Install [Docker](https://docs.docker.com/get-docker/)
2. Install [Docker Compose](https://docs.docker.com/compose/install/)

#### Run the application

1. Go to docker directory (`cd docker`)
2. Run Docker Compose (`docker compose up`)
3. Navigate to `http://localhost` or `http://127.0.0.1` (Don't use `https`)

### Option 2 : npm scripts
#### Install dependencies
1. Install [Node.js](https://nodejs.org/) (>= 18) which includes [Node Package Manager](https://www.npmjs.com/get-npm)
2. Install your node_modules  (`npm install`)

#### Run the application
1. Run `npm run start` for a Development server
2. Navigate to `http://localhost:4200/`  
The application will automatically reload if you change any of the source files

#### Building the application

Run `npm run build` to build the project.
The build artifacts will be stored in the `dist/` directory.

#### Testing the application

Don't forget to install [Chrome](https://www.google.com/chrome/) browser before starting.

Run `npm run test` to test the project.

#### Updating dependencies

You can update the tool dependencies by running `npm update`.

## Architecture of the project 

* `shared` folder: contains every reusable components
* `pages` folder: contains components used for routing
* `core` folder: contains the business logic
