let {
  smd,
} = require("../lib");
smd({
  cmdname: "block",
  info: "blocks a person",
  fromMe: true,
  type: "whatsapp settings",
  filename: __filename,
  use: "<quote/reply user.>"
}, async _0x1ed3b3 => {
  try {
    let _0x3489cf = _0x1ed3b3.reply_message ? _0x1ed3b3.reply_message.sender : !_0x1ed3b3.isGroup ? _0x1ed3b3.from : _0x1ed3b3.mentionedJid[0] ? _0x1ed3b3.mentionedJid[0] : "";
    if (!_0x3489cf && !_0x3489cf.includes("@s.whatsapp.net")) {
      return await _0x1ed3b3.reply("*Uhh dear, reply/mention an User*");
    }
    if (_0x1ed3b3.checkBot(_0x3489cf)) {
      return await _0x1ed3b3.reply("*Huh, I can't block my Creator!!*");
    }
    await _0x1ed3b3.bot.updateBlockStatus(_0x3489cf, "block").then(_0x112d4d => {
      _0x1ed3b3.react("✨", _0x1ed3b3);
    }).catch(_0x4deb64 => _0x1ed3b3.reply("*_Can't block user, Sorry!!_*"));
  } catch (_0x337f7a) {
    await _0x1ed3b3.error(_0x337f7a + "\n\ncommand: block", _0x337f7a, false);
  }
});