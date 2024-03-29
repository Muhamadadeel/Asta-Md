let { smd, prefix, Config } = require("../lib");

smd(
  {
    pattern: "mystatus",
    fromMe: true,
    desc: "privacy for my status",
    type: "whatsapp settings",
  },
  async (message, match) => {
    try {
      if (!match)
        return await message.send(
          `_*Example:-* ${Config.HANDLERS}mystatus all`,
        );
      const available_privacy = [
        "all",
        "contacts",
        "contact_blacklist",
        "none",
      ];
      if (!available_privacy.includes(match))
        return await message.send(
          `_action must be *${available_privacy.join("/")}* values_`,
        );
      await message.bot.updateStatusPrivacy(match);
      await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) {
      message.error(`${e}\n\nCommand : mystatus`, e, false);
    }
  },
);
