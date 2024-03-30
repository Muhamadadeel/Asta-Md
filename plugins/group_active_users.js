let { smd } = require("../lib");
const Config = require("../config");
smd(
  {
    cmdname: "activeusers",
    alias: ["countmessage", "msgcount"],
    desc: "Check how many users continuesly active in chat!",
    category: "group",
    filename: __filename,
  },
  async (_0x1cec94, _0x2535b1, { store: _0x264360 }) => {
    try {
      let _0x5af784 = {};
      _0x264360.messages[_0x1cec94.jid].array.forEach((_0x2ec32f) => {
        const _0xd05e4b =
          _0x2ec32f.pushName ||
          (_0x1cec94.isGroup
            ? _0x2ec32f.key.participant
            : _0x2ec32f.key.remoteJid || "unknown"
          ).split("@")[0];
        _0x5af784[_0xd05e4b] = (_0x5af784[_0xd05e4b] || 0) + 1;
      });
      let _0x599777 = Object.entries(_0x5af784);
      if (!_0x599777 || !_0x599777[0]) {
        return await _0x1cec94.reply("_No messages found!_");
      }
      const _0x338160 = Object.entries(_0x5af784)
        .map(
          ([_0x4630e3, _0x3a7f93]) =>
            "\t*" +
            (_0x4630e3?.split("\n").join(" ") || "unknown") +
            "*  ➪  _" +
            _0x3a7f93 +
            "_"
        )
        .join("\n");
      var _0x370694 = (
        "*ᴍᴏsᴛ ᴀᴄᴛɪᴠᴇ ɢᴄ ᴍᴇᴍʙᴇʀs*\n_Note: ʏᴏᴜ ᴍᴀʏ ɴᴏᴛ sᴇᴇ ᴀɴʏᴛʜɪɴɢ, ɪғ ᴛʜᴇ ʙᴏᴛ ʀᴇsᴛᴀʀᴛᴇᴅ\n\n*Active Members: _" +
        _0x599777.length +
        "_*\n\n*USERNAME ➪ MESSAGE COUNT(s)*\n" +
        _0x338160 +
        "\n\n" +
        Config.caption
      ).trim();
      await _0x1cec94.send(
        _0x370694,
        {
          contextInfo: {
            ...(await _0x1cec94.bot.contextInfo(
              "ACTIVE USERS",
              _0x1cec94.senderName
            )),
          },
        },
        "asta",
        _0x1cec94
      );
    } catch (_0x225db9) {
      console.log({
        e: _0x225db9,
      });
    }
  }
);
