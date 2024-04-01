const axios = require("axios");
const {
  smd,
  Config,
} = require("../lib/");
let s_ser = Config.WORKTYPE === "public" ? false : true;

smd(
  {
    pattern: "tinyrul",
    desc: "Makes url tiny.",
    category: "converter",
    use: "<url>",
    react: "✅",
    filename: __filename,
  },
  async (_0x3363d5, _0x67644e) => {
    try {
      if (!_0x67644e || !_0x67644e.toLowerCase().includes("https")) {
        return _0x3363d5.reply("Provide me a link");
      }
      let _0x5edf77 = _0x67644e.split(" ")[0];
      let _0x3cac2d = await axios.get(
        "https://tinyurl.com/api-create.php?url=" + _0x5edf77
      );
      _0x3363d5.reply("*🛡️Your Shortened URL*\n\n" + _0x3cac2d.data);
    } catch (_0x4aa4d9) {
      return await _0x3363d5.error(_0x4aa4d9 + "\n\ncmdName: tiny", _0x4aa4d9);
    }
  }
);