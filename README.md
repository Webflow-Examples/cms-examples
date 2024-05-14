# Webflow CMS API Examples

Welcome to the Webflow CMS API Examples repository! This repository is designed to help developers get started with the Webflow CMS API by providing both frontend and backend examples.

## Table of Contents

- [Webflow CMS API Examples](#webflow-cms-api-examples)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Setup](#setup)
  - [Authentication](#authentication)
  - [Running the Example](#running-the-example)

## Overview

This repository contains examples to introduce developers to the Webflow CMS API. The project is split into two main parts:

- **Frontend**: A React project that allows users to interact with the backend using interactive dropdowns, buttons, and forms to make API calls and retrieve information about the Webflow site and collections.
- **Backend**: An Express server that authenticates users through an authentication screen, stores tokens in a SQLite database, and makes API calls to Webflow, returning the responses to the frontend.

## Frontend

The frontend is a React project that provides a user-friendly interface for making API calls to the Webflow CMS. Users can interact with various elements like dropdowns, buttons, and forms to send requests to the backend.

## Backend

The backend is an Express server that handles user authentication and API requests. It performs the following tasks:

- Authenticates users through an authentication screen.
- Stores tokens securely in a SQLite database.
- Makes API calls to the Webflow CMS and returns the responses to the frontend.

## Setup

To get started with this project, follow the steps below:

1. **Clone the repository**:
   \`\`\`sh
   git clone https://github.com/your-username/webflow-cms-api-examples.git
   cd webflow-cms-api-examples
   \`\`\`

2. **Install dependencies**:
   \`\`\`sh
   npm install
   \`\`\`

3. **Set up NGROK**:
   - Ensure you have an NGROK account and get your NGROK auth token.
   - Store your NGROK credentials in your environment variables:
     \`\`\`sh
     export NGROK_AUTH_TOKEN=your-ngrok-auth-token
     \`\`\`

## Authentication

To authenticate the app, some setup is required in the Webflow app dashboard:

1. **Add the correct scopes**: Make sure the app has the following scopes:

   - `sites:read`
   - `cms:read`
   - `cms:write`

2. **Configure the Redirect URI**:
   - Once the app is running, you will be provided with a Redirect URI.
   - Input this URI into the Redirect URI settings in the app dashboard.

## Running the Example

To start the project, run the following command:
\`\`\`sh
npm start
\`\`\`

This will start both the frontend and backend servers. With NGROK set up, a secure tunnel will be established, and you will be able to access the application.

---

Feel free to explore and modify the code to better understand how to interact with the Webflow CMS API. If you have any questions or run into issues, please open an issue in this repository.

Happy coding!
