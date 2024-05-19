let { amd } =require("../lib");
amd(
  {
    pattern: "msave",
    desc: "Save Message to log number",
    category: "whatsapp",
    filename: __filename,
  },
  async (message, _0x5ad999, { cmdName: _0x2cb44f }) => {
    try {
      let saver = message.reply_message;
      if (!saver) {
        return await message.send("*Uhh Please, reply to to a Message*");
      }
      let data = await message.bot.forwardOrBroadCast(
        message.user,
        saver
      );
    } catch (_0x43530a) {
      await message.error(_0x43530a + "\n\ncommand : save", _0x43530a);
    }
  }
);