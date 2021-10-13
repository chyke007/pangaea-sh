#!/usr/bin/env bash

# Copy environment variable
echo "Copying env"
cp .env.example .env

# Begin package installation
echo "Installing Dependencies"
npm install 

echo "Dependencies Installed!"

# Build Files
npm run build-ts

# Run the app
npm start

echo "Server is listening..."