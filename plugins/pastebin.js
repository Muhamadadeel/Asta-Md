const axios = require("axios");
const { smd} = require("../lib/");
const PastebinAPI = require("pastebin-js");
let pastebin = new PastebinAPI("EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL");
smd(
  {
    pattern: "pastebin",
    desc: "create paste of text.",
    category: "converter",
    use: "< text >",
    filename: __filename,
  },
  async (_0x5479ee, _0x517d80) => {
    try {
      let _0x605ed2 = _0x517d80 ? _0x517d80 : _0x5479ee.reply_text;
      if (!_0x605ed2) {
        return _0x5479ee.reply("Please reply to any text to get link.");
      }
      let _0x492561 = await pastebin.createPaste(_0x605ed2, "Suhail Tech Info");
      return _0x5479ee.reply(
        "_Here is your link._\n" + _0x492561 + "\n*Click to Get Your Text*"
      );
    } catch (_0x5232f8) {
      await _0x5479ee.error(_0x5232f8 + "\n\ncommand: pastebin ", _0x5232f8);
    }
  }
);
smd(
  {
    pattern: "paste",
    desc: "create paste of text.",
    category: "converter",
    use: "< text >",
    filename: __filename,
  },
  async (_0x3a09c6, _0x2ec839) => {
    try {
      let _0x53dc07 = _0x2ec839 ? _0x2ec839 : _0x3a09c6.reply_text;
      let { data: _0x2ba0ed } = await axios.get(
        'https://api.telegra.ph/createPage?access_token=d3b25feccb89e508a9114afb82aa421fe2a9712b963b387cc5ad71e58722&title=Suhail-Md+Bot&author_name=Suhail_Tech_Info&content=[%7B"tag":"p","children":["' +
          _0x53dc07.replace(/ /g, "+") +
          '"]%7D]&return_content=true'
      );
      return _0x3a09c6.reply(
        "*Paste created on telegraph*\nName:-" +
          util.format(_0x2ba0ed.result.title) +
          " \nUrl:- " +
          util.format(_0x2ba0ed.result.url)
      );
    } catch (_0x47d188) {
      await _0x3a09c6.error(_0x47d188 + "\n\ncommand: paste ", _0x47d188);
    }
  }
);
