const fs = require("fs-extra");
const { StickerTypes } = require("wa-sticker-formatter");
const {
  getBuffer,
  smd,
  generateSticker,
  TelegraPh,
  Config,
} = require("../lib/");
let s_ser = Config.WORKTYPE === "public" ? false : true;
let mtypes = ["imageMessage", "videoMessage", "stickerMessage"];
smd(
  {
    pattern: "memegen",
    desc: "Write text on quoted image.",
    category: "sticker",
    filename: __filename,
    use: "<text>",
  },
  async (_0x90ccdb, _0x387cd8) => {
    try {
      let _0x45321f = pmtypes.includes(_0x90ccdb.mtype)
        ? _0x90ccdb
        : _0x90ccdb.reply_message;
      if (!_0x387cd8) {
        return await _0x90ccdb.reply("*please provide text and image*");
      }
      if (!_0x45321f || !pmtypes.includes(_0x45321f.mtype)) {
        return _0x90ccdb.reply("*Uhh please, Reply to an image*");
      }
      let _0x198430 = _0x387cd8.split("|")[0] || "";
      let _0x5840c2 = (_0x387cd8.split("|")[1] || "sticker").toLowerCase();
      let _0x24c5a6 = _0x198430.split(";")[0] || "_";
      let _0xf2bbd9 = _0x198430.split(";")[1] || "_";
      let _0xc213f = await _0x90ccdb.bot.downloadAndSaveMediaMessage(_0x45321f);
      let _0x1857e2 = await TelegraPh(_0xc213f);
      try {
        fs.unlinkSync(_0xc213f);
      } catch (_0x31e42c) {}
      console.log("match", _0x387cd8);
      let _0x32e779 = await getBuffer(
        "https://api.memegen.link/images/custom/" +
          _0x24c5a6 +
          "/" +
          _0xf2bbd9 +
          ".png?background=" +
          _0x1857e2
      );
      if (_0x5840c2?.startsWith("p")) {
        await _0x90ccdb.send(
          _0x32e779,
          {
            caption: Config.caption,
          },
          "image"
        );
      }
      let _0x5397ec = {
        pack: Config.packname,
        author: Config.author,
        type: StickerTypes.FULL,
        quality: 70,
      };
      await generateSticker(_0x90ccdb, _0x32e779, _0x5397ec);
      return (_0x32e779 = false);
    } catch (_0x68a864) {
      await _0x90ccdb.error(_0x68a864 + "\n\ncmdName: memegen\n");
      return console.log(_0x68a864);
    }
  }
);
