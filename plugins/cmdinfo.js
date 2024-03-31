const os = require("os");
const Config = require("../config");
let {
  fancytext,
  tlang,
  runtime,
  formatp,
  prefix,
} = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const sᴜʜᴀɪʟ_ᴍᴅ = require("../lib/plugins");

sᴜʜᴀɪʟ_ᴍᴅ.cmd(
  {
    pattern: "cmdesc",
    desc: "list menu",
    category: "tools",
    react: "🥀",
  },
  async (_0x1d5ddc) => {
    try {
      const { commands: _0x7cfe13 } = require("../lib");
      let _0x95885d =
        "\n  ╭━━〘 *" +
        Config.botname +
        "* 〙────⊷     \n  ┃ ✭ Theme: " +
        tlang().title +
        "\n  ┃ ✭ Prefix: " +
        prefix +
        "\n  ┃ ✭ Owner: " +
        Config.ownername +
        "\n  ┃ ✭ Commands: " +
        _0x7cfe13.length +
        "\n  ┃ ✭ Uptime: " +
        runtime(process.uptime()) +
        "\n  ┃ ✭ Mem: " +
        formatp(os.totalmem() - os.freemem()) +
        "/" +
        formatp(os.totalmem()) +
        "\n  ╰━━━━━━━━━━━━━━⊷\n";
      for (let _0x2bd72c = 0; _0x2bd72c < _0x7cfe13.length; _0x2bd72c++) {
        if (_0x7cfe13[_0x2bd72c].pattern == undefined) {
          continue;
        }
        _0x95885d +=
          "*" +
          (_0x2bd72c + 1) +
          " " +
          fancytext(_0x7cfe13[_0x2bd72c].pattern, 1) +
          "*\n";
        _0x95885d += "  " + fancytext(_0x7cfe13[_0x2bd72c].desc, 1) + "\n";
      }
      return await _0x1d5ddc.sendUi(_0x1d5ddc.chat, {
        caption: _0x95885d + Config.caption,
      });
    } catch (_0x3e730d) {
      await _0x1d5ddc.error(_0x3e730d + "\nCommand:list", _0x3e730d);
    }
  }
);