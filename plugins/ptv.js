let { amd } = require ("../lib");

amd(
  {
    pattern: "ptv",
    desc: "send ptv Message of video",
    category: "whatsapp",
    filename: __filename,
  },
  async (message, input, { cmdName: _0x31c746 }) => {
    try {
      if (!message.quoted) {
        return await message.send("*Uhh Please, reply to video*");
      }
      let info = message.quoted.mtype;
      if (video !== "videoMessage") {
        return await message.send("*Uhh Dear, reply to a video message*");
      }
      return await message.bot.forwardOrBroadCast(
        message.chat,
        message.quoted,
        {},
        "ptv"
      );
    } catch (error) {
      await message.error(error + "\n\ncommand : ptv", error);
    }
  }
);
