const fs = require('fs-extra')
if (fs.existsSync('config.env')) require('dotenv').config({ path: __dirname+'/config.env' })


//═══════[Required Variables]════════\\
global.owner = process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.replace(/[\s+]/g, ''): '923184474176';
global.mongodb = process.env.MONGODB_URI || "mongodb+srv://astro:beka10beka10@cluster0.pxc8ulo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ;
global.port=5000  ;
global.audio = '' ; 
global.video = '' ;
global.blockJids = process.env.BLOCK_JID ||'120363023983262391@g.us' ;
global.allowJids = process.env.ALLOW_JID ||'120363022922797633@g.us' ;
global.email = 'samsamsun789@gmail.com' ;
global.github = 'https://github.com/SuhailTechInfo/Secktor-Md' ;
global.location = 'Lahore Pakistan' ;
global.timezone  = process.env.TIME_ZONE || 'Asia/Karachi'
global.gurl = 'https://youtube.com/c/SuhailTechInfo' ; // add your username
global.sudo =  process.env.SUDO || "923184474176" ;
global.devs = "923184474176"; //Dont change it From here
global.website = 'https://github.com/SuhailTechInfo/Secktor-Md' ; //wa.me/+91000000000000
global.THUMB_IMAGE = process.env.THUMB_IMAGE || 'https://i.imgur.com/NpA3ZsJ.jpeg' ;
module.exports = {
  sessionName: process.env.SESSION_ID || 'Secktor;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUFOektsNFZCK25GbHRiNnZ2S3RHYlVyZFBwaWRyQkozRmpvajVoUnFWST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTTJwMWhHc1h4MXRHaXpFeTJtRm00NVRaL1VwTGNJOVdIdkRZR3Nxdy9CTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXRVh5NWUrWURJWDFEUFhHY1hpWm1lMFRlQnlzQitiNmkzeGluU3d6MFdRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6VVN4ek4yZnJNWURDay9pMW5waGh3M1FKR1U0NUpoaGlVN0JIU1dscUd3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFNK01keVlWUHlBZS9jYy9VcnBzMUZPRWg1cUtPY1FWa2NtRnFYNmZzVnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlN2R0R3ajFmV3YxV3p4aHROSEFjOWY2eXRMTXZhRTh3R0pmY1E3bGltbXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0ZvZEFkb3RyR1Qyemw1Tm0vVUU1bk9mVzhoVmF2VWtnaEJyaU0rQUFFST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK3l2UzFkTUk0K0RyaFRqY1dkL3BRYm90SXZBZ21ENkgyclpSUldmTHdCWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFDVFhvNmNQNUwrYk8yUkZrTVlpVHFuWUVIUjljNks2N2pGT2FBU1dFSU13eGh1czJtYjV1SWR5cDh5YTVqaEJ4VGl4eUJnWWt0YU1STTgwd3dXc0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ4LCJhZHZTZWNyZXRLZXkiOiJtZG5US2lXR2xyc290akN6czhBNkw4OW9xc1NvbmxYSnVnUzluelp5VFJ3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwMjc4NjIxMTZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODQzOTg5NDI3OEIwN0RDNTA4OTU3QjhFNkYwOTM0QjIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxMTg4MTM0NH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAyNzg2MjExNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBODA0MjM4RkVCNzkyMzVGQUVBQTE1RjJGQzMxMEI2RCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzExODgxMzQ2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MDI3ODYyMTE2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijg4Njg1QkYyMTdGRTJEMTZGMjAxNkE3NzNGODRBQkNBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTE4ODEzNDZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjhLX1V6cGN6U0d5SGFTUmZSa3FMc0EiLCJwaG9uZUlkIjoiMzFkYTBkNTItOTQyOS00MWUzLTkyNDYtNzBhZGQ0NzY1MWYyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9zZGYxTUQwVURJenJmbFhnaEFaUkMwc2x6az0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFV6UTVNeEFkenVqdnlCL3M4M01RL2hGNHFzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTERtOW9BQkVQMzRwTEFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMGlmYUs1ck8xYnZjaThJNkpRS2JPRWFyMGVGeE9HUzZWU05PcVhlUVRFYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZW0zMWxSWkJicTc0b2xTU1YybkE4MjV5YkFnVEIrekdNWlVLUUlyWFkzV1pLT0xqVm5BTk9Tb0R6MGxVOFkzK1VDbjR6dS9QZlZ3bUx1REZVWGd3QUE9PSIsImRldmljZVNpZ25hdHVyZSI6Im9ISHhaand5RllWTnc2VUozbVdnV3BQUVM5bGwyOFVOa2IwUHkxUm9acHB4U294SzZxbVJ0a3Fma05RUHVlcG82UUpRMHZKcTFVc0RBRndqQ0g4WEJ3PT0ifSwibWUiOnsiaWQiOiIyMzQ5MDI3ODYyMTE2Ojc3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkFzdHJvIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkwMjc4NjIxMTY6NzdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZEluMml1YXp0VzczSXZDT2lVQ216aEdxOUhoY1Roa3VsVWpUcWwza0V4SCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxMTg4MTM0MywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMa2YifQ==',      //Put Your Session Id Here
  botname: process.env.BOT_NAME || 'sᴜʜᴀɪʟ²²¹-ᴍᴅ',
  botbgm: process.env.BOT_BGM || 'false',
  ownername:  process.env.OWNER_NAME || `It'x Suhail`,
  author:  process.env.PACK_AUTHER || '', 
  read_status : process.env.AUTO_READ_STATUS || 'true',
  save_status : process.env.AUTO_SAVE_STATUS || 'true',
  packname:  process.env.PACK_NAME || "" ,
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
  //antilinkaction: process.env.BRANCH || 'remove',
  BRANCH: process.env.BRANCH || 'main',
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
  HEROKU_API_KEY: process.env.HEROKU_API_KEY,
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "Nh4iTxEH5k3vmHugFqoYktGM",
  caption :process.env.CAPTION || "\t*•ᴘᴏᴡᴇʀᴇᴅ ʙʏ sᴜʜᴀɪʟ²²¹-ᴍᴅ•* ",   //*『sᴜʙsᴄʀɪʙᴇ • sᴜʜᴀɪʟ ᴛᴇᴄʜ』*\n youtube.com/@suhailtechinfo0"),
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
