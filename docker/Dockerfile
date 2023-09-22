### STAGE 1: Install ###
FROM node:18 AS install
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm clean-install
COPY . .

### STAGE 2: Build ###
FROM install AS build
RUN npm run build

### STAGE 3: Run ###
FROM nginx:stable-alpine AS run
RUN rm -rf /usr/share/nginx/html/*
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/olympic-games-starter /usr/share/nginx/html
