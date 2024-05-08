const fs = require('fs-extra')
if (fs.existsSync('.env')) require('dotenv').config({ path: __dirname+'/.env' })


//═══════[Required Variables]════════\\
global.audio= "" ;  
global.video= "" ;
global.port =process.env.PORT
global.appUrl=process.env.APP_URL || ""                       // put your app url here,
global.email ="saimsamsun789@gmail.com"
global.location="Lahore,Pakistan."


global.mongodb= process.env.MONGODB_URI || ""
global.allowJids= process.env.ALLOW_JID || "null" 
global.blockJids= process.env.BLOCK_JID || "null"
global.DATABASE_URL = process.env.DATABASE_URL || ""

global.timezone= process.env.TZ || process.env.TIME_ZONE || "Asia/Karachi";
global.github=process.env.GITHUB|| "https://github.com/astapatch@3.0.0TechInfo/astapatch@3.0.0-Md";
global.gurl  =process.env.GURL  || "https://whatsapp.com/channel/0029Va9thusJP20yWxQ6N643";
global.website=process.env.GURL || "https://whatsapp.com/channel/0029Va9thusJP20yWxQ6N643" ; 
global.THUMB_IMAGE = process.env.THUMB_IMAGE || process.env.IMAGE || "https://github.com/astapatch@3.0.0TechInfo/astapatch@3.0.0-Md/blob/main/lib/assets/astapatch@3.0.0.jpg?raw=true" ; // SET LOGO FOR IMAGE 



global.devs = "2348039607375" // Developer Contact
global.sudo = process.env.SUDO ? process.env.SUDO.replace(/[\s+]/g, '') : "null";
global.owner= process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.replace(/[\s+]/g, '') : "2348039607375";




//========================= [ BOT SETTINGS ] =========================\\
global.style = process.env.STYLE   || '5'  // put '1' to "5" here to check bot styles
global.flush = process.env.FLUSH   || "false"; // Make it "true" if bot not responed
global.gdbye = process.env.GOODBYE || "false"; 
global.wlcm  = process.env.WELCOME || "false";  // Make it "false" for disable WELCOME 

global.warncount = process.env.WARN_COUNT || 3
global.disablepm = process.env.DISABLE_PM || "false"
global.disablegroup = process.env.DISABLE_GROUPS || "false", // disable bot in groups when public mode

global.MsgsInLog = process.env.MSGS_IN_LOG|| "false" // "true"  to see messages , "log" to show logs , "false" to hide logs messages
global.userImages= process.env.USER_IMAGES || "text" // set Image/video urls here
global.waPresence= process.env.WAPRESENCE ||  "null" ; // 'unavailable' | 'available' | 'composing' | 'recording' | 'paused'


//========================= [ AUTO READ MSGS & CMDS ] =========================\\
global.readcmds = process.env.READ_COMMAND || "false"
global.readmessage = process.env.READ_MESSAGE || "false"
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "null,923xxxxxxxx";


//========================= [ AUTO SAVE & READ STATUS ] =========================\\
global.read_status = process.env.AUTO_READ_STATUS || "false"
global.save_status = process.env.AUTO_SAVE_STATUS || "false"
global.save_status_from =  process.env.SAVE_STATUS_FROM  || "null,923xxxxxxxx";
global.read_status_from =  process.env.READ_STATUS_FROM  ||  "2348039607375,923xxxxxxxx";

global.api_smd = "https://api-smd.onrender.com" //  || "https://api-smd-1.vercel.app" // expires
global.scan = "https://astapatch@3.0.0-md-vtsf.onrender.com";


global.SESSION_ID = process.env.SESSION_ID ||  "Astro;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUdnaG8xODUzcmo5UEw4UVpVOTFGeG44UmdQbHpORk1rWUoveHlMVVhsRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRWN1bzIrNzNlZkZqTXd1ZVl0U2xrYmFFRXBHcFlua28vMW5UU1BYTUZrbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyQ00zZ2NSM0FpRGdkeFlxdVNKSy9TWURSUDgxYWhsYkJNVXJXSFErejFFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzNFNjRWhwSFFHL3g1WDU1aTFsWThhZFFwZmx3QmtUZXZXTEFFTm5HMmxjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFDcEhPeTVIdE5MUUV1bWptQU51MmwxRkwwTCswU09saTNTaDBlZmRxV2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxsemJZRnNaVW5TVDFqZFFsQzlKSzhsRFo1V1ppN1FUUmFGckIySGZkWFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkFsM1J0eXhhcWs5VmtPSkx6clZxL3JKV3FsZ3pKeXMyeTE0bUptNE1IOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidHRTRHFmLzFxRFpmdXNHMlZiVTVCUksvNnQ3VVd4azlWMDZDZkpuaFgyZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlkyRTdxNm1ERmt2L3JERHJXSUJvUjJpeVV1TzY3OGVMSW92MzVLd0xwbE92eExaZFFzVVlHVnViRzMzS2Q2N1p6NXliMU1BSEFySDI2RThnSm4yVUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzIsImFkdlNlY3JldEtleSI6IllweU9qVmNTRzQ2RmhVdDM4Z2VkWUZVOWpjc3B5UTVPOTlZVytOeFpPYjg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAyNzg2MjExNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3RTRGNEYwREYwQjE2QzRFOUIxQjA3NjZCMjE5ODRCQiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE1MTg2NjE1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MDI3ODYyMTE2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjU4RDc5MTAzMUZGNTU0NzQxQjZCNzg2RkQ3RDUzOTE3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTUxODY2MTV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjkwamFyLWdJUVlTTjhBMlhWd2JkelEiLCJwaG9uZUlkIjoiYTYzYjFkNGItNjEwNS00YjVjLTllNmMtMzhiNDc3ZDRkY2Y4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhhanN2Y3NWUFZPZS9mdG9kUFpuU0R2SVRCRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIycHBTcDVRMkdHZmVEL2xXdmRMUGhZNTVtNlE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiV01BRlRSMzEiLCJtZSI6eyJpZCI6IjIzNDkwMjc4NjIxMTY6NDRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQXN0cm9wZWRhIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLaVU2Y3dDRUtmWDdyRUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ0U3dsSXppNmovTnNmS1o3cnFnS1RRM0lLRXJYQUJJRzk2ZllpL2FxRlV3PSIsImFjY291bnRTaWduYXR1cmUiOiJxTDIwTDhZdEttQUpEc3lINkcwUEJwUy9QR2VJQkx1MmJrM3JTMnB4a29sclY1elc0UkZMRUhsN2hwMXhyQllrQ2hka3FHMVZpZUZqUEp0MVlWdldDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWUVmdnZSL1NYd2lRdXJBWHRMUkVPRlorUitlN3FuYnhDZ3RNV2hMNFNPQmlVNG1XR2RRcGI0VjlRSFBhYjBnSzZFZy9ROU9IQy9taTJmSW9sWHZQQWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDI3ODYyMTE2OjQ0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJVc0pTTTR1by96Ykh5bWU2Nm9DazBOeUNoSzF3QVNCdmVuMkl2MnFoVk0ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTUxODY2MTMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTUtnIn0="  // PUT your SESSION_ID 


module.exports = {

  menu: process.env.MENU || "", 
  HANDLERS: process.env.PREFIX  || ".",
  BRANCH  : process.env.BRANCH  || "main",
  VERSION : process.env.VERSION || "3.0.0",
  caption : process.env.CAPTION || "©ᴀsᴛᴀ ᴍᴅ" , 
 
  author : process.env.PACK_AUTHER|| "",
  packname: process.env.PACK_NAME || "",
  botname : process.env.BOT_NAME  || "ᴀsᴛᴀ ᴍᴅ",
  ownername:process.env.OWNER_NAME|| "Astropeda",


  errorChat : process.env.ERROR_CHAT || "",
  KOYEB_API : process.env.KOYEB_API  || "false",

  REMOVE_BG_KEY : process.env.REMOVE_BG_KEY  || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME:process.env.HEROKU_APP_NAME|| "",
  antilink_values:process.env.ANTILINK_VALUES|| "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,


  WORKTYPE: process.env.WORKTYPE || process.env.MODE|| "private",
  LANG: ( process.env.THEME ||  "bot"  ).toUpperCase(),



};



global.ELEVENLAB_API_KEY = process.env.ELEVENLAB_API_KEY || "";
global.aitts_Voice_Id = process.env.AITTS_ID|| "37";





















global.rank = "updated"
global.isMongodb = false; 
let file = require.resolve(__filename)
fs.watchFile(file, () => { fs.unwatchFile(file);console.log(`Update'${__filename}'`);delete require.cache[file];	require(file); })
 

// ========================= [ Disables in V.1.2.8 ] ===============================\\  
  //style : process.env.STYLE || "2",  // put '1' & "2" here to check bot styles
  //readmessage:process.env.READ_MESSAGE|| "false",
  //warncount: process.env.WARN_COUNT || 3,
  //userImages:process.env.USER_IMAGES|| "text",  // SET IMAGE AND VIDEO URL FOR BOT MENUS 
  //disablepm: process.env.DISABLE_PM || "false",
  //MsgsInLog: process.env.MSGS_IN_LOG|| "false", // "true"  to see messages , "log" to open logs , "false" to hide logs messages
  //readcmds:process.env.READ_COMMANDS|| "false", 
  //alwaysonline:process.env.WAPRESENCE|| "unavailable", // 'unavailable' | 'online' | 'composing' | 'recording' | 'paused'
  //read_status: process.env.AUTO_READ_STATUS || "false",
  //save_status: process.env.AUTO_SAVE_STATUS || "false",
  //aitts_Voice_Id : process.env.AITTS_ID || "37",
  //ELEVENLAB_API_KEY: process.env.ELEVENLAB_API_KEY  || "",
