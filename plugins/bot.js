const axios = require("axios");
const fs = require("fs-extra");
const {
  exec
} = require("child_process");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const fetch = require("node-fetch");
const {
  userdb,
  tiny,
  fancytext,
  smdBuffer,
  getBuffer,
  sleep,
  listall,
  getRandom,
  prefix,
  smd,
  generateSticker,
  TelegraPh,
  Config,
  tlang
} = require("../lib/");
let s_ser = Config.WORKTYPE === "public" ? false : true;
let mtypes = ["imageMessage", "videoMessage", "stickerMessage"];
smd({
  cmdname: "sticker",
  alias: ["s"],
  info: "Makes sticker of replied image/video.",
  type: "sticker",
  fromMe: s_ser,
  filename: __filename,
  use: "<reply to any image/video.>"
}, async _0x1ed9dc => {
  try {
    let _0x35efea = mtypes.includes(_0x1ed9dc.mtype) ? _0x1ed9dc : _0x1ed9dc.reply_message;
    if (_0x35efea && mtypes.includes(_0x35efea?.mtype || "need_Media")) {
      let _0x499c2c = await _0x35efea.download();
      let _0x450746 = {
        pack: Config.packname,
        author: Config.author,
        type: StickerTypes.FULL,
        quality: 10
      };
      await generateSticker(_0x1ed9dc, _0x499c2c, _0x450746);
      return _0x499c2c = false;
    } else {
      return _0x1ed9dc.reply("*_Uhh Dear, Reply to image/video!!_*");
    }
  } catch (_0x3a7be5) {
    return await _0x1ed9dc.error(_0x3a7be5 + "\n\ncmdName: sticker\n");
  }
});
smd({
  cmdname: "take",
  info: "Makes sticker of replied image/video.",
  type: "sticker",
  fromMe: s_ser,
  filename: __filename,
  use: "<reply to sticker.>"
}, async (_0x3cf292, _0x346606) => {
  try {
    let _0x4318f7 = _0x3cf292.reply_message;
    if (!_0x4318f7 || _0x4318f7?.mtype != "stickerMessage") {
      return await _0x3cf292.reply("*Uhh Please, Reply to sticker*");
    }
    let _0x3f4bbc = _0x346606.split("|");
    let _0x58d18b = _0x3f4bbc[0]?.trim() !== "" ? _0x3f4bbc[0] : _0x3cf292.pushName;
    let _0x239cb7 = _0x3f4bbc[1] && _0x3f4bbc[1] !== "" ? _0x3f4bbc[1] : "sᴜʜᴀɪʟ-ᴍᴅ ♥️";
    let _0x2d3018 = await _0x4318f7.download();
    let _0x1913d2 = {
      pack: _0x58d18b,
      author: _0x239cb7,
      type: StickerTypes.FULL,
      quality: 10
    };
    await generateSticker(_0x3cf292, _0x2d3018, _0x1913d2);
    return _0x2d3018 = false;
  } catch (_0x48ad5b) {
    return await _0x3cf292.error(_0x48ad5b + "\n\ncmdName: take\n");
  }
});
smd({
  cmdname: "attp",
  info: "Makes sticker of given text.",
  type: "sticker",
  fromMe: s_ser,
  filename: __filename,
  use: "< text.>"
}, async (_0x4b306f, _0x5a41b8) => {
  try {
    let _0xc12a91 = await smdBuffer("https://raganork-api.onrender.com/api/attp?text=" + (_0x5a41b8 ? _0x5a41b8 : "Please provide text to generate sticker") + "&apikey=with_love_souravkl11");
    return await generateSticker(_0x4b306f, _0xc12a91);
  } catch (_0x1657c4) {
    return await _0x4b306f.error(_0x1657c4 + "\n\ncmdName: attp\n");
  }
});
smd({
  cmdname: "crop",
  alias: ["cropsticker"],
  info: "Makes sticker of replied image.",
  type: "sticker",
  fromMe: s_ser,
  filename: __filename,
  use: "<reply to image.>"
}, async _0x2d770a => {
  try {
    let _0x3b8ae0 = mtypes.includes(_0x2d770a.mtype) ? _0x2d770a : _0x2d770a.reply_message;
    if (_0x3b8ae0 && mtypes.includes(_0x2d770a?.mtype || "need_Media")) {
      let _0x152b54 = await _0x3b8ae0.download();
      let _0x409981 = {
        pack: Config.packname,
        author: Config.author,
        type: StickerTypes.CROPPED,
        quality: 50
      };
      await generateSticker(_0x2d770a, _0x152b54, _0x409981);
      return _0x152b54 = false;
    } else {
      return _0x2d770a.reply("*_Uhh Dear, Reply to image!!_*");
    }
  } catch (_0x251216) {
    return await _0x2d770a.error(_0x251216 + "\n\ncmdName: crop\n", "*_Request Failed, Reply to an image only!_*");
  }
});
smd({
  cmdname: "circle",
  alias: ["circlestic", "circlesticker", "cs"],
  info: "circle sticker of image.",
  type: "sticker",
  fromMe: s_ser,
  filename: __filename,
  use: "<reply to image.>"
}, async _0x562f84 => {
  try {
    let _0x4d96d0 = mtypes.includes(_0x562f84.mtype) ? _0x562f84 : _0x562f84.reply_message;
    if (_0x4d96d0 && mtypes.includes(_0x562f84?.mtype || "need_Media")) {
      let _0x5a6878 = await _0x4d96d0.download();
      let _0x4362c6 = {
        pack: Config.packname,
        author: Config.author,
        type: StickerTypes.CIRCLE,
        quality: 50
      };
      await generateSticker(_0x562f84, _0x5a6878, _0x4362c6);
      return _0x5a6878 = false;
    } else {
      return _0x562f84.reply("*_Uhh Dear, Reply to image!!_*");
    }
  } catch (_0x3cc69e) {
    return await _0x562f84.error(_0x3cc69e + "\n\ncmdName: circle\n", "*_Request Failed, Make sure You replied an image_*");
  }
});
smd({
  cmdname: "round",
  alias: ["roundstic", "roundsticker"],
  info: "Makes sticker of replied image/video.",
  type: "sticker",
  fromMe: s_ser,
  filename: __filename,
  use: "<reply to image.>"
}, async _0x23e332 => {
  try {
    let _0x451f57 = mtypes.includes(_0x23e332.mtype) ? _0x23e332 : _0x23e332.reply_message;
    if (_0x451f57 && mtypes.includes(_0x23e332?.mtype || "need_Media")) {
      let _0x2133c1 = await _0x451f57.download();
      let _0x5978a7 = {
        pack: Config.packname,
        author: Config.author,
        type: StickerTypes.ROUNDED,
        quality: 50
      };
      await generateSticker(_0x23e332, _0x2133c1, _0x5978a7);
      return _0x2133c1 = false;
    } else {
      return _0x23e332.reply("*_Uhh Dear, Reply to an image!!_*");
    }
  } catch (_0x4571ef) {
    return await _0x23e332.error(_0x4571ef + "\n\ncmdName: round\n", "*_Request Failed, Make sure You replied an image!_*");
  }
});
smd({
  cmdname: "wallpaper",
  info: "To get Random Pics",
  type: "Anime Pics",
  fromMe: s_ser,
  filename: __filename
}, async _0x392594 => {
  try {
    const _0x24538e = await (await fetch("https://api.unsplash.com/photos/random?client_id=72utkjatCBC-PDcx7-Kcvgod7-QOFAm2fXwEeW8b8cc"))?.json();
    const _0x21b1fb = _0x24538e?.urls?.regular || false;
    if (_0x21b1fb) {
      await _0x392594.sendUi(_0x392594.jid, {
        caption: "*---Random Wallpapers Here---*"
      }, {
        quoted: _0x392594
      }, "image", _0x21b1fb);
    } else {
      await _0x392594.send("*_Request Failed, Wallpaper not be fetched!_*");
    }
  } catch (_0x59211b) {
    return await _0x392594.error(_0x59211b + "\n\ncmdName: wallpaper\n");
  }
});
smd({
  pattern: "memegen",
  desc: "Write text on quoted image.",
  category: "sticker",
  filename: __filename,
  use: "<text>"
}, async (_0x90ccdb, _0x387cd8) => {
  try {
    let _0x45321f = pmtypes.includes(_0x90ccdb.mtype) ? _0x90ccdb : _0x90ccdb.reply_message;
    if (!_0x387cd8) {
      return await _0x90ccdb.reply("*please provide text and image*");
    }
    if (!_0x45321f || !pmtypes.includes(_0x45321f.mtype)) {
      return _0x90ccdb.reply("*Uhh please, Reply to an image*");
    }
    let _0x198430 = _0x387cd8.split("|")[0] || "";
    let _0x5840c2 = (_0x387cd8.split("|")[1] || "sticker").toLowerCase();
    let _0x24c5a6 = _0x198430.split(";")[0] || "_";
    let _0xf2bbd9 = _0x198430.split(";")[1] || "_";
    let _0xc213f = await _0x90ccdb.bot.downloadAndSaveMediaMessage(_0x45321f);
    let _0x1857e2 = await TelegraPh(_0xc213f);
    try {
      fs.unlinkSync(_0xc213f);
    } catch (_0x31e42c) {}
    console.log("match", _0x387cd8);
    let _0x32e779 = await getBuffer("https://api.memegen.link/images/custom/" + _0x24c5a6 + "/" + _0xf2bbd9 + ".png?background=" + _0x1857e2);
    if (_0x5840c2?.startsWith("p")) {
      await _0x90ccdb.send(_0x32e779, {
        caption: Config.caption
      }, "image");
    }
    let _0x5397ec = {
      pack: Config.packname,
      author: Config.author,
      type: StickerTypes.FULL,
      quality: 70
    };
    await generateSticker(_0x90ccdb, _0x32e779, _0x5397ec);
    return _0x32e779 = false;
  } catch (_0x68a864) {
    await _0x90ccdb.error(_0x68a864 + "\n\ncmdName: memegen\n");
    return console.log(_0x68a864);
  }
});
smd({
  pattern: "emix",
  desc: "Mixes two emojies.",
  category: "sticker",
  use: "<query>",
  filename: __filename
}, async (_0x157aa6, _0x58cc42) => {
  try {
    let _0x3e64ba = _0x58cc42.split(",")[0] || false;
    let _0x487f40 = _0x58cc42.split(",")[1] || false;
    if (!_0x58cc42 || !_0x3e64ba || !_0x487f40) {
      return _0x157aa6.reply("Example : " + prefix + "emix 😅,🤔");
    }
    const _0x13d720 = await fetch("https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=" + _0x3e64ba + "_" + _0x487f40);
    const _0x262274 = await _0x13d720?.json();
    if (!_0x262274 || _0x262274?.locale == "") {
      return _0x157aa6.send("*_Can't create mixture, try other emojies_*");
    } else {
      let _0x4df543 = await smdBuffer(_0x262274.results[0].url);
      let _0x4149c9 = {
        pack: Config.packname,
        author: Config.author,
        type: StickerTypes.FULL,
        quality: 70
      };
      await generateSticker(_0x157aa6, _0x4df543, _0x4149c9);
      return _0x4df543 = false;
    }
  } catch (_0x9d8469) {
    return await _0x157aa6.error(_0x9d8469 + "\n\ncmdName: emix");
  }
});
smd({
  pattern: "quotely",
  desc: "Makes Sticker of quoted text.",
  alias: ["q"],
  category: "sticker",
  use: "<reply to any message.>",
  filename: __filename
}, async (_0x5c8866, _0x5a07b0) => {
  try {
    let _0x3e9838 = _0x5c8866.reply_message ? _0x5c8866.reply_message : _0x5c8866 && _0x5a07b0 ? _0x5c8866 : false;
    let _0x3c773d = _0x5c8866.reply_message ? _0x5c8866.reply_message.text : _0x5a07b0;
    if (!_0x3e9838 || !_0x3c773d) {
      return _0x5c8866.reply("*_Please quote/reply to any message!!!_*");
    }
    let _0x2dea09 = await _0x5c8866.getpp(_0x3e9838.sender);
    let _0x1f00b1 = ["#FFFFFF", "#000000"];
    let _0x33ab97 = _0x5a07b0 === "white" ? _0x1f00b1[0] : _0x5a07b0 === "black" ? _0x1f00b1[1] : _0x1f00b1[Math.floor(Math.random() * _0x1f00b1.length)];
    let _0x30fa2e = _0x5c8866.bot.getName(_0x3e9838.sender);
    let _0x12ef5e = {
      type: "quote",
      format: "png",
      backgroundColor: _0x33ab97,
      width: 512,
      height: 512,
      scale: 3,
      messages: [{
        avatar: true,
        from: {
          first_name: _0x30fa2e,
          language_code: "en",
          name: _0x30fa2e,
          photo: {
            url: _0x2dea09
          }
        },
        text: _0x3c773d,
        replyMessage: {}
      }]
    };
    let _0x1a923c = await axios.post("https://bot.lyo.su/quote/generate", _0x12ef5e);
    if (!_0x1a923c || _0x1a923c.status !== 200 || !_0x1a923c.data || !_0x1a923c.data.ok) {
      return await _0x5c8866.send("*_Can't create quote sticker!_*");
    }
    let _0x5c3489 = Buffer.alloc(_0x1a923c.data.result.image.length, _0x1a923c.data.result.image, "base64");
    try {
      await _0x5c8866.send(_0x5c3489, {
        packname: Config.packname,
        author: "Suhail-Md"
      }, "sticker");
    } catch (_0xe9e39e) {
      console.log("error in quotely : ", _0xe9e39e);
      let _0x5758a5 = {
        pack: Config.packname,
        author: Config.author,
        type: StickerTypes.FULL,
        quality: 70
      };
      return await generateSticker(_0x5c8866, _0x5c3489, _0x5758a5);
    }
  } catch (_0x2accba) {
    return await _0x5c8866.error(_0x2accba + "\n\ncmdName: emix", _0x2accba);
  }
});
smd({
  pattern: "fancy",
  desc: "Makes stylish/fancy given text",
  category: "converter",
  use: "56 Suhail",
  filename: __filename
}, async (_0x5156f4, _0x42b67c) => {
  try {
    let _0x389140 = "┏━━━━━━━━━━━━━━━━━━━━━━━━\n┃\t*💬SUHAIL-MD_FANCY_TEXT💬* \n┗━━━━━━━━━━━━━━━━━━━━━━━━\n\n " + (_0x42b67c ? "```🔢Reply the number you wants to select``` \n\n" : "```\t\t" + prefix + "fancy Suhail(For all text)\n\t\t" + prefix + "fancy 25 Suhail(For specific text)```\n\n");
    let _0x39f329 = parseInt(_0x42b67c);
    if (isNaN(_0x39f329)) {
      let _0x18c791 = _0x42b67c ? _0x42b67c : "Suhail";
      listall(_0x18c791).forEach((_0x1ba2e0, _0x54474b) => {
        _0x389140 += "\n" + (_0x54474b += 1) + " " + _0x1ba2e0 + "\n";
      });
      try {
        return await _0x5156f4.send(_0x389140, {
          caption: _0x389140
        }, "", msg);
      } catch {
        return await _0x5156f4.reply(_0x389140);
      }
    }
    let _0x414749 = await fancytext("" + _0x42b67c.slice(2), _0x39f329);
    return await _0x5156f4.send(_0x414749, {}, "", _0x5156f4);
  } catch (_0x54f659) {
    return await _0x5156f4.error(_0x54f659 + "\n\ncmdName: fancy", _0x54f659);
  }
});
smd({
  pattern: "styly",
  desc: "Downloads wikimedia images.",
  category: "downloader",
  filename: __filename,
  use: "<text|search.>"
}, async (_0x437bae, _0x170cec) => {
  try {
    let _0x2c2ef5 = _0x170cec.trim();
    let _0x108971 = "┏━━━━━━━━━━━━━━━━━━━━━━━━\n┃\t*💬SUHAIL-MD_FANCY_TEXT💬* \n┗━━━━━━━━━━━━━━━━━━━━━━━━\n\n " + (_0x2c2ef5 ? "```🔢Reply the number you wants to select``` \n\n" : "```\t\t" + prefix + "styly Suhail(For all text)\n\t\t" + prefix + "styly 19 Suhail(For specific text)```\n\n");
    let {
      styletext: _0x53c4d2
    } = require("../lib/scraper");
    let _0x5a60da = _0x2c2ef5 ? parseInt(_0x2c2ef5) : "";
    _0x2c2ef5 = _0x5a60da && !isNaN(_0x5a60da) ? _0x2c2ef5.slice(2) : _0x2c2ef5;
    let _0x5df0b = (await _0x53c4d2(_0x2c2ef5 ? _0x2c2ef5 : "Suhail")) || [];
    if (!_0x5df0b || !_0x5df0b[0]) {
      return await _0x437bae.send("*_No Results Found!_*");
    }
    let _0x223768 = "";
    if (isNaN(_0x5a60da) || _0x5a60da > _0x5df0b.length || _0x5a60da < 0 || !_0x2c2ef5) {
      for (let _0x591323 = 0; _0x591323 < _0x5df0b.length; _0x591323++) {
        _0x223768 += "\n" + _0x591323 + " " + _0x5df0b[_0x591323].result + " " + (_0x2c2ef5.length > 50 ? "\n" : "");
      }
      return await _0x437bae.send(_0x108971 + _0x223768);
    }
    return await _0x437bae.send(_0x5df0b[_0x5a60da].result, {}, "", _0x437bae);
  } catch (_0x3ce11b) {
    await _0x437bae.error(_0x3ce11b + "\n\ncommand: styly", _0x3ce11b);
  }
});
smd({
  pattern: "tiny",
  desc: "Makes url tiny.",
  category: "converter",
  use: "<url>",
  react: "✅",
  filename: __filename
}, async (_0x3363d5, _0x67644e) => {
  try {
    if (!_0x67644e || !_0x67644e.toLowerCase().includes("https")) {
      return _0x3363d5.reply("Provide me a link");
    }
    let _0x5edf77 = _0x67644e.split(" ")[0];
    let _0x3cac2d = await axios.get("https://tinyurl.com/api-create.php?url=" + _0x5edf77);
    _0x3363d5.reply("*🛡️Your Shortened URL*\n\n" + _0x3cac2d.data);
  } catch (_0x4aa4d9) {
    return await _0x3363d5.error(_0x4aa4d9 + "\n\ncmdName: tiny", _0x4aa4d9);
  }
});
smd({
  pattern: "fliptext",
  desc: "Flips given text.",
  category: "converter",
  use: "<query>",
  filename: __filename
}, async (_0x40c0dd, _0x4b44c3) => {
  try {
    let _0x50d439 = _0x4b44c3 ? _0x4b44c3 : _0x40c0dd.reply_text;
    if (!_0x50d439) {
      return _0x40c0dd.reply("*_Example : " + prefix + "fliptext Suhail MD!_*");
    }
    let _0x41976b = _0x50d439.split("").reverse().join("");
    await _0x40c0dd.reply("*「  Text Flipper Tool  」* \n*IGiven text :*\n" + _0x50d439 + "\n\n*Fliped text :*\n" + _0x41976b);
  } catch (_0x59c879) {
    await _0x40c0dd.error(_0x59c879 + "\n\ncommand : fliptext", _0x59c879);
  }
});
smd({
  pattern: "ebinary",
  desc: "encode binary",
  category: "converter",
  use: "<query>",
  filename: __filename
}, async (_0xf07286, _0x55ad99) => {
  try {
    let _0x567086 = _0x55ad99 ? _0x55ad99 : _0xf07286.reply_text;
    if (!_0x567086) {
      return _0xf07286.reply("*_Send text to be encoded.!_*");
    }
    let _0x3b4a39 = _0x567086.split("").map(_0x95e2ea => {
      return _0x95e2ea.charCodeAt(0).toString(2);
    }).join(" ");
    await _0xf07286.reply(_0x3b4a39);
  } catch (_0xa21c11) {
    await _0xf07286.error(_0xa21c11 + "\n\ncommand : ebinary", _0xa21c11);
  }
});
smd({
  pattern: "dbinary",
  desc: "decode binary",
  category: "converter",
  use: "<query>",
  filename: __filename
}, async (_0x5590f0, _0x38275f) => {
  try {
    let _0xf56c22 = _0x38275f ? _0x38275f : _0x5590f0.reply_text;
    if (!_0xf56c22) {
      return _0x5590f0.reply("Send text to be decoded.");
    }
    var _0x2c621d = _0xf56c22.split(" ");
    var _0x5bbf9c = [];
    for (i = 0; i < _0x2c621d.length; i++) {
      _0x5bbf9c.push(String.fromCharCode(parseInt(_0x2c621d[i], 2)));
    }
    await _0x5590f0.reply(_0x5bbf9c.join(""));
  } catch (_0x593e2e) {
    await _0x5590f0.error(_0x593e2e + "\n\ncommand : dbinary", _0x593e2e);
  }
});
smd({
  pattern: "qr",
  category: "converter",
  filename: __filename,
  use: "< text >",
  desc: "Sends CitelsVoid Qr code to scan and get your session id."
}, async (_0x5c23f7, _0x4d7194) => {
  try {
    if (!_0x4d7194) {
      return _0x5c23f7.reply("*Provide Text To generate QR!*");
    }
    let _0x5eff70 = "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=" + text;
    await _0x5c23f7.bot.sendUi(_0x5c23f7.jid, {
      caption: "*_Scan Qr To Get You Text_*"
    }, {
      quoted: _0x5c23f7
    }, "image", _0x5eff70);
  } catch (_0x37514c) {
    await _0x5c23f7.error(_0x37514c + "\n\ncommand : qr", _0x37514c);
  }
});
const PastebinAPI = require("pastebin-js");
let pastebin = new PastebinAPI("EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL");
smd({
  pattern: "pastebin",
  desc: "create paste of text.",
  category: "converter",
  use: "< text >",
  filename: __filename
}, async (_0x5479ee, _0x517d80) => {
  try {
    let _0x605ed2 = _0x517d80 ? _0x517d80 : _0x5479ee.reply_text;
    if (!_0x605ed2) {
      return _0x5479ee.reply("Please reply to any text to get link.");
    }
    let _0x492561 = await pastebin.createPaste(_0x605ed2, "Suhail Tech Info");
    return _0x5479ee.reply("_Here is your link._\n" + _0x492561 + "\n*Click to Get Your Text*");
  } catch (_0x5232f8) {
    await _0x5479ee.error(_0x5232f8 + "\n\ncommand: pastebin ", _0x5232f8);
  }
});
smd({
  pattern: "paste",
  desc: "create paste of text.",
  category: "converter",
  use: "< text >",
  filename: __filename
}, async (_0x3a09c6, _0x2ec839) => {
  try {
    let _0x53dc07 = _0x2ec839 ? _0x2ec839 : _0x3a09c6.reply_text;
    let {
      data: _0x2ba0ed
    } = await axios.get("https://api.telegra.ph/createPage?access_token=d3b25feccb89e508a9114afb82aa421fe2a9712b963b387cc5ad71e58722&title=Suhail-Md+Bot&author_name=Suhail_Tech_Info&content=[%7B\"tag\":\"p\",\"children\":[\"" + _0x53dc07.replace(/ /g, "+") + "\"]%7D]&return_content=true");
    return _0x3a09c6.reply("*Paste created on telegraph*\nName:-" + util.format(_0x2ba0ed.result.title) + " \nUrl:- " + util.format(_0x2ba0ed.result.url));
  } catch (_0x47d188) {
    await _0x3a09c6.error(_0x47d188 + "\n\ncommand: paste ", _0x47d188);
  }
});
let pmtypes = ["imageMessage", "stickerMessage"];
smd({
  cmdname: "photo",
  info: "Makes photo of replied sticker.",
  type: "converter",
  use: "<reply to any gif>",
  filename: __filename
}, async _0x31249c => {
  try {
    let _0x15c1a8 = pmtypes.includes(_0x31249c.mtype) ? _0x31249c : _0x31249c.reply_message;
    if (!_0x15c1a8 || !pmtypes.includes(_0x15c1a8?.mtype)) {
      return _0x31249c.reply("*_Uhh Dear, Reply to Any Sticker.!!_*");
    }
    let _0x32e090 = await _0x31249c.bot.downloadAndSaveMediaMessage(_0x15c1a8);
    return await _0x31249c.bot.sendMessage(_0x31249c.jid, {
      image: {
        url: _0x32e090
      },
      mimetype: "image/jpeg"
    });
    try {
      fs.unlink(_0x32e090);
    } catch {}
  } catch (_0x5e6dd0) {
    return await _0x31249c.error(_0x5e6dd0 + "\n\ncmdName: photo\n");
  }
});
let audtypes = ["audioMessage", "videoMessage"];
smd({
  pattern: "toaudio",
  alias: ["mp3", "tomp3"],
  desc: "changes type to audio.",
  category: "converter",
  use: "<reply to any Video>",
  filename: __filename
}, async _0x50ed1f => {
  try {
    let _0x149bc9 = audtypes.includes(_0x50ed1f.mtype) ? _0x50ed1f : _0x50ed1f.reply_message;
    if (!_0x149bc9 || !audtypes.includes(_0x149bc9?.mtype)) {
      return _0x50ed1f.reply("*_Uhh Dear, Reply to Any Video.!!_*");
    }
    let _0x5b7c1e = await _0x50ed1f.bot.downloadAndSaveMediaMessage(_0x149bc9);
    const {
      toAudio: _0x3667e6
    } = require("../lib");
    let _0x294315 = fs.readFileSync(_0x5b7c1e);
    let _0x133462 = await _0x3667e6(_0x294315);
    try {
      fs.unlink(_0x5b7c1e);
    } catch {}
    return await _0x50ed1f.bot.sendMessage(_0x50ed1f.jid, {
      audio: _0x133462,
      mimetype: "audio/mpeg"
    });
  } catch (_0x234184) {
    return await _0x50ed1f.error(_0x234184 + "\n\ncmdName: toaudio", _0x234184);
  }
});
smd({
  pattern: "voice",
  alias: ["ptt", "toptt"],
  desc: "adds bass in given sound",
  category: "audio",
  use: "<reply to any audio>"
}, async _0x53ce0b => {
  try {
    let _0x758f42 = audtypes.includes(_0x53ce0b.mtype) ? _0x53ce0b : _0x53ce0b.reply_message;
    if (!_0x758f42 || !audtypes.includes(_0x758f42?.mtype)) {
      return _0x53ce0b.reply("*_Uhh Please, Reply to audio/video_*");
    }
    let _0x47558f = await _0x758f42.download();
    return await _0x53ce0b.bot.sendMessage(_0x53ce0b.jid, {
      audio: _0x47558f,
      mimetype: "audio/mpeg",
      ptt: true
    }, {
      quoted: _0x53ce0b
    });
  } catch (_0x4fc603) {
    return await _0x53ce0b.error(_0x4fc603 + "\n\ncmdName: voice", _0x4fc603);
  }
});
smd({
  pattern: "tomp4",
  alias: ["mp4", "tovideo"],
  desc: "convert sticker to mp4.",
  category: "converter",
  use: "<reply to any Video>",
  filename: __filename
}, async _0x53f8fc => {
  let _0x1a2aba = _0x53f8fc.mtype === "videoMessage" ? _0x53f8fc : _0x53f8fc.reply_message;
  if (!_0x1a2aba) {
    return _0x53f8fc.reply("*_Uhh Dear, Reply To Animated Sticker or Gif!!_*");
  }
  const {
    webp2mp4File: _0x1f5101
  } = require("../lib");
  let _0x3b3186 = _0x1a2aba?.mimetype || "";
  if (_0x1a2aba?.mtype != "videoMessage" && !/webp/.test(_0x3b3186)) {
    return await _0x53f8fc.send("*Damn... Reply To An Animated Sticker or Gif *");
  }
  let _0x30fbb9 = await _0x53f8fc.bot.downloadAndSaveMediaMessage(_0x1a2aba);
  try {
    try {
      if (/webp/.test(_0x3b3186)) {
        let _0x281bfb = await _0x1f5101(_0x30fbb9);
        _0x30fbb9 = _0x281bfb.result;
      }
    } catch (_0x3b605b) {
      console.log("error while converting sticker to mp4\n", _0x3b605b);
    }
    await _0x53f8fc.bot.sendMessage(_0x53f8fc.jid, {
      video: {
        url: _0x30fbb9
      },
      caption: Config.caption
    });
    try {
      return await fs.unlink(_0x30fbb9);
    } catch {}
  } catch (_0x1f3309) {
    return await _0x53f8fc.error(_0x1f3309 + "\n\ncmdName: tomp4", _0x1f3309);
  }
});
function splitTextIntoLines(_0x11152a, _0x3a4e8d, _0x547f94) {
  const _0x5129a6 = _0x11152a.split(" ");
  const _0x4368fc = [];
  let _0x457dbc = "";
  for (const _0x233a3a of _0x5129a6) {
    const _0x112304 = _0x457dbc === "" ? _0x233a3a : _0x457dbc + " " + _0x233a3a;
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
smd({
  cmdname: "ttp",
  alias: ["roundstic", "roundsticker"],
  info: "Makes sticker of replied image/video.",
  type: "sticker",
  fromMe: s_ser,
  filename: __filename,
  use: "<reply to image.>"
}, async (_0x2192b2, _0x149986) => {
  try {
    let _0x12e550 = _0x149986 || _0x2192b2.reply_text;
    if (_0x12e550) {
      let _0x15d74a = parseInt(_0x12e550) || "";
      if (_0x15d74a && !isNaN(_0x15d74a)) {
        _0x12e550 = await fancytext("" + _0x12e550.slice(2), _0x15d74a);
      }
      const {
        createCanvas: _0x115607
      } = require("canvas");
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
          quality: 50
        };
        await generateSticker(_0x2192b2, _0x5c79c3, _0x22bd5e);
        return _0x5c79c3 = false;
      });
    } else {
      return _0x2192b2.reply("*_Uhh Dear, provide text, ex .ttp 4 hii im suhail!!_*");
    }
  } catch (_0x2a0cc8) {
    return await _0x2192b2.error(_0x2a0cc8 + "\n\ncmdName: ttp\n");
  }
});