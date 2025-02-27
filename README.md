# AccessWorld Tech Virtual Machine Management

This project is a Virtual Machine (VM) management platform developed using React and bundled with Vite. The portal allows you to register new user, login to user and create VMs.

## Table of Contents

- [Installation](#installation)

## Installation

To get started with the project, follow these steps:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Node Modules

```bash
npm install
```

This will install all the necessary dependencies from the package.json file.

### 3. Set Up Environment Variables

Create a .env file in the root of the project if it does not already exist. Add the following variable:

```ini
VITE_BASE_ENDPOINT=<your-api-url>
```

Replace `<your-api-url>` with the appropriate URL for the backend API that the front end will communicate with.

### 4. Run the Development Server

To start the application locally, run:

```bash
npm run dev
```

This will start the Vite development server and you can open the app in your browser at `http://localhost:5137`.
