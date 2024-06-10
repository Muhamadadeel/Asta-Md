### ᴀꜱᴛᴀ ᴍᴅ ʙᴇᴛᴀ 3.5.0

## Introduction

Welcome to **Asta Md**, an open-source WhatsApp bot developed by Astro. This bot leverages the latest **Baileys** library to offer a simple yet powerful interface for automating interactions on WhatsApp. Whether you're looking to automate customer service, send notifications, or simply have some fun, Asta Md is the perfect starting point.

## Features

- **Easy Setup**: Get up and running with minimal configuration.
- **Message Handling**: Automate responses to incoming messages with ease.
- **Extensible**: Easily add new features and commands to suit your needs.
- **API Integration**: Seamlessly integrate with other APIs to expand functionality.

## Getting Started
### Get Your Session
#### Please Star Our Repo For Courage ❤️

This is Important To Run Your Bot

<a href="https://web-session.vercel.app/"><img title="SCAN QR" src="https://img.shields.io/badge/GET SESSION-h?color=black&style=for-the-badge&logo=msi"></a>

<a href="https://github.com/Astropeda/Asta-Md/fork"><img title="Fork Repo" src="https://img.shields.io/badge/Fork Repo-h?color=black&style=for-the-badge&logo=stackshare"></a>



### Prerequisites

For Advanced Users, make sure you have the following:

- Node.js (version 16 or higher)
- npm (Node Package Manager)
- Star & Fork Repo
- Get Your Session ID
- Put Your Session ID in `config.js` file

### Installation

##### For Example


1. Clone Your Forked Repository:
    ```sh
    git clone https://github.com/astro/asta-md.git
    cd asta-md
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Configure the bot:
    - Rename `.env.example` to `.env` and fill in your WhatsApp credentials (Only If you Didn't Config It Eariler).

4. Start the bot:
    ```sh
    npm start
    ```

## Usage

Once the bot is running, it will automatically connect to WhatsApp and start handling messages based on the predefined commands and handlers. You can customize and add new functionalities by editing the `commands` directory.

## Adding Commands

#### To create your custom new command:

1. Create a new file in the `plugins` directory, for example `hi.js`.
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

3. Ensure that your new command file is correctly imported and utilized within your main bot setup. **Apply at your own end**

## Deploy to Node.js Platforms

### Heroku

#### Heroku Docker Delpoy

#### `fixed heroku issues`

<a href="https://astropeda.github.io/delpoy-button/">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a> 

### VS Code Spaces

<a href="https://github.com/codespaces/new?skip_quickstart=true&machine=standardLinux32gb&repo=763349202&ref=main&geo=UsWest"><img title="Codespaces" src="https://img.shields.io/badge/Delpoy To Codespaces-h?color=black&style=for-the-badge&logo=GitHub"></a>


2. Press `F1` and select `Remote-Containers: Open Folder in Container`.
3. In the `config.js` file put your Session Id in `SESSION_ID` variable.
4. Start the bot using the terminal in VS Code:
    ```sh
    npm start
    ```

### Koyeb

1. Sign in to [Koyeb](https://www.koyeb.com/).
2. Create a new App and link your GitHub repository.
3. In the your forked repository make sure you out your session Id in `config.js` file
   
<a href="https://app.koyeb.com/apps/new/import-project"><img title="Deploy Koyeb" src="https://img.shields.io/badge/DEPLOY KOYEB-h?color=black&style=for-the-badge&logo=koyeb"></a>

4. Deploy your app directly from the Koyeb dashboard.

### Railway

1. Sign in to [Railway](https://railway.app/).
2. Create a new project and link your GitHub repository.

<a href="https://railway.app/"><img title="INRL-MD Deploy Koyeb" src="https://img.shields.io/badge/DEPLOY RAILWAY-h?color=black&style=for-the-badge&logo=railway"></a>

   
3. Configure the environment variables from your github forked repository.
4. Deploy the project from the Railway dashboard.


 ### Termux Setup

 ```bash
termux-setup-storage
apt update
apt upgrade
pkg update && pkg upgrade
pkg install bash
pkg install libwebp
pkg install git -y
pkg install nodejs -y 
pkg install ffmpeg -y 
pkg install wget
pkg install imagemagick -y
git clone Your Forked Github Url
cd Asta-Md
npm i
npm start
```

## Contributing

We welcome contributions from the community! To contribute, please follow the guidelines provided [here](https://github.com/Astropeda/Asta-Md/blob/main/CONTRIBUTING.md):

1. Fork the repository.
2. Create a new branch with your feature or bugfix.
3. Make your changes and commit them with clear messages.
4. Push your branch and open a Pull Request.

## License

Asta Md is released under the [GNU General Public License v2.0](https://github.com/Astropeda/Asta-Md/blob/main/LICENSE).

## Contact

For any questions or feedback, feel free to contact us via Telegram:

- [Astropeda](http://t.me/Astropeda) (Direct contact)
- [Asta Support](https://t.me/astasupportgc) (Support channel)
