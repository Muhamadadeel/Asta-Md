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
global.SESSION_ID = process.env.SESSION_ID ||  "Secktor;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkpKb3hSSGtVWFVPZmNMUFV1d3JRSU9zRU1DVXNSNm1tWUY0VnJudG1GQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibmtPS3VOdjZPSHpoR0tOcndUWnFHN0FkL2tzcWlMK2hBWTNETDJGTWRrQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjRTI2MXVpVVBxYVBUYmVtMXFpZWZXOVV1WFI2cklCbmkyOElXazFaUUdBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvNzdWUUNSRytWMXhacExrRFpIb1FsVGlKSzZlNE4vVncyeGx6Vld3K0VvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktQU0c3MThEeFpqWDNJODNqOUNxVCsyRU93V3N2bFdpTGlVR0dRcTJnRWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZkNEdIc2JUTG1yUUVUdmJzTHJCa0IzaUozOHBqMFZ2ZEFWR255c2NrejQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU9kU3pFZThJNGVTTG42cFhKNThMYndxSDJNamtnRnNpL2VGcUtWLzhIRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXRjdXZVMWRqeHdtZjIxL09VSTRUNjdDUWJabnBIcTJxUXl2eGZLMCszTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InV0UjROYjFMZUxLVE9sZSt0TjhLODh5RzBKUWh6ZkJaMS9PaTVRdWdNVktOYytmOHRTTjEzZ012WjJHbjlzb1JLSlZVWWZuVTNWSVd2YUV4UkcrcGp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg4LCJhZHZTZWNyZXRLZXkiOiJ3U21rblRnOFZPT3k0bGhlcXl1RG1XeUdOWVJrczVuQTYzbWNTTlY1WjRRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwMjc4NjIxMTZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTMwMjA2OUMwNUE1MjA3QjA0NDhDOTI3Nzk2QTNBNDAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxMTExMTE2MH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAyNzg2MjExNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBNEQwNTYxMzA0NkNBMDJDNDgyMzYxMzc4REU1RTMwRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzExMTExMTYwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJjekN1S1BjTFF3YVowbUxwT2picjVBIiwicGhvbmVJZCI6ImE1MjNkYmI0LTg3NmEtNGI4Yy1hNTgyLWFjOGU3ZmYxMDU1OCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIbVQ0OHN4czFMUm9FOTdWZXBsQ0hDZWZ5VTQ9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imt4cVkweVBWSW9hRE9rL3hsUUVnRGFlMkRjdz0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xERzdvMENFUFAzOWE4R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InA4eVUrWmlxZ3NnSGQ5cU9oMEFha1d6bjUyeWlHVkZFTTlIM3IrT0JnMmM9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImhIYVYwMjU5SVZJWnd3OFBSQWM4SzlmRU5PZU0wazRmbUpVVHI2OTYvREF4L3Y1REJ3ZkR5eUxFa2F4U3RvM28rV1Nnd0YyUVdJZWZPOFpGYVBPTkFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJxZmdkU1NJdEVHQW0zbU0rSCtnM0JOSEswSnBDcWN6NlNlWUN6TWx5YkJSMU5uOVVFakVzZGtQcndxbmpOaUlPVnQwYndZbk9LL3ZYVEFuVDZRSDdqQT09In0sIm1lIjp7ImlkIjoiMjM0OTAyNzg2MjExNjo2MEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLKmeG0j+G0myDhtKHKnOG0gOG0m+qcseG0gOG0mOG0mCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDI3ODYyMTE2OjYwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFmTWxQbVlxb0xJQjNmYWpvZEFHcEZzNStkc29obFJSRFBSOTYvamdZTm4ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTExMTExNTgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQllYIn0=" ;
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
