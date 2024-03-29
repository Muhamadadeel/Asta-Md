const fs = require('fs-extra')
if (fs.existsSync('.env')) require('dotenv').config({ path: __dirname+'/.env' })
//=========[IMPORTANT VARS]=========================\\
global.SESSION_ID = process.env.SESSION_ID ||  "" ;
global.DATABASE_URL = process.env.DATABASE_URL || "";
global.mongodb= process.env.MONGODB_URI || "";
global.appUrl=process.env.APP_URL || "";
global.timezone= process.env.TZ || process.env.TIME_ZONE || "Africa/Lagos";
global.sudo = process.env.SUDO ? process.env.SUDO.replace(/[\s+]/g, '') : "2348039607375";
global.menuImg= process.env.USER_IMAGES || "https://i.imgur.com/lIo3cM2.jpeg,https://i.imgur.com/OQOH4Gn.jpeg"
global.owner= process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.replace(/[\s+]/g, '') : "2348039607375";
global.reset = process.env.RESET   || "false"; 
global.devs = process.env.DEVS || "",
global.THUMB_IMAGE = process.env.THUMB_IMAGE || process.env.IMAGE || "https://i.imgur.com/dMwGOUP.jpeg" ;
//=========[ASTA MD WHATSAPP BOT]====================\\


//=========[OPTIONAL VARS]==============================\\
global.allowJids= process.env.ALLOW_JID || "null" 
global.blockJids= process.env.BLOCK_JID || "null"
global.github=process.env.GITHUB|| "https://github.com/Astropeda/Asta-Md";
global.gurl  =process.env.GURL  || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z/209";
global.website=process.env.GURL || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z/209" ; 
//=========[ASTA MD WHATSAPP BOT]===============================\\


//=============[MESSAGE VARS]===================\\
global.goodbye = process.env.GOODBYE || "false"; 
global.welcome  = process.env.WELCOME || "false"; 
global.readcmds = process.env.READ_COMMAND || "false"
global.readmessage = process.env.READ_MESSAGE || "false"
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "2348039607375,923xxxxxxxx";
global.read_status = process.env.AUTO_READ_STATUS || "false"
global.save_status = process.env.AUTO_SAVE_STATUS || "false"
global.save_status_from =  process.env.SAVE_STATUS_FROM  || "null,923xxxxxxxx";
global.read_status_from =  process.env.READ_STATUS_FROM  ||  "2348039607375,923xxxxxxxx";
global.messagetype = process.env.STYLE   || '4'
global.warncount = process.env.WARN_COUNT || 3
//===========[ASTA MD WHATSAPP BOT]=====================\\

//===========[OPTIONAL VARS]============================\\
global.disablegroup = process.env.DISABLE_GROUPS || "false", 
global.disablepm = process.env.DISABLE_PM || "false"
global.MsgsInLog = process.env.MSGS_IN_LOG|| "true"
global.waPresence= process.env.WAPRESENCE ||  "online" ; 
//=========[ASTA MD WHATSAPP BOT]================\\

//===========[API STUFF DON'T TOUCH ANYWAYS]=============\\
global.api_smd = "https://api-smd-1.vercel.app"
global.scan = "https://gnime-qr.onrender.com";
//===========[ASTA MD WHATSAPP BOT]====================\
module.exports = {
  menu: process.env.MENU || "", // menu1, menu2 ONLY or 1 or 2
  HANDLERS: process.env.PREFIX  || ".",
  BRANCH  : process.env.BRANCH  || "main",
  VERSION : process.env.VERSION || "1.3.1",
  caption : process.env.CAPTION || "©sᴜʜᴀɪʟ²²¹-ᴍᴅ" ,
  author : process.env.PACK_AUTHER|| "Asta-Md",
  packname: process.env.PACK_NAME || "♥️",
  botname : process.env.BOT_NAME  || "𝘼𝙎𝙏𝘼 𝙈𝘿",
  ownername:process.env.OWNER_NAME|| "It'x Astropeda",
  errorChat : process.env.ERROR_CHAT || "",
  KOYEB_API : process.env.KOYEB_API  || "false",
  REMOVE_BG_KEY : process.env.REMOVE_BG_KEY  || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME:process.env.HEROKU_APP_NAME|| "",
  antilink_values:process.env.ANTILINK_VALUES|| "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  aitts_Voice_Id : process.env.AITTS_ID || "37",
  ELEVENLAB_API_KEY: process.env.ELEVENLAB_API_KEY  || "",
  WORKTYPE: process.env.WORKTYPE || process.env.MODE|| "private",
  LANG: ( process.env.THEME ||  "Asta"  ).toUpperCase(),
};
global.rank = "updated"
global.isMongodb = false; 
let file = require.resolve(__filename)
fs.watchFile(file, () => { fs.unwatchFile(file);console.log(`Update'${__filename}'`);delete require.cache[file];	require(file); })