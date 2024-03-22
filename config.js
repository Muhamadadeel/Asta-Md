const fs = require('fs-extra')
if (fs.existsSync('.env')) require('dotenv').config({ path: __dirname+'/.env' })
global.audio= "" ;  
global.video= "" ;
global.port =process.env.PORT
global.appUrl=process.env.APP_URL || "" 
global.email ="astromedia0010@outlook.com"
global.location="Nigeria,Lagos."
global.mongodb= process.env.MONGODB_URI || ""
global.allowJids= process.env.ALLOW_JID || "null" 
global.blockJids= process.env.BLOCK_JID || "null"
global.DATABASE_URI = process.env.DATABASE_URL || ""
global.timezone= process.env.TZ || process.env.TIME_ZONE || "Africa/Lagos";
global.github=process.env.GITHUB|| "https://github.com/Astropeda/whatsapp-bot";
global.gurl  = process.env.GURL || "null";
global.website= process.env.GURL|| "null" ; 
global.THUMB_IMAGE = process.env.THUMB_IMAGE || process.env.IMAGE || "https://i.imgur.com/dMwGOUP.jpeg" ;
global.SESSION_ID = process.env.SESSION_ID ||  "SESSION_17_50_03_20_eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY01BRTUxalFEV1RRb2U4VVFlR0ZRT0ZpTGo1dVMrem1YQ1l0SlFTcGQyZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTEwzTUxib010WTVmR0hXNU1lZktyNUtBSTlhZitJV1BjL0xRRGU1WXFtQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtQm8vdDlmU2hpa3BkZjYyelQ3QmsvR0tuaEozbnAwRXdGclNRdW1MUzNFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1aXN0U25lUEFLS25PVXFmWXRhYjFtMWxudGh2dXY0MW1ramhJVDQ5YVhZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhGd1dNeGUzVkx5WTFDL1ZnaXlRYnl6WWtQWFM1cFFpNTk1ZU9yZWlnWFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijc3RFNhMm9ueEk3YURFbTdlelkxRlQ3OUhEVmY5Z3dTUFFzZ3M1WEV5QkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkYxUlpDbll0bXgvYlJjTTk5VUdaengwK0owTnNxUFBGQXB6dFRVRFJtTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV3A5MU9iazE4dEZRRmN1VTNFY3ZmTEZjMXUvUXcvUmdDVW9kT2dKaUZ5ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktNRk5UOUlzcldac1FyMFBNeGdNa3pnT1ErK3NuS21HbTNpUjV2QVRYSldxYmU3TU5sdjM1ZHJtVnFxTitVSEtGNlVEOEFlck1uZ2M0UHd3QzJBbUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAzLCJhZHZTZWNyZXRLZXkiOiJhNStNdTBPeXFXTDR2WjNXR3ZVamVnbUxPbjZ6OHdqcGx6Q1RrY0lsV0g4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwMjc4NjIxMTZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMEI0OUJBNDUyQzE1NzhDNTREMDA1RTYyNTNFQjc5NTgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxMDk1NzAyOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAyNzg2MjExNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzMTgyMkNFQUFBNTVFMjdDRTZBNzJGMUU1REM3RUMwNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzEwOTU3MDI5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MDI3ODYyMTE2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjE2Mzk0QTA4MzlBQ0UyODU1MENFQkYxM0M2NEJGMkM0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTA5NTcwMzZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InF1Z3FFUkNYU2NDZmhGMFh0anMwR3ciLCJwaG9uZUlkIjoiNmNmNjA5NTktZTYwOC00MjFlLWJiNzMtOTQyNWIxMjg3OWM5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InYyejJKdWpoOXhQUGxxOGdCa1NvZDkvSjlWbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwVjZydzJWODMzcFdDb2d5dmo5cFE4SFZZajg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRjZUWjc1N1oiLCJtZSI6eyJpZCI6IjIzNDkwMjc4NjIxMTY6NTdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiypnhtI/htJsg4bShypzhtIDhtJvqnLHhtIDhtJjhtJgifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0szRzdvMENFT0REN0s4R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InA4eVUrWmlxZ3NnSGQ5cU9oMEFha1d6bjUyeWlHVkZFTTlIM3IrT0JnMmM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjA4R0ZaWGJxTVowc2Z0YndVV1lRend2Y1drdU10SjZLTWpnclpjS2JFYk04ZGZKMG8wVnNrQlplc1A4MHQzbU10M3UxeUpKcDBaVHdFT1ZuQ09CVkRRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJBc3NZbVRXQ1ZrVVF2SW9ZR2thaGFRT1JtUHhZZWRkdE10TWZmR0tRUnhZcG5pVWI4eng5RU8xWm9xclQ5ZHJFR0ZtN2VBVkdhZWJnSkh5SGxYQW1Ddz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkwMjc4NjIxMTY6NTdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYWZNbFBtWXFvTElCM2Zham9kQUdwRnM1K2Rzb2hsUlJEUFI5Ni9qZ1lObiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxMDk1NzAyNywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNNWsifQ==" ;
global.devs = "2348039607375"
global.sudo = process.env.SUDO ? process.env.SUDO.replace(/[\s+]/g, '') : "null";
global.owner= process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.replace(/[\s+]/g, '') : "null";
global.custom = process.env.STYLE   || '5',  // 1,2,3,4,5
global.ssrest = process.env.SSRESET   || "false";
global.goodbyemsg = process.env.GOODBYE || "false"; 
global.welcomemsg  = process.env.WELCOME || "false";
global.warncount = process.env.WARN_COUNT || 3,
global.disablepm = process.env.DISABLE_PM || "false",
global.disablegroup = process.env.DISABLE_GROUPS || "false",
global.MsgsInLog = process.env.MSGS_IN_LOG|| "false",
global.userImages= process.env.USER_IMAGES|| "https://i.imgur.com/dMwGOUP.jpeg",
global.waPresence= process.env.WAPRESENCE ||  "online" ;
global.readcmds = process.env.READ_COMMAND || "false"
global.readmessage = process.env.READ_MESSAGE || "true"
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "null";
global.read_status = process.env.AUTO_READ_STATUS || "false"
global.save_status = process.env.AUTO_SAVE_STATUS || "false"
global.save_status_from =  process.env.SAVE_STATUS_FROM  || "null";
global.read_status_from =  process.env.READ_STATUS_FROM  ||  "null";
global.api_smd = "https://api-smd-1.vercel.app"
global.scan = "https://gnime-qr.onrender.com/";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 
░█████╗░░██████╗████████╗░█████╗░  ███╗░░░███╗██████╗░  ██████╗░░█████╗░██████╗░░░██╗██╗
██╔══██╗██╔════╝╚══██╔══╝██╔══██╗  ████╗░████║██╔══██╗  ╚════██╗██╔══██╗╚════██╗░██╔╝██║
███████║╚█████╗░░░░██║░░░███████║  ██╔████╔██║██║░░██║  ░░███╔═╝██║░░██║░░███╔═╝██╔╝░██║
██╔══██║░╚═══██╗░░░██║░░░██╔══██║  ██║╚██╔╝██║██║░░██║  ██╔══╝░░██║░░██║██╔══╝░░███████║
██║░░██║██████╔╝░░░██║░░░██║░░██║  ██║░╚═╝░██║██████╔╝  ███████╗╚█████╔╝███████╗╚════██║
╚═╝░░╚═╝╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝  ╚═╝░░░░░╚═╝╚═════╝░  ╚══════╝░╚════╝░╚══════╝░░░░░╚═╝

*/
module.exports = {
  menu: process.env.MENU || "",
  HANDLERS: process.env.PREFIX  || ".",
  BRANCH  : process.env.BRANCH  || "main",
  VERSION : process.env.VERSION || "1.3.0",
  caption : process.env.CAPTION || "`©botinfo`" ,
  author : process.env.PACK_AUTHER|| "",
  packname: process.env.PACK_NAME || "",
  botname : process.env.BOT_NAME  || "botinfo",
  ownername:process.env.OWNER_NAME|| "",
  errorChat : process.env.ERROR_CHAT || "",
  KOYEB_API : process.env.KOYEB_API  || "false",
  REMOVE_BG_KEY : process.env.REMOVE_BG_KEY  || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME:process.env.HEROKU_APP_NAME|| "",
  antilink_values:process.env.ANTILINK_VALUES|| "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  aitts_Voice_Id : process.env.AITTS_ID || "37",
  ELEVENLAB_API_KEY: process.env.ELEVENLAB_API_KEY || "",
  WORKTYPE: process.env.WORKTYPE||process.env.MODE || "private",
  LANG: process.env.THEME ? process.env.THEME.toUpperCase() : "bot",
};
global.rank = "updated"
global.isMongodb = false; 
let file = require.resolve(__filename)
fs.watchFile(file, () => { fs.unwatchFile(file);console.log(`Update'${__filename}'`);delete require.cache[file];	require(file); })
