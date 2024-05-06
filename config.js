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



global.devs = "923184474176" // Developer Contact
global.sudo = process.env.SUDO ? process.env.SUDO.replace(/[\s+]/g, '') : "null";
global.owner= process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.replace(/[\s+]/g, '') : "923184474176";




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
global.read_status_from =  process.env.READ_STATUS_FROM  ||  "923184474176,923xxxxxxxx";

global.api_smd = "https://api-smd.onrender.com" //  || "https://api-smd-1.vercel.app" // expires
global.scan = "https://astapatch@3.0.0-md-vtsf.onrender.com";


global.SESSION_ID = process.env.SESSION_ID ||  "Astro;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY041TVlVNVZZemZmN0FSUTg3SFJIR01HMmREdFFOUFdNUC9VNG1pZEVYZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWDgyc3oxS3hQOTJ5L0duakxVSGJHZ1padlRQM3kzTnhkeG5ORHlNc2YyTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzRVJxYk9LUlc4R0I0VnRWSGloL1dJbVNuYWFWdkdRSXBDeWZlMjIvUkVJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCQnRNdWlseHMya1NYOUlubFFNZ2g4MWVCRjNtMDJya3RCS2lncHNRRUhrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNPY1F5aUxSL2RyQW5SZDZ0MU9ya25zTG54a2l2RDBjUUpuRVBFalBDWEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJBWElIZ1g4QTE3Q01TeUJXOGF4WGo3THpRdG8vd1pPRWp4REQ5ZkJGV289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0wvU1hKbTJ1NjlBZmgyUWRlSGtDaEZheHJBd1JycldYNHVrK2F5c25HVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUY1Q0VwUVI3cmxGcnlSRGdQU2NzTjJWR3d3cjl5eTQzY3JoZHF2WGFHdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlJZkJBNzZGN1dOZEZQaTJ1UUU0SkpGMzQxSW85akwyZEV5Ykl2R3ppa3ZBUDQvaVBRbFRNSFlMSmxVWG5vdFgwTSthZG1IM3pIVHlucU1rRDNJcUJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTksImFkdlNlY3JldEtleSI6IlJTdDBFaDBwUU5nNFVLdStkTVFLL2dLR0RjN1NyME9WN3ZiUjNKQklLMkU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAyNzg2MjExNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1MURCNEZDNzEzRTJFRDMwNkI0NEVBMEI4ODQyOEY1QSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE0ODMwNDQzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MDI3ODYyMTE2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjcxN0JEOTlCODgwNDcwNDc1MjQyQjcwMDQzREU1NDVBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTQ4MzA0NDN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwMjc4NjIxMTZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQ0FCMUE1NTBGRDM5M0Y4NjM3RDM4QzQ0N0U2NENDQjYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxNDgzMDQ0NX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAyNzg2MjExNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxMzBCRjlGRUM2ODcwNDNFRENERkZEOUEwMTU4NkMwMyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE0ODMwNDQ1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIyWlB2QUtxd1JyaVUyTDhhWERTOS1RIiwicGhvbmVJZCI6ImYzOTBhOTVkLTRjZTQtNGQyZC1hNWVjLTQ3M2E1ZDE0NzY2ZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZdXNZRXNmWFhqa2VMVzNBeXNBK1JKeVdwY009In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaS9QeG9RZUhQUXR4djJ3M01hTDVDeVgwajd3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjVDSFAySk5XIiwibWUiOnsiaWQiOiIyMzQ5MDI3ODYyMTE2OjQzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkFzdHJvcGVkYSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUGJvalljRUVOejQyTEVHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibktKUm1hdWJvc25oUm1EOTVNMDZqVUZNL2FGcHBKVEZJMS9Vci8wMzBsaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUUZEN0JraU1aOTQxcVQ2WGdFK2luTGtSRGZ0dWYxUGhGY1VlZGZsZ2Q2TG9tODcrMm1XeTVrc1o2eDJtWGlsZXV2NTdoSDh5aDBZcXVydmpXL0pPQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6IkRKdGhjVEFEVXBTYWNLYUdjanVaeGFjZXNaMllqeWdJQVlkVUs4RHF4enMrN0tVNzUvRk1nQUgvTE1yZXgrSGd1U1JRb1NDRHc4eGQzS2U0djB2NkN3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTAyNzg2MjExNjo0M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaeWlVWm1ybTZMSjRVWmcvZVROT28xQlRQMmhhYVNVeFNOZjFLLzlOOUpaIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE0ODMwNDQxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBBQiJ9"  // PUT your SESSION_ID 


module.exports = {

  menu: process.env.MENU || "", /**  Available @MENU @Schemes 1: Aztec_Md, 2: A17_Md, 3: astapatch@3.0.0-Md Default ---------- If Not Choose then it Randomely Pic One Of Them Each time **/

  HANDLERS: process.env.PREFIX  || ".",
  BRANCH  : process.env.BRANCH  || "main",
  VERSION : process.env.VERSION || "1.3.4",
  caption : process.env.CAPTION || "©sᴜʜᴀɪʟ²²¹-ᴍᴅ" , // ```『 ᴘᴏᴡᴇʀᴇᴅ ʙʏ sᴜʜᴀɪʟ²²¹-ᴍᴅ 』```", //*『sᴜʙsᴄʀɪʙᴇ • sᴜʜᴀɪʟ ᴛᴇᴄʜ』*\n youtube.com/@astapatch@3.0.0techinfo0"),
 
  author : process.env.PACK_AUTHER|| "",
  packname: process.env.PACK_NAME || "",
  botname : process.env.BOT_NAME  || "sᴜʜᴀɪʟ-ᴍᴅ",
  ownername:process.env.OWNER_NAME|| "It'x astapatch@3.0.0",


  errorChat : process.env.ERROR_CHAT || "",
  KOYEB_API : process.env.KOYEB_API  || "false",

  REMOVE_BG_KEY : process.env.REMOVE_BG_KEY  || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME:process.env.HEROKU_APP_NAME|| "",
  antilink_values:process.env.ANTILINK_VALUES|| "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,


  WORKTYPE: process.env.WORKTYPE || process.env.MODE|| "private",
  LANG: ( process.env.THEME ||  "astapatch@3.0.0"  ).toUpperCase(),



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
