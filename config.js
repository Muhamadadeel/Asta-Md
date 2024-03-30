const fs = require("fs-extra");
if (fs.existsSync(".env"))
  require("dotenv").config({ path: __dirname + "/.env" });
//=========[IMPORTANT VARS]=========================\\
global.port=5000
global.SESSION_ID = process.env.SESSION_ID || "SESSION_17_45_03_30_eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0E0SFhTZWp1aHBwRGN2MmFDVFF4RXNXc09WUTNTMGxsZUV4WUlkbUQwaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQXljZWJBU2g3c3ZoMFFPU09NemZ1cEVpRFFZaHpNTjJpUEQwclFzTUF6Zz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFT0pLTzdqTkdLZGtNTXV1TlhkK1d5UlRLZ3NOeG00NkdDcCtHVmFsVDIwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYNHBUY01QZ2Ewak80OWNnYllvU3hoMGxzQmxnaWZtM2Mydm1wdHZXTUVzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklCaEpSR1c0aHQ4eHFVN2xlZDJYdVN4azh4bTMwSnUxN3JDT3BMM3ZNMjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVDSFA1WVFLRlBSRHBQTDNOQzNoeUZoR1V2Rk0rWko2Ym95TzYvZTB1bTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUl6dXo3UmNPYnVSc2ZPU0FoNCtNVmVtalZqU1dpbUlYK3VEYW1kdmNscz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWlUvU2VySG90SDlpWXNuWUJEcEptQWNtWEZwcWp1MnphbUNwdWthOVZ5az0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFZV0EyRkxaQlZGc25ucnN4dnEwem9HRnpxakNUd0dFVzNEai9OMTVtajRTSXI1NGgvTHJFelM3UHp1RDFGUHJnMXdmVWZEOEpuK1dxRUJySmtYTmp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYyLCJhZHZTZWNyZXRLZXkiOiJkQkE0UTZaZmxoenlzQkoySDRiRGVZbmRWRzRLWEtoU0V6cjgxSFJHVUFVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgwMzk2MDczNzVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNDBCNkI1QTc3ODA5MDAwRDk0QTZGMzg0Q0U0RDYzNjQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxMTgxNzEzN30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODAzOTYwNzM3NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzRTRCRURFQTE4QzYzNDI3QTc2QUZEODUzRjk5QTc1MiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzExODE3MTM5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MDM5NjA3Mzc1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE5RjVEOEI3NUMwODgzRjU4MUNGMEVBMzUxRDgxQkE4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTE4MTcxNDR9XSwibmV4dFByZUtleUlkIjo2MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjYxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImRzb0RMLU8wVGJXaXVfenRhUWJfMkEiLCJwaG9uZUlkIjoiMmY3N2QzM2QtYjJhMy00NjUxLWE2MWUtZWM1NWI4MThlODdlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlU5Vk5kdElCcmh6SjZMTUJ0eGczaGJ4YXFyUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrcEl0cDVJdW9vNUNTcVNmVDNjWEdLWVB1ZE09In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMUNOTktOWTciLCJtZSI6eyJpZCI6IjIzNDgwMzk2MDczNzU6MTJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoizp3PhM6szr3Ouc61zrsgzobPg8+Ez4HOvyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS2pGcENZUXFZT2hzQVlZQWlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSmJQdG9QZ1JGc0xreWtCSDBYMzZiUmxXT1R1SHZPaVBSMVRtY2t3NHVUND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWmN0UUJIYnJvQWVZcE1oZ0JvWThFT05Lb1pyUmZEbFhEWVZBV2UvODVxL3lLNkVrTlNRU3FvM3dXeHR6UDJBTGpjSEJkSmlNUUhnVlEreVdpdmZXRFE9PSIsImRldmljZVNpZ25hdHVyZSI6IkZPeTVEZFRhMU1hNXdWNjkrZE9lQUZmekpDQ1RSTVVsMUJpc0pZZkhDV2pDcEtvcEVwT0xHZkJKU1RkL01lMUtpdjdwOGl4cXYvVlpOeDBCYlY0SWpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODAzOTYwNzM3NToxMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTV3o3YUQ0RVJiQzVNcEFSOUY5K20wWlZqazdoN3pvajBkVTVuSk1PTGsrIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzExODE3MTM0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhkNCJ9";
global.DATABASE_URL = process.env.DATABASE_URL || "";
global.mongodb = process.env.MONGODB_URI || "";
global.appUrl = process.env.APP_URL || "";
global.timezone = process.env.TZ || process.env.TIME_ZONE || "Africa/Lagos";
global.sudo = process.env.SUDO
  ? process.env.SUDO.replace(/[\s+]/g, "")
  : "2348039607375";
global.menuImg =
  process.env.USER_IMAGES ||
  "https://i.imgur.com/lIo3cM2.jpeg,https://i.imgur.com/OQOH4Gn.jpeg";
global.owner = process.env.OWNER_NUMBER
  ? process.env.OWNER_NUMBER.replace(/[\s+]/g, "")
  : "2348039607375";
global.reset = process.env.RESET || "false";
(global.devs = process.env.DEVS || ""),
  (global.THUMB_IMAGE =
    process.env.THUMB_IMAGE ||
    process.env.IMAGE ||
    "https://i.imgur.com/dMwGOUP.jpeg");
//=========[ASTA MD WHATSAPP BOT]====================\\

//=========[OPTIONAL VARS]==============================\\
global.allowJids = process.env.ALLOW_JID || "null";
global.blockJids = process.env.BLOCK_JID || "null";
global.github = process.env.GITHUB || "https://github.com/Astropeda/Asta-Md";
global.gurl =
  process.env.GURL ||
  "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z/209";
global.website =
  process.env.GURL ||
  "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z/209";
//=========[ASTA MD WHATSAPP BOT]===============================\\

//=============[MESSAGE VARS]===================\\
global.goodbye = process.env.GOODBYE || "false";
global.welcome = process.env.WELCOME || "false";
global.readcmds = process.env.READ_COMMAND || "false";
global.readmessage = process.env.READ_MESSAGE || "false";
global.readmessagefrom =
  process.env.READ_MESSAGE_FROM || "2348039607375,923xxxxxxxx";
global.read_status = process.env.AUTO_READ_STATUS || "false";
global.save_status = process.env.AUTO_SAVE_STATUS || "false";
global.save_status_from = process.env.SAVE_STATUS_FROM || "null,923xxxxxxxx";
global.read_status_from =
  process.env.READ_STATUS_FROM || "2348039607375,923xxxxxxxx";
global.messagetype = process.env.STYLE || "4";
global.warncount = process.env.WARN_COUNT || 3;
//===========[ASTA MD WHATSAPP BOT]=====================\\

//===========[OPTIONAL VARS]============================\\
(global.disablegroup = process.env.DISABLE_GROUPS || "false"),
  (global.disablepm = process.env.DISABLE_PM || "false");
global.MsgsInLog = process.env.MSGS_IN_LOG || "true";
global.waPresence = process.env.WAPRESENCE || "online";
//=========[ASTA MD WHATSAPP BOT]================\\

//===========[API STUFF DON'T TOUCH ANYWAYS]=============\\
global.api_smd = "https://api-smd-1.vercel.app";
global.scan = "https://gnime-qr.onrender.com";
//===========[ASTA MD WHATSAPP BOT]====================\
module.exports = {
  menu: process.env.MENU || "", // menu1, menu2 ONLY or 1 or 2
  HANDLERS: process.env.PREFIX || ".",
  BRANCH: process.env.BRANCH || "main",
  VERSION: process.env.VERSION || "1.0.0",
  caption: process.env.CAPTION || "©ᴀsᴛᴀ ᴍᴅ 𝟸𝟶𝟸𝟺",
  author: process.env.PACK_AUTHER || "ᴀsᴛᴀ ᴍᴅ 𝟸𝟶𝟸𝟺",
  packname: process.env.PACK_NAME || "ᴀsᴛᴀ ᴍᴅ 𝟸𝟶𝟸𝟺",
  botname: process.env.BOT_NAME || "ᴀsᴛᴀ ᴍᴅ 𝟸𝟶𝟸𝟺",
  ownername: process.env.OWNER_NAME || "ᴀsᴛʀᴏ",
  errorChat: process.env.ERROR_CHAT || "",
  KOYEB_API: process.env.KOYEB_API || "false",
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  antilink_values: process.env.ANTILINK_VALUES || "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  aitts_Voice_Id: process.env.AITTS_ID || "37",
  ELEVENLAB_API_KEY: process.env.ELEVENLAB_API_KEY || "",
  WORKTYPE: process.env.WORKTYPE || process.env.MODE || "private",
  LANG: (process.env.THEME || "Asta").toUpperCase(),
};
global.rank = "updated";
global.isMongodb = false;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update'${__filename}'`);
  delete require.cache[file];
  require(file);
});
