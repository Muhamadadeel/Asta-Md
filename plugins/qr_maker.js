const { smd } = require("../lib/");
smd(
  {
    pattern: "qr",
    category: "converter",
    filename: __filename,
    use: "< text >",
    desc: "Sends CitelsVoid Qr code to scan and get your session id.",
  },
  async (_0x5c23f7, _0x4d7194) => {
    try {
      if (!_0x4d7194) {
        return _0x5c23f7.reply("*Provide Text To generate QR!*");
      }
      let _0x5eff70 =
        "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=" + text;
      await _0x5c23f7.bot.sendUi(
        _0x5c23f7.jid,
        {
          caption: "*_Scan Qr To Get You Text_*",
        },
        {
          quoted: _0x5c23f7,
        },
        "image",
        _0x5eff70
      );
    } catch (_0x37514c) {
      await _0x5c23f7.error(_0x37514c + "\n\ncommand : qr", _0x37514c);
    }
  }
);
