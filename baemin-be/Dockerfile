# Use the official Node.js image as the base image
FROM node:20

# Create and set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies with increased network timeout to handle network issues
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the project (make sure this step works without errors)
RUN yarn build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/main.js"]
