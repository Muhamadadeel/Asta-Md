const { updateProfilePicture, parsedJid } = require("../lib");
const {
  sck,
  smd,
  send,
  Config,
  tlang,
  sleep,
  getAdmin,
  prefix,
} = require("../lib");
const ᴀsᴛᴀ_ᴍᴅ = require("../lib/plugins");
const { cmd } = ᴀsᴛᴀ_ᴍᴅ;
const grouppattern = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22}/g;
