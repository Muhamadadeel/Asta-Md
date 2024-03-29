let { smd, prefix, updateProfilePicture } = require("../lib");
const { cmd } = require("../lib/plugins");
let mtypes = ["imageMessage"];

cmd(
  {
    pattern: "vv",
    alias: ["viewonce", "retrive"],
    desc: "download viewOnce Message.",
    category: "whatsapp settings",
    use: "<query>",
    react: "🫦",
    filename: __filename,
  },
  async (_0x5e331d, _0x237d8a) => {
    try {
      var _0x17ffa2 = false;
      if (_0x5e331d.reply_message) {
        if (
          _0x5e331d.reply_message.viewOnce ||
          (_0x5e331d.device === "ios" &&
            /audioMessage|videoMessage|imageMessage/g.test(
              _0x5e331d.reply_message.mtype,
            ))
        ) {
          _0x17ffa2 = _0x5e331d.reply_message;
        }
      }
      _0x17ffa2.mtype = _0x17ffa2.mtype2;
      if (!_0x17ffa2) {
        return _0x5e331d.reply("```Please Reply A ViewOnce Message```");
      }
      let _0x86453 = {
        key: _0x17ffa2.key,
        message: {
          conversation: "```[VIEWONCE FOUND DOWNLOAD 100%]```",
        },
      };
      let _0x22f0a2 = await _0x5e331d.bot.downloadAndSaveMediaMessage(
        _0x17ffa2.msg,
      );
      await _0x5e331d.bot.sendMessage(
        _0x5e331d.jid,
        {
          [_0x17ffa2.mtype2.split("Mess")[0]]: {
            url: _0x22f0a2,
          },
          caption: _0x17ffa2.body,
        },
        {
          quoted: _0x86453,
        },
      );
    } catch (_0x23316d) {
      await _0x5e331d.error(_0x23316d + "\n\ncommand: vv", _0x23316d);
    }
  },
);
