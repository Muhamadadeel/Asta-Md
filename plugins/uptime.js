let {
  tlang,
  runtime,
  prefix,
  smd,
} = require("../lib");
const astro_patch = require("../lib/plugins");
astro_patch.smd(
  {
    pattern: "uptime",
    alias: ["runtime"],
    desc: "Tells runtime/uptime of bot.",
    category: "misc",
    filename: __filename,
  },
  async (message) => {
    try {
      message.reply(
        `*_Uptime of ${tlang().title}: ${runtime(process.uptime())}_*`,
      );
    } catch (error) {
      await message.error(`${error}\n\ncommand : uptime`, error, false);
    }
  },
);