global.BUTTONS = process.env.BUTTONS || "1";
const os = require("os");
const fs = require("fs");
const Config = require("../config");
let {
  fancytext,
  tlang,
  runtime,
  formatp,
  prefix,
  smd
} = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const axios = require("axios");
const fetch = require("node-fetch");
const util = require("util");
const events = astro_patch;
const {
  commands
} = require("../lib");
const {
  exec
} = require("child_process");
const translatte = require("translatte");
const cheerio = require("cheerio");
const path = require("path");
const cron = require("node-cron");
global.caption = global.caption || Config.caption || "";
global.ownername = global.ownername || Config.ownername || "Suhail";
global.botname = global.botname || Config.botname || "Suhail-MD";
global.menu = global.menu || Config.menu || "";
global.HANDLERS = global.HANDLERS || Config.HANDLERS || prefix || "";
global.menu_fancy = global.menu_fancy || process.env.MENU_FANCY || "ss";
global.ui_Cache = {};
global.ui_urls = [];
var cronStart = false;
if (!cronStart) {
  cron.schedule("*/15 * * * *", () => {
    cronStart = true;
    fs.readdir("./temp", (err, files) => {
      if (err) {
        return;
      } else {
        files.forEach(file => {
          try {
            fs.unlinkSync("./temp/" + file);
          } catch {
            console.log("ERROR DELETING FILES: ", e);
          }
        });
      }
    });
  });
}
;
astro_patch.cmd({
  pattern: "setcmd",
  desc: "To check ping",
  category: "general",
  fromMe: true,
  filename: __filename
}, async (_0x19c6c2, _0x390366, {
  Void: _0x5744a6
}) => {
  try {
    if (!_0x390366) {
      return await _0x19c6c2.send("*_Please provide cmd name by replying a Sticker_*");
    }
    let _0x589082 = _0x390366.split(",");
    var _0xcfa05c;
    var _0x1d482d;
    let _0x3b5abd = false;
    if (_0x19c6c2.quoted) {
      let _0x2cb146 = _0x19c6c2.quoted.mtype;
      if (_0x2cb146 == "stickerMessage" && _0x390366) {
        _0x3b5abd = true;
        _0xcfa05c = _0x390366.split(" ")[0];
        _0x1d482d = "sticker-" + _0x19c6c2.quoted.msg.fileSha256;
      }
    }
    if (!_0x3b5abd && _0x589082.length > 1) {
      _0x1d482d = _0x589082[0].trim().toLowerCase();
      _0xcfa05c = _0x589082[1].trim().toLowerCase();
    } else if (!_0x3b5abd) {
      return await _0x19c6c2.send("*_Uhh Dear, Give Cmd With New Name_*\n*Eg: _.setcmd New_Name, Cmd_Name_*");
    }
    if (_0x1d482d.length < 1) {
      return await _0x19c6c2.reply("*_Uhh Please, Provide New_Cmd Name First_*");
    }
    if (global.setCmdAlias[_0x1d482d]) {
      return await _0x19c6c2.send("*_\"" + (_0x3b5abd ? "Given Sticker" : _0x1d482d) + "\" Already set for \"" + global.setCmdAlias[_0x1d482d] + "\" Cmd, Please try another " + (_0x3b5abd ? "Sticker" : "Name") + "_*");
    }
    const _0x1af1e0 = astro_patch.commands.find(_0x8905bd => _0x8905bd.pattern === _0xcfa05c) || astro_patch.commands.find(_0x2cb164 => _0x2cb164.alias && _0x2cb164.alias.includes(_0xcfa05c));
    if (_0x1af1e0) {
      global.setCmdAlias[_0x1d482d] = _0x1af1e0.pattern;
      return await _0x19c6c2.send("*_Cmd \"" + global.setCmdAlias[_0x1d482d] + "\" Succesfully set to \"" + (_0x3b5abd ? "Sticker" : _0x1d482d) + "\"._*\n*_These all names are reset, If bot restart_*");
    } else {
      return await _0x19c6c2.send("*_Provided Cmd( " + _0xcfa05c + ") not found in bot cmds. Please Provide Valid cmd Name_*");
    }
  } catch (_0x56a63d) {
    await _0x19c6c2.error(_0x56a63d + "\nCommand:setcmd", _0x56a63d);
  }
});
astro_patch.cmd({
  pattern: "delcmd",
  desc: "To check ping",
  category: "general",
  fromMe: true,
  filename: __filename
}, async (_0x24256f, _0x5413b8, {
  Void: _0x5d796d
}) => {
  try {
    let _0x51d508 = _0x5413b8 ? _0x5413b8.split(" ")[0].trim().toLowerCase() : "";
    let _0x3fe92f = false;
    if (_0x24256f.quoted) {
      if (_0x24256f.quoted.mtype == "stickerMessage") {
        _0x3fe92f = true;
        _0x51d508 = "sticker-" + _0x24256f.quoted.msg.fileSha256;
      } else if (!_0x5413b8) {
        return await _0x24256f.send("*_Please reply to a Sticker that set for a Cmd_*");
      }
    } else if (!_0x5413b8) {
      return await _0x24256f.send("*_Uhh Dear, provide Name that set to a cmd_*\n*Eg: _.delcmd Cmd_Name_*");
    }
    if (global.setCmdAlias[_0x51d508]) {
      await _0x24256f.send("*_\"" + (_0x3fe92f ? "Given Sticker" : _0x51d508) + "\" deleted Succesfully at \"" + global.setCmdAlias[_0x51d508] + "\" cmd_*");
      delete global.setCmdAlias[_0x51d508];
      return;
    } else {
      return await _0x24256f.send("*_\"" + (_0x3fe92f ? "Given Sticker" : _0x51d508) + "\" not Set for any cmd._*\n *_Please Provide Valid " + (_0x3fe92f ? "Sticker" : "cmd Name") + " to delete_*");
    }
  } catch (_0x1c3c2e) {
    await _0x24256f.error(_0x1c3c2e + "\nCommand:delcmd", _0x1c3c2e);
  }
});
astro_patch.smd({
  pattern: "ping",
  desc: "To check ping",
  category: "general",
  filename: __filename
}, async _0x1d39cb => {
  var _0x3ee9e5 = new Date().getTime();
  const {
    key: _0x46bcf7
  } = await _0x1d39cb.reply("*Testing Ping!!!*");
  var _0x578b74 = new Date().getTime();
  return await _0x1d39cb.send("*ʟᴀᴛᴇɴᴄʏ " + (_0x578b74 - _0x3ee9e5) + " ms*", {
    edit: _0x46bcf7
  }, "", _0x1d39cb);
});
astro_patch.cmd({
  pattern: "runtime",
  alias: ["uptime"],
  desc: "Tells runtime/uptime of bot.",
  category: "misc",
  filename: __filename
}, async _0x5c9c07 => {
  try {
    _0x5c9c07.reply("*_Uptime of " + tlang().title + ": " + runtime(process.uptime()) + "_*");
  } catch (_0x3b0363) {
    await _0x5c9c07.error(_0x3b0363 + "\n\ncommand : uptime", _0x3b0363, false);
  }
});
global.create_UI = () => {
  if (!global.userImages || /text|txt|nothing|suhail/.test(global.userImages)) {
    return {};
  }
  const _0x6d542a = [".jpg", ".jpeg", ".png", ".webp"];
  const _0x520773 = [".mp4", ".avi", ".mov", ".mkv", ".gif", ".m4v"];
  let _0x5cbf34 = video = false;
  if (!ui_urls || !ui_urls[0]) {
    ui_urls = global.userImages ? global.userImages.split(",") : [""];
    ui_urls = ui_urls.filter(_0x2e34e7 => _0x2e34e7.trim() !== "");
  }
  let _0x38000b = (ui_urls[Math.floor(Math.random() * ui_urls.length)] || "").trim();
  if (/http/gi.test(_0x38000b) && !ui_infoCache[_0x38000b]) {
    const _0x41988b = _0x38000b.substring(_0x38000b.lastIndexOf(".")).toLowerCase();
    if (_0x6d542a.includes(_0x41988b)) {
      ui_Cache[_0x38000b] = "image";
    } else if (_0x520773.includes(_0x41988b)) {
      ui_Cache[_0x38000b] = "video";
    }
  }
  return {
    [ui_Cache[_0x38000b] || "Inavlid_Type_URL"]: {
      url: _0x38000b
    }
  };
};
global.createButtons = _0x322a2c => {
  if (!_0x322a2c || Array.isArray(_0x322a2c)) {
    return _0x322a2c || [];
  }
  const _0x1203a5 = /#button\s*:\s*([^|]+)\s*\|\s*display_text\s*:\s*([^|]+)(?:\s*\|\s*(id)\s*:\s*([^|]+))?(?:\s*\|\s*(copy_code)\s*:\s*([^|]+))?\/#/ig;
  const _0x2f0fe3 = [];
  let _0x311da9;
  while ((_0x311da9 = _0x1203a5.exec(_0x322a2c)) !== null) {
    try {
      const _0x4366c6 = _0x311da9[1].trim();
      const _0x2a65b0 = _0x311da9[2].trim();
      const _0x18594a = _0x311da9[4] ? _0x311da9[4].trim() : "";
      let _0x52b830 = _0x311da9[6] ? _0x311da9[6].trim() : "";
      let _0x4dccad = {
        display_text: _0x2a65b0
      };
      if (_0x4366c6 === "cta_copy") {
        _0x4dccad = {
          display_text: _0x2a65b0,
          id: _0x18594a,
          copy_code: _0x52b830
        };
      } else if (_0x4366c6 === "cta_url") {
        _0x4dccad = {
          display_text: _0x2a65b0,
          url: ("" + (_0x18594a || "")).replace(" /#", "").trim(),
          merchant_url: _0x52b830 || "https://www.google.com"
        };
      } else {
        _0x4dccad = {
          display_text: _0x2a65b0,
          id: _0x18594a
        };
      }
      if (_0x4366c6) {
        _0x2f0fe3.push({
          name: _0x4366c6,
          buttonParamsJson: JSON.stringify(_0x4dccad)
        });
      } else {
        log("button_name missing in", _0x311da9[0]);
      }
    } catch (_0x5d592e) {
      console.log(_0x5d592e);
    }
  }
  return _0x2f0fe3 || [];
};
global.sendButtons = async (_0x3c0a61, _0x1cb8f5 = {}, _0x4294b8 = [], _0x539235 = false) => {
  if (!_0x3c0a61) {
    throw "need m instance";
  }
  let _0x560306 = _0x539235 || _0x3c0a61.jid;
  if (typeof _0x1cb8f5 != "object") {
    _0x1cb8f5 = {};
  }
  _0x1cb8f5.messageId = _0x1cb8f5.messageId || _0x3c0a61.bot.messageId();
  if (typeof _0x4294b8 === "string") {
    _0x4294b8 = createButtons(_0x4294b8);
  }
  if (typeof _0x1cb8f5.buttons === "string" || Array.isArray(_0x1cb8f5.buttons)) {
    _0x4294b8 = [..._0x4294b8, ...(createButtons(_0x1cb8f5.buttons) || [])];
  }
  let {
    generateWAMessageFromContent: _0x1cbb8a,
    proto: _0x229e9d,
    prepareWAMessageMedia: _0x205cd2
  } = require("@whiskeysockets/baileys");
  let _0x4530cd = {};
  try {
    if (typeof _0x1cb8f5.imageMessage === "object") {
      _0x4530cd = {
        imageMessage: _0x1cb8f5.imageMessage
      };
    } else if (typeof _0x1cb8f5.videoMessage === "object") {
      _0x4530cd = {
        videoMessage: _0x1cb8f5.videoMessage
      };
    } else {
      let _0x32171 = false;
      let _0x43e277 = _0x1cb8f5.image || _0x1cb8f5.video ? _0x1cb8f5 : create_UI();
      if (_0x43e277.image) {
        _0x32171 = (await _0x205cd2({
          image: _0x43e277.image || log0
        }, {
          upload: _0x3c0a61.bot.waUploadToServer
        })) || false;
      } else if (_0x43e277.video) {
        _0x32171 = (await _0x205cd2({
          image: _0x43e277.video || log0
        }, {
          upload: _0x3c0a61.bot.waUploadToServer
        })) || false;
      }
      if (_0x32171) {
        _0x4530cd = _0x32171.imageMessage ? {
          imageMessage: _0x32171.imageMessage
        } : _0x32171.videoMessage ? {
          videoMessage: _0x32171.videoMessage
        } : {};
      }
    }
  } catch (_0x346a07) {
    _0x4530cd = {};
  }
  let _0x20bced = {
    ...(await _0x3c0a61.bot.contextInfo(botname, _0x3c0a61.senderName || ownername)),
    ...(_0x1cb8f5.contextInfo || {})
  };
  let _0x5f08d6 = _0x1cbb8a(_0x560306, {
    viewOnceMessage: {
      message: {
        interactiveMessage: _0x229e9d.Message.InteractiveMessage.create({
          body: {
            text: _0x1cb8f5.text || _0x1cb8f5.body || _0x1cb8f5.caption || "Suhail"
          },
          footer: {
            text: _0x1cb8f5.footer || "¢σρуяιgнт αѕтяσρє∂α"
          },
          header: {
            ...(_0x4530cd || {}),
            hasMediaAttachment: _0x4530cd.imageMessage || _0x4530cd.videoMessage ? true : false,
            ...(_0x1cb8f5.header || {})
          },
          contextInfo: _0x20bced,
          nativeFlowMessage: _0x229e9d.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: _0x4294b8
          })
        }),
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        }
      }
    }
  }, _0x1cb8f5);
  await _0x3c0a61.bot.relayMessage(_0x560306, _0x5f08d6.message, {
    messageId: _0x1cb8f5.messageId
  });
  return _0x5f08d6;
};
astro_patch.cmd({
  cmdname: "menu",
  desc: "Help list",
  type: "general",
  filename: __filename
}, async (_0x34854f, _0xc0fd3a) => {
  try {
    const {
      commands: _0x35e374
    } = require("../lib");
    if (_0xc0fd3a.split(" ")[0]) {
      let _0x1d9578 = [];
      const _0x2db5a5 = _0x35e374.find(_0x2f3338 => _0x2f3338.pattern === _0xc0fd3a.split(" ")[0].toLowerCase());
      if (_0x2db5a5) {
        _0x1d9578.push("*🍁Command:* " + _0x2db5a5.pattern);
        if (_0x2db5a5.category) {
          _0x1d9578.push("*🧩Category:* " + _0x2db5a5.category);
        }
        if (_0x2db5a5.alias && _0x2db5a5.alias[0]) {
          _0x1d9578.push("*🧩Alias:* " + _0x2db5a5.alias.join(", "));
        }
        if (_0x2db5a5.desc) {
          _0x1d9578.push("*🧩Description:* " + _0x2db5a5.desc);
        }
        if (_0x2db5a5.use) {
          _0x1d9578.push("*〽️Usa:*\n ```" + prefix + _0x2db5a5.pattern + " " + _0x2db5a5.use + "```");
        }
        if (_0x2db5a5.usage) {
          _0x1d9578.push("*〽️Usage:*\n ```" + _0x2db5a5.usage + "```");
        }
        await _0x34854f.reply(_0x1d9578.join("\n"));
      }
    }
    var _0x3772d4;
    var _0x498fcc;
    var _0x10c74b;
    var _0x18960b;
    var _0x3e0d2f;
    var _0x3fbd57;
    var _0x259d38;
    let _0x23de54 = 0;
    if (menu === "") {
      _0x23de54 = Math.floor(Math.random() * 4) + 1;
    }
    if (_0x23de54 == 1 || menu.trim().startsWith("1") || menu.toLowerCase().includes("v1")) {
      _0x3772d4 = "╭━━━〔 *" + botname + "* 〕━━━┈⊷";
      _0x498fcc = "┃✵│";
      _0x10c74b = "┃✵╰──────────────\n╰━━━━━━━━━━━━━━━┈⊷";
      _0x18960b = "╭─────────────┈⊷\n│「";
      _0x3e0d2f = "」\n╰┬────────────┈⊷";
      _0x3fbd57 = "││◦➛";
      _0x259d38 = "│╰────────────┈⊷\n╰─────────────┈⊷";
    } else if (_0x23de54 == 2 || menu.trim().startsWith("2") || menu.toLowerCase().includes("v2")) {
      _0x3772d4 = "╭═══ *" + botname + "*  ═══⊷\n┃❃╭──────────────";
      _0x498fcc = "┃❃ │";
      _0x10c74b = "┃❃╰───────────────\n╰═════════════════⊷";
      _0x18960b = "╭─❏";
      _0x3e0d2f = "❏";
      _0x3fbd57 = "┃❃│";
      _0x259d38 = "┃❃╰───────────────\n╰═════════════════⊷";
    } else {
      _0x3772d4 = "╭═══〘  " + botname + "  〙═══⊷❍\n┃✰╭──────────────";
      _0x498fcc = "┃✰│";
      _0x10c74b = "┃✰╰───────────────\n╰═════════════════⊷";
      _0x18960b = "╭════〘";
      _0x3e0d2f = "〙════⊷❍";
      _0x3fbd57 = "┃✰│";
      _0x259d38 = "┃✰╰─────────────────❍\n╰══════════════════⊷❍";
    }
    const _0x2b167b = {};
    _0x35e374.map(async (_0x1ed88e, _0x8039f3) => {
      if (_0x1ed88e.dontAddCommandList === false && _0x1ed88e.pattern !== undefined) {
        if (!_0x2b167b[_0x1ed88e.category]) {
          _0x2b167b[_0x1ed88e.category] = [];
        }
        _0x2b167b[_0x1ed88e.category].push(_0x1ed88e.pattern);
      }
    });
    let _0x41772e = [1, 22, 23, 1, 36, 35, 48, 1, 42, 55, 56];
    let _0x288376 = parseInt(menu_fancy || "") || _0x41772e[Math.floor(Math.random() * _0x41772e.length)];
    const _0x21ab06 = _0x34854f.time;
    const _0x322bdd = _0x34854f.date;
    let _0xb3a26 = _0x3772d4 + "\n" + _0x498fcc + " 𝙐𝙨𝙚𝙧:- " + ownername + "\n" + _0x498fcc + " 𝙈𝙤𝙙𝙚:- " + Config.WORKTYPE + "\n" + _0x498fcc + " 𝙋𝙡𝙖𝙩𝙛𝙤𝙧𝙢:- Linux\n" + _0x498fcc + " 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨:- " + _0x35e374.length + "\n" + _0x498fcc + " 𝙍𝙪𝙣𝙩𝙞𝙢𝙚:- " + runtime(process.uptime()) + "\n" + _0x498fcc + " 𝙈𝙚𝙢𝙤𝙧𝙮:- " + formatp(os.totalmem() - os.freemem()) + "\n" + _0x498fcc + " 𝙏𝙞𝙢𝙚:- " + _0x21ab06 + "\n" + _0x498fcc + " 𝘿𝙖𝙩𝙚:- " + _0x322bdd + "\n" + _0x498fcc + " 𝙑𝙚𝙧𝙨𝙞𝙤𝙣:- " + Config.VERSION + "\n" + _0x10c74b + "\nαѕтα м∂ ραт¢н 3.0.0\n " +readmore+"\n";
    for (const _0x5c07fb in _0x2b167b) {
      _0xb3a26 += _0x18960b + " *" + fancytext(_0x5c07fb, _0x288376) + "* " + _0x3e0d2f + "\n";
      if (_0xc0fd3a.toLowerCase() == _0x5c07fb.toLowerCase()) {
        _0xb3a26 = _0x18960b + " *" + fancytext(_0x5c07fb, _0x288376) + "* " + _0x3e0d2f + "\n";
        for (const _0x27958d of _0x2b167b[_0x5c07fb]) {
          _0xb3a26 += _0x3fbd57 + " " + fancytext(_0x27958d, _0x288376) + "\n";
        }
        _0xb3a26 += _0x259d38 + "\n";
        break;
      } else {
        for (const _0x34d05f of _0x2b167b[_0x5c07fb]) {
          _0xb3a26 += _0x3fbd57 + " " + fancytext(_0x34d05f, _0x288376) + "\n";
        }
        _0xb3a26 += _0x259d38 + "\n";
      }
    }
    _0xb3a26 += caption;
    let _0x434de1 = {
      caption: _0xb3a26
    };
    if (/1|buttons|btn/gi.test(BUTTONS) && _0x34854f.device !== "web") {
      await sendButtons(_0x34854f, {
        caption: _0xb3a26,
        buttons: "\n            #button:cta_url | display_text : Fork & Star Asta Md| id:" + github + " /# \n            #button:cta_url | display_text : Channel | id:" + channel_lin + " /#            \n            "
      });
    } else {
      await _0x34854f.sendUi(_0x34854f.chat, _0x434de1, _0x34854f);
    }
  } catch (_0x433626) {
    await _0x34854f.error(_0x433626 + "\nCommand:menu", _0x433626);
  }
});
let channel_lin = "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z"
smd(
  {
    pattern: "alive2",
    desc: "Shows system status with different designs.",
    category: "general",
    filename: __filename,
    use: "alive",
  },
  async (message, input) => {
    try {
      const start = new Date().getTime();
      const designs = [
        async () => {
          const imageBuffer = await axios.get(
            "https://i.imgur.com/z20pSwu.jpeg",
            {
              responseType: "arraybuffer",
            }
          );

          const quoteResponse = await axios.get(
            "https://api.maher-zubair.tech/misc/quote"
          );
          const quote = quoteResponse.data;
          if (!quote || quote.status !== 200) {
            return await message.reply("*Failed to fetch a quote.*");
          }

          const quoteText = `\n\n*"${quote.result.body}"*\n_- ${quote.result.author}_`;
          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          const captionText = `ᴀsᴛᴀ ᴍᴅ 𝟸.𝟶.𝟶 ᴘᴀᴛᴄʜ\n\n*Ping:* ${pingSeconds} seconds${quoteText}\n\nᴀsᴛᴀ ᴍᴅ`;

          return { image: imageBuffer.data, caption: captionText };
        },
        async () => {
          const imageBuffer = await axios.get(
            "https://i.imgur.com/lIo3cM2.jpeg",
            {
              responseType: "arraybuffer",
            }
          );

          const factResponse = await axios.get(
            "https://api.maher-zubair.tech/misc/fact"
          );
          const fact = factResponse.data;
          if (!fact || fact.status !== 200) {
            return await message.reply("*Failed to fetch a fact.*");
          }

          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          const captionText = `ᴀsᴛᴀ ᴍᴅ 𝟸.𝟶.𝟶 ᴘᴀᴛᴄʜ\n\n*Ping:* ${pingSeconds} seconds\n\n*Fact:*\n${fact.result.fact}\n\nᴀsᴛᴀ ᴍᴅ`;

          return { image: imageBuffer.data, caption: captionText };
        },
        async () => {
          const imageBuffer = await axios.get(
            "https://i.imgur.com/OQOH4Gn.jpeg",
            {
              responseType: "arraybuffer",
            }
          );

          const lineResponse = await axios.get(
            "https://api.maher-zubair.tech/misc/lines"
          );
          const line = lineResponse.data;
          if (!line || line.status !== 200) {
            return await message.reply("*Failed to fetch a line.*");
          }

          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          const captionText = `ᴀsᴛᴀ ᴍᴅ 𝟸.𝟶.𝟶 ᴘᴀᴛᴄʜ\n\n*Ping:* ${pingSeconds} seconds\n\n*Line:*\n${line.result}\n\nᴀsᴛᴀ ᴍᴅ`;

          return { image: imageBuffer.data, caption: captionText };
        },
      ];

      const randomDesign = designs[Math.floor(Math.random() * designs.length)];
      const messageData = await randomDesign();

      const message_options = {
        quoted: message,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
        },
      };

      return await message.bot.sendUi(
        message.chat,
        messageData,
        message_options
      );
    } catch (error) {
      await message.error(
        error + "\n\nCommand: alive",
        error,
        "*Failed to show status.*"
      );
    }
  }
);
astro_patch.cmd({
  pattern: "list",
  desc: "list menu",
  category: "general",
  react: "🥀"
}, async _0x1d5ddc => {
  try {
    const {
      commands: _0x7cfe13
    } = require("../lib");
    let _0x95885d = "\n\t*ᴀsᴛᴀ ᴍᴅ ᴄᴏᴍᴍᴀɴᴅs ɪɴғᴏ*  \n";
    for (let _0x2bd72c = 0; _0x2bd72c < _0x7cfe13.length; _0x2bd72c++) {
      if (_0x7cfe13[_0x2bd72c].pattern == undefined) {
        continue;
      }
      _0x95885d += "*" + (_0x2bd72c + 1) + " " + fancytext(_0x7cfe13[_0x2bd72c].pattern, 1) + "*\n";
      _0x95885d += "  " + fancytext(_0x7cfe13[_0x2bd72c].desc, 1) + "\n";
    }
    return await _0x1d5ddc.sendUi(_0x1d5ddc.chat, {
      caption: _0x95885d + Config.caption
    });
  } catch (_0x3e730d) {
    await _0x1d5ddc.error(_0x3e730d + "\nCommand:list", _0x3e730d);
  }
});
astro_patch.smd({
  pattern: "owner",
  desc: "To check ping",
  category: "general",
  filename: __filename
}, async _0x365574 => {
  try {
    const _0x1574f7 = "BEGIN:VCARD\nVERSION:3.0\nFN:" + ownername + "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" + global.owner?.split(",")[0] + ":+" + global.owner?.split(",")[0] + "\nEND:VCARD";
    let _0x495739 = {
      contacts: {
        displayName: ownername,
        contacts: [{
          vcard: _0x1574f7
        }]
      },
      contextInfo: {
        externalAdReply: {
          title: ownername,
          body: "Touch here.",
          renderLargerThumbnail: true,
          thumbnailUrl: "",
          thumbnail: log0,
          mediaType: 1,
          mediaUrl: "",
          sourceUrl: "https://wa.me/+" + global.owner?.split(",")[0] + "?text=Hii+" + ownername
        }
      }
    };
    return await _0x365574.sendMessage(_0x365574.jid, _0x495739, {
      quoted: _0x365574
    });
  } catch (_0x14d9fd) {
    await _0x365574.error(_0x14d9fd + "\nCommand:owner", _0x14d9fd);
  }
});
astro_patch.cmd({
  pattern: "trt",
  alias: ["translate"],
  category: "general",
  filename: __filename,
  use: "< text >",
  desc: "Translate's given text in desird language."
}, async (_0x54a537, _0x60aaa1) => {
  try {
    let _0x2ea596 = _0x60aaa1 ? _0x60aaa1.split(" ")[0].toLowerCase() : "en";
    if (!_0x54a537.reply_text) {
      var _0xe7c6dc = _0x60aaa1.replace(_0x2ea596, "")?.trim() || false;
    } else {
      var _0xe7c6dc = _0x54a537.reply_text;
    }
    if (!_0xe7c6dc) {
      return await _0x54a537.reply("*Please Give Me Text. Example: _" + prefix + "trt en Who are you_*");
    }
    var _0x18ef5d = await translatte(_0xe7c6dc, {
      from: "auto",
      to: _0x2ea596
    });
    if ("text" in _0x18ef5d) {
      return await _0x54a537.reply(_0x18ef5d.text);
    }
  } catch (_0x4e56f8) {
    await _0x54a537.error(_0x4e56f8 + "\n\ncommand trt", _0x4e56f8);
  }
});
const readDirectory = _0x51dfc1 => {
  return new Promise((_0x33db7c, _0x5e5125) => {
    fs.readdir(_0x51dfc1, (_0x574886, _0x7ed14a) => {
      if (_0x574886) {
        _0x5e5125("Error reading directory");
      } else {
        _0x33db7c(_0x7ed14a);
      }
    });
  });
};
astro_patch.cmd({
  pattern: "file",
  desc: "to get extact name where that command is in repo.\nSo user can edit that.",
  category: "general",
  fromMe: true,
  filename: __filename
}, async (_0x3dfe64, _0xc12025) => {
  try {
    if (!_0xc12025) {
      return _0x3dfe64.reply("*Uhh PLease, Provide A Command/Directory*");
    }
    if (_0xc12025.startsWith(".")) {
      let _0x3e283f = "*------------- FILE MANAGER -------------*\n";
      try {
        const _0x4a6f2f = await readDirectory(_0xc12025);
        _0x4a6f2f.forEach(_0x21664f => {
          _0x3e283f += _0x21664f + "\n";
        });
        await _0x3dfe64.reply(_0x3e283f.toString());
      } catch (_0x5214e1) {
        _0x3dfe64.reply(_0x5214e1);
      }
      return;
    }
    const {
      commands: _0x3c2c2b
    } = require("../lib");
    let _0x5179c2 = [];
    let _0x4e5e9d = _0xc12025.split(" ")[0].toLowerCase().trim();
    let _0x1de8db = events.commands.find(_0x32da0b => _0x32da0b.pattern === _0x4e5e9d) || events.commands.find(_0x44f1c5 => _0x44f1c5.alias && _0x44f1c5.alias.includes(_0x4e5e9d));
    if (!_0x1de8db) {
      return await _0x3dfe64.reply("*❌No Such commands.*");
    }
    _0x5179c2.push("*🍁Command:* " + _0x1de8db.pattern);
    if (_0x1de8db.category) {
      _0x5179c2.push("*🧩Type:* " + _0x1de8db.category);
    }
    if (_0x1de8db.alias && _0x1de8db.alias[0]) {
      _0x5179c2.push("*🧩Alias:* " + _0x1de8db.alias.join(", "));
    }
    if (_0x1de8db.desc) {
      _0x5179c2.push("*✨Description:* " + _0x1de8db.desc);
    }
    if (_0x1de8db.use) {
      _0x5179c2.push("*〽️Usa:*\n ```" + prefix + _0x1de8db.pattern + " " + _0x1de8db.use + "```");
    }
    if (_0x1de8db.usage) {
      _0x5179c2.push("*〽️Usage:*\n ```" + _0x1de8db.usage + "```");
    }
    if (_0x1de8db.filename) {
      _0x5179c2.push("*✨FileName:* " + _0x1de8db.filename);
    }
    try {
      if (_0xc12025.includes("function") && _0x1de8db.function && _0x3dfe64.isSuhail && _0x1de8db.pattern !== "file") {
        _0x5179c2.push("*🧩Function:* " + _0x1de8db.function.toString());
      }
    } catch {}
    await _0x3dfe64.reply(_0x5179c2.join("\n"));
  } catch (_0x5d7a6d) {
    await _0x3dfe64.error(_0x5d7a6d + "\nCommand:file", _0x5d7a6d);
  }
});
astro_patch.cmd({
  pattern: "eval",
  alias: ["$"],
  category: "owner",
  filename: __filename,
  fromMe: true,
  desc: "Runs js code on node server.",
  use: "< run code >",
  dontAddCommandList: true
}, async (_0x4da0b8, _0x11faa9, {
  isCreator: _0x41d179,
  cmdName: _0x22b0c7,
  Void: _0x149fe4
}) => {
  try {
    if (!_0x11faa9) {
      return _0x4da0b8.reply("*Provide A Query To Run Master*");
    }
    let _0x32752e = eval("const a = async()=>{\n" + _0x11faa9 + "\n}\na()");
    if (typeof _0x32752e === "object") {
      await _0x4da0b8.reply(JSON.stringify(_0x32752e));
    } else {
      await _0x4da0b8.reply(_0x32752e.toString());
    }
  } catch (_0x5d5ce4) {
    return await _0x4da0b8.reply(_0x5d5ce4.toString());
  }
});
astro_patch.cmd({
  pattern: "shell",
  category: "owner",
  filename: __filename,
  fromMe: true,
  desc: "Runs command in Heroku(server) shell.",
  use: "<shell cmds | ls,cd >",
  dontAddCommandList: true
}, async (_0x42c675, _0x3ca7cf) => {
  try {
    if (!_0x42c675.isCreator) {
      return _0x42c675.reply(tlang().owner);
    }
    if (!_0x3ca7cf) {
      return _0x42c675.reply("*Uhh PLease, Provide A Command to Run Heroku*");
    }
    exec(_0x3ca7cf, (_0x1c37c4, _0x268f94) => {
      if (_0x1c37c4) {
        return _0x42c675.reply("----" + tlang().title + "----\n\n" + _0x1c37c4);
      }
      if (_0x268f94) {
        return _0x42c675.reply("----" + tlang().title + "----\n\n" + _0x268f94);
      }
    });
  } catch (_0x17a5af) {
    await _0x42c675.error(_0x17a5af + "\n\ncommand shell", _0x17a5af);
  }
});
smd(
  {
    pattern: "channel",
    desc: "To check ping",
    react: "🗨️",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    const channelMessage = `𝘼𝙎𝙏𝘼 𝙈𝘿 𝘾𝙃𝘼𝙉𝙉𝙀𝙇 𝙎𝙐𝙋𝙋𝙊𝙍𝙏\n\n _ʜᴇʏ ʜᴇʀᴇ's ᴏᴜʀ ᴄʜᴀɴɴᴇʟ ʟɪɴᴋ, ᴘʟᴇᴀsᴇ ғᴏʟʟᴏᴡ ᴀɴᴅ sᴜᴘᴘᴏʀᴛ ᴜs ᴛᴏ ᴋᴇᴇᴘ ᴛʜɪs ᴘʀᴏᴊᴇᴄᴛ ᴀʟɪᴠᴇ_\n *ʟɪɴᴋ:* https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z\n\n ${Config.botname} *WORKS*`;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
    };

    await message.send(channelMessage, { contextInfo });
  }
);
smd(
  {
    pattern: "support",
    desc: "To check ping",
    react: "🗨️",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    const SupportMsg = `𝘼𝙎𝙏𝘼 𝙈𝘿 𝙎𝙐𝙋𝙋𝙊𝙍𝙏 𝙂𝙧𝙤𝙪𝙥\n\n *ʟɪɴᴋ:* https://chat.whatsapp.com/GzKCborGlGN41XSHtslLri\n\n ${Config.botname} *WORKS*`;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
    };

    await message.send(SupportMsg, { contextInfo });
  }
);