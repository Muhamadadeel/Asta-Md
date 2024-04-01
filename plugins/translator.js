let {
  prefix,
} = require("../lib");
const astro_patch = require("../lib/plugins");
const translatte = require("translatte");

astro_patch.cmd(
  {
    pattern: "trt",
    alias: ["translate"],
    category: "misc",
    filename: __filename,
    use: "< text >",
    desc: "Translate's given text in desird language.",
  },
  async (_0x15cc76, _0xa38a39) => {
    try {
      let _0x4b3f03 = _0xa38a39 ? _0xa38a39.split(" ")[0].toLowerCase() : "en";
      if (!_0x15cc76.reply_text) {
        var _0x5eb566 = _0xa38a39.replace(_0x4b3f03, "")?.trim() || false;
      } else {
        var _0x5eb566 = _0x15cc76.reply_text;
      }
      if (!_0x5eb566) {
        return await _0x15cc76.reply(
          "*Please Give Me Text. Example: _" + prefix + "trt en Who are you_*"
        );
      }
      var _0x443df8 = await translatte(_0x5eb566, {
        from: "auto",
        to: _0x4b3f03,
      });
      if ("text" in _0x443df8) {
        return await _0x15cc76.reply(_0x443df8.text);
      }
    } catch (_0xfe5ca7) {
      await _0x15cc76.error(_0xfe5ca7 + "\n\ncommand trt", _0xfe5ca7);
    }
  }
);