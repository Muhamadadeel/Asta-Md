const os = require("os");
const Config = require("../config");
let { runtime, formatp, prefix, smd } = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
smd(
  {
    pattern: "info",
    type: "MENU list",
    info: "user",
    desc: "About Bot Simply",
    react: "ℹ️",
    dontAddCommandList: true,
  },
  async (message) => {
    try {
      const response = `
*🕒 ᴜᴘ ᴛɪᴍᴇ :* ${runtime(process.uptime())}
*🔉 ᴛᴏᴅᴀʏ ɪs :* ${message.date}
*⌚ ɴᴏᴡ ᴛɪᴍᴇ :* ${message.time}
 ➮  Fᴏᴜɴᴅᴇʀ- ᴀsᴛʀᴏᴘᴇᴅᴀ ᴛᴇᴀᴍ
 ➮  Oᴡɴᴇʀ - ${Config.ownername}
 ➮  Nᴜᴍ - ${owner.split(",")[0]}
 ➮  Mᴇᴍᴏ - ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
 👉🏼 *sɪᴍᴘʟᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ*
${readmore}
╭──❰ *RECOMMEDED* ❱
│🎗 Lɪꜱᴛ
│🎗 Cᴀᴛᴇɢᴏʀʏ
│🎗 Hᴇʟᴘ
│🎗 Aʟɪᴠᴇ
│🎗 Uᴘᴛɪᴍᴇ
│🎗 Wᴇᴀᴛʜᴇʀ
│🎗 Lɪɴᴋ
│🎗 Cᴘᴜ
│🎗 Rᴇᴘᴏꜱɪᴛᴏʀʏ
╰─────────────⦁`.trim();
      return await message.bot.sendUi(message.from, { caption: response });
    } catch (error) {
      await message.error(`${error}\nCommand:menus`, error);
    }
  },
);
