  const os = require('os')
  let menus = false
  const moment = require("moment-timezone")
  const fs = require("fs")
const Config = require('../config')
  let { fancytext, tlang, tiny,bot_,alive, runtime, formatp, smsg , send , react ,botpic,sleep, getBuffer ,prefix, sck1,smd,sck ,getTime ,formatDate  , groupdb,smdJson,smdBuffer  } = require("../lib");
  const long = String.fromCharCode(8206)
  const readmore = long.repeat(4001)
  const sᴜʜᴀɪʟ_ᴍᴅ = require('../lib/plugins')
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const axios = require('axios')
const fetch = require("node-fetch");
const util = require("util");
const events = sᴜʜᴀɪʟ_ᴍᴅ;
 const { commands } = require('../lib');
const { exec } = require("child_process")
const translatte = require("translatte");

 const path = require('path');
 smd({
   cmdname: "help",
   alias: ["categories", "ctgry", "category"],
   desc: "category list",
   category: "general"
 }, async (_0x252764, _0x540737) => {
   try {
     if (_0x540737.split(" ")[0]) {
       let _0x41ff50 = [];
       const _0x158f91 = commands.find(_0x40c65c => _0x40c65c.pattern === _0x540737.split(" ")[0].toLowerCase());
       if (_0x158f91) {
         _0x41ff50.push("*🍁Command:* " + _0x158f91.pattern);
         if (_0x158f91.category) {
           _0x41ff50.push("*🧩Category:* " + _0x158f91.category);
         }
         if (_0x158f91.alias) {
           _0x41ff50.push("*🧩Alias:* " + _0x158f91.alias);
         }
         if (_0x158f91.desc) {
           _0x41ff50.push("*🧩Description:* " + _0x158f91.desc);
         }
         if (_0x158f91.use) {
           _0x41ff50.push("*〽️Usage:*\n ```" + prefix + _0x158f91.pattern + " " + _0x158f91.use + "```");
         }
         await _0x252764.reply(_0x41ff50.join("\n"));
       }
     }
     const _0x112594 = {};
     commands.map(async (_0x42347b, _0x5482f4) => {
       if (_0x42347b.dontAddCommandList === false && _0x42347b.pattern !== undefined) {
         if (!_0x112594[_0x42347b.category]) {
           _0x112594[_0x42347b.category] = [];
         }
         _0x112594[_0x42347b.category].push(_0x42347b.pattern);
       }
     });
     let _0x4cba81 = Math.round(Math.random());
     let _0xe766ea = _0x4cba81 === 0 ? "MENU" : "COMMANDS";
     let _0x557ea9 = "┏━━━━━━━━━━━━━━━━━━━━━━━━\n┃\t *SUHAIL-MD_" + _0xe766ea + "_LIST* \n┗━━━━━━━━━━━━━━━━━━━━━━━━\n\n\t```Reply the number you wants to select```\n\n";
     let _0x5ac59d = 1;
     let _0x5140dd = 0;
     for (const _0x5269f7 in _0x112594) {
       _0x5140dd += 1;
       if (_0x540737.toLowerCase() == _0x5269f7.toLowerCase()) {
         _0x557ea9 = "┏━━⟪ *" + _0x5269f7.toUpperCase() + "* ⟫━━⦿\n\n";
         for (const _0x2b0bf6 of _0x112594[_0x5269f7]) {
           _0x557ea9 += "┃ ✗ " + fancytext(_0x2b0bf6, 1) + "\n";
         }
         _0x557ea9 += "\n┗━━━━━━━━━━━━━━⦿";
         break;
       }
       if (_0x5140dd >= 10) {
         _0x5ac59d += 1;
         _0x5140dd = 0;
       }
       _0x557ea9 += "\n*" + _0x5ac59d + "." + _0x5140dd + " |" + _0x5269f7.toUpperCase() + " " + _0xe766ea + "*\n";
     }
     ;
     _0x557ea9 += "\n\n" + Config.caption;
     return await _0x252764.sendUi(_0x252764.jid, {
       caption: _0x557ea9
     });
   } catch (_0x44b233) {
     await _0x252764.error(_0x44b233 + "\nCommand:help", _0x44b233);
   }
 });
 smd({
   pattern: "menus",
   type: "MENU list",
   info: "general",
   dontAddCommandList: true
 }, async _0x50ff50 => {
   try {
     let _0x3e1959 = ("\n*🦄 ᴜᴘ ᴛɪᴍᴇ :* " + runtime(process.uptime()) + "\n*🍁 ᴛᴏᴅᴀʏ ɪs :* " + _0x50ff50.date + "\n*🎗 ɴᴏᴡ ᴛɪᴍᴇ :* " + _0x50ff50.time + "\n\n➮Fᴏᴜɴᴅᴇʀ- SuhailTechInfo𝛁\n➮Oᴡɴᴇʀ - " + Config.ownername + "\n➮Nᴜᴍ - " + owner.split(",")[0] + "\n➮Mᴇᴍᴏ - " + formatp(os.totalmem() - os.freemem()) + "/" + formatp(os.totalmem()) + "\n\n *🧑‍💻 :*  Sᴜʜᴀɪʟ-Mᴜʟᴛɪᴅᴇᴠɪᴄᴇ ɪꜱ ɴᴏᴡ Aᴠᴀɪʟᴀʙʟᴇ\n\n" + readmore + "\n╭──❰ *ALL MENU* ❱\n│🏮 Lɪꜱᴛ\n│🏮 Cᴀᴛᴇɢᴏʀʏ\n│🏮 Hᴇʟᴘ\n│🏮 Aʟɪᴠᴇ\n│🏮 Uᴘᴛɪᴍᴇ\n│🏮 Wᴇᴀᴛʜᴇʀ\n│🏮 Lɪɴᴋ\n│🏮 Cᴘᴜ\n│🏮 Rᴇᴘᴏꜱɪᴛᴏʀʏ\n╰─────────────⦁").trim();
     return await _0x50ff50.bot.sendUi(_0x50ff50.from, {
       caption: _0x3e1959
     });
   } catch (_0x2ac535) {
     await _0x50ff50.error(_0x2ac535 + "\nCommand:menus", _0x2ac535);
   }
 });
 sᴜʜᴀɪʟ_ᴍᴅ.cmd({
   pattern: "setcmd",
   desc: "To check ping",
   category: "general",
   fromMe: true,
   filename: __filename
 }, async (_0xbe855c, {
   text: _0x1518e7,
   isCreator: _0x1aa4d2,
   Void: _0x3ab1bc
 }) => {
   try {
     if (!_0x1aa4d2) {
       return await _0xbe855c.reply(tlang().owner);
     }
     if (!_0x1518e7) {
       return await _0xbe855c.send("*_Please provide cmd name by replying a Sticker_*");
     }
     let _0x347537 = _0x1518e7.split(",");
     var _0x28da13;
     var _0xd704b8;
     let _0x115b90 = false;
     if (_0xbe855c.quoted) {
       let _0x30a65e = _0xbe855c.quoted.mtype;
       if (_0x30a65e == "stickerMessage" && _0x1518e7) {
         _0x115b90 = true;
         _0x28da13 = _0x1518e7.split(" ")[0];
         _0xd704b8 = "sticker-" + _0xbe855c.quoted.fileSha256;
       }
     }
     if (!_0x115b90 && _0x347537.length > 1) {
       _0xd704b8 = _0x347537[0].trim().toLowerCase();
       _0x28da13 = _0x347537[1].trim().toLowerCase();
     } else if (!_0x115b90) {
       return await _0xbe855c.send("*_Uhh Dear, Give Cmd With New Name_*\n*Eg: _.setcmd New_Name, Cmd_Name_*");
     }
     if (_0xd704b8.length < 1) {
       return await _0xbe855c.reply("*_Uhh Please, Provide New_Cmd Name First_*");
     }
     if (global.setCmdAlias[_0xd704b8]) {
       return await _0xbe855c.send("*_\"" + (_0x115b90 ? "Given Sticker" : _0xd704b8) + "\" Already set for \"" + global.setCmdAlias[_0xd704b8] + "\" Cmd, Please try another " + (_0x115b90 ? "Sticker" : "Name") + "_*");
     }
     const _0xd7d2ff = sᴜʜᴀɪʟ_ᴍᴅ.commands.find(_0x5ebbb9 => _0x5ebbb9.pattern === _0x28da13) || sᴜʜᴀɪʟ_ᴍᴅ.commands.find(_0x1ad3dd => _0x1ad3dd.alias && _0x1ad3dd.alias.includes(_0x28da13));
     if (_0xd7d2ff) {
       global.setCmdAlias[_0xd704b8] = _0xd7d2ff.pattern;
       return await _0xbe855c.send("*_Cmd \"" + global.setCmdAlias[_0xd704b8] + "\" Succesfully set to \"" + (_0x115b90 ? "Sticker" : _0xd704b8) + "\"._*\n*_These all names are reset, If bot restart_*");
     } else {
       return await _0xbe855c.send("*_Provided Cmd( " + _0x28da13 + ") not found in bot cmds. Please Provide Valid cmd Name_*");
     }
   } catch (_0x5aab12) {
     await _0xbe855c.error(_0x5aab12 + "\nCommand:setcmd", _0x5aab12);
   }
 });
 sᴜʜᴀɪʟ_ᴍᴅ.cmd({
   pattern: "delcmd",
   desc: "To check ping",
   category: "general",
   fromMe: true,
   filename: __filename
 }, async (_0x43389c, {
   text: _0x2cd110,
   isCreator: _0x4f96d1,
   Void: _0xe705b3
 }) => {
   try {
     if (!_0x4f96d1) {
       return await _0x43389c.reply(tlang().owner);
     }
     let _0x31d54d = _0x2cd110 ? _0x2cd110.split(" ").trim().toLowerCase() : "";
     let _0x58cb89 = false;
     if (_0x43389c.quoted) {
       if (_0x43389c.quoted.mtype == "stickerMessage") {
         _0x58cb89 = true;
         _0x31d54d = "sticker-" + _0x43389c.quoted.fileSha256;
       } else if (!_0x2cd110) {
         return await _0x43389c.send("*_Please reply to a Sticker that set for a Cmd_*");
       }
     } else if (!_0x2cd110) {
       return await _0x43389c.send("*_Uhh Dear, provide Name that set to a cmd_*\n*Eg: _.delcmd Cmd_Name_*");
     }
     if (global.setCmdAlias[_0x31d54d]) {
       await _0x43389c.send("*_\"" + (_0x58cb89 ? "Given Sticker" : _0x31d54d) + "\" deleted Succesfully at \"" + global.setCmdAlias[_0x31d54d] + "\" cmd_*");
       delete global.setCmdAlias[_0x31d54d];
       return;
     } else {
       return await _0x43389c.send("*_\"" + (_0x58cb89 ? "Given Sticker" : _0x31d54d) + "\" not Set for any cmd._*\n *_Please Provide Valid " + (_0x58cb89 ? "Sticker" : "cmd Name") + " to delete_*");
     }
   } catch (_0x2efb7a) {
     await _0x43389c.error(_0x2efb7a + "\nCommand:delcmd", _0x2efb7a);
   }
 });
 sᴜʜᴀɪʟ_ᴍᴅ.smd({
   pattern: "ping",
   desc: "To check ping",
   category: "general",
   filename: __filename
 }, async _0x1f3f82 => {
   var _0x295ff9 = new Date().getTime();
   const {
     key: _0x500470
   } = await _0x1f3f82.reply("*Testing Ping!!!*");
   var _0x21aeaa = new Date().getTime();
   return await _0x1f3f82.send("*Pong*\n *" + (_0x21aeaa - _0x295ff9) + " ms* ", {
     edit: _0x500470
   }, "", _0x1f3f82);
 });
 sᴜʜᴀɪʟ_ᴍᴅ.cmd({
   pattern: "uptime",
   alias: ["runtime"],
   desc: "Tells runtime/uptime of bot.",
   category: "misc",
   filename: __filename
 }, async _0x107d30 => {
   try {
     _0x107d30.reply("*_Uptime of " + tlang().title + ": " + runtime(process.uptime()) + "_*");
   } catch (_0x509658) {
     await _0x107d30.error(_0x509658 + "\n\ncommand : uptime", _0x509658, false);
   }
 });
 sᴜʜᴀɪʟ_ᴍᴅ.cmd({
   cmdname: "menu",
   desc: "Help list",
   type: "general",
   filename: __filename
 }, async (_0x469131, _0x16e0de) => {
   try {
     const {
       commands: _0xdace9f
     } = require("../lib");
     if (_0x16e0de.split(" ")[0]) {
       let _0x482cfc = [];
       const _0x3e66e9 = _0xdace9f.find(_0x2114b2 => _0x2114b2.pattern === _0x16e0de.split(" ")[0].toLowerCase());
       if (_0x3e66e9) {
         _0x482cfc.push("*🍁Command:* " + _0x3e66e9.pattern);
         if (_0x3e66e9.category) {
           _0x482cfc.push("*🧩Category:* " + _0x3e66e9.category);
         }
         if (_0x3e66e9.alias) {
           _0x482cfc.push("*🧩Alias:* " + _0x3e66e9.alias);
         }
         if (_0x3e66e9.desc) {
           _0x482cfc.push("*🧩Description:* " + _0x3e66e9.desc);
         }
         if (_0x3e66e9.use) {
           _0x482cfc.push("*〽️Usage:*\n ```" + prefix + _0x3e66e9.pattern + " " + _0x3e66e9.use + "```");
         }
         await _0x469131.reply(_0x482cfc.join("\n"));
       }
     }
     var _0x13a858;
     var _0x1fe006;
     var _0x20f9ea;
     var _0x3c4c7d;
     var _0x55e662;
     var _0xc05091;
     var _0x8d25f8;
     let _0x2b6a66 = 0;
     if (Config.menu === "") {
       _0x2b6a66 = Math.floor(Math.random() * 3) + 1;
     }
     if (_0x2b6a66 == 1 || Config.menu.trim().startsWith("1") || Config.menu.toLowerCase().includes("aztec")) {
       _0x13a858 = "┏━━⟪ *" + Config.botname + "* ⟫━━⦿";
       _0x1fe006 = "┃ ✗";
       _0x20f9ea = "┗━━━━━━━━━━━━━━━⦿";
       _0x3c4c7d = "┌──『";
       _0x55e662 = "』──❖\n";
       _0xc05091 = " | ";
       _0x8d25f8 = "\n└──────────────◉";
     } else if (_0x2b6a66 == 2 || Config.menu.trim().startsWith("2") || Config.menu.toLowerCase().includes("a17")) {
       _0x13a858 = "┌───═[ *" + Config.botname + "* ]═──▸\n│╭────────────···▸\n┴│▸";
       _0x1fe006 = "⬡│▸";
       _0x20f9ea = "┬│▸\n│╰─────────────···▸\n└───────────────···▸";
       _0x3c4c7d = "┌───〈";
       _0x55e662 = "〉───◆\n│╭─────────────···▸\n┴│▸";
       _0xc05091 = "⬡│▸ ";
       _0x8d25f8 = "┬│▸\n│╰────────────···▸▸\n└───────────────···▸";
     } else {
       _0x13a858 = "╭────《  " + Config.botname + "  》────⊷\n│ ╭──────✧❁✧──────◆";
       _0x1fe006 = "│ │";
       _0x20f9ea = "│ ╰──────✧❁✧──────◆\n╰══════════════════⊷";
       _0x3c4c7d = "╭────❏";
       _0x55e662 = "❏";
       _0xc05091 = "│";
       _0x8d25f8 = "╰━━━━━━━━━━━━━━──⊷";
     }
     const _0x3c45dc = {};
     _0xdace9f.map(async (_0x459b3a, _0x35481e) => {
       if (_0x459b3a.dontAddCommandList === false && _0x459b3a.pattern !== undefined) {
         if (!_0x3c45dc[_0x459b3a.category]) {
           _0x3c45dc[_0x459b3a.category] = [];
         }
         _0x3c45dc[_0x459b3a.category].push(_0x459b3a.pattern);
       }
     });
     const _0x23750c = _0x469131.time;
     const _0x3374ed = _0x469131.date;
     let _0x1dc593 = _0x13a858 + "\n" + _0x1fe006 + " Theme:- " + tlang().title + "\n" + _0x1fe006 + " Owner:- " + Config.ownername + "\n" + _0x1fe006 + " Plugins:- " + _0xdace9f.length + "\n" + _0x1fe006 + " Uptime:- " + runtime(process.uptime()) + "\n" + _0x1fe006 + " Mem:- " + formatp(os.totalmem() - os.freemem()) + "/" + formatp(os.totalmem()) + "\n" + _0x1fe006 + " Time:- " + _0x23750c + "\n" + _0x1fe006 + " Date:- " + _0x3374ed + "\n" + _0x20f9ea + "\n\n";
     for (const _0x36d9a7 in _0x3c45dc) {
       _0x1dc593 += _0x3c4c7d + " *" + tiny(_0x36d9a7) + "* " + _0x55e662 + "\n";
       if (_0x16e0de.toLowerCase() == _0x36d9a7.toLowerCase()) {
         _0x1dc593 = _0x3c4c7d + " *" + tiny(_0x36d9a7) + "* " + _0x55e662 + "\n";
         for (const _0x22eb71 of _0x3c45dc[_0x36d9a7]) {
           _0x1dc593 += _0xc05091 + " " + fancytext(_0x22eb71, 1) + "\n";
         }
         _0x1dc593 += _0x8d25f8 + "\n";
         break;
       } else {
         for (const _0x20a983 of _0x3c45dc[_0x36d9a7]) {
           _0x1dc593 += _0xc05091 + " " + fancytext(_0x20a983, 1) + "\n";
         }
         _0x1dc593 += _0x8d25f8 + "\n";
       }
     }
     _0x1dc593 += Config.caption;
     let _0x21ea05 = {
       caption: _0x1dc593
     };
     return await _0x469131.sendUi(_0x469131.chat, _0x21ea05, _0x469131);
   } catch (_0x5d62ab) {
     await _0x469131.error(_0x5d62ab + "\nCommand:menu", _0x5d62ab);
   }
 });
 sᴜʜᴀɪʟ_ᴍᴅ.cmd({
   pattern: "list",
   desc: "list menu",
   category: "general",
   react: "🥀"
 }, async _0x185cb4 => {
   try {
     const {
       commands: _0x40805c
     } = require("../lib");
     let _0x1c42aa = "\n  ╭━━〘 *" + Config.botname + "* 〙────⊷     \n  ┃ ✭ Theme: " + tlang().title + "\n  ┃ ✭ Prefix: " + prefix + "\n  ┃ ✭ Owner: " + Config.ownername + "\n  ┃ ✭ Commands: " + _0x40805c.length + "\n  ┃ ✭ Uptime: " + runtime(process.uptime()) + "\n  ┃ ✭ Mem: " + formatp(os.totalmem() - os.freemem()) + "/" + formatp(os.totalmem()) + "\n  ╰━━━━━━━━━━━━━━⊷\n";
     for (let _0x589def = 0; _0x589def < _0x40805c.length; _0x589def++) {
       if (_0x40805c[_0x589def].pattern == undefined) {
         continue;
       }
       _0x1c42aa += "*" + (_0x589def + 1) + " " + fancytext(_0x40805c[_0x589def].pattern, 1) + "*\n";
       _0x1c42aa += "  " + fancytext(_0x40805c[_0x589def].desc, 1) + "\n";
     }
     return await _0x185cb4.sendUi(_0x185cb4.chat, {
       caption: _0x1c42aa + Config.caption
     });
   } catch (_0x55f02d) {
     await _0x185cb4.error(_0x55f02d + "\nCommand:list", _0x55f02d);
   }
 });
 sᴜʜᴀɪʟ_ᴍᴅ.smd({
   pattern: "owner",
   desc: "To check ping",
   category: "general",
   filename: __filename
 }, async _0x4cb52d => {
   try {
     const _0x54039c = "BEGIN:VCARD\nVERSION:3.0\nFN:" + Config.ownername + "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" + global.owner?.split(",")[0] + ":+" + global.owner?.split(",")[0] + "\nEND:VCARD";
     let _0x27a8ef = {
       contacts: {
         displayName: Config.ownername,
         contacts: [{
           vcard: _0x54039c
         }]
       },
       contextInfo: {
         externalAdReply: {
           title: Config.ownername,
           body: "Touch here.",
           renderLargerThumbnail: true,
           thumbnailUrl: "",
           thumbnail: log0,
           mediaType: 1,
           mediaUrl: "",
           sourceUrl: "https://wa.me/+" + global.owner?.split(",")[0] + "?text=Hii+" + Config.ownername
         }
       }
     };
     return await _0x4cb52d.sendMessage(_0x4cb52d.jid, _0x27a8ef, {
       quoted: _0x4cb52d
     });
   } catch (_0x59bd14) {
     await _0x4cb52d.error(_0x59bd14 + "\nCommand:owner", _0x59bd14);
   }
 });
 sᴜʜᴀɪʟ_ᴍᴅ.cmd({
   pattern: "trt",
   alias: ["translate"],
   category: "general",
   filename: __filename,
   use: "< text >",
   desc: "Translate's given text in desird language."
 }, async (_0x49b034, _0x5a41f2) => {
   try {
     let _0x61bb87 = _0x5a41f2 ? _0x5a41f2.split(" ")[0].toLowerCase() : "en";
     if (!_0x49b034.reply_text) {
       var _0xa71ff7 = _0x5a41f2.replace(_0x61bb87, "")?.trim() || false;
     } else {
       var _0xa71ff7 = _0x49b034.reply_text;
     }
     if (!_0xa71ff7) {
       return await _0x49b034.reply("*Please Give Me Text. Example: _" + prefix + "trt en Who are you_*");
     }
     var _0x2af25c = await translatte(_0xa71ff7, {
       from: "auto",
       to: _0x61bb87
     });
     if ("text" in _0x2af25c) {
       return await _0x49b034.reply(_0x2af25c.text);
     }
   } catch (_0x57b7ba) {
     await _0x49b034.error(_0x57b7ba + "\n\ncommand trt", _0x57b7ba);
   }
 });
 const readDirectory = _0x236561 => {
   return new Promise((_0x50b9bc, _0x216caf) => {
     fs.readdir(_0x236561, (_0x4ae931, _0x2ee1bf) => {
       if (_0x4ae931) {
         _0x216caf("Error reading directory");
       } else {
         _0x50b9bc(_0x2ee1bf);
       }
     });
   });
 };
 sᴜʜᴀɪʟ_ᴍᴅ.cmd({
   pattern: "file",
   desc: "to get extact name where that command is in repo.\nSo user can edit that.",
   category: "general",
   fromMe: true,
   filename: __filename
 }, async (_0x5f25ee, _0x369b06, {
   isCreator: _0x20e089,
   Suhail: _0x810b8a
 }) => {
   try {
     if (!_0x369b06) {
       return _0x5f25ee.reply("*Uhh PLease, Provide A Command/Directory*");
     }
     if (_0x369b06.startsWith(".")) {
       let _0x307484 = "*------------- FILE MANAGER -------------*\n";
       try {
         const _0x9b4d7f = await readDirectory(_0x369b06);
         _0x9b4d7f.forEach(_0xf013fa => {
           _0x307484 += _0xf013fa + "\n";
         });
         await _0x5f25ee.reply(_0x307484.toString());
       } catch (_0x269b22) {
         _0x5f25ee.reply(_0x269b22);
       }
       return;
     }
     const {
       commands: _0x31ad30
     } = require("../lib");
     let _0x58d8b1 = [];
     let _0x39341f = _0x369b06.split(" ")[0].toLowerCase().trim();
     let _0x1ed388 = events.commands.find(_0x52094a => _0x52094a.pattern === _0x39341f) || events.commands.find(_0x3b01d9 => _0x3b01d9.alias && _0x3b01d9.alias.includes(_0x39341f));
     if (!_0x1ed388) {
       return await _0x5f25ee.reply("*❌No Such commands.*");
     } else {
       _0x58d8b1.push("*🍁Command:* " + _0x1ed388.pattern);
     }
     if (_0x1ed388.category) {
       _0x58d8b1.push("*🧩Type:* " + _0x1ed388.category);
     }
     if (_0x1ed388.filename) {
       _0x58d8b1.push("✨FileName: " + _0x1ed388.filename);
     }
     return await _0x5f25ee.reply(_0x58d8b1.join("\n"));
   } catch (_0x24f8d2) {
     await _0x5f25ee.error(_0x24f8d2 + "\nCommand:file", _0x24f8d2);
   }
 });
 sᴜʜᴀɪʟ_ᴍᴅ.cmd({
   pattern: "eval",
   alias: ["$"],
   category: "owner",
   filename: __filename,
   fromMe: true,
   desc: "Runs js code on node server.",
   use: "< run code >",
   dontAddCommandList: true
 }, async (_0x168e91, _0x16117b, {
   isCreator: _0x122cff,
   cmdName: _0x17c7d1,
   Void: _0x168854
 }) => {
   try {
     if (!_0x16117b) {
       return _0x168e91.reply("*Provide A Query To Run Master*");
     }
     let _0x2380f9 = eval("const a = async()=>{\n" + _0x16117b + "\n}\na()");
     if (typeof _0x2380f9 === "object") {
       await _0x168e91.reply(JSON.stringify(_0x2380f9));
     } else {
       await _0x168e91.reply(_0x2380f9.toString());
     }
   } catch (_0x471846) {
     return await _0x168e91.reply(_0x471846.toString());
   }
 });
 sᴜʜᴀɪʟ_ᴍᴅ.cmd({
   pattern: "shell",
   category: "owner",
   filename: __filename,
   fromMe: true,
   desc: "Runs command in Heroku(server) shell.",
   use: "<shell cmds | ls,cd >",
   dontAddCommandList: true
 }, async (_0x5eae94, _0x5ee07a) => {
   try {
     if (!_0x5eae94.isCreator) {
       return _0x5eae94.reply(tlang().owner);
     }
     if (!_0x5ee07a) {
       return _0x5eae94.reply("*Uhh PLease, Provide A Command to Run Heroku*");
     }
     exec(_0x5ee07a, (_0x4bbb60, _0x1797a8) => {
       if (_0x4bbb60) {
         return _0x5eae94.reply("----" + tlang().title + "----\n\n" + _0x4bbb60);
       }
       if (_0x1797a8) {
         return _0x5eae94.reply("----" + tlang().title + "----\n\n" + _0x1797a8);
       }
     });
   } catch (_0x3f9a77) {
     await _0x5eae94.error(_0x3f9a77 + "\n\ncommand shell", _0x3f9a77);
   }
 });
 /** */
 const _0xabbb7a = _0x4dd2;
 (function (_0x128541, _0x363cce) {
   const _0x5629a4 = _0x4dd2;
   const _0x11a39c = _0x128541();
   while (true) {
     try {
       const _0x134025 = -parseInt(_0x5629a4(450)) / 1 * (parseInt(_0x5629a4(486)) / 2) + parseInt(_0x5629a4(473)) / 3 * (-parseInt(_0x5629a4(456)) / 4) + -parseInt(_0x5629a4(466)) / 5 + -parseInt(_0x5629a4(464)) / 6 * (parseInt(_0x5629a4(479)) / 7) + parseInt(_0x5629a4(454)) / 8 + -parseInt(_0x5629a4(488)) / 9 + -parseInt(_0x5629a4(465)) / 10 * (-parseInt(_0x5629a4(475)) / 11);
       if (_0x134025 === _0x363cce) {
         break;
       } else {
         _0x11a39c.push(_0x11a39c.shift());
       }
     } catch (_0x1c0382) {
       _0x11a39c.push(_0x11a39c.shift());
     }
   }
 })(_0x8e04, 747209);
 const cron = require(_0xabbb7a(474));
 const tempDirectory = "./temp";
 const cronSchedule = _0xabbb7a(463);
 const clearTempDirectory = () => {
   fs.readdir(tempDirectory, (_0x1ea38c, _0x1ee6fb) => {
     const _0x4e2cef = _0x4dd2;
     if (_0x1ea38c) {
       return;
     }
     _0x1ee6fb[_0x4e2cef(477)](_0x4e8689 => {
       const _0x21a3ed = _0x4e2cef;
       const _0x5a582b = tempDirectory + "/" + _0x4e8689;
       fs[_0x21a3ed(448)](_0x5a582b, _0x3896fd => {
         if (_0x3896fd) {} else {}
       });
     });
   });
 };
 function _0x8e04() {
   const _0x5ca678 = ["3462jMJlfn", "40800tijGHq", "5408770LRxrfI", "length", "schedule", "desc", "toLowerCase", "toFixed", "find", "1908876ZTeGZg", "node-cron", "13079ZzFQeK", "```\n*🧩Info:* ```", "forEach", "startsWith", "13958UwuBLA", "info", "use", "trim", "sendUi", "help", "text", "23506zYmCCg", "COMMANDS*", "8189343aTDlLX", "split", "includes", "send", "../lib", "_COMMANDS*  \n┗━━━━━━━━━━━━━━━━━━━━━━━\n\n\n", "unlink", "chat", "42fOwKFm", "from", "category", "pattern", "6436144airisR", "```\n*〽️Help:* ```", "8IyOZSz", "reply_message", "endsWith", "```\n\n", "replace", "dontAddCommandList", "caption", "*/15 * * * *"];
   _0x8e04 = function () {
     return _0x5ca678;
   };
   return _0x8e04();
 }
 function _0x4dd2(_0x4d298b, _0x370028) {
   const _0x8e049c = _0x8e04();
   _0x4dd2 = function (_0x4dd25f, _0x5ca46c) {
     _0x4dd25f = _0x4dd25f - 448;
     let _0x23dac5 = _0x8e049c[_0x4dd25f];
     return _0x23dac5;
   };
   return _0x4dd2(_0x4d298b, _0x370028);
 }
 var cronStart = false;
 smd({
   on: "text"
 }, async (_0x1729b5, _0x1e1eb0, {
   mek: _0x197b56,
   body: _0x4979e2,
   args: _0xdf6f76,
   botNumber: _0x2d0ea1,
   isCreator: _0x472ae7,
   icmd: _0x1c7495,
   store: _0x39dfdc,
   budy: _0x3d9d66,
   Suhail: _0x466906,
   Void: _0x1c0958,
   proto: _0x2bdeb5
 }) => {
   const _0x5ede1c = _0xabbb7a;
   if (!cronStart) {
     cron[_0x5ede1c(468)](cronSchedule, () => {
       cronStart = true;
       clearTempDirectory();
     });
   }
   let _0x1f2598 = _0x1c0958;
   let _0x3ad9c5 = _0x1c0958;
   let _0x14411e = _0x1729b5;
   let _0x194ea5 = _0x1729b5;
   let _0x20b464 = _0x1729b5[_0x5ede1c(449)];
   try {
     if (!_0x14411e[_0x5ede1c(457)] || !_0x1e1eb0) {
       return;
     }
     const _0x268cd1 = _0x14411e[_0x5ede1c(457)][_0x5ede1c(485)].split("\n");
     let _0x45cf29 = parseInt(_0x1e1eb0[_0x5ede1c(489)](" ")[0]);
     if (!isNaN(_0x45cf29)) {
       if (_0x268cd1[_0x5ede1c(467)] > 30 && _0x268cd1[1][_0x5ede1c(490)]("SUHAIL-MD_FANCY_TEXT")) {
         var _0x424f96 = _0x268cd1[_0x5ede1c(472)](_0x5e6c2e => _0x5e6c2e.startsWith(_0x45cf29 + " "));
         try {
           if (_0x424f96) {
             await _0x14411e[_0x5ede1c(491)](_0x424f96[_0x5ede1c(460)]("" + _0x45cf29, "")[_0x5ede1c(482)](), {}, "", _0x14411e);
           } else {
             "";
           }
         } catch {}
       }
     }
     let _0x597ce3 = parseFloat(_0x1e1eb0[_0x5ede1c(489)](" ")[0]);
     if (isNaN(_0x597ce3)) {
       return;
     }
     let _0x172630 = _0x597ce3[_0x5ede1c(471)](1);
     var _0x56645a = _0x268cd1[_0x5ede1c(472)](_0x271b10 => _0x271b10[_0x5ede1c(478)]("*" + _0x172630 + " "));
     if (_0x56645a && (_0x56645a[_0x5ede1c(458)](_0x5ede1c(487)) || _0x56645a[_0x5ede1c(458)]("MENU*"))) {
       var _0x59e12c = _0x56645a[_0x5ede1c(460)]("*" + _0x172630, "").replace("|", "")[_0x5ede1c(460)](/COMMANDS\*/gi, "").replace(/MENU\*/gi, "")[_0x5ede1c(470)]();
       if (_0x59e12c[_0x5ede1c(467)] > 0 && _0x59e12c[_0x5ede1c(467)] < 20) {
         const {
           commands: _0xa7d981
         } = require(_0x5ede1c(492));
         const _0x12b0c1 = {};
         _0xa7d981.forEach(_0x298460 => {
           const _0xe09d85 = _0x5ede1c;
           if (!_0x298460[_0xe09d85(461)] && _0x298460[_0xe09d85(453)] !== undefined) {
             if (!_0x12b0c1[_0x298460[_0xe09d85(452)]]) {
               _0x12b0c1[_0x298460[_0xe09d85(452)]] = [];
             }
             _0x12b0c1[_0x298460[_0xe09d85(452)]].push({
               command: _0x298460.pattern,
               info: _0x298460[_0xe09d85(469)],
               help: prefix + _0x298460[_0xe09d85(453)] + " " + (_0x298460[_0xe09d85(481)] ? _0x298460[_0xe09d85(481)] : "")
             });
           }
         });
         let _0x18c1d1 = false;
         for (const _0x23e86d in _0x12b0c1) {
           let _0x207e17 = "" + _0x23e86d[_0x5ede1c(470)]();
           if (_0x59e12c.includes(_0x207e17)) {
             _0x18c1d1 = "┏━━━━━━━━━━━━━━━━━━━━━━━\n┃\t*SUHAIL-MD_" + _0x23e86d.toUpperCase() + _0x5ede1c(493);
             _0x12b0c1[_0x23e86d][_0x5ede1c(477)](_0x59ec5b => {
               const _0x495bad = _0x5ede1c;
               _0x18c1d1 += "*🍁Command:* ```" + _0x59ec5b.command + _0x495bad(476) + _0x59ec5b[_0x495bad(480)] + _0x495bad(455) + _0x59ec5b[_0x495bad(484)] + _0x495bad(459);
             });
             _0x18c1d1 += "\n\n" + Config[_0x5ede1c(462)];
             break;
           }
         }
         if (_0x18c1d1) {
           return await _0x194ea5[_0x5ede1c(483)](_0x194ea5[_0x5ede1c(451)], {
             caption: _0x18c1d1
           });
         }
       }
     }
   } catch {}
 }); /** RUN MY MASTER */
 smd({
   on: "text"
 }, async (msg, text, {
   mek,
   body,
   args,
   botNumber,
   isCreator,
   icmd,
   store,
   budy,
   Suhail,
   Void,
   proto
 }) => {
   let conn = Void;
   let sock = Void;
   let citel = msg;
   let message = msg;
   let jid = msg.chat;
   function _0x4519() {
     const _0x1545bc = ["reply", "Provide me with a query to run Master!", "436295MZVJvx", "1471580MJaRJC", "33399xJUSxK", "format", "6413gfLzAv", "includes", "HANDLERS", "36sEvwZv", "342HxeIbI", "994QnrpsY", "14172plavbA", "2120CKehHk", "const a = async()=>{\n", "react", "9342sNaTqr", "69723CMizRB", "text", "slice", "2947qReXDm"];
     _0x4519 = function () {
       return _0x1545bc;
     };
     return _0x4519();
   }
   const _0x29227a = _0x482c;
   function _0x482c(_0x43d491, _0x3ca5cc) {
     const _0x451983 = _0x4519();
     _0x482c = function (_0x482cda, _0x36b40d) {
       _0x482cda = _0x482cda - 238;
       let _0x35cf53 = _0x451983[_0x482cda];
       return _0x35cf53;
     };
     return _0x482c(_0x43d491, _0x3ca5cc);
   }
   (function (_0x2d57e5, _0x1ddabd) {
     const _0x5443ee = _0x482c;
     const _0x4beb9b = _0x2d57e5();
     while (true) {
       try {
         const _0x532303 = parseInt(_0x5443ee(245)) / 1 * (-parseInt(_0x5443ee(256)) / 2) + parseInt(_0x5443ee(242)) / 3 * (parseInt(_0x5443ee(255)) / 4) + -parseInt(_0x5443ee(248)) / 5 + parseInt(_0x5443ee(241)) / 6 * (-parseInt(_0x5443ee(257)) / 7) + parseInt(_0x5443ee(238)) / 8 * (parseInt(_0x5443ee(250)) / 9) + -parseInt(_0x5443ee(249)) / 10 + -parseInt(_0x5443ee(252)) / 11 * (-parseInt(_0x5443ee(258)) / 12);
         if (_0x532303 === _0x1ddabd) {
           break;
         } else {
           _0x4beb9b.push(_0x4beb9b.shift());
         }
       } catch (_0x1ba08e) {
         _0x4beb9b.push(_0x4beb9b.shift());
       }
     }
   })(_0x4519, 921659);
   if (isCreator) {
     if (!Config[_0x29227a(254)].includes(">") && citel[_0x29227a(243)].startsWith(">")) {
       let code = budy[_0x29227a(244)](1);
       if (!code) {
         return citel[_0x29227a(246)]("Provide me with a query to run Master!");
       }
       try {
         let resultTest = eval(code);
         return message[_0x29227a(246)](util[_0x29227a(251)](resultTest));
       } catch (_0x49d8a7) {
         return msg[_0x29227a(246)](util[_0x29227a(251)](_0x49d8a7));
       }
     } else if (!Config[_0x29227a(254)][_0x29227a(253)]("$") && citel[_0x29227a(243)].startsWith("$")) {
       let code = budy.slice(1);
       if (!code) {
         return citel[_0x29227a(246)](_0x29227a(247));
       }
       try {
         let resultTest = await eval(_0x29227a(239) + code + "\n}\na()");
         let h = util[_0x29227a(251)](resultTest);
         return await message[_0x29227a(240)]("🍁");
       } catch (_0x1cb3d5) {
         console.log("ERROR FROM RUNNING QUERY WITH MASTER $\n", _0x1cb3d5);
         return await citel[_0x29227a(246)](util[_0x29227a(251)](_0x1cb3d5));
       }
     }
   }
 });



