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
    cmdname: "crop",
    alias: ["cropsticker"],
    info: "Makes sticker of replied image.",
    type: "sticker",
    fromMe: s_ser,
    filename: __filename,
    use: "<reply to image.>",
  },
  async (_0x2d770a) => {
    try {
      let _0x3b8ae0 = mtypes.includes(_0x2d770a.mtype)
        ? _0x2d770a
        : _0x2d770a.reply_message;
      if (_0x3b8ae0 && mtypes.includes(_0x2d770a?.mtype || "need_Media")) {
        let _0x152b54 = await _0x3b8ae0.download();
        let _0x409981 = {
          pack: Config.packname,
          author: Config.author,
          type: StickerTypes.CROPPED,
          quality: 50,
        };
        await generateSticker(_0x2d770a, _0x152b54, _0x409981);
        return (_0x152b54 = false);
      } else {
        return _0x2d770a.reply("*_Uhh Dear, Reply to image!!_*");
      }
    } catch (_0x251216) {
      return await _0x2d770a.error(
        _0x251216 + "\n\ncmdName: crop\n",
        "*_Request Failed, Reply to an image only!_*"
      );
    }
  }
);