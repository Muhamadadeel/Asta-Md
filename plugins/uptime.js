let { tlang, runtime, prefix, smd } = require("../lib");
const astro_patch = require("../lib/plugins");
astro_patch.smd(
  {
    pattern: "runtime",
    alias: ["uptime"],
    desc: "Shows how long the bot has been running.",
    category: "misc",
    filename: __filename,
  },
  async (message) => {
    try {
      message.reply(
        `*ʀᴜɴɴɪɴɢ sɪɴᴄᴇ ${tlang().title}: ${runtime(process.uptime())}*`,
      );
    } catch (error) {
      await message.error(`${error}\n\ncommand : uptime`, error, false);
    }
  },
);
