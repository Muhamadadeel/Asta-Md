const fs = require('fs-extra')
if (fs.existsSync('config.env')) require('dotenv').config({ path: __dirname+'/config.env' })


//═══════[Required Variables]════════\\
global.owner = process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.replace(/[\s+]/g, '') : '2348039607375';
global.mongodb = process.env.MONGODB_URI  || "";
global.DATABASE_URI = process.env.DATABASE_URI || "postgres://asta:Zs2YYRrhetGcfXwOgWz5SohnWzTYF7MD@dpg-cnqlvd4f7o1s73cjjfh0-a/wabot_qb6g" ;
global.port= false ; 
global.audio = '' ; 
global.video = '' ;
global.blockJids = process.env.BLOCK_JID || "120363023983262391@g.us" ;
global.allowJids = process.env.ALLOW_JID || "null" ;//'120363022922797633@g.us' ;
global.email = 'samsamsun789@gmail.com' ;
global.location = 'Lahore Pakistan' ;
global.timezone  = process.env.TIME_ZONE || 'Africa/Lagos'
global.gurl =  process.env.GURL || 'https://youtube.com/c/SuhailTechInfo' ; // add your username
global.sudo =  process.env.SUDO ? process.env.SUDO.replace(/[\s+]/g, '') : 'null,2348039607375';
global.devs = "2348039607375";
global.creator = 'Astro';
global.github  = process.env.YOUR_GITHUB || 'https://github.com/SuhailTechInfo/Suhail-Md';
global.scan  = process.env.QR_URL || 'https://replit.com/@SuhailTechInfo/Suhail-Md?v=1';
global.website = 'https://github.com/SuhailTechInfo/Suhail-Md' ;
global.THUMB_IMAGE = process.env.THUMB_IMAGE || 'https://telegra.ph/file/d5b1c3544fedc23e11a06.jpg' ;

module.exports = {
  sessionName: process.env.SESSION_ID || "Asta;;;",
  botname: process.env.BOT_NAME || 'ᴀꜱᴛᴀ ᴍᴅ ʙᴏᴛ',
  ownername: process.env.OWNER_NAME || '`ᴀꜱᴛʀᴏᴘᴇᴅᴀ`',
  author: process.env.PACK_AUTHER || 'ᴀꜱᴛᴀ ᴍᴅ',
  packname: process.env.PACK_NAME || "ᴀꜱᴛᴀ ᴍᴅ",


  
  menu: process.env.MENU || '', 
  WORKTYPE: process.env.WORKTYPE || process.env.MODE || 'private',
  menu: process.env.MENU || '', 
  style: process.env.STYLE || '1',  // 1 or 2 @MENU
  errorChat: process.env.ERROR_CHAT || '',
  read_status: process.env.AUTO_READ_STATUS || 'false',
  save_status: process.env.AUTO_SAVE_STATUS || 'false',

  autoreaction: process.env.AUTO_REACTION || 'false',  //  | 'cmd' | 'true' | 'all' |
  antibadword : process.env.ANTI_BAD_WORD || 'nobadwordokeyuntillYouPutAnWordHere',
  alwaysonline: process.env.WAPRESENCE || '', // 'unavailable' | 'available' | 'composing' | 'recording' | 'paused'
  antifake : process.env.FAKE_COUNTRY_CODE ||'212',
  readmessage: process.env.READ_MESSAGE || 'false',  
  readcmds: process.env.READ_COMMANDS || 'false',    
  HANDLERS: process.env.PREFIX || '/',
  warncount: process.env.WARN_COUNT || '3',
  disablepm: process.env.DISABLE_PM || "false",
  MsgsInLog: process.env.MSGS_IN_LOG || 'log', // "true"  to see messages , "log" to open logs messages , "false" to hide logs messages
  antilink_values: process.env.ANTILINK_VALUES || 'https://chat.whatsapp.com',
  antilinkaction: process.env.BRANCH || 'remove',
  BRANCH: process.env.BRANCH || 'main',
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "",
  caption: process.env.CAPTION || "`ᴀꜱᴛᴀ ᴍᴅ ʙᴏᴛ`",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  userImages: process.env.USER_IMAGES || "",
   antiDelete: process.env.ANTIDELETE ||  'true' ,
   antiCallMessage: process.env.ANTICALL_MESSAGE ||  "`Hey there You can't call me`" ,
  VERSION: process.env.VERSION || 'v.1.2.3',
  LANG: process.env.THEME ? process.env.THEME.toUpperCase() : 'SUHAIL',
  
  
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
 
