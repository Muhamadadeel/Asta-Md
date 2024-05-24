# Asta Md - A Simple Open Sourced WhatsApp Bot Built By Astro

## Introduction

Welcome to **Asta Md**, an open-source WhatsApp bot developed by Astro. This bot leverages the latest **Baileys** library to offer a simple yet powerful interface for automating interactions on WhatsApp. Whether you're looking to automate customer service, send notifications, or simply have some fun, Asta Md is the perfect starting point.

## Features

- **Easy Setup**: Get up and running with minimal configuration.
- **Message Handling**: Automate responses to incoming messages with ease.
- **Extensible**: Easily add new features and commands to suit your needs.
- **API Integration**: Seamlessly integrate with other APIs to expand functionality.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following:

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/astro/asta-md.git
    cd asta-md
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Configure the bot:
    - Rename `.env.example` to `.env` and fill in your WhatsApp credentials.

4. Start the bot:
    ```sh
    npm start
    ```

## Usage

Once the bot is running, it will automatically connect to WhatsApp and start handling messages based on the predefined commands and handlers. You can customize and add new functionalities by editing the `commands` directory.

## Adding Commands

To add a new command:

1. Create a new file in the `commands` directory, for example `hi.js`.
2. Define the command logic using the following template:
    ```javascript
    import amd from './lib';
    
    amd(
      {
        pattern: "hi", // The Command Name
        alias: "hello" // Command Secondary Trigger
        fromMe: true, // is the message from the owner
        desc: "Send Hi Message", // Command Description
        type: "Test", // Command Category
      },
      async (message) => {
        await message.send("Hello There");
      }
    );
    ```

3. Ensure that your new command file is correctly imported and utilized within your main bot setup.

## Deploy to Node.js Platforms

### Heroku

#### Using Heroku CLI

1. Install the Heroku CLI:
    ```sh
    npm install -g heroku
    ```

2. Log in to your Heroku account:
    ```sh
    heroku login
    ```

3. Create a new Heroku app:
    ```sh
    heroku create
    ```

4. Push your code to Heroku:
    ```sh
    git push heroku main
    ```

5. Set up environment variables on Heroku:
    ```sh
    heroku config:set KEY=VALUE
    ```

#### Deploy Button

Add the following code to your README.md:

```markdown
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
```

### VS Code Spaces

1. Open your repository in VS Code.
2. Press `F1` and select `Remote-Containers: Open Folder in Container`.
3. Follow the prompts to set up your development environment.
4. Start the bot using the terminal in VS Code:
    ```sh
    npm start
    ```

### Koyeb

1. Sign in to [Koyeb](https://www.koyeb.com/).
2. Create a new App and link your GitHub repository.
3. Set up environment variables as needed.
4. Deploy your app directly from the Koyeb dashboard.

### Railway

1. Sign in to [Railway](https://railway.app/).
2. Create a new project and link your GitHub repository.
3. Configure the environment variables.
4. Deploy the project from the Railway dashboard.
