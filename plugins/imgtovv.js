let { smd } = require("../lib");

smd(
  {
    cmdname: "tovv",
    alias: ["toviewonce"],
    desc: "send viewonce for Replied image/video Message",
    category: "tools",
    filename: __filename,
  },
  async (_0x241c6f, _0x5ce27a) => {
    try {
      let _0x1d26ad =
        _0x241c6f.image || _0x241c6f.video
          ? _0x241c6f
          : _0x241c6f.reply_message &&
              (_0x241c6f.reply_message.image || _0x241c6f.reply_message.video)
            ? _0x241c6f.reply_message
            : false;
      if (!_0x1d26ad) {
        return await _0x241c6f.reply("_Reply to image/video with caption!_");
      }
      let _0x60cca4 =
        await _0x241c6f.bot.downloadAndSaveMediaMessage(_0x1d26ad);
      let _0x8cde12 = _0x1d26ad.image ? "image" : "video";
      if (_0x60cca4) {
        _0x241c6f.bot.sendMessage(
          _0x241c6f.chat,
          {
            [_0x8cde12]: {
              url: _0x60cca4,
            },
            caption: _0x5ce27a,
            mimetype: _0x1d26ad.mimetype,
            fileLength: "99999999",
            viewOnce: true,
          },
          {
            quoted: _0x1d26ad,
          },
        );
      } else {
        _0x241c6f.reply("*Request Denied!*");
      }
    } catch (_0x2422e7) {
      await _0x241c6f.error(_0x2422e7 + "\n\ncommand : tovv", _0x2422e7, false);
    }
  },
);