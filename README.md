# AccessWorld Tech Virtual Machine Management

This project is a Virtual Machine (VM) management platform built with React and Vite. It provides a user-friendly interface for registering new users, logging in, creating and destroying virtual machines. Containerized with Docker, this application is optimized for production deployment, ensuring efficient performance and resource utilization.

## Table of Contents

  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Deployment](#deployment)
  - [Configuration](#configuration)

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
