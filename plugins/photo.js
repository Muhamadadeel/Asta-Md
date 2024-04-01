const fs = require("fs-extra");
const {
  smd,
} = require("../lib/");
let pmtypes = ["imageMessage", "stickerMessage"];
smd(
  {
    cmdname: "photo",
    info: "Makes photo of replied sticker.",
    type: "converter",
    use: "<reply to any gif>",
    filename: __filename,
  },
  async (_0x31249c) => {
    try {
      let _0x15c1a8 = pmtypes.includes(_0x31249c.mtype)
        ? _0x31249c
        : _0x31249c.reply_message;
      if (!_0x15c1a8 || !pmtypes.includes(_0x15c1a8?.mtype)) {
        return _0x31249c.reply("*_Uhh Dear, Reply to Any Sticker.!!_*");
      }
      let _0x32e090 = await _0x31249c.bot.downloadAndSaveMediaMessage(
        _0x15c1a8
      );
      return await _0x31249c.bot.sendMessage(_0x31249c.jid, {
        image: {
          url: _0x32e090,
        },
        mimetype: "image/jpeg",
      });
      try {
        fs.unlink(_0x32e090);
      } catch {}
    } catch (_0x5e6dd0) {
      return await _0x31249c.error(_0x5e6dd0 + "\n\ncmdName: photo\n");
    }
  }
);