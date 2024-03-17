const axios = require("axios");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs-extra");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const Jimp = require("jimp");
const {
  getBuffer,
  fetchJson,
  runtime,
  sleep,
  isUrl,
  GIFBufferToVideoBuffer
} = require("./serialized");
let sides = "*";
const {
  tlang,
  TelegraPh,
  dare,
  truth,
  random_question
} = require("./scraper");
const {
  bot_
} = require("./schemes");
const Config = require("../config.js");
const {
  Innertube,
  UniversalCache,
  Utils
} = require("youtubei.js");
const {
  existsSync,
  mkdirSync,
  createWriteStream
} = require("fs");
let yt = {};
yt.getInfo = async (_0x9eb549, _0x377d08 = {}) => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    const _0x4ac5dc = await Innertube.create({
      cache: new UniversalCache(false),
      generate_session_locally: true
    });
    let _0x4c50dc = await _0x4ac5dc.getInfo(_0x9eb549, _0x377d08);
    let _0x909efc = [];
    for (let _0x1e674b = 0; _0x1e674b < _0x4c50dc.streaming_data.formats.length; _0x1e674b++) {
      await _0x909efc.push(_0x4c50dc.streaming_data.formats[_0x1e674b].quality_label);
    }
    let _0x698e1c = _0x909efc.includes("360p") ? "360p" : "best";
    let _0x148e2a = {
      status: true,
      title: _0x4c50dc.basic_info.title,
      id: _0x4c50dc.basic_info.id,
      quality: _0x909efc,
      pref_Quality: _0x698e1c,
      duration: _0x4c50dc.basic_info.duration,
      description: _0x4c50dc.basic_info.short_description,
      keywords: _0x4c50dc.basic_info.keywords,
      thumbnail: _0x4c50dc.basic_info.thumbnail[0].url,
      author: _0x4c50dc.basic_info.author,
      views: _0x4c50dc.basic_info.view_count,
      likes: _0x4c50dc.basic_info.like_count,
      category: _0x4c50dc.basic_info.category,
      channel: _0x4c50dc.basic_info.channel,
      basic_info: _0x4c50dc
    };
    return _0x148e2a;
  } catch (_0xc609bc) {
    console.log("./lib/suhail/yt.getInfo()\n", _0xc609bc.message);
    return {
      status: false
    };
  }
};
yt.download = async (_0x3e2628, _0x58dc43 = {
  type: "video",
  quality: "best",
  format: "mp4"
}) => {
  try {
    if (!global.SmdOfficial) {
      return;
    }
    const _0x3d6c1b = await Innertube.create({
      cache: new UniversalCache(false),
      generate_session_locally: true
    });
    let _0x4e3047 = _0x58dc43.type ? _0x58dc43.type : "video";
    let _0x3665f2 = _0x4e3047 === "audio" ? "best" : _0x58dc43.quality ? _0x58dc43.quality : "best";
    let _0x5a15a0 = _0x58dc43.format ? _0x58dc43.format : "mp4";
    const _0x33ad54 = await _0x3d6c1b.download(_0x3e2628, {
      type: _0x4e3047,
      quality: _0x3665f2,
      format: _0x5a15a0
    });
    const _0x1f037e = "./temp";
    if (!existsSync(_0x1f037e)) {
      mkdirSync(_0x1f037e);
    }
    let _0x19c932 = _0x4e3047 === "video" ? "mp4" : "m4a";
    let _0x112432 = _0x1f037e + "/Suhail-Md " + _0x3e2628 + "." + _0x19c932;
    var _0x5d284c = createWriteStream(_0x112432);
    for await (const _0x9c041a of Utils.streamToIterable(_0x33ad54)) {
      _0x5d284c.write(_0x9c041a);
    }
    return _0x112432;
  } catch (_0x27d4c6) {
    console.log("./lib/suhail/yt.dowanload()\n", _0x27d4c6.message);
    return false;
  }
};
async function sendAnimeReaction(_0x3c8f64, _0x31d8a4 = "punch", _0x1480d4 = "", _0x5a2867 = "") {
  try {
    var _0x3a9168 = await fetchJson("https://api.waifu.pics/sfw/" + _0x31d8a4);
    const _0x2732d6 = await axios.get(_0x3a9168.url, {
      responseType: "arraybuffer"
    });
    const _0x7cfad4 = Buffer.from(_0x2732d6.data, "utf-8");
    let _0x5d5842 = _0x3c8f64.mentionedJid ? _0x3c8f64.mentionedJid[0] : _0x3c8f64.msg.contextInfo.participant || false;
    let _0x340faf = await GIFBufferToVideoBuffer(_0x7cfad4);
    let _0x10a2c2 = _0x5d5842 ? sides + "@" + _0x3c8f64.sender.split("@")[0] + " " + _0x1480d4 + " @" + _0x5d5842.split("@")[0] + sides : sides + "@" + _0x3c8f64.sender.split("@")[0] + " " + _0x5a2867 + sides;
    if (_0x5d5842) {
      return await _0x3c8f64.sendMessage(_0x3c8f64.chat, {
        video: _0x340faf,
        gifPlayback: true,
        mentions: [_0x5d5842, _0x3c8f64.sender],
        caption: _0x10a2c2
      }, {
        quoted: _0x3c8f64
      });
    } else {
      return await _0x3c8f64.sendMessage(_0x3c8f64.chat, {
        video: _0x340faf,
        gifPlayback: true,
        mentions: [_0x3c8f64.sender],
        caption: _0x10a2c2
      }, {
        quoted: _0x3c8f64
      });
    }
  } catch (_0x2f5a20) {
    await _0x3c8f64.error(_0x2f5a20);
    return console.log("./lib/Suhail.js/sendAnimeReaction()\n", _0x2f5a20);
  }
}
async function sendGImages(_0x5aaf14, _0x15e80c, _0x52d945 = Config.caption, _0x427cde = "") {
  try {
    let _0x190a18 = require("async-g-i-s");
    let _0x44d5d8 = await _0x190a18(_0x15e80c);
    let _0xc339d2 = _0x44d5d8[Math.floor(Math.random() * _0x44d5d8.length)].url;
    let _0x3e3b68 = {
      image: {
        url: _0xc339d2
      },
      caption: _0x52d945,
      contextInfo: {
        externalAdReply: {
          title: tlang().title,
          body: _0x427cde,
          thumbnail: log0,
          mediaType: 1,
          mediaUrl: gurl,
          sourceUrl: gurl
        }
      }
    };
    return await _0x5aaf14.sendMessage(_0x5aaf14.chat, _0x3e3b68, {
      quoted: _0x5aaf14
    });
  } catch (_0x8d0f4c) {
    await _0x5aaf14.error(_0x8d0f4c);
    return console.log("./lib/Suhail.js/sendGImages()\n", _0x8d0f4c);
  }
}
async function AudioToBlackVideo(_0x435e0f, _0x473d6d) {
  try {
    try {
      fs.unlinkSync(_0x473d6d);
    } catch (_0x1b2d7d) {}
    const _0x530759 = "ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 " + _0x435e0f;
    const {
      stdout: _0x23eb34
    } = await exec(_0x530759);
    const _0x5c2edb = parseFloat(_0x23eb34);
    let _0x56cea8 = "./temp/blackScreen.mp4";
    try {
      fs.unlinkSync(_0x56cea8);
    } catch (_0x538b34) {}
    const _0x4bab1b = "ffmpeg -f lavfi -i color=c=black:s=1280x720:d=" + _0x5c2edb + " -vf \"format=yuv420p\" " + _0x56cea8;
    await exec(_0x4bab1b);
    const _0x51819c = "ffmpeg -i " + _0x56cea8 + " -i " + _0x435e0f + " -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 " + _0x473d6d;
    await exec(_0x51819c);
    console.log("Audio converted to black screen video successfully!");
    return {
      result: true
    };
  } catch (_0x33844d) {
    console.error("./lib/Aviator.js/AudioToBlackVideo()\n", _0x33844d);
    return {
      result: false
    };
  }
}
async function textToLogoGenerator(_0x58a7ef, _0x653170 = "", _0x30f59b, _0x2f2903) {
  const _0x285aee = require("mumaker");
  try {
    let _0x463594;
    let _0x5ef26c = "https://textpro.me/" + _0x653170 + ".html";
    if (_0x30f59b && !_0x2f2903) {
      _0x463594 = await _0x285aee.textpro(_0x5ef26c, _0x30f59b);
    } else if (_0x30f59b && _0x2f2903) {
      _0x463594 = await _0x285aee.textpro(_0x5ef26c, [_0x30f59b, _0x2f2903]);
    }
    let _0x419d01 = await getBuffer(_0x463594.image);
    var _0x3f36d2 = {
      ...(await _0x58a7ef.bot.contextInfo(Config.botname, "ᴛᴇxᴛ ᴛᴏ ʟᴏɢᴏ", _0x419d01))
    };
    return await _0x58a7ef.bot.sendMessage(_0x58a7ef.jid, {
      image: _0x419d01,
      caption: Config.caption,
      contextInfo: _0x3f36d2
    });
  } catch (_0x32feed) {
    return await _0x58a7ef.error(_0x32feed + "\n\nfileName: textToLogoGenerator->s.js", _0x32feed);
  }
}
async function photoEditor(_0x1fc0ea, _0xcaa80b = "ad", _0x58ccd0 = "") {
  let _0x399cc3 = ["imageMessage"];
  try {
    let _0x3d680a = _0x399cc3.includes(_0x1fc0ea.mtype) ? _0x1fc0ea : _0x1fc0ea.reply_message;
    if (!_0x3d680a || !_0x399cc3.includes(_0x3d680a?.mtype || "null")) {
      return await _0x1fc0ea.send("*_Uhh Dear, Reply to an image_*");
    }
    let _0x4fcd49 = await _0x1fc0ea.bot.downloadAndSaveMediaMessage(_0x3d680a);
    let _0xaa6990 = await TelegraPh(_0x4fcd49);
    try {
      await fs.unlinkSync(_0x4fcd49);
    } catch (_0x453fa3) {}
    return await _0x1fc0ea.bot.sendMessage(_0x1fc0ea.chat, {
      image: {
        url: "https://api.popcat.xyz/" + _0xcaa80b + "?image=" + _0xaa6990
      },
      caption: _0x58ccd0
    }, {
      quoted: _0x1fc0ea
    });
  } catch (_0xf96dd2) {
    await _0x1fc0ea.error(_0xf96dd2 + "\n\ncommand: " + _0xcaa80b + "\nfileName: photoEditor->s.js", _0xf96dd2);
  }
}
async function plugins(_0x550c52, _0x1f722f, _0x1b39f4 = "", _0x301a54 = "") {
  let _0x3754e0 = "";
  try {
    let _0x226fce = (await bot_.findOne({
      id: "bot_" + _0x550c52.user
    })) || (await bot_.new({
      id: "bot_" + _0x550c52.user
    }));
    let _0x11b70d = _0x226fce.plugins;
    if (_0x1f722f.toLowerCase() === "install") {
      let _0x4dfbb3 = "";
      for (let _0x328493 of isUrl(_0x1b39f4)) {
        var _0x23ec90 = new URL(_0x328493.replace(/[_*]+$/, ""));
        const {
          data: _0x32e736
        } = await axios.get(_0x23ec90.href.includes("raw") ? _0x23ec90.href : _0x23ec90.href + "/raw");
        let _0x1ed66f = /pattern: ["'](.*)["'],/g.exec(_0x32e736) || /cmdname: ["'](.*)["'],/g.exec(_0x32e736);
        if (!_0x1ed66f) {
          _0x3754e0 += "*gist not found:* _" + _0x23ec90 + "_ \n";
          continue;
        }
        let _0x4a3752 = _0x1ed66f[1].split(" ")[0] || Math.random().toString(36).slice(-5);
        let _0x71f74c = _0x4a3752.replace(/[^A-Za-z]/g, "");
        if (_0x4dfbb3.includes(_0x71f74c)) {
          continue;
        } else {
          _0x4dfbb3 = _0x4dfbb3 + "[\"" + _0x71f74c + "\"] ";
        }
        if (_0x11b70d[_0x71f74c]) {
          _0x3754e0 += "*Plugin _'" + _0x71f74c + "'_ already installed!*\n";
          continue;
        }
        let _0x24b309 = _0x301a54 + "/" + _0x71f74c + ".smd";
        await fs.writeFileSync(_0x24b309, _0x32e736, "utf8");
        try {
          require(_0x24b309);
        } catch (_0x5b77d8) {
          fs.unlinkSync(_0x24b309);
          _0x3754e0 += "*Invalid :* _" + _0x23ec90 + "_\n ```" + _0x5b77d8 + "```\n\n ";
          continue;
        }
        if (!_0x11b70d[_0x71f74c]) {
          _0x11b70d[_0x71f74c] = _0x23ec90.href;
          await bot_.updateOne({
            id: "bot_" + _0x550c52.user
          }, {
            plugins: _0x11b70d
          });
          _0x3754e0 += "*Plugin _'" + _0x71f74c + "'_ Succesfully installed!*\n";
        }
      }
    } else if (_0x1f722f.toLowerCase() === "remove") {
      if (_0x1b39f4 === "all") {
        let _0xf37a7d = "";
        for (const _0x108be9 in _0x11b70d) {
          try {
            fs.unlinkSync(_0x301a54 + "/" + _0x108be9 + ".smd");
            _0xf37a7d = "" + _0xf37a7d + _0x108be9 + ",";
          } catch (_0x5bb170) {
            console.log("❌ " + _0x108be9 + " ❌ NOT BE REMOVED", _0x5bb170);
          }
        }
        await bot_.updateOne({
          id: "bot_" + _0x550c52.user
        }, {
          plugins: {}
        });
        _0x3754e0 = "*External plugins " + (_0xf37a7d ? _0xf37a7d : "all") + " removed!!!*";
      } else {
        try {
          if (_0x11b70d[_0x1b39f4]) {
            try {
              fs.unlinkSync(_0x301a54 + "/" + _0x1b39f4 + ".smd");
            } catch {}
            delete _0x11b70d[_0x1b39f4];
            await bot_.updateOne({
              id: "bot_" + _0x550c52.user
            }, {
              plugins: _0x11b70d
            });
            _0x3754e0 += "*Plugin _'" + _0x1b39f4 + "'_ Succesfully removed!*";
          } else {
            _0x3754e0 += "*_plugin not exist in " + Config.botname + "_*";
          }
        } catch (_0x35a9e7) {
          console.log("Error while removing plugins \n ", _0x35a9e7);
        }
      }
    } else if (_0x1f722f.toLowerCase() === "plugins") {
      if (_0x1b39f4) {
        _0x3754e0 = _0x11b70d[_0x1b39f4] ? "*_" + _0x1b39f4 + ":_* " + _0x11b70d[_0x1b39f4] : false;
      } else {
        let _0x1578eb = 0;
        for (const _0x1a983f in _0x11b70d) {
          _0x3754e0 += "*" + (_0x1578eb + 1) + ":-* " + _0x1a983f + " \n*Url:* " + _0x11b70d[_0x1a983f] + "\n\n";
        }
      }
    }
    return _0x3754e0;
  } catch (_0x36f6e5) {
    console.log("Plugins : ", _0x36f6e5);
    return (_0x3754e0 + " \n\nError: " + _0x36f6e5).trim();
  }
}
async function updateProfilePicture(_0x58cf80, _0x364397, _0x4ff608, _0x4bfd71 = "pp") {
  try {
    if (_0x4bfd71 === "pp" || _0x4bfd71 === "gpp") {
      let _0xf54573 = await _0x58cf80.bot.downloadAndSaveMediaMessage(_0x4ff608);
      await _0x58cf80.bot.updateProfilePicture(_0x364397, {
        url: _0xf54573
      });
    } else {
      async function _0x4f70fc(_0x14da08) {
        const _0x402938 = await Jimp.read(_0x14da08);
        const _0x5ec6d4 = _0x402938.getWidth();
        const _0x2f51d2 = _0x402938.getHeight();
        const _0xc85b6d = _0x402938.crop(0, 0, _0x5ec6d4, _0x2f51d2);
        return {
          img: await _0xc85b6d.scaleToFit(324, 720).getBufferAsync(Jimp.MIME_JPEG),
          preview: await _0xc85b6d.normalize().getBufferAsync(Jimp.MIME_JPEG)
        };
      }
      try {
        const _0x3c5e49 = await _0x4ff608.download();
        const {
          query: _0x144a9b
        } = _0x58cf80.bot;
        const {
          preview: _0x3abbc0
        } = await _0x4f70fc(_0x3c5e49);
        await _0x144a9b({
          tag: "iq",
          attrs: {
            to: _0x364397,
            type: "set",
            xmlns: "w:profile:picture"
          },
          content: [{
            tag: "picture",
            attrs: {
              type: "image"
            },
            content: _0x3abbc0
          }]
        });
      } catch (_0x5627f7) {
        let _0x4c40d1 = await _0x58cf80.bot.downloadAndSaveMediaMessage(_0x4ff608);
        await _0x58cf80.bot.updateProfilePicture(_0x364397, {
          url: _0x4c40d1
        });
        return await _0x58cf80.error(_0x5627f7 + " \n\ncommand: update pp", _0x5627f7, false);
      }
    }
    return await _0x58cf80.reply("*_Profile icon updated Succesfully!!_*");
  } catch (_0x412cca) {
    return await _0x58cf80.error(_0x412cca + " \n\ncommand: " + (_0x4bfd71 ? _0x4bfd71 : "pp"), _0x412cca);
  }
}
async function forwardMessage(_0x5b712d, _0x23d9a7, _0x4257fb = "") {
  let _0x4cbc24 = _0x23d9a7.quoted.mtype;
  let _0x295e7b;
  if (_0x4cbc24 === "videoMessage" && _0x4257fb === "ptv") {
    _0x295e7b = {
      ptvMessage: {
        ..._0x23d9a7.quoted
      }
    };
  } else if (_0x4cbc24 === "videoMessage") {
    _0x295e7b = {
      videoMessage: {
        ..._0x23d9a7.quoted
      }
    };
  } else if (_0x4cbc24 === "imageMessage") {
    _0x295e7b = {
      imageMessage: {
        ..._0x23d9a7.quoted
      }
    };
  } else if (_0x4cbc24 === "audioMessage") {
    _0x295e7b = {
      audioMessage: {
        ..._0x23d9a7.quoted
      }
    };
  } else if (_0x4cbc24 === "documentMessage") {
    _0x295e7b = {
      documentMessage: {
        ..._0x23d9a7.quoted
      }
    };
  } else if (_0x4cbc24 === "conversation" || _0x4cbc24 === "extendedTextMessage") {
    return await _0x23d9a7.send(_0x23d9a7.quoted.text, {}, "", _0x23d9a7, _0x5b712d);
  }
  if (_0x295e7b) {
    try {
      await Suhail.bot.relayMessage(_0x5b712d, _0x295e7b, {
        messageId: _0x23d9a7.key.id
      });
    } catch (_0x312dd7) {
      if (_0x4257fb === "ptv" || _0x4257fb === "save") {
        await _0x23d9a7.error(_0x312dd7);
      }
      console.log("Error in " + _0x4257fb + "-cmd in forwardMessage \n", _0x312dd7);
    }
  }
}
async function generateSticker(_0x5553ca, _0xa03f1d, _0x27d706 = {
  pack: Config.packname,
  author: Config.author
}) {
  try {
    const {
      Sticker: _0x6dc1b7,
      createSticker: _0x146dd6,
      StickerTypes: _0x4c1e77
    } = require("wa-sticker-formatter");
    let _0x311fd7 = new _0x6dc1b7(_0xa03f1d, {
      ..._0x27d706
    });
    return await _0x5553ca.bot.sendMessage(_0x5553ca.chat, {
      sticker: await _0x311fd7.toBuffer()
    }, {
      quoted: _0x5553ca
    });
  } catch (_0x3f25ba) {
    return await _0x5553ca.error(_0x3f25ba + "\n\nfileName: generateSticker->s.js\n");
  }
}
async function getRandom(_0x22665e = ".jpg", _0x125e74 = 10000) {
  return "" + Math.floor(Math.random() * _0x125e74) + _0x22665e;
}
async function randomeFunfacts(_0x34ee5) {
  try {
    if (_0x34ee5 === "question") {
      return await random_question();
    } else if (_0x34ee5 === "truth") {
      return await truth();
    } else if (_0x34ee5 === "dare") {
      return await dare();
    } else if (_0x34ee5 === "joke") {
      const _0x467370 = await (await fetch("https://official-joke-api.appspot.com/random_joke")).json();
      return "*Joke :* " + _0x467370.setup + "\n*Punchline:*  " + _0x467370.punchline;
    } else if (_0x34ee5 === "joke2") {
      const _0x5bfe85 = await (await fetch("https://v2.jokeapi.dev/joke/Any?type=single")).json();
      return "*joke :* " + _0x5bfe85.joke;
    } else if (_0x34ee5 === "fact") {
      const {
        data: _0x5ea012
      } = await axios.get("https://nekos.life/api/v2/fact");
      return "*Fact:* " + _0x5ea012.fact;
    } else if (_0x34ee5 === "quotes") {
      const {
        data: _0x1356bd
      } = await axios.get("https://favqs.com/api/qotd");
      return "╔════◇\n║ *🎗️Content:* " + _0x1356bd.quote.body + "\n║ *👤Author:* " + _0x1356bd.quote.author + "\n║\n╚════════════╝";
    }
  } catch (_0x5627ef) {
    await msg.error(_0x5627ef);
    return console.log("./lib/Suhail.js/randomeFunfacts()\n", _0x5627ef);
  }
}
async function audioEditor(_0x342aad, _0x31dd6d = "bass", _0x2f8dcc = "") {
  if (!_0x342aad.quoted) {
    return await _0x342aad.send("*_Uhh Dear, Reply to audio!!!_*");
  }
  let _0x46c9c8 = _0x342aad.quoted.mtype || _0x342aad.mtype;
  if (!/audio/.test(_0x46c9c8)) {
    return await _0x342aad.send("*_Reply to the audio you want to change with_*", {}, "", _0x2f8dcc);
  }
  try {
    let _0x43e982 = "-af equalizer=f=54:width_type=o:width=2:g=20";
    if (/bass/.test(_0x31dd6d)) {
      _0x43e982 = "-af equalizer=f=54:width_type=o:width=2:g=20";
    }
    if (/blown/.test(_0x31dd6d)) {
      _0x43e982 = "-af acrusher=.1:1:64:0:log";
    }
    if (/deep/.test(_0x31dd6d)) {
      _0x43e982 = "-af atempo=4/4,asetrate=44500*2/3";
    }
    if (/earrape/.test(_0x31dd6d)) {
      _0x43e982 = "-af volume=12";
    }
    if (/fast/.test(_0x31dd6d)) {
      _0x43e982 = "-filter:a \"atempo=1.63,asetrate=44100\"";
    }
    if (/fat/.test(_0x31dd6d)) {
      _0x43e982 = "-filter:a \"atempo=1.6,asetrate=22100\"";
    }
    if (/nightcore/.test(_0x31dd6d)) {
      _0x43e982 = "-filter:a atempo=1.06,asetrate=44100*1.25";
    }
    if (/reverse/.test(_0x31dd6d)) {
      _0x43e982 = "-filter_complex \"areverse\"";
    }
    if (/robot/.test(_0x31dd6d)) {
      _0x43e982 = "-filter_complex \"afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75\"";
    }
    if (/slow/.test(_0x31dd6d)) {
      _0x43e982 = "-filter:a \"atempo=0.7,asetrate=44100\"";
    }
    if (/smooth/.test(_0x31dd6d)) {
      _0x43e982 = "-filter:v \"minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'\"";
    }
    if (/tupai/.test(_0x31dd6d)) {
      _0x43e982 = "-filter:a \"atempo=0.5,asetrate=65100\"";
    }
    let _0x47c0fb = await _0x342aad.bot.downloadAndSaveMediaMessage(_0x342aad.quoted);
    let _0x4ea61a = "temp/" + (_0x342aad.sender.slice(6) + _0x31dd6d) + ".mp3";
    exec("ffmpeg -i " + _0x47c0fb + " " + _0x43e982 + " " + _0x4ea61a, async (_0x399c4b, _0xb92962, _0x137ef1) => {
      try {
        fs.unlinkSync(_0x47c0fb);
      } catch {}
      ;
      if (_0x399c4b) {
        return _0x342aad.error(_0x399c4b);
      } else {
        let _0x47eb18 = fs.readFileSync(_0x4ea61a);
        try {
          fs.unlinkSync(_0x4ea61a);
        } catch {}
        ;
        var _0x5f3dc2 = {
          ...(await _0x342aad.bot.contextInfo(Config.botname, "⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ⇆"))
        };
        return _0x342aad.bot.sendMessage(_0x342aad.chat, {
          audio: _0x47eb18,
          mimetype: "audio/mpeg",
          ptt: true,
          contextInfo: _0x5f3dc2
        }, {
          quoted: _0x342aad
        });
      }
    });
  } catch (_0x317eea) {
    await _0x342aad.error(_0x317eea + "\n\ncmdName : " + _0x31dd6d + "\n");
    return console.log("./lib/Suhail.js/audioEditor()\n", _0x317eea);
  }
}
async function send(_0x44d22f, _0x420d47, _0x4012f6 = {
  packname: "",
  author: "Suhail-Md"
}, _0x490ded = "", _0x34547c = "", _0x59e660 = "") {
  if (!_0x420d47 || !_0x44d22f) {
    return;
  }
  try {
    let _0x3dad29 = _0x59e660 ? _0x59e660 : _0x44d22f.chat;
    switch (_0x490ded.toLowerCase()) {
      case "text":
      case "":
        {
          return await _0x44d22f.sendMessage(_0x3dad29, {
            text: _0x420d47,
            ..._0x4012f6
          }, {
            quoted: _0x34547c
          });
        }
        break;
      case "react":
        {
          return await _0x44d22f.sendMessage(_0x3dad29, {
            react: {
              text: _0x420d47,
              key: _0x44d22f.key
            }
          });
        }
        break;
      case "image":
        {
          if (Buffer.isBuffer(_0x420d47)) {
            return await _0x44d22f.sendMessage(_0x3dad29, {
              image: _0x420d47,
              ..._0x4012f6
            }, {
              quoted: _0x34547c
            });
          } else if (isUrl(_0x420d47)) {
            return _0x44d22f.sendMessage(_0x3dad29, {
              image: {
                url: _0x420d47
              },
              ..._0x4012f6
            }, {
              quoted: _0x34547c
            });
          }
        }
        break;
      case "video":
        {
          if (Buffer.isBuffer(_0x420d47)) {
            return await _0x44d22f.sendMessage(_0x3dad29, {
              video: _0x420d47,
              ..._0x4012f6
            }, {
              quoted: _0x34547c
            });
          } else if (isUrl(_0x420d47)) {
            return await _0x44d22f.sendMessage(_0x3dad29, {
              video: {
                url: _0x420d47
              },
              ..._0x4012f6
            }, {
              quoted: _0x34547c
            });
          }
        }
      case "audio":
        {
          if (Buffer.isBuffer(_0x420d47)) {
            return await _0x44d22f.sendMessage(_0x3dad29, {
              audio: _0x420d47,
              ..._0x4012f6
            }, {
              quoted: _0x34547c
            });
          } else if (isUrl(_0x420d47)) {
            return await _0x44d22f.sendMessage(suhail.chatjid, {
              audio: {
                url: _0x420d47
              },
              ..._0x4012f6
            }, {
              quoted: _0x34547c
            });
          }
        }
        break;
    }
  } catch (_0x10475e) {
    return console.log("./lib/Suhail.js/send()\n", _0x10475e);
  }
}
async function react(_0x3b7627, _0x4398af, _0x3fc6b8 = "") {
  try {
    if (!_0x4398af || !_0x3b7627) {
      return;
    }
    let _0x4172ce = _0x3fc6b8 && _0x3fc6b8.key ? _0x3fc6b8.key : _0x3b7627.key;
    return await _0x3b7627.sendMessage(_0x3b7627.chat, {
      react: {
        text: _0x4398af,
        key: _0x4172ce
      }
    });
  } catch (_0x20af96) {
    return console.log("./lib/Suhail.js/react()\n", _0x20af96);
  }
}
let note = {
  info: "make sure to provide 1st parameter of bot number as {user:botNumber} ,and 2nd as note text|id"
};
note.addnote = async (_0x2c6112, _0x2d5d13) => {
  try {
    let _0x1b9876 = (await bot_.findOne({
      id: "bot_" + _0x2c6112.user
    })) || (await bot_.new({
      id: "bot_" + _0x2c6112.user
    }));
    let _0x3a1269 = _0x1b9876.notes;
    let _0x3ee61a = 0;
    while (_0x3a1269[_0x3ee61a] !== undefined) {
      _0x3ee61a++;
    }
    _0x3a1269[_0x3ee61a] = _0x2d5d13;
    await bot_.updateOne({
      id: "bot_" + _0x2c6112.user
    }, {
      notes: _0x3a1269
    });
    return {
      status: true,
      id: _0x3ee61a,
      msg: "*New note added at ID: " + _0x3ee61a + "*"
    };
  } catch (_0x1c523a) {
    console.log("note.addnote ERROR :  ", _0x1c523a);
    return {
      status: false,
      error: _0x1c523a,
      msg: "*Can't add new notes due to error!!*"
    };
  }
};
note.delnote = async (_0x362b21, _0x47a2a6) => {
  try {
    let _0x1f9fc5 = (await bot_.findOne({
      id: "bot_" + _0x362b21.user
    })) || (await bot_.new({
      id: "bot_" + _0x362b21.user
    }));
    let _0x1f5fc6 = _0x1f9fc5.notes;
    let _0x596c3c = "*Please provide valid note id!*";
    if (_0x1f5fc6[_0x47a2a6]) {
      delete _0x1f5fc6[_0x47a2a6];
      await bot_.updateOne({
        id: "bot_" + _0x362b21.user
      }, {
        notes: _0x1f5fc6
      });
      _0x596c3c = "*Note with Id:" + _0x47a2a6 + " deleted successfully!*";
    }
    return {
      status: true,
      msg: _0x596c3c
    };
  } catch (_0x38e9e6) {
    console.log("note.delnote  ERROR :  ", _0x38e9e6);
    return {
      status: false,
      error: _0x38e9e6,
      msg: "*Can't delete notes due to error!!*"
    };
  }
};
note.delallnote = async (_0x4ffe5c, _0x7ff403 = "") => {
  try {
    await bot_.updateOne({
      id: "bot_" + _0x4ffe5c.user
    }, {
      notes: {}
    });
    return {
      status: true,
      msg: "*All saved notes deleted from server!*"
    };
  } catch (_0x547a71) {
    console.log("note.delnote  ERROR :  ", _0x547a71);
    return {
      status: false,
      error: _0x547a71,
      msg: "*Request not be proceed, Sorry!*"
    };
  }
};
note.allnotes = async (_0x1b714e, _0x55a38b = "") => {
  try {
    let _0x307a18 = (await bot_.findOne({
      id: "bot_" + _0x1b714e.user
    })) || (await bot_.new({
      id: "bot_" + _0x1b714e.user
    }));
    let _0x3cae14 = _0x307a18.notes;
    let _0x223ee6 = "*Please provide valid note id!*";
    if (_0x55a38b == "all" || !_0x55a38b) {
      let _0x12985d = "";
      for (const _0xec917c in _0x3cae14) {
        _0x12985d += "*NOTE " + _0xec917c + ":* " + _0x3cae14[_0xec917c] + "\n\n";
      }
      _0x223ee6 = _0x12985d ? _0x12985d : "*No notes found!*";
    } else if (_0x55a38b && _0x3cae14[_0x55a38b]) {
      _0x223ee6 = "*Note " + _0x55a38b + ":* " + _0x3cae14[_0x55a38b];
    }
    return {
      status: true,
      msg: _0x223ee6
    };
  } catch (_0x21353b) {
    console.log("note.delnote  ERROR :  ", _0x21353b);
    return {
      status: false,
      error: _0x21353b,
      msg: "*Can't delete notes due to error!!*"
    };
  }
};
async function sendWelcome(_0x2ee7fc, _0x1ebca8 = "", _0x4c631b = "") {
  try {
    if (_0x1ebca8) {
      if (_0x2ee7fc.isGroup) {
        _0x1ebca8.replace(/@gname/gi, _0x2ee7fc.metadata.subject).replace(/@desc/gi, _0x2ee7fc.metadata.desc).replace(/@count/gi, _0x2ee7fc.metadata.participants.length).trim();
      }
      let _0xafbcea = _0x1ebca8.replace(/@user/gi, "@" + _0x2ee7fc.senderNum).replace(/@gname/gi, "").replace(/@desc/gi, "").replace(/@count/gi, "1").replace(/@pp/g, "").replace(/@time/gi, _0x2ee7fc.time).replace(/@date/gi, _0x2ee7fc.date).replace(/@line/gi, (await fetchJson("https://api.popcat.xyz/pickuplines")).pickupline).replace(/@quote/, (await axios.get("https://favqs.com/api/qotd")).data.quote.body).trim();
      if (/@pp/g.test(_0x1ebca8)) {
        return await _0x2ee7fc.send(await _0x2ee7fc.getpp(), {
          caption: _0xafbcea,
          mentions: [_0x2ee7fc.sender]
        }, "image", _0x4c631b);
      } else {
        return await _0x2ee7fc.send(_0xafbcea, {
          mentions: [_0x2ee7fc.sender]
        }, "suhail", _0x4c631b);
      }
    }
  } catch (_0x40dc44) {
    return console.log("./lib/Suhail.js/sendWelcome()\n", _0x40dc44);
  }
}
async function aitts(_0x4767d4, _0x4d170e = "") {
  try {
    if (!global.SmdOfficial || global.SmdOfficial !== "yes") {
      return "u bloody, Get out from here!!";
    }
    if (!Config.ELEVENLAB_API_KEY || !Config.ELEVENLAB_API_KEY.length > 8) {
      return _0x4767d4.reply("Dear, You Dont Have ELEVENLAB_API_KEY \nCreate ELEVENLAB KEY from below Link \nhttps://elevenlabs.io/\n\nAnd Set it in ELEVENLAB_API_KEY Var\n\n" + Config.caption);
    }
    const _0x9bf531 = ["21m00Tcm4TlvDq8ikWAM", "2EiwWnXFnvU5JabPnv8n", "AZnzlk1XvdvUeBnXmlld", "CYw3kZ02Hs0563khs1Fj", "D38z5RcWu1voky8WS1ja", "EXAVITQu4vr4xnSDxMaL", "ErXwobaYiN019PkySvjV", "GBv7mTt0atIp3Br8iCZE", "IKne3meq5aSn9XLyUdCD", "LcfcDJNUP1GQjkzn1xUU", "MF3mGyEYCl7XYWbV9V6O", "N2lVS1w4EtoT3dr4eOWO", "ODq5zmih8GrVes37Dizd", "SOYHLrjzK2X1ezoPC6cr", "TX3LPaxmHKxFdv7VOQHJ", "ThT5KcBeYPX3keUQqHPh", "TxGEqnHWrfWFTfGW9XjX", "VR6AewLTigWG4xSOukaG", "XB0fDUnXU5powFXDhCwa", "XrExE9yKIg1WjnnlVkGX", "Yko7PKHZNXotIFUBG7I9", "ZQe5CZNOzWyzPSCn5a3c", "Zlb1dXrM653N07WRdFW3", "bVMeCyTHy58xNoL34h3p", "flq6f7yk4E4fJM5XTYuZ", "g5CIjZEefAph4nQFvHAz", "jBpfuIE2acCO8z3wKNLl", "jsCqWAovK2LkecY7zXl4", "oWAxZDx7w5VEj9dCyTzz", "onwK4e9ZLuTAKqWW03F9", "pMsXgVXv3BLzUgSXRplE", "pNInz6obpgDQGcFmaJgB", "piTKgcLEGmPE4e6mEKli", "t0jbNlBVZ17f02VDIeMI", "wViXBPUzp2ZZixB1xQuM", "yoZ06aMxZJJ28mfd3POQ", "z9fAnlkpzviPz146aGWa", "zcAOhNBS3c14rBihAFp1", "zrHiDhphv9ZnVXBqCLjz"];
    const _0x18cf08 = parseInt(Config.aitts_Voice_Id);
    if (!_0x4d170e && !_0x4767d4.isCreator) {
      return _0x4767d4.reply("*Uhh Dear, Please Provide text..!*\n*Example: _.aitts i am " + _0x4767d4.pushName + "._*");
    } else if (!_0x4d170e && _0x4767d4.isCreator || _0x4d170e === "setting" || _0x4d170e === "info") {
      return _0x4767d4.bot.sendMessage(_0x4767d4.jid, {
        text: "*Hey " + _0x4767d4.pushName + "!.*\n  _Please provide text!_\n  *Example:* _.aitts i am " + _0x4767d4.pushName + "._\n\n  *You Currently " + (!isNaN(_0x18cf08) && _0x18cf08 > 0 && _0x18cf08 <= 39 ? "set Voice Id: " + _0x18cf08 + "*\nUpdate" : "not set any Specific Voice*\nAdd Specific") + " Voice: _.addvar AITTS_ID:35/4/32,etc._\n\n\n  *Also use available voices*```\n\n  1: Rachel\n  2: Clyde\n  3: Domi\n  4: Dave\n  5: Fin\n  6: Bella\n  7: Antoni\n  8: Thomas\n  9: Charlie\n  10: Emily\n  11: Elli\n  12: Callum\n  13: Patrick\n  14: Harry\n  15: Liam\n  16: Dorothy\n  17: Josh\n  18: Arnold\n  19: Charlotte\n  20: Matilda\n  21: Matthew\n  22: James\n  23: Joseph\n  24: Jeremy\n  25: Michael\n  26: Ethan\n  27: Gigi\n  28: Freya\n  29: Grace\n  30: Daniel\n  31: Serena\n  32: Adam\n  33: Nicole\n  34: Jessie\n  35: Ryan\n  36: suhail\n  37: Glinda\n  38: Giovanni\n  39: Mimi\n  ```" + ("\n\n  *Example:* _.aitts i am " + _0x4767d4.pushName + "_:36 \n  *OR:* _.aitts i am " + _0x4767d4.pushName + "_:suhail     \n\n\n  " + Config.caption)
      });
    }
    let _0x1da19f = _0x4d170e;
    var _0x1fe55e = 0 || Math.floor(Math.random() * _0x9bf531.length);
    let _0x13c945 = false;
    if (!isNaN(_0x18cf08) && _0x18cf08 > 0 && _0x18cf08 < 39) {
      _0x13c945 = true;
      _0x1fe55e = _0x18cf08;
    }
    if (_0x4d170e && _0x4d170e.includes(":")) {
      let _0xedd5d2 = _0x4d170e.split(":");
      let _0x500355 = _0xedd5d2[_0xedd5d2.length - 1].trim() || "";
      _0x1da19f = _0xedd5d2.slice(0, _0xedd5d2.length - 1).join(":");
      if (_0x500355.toLowerCase() === "richel" || _0x500355 === "1") {
        _0x1fe55e = 0;
      } else if (_0x500355.toLowerCase() === "clyde" || _0x500355 === "2") {
        _0x1fe55e = 1;
      } else if (_0x500355.toLowerCase() === "domi" || _0x500355 === "3") {
        _0x1fe55e = 2;
      } else if (_0x500355.toLowerCase() === "dave" || _0x500355 === "4") {
        _0x1fe55e = 3;
      } else if (_0x500355.toLowerCase() === "fin" || _0x500355 === "5") {
        _0x1fe55e = 4;
      } else if (_0x500355.toLowerCase() === "bella" || _0x500355 === "6") {
        _0x1fe55e = 5;
      } else if (_0x500355.toLowerCase() === "antoni" || _0x500355 === "7") {
        _0x1fe55e = 6;
      } else if (_0x500355.toLowerCase() === "thomas" || _0x500355 === "8") {
        _0x1fe55e = 7;
      } else if (_0x500355.toLowerCase() === "charlie" || _0x500355 === "9") {
        _0x1fe55e = 8;
      } else if (_0x500355.toLowerCase() === "emily" || _0x500355 === "10") {
        _0x1fe55e = 9;
      } else if (_0x500355.toLowerCase() === "elli" || _0x500355 === "11") {
        _0x1fe55e = 10;
      } else if (_0x500355.toLowerCase() === "callum" || _0x500355 === "12") {
        _0x1fe55e = 11;
      } else if (_0x500355.toLowerCase() === "patrick" || _0x500355 === "13") {
        _0x1fe55e = 12;
      } else if (_0x500355.toLowerCase() === "harry" || _0x500355 === "14") {
        _0x1fe55e = 13;
      } else if (_0x500355.toLowerCase() === "liam" || _0x500355 === "15") {
        _0x1fe55e = 14;
      } else if (_0x500355.toLowerCase() === "dorothy" || _0x500355 === "16") {
        _0x1fe55e = 15;
      } else if (_0x500355.toLowerCase() === "josh" || _0x500355 === "17") {
        _0x1fe55e = 16;
      } else if (_0x500355.toLowerCase() === "arnold" || _0x500355 === "18") {
        _0x1fe55e = 17;
      } else if (_0x500355.toLowerCase() === "charlotte" || _0x500355 === "19") {
        _0x1fe55e = 18;
      } else if (_0x500355.toLowerCase() === "matilda" || _0x500355 === "20") {
        _0x1fe55e = 19;
      } else if (_0x500355.toLowerCase() === "matthew" || _0x500355 === "21") {
        _0x1fe55e = 20;
      } else if (_0x500355.toLowerCase() === "james" || _0x500355 === "22") {
        _0x1fe55e = 21;
      } else if (_0x500355.toLowerCase() === "joseph" || _0x500355 === "23") {
        _0x1fe55e = 22;
      } else if (_0x500355.toLowerCase() === "jeremy" || _0x500355 === "24") {
        _0x1fe55e = 23;
      } else if (_0x500355.toLowerCase() === "michael" || _0x500355 === "25") {
        _0x1fe55e = 24;
      } else if (_0x500355.toLowerCase() === "ethan" || _0x500355 === "26") {
        _0x1fe55e = 25;
      } else if (_0x500355.toLowerCase() === "gigi" || _0x500355 === "27") {
        _0x1fe55e = 26;
      } else if (_0x500355.toLowerCase() === "freya" || _0x500355 === "28") {
        _0x1fe55e = 27;
      } else if (_0x500355.toLowerCase() === "grace" || _0x500355 === "29") {
        _0x1fe55e = 28;
      } else if (_0x500355.toLowerCase() === "daniel" || _0x500355 === "30") {
        _0x1fe55e = 29;
      } else if (_0x500355.toLowerCase() === "serena" || _0x500355 === "31") {
        _0x1fe55e = 30;
      } else if (_0x500355.toLowerCase() === "adam" || _0x500355 === "32") {
        _0x1fe55e = 31;
      } else if (_0x500355.toLowerCase() === "nicole" || _0x500355 === "33") {
        _0x1fe55e = 32;
      } else if (_0x500355.toLowerCase() === "jessie" || _0x500355 === "34") {
        _0x1fe55e = 33;
      } else if (_0x500355.toLowerCase() === "ryan" || _0x500355 === "35") {
        _0x1fe55e = 34;
      } else if (_0x500355.toLowerCase() === "suhail" || _0x500355 === "36") {
        _0x1fe55e = 35;
      } else if (_0x500355.toLowerCase() === "glinda" || _0x500355 === "37") {
        _0x1fe55e = 36;
      } else if (_0x500355.toLowerCase() === "giovanni" || _0x500355 === "38") {
        _0x1fe55e = 37;
      } else if (_0x500355.toLowerCase() === "mimi" || _0x500355 === "39") {
        _0x1fe55e = 38;
      } else {
        _0x1da19f = _0x4d170e;
        _0x1fe55e = _0x1fe55e;
      }
    }
    const _0xe904fe = {
      method: "POST",
      url: "https://api.elevenlabs.io/v1/text-to-speech/" + _0x9bf531[_0x1fe55e],
      headers: {
        accept: "audio/mpeg",
        "content-type": "application/json",
        "xi-api-key": "" + Config.ELEVENLAB_API_KEY
      },
      data: {
        text: _0x1da19f
      },
      responseType: "arraybuffer"
    };
    const {
      data: _0xa49a91
    } = await axios.request(_0xe904fe);
    if (!_0xa49a91) {
      return await _0x4767d4.send("*_Request not be proceed!_*");
    }
    await _0x4767d4.sendMessage(_0x4767d4.from, {
      audio: _0xa49a91,
      mimetype: "audio/mpeg",
      ptt: true
    });
  } catch (_0x225b16) {
    await _0x4767d4.error(_0x225b16 + "\n\ncommand: aitts", _0x225b16);
  }
}
module.exports = {
  yt: yt,
  sendAnimeReaction: sendAnimeReaction,
  sendGImages: sendGImages,
  AudioToBlackVideo: AudioToBlackVideo,
  textToLogoGenerator: textToLogoGenerator,
  photoEditor: photoEditor,
  updateProfilePicture: updateProfilePicture,
  randomeFunfacts: randomeFunfacts,
  plugins: plugins,
  getRandom: getRandom,
  generateSticker: generateSticker,
  forwardMessage: forwardMessage,
  audioEditor: audioEditor,
  send: send,
  react: react,
  note: note,
  sendWelcome: sendWelcome,
  aitts: aitts
};