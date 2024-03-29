let { smd, prefix, Config } = require("../lib");

smd(
  {
    pattern: "setmypp",
    fromMe: true,
    alias: "mypp",
    desc: "privacy setting profile picture",
    type: "whatsapp settings",
  },
  async (message, match) => {
    try {
      if (!match)
        return await message.send(
          `_*Example:-* ${Config.HANDLERS}mypp all`,
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
      await message.bot.updateProfilePicturePrivacy(match);
      await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) {
      message.error(`${e}\n\nCommand : mypp`, e, false);
    }
  },
);
