let { smd } = require("../lib");

smd(
  {
    cmdname: "unblock",
    info: "Unblocked user.",
    type: "whatsapp settings",
    fromMe: true,
    filename: __filename,
  },
  async (_0xdd6403) => {
    try {
      let _0xe86e54 = _0xdd6403.reply_message
        ? _0xdd6403.reply_message.sender
        : !_0xdd6403.isGroup
        ? _0xdd6403.from
        : _0xdd6403.mentionedJid[0]
        ? _0xdd6403.mentionedJid[0]
        : "";
      if (!_0xe86e54 && !_0xe86e54.includes("@s.whatsapp.net")) {
        return await _0xdd6403.reply("*Uhh dear, reply/mention an User*");
      }
      await _0xdd6403.bot
        .updateBlockStatus(_0xe86e54, "unblock")
        .then((_0x4f3a25) =>
          _0xdd6403.send(
            "*@" + _0xe86e54.split("@")[0] + " Unblocked Successfully..!*",
            {
              mentions: [users],
            }
          )
        )
        .catch((_0x2f7e88) =>
          _0xdd6403.reply("*_Can't Unblock user, Make sure user blocked!!_*")
        );
    } catch (_0x5ae50f) {
      await _0xdd6403.error(_0x5ae50f + "\n\ncommand: unblock", _0x5ae50f);
    }
  }
);
