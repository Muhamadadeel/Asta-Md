const os = require("os");
const fs = require("fs");
const Config = require("../config");
let { runtime, formatp, prefix, smd } = require("../lib");
const astro_patch = require("../lib/plugins");
const events = astro_patch;
astro_patch.smd(
  {
    pattern: "ping2",
    desc: "Ping the bot with more info.",
    category: "tools",
    filename: __filename,
  },
  async (message) => {
    const startTime = new Date().getTime();
    const { key } = await message.reply("*ᴄʜᴇᴄᴋɪɴɢ sᴘᴇᴇᴅ...*");
    const endTime = new Date().getTime();
    return await message.send(
      `
ᴛʜᴇ sᴘᴇᴇᴅ ᴏғ ${Config.botname} ᴡᴀs ᴛᴇsᴛᴇᴅ.
ʜᴇʀᴇ ᴀʀᴇ ᴛʜᴇ ʀᴇsᴜʟᴛs.
ᴘɪɴɢɪɴɢ ᴛɪᴍᴇ: ${endTime - startTime} sᴇᴄs
ᴍᴇᴍᴏʀʏ ᴜsᴀɢᴇ:  ${formatp(os.totalmem() - os.freemem())}
ʀᴜɴᴛɪᴍᴇ: ${runtime(process.uptime())}\n`,
      { edit: key },
      "",
      message,
    );
  },
);
