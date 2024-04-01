const { StickerTypes } = require("wa-sticker-formatter");
const {
  smd,
  generateSticker,
  Config,
} = require("../lib/");
let s_ser = Config.WORKTYPE === "public" ? false : true;
let mtypes = ["imageMessage", "videoMessage", "stickerMessage"];
smd(
  {
    cmdname: "sticker",
    alias: ["s"],
    info: "Makes sticker of replied image/video.",
    type: "sticker",
    fromMe: s_ser,
    filename: __filename,
    use: "<reply to any image/video.>",
  },
  async (_0x1ed9dc) => {
    try {
      let _0x35efea = mtypes.includes(_0x1ed9dc.mtype)
        ? _0x1ed9dc
        : _0x1ed9dc.reply_message;
      if (_0x35efea && mtypes.includes(_0x35efea?.mtype || "need_Media")) {
        let _0x499c2c = await _0x35efea.download();
        let _0x450746 = {
          pack: Config.packname,
          author: Config.author,
          type: StickerTypes.FULL,
          quality: 10,
        };
        await generateSticker(_0x1ed9dc, _0x499c2c, _0x450746);
        return (_0x499c2c = false);
      } else {
        return _0x1ed9dc.reply("*_Uhh Dear, Reply to image/video!!_*");
      }
    } catch (_0x3a7be5) {
      return await _0x1ed9dc.error(_0x3a7be5 + "\n\ncmdName: sticker\n");
    }
  }
);