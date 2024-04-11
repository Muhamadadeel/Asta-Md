const fs = require("fs-extra");
if (fs.existsSync(".env"))
  require("dotenv").config({ path: __dirname + "/.env" });
global.audio = "";
global.video = "";
global.port = process.env.PORT;
global.appUrl = process.env.APP_URL || "";
global.email = "astromedia0010@gmail.com";
global.location = "Lahore,Pakistan.";
global.mongodb = process.env.MONGODB_URI || "";
global.allowJids = process.env.ALLOW_JID || "null";
global.blockJids = process.env.BLOCK_JID || "null";
global.DATABASE_URL = process.env.DATABASE_URL || "";
global.timezone = process.env.TZ || process.env.TIME_ZONE || "Africa/Lagos";
global.github = process.env.GITHUB || "https://github.com/Astropeda/Asta-Md";
global.gurl = process.env.GURL || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z";
global.website = process.env.GURL || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z";
global.THUMB_IMAGE = process.env.THUMB_IMAGE || process.env.IMAGE || "https://i.imgur.com/ZkBjWK2.jpg";
global.devs = "2348039607375";
global.sudo = process.env.SUDO || "2348039607375";
global.owner = process.env.OWNER_NUMBER || "2348039607375";
global.style = process.env.STYLE || "3";
global.gdbye = process.env.GOODBYE || "false";
global.wlcm = process.env.WELCOME || "false";
global.warncount = process.env.WARN_COUNT || 3;
global.disablepm = process.env.DISABLE_PM || "false";
global.disablegroup = process.env.DISABLE_GROUPS || "false",
global.MsgsInLog = process.env.MSGS_IN_LOG || "true";
global.userImages = process.env.USER_IMAGES || "";
global.waPresence = process.env.WAPRESENCE || "online";
global.readcmds = process.env.READ_COMMAND || "false";
global.readmessage = process.env.READ_MESSAGE || "false";
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "";
global.read_status = process.env.AUTO_READ_STATUS || "false";
global.save_status = process.env.AUTO_SAVE_STATUS || "false";
global.save_status_from = process.env.SAVE_STATUS_FROM || "";
global.read_status_from = process.env.READ_STATUS_FROM || "";

global.api_smd = "https://api-smd-1.vercel.app";
global.scan = "https://secret-garden-43998-4daad95d4561.herokuapp.com/";

global.SESSION_ID =
  process.env.SESSION_ID ||
  "Asta;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOExnZ2VoUm1Qc21QQ3FMdDA2S2JwRSs2TlZCOTRmTzE1b0N2VllYYWJscz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNTJRRnMzNnRvTThNcVZtV01sYUZXWEljUXExSDFRZ2trVm1YbnFqbGJ3az0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhTlFTa2hObmVTc1ZFMzBlSFBCcndRV2x1WkZ4dTVVeUxnN0pGWVdFV0Z3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2THVIdUhkaWs3RGVlVFJ1a3BIejNUT29Tdko2cnZZOUtiYjdIdFJQT0RRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBOUDU1amtxTUFTN0ZkclhESnRRdGc1UGg2WDU4aUJSUDNIbTN0SjFBR009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZLS2RXSWRiVVJUbmFXVHBPS0pVQWQ0VlJyQmpPeVFNK000ckcvU3pxUnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0p4MGI4MFl2NEtDdWhFSFhjZ2hrVG52cmRmeU05a0RnUENGVWsxQ3JHYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL2JDcExwZTNCS1NmK2dSMHVqUC81REEvdmVDN1pHWWNJL2Zic1FiZUtRWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJpRGE0SjVjcjlZSERrYjFkOWozWlJjOEtmaDluQTNWRkpOdFZOdEJ2dHNWZVlYQzFqT1N1UktZbUZGemlPQUQyRkprQlludGRlbWFlTW5PMHdVT2hBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcsImFkdlNlY3JldEtleSI6Ijd4eXlMaWtFbWwrM0grakx3Vy96MEhxNHNrUTVXdmcyOHQvZDN6YmtlY0E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAyNzg2MjExNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJERUY5QjI2NTVENjU3NjdFNTFERjg4QTA4QTA5OUE3MiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzEyODI1MjkxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MDI3ODYyMTE2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkZBNUQ4RTkwM0RFRENGNzUwRERDN0Y2ODBDREEzOTQzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTI4MjUyOTF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImtmVU1iT0NRUlgyWU9OSVpZN1IwRFEiLCJwaG9uZUlkIjoiMTY0MTNmODYtZTAxOC00NDkyLWE5NjQtYzc4MWQ0ZWUzMjRmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5HS0UxcFhOVWpTejVidkhnakRXU1hhWDVXaz0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYlRQL1ZydVkvVjNpOVlQak1NNWVpdkR2aklRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTlRDNm9JRkVNYkgzckFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidVJDYWpUOUpORk14V0cybGNwcm1uc3NsZG8yUG5xazZvYmNjam9WZk54UT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUGpoc3Y3KzhzTjlKNFZ3YUhrM01SSWNxVnB4aEhqWWlXUHpZL0t4dEd4S05kQW1WcTk0eFcyZGhBMXFXRkpXcml6MkE3UFFEZ05XY01IMVVzcTlUQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6InUrcEVNSFRiYjV6ZDV1S1NpdC90NzRmLy85eWY3M2lkWW9xaE0zRHlwRi81VE0wanFXRXFHSW1HMlIreVdsWDljZ3NmOW1LWEttNXp3ekMrOFRMZ2pnPT0ifSwibWUiOnsiaWQiOiIyMzQ5MDI3ODYyMTE2OjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQXN0cm9lZGEgVGVhbSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDI3ODYyMTE2OjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYmtRbW8wL1NUUlRNVmh0cFhLYTVwN0xKWGFOajU2cE9xRzNISTZGWHpjVSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxMjgyNTI4OSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQZ2gifQ==";

module.exports = {
  menu: process.env.MENU || "",
  HANDLERS: process.env.PREFIX || "",
  BRANCH: process.env.BRANCH || "main",
  VERSION: process.env.VERSION || "1.0.0",
  caption: process.env.CAPTION || "©ᴀsᴛᴀ ᴍᴅ",
  author: process.env.PACK_AUTHER || "ᴀsᴛᴀ ᴍᴅ",
  packname: process.env.PACK_NAME || "♥️",
  botname: process.env.BOT_NAME || "ᴀsᴛᴀ ᴍᴅ",
  ownername: process.env.OWNER_NAME || "ᴀsᴛᴀ",
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
  LANG: (process.env.THEME || "ASTA").toUpperCase(),
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
