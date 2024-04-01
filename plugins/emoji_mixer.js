const { StickerTypes } = require("wa-sticker-formatter");
const fetch = require("node-fetch");
const { smdBuffer, prefix, smd, generateSticker, Config } = require("../lib/");
smd(
  {
    pattern: "emojimix",
    desc: "Mixes two emojies.",
    category: "sticker",
    use: "<query>",
    filename: __filename,
  },
  async (_0x157aa6, _0x58cc42) => {
    try {
      let _0x3e64ba = _0x58cc42.split(",")[0] || false;
      let _0x487f40 = _0x58cc42.split(",")[1] || false;
      if (!_0x58cc42 || !_0x3e64ba || !_0x487f40) {
        return _0x157aa6.reply("Example : " + prefix + "emix 😅,🤔");
      }
      const _0x13d720 = await fetch(
        "https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=" +
          _0x3e64ba +
          "_" +
          _0x487f40
      );
      const _0x262274 = await _0x13d720?.json();
      if (!_0x262274 || _0x262274?.locale == "") {
        return _0x157aa6.send("*_Can't create mixture, try other emojies_*");
      } else {
        let _0x4df543 = await smdBuffer(_0x262274.results[0].url);
        let _0x4149c9 = {
          pack: Config.packname,
          author: Config.author,
          type: StickerTypes.FULL,
          quality: 70,
        };
        await generateSticker(_0x157aa6, _0x4df543, _0x4149c9);
        return (_0x4df543 = false);
      }
    } catch (_0x9d8469) {
      return await _0x157aa6.error(_0x9d8469 + "\n\ncmdName: emix");
    }
  }
);
