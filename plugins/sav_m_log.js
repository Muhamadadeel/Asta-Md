const moment = require("moment-timezone");
const Config = require("../config");
let {
  smd,
  cmd,
  prefix,
} = require("../lib");

cmd({
  pattern: "save",
  desc: "Save Message to log number",
  category: "whatsapp settings",
  filename: __filename
}, async (msg) => {
  try {
    const message = msg.reply_message;
    if (!message) {
      return await msg.send("*Uhh Please, reply to a Message*");
    }
    await msg.bot.forwardOrBroadCast(msg.user, message);
  } catch (error) {
    await msg.error(`${error}\n\ncommand : save`, error);
  }
});