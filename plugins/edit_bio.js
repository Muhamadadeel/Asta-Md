const moment = require("moment-timezone");
const Config = require("../config");
let {
  smd,
  prefix,
} = require("../lib");

smd({
  pattern: "bio",
  desc: "Update profile status of WhatsApp",
  category: "whatsapp settings",
  use: "<text>",
  fromMe: true,
  filename: __filename
}, async (msg, text) => {
  try {
    if (!text) {
      return await msg.send("*_Provide text to update profile status!_*\n*_Example: " + prefix + "bio Asta Md_*");
    }
    await msg.bot.updateProfileStatus(text);
    msg.send("`Edited Bio!`");
  } catch (error) {
    await msg.error(`${error}\n\ncommand : bio`, error);
  }
});