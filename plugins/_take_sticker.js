const { StickerTypes } = require("wa-sticker-formatter");
const {
  smd,
  generateSticker,
  Config,
} = require("../lib/");
let s_ser = Config.WORKTYPE === "public" ? false : true;
smd(
  {
    cmdname: "take",
    info: "Makes sticker of replied image/video.",
    type: "sticker",
    fromMe: s_ser,
    filename: __filename,
    use: "<reply to sticker.>",
  },
  async (_0x3cf292, _0x346606) => {
    try {
      let _0x4318f7 = _0x3cf292.reply_message;
      if (!_0x4318f7 || _0x4318f7?.mtype != "stickerMessage") {
        return await _0x3cf292.reply("*Uhh Please, Reply to sticker*");
      }
      let _0x3f4bbc = _0x346606.split("|");
      let _0x58d18b =
        _0x3f4bbc[0]?.trim() !== "" ? _0x3f4bbc[0] : _0x3cf292.pushName;
      let _0x239cb7 =
        _0x3f4bbc[1] && _0x3f4bbc[1] !== "" ? _0x3f4bbc[1] : "ᴀsᴛᴀ-ᴍᴅ ♥️";
      let _0x2d3018 = await _0x4318f7.download();
      let _0x1913d2 = {
        pack: _0x58d18b,
        author: _0x239cb7,
        type: StickerTypes.FULL,
        quality: 10,
      };
      await generateSticker(_0x3cf292, _0x2d3018, _0x1913d2);
      return (_0x2d3018 = false);
    } catch (_0x48ad5b) {
      return await _0x3cf292.error(_0x48ad5b + "\n\ncmdName: take\n");
    }
  }
);