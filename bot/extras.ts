declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      APP_URL: string;
      MONGODB_URI: string;
      ALLOW_JID: string;
      BLOCK_JID: string;
      DATABASE_URL: string;
      TZ: string;
      TIME_ZONE: string;
      GITHUB: string;
      GURL: string;
      THUMB_IMAGE: string;
      IMAGE: string;
      CAPTION: string;
      BUTTONS: string;
      MENU_BTN: string;
      SUDO: string;
      OWNER_NUMBER: string;
      STYLE: string;
      FLUSH: string;
      GOODBYE: string;
      WELCOME: string;
      WARN_COUNT: string;
      DISABLE_PM: string;
      DISABLE_GROUPS: string;
      MSGS_IN_LOG: string;
      USER_IMAGES: string;
      WAPRESENCE: string;
      READ_COMMAND: string;
      READ_MESSAGE: string;
      READ_MESSAGE_FROM: string;
      AUTO_READ_STATUS: string;
      AUTO_SAVE_STATUS: string;
      SAVE_STATUS_FROM: string;
      READ_STATUS_FROM: string;
      SESSION_ID: string;
      MENU: string;
      PREFIX: string;
      BRANCH: string;
      VERSION: string;
      PACK_AUTHER: string;
      PACK_NAME: string;
      BOT_NAME: string;
      OWNER_NAME: string;
      ERROR_CHAT: string;
      KOYEB_API: string;
      REMOVE_BG_KEY: string;
      OPENAI_API_KEY: string;
      HEROKU_API_KEY: string;
      HEROKU_APP_NAME: string;
      ANTILINK_VALUES: string;
      HEROKU: string;
      WORKTYPE: string;
      MODE: string;
      THEME: string;
      ELEVENLAB_API_KEY: string;
      AITTS_ID: string;
    }
  }
}

global.port =  undefined;
global.appUrl = '';
global.email = 'astromedia0010@gmail.com';
global.location = 'Astro,World';

global.mongodb =  '';
global.allowJids =  'null';
global.blockJids = 'null';
global.DATABASE_URL = '';

global.timezone =  'Africa/Lagos';
global.github =  'https://github.com/Astropeda/Asta-Md';
global.gurl =  'https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z';
global.website =  'https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z';
global.THUMB_IMAGE =  'https://i.imgur.com/JMsAFRD.jpeg';
global.caption =  'αѕтα-м∂ 2024';
global.BUTTONS =  '1';

global.devs = '2348039607375';
global.sudo =  '2348039607375';
global.owner =  '2348039607375';
global.style = '2';
global.flush =  'false';
global.gdbye =  'false';
global.wlcm =  'false';

global.warncount =  '3';
global.disablepm =  'false';
global.disablegroup =  'false';

global.MsgsInLog =  'true';
global.userImages =
  'https://i.imgur.com/mHEqQgr.jpg,https://i.imgur.com/lSdca7B.jpg,https://i.imgur.com/XakNh3r.jpg,https://i.imgur.com/UslG8eB.jpg,https://i.imgur.com/0OQxTyt.jpg,https://i.imgur.com/MJCmdiA.jpg,https://i.imgur.com/K7zFZl2.jpg';
global.waPresence =  'online';

//========================= [ AUTO READ MSGS & CMDS ] =========================\\
global.readcmds =  'false';
global.readmessage =  'false';
global.readmessagefrom =  '2348039607375';

global.read_status =  'false';
global.save_status =  'false';
global.save_status_from =  '2348039607375';
global.read_status_from =  '2348039607375';

global.api_smd = 'https://api-amd.onrender.com';
global.scan = 'https://suhail-md-vtsf.onrender.com';

global.SESSION_ID =  '';

interface Config {
  menu: string;
  HANDLERS: string;
  BRANCH: string;
  VERSION: string;
  caption: string;
  author: string;
  packname: string;
  botname: string;
  ownername: string;
  errorChat: string;
  KOYEB_API: string;
  REMOVE_BG_KEY: string;
  OPENAI_API_KEY: string;
  HEROKU_API_KEY: string;
  HEROKU_APP_NAME: string;
  antilink_values: string;
  HEROKU: string;
  WORKTYPE: string;
  LANG: string;
}
const config: Config = {
  menu:  'v1',
  HANDLERS:  '/',
  BRANCH:  'main',
  VERSION:  '3.0.0',
  caption: global.caption || 'αѕтα-м∂ 2024',
  author: 'αѕтяσ',
  packname:  'αѕтяσ',
  botname: 'ᴀsᴛᴀ-ᴍᴅ',
  ownername:  'αѕтяσ',
  errorChat:  '',
  KOYEB_API:  'false',
  REMOVE_BG_KEY:  '',
  OPENAI_API_KEY:  '',
  HEROKU_API_KEY:  '',
  HEROKU_APP_NAME: '',
  antilink_values:  'all',
  HEROKU: "",
  WORKTYPE:  'private',
  LANG: ('main').toUpperCase(),
  };
  global.ELEVENLAB_API_KEY =  '';
  global.aitts_Voice_Id =  '37';
  global.rank = 'updated'; // Don't Touch
  global.isMongodb = false; // Don't Touch Else Bot Won't Work