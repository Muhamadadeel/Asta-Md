const { StickerTypes } = require("wa-sticker-formatter");
const { smd, generateSticker, Config } = require("../lib/");
let s_ser = Config.WORKTYPE === "public" ? false : true;
let mtypes = ["imageMessage", "videoMessage", "stickerMessage"];
smd(
  {
    cmdname: "circle",
    alias: ["circlestic", "circlesticker", "cs"],
    info: "circle sticker of image.",
    type: "sticker",
    fromMe: s_ser,
    filename: __filename,
    use: "<reply to image.>",
  },
  async (_0x562f84) => {
    try {
      let _0x4d96d0 = mtypes.includes(_0x562f84.mtype)
        ? _0x562f84
        : _0x562f84.reply_message;
      if (_0x4d96d0 && mtypes.includes(_0x562f84?.mtype || "need_Media")) {
        let _0x5a6878 = await _0x4d96d0.download();
        let _0x4362c6 = {
          pack: Config.packname,
          author: Config.author,
          type: StickerTypes.CIRCLE,
          quality: 50,
        };
        await generateSticker(_0x562f84, _0x5a6878, _0x4362c6);
        return (_0x5a6878 = false);
      } else {
        return _0x562f84.reply("*_Uhh Dear, Reply to image!!_*");
      }
    } catch (_0x3cc69e) {
      return await _0x562f84.error(
        _0x3cc69e + "\n\ncmdName: circle\n",
        "*_Request Failed, Make sure You replied an image_*"
      );
    }
  }
);
