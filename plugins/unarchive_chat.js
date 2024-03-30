let { smd, prefix, Config } = require("../lib");

smd(
  {
    pattern: "unarchive",
    fromMe: true,
    desc: "unarchive whatsapp chat",
    type: "whatsapp",
  },
  async (message, match) => {
    try {
      const lstMsg = {
        message: message.message,
        key: message.key,
        messageTimestamp: message.messageTimestamp,
      };
      await message.bot.chatModify(
        {
          archive: false,
          lastMessages: [lstMsg],
        },
        message.jid
      );
      await message.send("_Unarchived_");
    } catch (e) {
      message.error(`${e}\n\nCommand : unarchive`, e, false);
    }
  }
);
