FROM node:18-alpine
WORKDIR /app

# Install dependencies (including dev dependencies for build, but pruned later)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the port
EXPOSE 8080

# Start the server
CMD ["npm", "start"]