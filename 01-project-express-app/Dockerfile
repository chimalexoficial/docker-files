FROM node:22

WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm ci

# Copy the source code of our app
COPY src/index.js index.js

# Expose application port
EXPOSE 3000

# Start application
CMD [ "node", "index.js"]