const {
    Config,
    smd
  } = require("../lib");
  const cmd = smd;
  cmd({
    pattern: "getpp",
    desc: "Get Profile Pic For Given User",
    category: "user",
    alias: "getdp",
    filename: __filename
  }, async _0x24b8a0 => {
    try {
      let _0x4cd072 = _0x24b8a0.reply_message ? _0x24b8a0.reply_message.sender : _0x24b8a0.mentionedJid[0] ? _0x24b8a0.mentionedJid[0] : _0x24b8a0.from;
      let _0x23f248;
      try {
        _0x23f248 = await _0x24b8a0.bot.profilePictureUrl(_0x4cd072, "image");
      } catch (_0x42ab42) {
        return _0x24b8a0.reply("```Profile Pic Not Fetched```");
      }
      return await _0x24b8a0.bot.sendMessage(_0x24b8a0.chat, {
        image: {
          url: _0x23f248
        },
        caption: "  *---Profile Pic Is Here---*\n" + Config.caption
      }, {
        quoted: _0x24b8a0
      });
    } catch (_0x40b881) {
      await _0x24b8a0.error(_0x40b881 + "\n\ncommand : getpp", _0x40b881);
    }
  });