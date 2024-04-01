const axios = require("axios");
const { StickerTypes } = require("wa-sticker-formatter");
const { smd, generateSticker, Config } = require("../lib/");

smd(
  {
    pattern: "quotely",
    desc: "Makes Sticker of quoted text.",
    alias: ["q"],
    category: "sticker",
    use: "<reply to any message.>",
    filename: __filename,
  },
  async (_0x5c8866, _0x5a07b0) => {
    try {
      let _0x3e9838 = _0x5c8866.reply_message
        ? _0x5c8866.reply_message
        : _0x5c8866 && _0x5a07b0
        ? _0x5c8866
        : false;
      let _0x3c773d = _0x5c8866.reply_message
        ? _0x5c8866.reply_message.text
        : _0x5a07b0;
      if (!_0x3e9838 || !_0x3c773d) {
        return _0x5c8866.reply("*_Please quote/reply to any message!!!_*");
      }
      let _0x2dea09 = await _0x5c8866.getpp(_0x3e9838.sender);
      let _0x1f00b1 = ["#FFFFFF", "#000000"];
      let _0x33ab97 =
        _0x5a07b0 === "white"
          ? _0x1f00b1[0]
          : _0x5a07b0 === "black"
          ? _0x1f00b1[1]
          : _0x1f00b1[Math.floor(Math.random() * _0x1f00b1.length)];
      let _0x30fa2e = _0x5c8866.bot.getName(_0x3e9838.sender);
      let _0x12ef5e = {
        type: "quote",
        format: "png",
        backgroundColor: _0x33ab97,
        width: 512,
        height: 512,
        scale: 3,
        messages: [
          {
            avatar: true,
            from: {
              first_name: _0x30fa2e,
              language_code: "en",
              name: _0x30fa2e,
              photo: {
                url: _0x2dea09,
              },
            },
            text: _0x3c773d,
            replyMessage: {},
          },
        ],
      };
      let _0x1a923c = await axios.post(
        "https://bot.lyo.su/quote/generate",
        _0x12ef5e
      );
      if (
        !_0x1a923c ||
        _0x1a923c.status !== 200 ||
        !_0x1a923c.data ||
        !_0x1a923c.data.ok
      ) {
        return await _0x5c8866.send("*_Can't create quote sticker!_*");
      }
      let _0x5c3489 = Buffer.alloc(
        _0x1a923c.data.result.image.length,
        _0x1a923c.data.result.image,
        "base64"
      );
      try {
        await _0x5c8866.send(
          _0x5c3489,
          {
            packname: Config.packname,
            author: "Suhail-Md",
          },
          "sticker"
        );
      } catch (_0xe9e39e) {
        console.log("error in quotely : ", _0xe9e39e);
        let _0x5758a5 = {
          pack: Config.packname,
          author: Config.author,
          type: StickerTypes.FULL,
          quality: 70,
        };
        return await generateSticker(_0x5c8866, _0x5c3489, _0x5758a5);
      }
    } catch (_0x2accba) {
      return await _0x5c8866.error(_0x2accba + "\n\ncmdName: emix", _0x2accba);
    }
  }
);
