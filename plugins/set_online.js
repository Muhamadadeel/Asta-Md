let { smd, prefix, Config } = require("../lib");

smd(
  {
    pattern: "setonline",
    fromMe: true,
    alias: "online",
    desc: "to change online privacy",
    type: "whatsapp settings",
  },
  async (message, match) => {
    try {
      if (!match)
        return await message.send(`_*Example:-* ${Config.HANDLERS}online all`);
      const available_privacy = ["all", "match_last_seen"];
      if (!available_privacy.includes(match))
        return await message.send(
          `_action must be *${available_privacy.join("/")}* values_`
        );
      await message.bot.updateOnlinePrivacy(match);
      await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) {
      message.error(`${e}\n\nCommand : online`, e, false);
    }
  }
);
