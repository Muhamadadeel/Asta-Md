let { smd, prefix, Config } = require("../lib");

smd(
  {
    pattern: "setreadmsg",
    fromMe: true,
    desc: "privacy for read message",
    type: "whatsapp settings",
  },
  async (message, match, cmd) => {
    try {
      if (!match)
        return await message.send(
          `_*Example:-* ${Config.HANDLERS}read all`,
        );
      const available_privacy = ["all", "none"];
      if (!available_privacy.includes(match))
        return await message.send(
          `_action must be *${available_privacy.join("/")}* values_`,
        );
      await message.bot.updateReadReceiptsPrivacy(match);
      await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) {
      message.error(`${e}\n\nCommand : read`, e, false);
    }
  },
);
