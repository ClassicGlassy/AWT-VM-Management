# AccessWorld Tech Virtual Machine Management

This project is a Virtual Machine (VM) management platform built with React and Vite. It provides a user-friendly interface for registering new users, logging in, creating and destroying virtual machines. Containerized with Docker, this application is optimized for production deployment, ensuring efficient performance and resource utilization.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [NGINX (Optional - Production)](#nginx-optional-production)

## Prerequisites

- **Docker** (installed and running)
- **Git** (for cloning the repository)
- **Node.js** and **npm** (for local development, if needed)

## Installation

To get started with the project, follow these steps:

1.  **Clone the Repository:**

    First, clone the repository and navigate to the project directory:

    ```bash
    git clone https://github.com/ClassicGlassy/AWT-VM-Management.git
    cd AWT-VM-Management
    ```

2.  **Environment Variables:**

    Create a `.env` file in the root of the project if it does not already exist. Copy the parameters from the `.env.example` file and update them accordingly:

    ```ini
    VITE_BASE_ENDPOINT = "http://localhost" # Backend API endpoint
    VITE_APP_MODE = "production" # or "development"
    ```

    Make sure to modify the **`VITE_BASE_ENDPOINT`** to match the API endpoint you will be using.

3.  **Build the Docker Image:**

    To build the Docker image, run the following command in the root directory of the project (where the Dockerfile is located):

    ```bash
    docker build -t awt-vm-management .
    ```

    Optional flags:

    - `-t <image-name>:<tag>`: Tag the image.
    - `--no-cache`: Rebuild the image without using cached layers.

    ```bash
    docker build -t awt-vm-management:latest .
    docker build --no-cache -t awt-vm-management:latest .
    ```

    > Note: Ensure that Docker is running on your machine and you have the necessary permissions to build images.

## Deployment

Once your Docker image is built, you can deploy it using the following steps:

1.  **Run the Docker Container:**

    Run the following command to start the Docker container in detached mode (running in the background):

    ```bash
    docker run -d -p 80:80 awt-vm-management
    ```

    After the container starts, you can access the application by navigating to [`http://localhost`](http://localhost:80) in your browser.

## Configuration

- **`VITE_BASE_ENDPOINT`:** Specifies the URL of the backend API. This application relies on a separate backend API service for its data and functionality. Ensure this variable points to the correct address of your running API.
- **`VITE_APP_MODE`:** Sets the application mode (production or development).

  Example `.env` configuration:

  ```ini
  VITE_BASE_ENDPOINT = "http://api.yourdomain.com"  # Set the API endpoint here.
  VITE_APP_MODE = "production"  # Set to "development" for local testing.
  ```

## NGINX (Optional - Production)

For production deployments, it is highly recommended to use NGINX as a reverse proxy. This improves performance, security, and allows for advanced configurations.

1.  **Create `nginx.conf`:**

    Create a file named `nginx.conf` in your project directory with the following configuration:

    ```nginx
    server {
        listen 80;
        server_name yourdomain.com; # Replace with your domain

        location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        # Security Headers
        add_header X-Frame-Options "SAMEORIGIN";
        # add_header X-XSS-Protection "1; mode=block"; # Deprecated, use CSP instead
        add_header X-Content-Type-Options "nosniff";

        # Optional: Custom error page for 404 errors (if you want to show a custom HTML page for some cases)
        error_page 404 /index.html;  # Serve index.html in case of 404 errors (handled by React Router)

    }
    ```

    > **Note:** Replace `yourdomain.com` with your actual domain or IP address. **Ensure you validate your `nginx.conf` before deploying to a production environment.**

2.  **Update Dockerfile (Optional):**

    If you want to include NGINX in your Docker image, you can modify your `Dockerfile` as follows. Otherwise you can run a seperate nginx container, and point it to your running application container.

    ```dockerfile
    # Stage 1: Build the React Application
    FROM node:22-alpine AS build

    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    RUN npm run build

    # Stage 2: Serve with NGINX
    FROM nginx:alpine

    COPY --from=build /app/dist /usr/share/nginx/html
    COPY nginx.conf /etc/nginx/conf.d/default.conf

    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    ```

3.  **Rebuild and Run (If Dockerfile updated):**

    If you updated your Dockerfile, rebuild the image:

    ```bash
    docker build -t awt-vm-management .
    docker run -d -p 80:80 awt-vm-management
    ```

    If running a seperate NGINX container, you will need to configure the nginx container to point to the running application container.
