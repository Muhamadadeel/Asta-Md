const { prefix, smd } = require("../lib/");

smd(
  {
    pattern: "fliptext",
    desc: "Flips given text.",
    category: "converter",
    use: "<query>",
    filename: __filename,
  },
  async (_0x40c0dd, _0x4b44c3) => {
    try {
      let _0x50d439 = _0x4b44c3 ? _0x4b44c3 : _0x40c0dd.reply_text;
      if (!_0x50d439) {
        return _0x40c0dd.reply(
          "*_Example : " + prefix + "fliptext Suhail MD!_*"
        );
      }
      let _0x41976b = _0x50d439.split("").reverse().join("");
      await _0x40c0dd.reply(
        "*「  Text Flipper Tool  」* \n*IGiven text :*\n" +
          _0x50d439 +
          "\n\n*Fliped text :*\n" +
          _0x41976b
      );
    } catch (_0x59c879) {
      await _0x40c0dd.error(_0x59c879 + "\n\ncommand : fliptext", _0x59c879);
    }
  }
);
