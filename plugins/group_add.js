let { smd, prefix, Config } = require("../lib");
smd(
  {
    pattern: "setgroupadding",
    fromMe: true,
    alias: "groupadd",
    desc: "privacy for group add",
    type: "whatsapp settings",
  },
  async (message, match, cmd) => {
    try {
      if (!match)
        return await message.send(
          `_*Example:-* ${Config.HANDLERS}groupadd all.`,
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
      await message.bot.updateGroupsAddPrivacy(match);
      await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) {
      message.error(`${e}\n\nCommand : groupadd`, e, false);
    }
  },
);
