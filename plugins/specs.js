const os = require("os");
const fs = require("fs");
const Config = require("../config");
let {
  runtime,
  formatp,
  prefix,
  smd,
} = require("../lib");
const astro_patch = require("../lib/plugins");
const events = astro_patch;
astro_patch.smd(
  {
    pattern: "specs",
    desc: "Bot Specs",
    category: "tools",
    filename: __filename,
  },
  async (message) => {
    const startTime = new Date().getTime();
    const { key } = await message.reply("*ᴄʜᴇᴄᴋɪɴɢ sᴘᴇᴇᴅ...*");
    const endTime = new Date().getTime();
    return await message.send(
      `\n\nᴛʜᴇ sᴘᴇᴇᴅ ᴏғ ${Config.botname} ᴡᴀs ᴛᴇsᴛᴇᴅ.\nʜᴇʀᴇ ᴀʀᴇ ᴛʜᴇ ʀᴇsᴜʟᴛs.\n ᴘɪɴɢɪɴɢ ᴛɪᴍᴇ: ${endTime - startTime} sᴇᴄs\n ᴍᴇᴍᴏʀʏ ᴜsᴀɢᴇ:  ${formatp(os.totalmem() - os.freemem())}\nʀᴜɴᴛɪᴍᴇ: ${runtime(process.uptime())}\n`,
      { edit: key },
      "",
      message,
    );
  },
);
