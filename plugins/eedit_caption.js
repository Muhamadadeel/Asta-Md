let { smd} = require("../lib");

smd(
  {
    cmdname: "editcaption",
    alias: ["setcaption"],
    desc: "set caption for Replied Message",
    category: "tools",
    filename: __filename,
  },
  async (_0xcc3d0b, _0x718ae9) => {
    try {
      if (!_0xcc3d0b.reply_message || !_0x718ae9) {
        return await _0xcc3d0b.reply(
          !_0xcc3d0b.reply_message
            ? "*_Please reply to message with caption | filname_*"
            : "*Please provide text to set caption!*",
        );
      }
      if (
        _0xcc3d0b.reply_message.image ||
        _0xcc3d0b.reply_message.video ||
        _0xcc3d0b.reply_message.mtype.includes("document")
      ) {
        let _0x4e09a5 = "" + _0x718ae9.split("|")[1]?.trim() || "null";
        let _0x14b6a8 = _0xcc3d0b.reply_message.mtype.includes("document")
          ? _0x718ae9.split("|")[0].trim()
          : _0x718ae9;
        _0xcc3d0b.reply_message.message[_0xcc3d0b.reply_message.mtype].caption =
          _0x14b6a8;
        _0xcc3d0b.reply_message.message[
          _0xcc3d0b.reply_message.mtype
        ].fileName = _0x4e09a5;
        await _0xcc3d0b.bot.copyNForward(
          _0xcc3d0b.chat,
          _0xcc3d0b.reply_message,
        );
      } else {
        return await _0xcc3d0b.reply(
          "please reply to an Audio/Video/document message",
        );
      }
    } catch (_0x5ab188) {
      await _0xcc3d0b.error(
        _0x5ab188 + "\n\ncommand : caption",
        _0x5ab188,
        false,
      );
    }
  },
);