let { smd} = require("../lib");

smd(
  {
    cmdname: "todocument",
    alias: ["senddoc", "document", "todoc"],
    desc: "send document for Replied image/video Message",
    category: "tools",
    filename: __filename,
  },
  async (_0x7587f6, _0x11eeb1) => {
    try {
      let _0x49db20 =
        _0x7587f6.image || _0x7587f6.video
          ? _0x7587f6
          : _0x7587f6.reply_message &&
              (_0x7587f6.reply_message.image || _0x7587f6.reply_message.video)
            ? _0x7587f6.reply_message
            : false;
      if (!_0x49db20) {
        return await _0x7587f6.reply("_Reply to an image/video message!_");
      }
      if (!_0x11eeb1) {
        return await _0x7587f6.reply(
          "_Need fileName, Example: document asta | caption_",
        );
      }
      let _0x1bfcf5 =
        await _0x7587f6.bot.downloadAndSaveMediaMessage(_0x49db20);
      let _0x3f6d77 = _0x11eeb1.includes(":")
        ? ":"
        : _0x11eeb1.includes(";")
          ? ";"
          : "|";
      let _0x3c4532 =
        _0x11eeb1.split(_0x3f6d77)[0].trim() +
        "." +
        (_0x49db20.image ? "jpg" : "mp4");
      let _0x3367ca = _0x11eeb1.split(_0x3f6d77)[1]?.trim() || "";
      _0x3367ca = ["copy", "default", "old", "reply"].includes(_0x3367ca)
        ? _0x49db20.text
        : _0x3367ca;
      if (_0x1bfcf5) {
        _0x7587f6.bot.sendMessage(_0x7587f6.chat, {
          document: {
            url: _0x1bfcf5,
          },
          mimetype: _0x49db20.mimetype,
          fileName: _0x3c4532,
          caption: _0x3367ca,
        });
      } else {
        _0x7587f6.reply("*Request Denied!*");
      }
    } catch (_0x408490) {
      await _0x7587f6.error(
        _0x408490 + "\n\ncommand : document",
        _0x408490,
        false,
      );
    }
  },
);