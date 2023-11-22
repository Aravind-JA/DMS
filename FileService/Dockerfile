# Use the official Node.js image as the base image
FROM node:alpine

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application when the container starts
CMD ["node", "index.js"]
