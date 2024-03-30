let {
  smd,
  prefix,
  cmd
} = require("../lib");
const {cmd} = require("../lib/plugins");

cmd({
  pattern: "pmsg",
  desc: "Send circle Message of video",
  category: "whatsapp settings",
  filename: __filename
}, async (msg) => {
  try {
    if (!msg.quoted || msg.quoted.mtype !== "videoMessage") {
      return await msg.send("*Uhh Dear, reply to a video message*");
    }
    await msg.bot.forwardOrBroadCast(msg.chat, msg.quoted, {}, "pmsg");
  } catch (error) {
    await msg.error(`${error}\n\ncommand : psmg`, error);
  }
});