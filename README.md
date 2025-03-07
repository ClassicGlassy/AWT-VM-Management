# AccessWorld Tech Virtual Machine Management

This project is a Virtual Machine (VM) management platform developed using React and bundled with Vite. The portal allows you to register new user, login to user and create VMs. <hr>
When you build the project using Docker, it creates a production build of the application, optimized for deployment. This build is ready to be run in a live environment, ensuring efficient performance and minimized resource usage.

## Table of Contents

- [Installation](#installation)
- [Deployment](#deployment)
- [Parameters](#parameters)

## Installation

To get started with the project, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/ClassicGlassy/AWT-VM-Management.git
cd AWT-VM-Management
```

### 2. Set up Environment Variables

Create a .env file in the root of the project if it does not already exist. Copy parameters from `.env.example` file:

```ini
VITE_BASE_ENDPOINT = "http://localhost" #Change to Endpoint of request.
VITE_APP_MODE = "production" #Change to development for testing.
```

### 3. Build the Docker Image

To build the Docker image, run the following command in the root directory of your project (where the Dockerfile is located).

```bash
docker build .
```

Additional Flags:

- _-t:_ Tag your image with a custom name and version tag.

```bash
docker build -t your-image-name:tag .
```

- _--no-cache:_ Use this flag to build the image without cache, ensuring that all layers are rebuilt from scratch.

```bash
docker build --no-cache .
```

> Note: Ensure Docker is running on your machine and that you have the necessary permissions to build images.

## Deployment

### 1. Launching Docker Container with Image

Run the following command in `terminal`:

```bash
docker run -p <PORT>:4173 <ImageHash/ ImageName>
```

It will launch the web application at [`http://localhost:<PORT>`](http://localhost)

## Parameters

There are 3 parameters that have to be configured before the build process.

- [PORT](#port)
- [BASE_ENDPOINT](#base_endpoint)
- [APP_MODE](#app_mode)

#### PORT

**PORT** specifies which port the application should run in the docker container. It can be changed in the `vite.config.js` file.

```js
server: {
    port: //Port for the application,
    host: "0.0.0.0",
  },
```

> Note: if port is changed in `vite.config.js` then Docker need to be launched using.

```bash
docker run -p <Host-PORT>:<Application-PORT> <ImageHash/ ImageName>
```

#### BASE_ENDPOINT

**ENDPOINT** specifies which URI must it communicate to request data. It can be changed in the `.env` file.

```js
VITE_BASE_ENDPOINT = "http://localhost:8080";
```

#### APP_MODE

**APP_MODE** specifies whether the application is in production or development. It can be changed in the `.env` file.

```js
VITE_APP_MODE = "production/ development";
```
