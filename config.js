const fs = require('fs-extra')
const randomPort = Math.floor(Math.random() * (65535 - 1024) + 1024);
if (fs.existsSync('config.env')) require('dotenv').config({ path: __dirname+'/config.env' })


//═══════[Required Variables]════════\\
global.owner = process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.replace(/[\s+]/g, ''): '2348039607375';
global.mongodb = process.env.MONGODB_URI || "mongodb+srv://astro:astro@cluster0.pxc8ulo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ;
global.port= randomPort  ;
global.audio = '' ; 
global.video = '' ;
global.blockJids = process.env.BLOCK_JID ||'120363023983262391@g.us' ;
global.allowJids = process.env.ALLOW_JID ||'120363022922797633@g.us' ;
global.email = 'samsamsun789@gmail.com' ;
global.github = 'https://github.com/Astropeda/whatsapp-bot' ;
global.location = 'Lahore Pakistan' ;
global.timezone  = process.env.TIME_ZONE || 'Africa/Lagos'
global.ownernames = 'Astropeda'
global.packname = '© Asta'
global.creator = 'Astro'
global.waitTime = null;
global.gurl = 'https://youtube.com/c/SuhailTechInfo' ; // add your username
global.sudo =  process.env.SUDO || "2348039607375" ;
global.devs = "2348039607375"; //Dont change it From here
global.website = 'https://github.com/Astropeda/whatsapp-bot' ; //wa.me/+91000000000000
global.THUMB_IMAGE = process.env.THUMB_IMAGE || 'https://i.imgur.com/NpA3ZsJ.jpeg' ;
module.exports = {
  sessionName: process.env.SESSION_ID || 'Asta;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEFXcW9ETVdjcnNYeGpzMm9oV29KVFhXK1R5cW9Vc1d3K0RZT1FSWEZYdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ3pVRXRlUUJMY0RuUjRIT0w1NFc0QnA0U2Jaa1E3ZzFjYVNETG0yaTdEcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvS3UyRUpBRUtncHc0cTdUT01UejhucTY3b0dMYnMrMzhaSk9TWjhzWm5RPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxeWFJelFkY2pUZ1l5bk51WWY2SnM5TEFFc242OGowK2NtMGVRbWtzMlNJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdBYkE1SjdLLzdyS1c3OE5MaUI5Ym5SRDUrRWRETytaTVdSRTF2a2N3bWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhXWE5GTTlWV09lMEZKalhONHZNV0prV0g4NmZJRXRMM3dxaTdiYlc3MUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU5XbXg5ck5KTFk3eHl5MGpaZGRlc1FreEE0a0RQdkdmcUo5UjhnM0huZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWDk4eEx2ZTZQeUZ2ZEtSQ1pMTmdjZGtHc0ZjeHlZc2tyM2F6ZGhFZ2oycz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJTdXlpZW9hdStBNWtIK3NLYlhva0YxVWQ1UXdKaHV0L1hSb1RNdGF4TWcwQnRSeXJJN05Rb0hjVFhpZGxnakVlSmhVZU5JMXd3RkNRY0ZES2FrVkRBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgyLCJhZHZTZWNyZXRLZXkiOiJzSk1sdHQ0T3Y1cjMrVE5md2hkWEw2cVl5ZlVnSkFkaHVEaW9lVXhySEFBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwMjc4NjIxMTZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTEyMTBFQUU5RTAwMjQ0QTA3QUI4NUNFMTE4MEJGMUMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxMDU5ODQ2NX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiM0NDZ2JGLUlSYWlieDFCb3RraTdndyIsInBob25lSWQiOiJiYjE3NmRmNi1jOGY3LTRmZTMtOGEzMC04ODk2NmQ1YjhiNWQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibGxXQVRnZFpGbExsR2RyNHlpTURLVStpaEE0PSJ9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuZmZOZWpXaC9Va1l2b2xpR3dOUGZKcUl5OG89In0sInJlZ2lzdHJhdGlvbiI6e30sImFjY291bnQiOnsiZGV0YWlscyI6IkNQYVl6YU1GRUx6UzFxOEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJnQTQrNk94dFVPOW9QWUVVWjJackd0QXRWbjdRQmNWQ3c1dnVjVTQrcHdRPSIsImFjY291bnRTaWduYXR1cmUiOiIxeWQ3RW9abXU1eUpjdFBoYWlFOEd4MVllR1VrRG1lRXpYZW8yS013NWtHaG1JNU5Uc3VhN2RwM1ozZXNyWExXRUJ5WkJsYnU0V0hZcVVGTmgralVCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoibDEyMnBqU3F0bTk3U0gwSDR0ai85MjRpdHBLbFNVUnR0bDlTZHdNZzJiYnVxUitDZWg1bVZqTGcwRDgvREkvZWkrVndHZUZpSVFFQk10ejZUdytQREE9PSJ9LCJtZSI6eyJpZCI6IjIzNDkwMjc4NjIxMTY6NDlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiypnhtI/htJsg4bShypzhtIDhtJvqnLHhtIDhtJjhtJgifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTAyNzg2MjExNjo0OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZQU9QdWpzYlZEdmFEMkJGR2RtYXhyUUxWWiswQVhGUXNPYjduRk9QcWNFIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzEwNTk4NDYzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUgzYSJ9',      //Put Your Session Id Here
  botname: process.env.BOT_NAME || 'ASTA',
  botbgm: process.env.BOT_BGM || 'false',
  ownername:  process.env.OWNER_NAME || `Astro`,
  author:  process.env.PACK_AUTHER || '', 
  read_status : process.env.AUTO_READ_STATUS || 'true',
  save_status : process.env.AUTO_SAVE_STATUS || 'true',
  packname:  process.env.PACK_NAME || "Asta" ,
  autoreaction: process.env.AUTO_REACTION || 'false',
  antibadword : process.env.ANTI_BAD_WORD || 'nobadwordokeyuntillYouPutAnWordHere',
  alwaysonline: process.env.ALWAYS_ONLINE || 'false',
  antifake :   process.env.FAKE_COUNTRY_CODE ||'212',
  readmessage: process.env.READ_MESSAGE || 'false',
  readcmds : process.env.READ_COMMANDS || 'false',
  HANDLERS: process.env.PREFIX || ',',
  warncount : process.env.WARN_COUNT || 3,
  disablepm: process.env.DISABLE_PM || "true",
  MsgsInLog:process.env.MSGS_IN_LOG ||'false',
  pmMsgsInLog:process.env.PM_MSGS_IN_LOGS ||'false',
  levelupmessage: process.env.LEVEL_UP_MESSAGE || 'false',
  antilink_values: process.env.ANTILINK_VALUES || 'https://,chat.whatsapp.com',
  antilinkaction: process.env.BRANCH || 'remove',
  BRANCH: process.env.BRANCH || 'main',
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
  HEROKU_API_KEY: process.env.HEROKU_API_KEY,
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "Nh4iTxEH5k3vmHugFqoYktGM",
  caption :process.env.CAPTION || "*Astropeda Team*",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ||'' ,
  VERSION: process.env.VERSION || 'v.0.0.3',
  LANG: process.env.THEME || 'SUHAIL',
  menu : process.env.MENU || '', /**  Available @MENU @Schemes 1: Aztec_Md, 2: A17_Md, 3: Suhail-Md Default ---------- If Not Choose then it Randomely Pic One Of Them Each time **/
  WORKTYPE: process.env.WORKTYPE || process.env.MODE || 'public'
};


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update'${__filename}'`)
    delete require.cache[file]
	require(file)
})
