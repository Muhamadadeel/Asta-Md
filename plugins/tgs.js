let baseApi =
  process.env.API_SMD || global.api_smd || "https://api-smd-1.vercel.app";
const { smd, getBuffer, Config } = require("../lib");
smd(
  {
    pattern: "tgs",
    desc: "Downloads telegram stickers.",
    category: "downloader",
    filename: __filename,
    use: "<add sticker url.>",
  },
  async (_0x19df48, _0x155c01) => {
    try {
      if (!_0x155c01) {
        return await _0x19df48.reply(
          "_Enter a tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal\nKeep in mind that there is a chance of ban if used frequently"
        );
      }
      if (!_0x155c01.includes("addstickers")) {
        return await _0x19df48.reply(
          "_Uhh Please Enter a Valid tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal"
        );
      }
      let _0x2a4fb1 = _0x155c01.split("|")[0];
      let _0x27aa70 = _0x2a4fb1.split("/addstickers/")[1];
      let { result: _0x4a601d } = await fetchJson(
        "https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=" +
          encodeURIComponent(_0x27aa70) +
          " "
      );
      let _0x54b45a = _0x155c01.split("|")[1] || "";
      let _0x56bec3 =
        "Total stickers: " +
        _0x4a601d.stickers.length +
        "\n*Estimated complete in:* " +
        _0x4a601d.stickers.length * 1.5 +
        " seconds\nKeep in mind that there is a chance of a ban if used frequently";
      if (_0x4a601d.is_animated) {
        return await _0x19df48.reply("Animated stickers are not supported");
      } else if (_0x54b45a.startsWith("info")) {
        return await _0x19df48.reply(_0x56bec3);
      }
      let _0x26c3a3 = parseInt(_0x54b45a.split(",")[0]) || 10;
      let _0x33784b = parseInt(_0x54b45a.split(",")[1]) || 0;
      let _0x4cca92 = _0x54b45a.split(";")[1] || "Sticker";
      let _0x3a6ece = true;
      if (_0x4cca92.includes("photo")) {
        _0x3a6ece = false;
        _0x4cca92 = "Photo";
      }
      if (_0x26c3a3 > _0x4a601d.stickers.length) {
        _0x26c3a3 = _0x4a601d.stickers.length;
      }
      if (_0x33784b > _0x4a601d.stickers.length) {
        _0x33784b = _0x4a601d.stickers.length - 5;
      }
      if (_0x33784b > _0x26c3a3) {
        let _0xe6592a = _0x26c3a3;
        _0x26c3a3 = _0x33784b;
        _0x33784b = _0xe6592a;
      }
      await _0x19df48.reply(
        _0x56bec3 +
          "\n\n_Downloading as " +
          _0x4cca92 +
          " From index *" +
          _0x33784b +
          "* to *" +
          _0x26c3a3 +
          "*._\nIf you wants more to download then use Like \n\n .tgs " +
          _0x2a4fb1 +
          " |  10 ,  20 ; photo"
      );
      for (_0x33784b; _0x33784b < _0x26c3a3; _0x33784b++) {
        let _0x4de16f = await fetchJson(
          "https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=" +
            _0x4a601d.stickers[_0x33784b].file_id
        );
        let _0x3c2608 =
          "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" +
          _0x4de16f.result.file_path;
        if (_0x3a6ece) {
          let _0x13ee38 = await getBuffer(_0x3c2608);
          await _0x19df48.reply(
            _0x13ee38,
            {
              packname: Config.packname,
              author: "Asta-Md",
            },
            "sticker"
          );
        } else {
          await _0x19df48.bot.sendMessage(_0x19df48.chat, {
            image: {
              url: _0x3c2608,
            },
            caption:
              "*_Telegram Sticker At Index " +
              (_0x33784b + 1) +
              " Downloaded_*",
          });
        }
      }
    } catch (_0x5a840a) {
      await _0x19df48.error(
        _0x5a840a + "\n\ncommand: tgs",
        _0x5a840a,
        "*_Error Sending telegram stickers!!!_*"
      );
    }
  }
);
