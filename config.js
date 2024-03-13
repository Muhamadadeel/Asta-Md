/*
First, it imports the fs-extra and child_process modules. The fs-extra module provides additional functionalities to the built-in fs module, while the child_process module is used to spawn new processes.

Next, it checks if the config.env file exists and loads the environment variables from it using the dotenv module.

Then, it sets up various global variables, such as owner, mongodb, port, blockJids, allowJids, and others. These variables are used throughout the bot code and can be overridden by setting the corresponding environment variables.

After that, it exports an object containing various configuration options, such as sessionName, botname, botbgm, ownername, read_status, and others. These options are used to configure the behavior of the bot.


*/
/////////////////////////////
/////////////////////////
//////////////////
///////////////
/////////
/////
const fs = require('fs-extra')
const { spawn } = require('child_process')
if (fs.existsSync('config.env')) require('dotenv').config({ path: __dirname+'/config.env' })


//═══════[Required Variables]════════\\
global.owner = process.env.OWNER_NUMBER || '2348039607375';
global.mongodb = process.env.MONGODB_URI || "mongodb+srv://asta:astamd@cluster0.qbodard.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ;
global.port = Math.floor(Math.random() * 10000) + 5000;
global.audio = '' ; 
global.video = '' ;
global.blockJids = process.env.BLOCK_JID ||'120363023983262391@g.us' ;
global.allowJids = process.env.ALLOW_JID ||'120363022922797633@g.us' ;
global.email = process.env.EMAIL || '';
global.github = process.env.GITHUB || 'https://github.com/Astropeda/whatsapp-bot';
global.location = process.env.LOCATION || '';
global.timezone = process.env.TIME_ZONE || '';
global.gurl = '' ;
global.sudo =  process.env.SUDO || "" ;
global.devs = "";
global.website = '' ;
global.THUMB_IMAGE = process.env.THUMB_IMAGE || 'https://i.imgur.com/dMwGOUP.jpeg' ;
module.exports = {
  sessionName: process.env.SESSION_ID || '',      //Put Your Session Id Here
  botname: process.env.BOT_NAME || '',
  botbgm: process.env.BOT_BGM || 'false',
  ownername:  process.env.OWNER_NAME || ``,
  author:  process.env.PACK_AUTHER || '', 
  read_status : process.env.AUTO_READ_STATUS || 'true',
  save_status : process.env.AUTO_SAVE_STATUS || 'true',
  packname:  process.env.PACK_NAME || "" ,
  autoreaction: process.env.AUTO_REACTION || 'false',
  antibadword : process.env.ANTI_BAD_WORD || '',
  alwaysonline: process.env.ALWAYS_ONLINE || 'false',
  antifake :   process.env.FAKE_COUNTRY_CODE ||'null',
  readmessage: process.env.READ_MESSAGE || 'false',
  readcmds : process.env.READ_COMMANDS || 'false',
  HANDLERS: process.env.PREFIX || ',',
  warncount : process.env.WARN_COUNT || 3,
  disablepm: process.env.DISABLE_PM || "true",
  MsgsInLog:process.env.MSGS_IN_LOG ||'false',
  pmMsgsInLog:process.env.PM_MSGS_IN_LOGS ||'false',
  levelupmessage: process.env.LEVEL_UP_MESSAGE || 'false',
  antilink_values: process.env.ANTILINK_VALUES || 'https://chat.whatsapp.com',
  BRANCH: process.env.BRANCH || 'main',
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
  HEROKU_API_KEY: process.env.HEROKU_API_KEY,
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "Nh4iTxEH5k3vmHugFqoYktGM",
  caption :process.env.CAPTION || "ASTA-MD",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ||'' ,
  VERSION: process.env.VERSION || 'v.0.0.3',
  LANG: process.env.THEME || 'ASTA',
  menu : process.env.MENU || '', /** 1, 2, 3 **/
  WORKTYPE: process.env.WORKTYPE || process.env.MODE || 'private'
};

let file = require.resolve(__filename) 

fs.watchFile(file, () => {
  console.log(`Update '${__filename}'`)
  
  const subprocess = spawn(process.argv.shift(), process.argv, {
    cwd: process.cwd(),
    detached : true,
    stdio: 'inherit'
  })
  
  subprocess.unref()
})