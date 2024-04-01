const {
  smdBuffer,
  prefix,
  smd,
  generateSticker,
  Config,
} = require("../lib/");
let s_ser = Config.WORKTYPE === "public" ? false : true;
smd(
  {
    cmdname: "attp",
    info: "Makes sticker of given text.",
    type: "sticker",
    fromMe: s_ser,
    filename: __filename,
    use: "< text.>",
  },
  async (_0x4b306f, _0x5a41b8) => {
    try {
      let _0xc12a91 = await smdBuffer(
        "https://raganork-api.onrender.com/api/attp?text=" +
          (_0x5a41b8 ? _0x5a41b8 : "Please provide text to generate sticker") +
          "&apikey=with_love_souravkl11"
      );
      return await generateSticker(_0x4b306f, _0xc12a91);
    } catch (_0x1657c4) {
      return await _0x4b306f.error(_0x1657c4 + "\n\ncmdName: attp\n");
    }
  }
);