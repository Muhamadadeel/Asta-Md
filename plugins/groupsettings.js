const {
   groupdb,
   userdb,
   smd,
   jsonformat,
   sendWelcome,
   botpic,
   TelegraPh,
   RandomXP,
   Config,
   tlang,
   warndb,
   sleep,
   getAdmin,
   getBuffer,
   prefix
 } = require("../lib");
 const {
   Sticker,
   createSticker,
   StickerTypes
 } = require("wa-sticker-formatter");
 const moment = require("moment-timezone");
 const Levels = require("discord-xp");
 const fs = require("fs-extra");
 const Jimp = require("jimp");
 const axios = require("axios");
 const sᴜʜᴀɪʟ_ᴍᴅ = require("../lib/plugins");
 let warn = {};
 warn.addwarn = async (_0x516b7f, _0x2e094e, _0x420fd7 = {}) => {
   try {
     let _0x235c81 = (await userdb.findOne({
       id: _0x516b7f
     })) || (await userdb.new({
       id: _0x516b7f
     }));
     let _0x2be6f7 = _0x235c81.warn || {};
     if (!_0x2be6f7[_0x2e094e]) {
       _0x2be6f7[_0x2e094e] = [];
     }
     var _0x57d52c = {
       chat: "PRIVATE",
       reason: "Inapropriate Behaviour",
       date: new Date(),
       warnedby: tlang().title,
       ..._0x420fd7
     };
     _0x2be6f7[_0x2e094e].push(_0x57d52c);
     _0x235c81 = await userdb.updateOne({
       id: _0x516b7f
     }, {
       warn: _0x2be6f7
     });
     return {
       status: true,
       warning: _0x2be6f7[_0x2e094e].length,
       user: _0x235c81
     };
   } catch (_0x3ce952) {
     return {
       status: false,
       warning: 0,
       user: {},
       error: _0x3ce952
     };
   }
 };
 smd({
   pattern: "checkwarn",
   alias: ["listwarn", "chatwarn", "allwarn"],
   desc: "create paste of text.",
   category: "general",
   filename: __filename
 }, async (_0x436807, _0x508cc1) => {
   try {
     let _0x37302c = "";
     let _0x5c7ee1 = _0x436807.sender;
     if (_0x436807.isCreator) {
       _0x5c7ee1 = _0x436807.reply_message ? _0x436807.reply_message.sender : _0x436807.mentionedJid[0] ? _0x436807.mentionedJid[0] : _0x5c7ee1;
     }
     let _0x553b10 = (await userdb.findOne({
       id: _0x5c7ee1
     })) || (await userdb.new({
       id: _0x5c7ee1
     }));
     let _0x2d9c7a = _0x553b10.warn || false;
     let _0x225b57 = {};
     if (_0x2d9c7a && _0x508cc1 === "all") {
       _0x2d9c7a = _0x553b10.warn;
     } else if (_0x2d9c7a && _0x2d9c7a[_0x436807.chat]) {
       _0x225b57[_0x436807.chat] = [..._0x2d9c7a[_0x436807.chat]];
       _0x2d9c7a = _0x225b57;
     } else {
       _0x2d9c7a = false;
     }
     let _0x49ad07 = _0x508cc1 === "all" ? true : !_0x2d9c7a[_0x436807.chat];
     if (!_0x553b10 || !_0x2d9c7a || !_0x49ad07) {
       return await _0x436807.send("*_User didn't have any warning yet!!_*");
     }
     console.log("allwarn : ", _0x2d9c7a);
     for (const _0x39e5eb in _0x2d9c7a) {
       let _0x1fd616 = _0x2d9c7a[_0x39e5eb];
       _0x37302c += "\n╭─────────────◆\n│ *[ID] : " + (_0x39e5eb.includes("@") ? (await _0x436807.bot.getName(_0x39e5eb)) || _0x39e5eb : _0x39e5eb) + "*\n│ *[TOTAL WARNING] : " + _0x2d9c7a[_0x39e5eb].length + "*\n┝─────────────◆\n";
       for (let _0x5deaf3 = 0; _0x5deaf3 < _0x1fd616.length; _0x5deaf3++) {
         _0x37302c += "┝── *WARNING " + (_0x5deaf3 + 1) + "* ──\n│  *DATE:* " + _0x1fd616[_0x5deaf3].date + " " + (_0x1fd616[_0x5deaf3].reason ? "  \n│  *REASON:* " + _0x1fd616[_0x5deaf3].reason : "") + "\n│  *WARNED BY:* " + _0x1fd616[_0x5deaf3].warnedby + "\n│  *CHAT:* " + _0x1fd616[_0x5deaf3].chat + "\n";
       }
       _0x37302c += "╰─────────────◆\n";
     }
     return await _0x436807.reply(_0x37302c ? _0x37302c : "*_User didn't have any warning yet!!_*");
   } catch (_0x21af7f) {
     await _0x436807.error(_0x21af7f + "\n\nCommand: chatwarn", _0x21af7f);
   }
 });
 smd({
   pattern: "warn",
   fromMe: true,
   desc: "warn a user!",
   category: "general",
   filename: __filename,
   use: " < USER >"
 }, async (_0x1096d1, _0x1985f8) => {
   try {
     let _0xb23506 = _0x1096d1.reply_message ? _0x1096d1.reply_message.sender : _0x1096d1.mentionedJid[0] ? _0x1096d1.mentionedJid[0] : false;
     if (!_0xb23506) {
       return await _0x1096d1.send("*_Uhh please, reply to a user!!_*");
     }
     let _0xbfc893 = (await userdb.findOne({
       id: _0xb23506
     })) || (await userdb.new({
       id: _0xb23506
     }));
     let _0x5c01eb = _0xbfc893.warn || {};
     if (!_0x5c01eb[_0x1096d1.chat]) {
       _0x5c01eb[_0x1096d1.chat] = [];
     }
     var _0x562cbc = {
       chat: _0x1096d1.isGroup ? _0x1096d1.metadata?.subject || "GROUP" : "PRIVATE CHAT",
       reason: _0x1985f8,
       date: _0x1096d1.date,
       warnedby: _0x1096d1.senderName
     };
     _0x5c01eb[_0x1096d1.chat].push(_0x562cbc);
     await userdb.updateOne({
       id: _0xb23506
     }, {
       warn: _0x5c01eb
     });
     let _0x991452 = parseInt(Config.warncount) || 3;
     if (_0x5c01eb[_0x1096d1.chat].length > _0x991452 && !_0x1096d1.checkBot(_0xb23506)) {
       if (_0x1096d1.isGroup) {
         if (_0x1096d1.isBotAdmin) {
           await _0x1096d1.send("*_Hey @" + _0xb23506.split("@")[0] + ", Kicking you from group!_*\n*_Because Your warn limit exceed!_*", {
             mentions: [_0xb23506]
           });
           await _0x1096d1.bot.groupParticipantsUpdate(_0x1096d1.chat, [_0xb23506], "remove");
         } else {
           return await _0x1096d1.send("*_Hey @" + _0xb23506.split("@")[0] + " Dont Spam, Your warn limit exceed!_*");
         }
       } else {
         await _0x1096d1.send("*_Hey @" + _0xb23506.split("@")[0] + ", Blocking you!_*\n*_Because Your warn limit exceed!_*", {
           mentions: [_0xb23506]
         });
         await _0x1096d1.bot.updateBlockStatus(_0xb23506, "block");
       }
     } else {
       return await _0x1096d1.send("*_Hey @" + _0xb23506.split("@")[0] + " warning added, Don't spam!_*", {
         mentions: [_0xb23506]
       });
     }
   } catch (_0x4e05a8) {
     await _0x1096d1.error(_0x4e05a8 + "\n\nCommand: warn ", _0x4e05a8, false);
   }
 });
 smd({
   pattern: "resetwarn",
   desc: "create paste of text.",
   category: "general",
   filename: __filename,
   use: " user "
 }, async (_0x188ea8, _0x79409c) => {
   try {
     if (!_0x188ea8.isCreator && !_0x188ea8.isAdmin) {
       return await _0x188ea8.reply(tlang().admin);
     }
     let _0x4a1738 = _0x188ea8.reply_message ? _0x188ea8.reply_message.sender : _0x188ea8.mentionedJid[0] ? _0x188ea8.mentionedJid[0] : false;
     if (!_0x4a1738) {
       return await _0x188ea8.send("*_Uhh please, reply to a user!!_*");
     }
     let _0x37d3e5 = (await userdb.findOne({
       id: _0x4a1738
     })) || (await userdb.new({
       id: _0x4a1738
     })) || {};
     let _0x37c181 = _0x37d3e5.warn || {};
     if (_0x188ea8.isCreator && _0x79409c.toLowerCase() === "all" && _0x37c181) {
       _0x37c181 = {};
     } else {
       if (!_0x37d3e5 || !_0x37c181 || !_0x37c181[_0x188ea8.chat]) {
         return await _0x188ea8.send("*_User didn't have any warning yet!!_*");
       }
       delete _0x37c181[_0x188ea8.chat];
     }
     await userdb.updateOne({
       id: _0x4a1738
     }, {
       warn: _0x37c181
     });
     await _0x188ea8.reply("*User is free as a bird now!*\n*All warns has been deleted!*");
   } catch (_0x1cba5f) {
     await _0x188ea8.error(_0x1cba5f + "\n\nCommand: resetwarn", _0x1cba5f);
   }
 });
 smd({
   pattern: "act",
   alias: ["activate", "active"],
   desc: "Switches for varios works.",
   category: "moderation",
   filename: __filename
 }, async (_0x5280d6, _0x576a8b) => {
   try {
     if (!_0x5280d6.isGroup) {
       return _0x5280d6.reply(tlang().group);
     }
     const _0x1cd4b9 = _0x5280d6.botNumber;
     const _0x40434e = _0x5280d6.isAdmin;
     let _0x1d7103 = _0x576a8b?.split(" ")[0].toLowerCase()?.trim() || false;
     if (!_0x40434e && !_0x5280d6.isCreator) {
       return _0x5280d6.reply(tlang().admin);
     }
     let _0x2b2e73 = (await groupdb.findOne({
       id: _0x5280d6.chat
     })) || (await groupdb.new({
       id: _0x5280d6.chat
     })) || false;
     if (!_0x2b2e73) {
       return await _0x5280d6.reply("*_Uhh dear, request not be proceed due to error!_*");
     }
     switch (_0x1d7103) {
       case "antilink":
         {
           if (_0x2b2e73.antilink !== "false") {
             return await _0x5280d6.reply("*_Antilink was alredy enabled here!_*");
           }
           await groupdb.updateOne({
             id: _0x5280d6.chat
           }, {
             antilink: "warn"
           });
           await _0x5280d6.reply("*_Enabled antilink in current chat.!_*");
         }
         break;
       case "economy":
         {
           if (_0x2b2e73.economy == "true") {
             return await _0x5280d6.reply("*_Economy was alredy enabled.!_*");
           }
           await groupdb.updateOne({
             id: _0x5280d6.chat
           }, {
             economy: "true"
           });
           await _0x5280d6.reply("*_Economy enabled in current chat.!_*");
         }
         break;
       case "events":
       case "event":
         {
           await groupdb.updateOne({
             id: _0x5280d6.chat
           }, {
             welcome: "true",
             goodbye: "true"
           });
           return await _0x5280d6.reply("*Successfully Enabled Events!*");
         }
         break;
       case "nsfw":
         {
           if (_0x2b2e73.nsfw == "true") {
             return await _0x5280d6.reply("*_NSFW is already enabled!_*");
           }
           await groupdb.updateOne({
             id: _0x5280d6.chat
           }, {
             nsfw: "true"
           });
           await _0x5280d6.reply("+_Successfully Enabled NSFW_*");
         }
         break;
       case "bot":
         {
           if (_0x2b2e73.botenable == "true") {
             return await _0x5280d6.reply("*_bot is already enabled!_*");
           }
           await groupdb.updateOne({
             id: _0x5280d6.chat
           }, {
             botenable: "true"
           });
           await _0x5280d6.reply("+_Successfully Enabled bot_*");
         }
         break;
       default:
         {
           _0x5280d6.reply("Please provide me term like.\n1-events\n2-antilink\n3-nsfw\n4-economy\n5-bot");
         }
     }
   } catch (_0x40fd4d) {
     await _0x5280d6.error(_0x40fd4d + "\n\ncommand: act", _0x40fd4d);
   }
 });
 smd({
   pattern: "deact",
   alias: ["deactive", "deactivate"],
   desc: "Switches for varios works.",
   category: "moderation",
   filename: __filename
 }, async (_0x223d36, _0x214f32) => {
   try {
     if (!_0x223d36.isGroup) {
       return _0x223d36.reply(tlang().group);
     }
     const _0x1402af = _0x223d36.botNumber;
     const _0x45e34f = _0x223d36.isAdmin;
     let _0x439823 = _0x214f32?.split(" ")[0].toLowerCase()?.trim() || false;
     if (!_0x439823) {
       return _0x223d36.reply("❌ Please provide me term like like\n1-events\n2-antilink\n3-nsfw\n4-bot\n5-economy");
     }
     if (!_0x45e34f && !_0x223d36.isCreator) {
       return _0x223d36.reply(tlang().admin);
     }
     let _0x5ac219 = (await groupdb.findOne({
       id: _0x223d36.chat
     })) || (await groupdb.new({
       id: _0x223d36.chat
     })) || false;
     if (!_0x5ac219) {
       return await _0x223d36.reply("*_Uhh dear, request not be proceed due to error!_*");
     }
     switch (_0x439823) {
       case "antilink":
         {
           if (_0x5ac219.antilink == "false") {
             return _0x223d36.reply("*_Antilink was alredy disabled_*");
           }
           await groupdb.updateOne({
             id: _0x223d36.chat
           }, {
             antilink: "false"
           });
           _0x223d36.reply("*_disabled antilink in current chat!_*");
         }
         break;
       case "economy":
         {
           if (_0x5ac219.economy == "false") {
             return _0x223d36.reply("*_Economy was alredy disabled!_*");
           }
           await groupdb.updateOne({
             id: _0x223d36.chat
           }, {
             economy: "false"
           });
           _0x223d36.reply("*disabled Economy in current chat.*");
         }
         break;
       case "events":
       case "event":
         {
           if (_0x5ac219.events == "false") {
             return _0x223d36.reply("*_Events are already disabled!_*");
           }
           await groupdb.updateOne({
             id: _0x223d36.chat
           }, {
             welcome: "false",
             goodbye: "false"
           });
           return _0x223d36.reply("*Successfully disabled Events!*");
         }
         break;
       case "nsfw":
         {
           if (_0x5ac219.nsfw == "false") {
             return _0x223d36.reply("*_NSFW is already disabled_");
           }
           await sck.updateOne({
             id: _0x223d36.chat
           }, {
             nsfw: "false"
           });
           _0x223d36.reply("*Successfully disabled NSFW*");
         }
         break;
       case "bot":
         {
           if (_0x5ac219.botenable == "false") {
             return await _0x223d36.reply("*_bot is already disabled!_*");
           }
           await groupdb.updateOne({
             id: _0x223d36.chat
           }, {
             botenable: "true"
           });
           await _0x223d36.reply("+_Successfully disabled bot_*");
         }
         break;
       default:
         {
           _0x223d36.reply("Please provide me term like.\n1-events\n2-antilink\n3-nsfw\n4-bot\n5-economy");
         }
     }
   } catch (_0x12a58e) {
     await _0x223d36.error(_0x12a58e + "\n\ncommand: deact", _0x12a58e);
   }
 });
 smd({
   pattern: "bot",
   desc: "activates and deactivates bot.\nuse buttons to toggle.",
   fromMe: true,
   category: "misc",
   filename: __filename
 }, async (_0xdf3244, _0x5604af) => {
   try {
     let _0x45bbf0 = _0x5604af ? _0x5604af.toLowerCase().trim() : false;
     let _0x3433ca = _0x45bbf0 ? _0x45bbf0.split(" ")[0] : false;
     let _0x40829d = (await groupdb.findOne({
       id: _0xdf3244.chat
     })) || (await groupdb.new({
       id: _0xdf3244.chat
     }));
     if (!_0x3433ca) {
       await _0xdf3244.send("*_Bot *" + (_0x40829d.botenable === "false" ? "Disabled" : "Enabled") + " in this Chat!_*");
     } else if (_0x3433ca.startsWith("off") || _0x3433ca.startsWith("deact") || _0x3433ca.startsWith("disable")) {
       if (_0x40829d.botenable === "false") {
         await _0xdf3244.send("*_Bot already disabled in current Chat!!_*");
       } else {
         await groupdb.updateOne({
           id: _0xdf3244.chat
         }, {
           botenable: "false"
         });
         await _0xdf3244.send("*_Bot Disabled Succesfully!_*");
       }
     } else if (_0x3433ca.startsWith("on") || _0x3433ca.startsWith("act") || _0x3433ca.startsWith("enable")) {
       if (_0x40829d.botenable === "true") {
         await _0xdf3244.send("*_Bot already enabled in current Chat!!_*");
       } else {
         await groupdb.updateOne({
           id: _0xdf3244.chat
         }, {
           botenable: "true"
         });
         await _0xdf3244.send("*_Bot Succesfully Enabled!_*");
       }
     } else {
       await _0xdf3244.send("*_Provide Valid Instruction_*\n*Ex: _" + prefix + "bot on/off_*");
     }
   } catch (_0x3ac6d7) {
     _0xdf3244.error(_0x3ac6d7 + "\n\ncommand: bot", _0x3ac6d7);
   }
 });
 smd({
   pattern: "antitag",
   desc: "detect tagall in group chat, then kick them",
   fromMe: true,
   category: "misc",
   filename: __filename
 }, async (_0x3f5635, _0x14efbb) => {
   try {
     let _0x12a37a = _0x14efbb ? _0x14efbb.toLowerCase().trim() : false;
     let _0x474a8c = _0x12a37a ? _0x12a37a.split(" ")[0] : false;
     let _0x2c8c78 = (await groupdb.findOne({
       id: _0x3f5635.chat
     })) || (await groupdb.new({
       id: _0x3f5635.chat
     }));
     if (!_0x474a8c) {
       await _0x3f5635.send("*_Anti_tag *" + (_0x2c8c78.antitag === "false" ? "Disabled" : "Enabled") + " in this Chat!_*");
     } else if (_0x474a8c.startsWith("off") || _0x474a8c.startsWith("deact") || _0x474a8c.startsWith("disable")) {
       if (_0x2c8c78.antitag === "false") {
         await _0x3f5635.send("*_Anti_tag already disabled in current Chat!!_*");
       } else {
         await groupdb.updateOne({
           id: _0x3f5635.chat
         }, {
           antitag: "false"
         });
         await _0x3f5635.send("*_Anti_tag Disabled Succesfully!_*");
       }
     } else if (_0x474a8c.startsWith("on") || _0x474a8c.startsWith("act") || _0x474a8c.startsWith("enable")) {
       if (_0x2c8c78.antitag === "true") {
         await _0x3f5635.send("*_Anti_tag already enabled in current Chat!!_*");
       } else {
         await groupdb.updateOne({
           id: _0x3f5635.chat
         }, {
           antitag: "true"
         });
         await _0x3f5635.send("*_Anti_tag succesfully enabled in chat!_*\n*_Now bot kick user who tag all members!_*");
       }
     } else {
       await _0x3f5635.send("*_Provide Valid Instruction_*\n*Ex: _" + prefix + "antitag on/off_*");
     }
   } catch (_0x3877d4) {
     _0x3f5635.error(_0x3877d4 + "\n\ncommand: antitag", _0x3877d4);
   }
 });
 smd({
   pattern: "antilink",
   desc: "activates and deactivates antilink.\nuse buttons to toggle.",
   category: "group",
   filename: __filename
 }, async (_0x423482, _0x2231cf, {
   smd: _0x4fcabe
 }) => {
   try {
     if (!_0x423482.isGroup) {
       return _0x423482.reply(tlang().group);
     }
     if (!_0x423482.isAdmin && !_0x423482.isCreator) {
       return _0x423482.reply(tlang().admin);
     }
     let _0x188fa8 = _0x2231cf ? _0x2231cf.toLowerCase().trim() : false;
     let _0x41a099 = _0x188fa8 ? _0x188fa8.split(" ")[0] : false;
     let _0x49409c = (await groupdb.findOne({
       id: _0x423482.chat
     })) || (await groupdb.new({
       id: _0x423482.chat
     }));
     if (!_0x41a099) {
       return await _0x423482.send("*_Antilink " + (_0x49409c.antilink === "false" ? "Disabled" : "Enabled") + " in this Group!_* \n" + (_0x49409c.antilink === "false" ? "" : "*Current Mode:* _" + _0x49409c.antilink + "_") + "\n\n*Antilink Modes:* ```\n" + (prefix + _0x4fcabe) + " kick (Delete Links & Kick Senders)\n" + (prefix + _0x4fcabe) + " delete (Delete Links Only)\n" + (prefix + _0x4fcabe) + " warn (warn & delete links)\n" + (prefix + _0x4fcabe) + " off (Disable Antilink in chat) ```\n\n\n" + Config.caption);
     } else if (_0x41a099.startsWith("off") || _0x41a099.startsWith("deact") || _0x41a099.startsWith("disable")) {
       if (_0x49409c.antilink === "false") {
         return await _0x423482.send("*_Anti_Link already disabled in current Chat!!_*");
       }
       await groupdb.updateOne({
         id: _0x423482.chat
       }, {
         antilink: "false"
       });
       return await _0x423482.send("*_Anti_Link Disabled Succesfully!_*");
     } else if (_0x41a099.startsWith("kick")) {
       if (_0x49409c.antilink === "kick") {
         return await _0x423482.send("*_Anti_Link already set to kick link senders!!_*");
       }
       await groupdb.updateOne({
         id: _0x423482.chat
       }, {
         antilink: "kick"
       });
       return await _0x423482.send("*_Anti_Link Succesfully set to kick link senders!_*");
     } else if (_0x41a099.startsWith("delete")) {
       if (_0x49409c.antilink === "delete") {
         return await _0x423482.send("*_Anti_Link already set to delete links!!_*");
       }
       await groupdb.updateOne({
         id: _0x423482.chat
       }, {
         antilink: "delete"
       });
       return await _0x423482.send("*_Anti_Link Succesfully set to delete links from chat!_*");
     } else if (_0x41a099.startsWith("warn")) {
       if (_0x49409c.antilink === "warn") {
         return await _0x423482.send("*_Anti_Link already set to warn link senders!!_*");
       }
       await groupdb.updateOne({
         id: _0x423482.chat
       }, {
         antilink: "warn"
       });
       return await _0x423482.send("*_Anti_Link set to warn and delete links!_*");
     } else {
       return await _0x423482.send("*_Uhh Please, Provide Valid Instruction_*\n*Eg: _" + prefix + "antilink kick/delete/warn/off_*");
     }
   } catch (_0xb65882) {
     _0x423482.error(_0xb65882 + "\n\ncommand: antilink", _0xb65882);
   }
 });
 smd({
   pattern: "welcome",
   alias: ["setwelcome"],
   desc: "sets welcome message in specific group.",
   category: "group",
   filename: __filename
 }, async (_0x2e890a, _0x15025a) => {
   try {
     if (!_0x2e890a.isGroup) {
       return _0x2e890a.reply(lang().group);
     }
     if (!_0x2e890a.isAdmin && !_0x2e890a.isCreator) {
       return _0x2e890a.reply(lang().admin);
     }
     let _0x152497 = _0x15025a.toLowerCase().trim();
     let _0x3f9705 = (await groupdb.findOne({
       id: _0x2e890a.chat
     })) || (await groupdb.new({
       id: _0x2e890a.chat
     }));
     if (_0x152497 === "on" || _0x152497 === "act" || _0x152497 === "enable") {
       if (_0x3f9705.welcome === "true") {
         return await _0x2e890a.send("*_Welcome already enabled in current group!!_*");
       }
       await groupdb.updateOne({
         id: _0x2e890a.chat
       }, {
         welcome: "true"
       });
       return await _0x2e890a.send("*Welcome successfully enabled!!*");
     }
     if (_0x3f9705.welcome !== "true") {
       return await _0x2e890a.send("*_Welcome *Disabled in this Group!_* \n*_Use on/off to enable/disable welcome_*");
     }
     if (!_0x15025a || _0x152497 === "get") {
       return await _0x2e890a.reply("*Welcome :* " + _0x3f9705.welcometext);
     }
     if (_0x152497 === "off" || _0x152497 === "deact" || _0x152497 === "disable") {
       if (_0x3f9705.welcome === "false") {
         return await _0x2e890a.send("*_Welcome already disabled in current group!!_*");
       }
       await groupdb.updateOne({
         id: _0x2e890a.chat
       }, {
         welcome: "false"
       });
       return await _0x2e890a.send("*Welcome message disabled!!*");
     }
     await groupdb.updateOne({
       id: _0x2e890a.chat
     }, {
       welcometext: _0x15025a,
       welcome: "true"
     });
     await sendWelcome(_0x2e890a, _0x15025a);
   } catch (_0x3265ae) {
     _0x2e890a.error(_0x3265ae + "\n\ncommand: setwelcome", _0x3265ae);
   }
 });
 smd({
   pattern: "goodbye",
   alias: ["setgoodbye", "setbye"],
   desc: "sets goodbye message in specific group.",
   category: "group",
   filename: __filename
 }, async (_0x4ed304, _0x1aa647) => {
   try {
     if (!_0x4ed304.isGroup) {
       return _0x4ed304.reply(lang().group);
     }
     if (!_0x4ed304.isAdmin && !_0x4ed304.isCreator) {
       return _0x4ed304.reply(lang().admin);
     }
     let _0x4eb04e = _0x1aa647.toLowerCase().trim();
     let _0x5dbb84 = (await groupdb.findOne({
       id: _0x4ed304.chat
     })) || (await groupdb.new({
       id: _0x4ed304.chat
     }));
     if (_0x4eb04e === "on" || _0x4eb04e === "act" || _0x4eb04e === "enable") {
       if (_0x5dbb84.goodbye === "true") {
         return await _0x4ed304.send("*_Goodbye already enabled in current group!!_*");
       }
       await groupdb.updateOne({
         id: _0x4ed304.chat
       }, {
         goodbye: "true"
       });
       return await _0x4ed304.send("*Goodbye successfully enabled!!*");
     }
     if (_0x5dbb84.goodbye !== "true") {
       return await _0x4ed304.send("*_Goodbye *Disabled in this Group!_* \n*_Use on/off to enable/disable goodbye_*");
     }
     if (!_0x1aa647 || _0x4eb04e === "get") {
       return await _0x4ed304.reply("*Goodbye Message :* " + _0x5dbb84.goodbyetext);
     }
     if (_0x4eb04e === "off" || _0x4eb04e === "deact" || _0x4eb04e === "disable") {
       if (_0x5dbb84.goodbye === "false") {
         return await _0x4ed304.send("*_Goodbye already disabled in current group!!_*");
       }
       await groupdb.updateOne({
         id: _0x4ed304.chat
       }, {
         goodbye: "false"
       });
       return await _0x4ed304.send("*Goodbye message disabled!!*");
     }
     await groupdb.updateOne({
       id: _0x4ed304.chat
     }, {
       goodbyetext: _0x1aa647,
       goodbye: "true"
     });
     await sendWelcome(_0x4ed304, _0x1aa647);
   } catch (_0x12d243) {
     _0x4ed304.error(_0x12d243 + "\n\ncommand: setgoodbye", _0x12d243);
   }
 });
 smd({
   pattern: "onlyadmin",
   alias: ["antimessge"],
   desc: "activates and deactivates onlyadmin.",
   category: "group",
   filename: __filename
 }, async (_0x4b1b13, _0x39faf6, {
   cmdName: _0x51560b
 }) => {
   try {
     if (!_0x4b1b13.isGroup) {
       return _0x4b1b13.reply(tlang().group);
     }
     if (!_0x4b1b13.isAdmin && !_0x4b1b13.isCreator) {
       return _0x4b1b13.reply(tlang().admin);
     }
     let _0x112e20 = (await groupdb.findOne({
       id: _0x4b1b13.chat
     })) || (await groupdb.new({
       id: _0x4b1b13.chat
     }));
     let _0x3bc3be = _0x39faf6 ? _0x39faf6.toLowerCase().trim() : false;
     let _0x4a65ab = _0x3bc3be ? _0x3bc3be.split(" ")[0] : false;
     if (!_0x4a65ab) {
       return await _0x4b1b13.send("*_" + _0x51560b + " *" + (_0x112e20.onlyadmin === "false" ? "Disabled" : "Enabled") + " in this Group!_*\n *_Use on/off to enable/disable_*");
     } else if (_0x4a65ab.startsWith("off") || _0x4a65ab.startsWith("deact") || _0x4a65ab.startsWith("disable")) {
       if (_0x112e20.onlyadmin === "false") {
         return await _0x4b1b13.reply("*_Onlyadmin Already Disabled in Current Chat_*");
       }
       await groupdb.updateOne({
         id: _0x4b1b13.chat
       }, {
         onlyadmin: "false"
       });
       await _0x4b1b13.bot.groupSettingUpdate(_0x4b1b13.chat, "not_announcement");
       return await _0x4b1b13.send("*" + _0x51560b + " succesfully disable in group!_*\n*_Now everyone send message in group_*");
     } else if (_0x4a65ab.startsWith("on") || _0x4a65ab.startsWith("act") || _0x4a65ab.startsWith("enable")) {
       if (_0x112e20.onlyadmin === "true") {
         return await _0x4b1b13.reply("*_Onlyadmin Already Enabled in Current Chat_*");
       }
       if (_0x4b1b13.isBotAdmin) {
         await groupdb.updateOne({
           id: _0x4b1b13.chat
         }, {
           onlyadmin: "true"
         });
         await _0x4b1b13.bot.groupSettingUpdate(_0x4b1b13.chat, "announcement");
         return await _0x4b1b13.send("*" + _0x51560b + " succesfully set to kick msg senders!_*\n*_Now only admins allow to send msg in group_*");
       } else {
         return await _0x4b1b13.reply("*_UHH Please, Provide Admin Role First_*");
       }
     } else {
       return await _0x4b1b13.reply("*_Please Provide Valid Instruction_*\n*_Use on/off to enable/disable_*");
     }
   } catch (_0x268a74) {
     _0x4b1b13.error(_0x268a74 + "\n\ncommand: onlyadmin", _0x268a74);
   }
 });
 smd({
   pattern: "antibot",
   desc: "kick Bot Users from Group.!",
   category: "group",
   filename: __filename
 }, async (_0x31c5ba, _0x3a26cb, {
   cmdName: _0x1258ef
 }) => {
   try {
     if (!_0x31c5ba.isGroup) {
       return _0x31c5ba.reply(tlang().group);
     }
     if (!_0x31c5ba.isAdmin && !_0x31c5ba.isCreator) {
       return _0x31c5ba.reply(tlang().admin);
     }
     let _0x4a9362 = (await groupdb.findOne({
       id: _0x31c5ba.chat
     })) || (await groupdb.new({
       id: _0x31c5ba.chat
     }));
     let _0x12e7b2 = _0x3a26cb ? _0x3a26cb.toLowerCase().trim() : "";
     let _0x599edb = _0x12e7b2.startsWith("on") || _0x12e7b2.startsWith("act") || _0x12e7b2.startsWith("enable") || _0x12e7b2.startsWith("del") || _0x12e7b2.startsWith("warn") ? "warn" : _0x12e7b2.startsWith("kic") ? "kick" : _0x12e7b2.startsWith("off") || _0x12e7b2.startsWith("reset") || _0x12e7b2.startsWith("deact") || _0x12e7b2.startsWith("disable") ? "false" : "";
     if (!_0x599edb) {
       return await _0x31c5ba.send("*_Antibot Currently *" + (_0x4a9362.antibot === "false" ? "Disabled" : "Enabled") + " in this Group!_*\n*_Use warn/kick/off to enable/disable Antibot_*");
     } else if (_0x599edb === "false") {
       if (_0x4a9362.antibot === "false") {
         return await _0x31c5ba.reply("*_Antibot Already Disabled in Current Chat_*");
       }
       await groupdb.updateOne({
         id: _0x31c5ba.chat
       }, {
         antibot: "false"
       });
       return await _0x31c5ba.send("*_Antibot Succesfully Disable in group!_*");
     } else if (_0x599edb === "warn" || _0x599edb === "kick") {
       if (_0x4a9362.antibot === _0x599edb) {
         return await _0x31c5ba.reply("*_Antibot Already set to " + _0x599edb + " bots!_*");
       }
       if (!_0x31c5ba.isBotAdmin) {
         return await _0x31c5ba.reply("*_Uhh Please, Provide Admin Role First_*");
       }
       await groupdb.updateOne({
         id: _0x31c5ba.chat
       }, {
         antibot: _0x599edb
       });
       return await _0x31c5ba.send("*_Antibot Succesfully set to " + _0x599edb + " Bot Users!_*");
     } else {
       return await _0x31c5ba.reply("*_Please provide valid instructions!_*\n*_Use warn/kick/off to enable/disable Antibot!_*");
     }
   } catch (_0x2a4a98) {
     _0x31c5ba.error(_0x2a4a98 + "\n\ncommand: antibot", _0x2a4a98);
   }
 });
 smd({
   pattern: "disable",
   desc: "disable cmds in Group.!",
   category: "group",
   filename: __filename
 }, async (_0x5ce533, _0x582206) => {
   try {
     if (!_0x5ce533.isGroup) {
       return _0x5ce533.reply(tlang().group);
     }
     if (!_0x5ce533.isAdmin && !_0x5ce533.isCreator) {
       return _0x5ce533.reply(tlang().admin);
     }
     let _0x495431 = (await groupdb.findOne({
       id: _0x5ce533.chat
     })) || (await groupdb.new({
       id: _0x5ce533.chat
     }));
     let _0x35a9de = _0x582206 ? _0x582206.toLowerCase().trim() : false;
     let _0x455fe = _0x35a9de ? _0x35a9de.split(" ")[0] : "";
     if (!_0x455fe) {
       return await _0x5ce533.send("*Provide cmd name to disable in group*\n*Ex " + prefix + "disable tag(to disabled 'tag' cmd)/info*");
     } else if (_0x455fe.startsWith("info") || _0x455fe.startsWith("list") || _0x455fe.startsWith("cmds")) {
       return await _0x5ce533.send(_0x495431.disablecmds === "false" ? "*_Uhh Dear, Theres no cmd disabled in current group_*" : "*_Disable cmds :_* ```" + _0x495431.disablecmds.replace("false,", "") + "```");
     } else if (_0x455fe.startsWith("enable") || _0x455fe.startsWith("disable") || _0x455fe.startsWith("bot")) {
       return await _0x5ce533.reply("*_Uhh Dear, I can't disable that cmd_*");
     } else if (_0x455fe) {
       const _0x486e04 = sᴜʜᴀɪʟ_ᴍᴅ.commands.find(_0x32518a => _0x32518a.pattern === _0x455fe) || sᴜʜᴀɪʟ_ᴍᴅ.commands.find(_0x580b67 => _0x580b67.alias && _0x580b67.alias.includes(_0x455fe));
       if (_0x486e04) {
         let _0x28002a = _0x486e04.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
         let _0x594ec8 = new RegExp("\\b" + _0x28002a + "\\b");
         if (_0x594ec8.test(_0x495431.disablecmds)) {
           return await _0x5ce533.send("*Uhh Dear, Provided cmd already in disable cmds*");
         }
         var _0x226c2f = _0x495431.disablecmds + "," + _0x486e04.pattern;
         await groupdb.updateOne({
           id: _0x5ce533.chat
         }, {
           disablecmds: _0x226c2f
         });
         let _0x3934dd = _0x226c2f.replace("false,", "");
         return await _0x5ce533.send("*_\"" + _0x455fe + "\" Succesfully added in disable cmds_*" + (_0x3934dd === "" ? "" : "\n*_Disable cmds :_* ```" + _0x3934dd + "```"));
       } else {
         return await _0x5ce533.reply("*_'" + _0x455fe + "' is not a bot command, Provide valid command_*");
       }
     }
   } catch (_0x51c5d6) {
     _0x5ce533.error(_0x51c5d6 + "\n\ncommand: enable", _0x51c5d6);
   }
 });
 smd({
   pattern: "enable",
   desc: "enable a cmd in Group.!",
   category: "group",
   filename: __filename
 }, async (_0x437887, _0x3da1d5) => {
   try {
     if (!_0x437887.isGroup) {
       return _0x437887.reply(tlang().group);
     }
     if (!_0x437887.isAdmin && !_0x437887.isCreator) {
       return _0x437887.reply(tlang().admin);
     }
     let _0x2751ce = (await groupdb.findOne({
       id: _0x437887.chat
     })) || (await groupdb.new({
       id: _0x437887.chat
     }));
     let _0x2645ad = _0x3da1d5 ? _0x3da1d5.toLowerCase().trim() : false;
     let _0x4311c8 = _0x2645ad ? _0x2645ad.split(" ")[0] : "";
     let _0x14dd78 = _0x4311c8.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
     let _0x398af9 = new RegExp("\\b" + _0x14dd78 + "\\b");
     if (!_0x4311c8 || _0x4311c8 === "") {
       return await _0x437887.send("*Please provide disabled cmd name to enable it*\n*Ex " + prefix + "enable tag(if 'tag' cmd disabled)/all(reset disables)*");
     } else if (_0x2645ad.startsWith("all")) {
       await groupdb.updateOne({
         id: _0x437887.chat
       }, {
         disablecmds: "false"
       });
       return await _0x437887.send("*_All disable cmds succesfully enabled_*");
     } else if (_0x398af9.test(_0x2751ce.disablecmds) && _0x2751ce.disablecmds.includes(_0x4311c8)) {
       let _0x476cd5 = _0x2751ce.disablecmds.replace(_0x398af9, "");
       await groupdb.updateOne({
         id: _0x437887.chat
       }, {
         disablecmds: _0x476cd5
       });
       return await _0x437887.send("*_\"" + _0x4311c8.replace(",", "") + "\" Succesfully removed from disable cmds_*");
     } else {
       return await _0x437887.send("_There's no cmd disabled with *" + _0x4311c8.replace(",", "") + "* name");
     }
   } catch (_0x14323f) {
     _0x437887.error(_0x14323f + "\n\ncommand: disable", _0x14323f);
   }
 });
 smd({
   pattern: "antifake",
   desc: "𝗗𝗲𝘁𝗲𝗰𝘁𝘀 𝗽𝗿𝗼𝗺𝗼𝘁𝗲/𝗱𝗲𝗺𝗼𝘁𝗲 𝗮𝗻𝗱 𝘀𝗲𝗻𝗱𝘀 𝗮𝗹𝗲𝗿𝘁. ",
   category: "group",
   filename: __filename
 }, async (_0x57de61, _0x1323b9) => {
   try {
     if (!_0x57de61.isGroup) {
       return _0x57de61.reply(tlang().group);
     }
     if (!_0x57de61.isAdmin && !_0x57de61.isCreator) {
       return _0x57de61.reply(tlang().admin);
     }
     let _0x4f088c = (await groupdb.findOne({
       id: _0x57de61.chat
     })) || (await groupdb.new({
       id: _0x57de61.chat
     }));
     let _0x510c5b = _0x1323b9 ? _0x1323b9.toLowerCase().trim() : "";
     if (_0x510c5b.startsWith("off") || _0x510c5b.startsWith("deact") || _0x510c5b.startsWith("disable")) {
       if (_0x4f088c.antifake == "false") {
         return await _0x57de61.send("*Anti_Fake Already Disabled In Current Chat!*");
       }
       await groupdb.updateOne({
         id: _0x57de61.chat
       }, {
         antifake: "false"
       });
       return await _0x57de61.send("*Anti_Fake Disable Succesfully!*");
     } else if (!_0x1323b9) {
       return await _0x57de61.send("*_Antifake " + (_0x4f088c.antifake === "false" ? "Not set to any" : "set to \"" + _0x4f088c.antifake + "\"") + " Country Code!_*\n *Provide Country code to Update Antifake Status*\n*Eg: _.antifake 92_*");
     }
     let _0xb90712 = _0x1323b9 ? _0x1323b9.split(",").map(_0x3b4b84 => parseInt(_0x3b4b84)).filter(_0x473fc2 => !isNaN(_0x473fc2)).join(",") : false;
     if (!_0x1323b9 || !_0xb90712) {
       return await _0x57de61.send("*_Please provide a country code First_*\n *_Only numbers to join this group._*\n*_eg: " + prefix + "antifake 92_*");
     } else if (_0xb90712) {
       await groupdb.updateOne({
         id: _0x57de61.chat
       }, {
         antifake: "" + _0xb90712
       });
       return await _0x57de61.send("*Anti_Fake Succesfully set to \"" + _0xb90712 + "\"!*\n*_Now People Joined Group Who's Number Start With " + _0xb90712 + "_*");
     } else {
       return await _0x57de61.send("*_Please provide a Valid country code First_*\n *_Only numbers to join this group._*\n*_eg: " + prefix + "antifake 92_*");
     }
   } catch (_0x27dd3a) {
     _0x57de61.error(_0x27dd3a + "\n\ncommand: antifake", _0x27dd3a);
   }
 });
 smd({
   pattern: "antidemote",
   desc: "Detects Promote and Automaticaly demote promoted person.",
   category: "group",
   filename: __filename
 }, async (_0x244471, _0x7938b0) => {
   try {
     if (!_0x244471.isGroup) {
       return _0x244471.reply(tlang().group);
     }
     if (!_0x244471.isAdmin && !_0x244471.isCreator) {
       return _0x244471.reply(tlang().admin);
     }
     let _0xa4354d = (await groupdb.findOne({
       id: _0x244471.chat
     })) || (await groupdb.new({
       id: _0x244471.chat
     }));
     let _0x47f781 = _0x7938b0 ? _0x7938b0.toLowerCase().trim() : false;
     if (_0x47f781.startsWith("on") || _0x47f781.startsWith("act") || _0x47f781.startsWith("enable")) {
       if (_0xa4354d.antidemote == "true") {
         return await _0x244471.send("*Anti_Demote Already Enabled In Current Chat!*");
       }
       await groupdb.updateOne({
         id: _0x244471.chat
       }, {
         antidemote: "true"
       });
       return await _0x244471.send("*Anti_Demote Enable Succesfully! _No One Demote Here Now_.*");
     } else if (_0x47f781.startsWith("off") || _0x47f781.startsWith("deact") || _0x47f781.startsWith("disable")) {
       if (_0xa4354d.antidemote == "false") {
         return await _0x244471.send("*Anti_Demote Already Disabled In Current Chat!*");
       }
       await groupdb.updateOne({
         id: _0x244471.chat
       }, {
         antidemote: "false"
       });
       return await _0x244471.send("*Anti_Demote Disable Succesfully!*");
     } else {
       return await _0x244471.reply("*Uhh Dear, Please Toggle between \"On\" And \"Off\".* \n*_To Enable & Disable Stop Demoting Peoples!_*");
     }
   } catch (_0x623897) {
     _0x244471.error(_0x623897 + "\n\ncommand: antidemote", _0x623897);
   }
 });
 smd({
   pattern: "antipromote",
   desc: "Detects Promote and Automaticaly demote promoted person.",
   category: "group",
   filename: __filename
 }, async (_0x1d79b4, _0x451b33) => {
   try {
     if (!_0x1d79b4.isGroup) {
       return _0x1d79b4.reply(tlang().group);
     }
     if (!_0x1d79b4.isAdmin && !_0x1d79b4.isCreator) {
       return _0x1d79b4.reply(tlang().admin);
     }
     let _0x5efaad = (await groupdb.findOne({
       id: _0x1d79b4.chat
     })) || (await groupdb.new({
       id: _0x1d79b4.chat
     }));
     let _0x3e38a6 = _0x451b33 ? _0x451b33.toLowerCase().trim() : false;
     if (_0x3e38a6.startsWith("on") || _0x3e38a6.startsWith("act") || _0x3e38a6.startsWith("enable")) {
       if (_0x5efaad.antipromote == "true") {
         return await _0x1d79b4.send("*Anti_Promote Already Enabled In Current Chat!*");
       }
       await groupdb.updateOne({
         id: _0x1d79b4.chat
       }, {
         antipromote: "true"
       });
       return await _0x1d79b4.send("*Anti_Promote Enable Succesfully! _No One Promote Here Now_.*");
     } else if (_0x3e38a6.startsWith("off") || _0x3e38a6.startsWith("deact") || _0x3e38a6.startsWith("disable")) {
       if (_0x5efaad.antipromote == "false") {
         return await _0x1d79b4.send("*Anti_Promote Already Disabled In Current Chat!*");
       }
       await groupdb.updateOne({
         id: _0x1d79b4.chat
       }, {
         antipromote: "false"
       });
       return await _0x1d79b4.send("*Anti_Promote Disable Succesfully!*");
     } else {
       return await _0x1d79b4.reply("*Uhh Dear, Please Toggle between \"On\" And \"Off\".* \n*_To Stop Promoting Peoples in Chat_*");
     }
   } catch (_0x1a2d24) {
     _0x1d79b4.error(_0x1a2d24 + "\n\ncommand: antipromote", _0x1a2d24);
   }
 });
 smd({
   pattern: "pdm",
   desc: "Detect Promote/Demote Users And Send Alerts in Chat ",
   category: "group",
   filename: __filename
 }, async (_0x3ad32c, _0x19b5ce) => {
   try {
     if (!_0x3ad32c.isGroup) {
       return _0x3ad32c.reply(tlang().group);
     }
     if (!_0x3ad32c.isAdmin && !_0x3ad32c.isCreator) {
       return _0x3ad32c.reply(tlang().admin);
     }
     let _0xf8b013 = (await groupdb.findOne({
       id: _0x3ad32c.chat
     })) || (await groupdb.new({
       id: _0x3ad32c.chat
     }));
     let _0x2d16f8 = _0x19b5ce ? _0x19b5ce.toLowerCase().trim() : "";
     if (_0x2d16f8.startsWith("on") || _0x2d16f8.startsWith("act") || _0x2d16f8.startsWith("enable")) {
       if (_0xf8b013.pdm == "true") {
         return await _0x3ad32c.send("*Promote/Demote Alerts Already Enabled In Current Chat!*");
       }
       await groupdb.updateOne({
         id: _0x3ad32c.chat
       }, {
         pdm: "true"
       });
       return await _0x3ad32c.send("*Promote/Demote Alerts Enable Succesfully!*");
     } else if (_0x2d16f8.startsWith("off") || _0x2d16f8.startsWith("deact") || _0x2d16f8.startsWith("disable")) {
       if (_0xf8b013.pdm == "false") {
         return await _0x3ad32c.send("*Promote/Demote Alerts Already Disabled In Current Chat!*");
       }
       await groupdb.updateOne({
         id: _0x3ad32c.chat
       }, {
         pdm: "false"
       });
       return await _0x3ad32c.send("*Promote/Demote Alerts Disable Succesfully!*");
     } else {
       return await _0x3ad32c.reply("*Uhh Dear, Please use between \"On\" And \"Off\".* \n*_To get And Stop Promote/Demote Alerts_*");
     }
   } catch (_0x4a74e5) {
     _0x3ad32c.error(_0x4a74e5 + "\n\ncommand: pdm", _0x4a74e5);
   }
 });
 smd({
   pattern: "lydea",
   alias: ["chatbot"],
   desc: "activates and deactivates chatbot.\nuse buttons to toggle.",
   fromMe: true,
   category: "misc",
   filename: __filename
 }, async (_0x37a8a0, _0x1b1685, {
   cmdName: _0x5c5d27
 }) => {
   try {
     let _0x225280 = _0x1b1685.toLowerCase().trim();
     let _0x5a7ff8 = (await groupdb.findOne({
       id: _0x37a8a0.chat
     })) || (await groupdb.new({
       id: _0x37a8a0.chat
     }));
     if (_0x225280.startsWith("on") || _0x225280.startsWith("act") || _0x225280.startsWith("enable")) {
       if (_0x5a7ff8.chatbot == "true") {
         return await _0x37a8a0.send("*" + _0x5c5d27 + " was already enabled.*");
       }
       await groupdb.updateOne({
         id: _0x37a8a0.chat
       }, {
         chatbot: "true"
       });
       return await _0x37a8a0.send("*" + _0x5c5d27 + " activated successfully.*");
     } else if (_0x225280.startsWith("off") || _0x225280.startsWith("deact") || _0x225280.startsWith("disable")) {
       if (_0x5a7ff8.chatbot == "false") {
         return await _0x37a8a0.send("*" + _0x5c5d27 + " was already disabled.*");
       }
       await groupdb.updateOne({
         id: _0x37a8a0.chat
       }, {
         chatbot: "false"
       });
       return await _0x37a8a0.send("*Lydea deactivated successfully.*");
     } else {
       return await _0x37a8a0.reply("*_Use On/Off to enable/disable " + _0x5c5d27 + "_*");
     }
   } catch (_0xa0cef4) {
     message.error(_0xa0cef4 + "\n\ncommand: lydea(chatbot)", _0xa0cef4);
   }
 });
 smd({
   pattern: "amute",
   desc: "sets auto mute time in group.",
   category: "moderation"
 }, async (_0x6676a6, _0x40bcb0) => {
   try {
     if (!_0x6676a6.isGroup) {
       return _0x6676a6.reply(tlang().group);
     }
     if (!_0x6676a6.isAdmin && !_0x6676a6.isCreator) {
       return _0x6676a6.reply(tlang().admin);
     }
     let _0x38021d = (await groupdb.findOne({
       id: _0x6676a6.chat
     })) || (await groupdb.new({
       id: _0x6676a6.chat
     }));
     if (!_0x40bcb0) {
       return await _0x6676a6.reply("*Auto_Mute *" + (_0x38021d.mute === "false" ? "disable" : "enabled") + " for current group*" + (_0x38021d.mute !== "false" ? "\n *Auto mute status set at : " + _0x38021d.mute + "* " : ""));
     }
     let [_0x10e2f2, _0x5a6c0b] = _0x40bcb0.split(":").map(Number);
     if (isNaN(_0x10e2f2) || isNaN(_0x5a6c0b) || _0x10e2f2 < 0 || _0x10e2f2 >= 24 || _0x5a6c0b < 0 || _0x5a6c0b >= 60) {
       return _0x6676a6.reply("Please provide correct form.\nEg: " + prefix + "amute 22:00");
     }
     let _0x10dc23 = _0x10e2f2.toString().padStart(2, "0") + ":" + _0x5a6c0b.toString().padStart(2, "0");
     await groupdb.updateOne({
       id: _0x6676a6.chat
     }, {
       mute: _0x10dc23
     });
     return _0x6676a6.reply("*_Successfully done, Group auto mute at " + _0x10dc23 + "_*");
   } catch (_0x22dceb) {
     _0x6676a6.error(_0x22dceb + "\n\ncommand: amute", _0x22dceb);
   }
 });
 smd({
   pattern: "aunmute",
   desc: "sets unmute time in group.",
   category: "moderation"
 }, async (_0xc83652, _0xf611b9) => {
   try {
     if (!_0xc83652.isGroup) {
       return _0xc83652.reply(tlang().group);
     }
     if (!_0xc83652.isAdmin && !_0xc83652.isCreator) {
       return _0xc83652.reply(tlang().admin);
     }
     let _0x34c190 = (await groupdb.findOne({
       id: _0xc83652.chat
     })) || (await groupdb.new({
       id: _0xc83652.chat
     }));
     if (!_0xf611b9) {
       return await _0xc83652.reply("*Auto_Unmute *" + (_0x34c190.unmute === "false" ? "disable" : "enabled") + " for current group*" + (_0x34c190.unmute !== "false" ? "\n *Auto unmute status set at : " + _0x34c190.unmute + "* " : ""));
     }
     let [_0x5088d4, _0x118ff9] = _0xf611b9.split(":").map(Number);
     if (isNaN(_0x5088d4) || isNaN(_0x118ff9) || _0x5088d4 < 0 || _0x5088d4 >= 24 || _0x118ff9 < 0 || _0x118ff9 >= 60) {
       return _0xc83652.reply("Please provide correct form.\nEg: " + prefix + "aunmute 22:00");
     }
     let _0x22d2ae = _0x5088d4.toString().padStart(2, "0") + ":" + _0x118ff9.toString().padStart(2, "0");
     await groupdb.updateOne({
       id: _0xc83652.chat
     }, {
       unmute: _0x22d2ae
     });
     return _0xc83652.reply("*_Successfully done, Group auto unmute at " + _0x22d2ae + "_*");
   } catch (_0x47ec16) {
     _0xc83652.error(_0x47ec16 + "\n\ncommand: aunmute", _0x47ec16);
   }
 });
 smd({
   pattern: "dunmute",
   desc: "Delete unmute from group.",
   category: "moderation"
 }, async _0x476ac0 => {
   try {
     if (!_0x476ac0.isGroup) {
       return _0x476ac0.reply(tlang().group);
     }
     if (!_0x476ac0.isAdmin && !_0x476ac0.isCreator) {
       return _0x476ac0.reply(tlang().admin);
     }
     let _0x2c59e4 = await groupdb.findOne({
       id: _0x476ac0.chat
     });
     if (!_0x2c59e4 || _0x2c59e4.unmute == "false") {
       return await _0x476ac0.reply("*There's no auto unmute set in group.*");
     }
     await groupdb.updateOne({
       id: _0x476ac0.chat
     }, {
       unmute: "false"
     });
     return await _0x476ac0.reply("*Auto unmute deleted successfully.*");
   } catch (_0x7bf778) {
     _0x476ac0.error(_0x7bf778 + "\n\ncommand: dunmute", _0x7bf778);
   }
 });
 smd({
   pattern: "dmute",
   desc: "Delete mute from group.",
   category: "moderation"
 }, async (_0x5ed56c, _0x24e800) => {
   try {
     if (!_0x5ed56c.isGroup) {
       return _0x5ed56c.reply(tlang().group);
     }
     if (!_0x5ed56c.isAdmin && !_0x5ed56c.isCreator) {
       return _0x5ed56c.reply(tlang().admin);
     }
     if (!Group || Group.mute == "false") {
       return await _0x5ed56c.reply("*There's no auto mute set in group.*");
     }
     await groupdb.updateOne({
       id: _0x5ed56c.chat
     }, {
       mute: "false"
     });
     return await _0x5ed56c.reply("*Auto mute deleted successfully.*");
   } catch (_0x3c9194) {
     _0x5ed56c.error(_0x3c9194 + "\n\ncommand: dmute", _0x3c9194);
   }
 });
 async function haveEqualMembers(_0x1bb64b, _0x27114c) {
   if (_0x1bb64b.length !== _0x27114c.length) {
     return false;
   }
   _0x1bb64b = _0x1bb64b.sort();
   _0x27114c = _0x27114c.sort();
   for (let _0x1ee2a8 = 0; _0x1ee2a8 < _0x1bb64b.length; _0x1ee2a8++) {
     if (_0x1bb64b[_0x1ee2a8] !== _0x27114c[_0x1ee2a8]) {
       return false;
     }
   }
   return true;
 }
 smd({
   pattern: "antiword",
   desc: "Detects words from chat,and delete/warn senders.",
   category: "group",
   filename: __filename,
   use: "< action | words >"
 }, async (_0x6168a, _0x3887d9, {
   cmdName: _0x374b95
 }) => {
   try {
     if (!_0x6168a.isGroup) {
       return _0x6168a.reply(tlang().group);
     }
     if (!_0x6168a.isAdmin && !_0x6168a.isCreator) {
       return _0x6168a.reply(tlang().admin);
     }
     let _0x389bb3 = (await groupdb.findOne({
       id: _0x6168a.chat
     })) || (await groupdb.new({
       id: _0x6168a.chat,
       antiword: {
         status: "false",
         words: ""
       }
     }));
     let _0x29d72e = _0x3887d9 ? _0x3887d9.toLowerCase().trim() : false;
     let _0x560d69 = _0x389bb3.antiword;
     let _0x28a479 = "*Antiword Currently *" + (_0x560d69.status !== "false" ? "enabled" : "disabled") + "!!!* ```\n  STATUS: " + (_0x560d69.status ? _0x560d69.status : "--Empty Yet--") + " \n  WORDS: " + (_0x560d69.words ? _0x560d69.words.replace(/,/gi, " -- ") : "--Empty Yet--") + "```\n\n*Available Cmds:* ```\n  " + (prefix + _0x374b95) + " off \n  " + (prefix + _0x374b95) + " reset\n  " + (prefix + _0x374b95) + " warn | bad,words\n  " + (prefix + _0x374b95) + " delete | hot,badas\n``` \n\n\n " + Config.caption;
     if (!_0x29d72e || !_0x3887d9) {
       return await _0x6168a.send(_0x28a479);
     }
     let _0x13ed5b = _0x29d72e.split("|")[1] || "";
     let _0x2e720e = _0x29d72e.startsWith("on") || _0x29d72e.startsWith("act") || _0x29d72e.startsWith("enable") || _0x29d72e.startsWith("del") ? "delete" : _0x29d72e.startsWith("warn") ? "warn" : _0x29d72e.startsWith("off") || _0x29d72e.startsWith("deact") || _0x29d72e.startsWith("disable") ? "false" : _0x29d72e.startsWith("reset") ? "reset" : "";
     _0x2e720e = !_0x2e720e && _0x13ed5b && _0x560d69.status !== "false" ? _0x560d69.status : _0x2e720e;
     if (_0x2e720e === "reset") {
       await groupdb.updateOne({
         id: _0x6168a.chat
       }, {
         antiword: {}
       });
       return await _0x6168a.send("*_Anti_Word status cleard!_*");
     } else if (_0x2e720e === "delete" || _0x2e720e === "warn") {
       if (_0x560d69.status == _0x2e720e && !_0x13ed5b) {
         return await _0x6168a.send("*Please provide badWords, like " + (prefix + _0x374b95) + " " + _0x2e720e + " | bad,words");
       }
       _0x13ed5b = _0x13ed5b ? _0x13ed5b : _0x560d69.words;
       await groupdb.updateOne({
         id: _0x6168a.chat
       }, {
         antiword: {
           status: _0x2e720e,
           words: _0x13ed5b
         }
       });
       return await _0x6168a.send("*_Anti_Word succesfully set to '" + _0x2e720e + "' badward!_*\n*Antiwords are:```" + (_0x13ed5b ? _0x13ed5b.replace(/,/gi, " | ") : "--Empty Yet--") + "``` *");
     } else if (_0x2e720e === "false") {
       if (_0x560d69.status === _0x2e720e) {
         return await _0x6168a.send("*Anti_Word Already Disabled In Current Chat!*");
       }
       await groupdb.updateOne({
         id: _0x6168a.chat
       }, {
         antiword: {
           status: "false",
           words: _0x560d69.words
         }
       });
       return await _0x6168a.send("*Anti_Word Disable Succesfully!*");
     } else {
       return await _0x6168a.reply("*Uhh dear, Please follow instructions!!*\n\n" + _0x28a479);
     }
   } catch (_0x2dc616) {
     _0x6168a.error(_0x2dc616 + "\n\ncommand: antiword", _0x2dc616);
   }
 });
 smd({
   on: "main"
 }, async (_0x66e691, _0x18b590, {
   botNumber: _0x200f1c,
   isCreator: _0x55e42d,
   budy: _0x194884,
   body: _0x525b03,
   icmd: _0x497aa1
 }) => {
   try {
     if (Config.MsgsInLog === "true") {
       console.log("" + (_0x66e691.isGroup ? "[MESSAGE IN GROUP] From => " + _0x66e691.metadata.subject + "\n[USER]:" : "[MESSAGE IN PRIVATE] From =>") + (" " + _0x66e691.senderName + " " + _0x66e691.senderNum + "\n[" + _0x66e691.mtype.toUpperCase() + "]: " + _0x66e691.body + "\n============== [SMD] ================="));
     }
     let _0x44961e = (await groupdb.findOne({
       id: _0x66e691.chat
     })) || false;
     let _0x6ffee3 = false;
     try {
       if (!global.SmdOfficial && global.SmdOfficial !== "yes") {
         return;
       }
       if (_0x44961e && _0x44961e.antitag == "true" && !_0x66e691.checkBot() && _0x66e691.mtype !== "reactionMessage" && _0x44961e.botenable == "true") {
         const _0x3e79c4 = await haveEqualMembers(_0x66e691.metadata.participants.map(_0x3f5126 => _0x3f5126.id), _0x66e691.mentionedJid);
         if (_0x3e79c4 && _0x66e691.isBotAdmin) {
           let _0x3b25de = {
             reason: "tagging all members!",
             chat: _0x66e691.metadata?.subject || "GROUP",
             warnedby: tlang().title,
             date: _0x66e691.date
           };
           _0x6ffee3 = await warn.addwarn(_0x66e691.sender, _0x66e691.chat, _0x3b25de);
           await _0x66e691.reply("*_[TAG DETECTED] Hey @" + _0x66e691.senderNum + " warning!!_*\n*_Tagging all members is not allowed!_*", {
             mentions: [_0x66e691.sender]
           });
           await _0x66e691.delete();
         } else if (_0x3e79c4 && !_0x66e691.isBotAdmin) {
           await _0x66e691.reply("*_[TAGALL DETECTED] Can't do anything, without getting admin role!_*", {
             mentions: [_0x66e691.sender]
           });
         }
       }
       if (_0x44961e && _0x66e691.isGroup && !_0x66e691.isAdmin && !_0x55e42d && _0x66e691.mtype !== "reactionMessage" && _0x44961e.botenable == "true") {
         if (_0x44961e.antibot && _0x44961e.antibot !== "false" && _0x66e691.isBot && !_0x66e691.checkBot(_0x66e691.sender)) {
           if (_0x66e691.isBotAdmin) {
             var _0x37bbd7 = "*_Bot user not allowed, please make it private!_*";
             if (_0x44961e.antibot === "warn") {
               let _0x173526 = {
                 reason: "Bots not allowed!",
                 chat: _0x66e691.metadata?.subject || "GROUP",
                 date: _0x66e691.date
               };
               _0x6ffee3 = _0x6ffee3 ? _0x6ffee3 : await warn.addwarn(_0x66e691.sender, _0x66e691.chat, _0x173526);
               if (_0x6ffee3.status) {
                 _0x37bbd7 = "*_Hey @" + _0x66e691.senderNum + " warning, Due To Antibot!_*";
               }
             } else if (_0x44961e.antibot === "kick") {
               try {
                 sleep(1000);
                 await _0x66e691.bot.groupParticipantsUpdate(_0x66e691.chat, [_0x66e691.sender], "remove");
                 _0x37bbd7 = "*_User @" + _0x66e691.senderNum + " kick Due To Antibot!_*";
               } catch {}
             }
             await _0x66e691.delete();
             await _0x66e691.send(_0x37bbd7, {
               mentions: [_0x66e691.sender]
             });
           } else if (!_0x66e691.isBotAdmin && _0x66e691.isBot) {
             await _0x66e691.reply("*_Uhh Please, Provide Admin Role To Kick Other Bot_*\n*_Or Disable Antibot (On/Off) In Current Group_*");
           }
         }
         if (_0x44961e.onlyadmin && _0x44961e.onlyadmin === "true" && SmdOfficial == "yes") {
           var _0x37bbd7 = "";
           if (_0x66e691.isBotAdmin) {
             let _0xf6d63f = {
               reason: "Only Admin can Chat!",
               chat: _0x66e691.metadata?.subject || "PRIVATE",
               warnedby: tlang().title,
               date: _0x66e691.date
             };
             _0x6ffee3 = _0x6ffee3 ? _0x6ffee3 : await warn.addwarn(_0x66e691.sender, _0x66e691.chat, _0xf6d63f);
             if (_0x6ffee3.status) {
               _0x37bbd7 = "*Warns you for chat here!*\n";
             }
             await _0x66e691.delete();
             sleep(1500);
             await _0x66e691.send("*Hey @" + _0x66e691.senderNum + "* " + _0x37bbd7 + "*Deleteing message,while onlyadmin activated!!* ", {
               mentions: [_0x66e691.sender]
             });
           } else {
             await _0x66e691.send("*_Provide admin role to kick Message Senders_*\n*Or _Disable onlyadmin(on/off) in currentchat_*");
           }
         }
         if (_0x44961e.antilink && _0x44961e.antilink !== "false" && SmdOfficial === "yes") {
           const _0x50fcb6 = Config.antilink_values && Config.antilink_values !== "all" ? Config.antilink_values.split(",").filter(_0x5ce329 => _0x5ce329.trim() !== "") : ["https://", "chat.whatsapp.com", "fb.com"];
           let _0x408a2e = _0x525b03.toLowerCase();
           if (_0x50fcb6.some(_0x108249 => _0x408a2e.includes(_0x108249))) {
             if (!_0x66e691.isBotAdmin) {
               let _0x210672 = " *[LINK DETECTED]*\nUser @" + _0x66e691.sender.split("@")[0] + " detected sending a link.\nPromote " + Config.botname + " as admin to " + (_0x44961e.antilink === "kick" ? "kick \nlink senders." : "delete \nlinks from this Chat") + " \n";
               await _0x66e691.send(_0x210672, {
                 mentions: [_0x66e691.sender]
               });
             } else if (_0x44961e.antilink === "delete") {
               await _0x66e691.send("*_Link Detected.. Deletion Done!_*");
               await _0x66e691.delete();
             } else if (_0x44961e.antilink === "warn" || _0x44961e.antilink === "true") {
               let _0x15e6f6 = {
                 reason: "links not allowed!",
                 chat: _0x66e691.metadata?.subject || "PRIVATE",
                 warnedby: tlang().title,
                 date: _0x66e691.date
               };
               _0x6ffee3 = _0x6ffee3 ? _0x6ffee3 : await warn.addwarn(_0x66e691.sender, _0x66e691.chat, _0x15e6f6);
               var _0x37bbd7 = _0x6ffee3.status ? "*_[LINK DETECTED] Hey @" + _0x66e691.senderNum + " warning!!_*\n*_links not allowed in current group!_*" : "*_[LINK DETECTED]!_*";
               await _0x66e691.reply(_0x37bbd7, {
                 mentions: [_0x66e691.sender]
               });
               await _0x66e691.delete();
             } else if (_0x44961e.antilink === "kick") {
               await _0x66e691.send("*_Link Detected!!_*");
               try {
                 await _0x66e691.delete();
                 sleep(1500);
               } catch {
                 await _0x66e691.send("*Link Detected*\n" + tlang().botAdmin);
               }
             }
           }
         }
       }
     } catch (_0xa7452c) {
       console.log("Error From Antilinks : ", _0xa7452c);
     }
     var _0x62d481 = _0x44961e?.antiword || {
       status: "false"
     };
     if (_0x18b590.length > 1 && !_0x66e691.isBot && _0x62d481 && _0x62d481.status !== "false" && _0x62d481.words) {
       var _0x5d0456 = _0x62d481.words.split(",") || [];
       let _0x22c13d = false;
       _0x5d0456.map(async _0x21e061 => {
         if (_0x66e691.isAdmin || !global.SmdOfficial || global.SmdOfficial != "yes") {
           return;
         }
         let _0x52f3e7 = new RegExp("\\b" + _0x21e061?.trim() + "\\b", "ig");
         let _0x4b1f3b = _0x194884.toLowerCase();
         if (!_0x22c13d && _0x21e061 && _0x52f3e7.test(_0x4b1f3b)) {
           _0x22c13d = true;
           await sleep(500);
           try {
             var _0x1dcb0c = "";
             if (_0x62d481.status === "warn") {
               let _0x3f2717 = {
                 reason: "For using Bad Word",
                 chat: _0x66e691.metadata?.subject || "PRIVATE",
                 warnedby: tlang().title,
                 date: _0x66e691.date
               };
               _0x6ffee3 = _0x6ffee3 ? _0x6ffee3 : await warn.addwarn(_0x66e691.sender, _0x66e691.chat, _0x3f2717);
               if (_0x6ffee3.status) {
                 _0x1dcb0c = "\n*Warns you for using badWord!!*\n";
               }
             }
             if (_0x66e691.isBotAdmin) {
               await _0x66e691.send("*[BAD WORD DETECTED] Hey @" + _0x66e691.senderNum + "* " + _0x1dcb0c + "*Deleting your message from chat!*\n", {
                 mentions: [_0x66e691.sender]
               }, "suhail", _0x66e691);
               await _0x66e691.delete();
             } else {
               await _0x66e691.reply("*_[BAD WORD DETECTED] provide admin to take action!_*", {
                 mentions: [_0x66e691.sender]
               });
             }
           } catch (_0x549425) {
             console.log("Error From Bad Words : ", _0x549425);
           }
         }
       });
     }
     if (_0x6ffee3) {
       let _0x4f3cdf = parseInt(Config.warncount) || 3;
       if (_0x6ffee3.warning >= _0x4f3cdf) {
         if (_0x66e691.isGroup) {
           if (_0x66e691.isBotAdmin) {
             await _0x66e691.send("*_Hey @" + _0x66e691.senderNum + " Kicking you from group!_*\n*_Because Your warn limit exceed!_*", {
               mentions: [_0x66e691.sender]
             });
             await _0x66e691.bot.groupParticipantsUpdate(_0x66e691.chat, [_0x66e691.sender], "remove");
           }
         } else {
           await _0x66e691.send("*_Hey @" + _0x66e691.senderNum + " Blocking you!_*\n*_Because Your warn limit exceed!_*", {
             mentions: [_0x66e691.sender]
           });
           await _0x66e691.bot.updateBlockStatus(_0x66e691.sender, "block");
         }
       }
     }
     try {
       if (!global.SmdOfficial) {
         return;
       }
       let _0x53dd6f = (await groupdb.findOne({
         id: _0x66e691.chat
       })) || {
         chatbot: "false"
       };
       let _0x415677 = _0x53dd6f.chatbot || "false";
       if (_0x415677 === "true" && !_0x497aa1 && !_0x66e691.isBot && _0x66e691.text) {
         if (!_0x66e691.isGroup) {
           let {
             data: _0xfb123b
           } = await axios.get("http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[" + _0x66e691.sender.split("@")[0] + "]&msg=[" + _0x194884 + "]");
           return _0x66e691.send(_0xfb123b.cnt, {}, "suhail", _0x66e691);
         } else if (_0x66e691.isGroup && _0x66e691.quoted) {
           let _0x277118 = _0x66e691.quoted ? _0x66e691.quoted.sender : _0x66e691.mentionedJid[0] || false;
           if (_0x277118 && !_0x66e691.checkBot(_0x277118)) {
             return;
           }
           let {
             data: _0x3db7ce
           } = await axios.get("http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[" + _0x66e691.senderNum + "]&msg=[" + _0x66e691.text + "]");
           return _0x66e691.reply(_0x3db7ce.cnt);
         }
       }
     } catch (_0x31175f) {
       console.log("Error From ChatBot : ", _0x31175f);
     }
   } catch (_0x32e036) {
     console.log("Group Settings error in command.main() \n", _0x32e036);
   }
 });
 let users = {};
 let user_warns = {};
 smd({
   group: "add"
 }, async (_0x4e33ba, {
   Void: _0x9ec16f
 }) => {
   try {
     let _0x142cd5 = await groupdb.findOne({
       id: _0x4e33ba.chat
     });
     if (!_0x142cd5 || !_0x4e33ba.isGroup || _0x142cd5.botenable !== "true" || _0x4e33ba.blockJid || _0x4e33ba.fromMe) {
       return;
     }
     let _0x13d944 = _0x142cd5 && _0x142cd5.welcome ? _0x142cd5.welcome : "false";
     let _0x180b66 = _0x142cd5 && _0x142cd5.antifake ? _0x142cd5.antifake.toLowerCase() : "false";
     let _0x180e2a = _0x180b66.split(",");
     const _0x2a80ce = _0x180e2a.some(_0x35b08e => _0x4e33ba.user.startsWith(_0x35b08e));
     if (_0x180b66 !== "false" && !_0x2a80ce && !_0x4e33ba.isCreator) {
       if (_0x4e33ba.isBotAdmin) {
         try {
           await _0x4e33ba.kick();
           return await sendWelcome(_0x4e33ba, "*[ANTIFAKE START] @User kicked automaticaly!* @pp");
         } catch (_0x4aecac) {
           await _0x4e33ba.error(" Can't kick user in antifake\n❲❒❳ GROUP: " + _0x4e33ba.metadata.subject + "\n❲❒❳ ERROR: " + _0x4aecac + "\n", _0x4aecac, false);
         }
       } else {
         await _0x4e33ba.send("*[ANTI_FAKE ERROR] Need admin role to kick fake users!!*");
       }
     } else if (_0x13d944 === "true") {
       await sendWelcome(_0x4e33ba, _0x142cd5.welcometext);
     }
   } catch (_0x133867) {
     console.log("Error From Welcome : ", _0x133867);
   }
 });
 smd({
   group: "remove"
 }, async (_0x21f109, {
   Void: _0x43717a
 }) => {
   try {
     let _0x236b66 = (await groupdb.findOne({
       id: _0x21f109.chat
     })) || false;
     if (!_0x21f109 || !_0x236b66 || !_0x21f109.isGroup || _0x236b66.botenable !== "true" || _0x21f109.blockJid || _0x21f109.fromMe) {
       return;
     }
     let _0x5808b4 = _0x236b66 && _0x236b66.goodbye ? _0x236b66.goodbye : "false";
     if (_0x5808b4 === "true") {
       await sendWelcome(_0x21f109, _0x236b66.goodbyetext);
     }
   } catch (_0x557472) {
     console.log("Error From Goodbye : ", _0x557472);
   }
 });
 smd({
   group: "promote"
 }, async (_0x5ea9f3, {
   Void: _0x2a4da5
 }) => {
   try {
     let _0x292250 = (await groupdb.findOne({
       id: _0x5ea9f3.chat
     })) || false;
     if (!_0x292250 || !_0x5ea9f3.isGroup || _0x292250.botenable !== "true" || _0x5ea9f3.blockJid) {
       return;
     }
     if (!user_warns[_0x5ea9f3.sender]) {
       user_warns[_0x5ea9f3.sender] = {
         [_0x5ea9f3.action]: 1
       };
     } else {
       user_warns[_0x5ea9f3.sender][_0x5ea9f3.action]++;
     }
     let _0x544b2c;
     if (_0x292250.antipromote == "true" && !_0x5ea9f3.isCreator) {
       _0x544b2c = _0x5ea9f3.isBotAdmin ? false : true;
       if (users[_0x5ea9f3.sender] && users[_0x5ea9f3.sender].previous_Action === "antidemote") {
         delete users[_0x5ea9f3.sender];
         return;
       }
       if (_0x5ea9f3.isBotAdmin) {
         try {
           await _0x5ea9f3.demote();
           users[_0x5ea9f3.sender] = {
             previous_Action: "antipromote"
           };
           if (user_warns[_0x5ea9f3.sender][_0x5ea9f3.action] > 2) {
             return;
           }
           return await sendWelcome(_0x5ea9f3, "*[ANTIPROMOTE START] @User Demoted Automatically!* @pp ");
         } catch (_0x4dd76b) {
           await _0x5ea9f3.error(" Can't demote user in antipromote\n❲❒❳ GROUP: " + _0x5ea9f3.metadata.subject + "\n❲❒❳ ERROR: " + _0x4dd76b + "\n", _0x4dd76b, false);
         }
       }
     }
     if (_0x292250.pdm == "true" || _0x544b2c) {
       if (user_warns[_0x5ea9f3.sender][_0x5ea9f3.action] > 2) {
         return;
       }
       var _0x21a809 = " *[SOMEONE PROMOTE HERE]*\n" + (_0x544b2c ? "*Note : _I'm Not Admin Here, So I Can't Demote Someone while Anti_Promote Activated_*" : "") + "\n           \n  ❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Member -> Admin_ @pp\n  ❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n\n\n" + Config.caption;
       return await sendWelcome(_0x5ea9f3, _0x21a809);
     }
   } catch (_0x1b442a) {
     console.log("Error From Promote : ", _0x1b442a);
   }
 });
 smd({
   group: "demote"
 }, async (_0x30c0ac, {
   Void: _0x47ec3f
 }) => {
   try {
     let _0x2232d4 = (await groupdb.findOne({
       id: _0x30c0ac.chat
     })) || false;
     if (!_0x2232d4 || !_0x30c0ac.isGroup || _0x2232d4.botenable !== "true" || _0x30c0ac.blockJid) {
       return;
     }
     if (!user_warns[_0x30c0ac.sender]) {
       user_warns[_0x30c0ac.sender] = {
         [_0x30c0ac.action]: 1
       };
     } else {
       user_warns[_0x30c0ac.sender][_0x30c0ac.action]++;
     }
     let _0x8c24b1;
     if (_0x2232d4.antidemote == "true" && !_0x30c0ac.isCreator) {
       _0x8c24b1 = _0x30c0ac.isBotAdmin ? false : true;
       if (users[_0x30c0ac.sender] && users[_0x30c0ac.sender].previous_Action === "antipromote") {
         delete users[_0x30c0ac.sender];
         return;
       }
       if (_0x30c0ac.isBotAdmin) {
         try {
           await _0x30c0ac.promote();
           users[_0x30c0ac.sender] = {
             previous_Action: "antidemote"
           };
           if (user_warns[_0x30c0ac.sender][_0x30c0ac.action] > 2) {
             return;
           }
           return await sendWelcome(_0x30c0ac, "*[ANTIPROMOTE START] User promote automatically!* @pp ");
         } catch (_0x176ad1) {
           await _0x30c0ac.error(" Can't promote user in antidemote\n❲❒❳ GROUP: " + _0x30c0ac.metadata.subject + "\n❲❒❳ ERROR: " + _0x176ad1 + "\n", _0x176ad1, false);
         }
       }
     }
     if (_0x2232d4.pdm == "true" || _0x8c24b1) {
       if (user_warns[_0x30c0ac.sender][_0x30c0ac.action] > 2) {
         return;
       }
       var _0x4c36ca = " *[SOMEONE DEMOTE HERE]*\n  " + (_0x8c24b1 ? "*Note : _I'm Not Admin Here, So I Can't promote Someone while Anti_Demote Activated_*" : "") + "\n\n  ❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Admin -> Member_ @pp\n  ❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n  \n\n" + Config.caption;
       return await sendWelcome(_0x30c0ac, _0x4c36ca);
     }
   } catch (_0x432908) {
     console.log("Error From Demote : ", _0x432908);
   }
 });