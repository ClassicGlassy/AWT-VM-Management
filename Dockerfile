# Stage 1: Build the React Application
# Using Node JS 22 Alpine version
FROM node:22-alpine AS build_image

# Set the working directory inside the container
WORKDIR /app/vm-manager

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite project
RUN npm run build


# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy the built files from the build stage to Nginx's default directory
# Update this path to match your production build output
COPY --from=build_image /app/vm-manager/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose PORT to Host Machine
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]