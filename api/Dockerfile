FROM node:18

# Create api directory
WORKDIR /home/api

# Copy source files
COPY . .
RUN npm install

# Expose port 3000
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "app.js" ]

# To build this image:
# docker build -t entradas-eventos-api .