let {smd} = require("../lib");
const Config = require("../config");

smd(
  {
    cmdname: "botfeatures",
    alias: ["totalfeature", "features", "asta"],
    category: "tools",
    filename: __filename,
    info: "get counting for total features!",
  },
  async (_0x4e7c63) => {
    try {
      const _0x4de967 = require("../lib/plugins");
      let _0x4cf8ed = Object.values(_0x4de967.commands).length;
      try {
        let { key: _0x2d7cf6 } = await _0x4e7c63.send(
          "Counting... 0",
          {},
          "asta",
          _0x4e7c63,
        );
        for (let _0x16a10f = 0; _0x16a10f <= _0x4cf8ed; _0x16a10f++) {
          if (_0x16a10f % 15 === 0) {
            await _0x4e7c63.send(
              "Counting... " + _0x16a10f,
              {
                edit: _0x2d7cf6,
              },
              "asta",
              _0x4e7c63,
            );
          } else if (_0x4cf8ed - _0x16a10f < 10) {
            await _0x4e7c63.send(
              "Counting... " + _0x16a10f,
              {
                edit: _0x2d7cf6,
              },
              "asta",
              _0x4e7c63,
            );
          }
        }
        await _0x4e7c63.send(
          "*Feature Counting Done!*",
          {
            edit: _0x2d7cf6,
          },
          "asta",
          _0x4e7c63,
        );
      } catch (_0x28ce7e) {}
      let _0x50f17a =
        " *ＡＳＴＡ ＭＤ ＦＥＡＴＵＲＥ*\n\n\n  ◦ _ʙᴏᴛ ғᴇᴀᴛᴜʀᴇs ➪ " +
        _0x4cf8ed +
        "_\n  \n*◦ ʜᴇʀᴇ ᴀʀᴇ ᴛʜᴇ ғᴇᴀᴛᴜʀᴇs*\n\n      _ᴄᴏᴍᴀɴᴅs ➪ " +
        Object.values(_0x4de967.commands).filter(
          (_0x54d4bf) => _0x54d4bf.pattern,
        ).length +
        "_\n      _ᴍᴇssᴀɢɪɴɢ ғᴇᴀᴛᴜʀᴇs ➪ " +
        Object.values(_0x4de967.commands).filter((_0x2376a3) => _0x2376a3.on)
          .length +
        "_\n      _ᴄᴀʟʟɪɴɢ ғᴇᴀᴛᴜʀᴇs ➪ " +
        Object.values(_0x4de967.commands).filter((_0x54a19b) => _0x54a19b.call)
          .length +
        "_\n      _ɢʀᴏᴜᴘ ғᴜɴᴄᴛɪᴏɴs ➪ " +
        Object.values(_0x4de967.commands).filter((_0x35381c) => _0x35381c.group)
          .length +
        "_\n  \n\n" +
        Config.caption;
      await _0x4e7c63.bot.relayMessage(
        _0x4e7c63.chat,
        {
          requestPaymentMessage: {
            currencyCodeIso4217: "USD",
            amount1000: _0x4cf8ed * 1000,
            requestFrom: "2348039607375@s.whatsapp.net",
            noteMessage: {
              extendedTextMessage: {
                text: _0x50f17a,
                contextInfo: {
                  mentionedJid: [_0x4e7c63.sender],
                  externalAdReply: {
                    showAdAttribution: true,
                  },
                },
              },
            },
          },
        },
        {},
      );
    } catch (_0x979e23) {
      await _0x4e7c63.error(
        _0x979e23 + "\n\ncommand : feature",
        _0x979e23,
        false,
      );
    }
  },
);