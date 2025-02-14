# Stage 1: Build React App
# FROM node:22 as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .


# # Ensure build files are created
# RUN npm run build && ls -lah /app/dist  # Use `build/` for CRA, `dist/` for Vite

# # Stage 2: Serve with NGINX
# FROM nginx:latest
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
# Stage 1: Build React App
FROM node:22 as build
WORKDIR /app
# Copy only package.json first, then install dependencies
COPY package*.json ./
RUN npm install

# Force copy app
COPY . .
# Ensure build files are created
RUN npm run build && ls -lah /app/dist  # Debugging step

# Stage 2: Serve with NGINX
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]