const { smd } = require("../lib");
const cmd = smd;
cmd(
  {
    pattern: "walink",
    desc: "Makes wa me of quoted or mentioned user.",
    category: "user",
    filename: __filename,
  },
  async (_0x3186cd) => {
    try {
      let _0x3c71d6 = _0x3186cd.reply_message
        ? _0x3186cd.reply_message.sender
        : _0x3186cd.mentionedJid[0]
        ? _0x3186cd.mentionedJid[0]
        : false;
      await _0x3186cd.reply(
        !_0x3c71d6
          ? "*Reply or tag the user*"
          : "https://wa.me/" + _0x3c71d6.split("@")[0]
      );
    } catch (_0x100353) {
      await _0x3186cd.error(_0x100353 + "\n\ncommand : wa", _0x100353, false);
    }
  }
);
