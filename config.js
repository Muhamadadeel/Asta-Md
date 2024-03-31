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
  sessionName: process.env.SESSION_NAME || "Asta;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUFOektsNFZCK25GbHRiNnZ2S3RHYlVyZFBwaWRyQkozRmpvajVoUnFWST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTTJwMWhHc1h4MXRHaXpFeTJtRm00NVRaL1VwTGNJOVdIdkRZR3Nxdy9CTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXRVh5NWUrWURJWDFEUFhHY1hpWm1lMFRlQnlzQitiNmkzeGluU3d6MFdRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6VVN4ek4yZnJNWURDay9pMW5waGh3M1FKR1U0NUpoaGlVN0JIU1dscUd3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFNK01keVlWUHlBZS9jYy9VcnBzMUZPRWg1cUtPY1FWa2NtRnFYNmZzVnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlN2R0R3ajFmV3YxV3p4aHROSEFjOWY2eXRMTXZhRTh3R0pmY1E3bGltbXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0ZvZEFkb3RyR1Qyemw1Tm0vVUU1bk9mVzhoVmF2VWtnaEJyaU0rQUFFST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK3l2UzFkTUk0K0RyaFRqY1dkL3BRYm90SXZBZ21ENkgyclpSUldmTHdCWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFDVFhvNmNQNUwrYk8yUkZrTVlpVHFuWUVIUjljNks2N2pGT2FBU1dFSU13eGh1czJtYjV1SWR5cDh5YTVqaEJ4VGl4eUJnWWt0YU1STTgwd3dXc0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ4LCJhZHZTZWNyZXRLZXkiOiJtZG5US2lXR2xyc290akN6czhBNkw4OW9xc1NvbmxYSnVnUzluelp5VFJ3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwMjc4NjIxMTZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODQzOTg5NDI3OEIwN0RDNTA4OTU3QjhFNkYwOTM0QjIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxMTg4MTM0NH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAyNzg2MjExNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBODA0MjM4RkVCNzkyMzVGQUVBQTE1RjJGQzMxMEI2RCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzExODgxMzQ2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MDI3ODYyMTE2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijg4Njg1QkYyMTdGRTJEMTZGMjAxNkE3NzNGODRBQkNBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTE4ODEzNDZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjhLX1V6cGN6U0d5SGFTUmZSa3FMc0EiLCJwaG9uZUlkIjoiMzFkYTBkNTItOTQyOS00MWUzLTkyNDYtNzBhZGQ0NzY1MWYyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9zZGYxTUQwVURJenJmbFhnaEFaUkMwc2x6az0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFV6UTVNeEFkenVqdnlCL3M4M01RL2hGNHFzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTERtOW9BQkVQMzRwTEFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMGlmYUs1ck8xYnZjaThJNkpRS2JPRWFyMGVGeE9HUzZWU05PcVhlUVRFYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZW0zMWxSWkJicTc0b2xTU1YybkE4MjV5YkFnVEIrekdNWlVLUUlyWFkzV1pLT0xqVm5BTk9Tb0R6MGxVOFkzK1VDbjR6dS9QZlZ3bUx1REZVWGd3QUE9PSIsImRldmljZVNpZ25hdHVyZSI6Im9ISHhaand5RllWTnc2VUozbVdnV3BQUVM5bGwyOFVOa2IwUHkxUm9acHB4U294SzZxbVJ0a3Fma05RUHVlcG82UUpRMHZKcTFVc0RBRndqQ0g4WEJ3PT0ifSwibWUiOnsiaWQiOiIyMzQ5MDI3ODYyMTE2Ojc3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkFzdHJvIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkwMjc4NjIxMTY6NzdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZEluMml1YXp0VzczSXZDT2lVQ216aEdxOUhoY1Roa3VsVWpUcWwza0V4SCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxMTg4MTM0MywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMa2YifQ==",
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
 
