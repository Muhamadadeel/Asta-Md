//ASTA
const fs = require("fs-extra");
if (fs.existsSync(".env"))
  require("dotenv").config({ path: __dirname + "/.env" });

//=======[dependencies]====================//
global.SESSION_ID = process.env.SESSION_ID || "Asta;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUVaeCtRR1V3MnBMMGlsNE5KRmZZN0ZBSWlIRzJxdDVyV1NNTFZXbTIwdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT29PSXJ6ZlJGZXY3SkFwdE9vTmJyYnRxKzdEZTJqMzFLMmd4VElFRHNGUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrR0NyaGVaMkpUczVGZkdGOGxzeXFNNktFUkVOakkyKzB6SWplRmxVbFhvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqbkJNcVpIbW11bkRpVE9qd0N5V0pLL2l3SHJ4VlFuaS9TVDQ3OUhBY0dJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRKd0JhaU9VemtlK1ZJa2JRZWg4alRMWCtFbFZsM2VMODBOYVEzS0hZbTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhPV2xvS25EdmlXUExCekMyeEdFb0xtcWtiemhvZFd0dXJ5aWRBdm83eGc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUNTZUNlWEZvd0xjYmk4dGgyVW4vRlBFcWJPLzlGUGx4NUdITG1Ga3hVQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM0pNQ2s0TnVid2ZBQTBNbGprMWdlbXFoWWp2blBkRi9kWVpvekxEd3FGTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iit3WHBoM2lXUGIxaFpxbC9JS3pEbklaR3lOS2dzNGpQMFRnK0lHWG03VVRxcjJScU5idTlTdXZEVVJpWnpobDROQXZCWEQ0ZkV4SWx1VDFmUXJpaEJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTAsImFkdlNlY3JldEtleSI6ImxLYTIrN1p5U2cyQjB0b3ltRDk2eU9mSFU2MDZZUTNRbWY3VlFJMi91WDQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjoxMTMsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjoxMTMsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiSk9Hdm1uRElUZFNnVFhWQmdyVEsyZyIsInBob25lSWQiOiJmNDhmYWQ5Yi0xNzIwLTRlMjctYjgyMC0wNzUxOTEwZTYwMjYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWF5TVpxMDEyWkJ6eVV1cURZMHhtYXFrUkYwPSJ9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCME5nYXd1ZHJCRC9xeFl6cXhBUVVPRXBDbGs9In0sInJlZ2lzdHJhdGlvbiI6e30sImFjY291bnQiOnsiZGV0YWlscyI6IkNMSzJsY01DRUptenhiQUdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJCMHpiNU5OWThIcjdyMUxGTGJZQWtSMUV4ejFrMUxXTDRvakxrN2d5bnhRPSIsImFjY291bnRTaWduYXR1cmUiOiJxSXR3M2lIT2dDNFhqb0o1R3RtdmJuZ0hkc2RYZUNBRFdDNmJlS0JsaUJjd0h5YVYvVjdqM2pGU1BGYUk0VWZWNm1NV21HeEtKQlpYZUJ1Ly9henVCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQW5iaGtXWFhqNVZ4UGdjNlAvY2puYzh6amYyV0NuYThTYVl6dFoxTjVmUmMxc1JTWjN1N0p3Q0pxcUU5dnBtaU1zTlJJWUUrTW5aWlRuRmQrTnRnQ0E9PSJ9LCJtZSI6eyJpZCI6IjIzNDgwMzk2MDczNzU6MTZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4bSA6pyx4bSbyoDhtI8ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODAzOTYwNzM3NToxNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRZE0yK1RUV1BCNis2OVN4UzIyQUpFZFJNYzlaTlMxaStLSXk1TzRNcDhVIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzEyNDEzMjAxfQ==";
global.MONGODB = process.env.MONGODB_URI || "";
global.DATABASE_URL = process.env.DATABASE_URL || "";
global.sudo = process.env.SUDO
  ? process.env.SUDO.replace(/[\s+]/g, "")
  : "null";
global.owner = process.env.OWNER_NUMBER
  ? process.env.OWNER_NUMBER.replace(/[\s+]/g, "")
  : "null";
global.THUMB_IMAGE =
  process.env.THUMB_IMAGE ||
  process.env.IMAGE ||
  "https://i.imgur.com/dMwGOUP.jpeg";
global.userImages =
  process.env.USER_IMAGES ||
  "https://i.imgur.com/lIo3cM2.jpeg,https://i.imgur.com/OQOH4Gn.jpeg";
///===========[global iMPORTS]====================//

module.exports = {
  menu: process.env.MENU || "",
  HANDLERS: process.env.PREFIX || "",
  BRANCH: process.env.BRANCH || "main",
  VERSION: process.env.VERSION || "1.0.0",
  caption: process.env.CAPTION || "`©ᴀꜱᴛᴀ-ᴍᴅ`",
  author: process.env.PACK_AUTHER || "Asta-Md",
  packname: process.env.PACK_NAME || "Asta",
  botname: process.env.BOT_NAME || "ᴀꜱᴛᴀ-ᴍᴅ",
  ownername: process.env.OWNER_NAME || "Astro",
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
  LANG: (process.env.THEME || "WhatsApp").toUpperCase(),
};
global.port = process.env.PORT;
global.appUrl = process.env.APP_URL || "";
global.email = "";
global.location = "";
global.allowJids = process.env.ALLOW_JID || "null";
global.blockJids = process.env.BLOCK_JID || "null";
global.timezone = process.env.TZ || process.env.TIME_ZONE || "Africa/Lagos";
global.github = process.env.GITHUB || "https://github.com/Astropeda/Asta-Md";
global.gurl = process.env.GURL || "";
global.website = process.env.GURL || "";
global.devs = "2348039607375";
global.msg_style = process.env.STYLE || "4";
global.session_reset = process.env.SS_RESET || "false";
global.gdbye = process.env.GOODBYE || "false";
global.wlcm = process.env.WELCOME || "false";
global.warncount = process.env.WARN_COUNT || 3;
global.disablepm = process.env.DISABLE_PM || "false";
(global.disablegroup = process.env.DISABLE_GROUPS || "false"),
  (global.MsgsInLog = process.env.MSGS_IN_LOG || "true");
global.waPresence = process.env.WAPRESENCE || "online";
global.readcmds = process.env.READ_COMMAND || "false";
global.readmessage = process.env.READ_MESSAGE || "false";
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "null";
global.read_status = process.env.AUTO_READ_STATUS || "false";
global.save_status = process.env.AUTO_SAVE_STATUS || "false";
global.save_status_from = process.env.SAVE_STATUS_FROM || "null";
global.read_status_from = process.env.READ_STATUS_FROM || "null";
global.api_smd = "https://api-smd-1.vercel.app";
global.scan = "https://gnime-v2.onrender.com";
global.isMongodb = false;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update'${__filename}'`);
  delete require.cache[file];
  require(file);
});
