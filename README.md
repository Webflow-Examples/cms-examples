# Webflow CMS API Examples

Welcome to the Webflow CMS API Examples repository. This repository includes both backend and frontend code samples to help developers get started with the Webflow CMS API.

## Table of Contents

- [Webflow CMS API Examples](#webflow-cms-api-examples)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Setup](#local-environment-setup)
  - [Authentication](#app-configuration)
  - [Running the Example](#running-the-example)

## Overview

This repository contains examples to introduce developers to the Webflow CMS API. The project is split into two main parts:

- **Frontend**: A React project that allows users to interact with the backend using interactive dropdowns, buttons, and forms to make calls to the backend server and retrieve information about the Webflow site and collections.
- **Backend**: An Express server that authenticates users, stores tokens in a SQLite database, and makes API calls to Webflow, returning the responses to the frontend.


## Local Environment Setup

To get started with this project, follow the steps below:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/Webflow-Examples/cms-examples.git
   cd cms-examples
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up NGROK**:
   - Ensure you have an NGROK account and get your NGROK auth token. Follow instructions on setting up and configuring your local environment using [NGROK here] (https://developers.webflow.com/data/docs/getting-started-data-clients#step-1-setup-your-local-development-environment).
   - Store your NGROK credentials in your environment variables:
     ```sh
     export NGROK_AUTH_TOKEN=your-ngrok-auth-token
     ```
4. **Create and Update Webflow App**:
   If you don't already have a Webflow app, create an app by following the directions [outlined here.](https://docs.developers.webflow.com/data/docs/register-an-app) Store your App's Client ID and Client Secret in the `.env` file in the root directory.

## App Configuration

For this code sample to work correctly, some setup is required in the Webflow App dashboard:

1. **Add the correct scopes**: Make sure your App has the following scopes:

   - `sites:read` - Allows listing and reading site information.
   - `cms:read` - Permits reading CMS content.
   - `cms:write` - Enables your App to modify CMS content. 

2. **Configure the Redirect URI**:
   - Once the App is running (see below), NGROK will display your Redirect URI in the console(Step 6 of our [local environment setup guide](https://developers.webflow.com/data/docs/getting-started-data-clients#step-1-setup-your-local-development-environment))
   - Input this URI into the Redirect URI settings in the App dashboard.

## Running the Example

To start the project, run the following command:

```sh
npm start
```

This will start both the frontend and backend servers. With NGROK set up, a secure tunnel will be established, and you will be able to access the application.

---

Explore and modify the code to learn more about the Webflow CMS API. If you have any questions or run into issues, please open an issue in this repository.

