# Use Node.js base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3002

# Command to run the application
CMD ["node", "app.js"]

