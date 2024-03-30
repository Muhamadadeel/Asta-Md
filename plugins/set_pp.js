const moment = require("moment-timezone");
const Config = require("../config");
let {
  smd,
  prefix,
  updateProfilePicture,
  parsedJid
} = require("../lib");
const {cmd} = require("../lib/plugins");
let mtypes = ["imageMessage"];
const setProfilePicture = async (msg, type) => {
  try {
    const message = mtypes.includes(msg.mtype) ? msg : msg.reply_message;
    if (!message || !mtypes.includes(message?.mtype || "need_Media")) {
      return await msg.reply("`Please Reply to an Image to use`");
    }
    return await updateProfilePicture(msg, msg.user, message, type);
  } catch (error) {
    await msg.error(`${error}\n\ncommand: ${type}`, error);
  }
};
smd({
  pattern: "setpp",
  alias: "pp",
  desc: "Set profile picture",
  category: "whatsapp settings",
  use: "<reply to image>",
  fromMe: true,
  filename: __filename
}, async (msg) => await setProfilePicture(msg, "pp"));
smd({
  pattern: "fullpp",
  desc: "Set full screen profile picture",
  category: "whatsapp settings",
  use: "<reply to image>",
  fromMe: true,
  filename: __filename
}, async (msg) => await setProfilePicture(msg, "fullpp"));
smd({
    pattern: "rpp",
    desc: "Remove profile picture",
    category: "whatsapp settings",
    use: "<chat>",
    fromMe: true,
    filename: __filename
  }, async (msg) => {
    try {
      await msg.removepp();
      msg.send("`Profile Picture Removed`");
    } catch (error) {
      await msg.error(`${error}\n\ncommand : rpp`, error);
    }
  });