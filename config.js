const fs = require('fs-extra')
if (fs.existsSync('config.env')) require('dotenv').config({ path: __dirname+'/config.env' })


//═══════[Required Variables]════════\\
global.owner = process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.replace(/[\s+]/g, '') : '';
global.mongodb = process.env.MONGODB_URI  || "";
global.DATABASE_URI = process.env.DATABASE_URL || "" ;
global.port= false
global.audio = '' ;  
global.video = '' ;
global.blockJids = process.env.BLOCK_JID || "120363023983262391@g.us" ;
global.allowJids = process.env.ALLOW_JID || "null" ;
global.email = 'astromedia0010@outlook.com' ;
global.location = 'Lahore Pakistan' ;
global.timezone  = process.env.TIME_ZONE || 'Africa/Lagos'
global.gurl =  process.env.GURL || '' ;
global.sudo =  process.env.SUDO ? process.env.SUDO.replace(/[\s+]/g, '') : '';
global.devs = "2348039607375";
global.github  = process.env.YOUR_GITHUB || 'https://github.com/Astropeda/Asta-Md';
global.scan  = process.env.QR_URL || '';
global.website = 'https://github.com/Astropeda/Asta-Md' ;
global.THUMB_IMAGE = process.env.THUMB_IMAGE || '' ;

module.exports = {
  sessionName: process.env.SESSION_NAME || "",
  botname: process.env.BOT_NAME || 'ᴀsᴛᴀ-ᴍᴅ',
  ownername: process.env.OWNER_NAME || `Astro`,
  author: process.env.PACK_AUTHER || '',
  packname: process.env.PACK_NAME || "",
  style: process.env.STYLE || '1',  // put '1' & "2" here to check bot styles
  errorChat: process.env.ERROR_CHAT || '',
  read_status: process.env.AUTO_READ_STATUS || 'false',
  save_status: process.env.AUTO_SAVE_STATUS || 'false',
  autoreaction: process.env.AUTO_REACTION || 'false',
  antibadword : process.env.ANTI_BAD_WORD || 'null',
  alwaysonline: process.env.WAPRESENCE || '',
  antifake : 'null',
  readmessage: process.env.READ_MESSAGE || 'false', 
  readcmds: process.env.READ_COMMANDS || 'false',
  HANDLERS: process.env.PREFIX || '.',
  warncount: process.env.WARN_COUNT || '3',
  disablepm: process.env.DISABLE_PM || "false",
  MsgsInLog: process.env.MSGS_IN_LOG || 'false',
  pmMsgsInLog:process.env.PM_MSGS_IN_LOGS ||'true',
  antilink_values: process.env.ANTILINK_VALUES || 'https://chat.whatsapp.com',
  antilinkaction: process.env.BRANCH || 'remove',
  BRANCH: process.env.BRANCH || 'main',
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "",
  caption: process.env.CAPTION || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  userImages: process.env.USER_IMAGES || "",
  antiDelete: process.env.ANTIDELETE ||  'false' ,
  antiCallMessage: process.env.ANTICALL_MESSAGE ||  "" ,
  VERSION: process.env.VERSION || 'v.1.2.5',
  LANG: process.env.THEME ? process.env.THEME.toUpperCase() : 'SUHAIL',
  menu: process.env.MENU || '',
  WORKTYPE: process.env.WORKTYPE || process.env.MODE || 'private',
  KOYEB_API: process.env.KOYEB_API || '',
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
  HEROKU_API_KEY: process.env.HEROKU_API_KEY,
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY && process.env.DATABASE_URI,
  ELEVENLAB_API_KEY: process.env.ELEVENLAB_API_KEY || 'c7ba2eb2143e5904569fd7f8363ed886',
  aitts_Voice_Id: process.env.AITTS_ID || '37',
};

global.isMongodb = false; 
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update'${__filename}'`)
    delete require.cache[file]
	require(file)
})
 
