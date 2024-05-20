const fs = require('fs-extra')
if (fs.existsSync('.env')) require('dotenv').config({ path: __dirname+'/.env' })

global.port =process.env.PORT
global.appUrl=process.env.APP_URL || ""
global.email ="astromedia0010@gmail.com"
global.location="Astro,World"


global.mongodb= process.env.MONGODB_URI || ""
global.allowJids= process.env.ALLOW_JID || "null" 
global.blockJids= process.env.BLOCK_JID || "null"
global.DATABASE_URL = process.env.DATABASE_URL || ""

global.timezone= process.env.TZ || process.env.TIME_ZONE || "Africa/Lagos";
global.github=process.env.GITHUB|| "https://github.com/Astropeda/Asta-Md";
global.gurl  =process.env.GURL  || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z";
global.website=process.env.GURL || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z" ; 
global.THUMB_IMAGE = process.env.THUMB_IMAGE || process.env.IMAGE || "https://i.imgur.com/JMsAFRD.jpeg" ;
global.caption = process.env.CAPTION || global.caption || "αѕтα-м∂ 2024" 
global.BUTTONS = process.env.BUTTONS || process.env.MENU_BTN || "1";


global.devs = "2348039607375"
global.sudo = process.env.SUDO ? process.env.SUDO.replace(/[\s+]/g, '') : "2348039607375";
global.owner= process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.replace(/[\s+]/g, '') : "2348039607375";




//========================= [ BOT SETTINGS ] =========================\\
global.style = process.env.STYLE   || '2'
global.flush = process.env.FLUSH   || "false"; 
global.gdbye = process.env.GOODBYE || "false"; 
global.wlcm  = process.env.WELCOME || "false";

global.warncount = process.env.WARN_COUNT || 3
global.disablepm = process.env.DISABLE_PM || "false"
global.disablegroup = process.env.DISABLE_GROUPS || "false",

global.MsgsInLog = process.env.MSGS_IN_LOG|| "true" 
global.userImages= process.env.USER_IMAGES || "https://i.imgur.com/mHEqQgr.jpg,https://i.imgur.com/lSdca7B.jpg,https://i.imgur.com/XakNh3r.jpg,https://i.imgur.com/UslG8eB.jpg,https://i.imgur.com/0OQxTyt.jpg,https://i.imgur.com/MJCmdiA.jpg,https://i.imgur.com/K7zFZl2.jpg"
global.waPresence= process.env.WAPRESENCE ||  "online" ;


//========================= [ AUTO READ MSGS & CMDS ] =========================\\
global.readcmds = process.env.READ_COMMAND || "false"
global.readmessage = process.env.READ_MESSAGE || "false"
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "2348039607375";


global.read_status = process.env.AUTO_READ_STATUS || "false"
global.save_status = process.env.AUTO_SAVE_STATUS || "false"
global.save_status_from =  process.env.SAVE_STATUS_FROM  || "2348039607375";
global.read_status_from =  process.env.READ_STATUS_FROM  ||  "2348039607375";

global.api_smd = "https://api-amd.onrender.com"
global.scan = "https://suhail-md-vtsf.onrender.com";


global.SESSION_ID = process.env.SESSION_ID ||  "Astro;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUd0YVo3ODZnM1I3SWlaNVFwcXJhVG9jOXJXbDI2UlZ2clJESWVGUVBuTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSDBVclRlK1FpT0JzNWVGd01JbUFiWEE1SE5zR1cvTXJpd2UzTDZSTFZ5QT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1SCtLcVM4ejBkSDlLWHVUVUVLVWgzNmM2SkhMV2o5eVZETTBEdkxsMDE0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLMU9rd3N1ZlZzdkF6d29xMGRldW95MDZ3eUtabFFBRG01cFlzWGowNlRRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVOWWZ0SGtsczZCczlUMVVITTRjQ0tMaE9EenlIZjRjSU5qa1VsMU1jRVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxoNUZ5NEZKWnZBTysreDNkUjBjaU80T0hIY3J3bVRXekJTODRlbWQyajA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0pPd20zQ3RjQlJHd2Y5dGxEM0lzaWZWeEtmaTZyTjlLQ0NjRGZFZ0xrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZm9qcVBIYUtkcGVTK3BFN0tnTm5acHBNM3lpRkVNR3g5cFdUN29tS09pRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImcrOWg4SGNucGxXNVhnZGlhQ0xzdTFUTG5MSHc2T3ZoM0owT3ZKNmN0aXZLWCtNdGNHS3RncDVRQ2VYVWx5MFo5Q1JVbVAvVDdyVW5hTURneXIrbGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTksImFkdlNlY3JldEtleSI6Ii9kM281QUswS3E4bnRFdGlDNlRob0lmQS93a0lNem9aY1AvMHI5SFJxTUU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAyNzg2MjExNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwNUUyRDExM0E5RUUwQzU3RERGODUzQTM0QUE4MEU2NSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE1MzU1MjQ2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MDI3ODYyMTE2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjE5QTRENkFBM0QyOTUwQjc1MUIxMzdDQjNDMkY0QTRFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTUzNTUyNDZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImJONWIzWlRhUm1taHZub1BsSUdFUlEiLCJwaG9uZUlkIjoiMTQwYzM5YTgtYTA4Yy00NzFjLWJmNGMtMDBmNDVjYWI5MzljIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlmZkhVYUpJaU9KMytPUGgzRXBlTEsyRzNMQT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsZ1d4YUQyNDYrbnBDUGdTcHQ0SUtSa3JKVUU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTUtCNFZHRVAiLCJtZSI6eyJpZCI6IjIzNDkwMjc4NjIxMTY6NDdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQXN0cm9wZWRhIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLaVU2Y3dDRU43OCtMRUdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ0U3dsSXppNmovTnNmS1o3cnFnS1RRM0lLRXJYQUJJRzk2ZllpL2FxRlV3PSIsImFjY291bnRTaWduYXR1cmUiOiJxMG1OWE5mTGNVNlkxeWJ2QmdwTW82Rk8zQUI5d1BiUGY1OGlLOTJRUnRLelhWNk83S05Rc05mVzNXN0tLTUtYaVVYbXZQMEpodytqT0hYSEwyeU1CUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiLzJjQzNSZUlOVmlXZitoV0Q2VGxERk9WeE5tVzV6T2piajBYdHZKbG4xamJoaW52K0lFZVcwYTRqL3JuLzZXdGFWZTZyYkpBSm54UXl3RXY5V1JkaHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDI3ODYyMTE2OjQ3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJVc0pTTTR1by96Ykh5bWU2Nm9DazBOeUNoSzF3QVNCdmVuMkl2MnFoVk0ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTUzNTUyNDMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTUtnIn0="


module.exports = {

  menu: process.env.MENU || "v1", 

  HANDLERS: process.env.PREFIX  || "/",
  BRANCH  : process.env.BRANCH  || "main",
  VERSION : process.env.VERSION || "3.0.0",
  caption : global.caption || "αѕтα-м∂ 2024" , 
 
  author : process.env.PACK_AUTHER|| "αѕтяσ",
  packname: process.env.PACK_NAME || "αѕтяσ",
  botname : process.env.BOT_NAME  || "ᴀsᴛᴀ-ᴍᴅ",
  ownername:process.env.OWNER_NAME|| "αѕтяσ",
  errorChat : process.env.ERROR_CHAT || "",
  KOYEB_API : process.env.KOYEB_API  || "false",
  REMOVE_BG_KEY : process.env.REMOVE_BG_KEY  || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME:process.env.HEROKU_APP_NAME|| "",
  antilink_values:process.env.ANTILINK_VALUES|| "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  WORKTYPE: process.env.WORKTYPE || process.env.MODE|| "private",
  LANG: ( process.env.THEME ||  "main"  ).toUpperCase(),
};
global.ELEVENLAB_API_KEY = process.env.ELEVENLAB_API_KEY || "";
global.aitts_Voice_Id = process.env.AITTS_ID|| "37";
global.rank = "updated" // Don't Touch
global.isMongodb = false; // Don't Touch Else Bot Won't Work
let file = require.resolve(__filename)
fs.watchFile(file, () => { fs.unwatchFile(file);console.log(`Update'${__filename}'`);delete require.cache[file];	require(file); })
