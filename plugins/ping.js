let { smd } = require("../lib");
const astro_patch = require("../lib/plugins");
astro_patch.smd(
  {
    pattern: "ping",
    desc: "To check ping",
    category: "tools",
    filename: __filename,
  },
  async (message) => {
    const startTime = new Date().getTime();
    const { key } = await message.reply("*Testing Ping!!!*");
    const endTime = new Date().getTime();
    return await message.send(
      `*Bot Speed*\n *${endTime - startTime} ms* `,
      { edit: key },
      "",
      message,
    );
  },
);
