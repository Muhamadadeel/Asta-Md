const { StickerTypes } = require("wa-sticker-formatter");
const { smd, generateSticker, Config } = require("../lib/");
let s_ser = Config.WORKTYPE === "public" ? false : true;
let mtypes = ["imageMessage", "videoMessage", "stickerMessage"];
smd(
  {
    cmdname: "round",
    alias: ["roundstic", "roundsticker"],
    info: "Makes sticker of replied image/video.",
    type: "sticker",
    fromMe: s_ser,
    filename: __filename,
    use: "<reply to image.>",
  },
  async (_0x23e332) => {
    try {
      let _0x451f57 = mtypes.includes(_0x23e332.mtype)
        ? _0x23e332
        : _0x23e332.reply_message;
      if (_0x451f57 && mtypes.includes(_0x23e332?.mtype || "need_Media")) {
        let _0x2133c1 = await _0x451f57.download();
        let _0x5978a7 = {
          pack: Config.packname,
          author: Config.author,
          type: StickerTypes.ROUNDED,
          quality: 50,
        };
        await generateSticker(_0x23e332, _0x2133c1, _0x5978a7);
        return (_0x2133c1 = false);
      } else {
        return _0x23e332.reply("*_Uhh Dear, Reply to an image!!_*");
      }
    } catch (_0x4571ef) {
      return await _0x23e332.error(
        _0x4571ef + "\n\ncmdName: round\n",
        "*_Request Failed, Make sure You replied an image!_*"
      );
    }
  }
);
