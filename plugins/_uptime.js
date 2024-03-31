let { tlang, runtime } = require("../lib");
const sᴜʜᴀɪʟ_ᴍᴅ = require("../lib/plugins");
sᴜʜᴀɪʟ_ᴍᴅ.cmd(
  {
    pattern: "uptime",
    alias: ["runtime"],
    desc: "Tells runtime/uptime of bot.",
    category: "misc",
    filename: __filename,
  },
  async (_0x50127f) => {
    try {
      _0x50127f.reply(
        "*_Uptime of " + tlang().title + ": " + runtime(process.uptime()) + "_*"
      );
    } catch (_0x5ed240) {
      await _0x50127f.error(
        _0x5ed240 + "\n\ncommand : uptime",
        _0x5ed240,
        false
      );
    }
  }
);
