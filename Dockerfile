# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files.
COPY package.json yarn.lock ./

# Install dependencies.
RUN yarn install

# Copy the rest of your application.
COPY . .

# Build the NestJS application.
RUN yarn build

# Expose the port the app runs on.
EXPOSE 4000

# Run the web service on container startup.
CMD [ "yarn", "start:prod" ]