const { StickerTypes } = require("wa-sticker-formatter");
const {
  fancytext,
  smd,
  generateSticker,
  Config,
} = require("../lib/");
let s_ser = Config.WORKTYPE === "public" ? false : true;
function splitTextIntoLines(_0x11152a, _0x3a4e8d, _0x547f94) {
    const _0x5129a6 = _0x11152a.split(" ");
    const _0x4368fc = [];
    let _0x457dbc = "";
    for (const _0x233a3a of _0x5129a6) {
      const _0x112304 =
        _0x457dbc === "" ? _0x233a3a : _0x457dbc + " " + _0x233a3a;
      const _0x53fe4b = _0x3a4e8d.measureText(_0x112304).width;
      if (_0x53fe4b <= _0x547f94) {
        _0x457dbc = _0x112304;
      } else {
        _0x4368fc.push(_0x457dbc);
        _0x457dbc = _0x233a3a;
      }
    }
    if (_0x457dbc !== "") {
      _0x4368fc.push(_0x457dbc);
    }
    return _0x4368fc;
  }
  smd(
    {
      cmdname: "ttp",
      alias: ["roundstic", "roundsticker"],
      info: "Makes sticker of replied image/video.",
      type: "sticker",
      fromMe: s_ser,
      filename: __filename,
      use: "<reply to image.>",
    },
    async (_0x2192b2, _0x149986) => {
      try {
        let _0x12e550 = _0x149986 || _0x2192b2.reply_text;
        if (_0x12e550) {
          let _0x15d74a = parseInt(_0x12e550) || "";
          if (_0x15d74a && !isNaN(_0x15d74a)) {
            _0x12e550 = await fancytext("" + _0x12e550.slice(2), _0x15d74a);
          }
          const { createCanvas: _0x115607 } = require("canvas");
          const _0x2585d6 = require("fs");
          const _0x1ecdfc = 300;
          const _0x56a568 = 300;
          const _0x56aa06 = "./temp/ttp.png";
          const _0xdb35d = _0x115607(_0x1ecdfc, _0x56a568);
          const _0x30d379 = _0xdb35d.getContext("2d");
          _0x30d379.clearRect(0, 0, _0xdb35d.width, _0xdb35d.height);
          _0x30d379.font = "20px Arial";
          _0x30d379.fillStyle = "black";
          _0x30d379.textAlign = "center";
          const _0x3f6c66 = _0x1ecdfc - 20;
          const _0x998b70 = splitTextIntoLines(_0x12e550, _0x30d379, _0x3f6c66);
          const _0x246681 = _0x998b70.length * 25;
          const _0x142833 = (_0x56a568 - _0x246681) / 2;
          _0x998b70.forEach((_0x47429c, _0x456162) => {
            const _0xbbdcd4 = _0x142833 + _0x456162 * 25;
            _0x30d379.fillText(_0x47429c, _0x1ecdfc / 2, _0xbbdcd4);
          });
          const _0x3a9b91 = _0xdb35d.createPNGStream();
          const _0x2a17f6 = _0x2585d6.createWriteStream(_0x56aa06);
          _0x3a9b91.pipe(_0x2a17f6);
          _0x2a17f6.on("finish", async () => {
            console.log("Image created:", _0x56aa06);
            let _0x5c79c3 = _0x2585d6.readFileSync(_0x56aa06);
            _0x2192b2.send(_0x5c79c3, {}, "image");
            let _0x22bd5e = {
              pack: Config.packname,
              author: Config.author,
              type: StickerTypes.ROUNDED,
              quality: 50,
            };
            await generateSticker(_0x2192b2, _0x5c79c3, _0x22bd5e);
            return (_0x5c79c3 = false);
          });
        } else {
          return _0x2192b2.reply(
            "*_Uhh Dear, provide text, ex .ttp 4 hii im suhail!!_*"
          );
        }
      } catch (_0x2a0cc8) {
        return await _0x2192b2.error(_0x2a0cc8 + "\n\ncmdName: ttp\n");
      }
    }
  );
  