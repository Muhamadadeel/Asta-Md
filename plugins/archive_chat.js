let { smd, prefix, Config } = require("../lib");
smd(
  {
    pattern: "archive",
    fromMe: true,
    desc: "archive whatsapp chat",
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
          archive: true,
          lastMessages: [lstMsg],
        },
        message.jid,
      );
      await message.send("_Archived_");
    } catch (e) {
      message.error(`${e}\n\nCommand : archive`, e, false);
    }
  },
);
