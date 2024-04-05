//ASTA
const fs = require("fs-extra");
if (fs.existsSync(".env"))
  require("dotenv").config({ path: __dirname + "/.env" });

//=======[dependencies]====================//
global.SESSION_ID = process.env.SESSION_ID || "Asta;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0VLNys3QlFjMzcrNXhTOThVcVN6R09UdWtVMEk3ZEZtUXhsMlpOVXNuZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibTdYU3AwaDRCSWtqN0dRYVpRK1FJNVg0N2J3azVLdGxYMlZQK011d0dHST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0R1NnNkdmSmQwVm00d21yQkhVYlppMFp3dVhqNVF3bFVqK3AzMm1KQTJnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLTlV6a2Q0SjFmczMxZ3h0S29HbGNIbVN2dGVTdkNxbGhMNzlpVS82Y3dNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdGMmM0aFhaNFM1djcrVjV3QzZGV2Fvb25mV0dMUWxsKzBCdVM2UXBNbHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxXN3llZ0NnaVU1aUxlOVV0aEdoWXVrSllNcTNKRXNrRzBaUVl4ajVseGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVBScS90dUFKL2JXME9FOXYyZi8ydHBpajlGSTg2dFVaRnJWbG5aYW5YVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidTFmYnRGL041MVBwemdqcU1WSWtwYXUvdVYrM3dlQ2g4ZEJ1MGJEUnRCaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZnTFVzUi9JbVdwSFhNdENsQVJXaU1vT3R1WjJKb3FEaG9YNC8vSlpPQ1Y3VEVINnN4TlI3ZDl1N0RHYTRPbHBkd2ZYZ0xZNHFGYjdiVVlmdE5wWGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAwLCJhZHZTZWNyZXRLZXkiOiJ6RGFmQTgyZkIyOEM2M2twZG1CNTgrcXVaWVZyOWNBNlJ0Wnc0bmd6aWtVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwMjc4NjIxMTZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMURGMjhDRkI0NjZBRDcyNjQwOTA0MDM2OUMzM0U0NkMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxMjA2NzY5M30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAyNzg2MjExNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDRjgwMDFBNjc3QzMxQkU0QUQ3QUYyNjc3MEY3MTBBRCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzEyMDY3NjkzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MDI3ODYyMTE2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjIyNzBFNDBGMjM5MjcxMkZDQUJGM0JGNzI0M0YwNTMzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTIwNjc2OTV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwMjc4NjIxMTZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQkY5Q0U1M0E1QzFEODM1REUzMkVCM0E2N0FCMjY3NjYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxMjA2NzY5NX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoicGxwMkZST0dUY2U4eUlZWjE0RDB1USIsInBob25lSWQiOiJjNjIwYTVlOC0wNDUzLTRkZmQtOTM0NC03NTU0NDFjODA4OTkiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWmgxR2tZSEEzd2I4Y2VPZHZFT2dWV0NTU1NzPSJ9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHcE9qTWF5M1czY3l0bWpMUzBva2wyYkxYRHM9In0sInJlZ2lzdHJhdGlvbiI6e30sImFjY291bnQiOnsiZGV0YWlscyI6IkNOckhqa1FRNnFpd3NBWVlBaUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJGRjRxNHg1cmlGRU5vOVpWaVh0VHVMZitHYTA5N3h6MWN5SHFOSkxMRmxNPSIsImFjY291bnRTaWduYXR1cmUiOiJJdjZYZ09vM2RRajhwRFI3U3FPSXM3eDlJWFoycFkxNG5LS0VBQldPWTFGZlVkTmFHRTdtM1RiNE93ek1iMHNueDVnT3F0c1Zoa2NsNDZsK3hEMmxEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMTkwVnhHN255MkJ1L1pEUlFIK3AyOGtjMlJDbXNqNCszQkRCeEZ0RXdmRlpDK1lRVERsT0tVNjZPZlVsSytucGxnRENGSUVvaUFWZUJudlJkNXVKaUE9PSJ9LCJtZSI6eyJpZCI6IjIzNDkwMjc4NjIxMTY6ODNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiZGFuaWVsYXN0cm8wMDEwIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkwMjc4NjIxMTY6ODNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUlJlS3VNZWE0aFJEYVBXVllsN1U3aTMvaG10UGU4YzlYTWg2alNTeXhaVCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxMjA2NzY5MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCTzUifQ==";
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
