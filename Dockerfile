# Stage 1: Build React App
FROM node:22 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html

