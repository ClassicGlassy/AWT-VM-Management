# Use a Node.js base image
FROM node:22-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite app
RUN npm run build

# Expose the port Vite preview server will use
EXPOSE 4173

# Run the Vite preview server
CMD ["npm", "run", "preview"]
