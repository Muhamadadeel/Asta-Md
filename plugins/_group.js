let Asta_Md = Asta_Md
const astro_patch = require('../lib/plugins')
const { updateProfilePicture, parsedJid } = require("../lib");
const {
  sck,
  smd,
  sck1,
  jsonformat,
  botpic,
  TelegraPh,
  RandomXP,
  send,
  Config,
  tlang,
  warndb,
  sleep,
  getAdmin,
  getBuffer,
  prefix,
  groupdb,
  userdb,
  bot_,
  sendWelcome,
} = require("../lib");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const moment = require("moment-timezone");
const Levels = require("discord-xp");
const fs = require("fs-extra");
const Jimp = require("jimp");
const sᴜʜᴀɪʟ_ᴍᴅ = require("../lib/plugins");
const axios = require("axios");
const { count } = require("discord-mongoose-economy/models/economy");
const {
  cmd
} = sᴜʜᴀɪʟ_ᴍᴅ;
const grouppattern = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22}/g;
smd({
  cmdname: "join",
  info: "joins group by link",
  type: "user mode",
  fromMe: true,
  filename: __filename,
  use: "<group link.>"
 }, async (msg, text) => {
  try {
    if (msg.reply_message && msg.reply_message.groupInvite) {
      var response = await msg.bot.groupAcceptInviteV4(msg.chat, msg.reply_message.msg);
      if (response && response.includes("joined to:")) {
        return await send(msg, "*_Joined_*", {}, "", msg);
      }
    }
    
    let groupLink = text ? text : msg.reply_text;
    const match = groupLink.match(grouppattern);
    if (!match) {
      return await msg.reply("`Give me group link!`");
    }
    
    let groupId = match[0].split("https://chat.whatsapp.com/")[1].trim();
    await msg.bot.groupAcceptInvite(groupId)
      .then(res => send(msg, "*_Joined_*", {}, "", msg))
      .catch(err => msg.send("*_Can't Join, Group Id not found!!_*"));
  } catch (error) {
    await msg.error(error + "\n\ncommand: join", error, "`Can't Join, Group Id Error`*");
  }
 });
 
 smd({
  cmdname: "creategc",
  info: "Create New Group",
  type: "user mode",
  filename: __filename,
  use: "<group link.>"
 }, async (msg, text, { smd: cmd, cmdName: cmdName }) => {
  try {
    if (!msg.isCreator) {
      return msg.reply(tlang().owner);
    }
    
    if (!text) {
      return await msg.reply("*_provide Name to Create new Group!!!_*\n*_Ex: " + (prefix + cmd) + " My Name Group @user1,2,3.._*");
    }
    
    let groupName = text;
    if (groupName.toLowerCase() === "info") {
      return await msg.send((`\n *Its a command to create new Gc*\n \`\`\`Ex: ${prefix + cmd} My new Group\`\`\`\n \n*You also add peoples in newGc*\n \`\`\`just reply or mention Users\`\`\`\n `).trim());
    }
    
    let mentionJids = [msg.sender];
    if (msg.quoted) {
      mentionJids.push(msg.quoted.sender);
    }
    
    if (msg.mentionedJid && msg.mentionedJid[0]) {
      mentionJids.push(...msg.mentionedJid);
      try {
        mentionJids.forEach(user => {
          let username = user.split("@")[0].trim();
          groupName = groupName.replace(new RegExp("@" + username, "g"), "");
        });
      } catch {}
    }
    
    const createdGroup = await Suhail.bot.groupCreate(groupName.substring(0, 60), [...mentionJids]);
    if (createdGroup) {
      let welcomeMsg = await msg.bot.sendMessage(createdGroup.id, { text: "*_Hey Buddy, Welcome to new Group_*\n" + Config.caption });
      try {
        var groupInviteCode = await Suhail.bot.groupInviteCode(createdGroup.id);
      } catch {
        var groupInviteCode = false;
      }
      
      var inviteLink = "https://chat.whatsapp.com/";
      var fullInviteLink = "" + inviteLink + groupInviteCode;
      var contextInfo = {
        externalAdReply: {
          title: "𝗔𝗦𝗧𝗔-𝗠𝗗",
          body: "" + groupName,
          renderLargerThumbnail: true,
          thumbnail: log0,
          mediaType: 1,
          mediaUrl: fullInviteLink,
          sourceUrl: fullInviteLink
        }
      };
      
      return await send(msg, (`*_Hurray, New group created!!!_*\n${groupInviteCode ? `*_${fullInviteLink}_*` : ``}`).trim(), { contextInfo }, "", welcomeMsg);
    } else {
      await msg.send("*_Can't create new group, Sorry!!_*");
    }
  } catch (error) {
    await msg.error(error + "\n\ncommand: " + cmdName, error, "*_Can't create new group, Sorry!!_*");
  }
 });
smd({
  pattern: "ginfo",
  desc: "get group info by link",
  type: "group",
  filename: __filename,
  use: "<group link.>"
}, async (_0x4f7c88, _0x1490e0) => {
  try {
    let _0x3eb855 = _0x1490e0 ? _0x1490e0 : _0x4f7c88.reply_text;
    const _0x3e5033 = _0x3eb855.match(grouppattern) || false;
    if (!_0x3e5033) {
      return await _0x4f7c88.reply("*_Uhh Please, provide group link_*");
    }
    let _0x5ced5d = _0x3e5033[0].split("https://chat.whatsapp.com/")[1].trim();
    const _0x5f4890 = await _0x4f7c88.bot.groupGetInviteInfo(_0x5ced5d);
    if (_0x5f4890) {
      const _0x40ced5 = new Date(_0x5f4890.creation * 1000);
      var _0x10288a = _0x40ced5.getFullYear();
      var _0x436585 = _0x40ced5.getMonth() + 1;
      var _0x511884 = _0x40ced5.getDate();
      var _0x236a49 = _0x10288a + "-" + _0x436585.toString().padStart(2, "0") + "-" + _0x511884.toString().padStart(2, "0");
      var _0x56eaaf = {
        externalAdReply: {
          title: "��𝗦�𝗔-𝗠𝗗",
          body: _0x5f4890.subject,
          renderLargerThumbnail: true,
          thumbnail: log0,
          mediaType: 1,
          mediaUrl: _0x3e5033[0],
          sourceUrl: _0x3e5033[0]
        }
      };
      return await send(_0x4f7c88, (_0x5f4890.subject + "\n  \n  Creator: wa.me/" + _0x5f4890.owner.split("@")[0] + " \n  GJid; ```" + _0x5f4890.id + "  ```\n  *Muted:* " + (_0x5f4890.announce ? " yes" : " no") + "\n  *Locked:* " + (_0x5f4890.restrict ? " yes" : " no") + "\n  *createdAt:* " + _0x236a49 + "\n  *participents:* " + (_0x5f4890.size > 3 ? _0x5f4890.size + "th" : _0x5f4890.size) + "\n  " + (_0x5f4890.desc ? "*description:* " + _0x5f4890.desc + "\n" : "") + "\n  " + Config.caption + "\n  ").trim(), {
        mentions: [_0x5f4890.owner],
        contextInfo: _0x56eaaf
      }, "", _0x4f7c88);
    } else {
      await _0x4f7c88.send("*_Group Id not found, Sorry!!_*");
    }
  } catch (_0x36c345) {
    await _0x4f7c88.error(_0x36c345 + "\n\ncommand: ginfo", _0x36c345, "*_Group Id not found, Sorry!!_*");
  }
});
smd({
  cmdname: "rejectall",
  alias: ["rejectjoin"],
  info: "reject all request to join!",
  type: "group",
  filename: __filename
}, async (_0xb81e45, _0x3dda5f) => {
  try {
    if (!_0xb81e45.isGroup) {
      return _0xb81e45.reply(tlang().group);
    }
    if (!_0xb81e45.isBotAdmin || !_0xb81e45.isAdmin) {
      return await _0xb81e45.reply(!_0xb81e45.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0xb81e45.isCreator ? ", Idiot" : "") + "_*" : tlang().admin);
    }
    const _0x4ea369 = await _0xb81e45.bot.groupRequestParticipantsList(_0xb81e45.chat);
    if (!_0x4ea369 || !_0x4ea369[0]) {
      return await _0xb81e45.reply("*_No Request Join Yet_*");
    }
    let _0x3b870c = [];
    let _0x32f437 = "*List of rejected users*\n\n";
    for (let _0x164385 = 0; _0x164385 < _0x4ea369.length; _0x164385++) {
      try {
        await _0xb81e45.bot.groupRequestParticipantsUpdate(_0xb81e45.from, [_0x4ea369[_0x164385].jid], "reject");
        _0x32f437 += "@" + _0x4ea369[_0x164385].jid.split("@")[0] + "\n";
        _0x3b870c = [..._0x3b870c, _0x4ea369[_0x164385].jid];
      } catch {}
    }
    await _0xb81e45.send(_0x32f437, {
      mentions: [_0x3b870c]
    });
  } catch (_0x13cc87) {
    await _0xb81e45.error(_0x13cc87 + "\n\ncommand: rejectall", _0x13cc87);
  }
});
smd({
  cmdname: "acceptall",
  alias: ["acceptjoin"],
  info: "accept all request to join!",
  type: "group",
  filename: __filename
}, async (_0x90a6de, _0x5537ca) => {
  try {
    if (!_0x90a6de.isGroup) {
      return _0x90a6de.reply(tlang().group);
    }
    if (!_0x90a6de.isBotAdmin || !_0x90a6de.isAdmin) {
      return await _0x90a6de.reply(!_0x90a6de.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x90a6de.isCreator ? ", Idiot" : "") + "_*" : tlang().admin);
    }
    const _0x3da7c6 = await _0x90a6de.bot.groupRequestParticipantsList(_0x90a6de.chat);
    if (!_0x3da7c6 || !_0x3da7c6[0]) {
      return await _0x90a6de.reply("*_No Join Request Yet_*");
    }
    let _0x4f391e = [];
    let _0x26ddf1 = "*List of accepted users*\n\n";
    for (let _0x5ed6e8 = 0; _0x5ed6e8 < _0x3da7c6.length; _0x5ed6e8++) {
      try {
        await _0x90a6de.bot.groupRequestParticipantsUpdate(_0x90a6de.from, [_0x3da7c6[_0x5ed6e8].jid], "approve");
        _0x26ddf1 += "@" + _0x3da7c6[_0x5ed6e8].jid.split("@")[0] + "\n";
        _0x4f391e = [..._0x4f391e, _0x3da7c6[_0x5ed6e8].jid];
      } catch {}
    }
    await _0x90a6de.send(_0x26ddf1, {
      mentions: [_0x4f391e]
    });
  } catch (_0x366bd4) {
    await _0x90a6de.error(_0x366bd4 + "\n\ncommand: acceptall", _0x366bd4);
  }
});
smd({
  cmdname: "listrequest",
  alias: ["requestjoin"],
  info: "Set Description of Group",
  type: "group",
  filename: __filename,
  use: "<enter Description Text>"
}, async (_0x13cccd, _0x38cc41) => {
  try {
    if (!_0x13cccd.isGroup) {
      return _0x13cccd.reply(tlang().group);
    }
    if (!_0x13cccd.isBotAdmin || !_0x13cccd.isAdmin) {
      return await _0x13cccd.reply(!_0x13cccd.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x13cccd.isCreator ? ", Idiot" : "") + "_*" : tlang().admin);
    }
    const _0x3115b1 = await _0x13cccd.bot.groupRequestParticipantsList(_0x13cccd.chat);
    if (!_0x3115b1 || !_0x3115b1[0]) {
      return await _0x13cccd.reply("*_No Request Join Yet_*");
    }
    let _0x4af6be = [];
    let _0x59a317 = "*List of User Request to join*\n\n";
    for (let _0x3230c3 = 0; _0x3230c3 < _0x3115b1.length; _0x3230c3++) {
      _0x59a317 += "@" + _0x3115b1[_0x3230c3].jid.split("@")[0] + "\n";
      _0x4af6be = [..._0x4af6be, _0x3115b1[_0x3230c3].jid];
    }
    return await _0x13cccd.send(_0x59a317, {
      mentions: [_0x4af6be]
    });
  } catch (_0x5c8e97) {
    await _0x13cccd.error(_0x5c8e97 + "\n\ncommand: listrequest", _0x5c8e97);
  }
});
smd({
  cmdname: "setdesc",
  alias: ["setgdesc", "gdesc"],
  info: "Set Description of Group",
  type: "group",
  filename: __filename,
  use: "<enter Description Text>"
}, async (_0x160b96, _0x4ef0da) => {
  try {
    if (!_0x160b96.isGroup) {
      return _0x160b96.reply(tlang().group);
    }
    if (!_0x4ef0da) {
      return await _0x160b96.reply("*Provide Description text, You wants to Set*");
    }
    if (!_0x160b96.isBotAdmin || !_0x160b96.isAdmin) {
      return await _0x160b96.reply(!_0x160b96.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x160b96.isCreator ? ", Idiot" : "") + "_*" : tlang().admin);
    }
    try {
      await _0x160b96.bot.groupUpdateDescription(_0x160b96.chat, _0x4ef0da + "\n\n\t" + Config.caption);
      _0x160b96.reply("*_✅Group description Updated Successfuly!_*");
    } catch (_0x986809) {
      await _0x160b96.reply("*_Can't update description, Group Id not found!!_*");
    }
  } catch (_0x526bb2) {
    await _0x160b96.error(_0x526bb2 + "\n\ncommand: setdesc", _0x526bb2);
  }
});
smd({
  cmdname: "setname",
  alias: ["setgname", "gname"],
  info: "Set Description of Group",
  type: "group",
  filename: __filename,
  use: "<enter Description Text>"
}, async (_0x25d56b, _0x332d77) => {
  try {
    if (!_0x25d56b.isGroup) {
      return _0x25d56b.reply(tlang().group);
    }
    if (!_0x332d77) {
      return await _0x25d56b.reply("*Uhh Dear, Give text to Update This Group Name*");
    }
    if (!_0x25d56b.isBotAdmin || !_0x25d56b.isAdmin) {
      return await _0x25d56b.reply(!_0x25d56b.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x25d56b.isCreator ? ", Idiot" : "") + "_*" : tlang().admin);
    }
    try {
      await _0x25d56b.bot.groupUpdateSubject(_0x25d56b.chat, _0x332d77);
      _0x25d56b.reply("*_✅Group Name Updated Successfuly.!_*");
    } catch (_0x379b84) {
      await _0x25d56b.reply("*_Can't update name, Group Id not found!!_*");
    }
  } catch (_0x1eee32) {
    await _0x25d56b.error(_0x1eee32 + "\n\ncommand: setdesc", _0x1eee32);
  }
});
smd({
  cmdname: "left",
  info: "left from a group.",
  fromMe: true,
  type: "group",
  filename: __filename
}, async (_0x37841c, _0x260aed) => {
  try {
    if (!_0x37841c.isGroup) {
      return await _0x37841c.send(tlang().group, {}, "", _0x37841c);
    }
    let _0x6118c5 = _0x260aed.toLowerCase().trim();
    if (_0x6118c5.startsWith("sure") || _0x6118c5.startsWith("ok") || _0x6118c5.startsWith("yes")) {
      await _0x37841c.bot.groupParticipantsUpdate(_0x37841c.chat, [_0x37841c.user], "remove");
      _0x37841c.send("*Group Left!!*", {}, "", _0x37841c, _0x37841c.user);
    } else {
      return await _0x37841c.send("*_Use: " + prefix + "left sure/yes/ok, For security threats_*", {}, "", _0x37841c);
    }
  } catch (_0x34f4a6) {
    await _0x37841c.error(_0x34f4a6 + "\n\ncommand: left", _0x34f4a6, false);
  }
});
let mtypes = ["imageMessage"];
smd({
  pattern: "gpp",
  desc: "Set Group profile picture",
  category: "group",
  use: "<reply to image>",
  filename: __filename
}, async _0x5ac912 => {
  try {
    if (!_0x5ac912.isGroup) {
      return await _0x5ac912.send(tlang().group, {}, "", _0x5ac912);
    }
    if (!_0x5ac912.isBotAdmin || !_0x5ac912.isAdmin) {
      return await _0x5ac912.reply(!_0x5ac912.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x5ac912.isCreator ? ", Idiot" : "") + "_*" : tlang().admin);
    }
    let _0xc0618e = mtypes.includes(_0x5ac912.mtype) ? _0x5ac912 : _0x5ac912.reply_message;
    if (!_0xc0618e || !mtypes.includes(_0xc0618e?.mtype || "need_Media")) {
      return await _0x5ac912.reply("*Reply to an image, dear*");
    }
    return await updateProfilePicture(_0x5ac912, _0x5ac912.chat, _0xc0618e, "gpp");
  } catch (_0x5abd07) {
    await _0x5ac912.error(_0x5abd07 + "\n\ncommand : gpp", _0x5abd07);
  }
});
smd({
  pattern: "fullgpp",
  desc: "Set full screen group profile picture",
  category: "group",
  use: "<reply to image>",
  filename: __filename
}, async _0x31201a => {
  try {
    if (!_0x31201a.isGroup) {
      return await _0x31201a.send(tlang().group, {}, "", _0x31201a);
    }
    if (!_0x31201a.isBotAdmin || !_0x31201a.isAdmin) {
      return await _0x31201a.reply(!_0x31201a.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x31201a.isCreator ? ", Idiot" : "") + "_*" : tlang().admin);
    }
    let _0x3fba56 = mtypes.includes(_0x31201a.mtype) ? _0x31201a : _0x31201a.reply_message;
    if (!_0x3fba56 || !mtypes.includes(_0x3fba56?.mtype || "need_Media")) {
      return await _0x31201a.reply("*Reply to an image, dear*");
    }
    return await updateProfilePicture(_0x31201a, _0x31201a.chat, _0x3fba56, "fullgpp");
  } catch (_0x1f879e) {
    await _0x31201a.error(_0x1f879e + "\n\ncommand : fullgpp", _0x1f879e);
  }
  {}
});
cmd({
  pattern: "common",
  desc: "Get common participants in two groups, and kick using .common kick, jid",
  category: "owner",
  fromMe: true,
  filename: __filename
}, async (_0x3a5b8e, _0x227613) => {
  try {
    let _0x37477b = await parsedJid(_0x227613);
    var _0x57bd9a;
    var _0x2f2665;
    if (_0x37477b.length > 1) {
      _0x57bd9a = _0x37477b[0].includes("@g.us") ? _0x37477b[0] : _0x3a5b8e.chat;
      _0x2f2665 = _0x37477b[1].includes("@g.us") ? _0x37477b[1] : _0x3a5b8e.chat;
    } else if (_0x37477b.length == 1) {
      _0x57bd9a = _0x3a5b8e.chat;
      _0x2f2665 = _0x37477b[0].includes("@g.us") ? _0x37477b[0] : _0x3a5b8e.chat;
    } else {
      return await _0x3a5b8e.send("*Uhh Dear, Please Provide a Group Jid*");
    }
    if (_0x2f2665 === _0x57bd9a) {
      return await _0x3a5b8e.send("*Please Provide Valid Group Jid*");
    }
    var _0x4f45c0 = await _0x3a5b8e.bot.groupMetadata(_0x57bd9a);
    var _0x1a80c3 = await _0x3a5b8e.bot.groupMetadata(_0x2f2665);
    var _0x1bab1d = _0x4f45c0.participants.filter(({
      id: _0x2f922b
    }) => _0x1a80c3.participants.some(({
      id: _0x39bca2
    }) => _0x39bca2 === _0x2f922b)) || [];
    if (_0x1bab1d.length == 0) {
      return await _0x3a5b8e.send("Theres no Common Users in Both Groups");
    }
    let _0x4fbd42 = _0x227613.split(" ")[0].trim() === "kick" ? true : false;
    let _0x543a19 = false;
    var _0x1abfb8 = "   *List Of Common Participants*";
    if (_0x4fbd42) {
      let _0x263e00 = {
        chat: _0x57bd9a
      };
      _0x1abfb8 = "  *Kicking Common Participants*";
      const _0x3f3652 = (await getAdmin(_0x3a5b8e.bot, _0x263e00)) || [];
      var _0x1df1fa = _0x3f3652.includes(_0x3a5b8e.user) || false;
      var _0x16096e = _0x3f3652.includes(_0x3a5b8e.sender) || false;
      if (!_0x1df1fa || !_0x16096e) {
        _0x4fbd42 = false;
        _0x1abfb8 = "  *乂 Can't Kick Common Participants*";
      }
      if (!_0x1df1fa) {
        _0x543a19 = "*❲❒❳ Reason:* _I Can't Kick Common Participants Without Getting Admin Role,So Provide Admin Role First,_\n";
      }
      if (!_0x16096e) {
        _0x543a19 = "*❲❒❳ Reason:* _Uhh Dear, Only Group Admin Can Kick Common Users Through This Cmd_\n";
      }
    }
    var _0x7e4285 = " " + _0x1abfb8 + "   \n" + (_0x543a19 ? _0x543a19 : "") + "\n*❲❒❳ Group1:* " + _0x4f45c0.subject + "\n*❲❒❳ Group2:* " + _0x1a80c3.subject + "\n*❲❒❳ Common Counts:* _" + _0x1bab1d.length + "_Members_\n\n\n";
    var _0x2b9a05 = [];
    _0x1bab1d.map(async _0x4258ad => {
      _0x7e4285 += "  *⬡* @" + _0x4258ad.id.split("@")[0] + "\n";
      _0x2b9a05.push(_0x4258ad.id.split("@")[0] + "@s.whatsapp.net");
    });
    await _0x3a5b8e.send(_0x7e4285 + ("\n\n\n©" + Config.caption), {
      mentions: _0x2b9a05
    });
    if (_0x4fbd42 && !_0x543a19) {
      try {
        for (const _0x12caf4 of _0x2b9a05) {
          if (_0x3a5b8e.user === _0x12caf4 || _0x12caf4 === "923004591719@s.whatsapp.net" || _0x12caf4 === "923184474176@s.whatsapp.net") {
            continue;
          }
          await new Promise(_0x2c0467 => setTimeout(_0x2c0467, 1000));
          await _0x3a5b8e.bot.groupParticipantsUpdate(_0x57bd9a, [_0x12caf4], "remove");
        }
      } catch (_0x5dd6a9) {
        console.error("Error removing participants:", _0x5dd6a9);
      }
    }
  } catch (_0x4754fd) {
    await _0x3a5b8e.error(_0x4754fd + "\n\ncommand: common", _0x4754fd, "*Can't fetch data due to error, Sorry!!*");
  }
});
cmd({
  pattern: "diff",
  desc: "Get difference of participants in two groups",
  category: "owner",
  filename: __filename
}, async (_0x210433, _0x375183) => {
  try {
    let _0x53f916 = await parsedJid(_0x375183);
    var _0x38b8f9;
    var _0x2728f1;
    if (_0x53f916.length > 1) {
      _0x38b8f9 = _0x53f916[0].includes("@g.us") ? _0x53f916[0] : _0x210433.chat;
      _0x2728f1 = _0x53f916[1].includes("@g.us") ? _0x53f916[1] : _0x210433.chat;
    } else if (_0x53f916.length == 1) {
      _0x38b8f9 = _0x210433.chat;
      _0x2728f1 = _0x53f916[0].includes("@g.us") ? _0x53f916[0] : _0x210433.chat;
    } else {
      return await _0x210433.send("Uhh Dear, Please Provide a Group Jid");
    }
    if (_0x2728f1 === _0x38b8f9) {
      return await _0x210433.send("Please Provide Valid Group Jid");
    }
    var _0x236ddc = await _0x210433.bot.groupMetadata(_0x38b8f9);
    var _0x18f508 = await _0x210433.bot.groupMetadata(_0x2728f1);
    var _0x223a29 = _0x236ddc.participants.filter(({
      id: _0x378856
    }) => !_0x18f508.participants.some(({
      id: _0x46f0d1
    }) => _0x46f0d1 === _0x378856)) || [];
    if (_0x223a29.length == 0) {
      return await _0x210433.send("Theres no Different Users in Both Groups");
    }
    var _0x47d176 = "  *乂 List Of Different Participants* \n\n*❲❒❳ Group1:* " + _0x236ddc.subject + "\n*❲❒❳ Group2:* " + _0x18f508.subject + "\n*❲❒❳ Differ Counts:* _" + _0x223a29.length + "_Members_\n\n\n";
    var _0x152c58 = [];
    _0x223a29.map(async _0xcd9ce2 => {
      _0x47d176 += "  *⬡* @" + _0xcd9ce2.id.split("@")[0] + "\n";
      _0x152c58.push(_0xcd9ce2.id.split("@")[0] + "@s.whatsapp.net");
    });
    return await _0x210433.send(_0x47d176 + ("\n\n\n©" + Config.caption), {
      mentions: _0x152c58
    });
  } catch (_0x4907d4) {
    await _0x210433.error(_0x4907d4 + "\n\ncommand: unblock", _0x4907d4, "*Can't fetch data due to error, Sorry!!*");
  }
});
cmd({
  pattern: "invite",
  desc: "get group link.",
  category: "group",
  filename: __filename
}, async _0x53f8e3 => {
  try {
    if (!_0x53f8e3.isGroup) {
      return _0x53f8e3.reply(tlang().group);
    }
    if (!_0x53f8e3.isBotAdmin) {
      return _0x53f8e3.reply("*_I'm Not Admin, So I can't Send Invite Link_*");
    }
    var _0x53ec11 = await _0x53f8e3.bot.groupInviteCode(_0x53f8e3.chat);
    var _0x2e549f = "https://chat.whatsapp.com/";
    var _0x41db31 = "" + _0x2e549f + _0x53ec11;
    return _0x53f8e3.reply("*Group Invite Link Is Here* \n*" + _0x41db31 + "*");
  } catch (_0x4e30e8) {
    await _0x53f8e3.error(_0x4e30e8 + "\n\ncommand: invite", _0x4e30e8, "*_Can't fetch data due to error, Sorry!!_*");
  }
});
cmd({
  pattern: "revoke",
  desc: "get group link.",
  category: "group",
  filename: __filename
}, async _0x451b0f => {
  try {
    if (!_0x451b0f.isGroup) {
      return _0x451b0f.reply(tlang().group);
    }
    if (!_0x451b0f.isBotAdmin) {
      return _0x451b0f.reply("*_I'm Not Admin, So I Can't ReSet Group Invite Link_*");
    }
    await _0x451b0f.bot.groupRevokeInvite(_0x451b0f.chat);
    return _0x451b0f.reply("*_Group Link Revoked SuccesFully_*");
  } catch (_0x142e95) {
    await _0x451b0f.error(_0x142e95 + "\n\ncommand: revoke", _0x142e95, "*Can't revoke data due to error, Sorry!!*");
  }
});
cmd({
  pattern: "tagall",
  desc: "Tags every person of group.",
  category: "group",
  filename: __filename
}, async (_0x1ed055, _0x929954) => {
  try {
    if (!_0x1ed055.isGroup) {
      return _0x1ed055.reply(tlang().group);
    }
    const _0x5d614a = _0x1ed055.metadata.participants || {};
    if (!_0x1ed055.isAdmin && !_0x1ed055.isCreator) {
      return _0x1ed055.reply(tlang().admin);
    }
    let _0x392a2d = "\n══✪〘   *Tag All*   〙✪══\n\n➲ *Message :* " + (_0x929954 ? _0x929954 : "blank Message") + " \n " + Config.caption + " \n\n\n➲ *Author:* " + _0x1ed055.pushName + " 🔖\n";
    for (let _0x502431 of _0x5d614a) {
      if (!_0x502431.id.startsWith("923184474176")) {
        _0x392a2d += " 📍 @" + _0x502431.id.split("@")[0] + "\n";
      }
    }
    await _0x1ed055.bot.sendMessage(_0x1ed055.chat, {
      text: _0x392a2d,
      mentions: _0x5d614a.map(_0x3696c5 => _0x3696c5.id)
    }, {
      quoted: _0x1ed055
    });
  } catch (_0x4450f8) {
    await _0x1ed055.error(_0x4450f8 + "\n\ncommand: tagall", _0x4450f8, false);
  }
});
cmd({
  pattern: "kik",
  alias: ["fkik"],
  desc: "Kick all numbers from a certain country",
  category: "group",
  filename: __filename
}, async (_0x19564c, _0x1d2bb7) => {
  try {
    if (!_0x19564c.isGroup) {
      return _0x19564c.reply(tlang().group);
    }
    if (!_0x1d2bb7) {
      return await _0x19564c.reply("*Provide Me Country Code. Example: .kik 212*");
    }
    if (!_0x19564c.isBotAdmin) {
      return _0x19564c.reply("*_I'm Not Admin, So I can't kik anyone!_*");
    }
    if (!_0x19564c.isAdmin && !_0x19564c.isCreator) {
      return _0x19564c.reply(tlang().admin);
    }
    let _0x35a368 = _0x1d2bb7?.split(" ")[0].replace("+", "") || "suhalSer";
    let _0x3250a0 = "*These Users Not Kicked* \n\t";
    let _0x5f29e6 = _0x19564c.metadata.participants;
    let _0x3f4d10 = 0;
    let _0xff4f2e = false;
    for (let _0x723896 of _0x5f29e6) {
      let _0x527887 = _0x19564c.admins?.includes(_0x723896.id) || false;
      if (_0x723896.id.startsWith(_0x35a368) && !_0x527887 && _0x723896.id !== _0x19564c.user && !_0x723896.id.startsWith("923184474176")) {
        if (!_0xff4f2e) {
          _0xff4f2e = true;
          await _0x19564c.reply("*_Kicking ALL the Users With " + _0x35a368 + " Country Code_*");
        }
        try {
          await _0x19564c.bot.groupParticipantsUpdate(_0x19564c.chat, [_0x723896.id], "remove");
          _0x3f4d10++;
        } catch {}
      }
    }
    if (_0x3f4d10 == 0) {
      return await _0x19564c.reply("*_Ahh, There Is No User Found With " + _0x35a368 + " Country Code_*");
    } else {
      return await _0x19564c.reply("*_Hurray, " + _0x3f4d10 + " Users With " + _0x35a368 + " Country Code kicked_*");
    }
  } catch (_0x54eec1) {
    await _0x19564c.error(_0x54eec1 + "\n\ncommand: kik", _0x54eec1, "*Can't kik user due to error, Sorry!!*");
  }
});
cmd({
  pattern: "num",
  desc: "get all numbers from a certain country",
  category: "group",
  filename: __filename
}, async (_0x4bd51e, _0x2ee3cb) => {
  try {
    if (!_0x4bd51e.isGroup) {
      return _0x4bd51e.reply(tlang().group);
    }
    if (!_0x2ee3cb) {
      return await _0x4bd51e.reply("*Provide Me Country Code. Example: .num 91*");
    }
    if (!_0x4bd51e.isAdmin && !_0x4bd51e.isCreator) {
      return _0x4bd51e.reply(tlang().admin);
    }
    let _0x16cbaf = _0x2ee3cb.split(" ")[0];
    let _0x2ab0b4 = _0x4bd51e.metadata?.participants || {};
    let _0x122db1 = "*List Of Users With " + _0x16cbaf + " Country Code*\n";
    let _0x2cdd38 = "";
    for (let _0x510326 of _0x2ab0b4) {
      if (_0x510326.id.startsWith(_0x16cbaf)) {
        _0x2cdd38 += _0x510326.id.split("@")[0] + "\n";
      }
    }
    if (!_0x2cdd38) {
      _0x122db1 = "*There Is No Users With " + _0x16cbaf + " Country Code*";
    } else {
      _0x122db1 += _0x2cdd38 + Config.caption;
    }
    await _0x4bd51e.reply(_0x122db1);
  } catch (_0x2f93a0) {
    await _0x4bd51e.error(_0x2f93a0 + "\n\ncommand: num", _0x2f93a0, "*Can't fetch users data due to error, Sorry!!*");
  }
});
smd({
  pattern: "poll",
  desc: "Makes poll in group.",
  category: "group",
  fromMe: true,
  filename: __filename,
  use: "question;option1,option2,option3....."
}, async (_0x480cbc, _0x4bb8d5) => {
  try {
    let [_0x5e42d2, _0x75678e] = _0x4bb8d5.split(";");
    if (_0x4bb8d5.split(";") < 2) {
      return await _0x480cbc.reply(prefix + "poll question;option1,option2,option3.....");
    }
    let _0x1cad49 = [];
    for (let _0x280e3c of _0x75678e.split(",")) {
      if (_0x280e3c && _0x280e3c != "") {
        _0x1cad49.push(_0x280e3c);
      }
    }
    await _0x480cbc.bot.sendMessage(_0x480cbc.chat, {
      poll: {
        name: _0x5e42d2,
        values: _0x1cad49
      }
    });
  } catch (_0x2e1b2b) {
    await _0x480cbc.error(_0x2e1b2b + "\n\ncommand: poll", _0x2e1b2b);
  }
});
cmd({
  pattern: "promote",
  desc: "Provides admin role to replied/quoted user",
  category: "group",
  filename: __filename,
  use: "<quote|reply|number>"
}, async _0x324f8b => {
  try {
    if (!_0x324f8b.isGroup) {
      return _0x324f8b.reply(tlang().group);
    }
    if (!_0x324f8b.isBotAdmin) {
      return _0x324f8b.reply("*_I'm Not Admin Here, So I Can't Promote Someone_*");
    }
    if (!_0x324f8b.isAdmin) {
      return _0x324f8b.reply(tlang().admin);
    }
    let _0x8f9e68 = _0x324f8b.mentionedJid[0] ? _0x324f8b.mentionedJid[0] : _0x324f8b.quoted ? _0x324f8b.quoted.sender : false;
    if (!_0x8f9e68) {
      return await _0x324f8b.reply("*Uhh dear, reply/mention an User*");
    }
    await _0x324f8b.bot.groupParticipantsUpdate(_0x324f8b.chat, [_0x8f9e68], "promote");
    await _0x324f8b.send("*_@" + _0x8f9e68.split("@")[0] + " promoted Succesfully!_*", {
      mentions: [_0x8f9e68]
    });
  } catch (_0x39a11b) {
    await _0x324f8b.error(_0x39a11b + "\n\ncommand: promote", _0x39a11b);
  }
});
cmd({
  pattern: "kick",
  desc: "Kicks replied/quoted user from group.",
  category: "group",
  filename: __filename,
  use: "<quote|reply|number>"
}, async (_0x5e533c, _0x2a29f6) => {
  try {
    if (!_0x5e533c.isGroup) {
      return _0x5e533c.reply(tlang().group);
    }
    if (!_0x5e533c.isBotAdmin) {
      return await _0x5e533c.reply("*_I'm Not Admin In This Group, Idiot_*");
    }
    if (!_0x5e533c.isAdmin) {
      return _0x5e533c.reply(tlang().admin);
    }
    let _0x4e844a = _0x5e533c.quoted ? _0x5e533c.quoted.sender : _0x5e533c.mentionedJid[0] ? _0x5e533c.mentionedJid[0] : false;
    if (!_0x4e844a) {
      return await _0x5e533c.reply("*Uhh dear, reply/mention an User*");
    }
    if (_0x5e533c.checkBot(_0x4e844a)) {
      return await _0x5e533c.reply("*Huh, I can't kick my Creator!!*");
    }
    await _0x5e533c.bot.groupParticipantsUpdate(_0x5e533c.chat, [_0x4e844a], "remove");
    await _0x5e533c.send("*Hurray, @" + _0x4e844a.split("@")[0] + " Kicked Succesfully!*", {
      mentions: [_0x4e844a]
    });
  } catch (_0x14d7b9) {
    await _0x5e533c.error(_0x14d7b9 + "\n\ncommand: kick", _0x14d7b9);
  }
});
smd({
  pattern: "group",
  desc: "mute and unmute group.",
  category: "group",
  filename: __filename
}, async (_0x27d001, _0x358db8) => {
  if (!_0x27d001.isGroup) {
    return _0x27d001.reply(tlang().group);
  }
  if (!_0x27d001.isAdmin && !_0x27d001.isCreator) {
    return _0x27d001.reply(tlang().admin);
  }
  let _0xf64c00 = _0x358db8.toLowerCase();
  try {
    const _0x385ed7 = (await _0x27d001.bot.profilePictureUrl(_0x27d001.chat, "image").catch(_0x1a1b89 => THUMB_IMAGE)) || THUMB_IMAGE;
    const _0x403b56 = _0x27d001.metadata;
    const _0x13feea = _0x27d001.admins;
    const _0x3f1b32 = _0x13feea.map((_0x3899cb, _0x245676) => "  " + (_0x245676 + 1) + ". wa.me/" + _0x3899cb.id.split("@")[0]).join("\n");
    console.log("listAdmin , ", _0x3f1b32);
    const _0x375a91 = _0x403b56.owner || _0x13feea.find(_0x33de13 => _0x33de13.admin === "superadmin")?.id || false;
    let _0x57941c = "\n      *「 INFO GROUP 」*\n*▢ ID :*\n   • " + _0x403b56.id + "\n*▢ NAME :* \n   • " + _0x403b56.subject + "\n*▢ Members :*\n   • " + _0x403b56.participants.length + "\n*▢ Group Owner :*\n   • " + (_0x375a91 ? "wa.me/" + _0x375a91.split("@")[0] : "notFound") + "\n*▢ Admins :*\n" + _0x3f1b32 + "\n*▢ Description :*\n   • " + (_0x403b56.desc?.toString() || "unknown") + "\n   ";
    let _0x5a5b81 = isMongodb ? await sck.findOne({
      id: _0x27d001.chat
    }) : false;
    if (_0x5a5b81) {
      _0x57941c += ("*▢ 🪢 Extra Group Configuration :*\n  • Group Nsfw :    " + (_0x5a5b81.nsfw == "true" ? "✅" : "❎") + " \n  • Antilink :    " + (_0x5a5b81.antilink == "true" ? "✅" : "❎") + "\n  • Economy :    " + (_0x5a5b81.economy == "true" ? "✅" : "❎") + "\n").trim();
      if (_0x5a5b81.welcome == "true") {
        _0x57941c += "\n*▢ Wellcome Message :* \n  • " + _0x5a5b81.welcometext;
        _0x57941c += "\n\n*▢ Goodbye Message :* \n  • " + _0x5a5b81.goodbyetext;
      }
    }
    try {
      await _0x27d001.bot.sendMessage(_0x27d001.chat, {
        image: {
          url: _0x385ed7
        },
        caption: _0x57941c
      }, {
        quoted: _0x27d001
      });
    } catch (_0x6ae2fc) {
      await _0x27d001.send(_0x57941c, {}, "", _0x27d001);
      return console.log("error in group info,\n", _0x6ae2fc);
    }
  } catch (_0x5a81f0) {
    await _0x27d001.error(_0x5a81f0 + "\ncmdName: Group info");
    return console.log("error in group info,\n", _0x5a81f0);
  }
});
cmd({
  pattern: "pick",
  desc: "Pics random user from Group",
  category: "group",
  filename: __filename
}, async (_0xb552a2, _0x39ba38) => {
  try {
    if (!_0xb552a2.isGroup) {
      return _0xb552a2.reply(tlang().group);
    }
    if (!_0x39ba38) {
      return _0xb552a2.reply("*Which type of User you want?*");
    }
    let _0x4fd8bc = _0xb552a2.metadata.participants.map(_0x8b1e4d => _0x8b1e4d.id);
    let _0x2dfc12 = _0x4fd8bc[Math.floor(Math.random() * _0x4fd8bc.length)];
    _0xb552a2.bot.sendMessage(_0xb552a2.jid, {
      text: "The most " + _0x39ba38 + " around us is *@" + _0x2dfc12.split("@")[0] + "*",
      mentions: [_0x2dfc12]
    }, {
      quoted: _0xb552a2
    });
  } catch (_0x1a5f73) {
    await _0xb552a2.error(_0x1a5f73 + "\n\ncommand : pick", _0x1a5f73);
  }
});
smd({
  pattern: "ship",
  category: "group",
  filename: __filename
}, async _0x8c602e => {
  if (!_0x8c602e.isGroup) {
    return _0x8c602e.reply(tlang().group);
  }
  let _0x456468 = _0x8c602e.metadata.participants.map(_0x119157 => _0x119157.id);
  var _0x37f2d4 = _0x8c602e.reply_message ? _0x8c602e.reply_message.sender : _0x8c602e.mentionedJid[0] ? _0x8c602e.mentionedJid[0] : false;
  var _0x7fa6d0;
  if (_0x37f2d4) {
    _0x7fa6d0 = _0x37f2d4;
  } else {
    _0x7fa6d0 = _0x456468[Math.floor(Math.random() * _0x456468.length)];
  }
  if (_0x8c602e.sender === _0x7fa6d0) {
    return _0x8c602e.reply("*Wait... What!!!,You wanna do matchmaking with yourself!*");
  }
  async function _0x30a2ec() {
    var _0x523d04;
    const _0x4e5253 = Math.floor(Math.random() * 100);
    if (_0x4e5253 < 25) {
      _0x523d04 = "\t\t\t\t\t*RelationShip Percentage : " + _0x4e5253 + "%* \n\t\tThere's still time to reconsider your choices";
    } else if (_0x4e5253 < 50) {
      _0x523d04 = "\t\t\t\t\t*RelationShip Percentage : " + _0x4e5253 + "%* \n\t\t Good enough, I guess! 💫";
    } else if (_0x4e5253 < 75) {
      _0x523d04 = "\t\t\t\t\t*RelationShip Percentage : " + _0x4e5253 + "%* \n\t\t\tStay together and you'll find a way ⭐️";
    } else if (_0x4e5253 < 90) {
      _0x523d04 = "\t\t\t\t\t*RelationShip Percentage : " + _0x4e5253 + "%* \n\tAmazing! You two will be a good couple 💖 ";
    } else {
      _0x523d04 = "\t\t\t\t\t*RelationShip Percentage : " + _0x4e5253 + "%* \n\tYou both are fit to be together 💙";
    }
    return _0x523d04;
  }
  var _0x1a1a8e = {
    ...(await _0x8c602e.bot.contextInfo("Matchmaking", "   ˚ʚ♡ɞ˚"))
  };
  await _0x8c602e.reply("\t❣️ *Matchmaking...* ❣️\n\t*✯────────────────────✯*\n@" + _0x8c602e.sender.split("@")[0] + "  x  @" + _0x7fa6d0.split("@")[0] + "\n\t*✯────────────────────✯*\n\n" + (await _0x30a2ec()) + "\n\n" + Config.caption, {
    contextInfo: _0x1a1a8e,
    mentions: [_0x7fa6d0]
  }, "suhail");
});
smd({
  pattern: "mute",
  desc: "Provides admin role to replied/quoted user",
  category: "group",
  filename: __filename,
  use: "<quote|reply|number>"
}, async _0xadbad4 => {
  try {
    if (!_0xadbad4.isGroup) {
      return _0xadbad4.reply(tlang().group);
    }
    if (_0xadbad4.metadata?.announce) {
      return await _0xadbad4.reply("*Uhh " + (_0xadbad4.isSuhail ? "Buddy" : "Sir") + ", Group already muted*");
    }
    if (!_0xadbad4.isBotAdmin) {
      return _0xadbad4.reply(tlang().botAdmin);
    }
    if (!_0xadbad4.isCreator && !_0xadbad4.isAdmin) {
      return _0xadbad4.reply(tlang().admin);
    }
    await _0xadbad4.bot.groupSettingUpdate(_0xadbad4.chat, "announcement").then(_0x150a20 => _0xadbad4.reply("*_Group Chat Muted successfully!!_*")).catch(_0x5d5c82 => _0xadbad4.reply("*_Can't change Group Setting, Sorry!_*"));
  } catch (_0x2bea0d) {
    await _0xadbad4.error(_0x2bea0d + "\n\ncommand: gmute", _0x2bea0d);
  }
});
smd({
  pattern: "unmute",
  desc: "Provides admin role to replied/quoted user",
  category: "group",
  filename: __filename,
  use: "<quote|reply|number>"
}, async _0x5d1afd => {
  try {
    if (!_0x5d1afd.isGroup) {
      return _0x5d1afd.reply(tlang().group);
    }
    if (!_0x5d1afd.metadata?.announce) {
      return await _0x5d1afd.reply("*Hey " + (_0x5d1afd.isSuhail ? "Buddy" : "Sir") + ", Group already unmute*");
    }
    if (!_0x5d1afd.isBotAdmin) {
      return _0x5d1afd.reply(tlang().botAdmin);
    }
    if (!_0x5d1afd.isCreator && !_0x5d1afd.isAdmin) {
      return _0x5d1afd.reply(tlang().admin);
    }
    await _0x5d1afd.bot.groupSettingUpdate(_0x5d1afd.chat, "not_announcement").then(_0x5993c4 => _0x5d1afd.reply("*_Group Chat UnMute successfully!!_*")).catch(_0x293794 => _0x5d1afd.reply("*_Can't change Group Setting, Sorry!_*"));
  } catch (_0x3ea023) {
    await _0x5d1afd.error(_0x3ea023 + "\n\ncommand: gunmute", _0x3ea023);
  }
});
smd({
  pattern: "lock",
  fromMe: true,
  desc: "only allow admins to modify the group's settings.",
  type: "group"
}, async (_0x1dca9f, _0x44b327) => {
  try {
    if (!_0x1dca9f.isGroup) {
      return _0x1dca9f.reply(tlang().group);
    }
    if (_0x1dca9f.metadata.restrict) {
      return await _0x1dca9f.reply("*Hey " + (_0x1dca9f.isSuhail ? "Buddy" : "Sir") + ", Group setting already locked*");
    }
    if (!_0x1dca9f.isBotAdmin) {
      return await _0x1dca9f.reply("*_I'm not admin!_*");
    }
    ;
    if (!_0x1dca9f.isCreator && !_0x1dca9f.isAdmin) {
      return _0x1dca9f.reply(tlang().admin);
    }
    await _0x1dca9f.bot.groupSettingUpdate(_0x1dca9f.chat, "locked").then(_0x49c387 => _0x1dca9f.reply("*_Group locked, Only Admin can change group settinggs!!_*")).catch(_0x100d44 => _0x1dca9f.reply("*_Can't change Group Setting, Sorry!_*"));
  } catch (_0x9e6207) {
    await _0x1dca9f.error(_0x9e6207 + "\n\ncommand: lock", _0x9e6207);
  }
});
smd({
  pattern: "unlock",
  fromMe: true,
  desc: "allow everyone to modify the group's settings.",
  type: "group"
}, async (_0xe880ee, _0x2dce84) => {
  try {
    if (!_0xe880ee.isGroup) {
      return _0xe880ee.reply(tlang().group);
    }
    if (!_0xe880ee.metadata.restrict) {
      return await _0xe880ee.reply("*Hey " + (_0xe880ee.isSuhail ? "Buddy" : "Sir") + ", Group setting already unlocked*");
    }
    if (!_0xe880ee.isBotAdmin) {
      return await _0xe880ee.reply("*_I'm not admin!_*");
    }
    ;
    if (!_0xe880ee.isCreator && !_0xe880ee.isAdmin) {
      return _0xe880ee.reply(tlang().admin);
    }
    await _0xe880ee.bot.groupSettingUpdate(_0xe880ee.chat, "unlocked").then(_0x282118 => _0xe880ee.reply("*_Group unlocked, everyone change group settings!!_*")).catch(_0x320353 => _0xe880ee.reply("*_Can't change Group Setting, Sorry!_*"));
  } catch (_0x20d64c) {
    await _0xe880ee.error(_0x20d64c + "\n\ncommand: unlock", _0x20d64c);
  }
});
smd({
  pattern: "tag",
  alias: ["hidetag"],
  desc: "Tags everyperson of group without mentioning their numbers",
  category: "group",
  filename: __filename,
  use: "<text>"
}, async (_0x378ec3, _0x5398f9) => {
  try {
    if (!_0x378ec3.isGroup) {
      return _0x378ec3.reply(tlang().group);
    }
    if (!_0x5398f9 && !_0x378ec3.reply_message) {
      return _0x378ec3.reply("*Example : " + prefix + "tag Hi Everyone, How are you Doing*");
    }
    if (!_0x378ec3.isAdmin && !_0x378ec3.isCreator) {
      return _0x378ec3.reply(tlang().admin);
    }
    let _0x48f50b = _0x378ec3.reply_message ? _0x378ec3.reply_message : _0x378ec3;
    let _0x9ec626 = _0x378ec3.reply_message ? _0x378ec3.reply_message.text : _0x5398f9;
    let _0xf9a75d = "";
    let _0x48bdf1;
    let _0x1384c7 = _0x48f50b.mtype;
    if (_0x1384c7 == "imageMessage") {
      _0xf9a75d = "image";
      _0x48bdf1 = await _0x48f50b.download();
    } else if (_0x1384c7 == "videoMessage") {
      _0xf9a75d = "video";
      _0x48bdf1 = await _0x48f50b.download();
    } else if (!_0x5398f9 && _0x378ec3.quoted) {
      _0x48bdf1 = _0x378ec3.quoted.text;
    } else {
      _0x48bdf1 = _0x5398f9;
    }
    if (!_0x48bdf1) {
      return await _0x378ec3.send("*_Uhh dear, reply to message!!!_*");
    }
    return await _0x378ec3.send(_0x48bdf1, {
      caption: _0x9ec626,
      mentions: _0x378ec3.metadata.participants.map(_0x3c9928 => _0x3c9928.id)
    }, _0xf9a75d, _0x48f50b);
  } catch (_0x3d62a9) {
    await _0x378ec3.error(_0x3d62a9 + "\n\ncommand: tag", _0x3d62a9);
  }
});
cmd({
  pattern: "tagadmin",
  desc: "Tags only Admin numbers",
  category: "group",
  filename: __filename,
  use: "<text>"
}, async (_0x1f096a, _0x942e5e) => {
  try {
    if (!_0x1f096a.isGroup) {
      return _0x1f096a.reply(tlang().group);
    }
    if (!_0x1f096a.isAdmin && !_0x1f096a.isCreator) {
      return _0x1f096a.reply(tlang().admin);
    }
    const _0x13a9c9 = _0x1f096a.admins.map((_0x22ca40, _0x5b8acb) => " *|  @" + _0x22ca40.id.split("@")[0] + "*").join("\n");
    let _0x20f7aa = ("\n▢ Tag by : @" + _0x1f096a.sender.split("@")[0] + "\n" + (_0x942e5e ? "≡ Message :" + _0x942e5e : "") + "\n\n*┌─⊷ GROUP ADMINS*\n" + _0x13a9c9 + "\n*└───────────⊷*\n\n" + Config.caption).trim();
    return await _0x1f096a.bot.sendMessage(_0x1f096a.chat, {
      text: _0x20f7aa,
      mentions: [_0x1f096a.sender, ..._0x1f096a.admins.map(_0x48778b => _0x48778b.id)]
    });
  } catch (_0x445304) {
    await _0x1f096a.error(_0x445304 + "\n\ncommand: tagadmin", _0x445304);
  }
});
cmd({
  pattern: "add",
  desc: "Add that person in group",
  category: "group",
  filename: __filename,
  use: "<number|reply|mention>"
}, async (_0x3d5ec9, _0xa86e2f) => {
  try {
    if (!_0x3d5ec9.isGroup) {
      return _0x3d5ec9.reply(tlang().group);
    }
    if (!_0x3d5ec9.isBotAdmin) {
      return await _0x3d5ec9.reply("*_I'm Not Admin In This Group, " + (_0x3d5ec9.isSuhail ? "Buddy" : "Sir") + "_*");
    }
    if (!_0x3d5ec9.isAdmin) {
      return _0x3d5ec9.reply(tlang().admin);
    }
    let _0x23d1da = _0x3d5ec9.quoted ? _0x3d5ec9.quoted.sender : _0x3d5ec9.mentionedJid[0] ? _0x3d5ec9.mentionedJid[0] : _0xa86e2f ? _0xa86e2f.replace(/[^0-9]/g, "").replace(/[\s+]/g, "") + "@s.whatsapp.net" : false;
    if (!_0x23d1da) {
      return await _0x3d5ec9.reply("*_Uhh Dear, Please Provide An User._*");
    }
    try {
      await _0x3d5ec9.bot.groupParticipantsUpdate(_0x3d5ec9.chat, [_0x23d1da], "add");
      await _0x3d5ec9.reply("*_User Added in Group!!_*");
      _0x3d5ec9.react("✨");
    } catch (_0x381769) {
      await _0x3d5ec9.react("❌");
      await _0x3d5ec9.bot.sendMessage(_0x23d1da, {
        text: "*_Here's The Group Invite Link!!_*\n\n @" + _0x3d5ec9.sender.split("@")[0] + " Wants to add you in below group\n\n*_https://chat.whatsapp.com/" + (await _0x3d5ec9.bot.groupInviteCode(_0x3d5ec9.chat)) + "_*\n ---------------------------------  \n*_Join If YOu Feel Free?_*",
        mentions: [_0x3d5ec9.sender]
      }, {
        quoted: _0x3d5ec9
      });
      await _0x3d5ec9.reply("*_Can't add user, Invite sent in pm_*");
    }
  } catch (_0x247325) {
    await _0x3d5ec9.error(_0x247325 + "\n\ncommand: add", _0x247325);
  }
});
cmd({
  pattern: "getjids",
  alias: ["gjid", "gjids", "allgc", "gclist"],
  desc: "Sends chat id of every groups.",
  category: "group",
  filename: __filename
}, async (_0x124deb, _0x4744d0, {
  cmdName: _0x374ed3
}) => {
  try {
    if (!_0x124deb.isCreator) {
      return _0x124deb.reply(tlang().owner);
    }
    n = await _0x124deb.bot.groupFetchAllParticipating();
    const _0x32bb60 = Object.entries(n).slice(0).map(_0x9d4955 => _0x9d4955[1]);
    let _0x1494d8 = "";
    let _0x30a9fa = false;
    let _0x4fb9fb = false;
    if (_0x4744d0.includes("jid")) {
      _0x30a9fa = true;
    } else if (_0x4744d0.includes("name")) {
      _0x4fb9fb = true;
    }
    await _0x124deb.reply("Fetching " + (_0x30a9fa ? "Only jids" : _0x4fb9fb ? "Only Names" : "Names and Jids") + " from " + _0x32bb60.length + " Groups");
    await sleep(2000);
    for (var _0x4d64ac of _0x32bb60.map(_0x19e435 => _0x19e435.id)) {
      _0x1494d8 += _0x30a9fa ? "" : "\n*Group:* " + n[_0x4d64ac].subject + " ";
      _0x1494d8 += _0x4fb9fb ? "" : "\n*JID:* " + _0x4d64ac + "\n";
    }
    return await _0x124deb.send(_0x1494d8);
  } catch (_0x1bb5e0) {
    await _0x124deb.error(_0x1bb5e0 + "\n\ncommand: " + _0x374ed3, _0x1bb5e0);
  }
});
cmd({
  pattern: "demote",
  desc: "Demotes replied/quoted user from group",
  category: "group",
  filename: __filename,
  use: "<quote|reply|number>"
}, async _0x118677 => {
  try {
    if (!_0x118677.isGroup) {
      return _0x118677.reply(tlang().group);
    }
    if (!_0x118677.isBotAdmin) {
      return await _0x118677.reply("*_I'm Not Admin In This Group, Idiot_*");
    }
    if (!_0x118677.isAdmin) {
      return _0x118677.reply(tlang().admin);
    }
    let _0x3ce3f1 = _0x118677.mentionedJid[0] ? _0x118677.mentionedJid[0] : _0x118677.reply_message ? _0x118677.reply_message.sender : false;
    if (!_0x3ce3f1) {
      return await _0x118677.reply("*Uhh dear, reply/mention an User*");
    }
    if (_0x118677.checkBot(_0x3ce3f1)) {
      return await _0x118677.reply("*_Huh, I can't demote my creator!!_*");
    }
    try {
      await _0x118677.bot.groupParticipantsUpdate(_0x118677.chat, [_0x3ce3f1], "demote");
      await _0x118677.reply("*_User demote sucessfully!!_*");
    } catch (_0x5e7b02) {
      await _0x118677.reply("*_Can,t demote user, try it manually, Sorry!!_*");
    }
  } catch (_0x307b66) {
    await _0x118677.error(_0x307b66 + "\n\ncommand: demote", _0x307b66);
  }
});
smd({
  pattern: "del",
  alias: ["delete", "dlt"],
  desc: "Deletes message of any user",
  category: "group",
  filename: __filename,
  use: "<quote/reply message.>"
}, async _0x320d81 => {
  try {
    if (!_0x320d81.reply_message) {
      return _0x320d81.reply("*_Please reply to a message!!!_*");
    }
    let _0x3776d3 = _0x320d81.reply_message;
    if (_0x3776d3 && _0x3776d3.fromMe && _0x320d81.isCreator) {
      return _0x3776d3.delete();
    } else if (_0x3776d3 && _0x320d81.isGroup) {
      if (!_0x320d81.isBotAdmin) {
        return _0x320d81.reply("*I can't delete messages without getting Admin Role.*");
      }
      if (!_0x320d81.isAdmin) {
        return _0x320d81.reply(tlang().admin);
      }
      await _0x3776d3.delete();
    } else {
      return await _0x320d81.reply(tlang().owner);
    }
  } catch (_0x4ac639) {
    await _0x320d81.error(_0x4ac639 + "\n\ncommand: del", _0x4ac639);
  }
});
cmd({
  pattern: "broadcast",
  desc: "Bot makes a broadcast in all groups",
  fromMe: true,
  category: "group",
  filename: __filename,
  use: "<text for broadcast.>"
}, async (_0x553d05, _0x5d14a3) => {
  try {
    if (!_0x5d14a3) {
      return await _0x553d05.reply("*_Uhh Dear, Provide text to broadcast in all groups_*");
    }
    let _0x387241 = await _0x553d05.bot.groupFetchAllParticipating();
    let _0x32f9c9 = Object.entries(_0x387241).slice(0).map(_0x3ccabe => _0x3ccabe[1]);
    let _0x4ef191 = _0x32f9c9.map(_0x5ea155 => _0x5ea155.id);
    await _0x553d05.send("*_Sending Broadcast To " + _0x4ef191.length + " Group Chat, Finish Time " + _0x4ef191.length * 1.5 + " second_*");
    let _0x552932 = "*--❗" + tlang().title + " Broadcast❗--*\n\n *🍀Message:* " + _0x5d14a3;
    let _0x305de9 = {
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        title: "Suhail-Md Broadcast",
        body: _0x553d05.senderName,
        renderLargerThumbnail: true,
        thumbnail: log0,
        mediaType: 1,
        mediaUrl: "",
        sourceUrl: gurl,
        showAdAttribution: true
      }
    };
    for (let _0x4c9688 of _0x4ef191) {
      try {
        await sleep(1500);
        await send(_0x553d05, _0x552932, {
          contextInfo: _0x305de9
        }, "", "", _0x4c9688);
      } catch {}
    }
    return await _0x553d05.reply("*Successful Sending Broadcast To " + _0x4ef191.length + " Group*");
  } catch (_0x2a8ad8) {
    await _0x553d05.error(_0x2a8ad8 + "\n\ncommand: broadcast", _0x2a8ad8);
  }
});
smd({
  pattern: "lydea",
  alias: ["chatbot"],
  desc: "activates and deactivates chatbot.\nuse buttons to toggle.",
  fromMe: true,
  category: "misc",
  filename: __filename
}, async (_0x5ab8b7, _0x2c2791, {
  cmdName: _0xa03141
}) => {
  try {
    let _0x5cdb67 = _0x2c2791.split(" ")[0].toLowerCase().trim();
    let _0x423726 = (await groupdb.findOne({
      id: _0x5ab8b7.chat
    })) || (await groupdb.new({
      id: _0x5ab8b7.chat
    }));
    let _0x22c3bd = (await bot_.findOne({
      id: "bot_" + _0x5ab8b7.user
    })) || (await groupdb.new({
      id: "bot_" + _0x5ab8b7.user
    })) || {
      chatbot: "false"
    };
    if (_0x5cdb67 == "all" || _0x5cdb67 === "global") {
      if (_0x22c3bd.chatbot == "true") {
        return await _0x5ab8b7.send("*" + _0xa03141 + " was already enabled to all chat!.*");
      }
      await bot_.updateOne({
        id: "bot_" + _0x5ab8b7.user
      }, {
        chatbot: "true"
      });
      return await _0x5ab8b7.send("*" + _0xa03141 + " successfully enabled to all chats!.*");
    } else if (_0x5cdb67.startsWith("on") || _0x5cdb67.startsWith("act") || _0x5cdb67.startsWith("enable")) {
      if (_0x423726.chatbot == "true" || _0x22c3bd.chatbot == "true") {
        return await _0x5ab8b7.send("*" + _0xa03141 + " was already enabled.*");
      }
      await groupdb.updateOne({
        id: _0x5ab8b7.chat
      }, {
        chatbot: "true"
      });
      return await _0x5ab8b7.send("*" + _0xa03141 + " activated successfully.*");
    } else if (_0x5cdb67.startsWith("off") || _0x5cdb67.startsWith("deact") || _0x5cdb67.startsWith("disable")) {
      if (_0x423726.chatbot == "false" && _0x22c3bd.chatbot == "false") {
        return await _0x5ab8b7.send("*" + _0xa03141 + " was already disabled.*");
      }
      await bot_.updateOne({
        id: "bot_" + _0x5ab8b7.user
      }, {
        chatbot: "false"
      });
      await groupdb.updateOne({
        id: _0x5ab8b7.chat
      }, {
        chatbot: "false"
      });
      return await _0x5ab8b7.send("*" + _0xa03141 + " deactivated successfully.*");
    } else {
      return await _0x5ab8b7.reply("*_" + _0xa03141 + " Currently *" + (_0x22c3bd.chatbot == "true" ? "Enabled in 'all' Chats" : _0x423726.chatbot == "true" ? "Enabled in Chat" : "Disabled in Chat") + "!_*\n*_Use On/Off/all to enable/disable " + _0xa03141 + "_*");
    }
  } catch (_0x2cce1b) {
    _0x5ab8b7.error(_0x2cce1b + "\n\ncommand: lydea(chatbot)", _0x2cce1b);
  }
});
let warn = {};
warn.addwarn = async (_0x7dc045, _0x5add8c, _0x1ff3da = {}) => {
  try {
    let _0x41c209 = (await userdb.findOne({
      id: _0x7dc045
    })) || (await userdb.new({
      id: _0x7dc045
    }));
    let _0x2634c7 = _0x41c209.warn || {};
    if (!_0x2634c7[_0x5add8c]) {
      _0x2634c7[_0x5add8c] = [];
    }
    var _0x279bae = {
      chat: "PRIVATE",
      reason: "Inapropriate Behaviour",
      date: new Date(),
      warnedby: tlang().title,
      ..._0x1ff3da
    };
    _0x2634c7[_0x5add8c].push(_0x279bae);
    _0x41c209 = await userdb.updateOne({
      id: _0x7dc045
    }, {
      warn: _0x2634c7
    });
    return {
      status: true,
      warning: _0x2634c7[_0x5add8c].length,
      user: _0x41c209
    };
  } catch (_0x1c3576) {
    return {
      status: false,
      warning: 0,
      user: {},
      error: _0x1c3576
    };
  }
};
smd({
  pattern: "checkwarn",
  alias: ["listwarn", "chatwarn", "allwarn"],
  desc: "create paste of text.",
  category: "general",
  filename: __filename
}, async (_0x46a6d4, _0xe18f8b) => {
  try {
    let _0x182f38 = "";
    let _0x4fb093 = _0x46a6d4.sender;
    if (_0x46a6d4.isCreator) {
      _0x4fb093 = _0x46a6d4.reply_message ? _0x46a6d4.reply_message.sender : _0x46a6d4.mentionedJid[0] ? _0x46a6d4.mentionedJid[0] : _0x4fb093;
    }
    let _0x2100d3 = (await userdb.findOne({
      id: _0x4fb093
    })) || (await userdb.new({
      id: _0x4fb093
    }));
    let _0x384afd = _0x2100d3.warn || false;
    let _0x49f93a = {};
    if (_0x384afd && _0xe18f8b === "all") {
      _0x384afd = _0x2100d3.warn;
    } else if (_0x384afd && _0x384afd[_0x46a6d4.chat]) {
      _0x49f93a[_0x46a6d4.chat] = [..._0x384afd[_0x46a6d4.chat]];
      _0x384afd = _0x49f93a;
    } else {
      _0x384afd = false;
    }
    let _0x534e3d = _0xe18f8b === "all" ? true : !_0x384afd[_0x46a6d4.chat];
    if (!_0x2100d3 || !_0x384afd || !_0x534e3d) {
      return await _0x46a6d4.send("*_User didn't have any warning yet!!_*");
    }
    console.log("allwarn : ", _0x384afd);
    for (const _0x1a3ca2 in _0x384afd) {
      let _0x4ce551 = _0x384afd[_0x1a3ca2];
      _0x182f38 += "\n╭─────────────◆\n│ *[ID] : " + (_0x1a3ca2.includes("@") ? (await _0x46a6d4.bot.getName(_0x1a3ca2)) || _0x1a3ca2 : _0x1a3ca2) + "*\n│ *[TOTAL WARNING] : " + _0x384afd[_0x1a3ca2].length + "*\n┝─────────────◆\n";
      for (let _0x5db486 = 0; _0x5db486 < _0x4ce551.length; _0x5db486++) {
        _0x182f38 += "┝── *WARNING " + (_0x5db486 + 1) + "* ──\n│  *DATE:* " + _0x4ce551[_0x5db486].date + " " + (_0x4ce551[_0x5db486].reason ? "  \n│  *REASON:* " + _0x4ce551[_0x5db486].reason : "") + "\n│  *WARNED BY:* " + _0x4ce551[_0x5db486].warnedby + "\n│  *CHAT:* " + _0x4ce551[_0x5db486].chat + "\n";
      }
      _0x182f38 += "╰─────────────◆\n";
    }
    return await _0x46a6d4.reply(_0x182f38 ? _0x182f38 : "*_User didn't have any warning yet!!_*");
  } catch (_0x55fc0c) {
    await _0x46a6d4.error(_0x55fc0c + "\n\nCommand: chatwarn", _0x55fc0c);
  }
});
smd({
  pattern: "warn",
  fromMe: true,
  desc: "warn a user!",
  category: "general",
  filename: __filename,
  use: " < USER >"
}, async (_0x302c94, _0x4799a5) => {
  try {
    let _0x4ea22b = _0x302c94.reply_message ? _0x302c94.reply_message.sender : _0x302c94.mentionedJid[0] ? _0x302c94.mentionedJid[0] : false;
    if (!_0x4ea22b) {
      return await _0x302c94.send("*_Uhh please, reply to a user!!_*");
    }
    let _0x10f1e1 = (await userdb.findOne({
      id: _0x4ea22b
    })) || (await userdb.new({
      id: _0x4ea22b
    }));
    let _0x15bf3a = _0x10f1e1.warn || {};
    if (!_0x15bf3a[_0x302c94.chat]) {
      _0x15bf3a[_0x302c94.chat] = [];
    }
    var _0x688ff1 = {
      chat: _0x302c94.isGroup ? _0x302c94.metadata?.subject || "GROUP" : "PRIVATE CHAT",
      reason: _0x4799a5,
      date: _0x302c94.date,
      warnedby: _0x302c94.senderName
    };
    _0x15bf3a[_0x302c94.chat].push(_0x688ff1);
    await userdb.updateOne({
      id: _0x4ea22b
    }, {
      warn: _0x15bf3a
    });
    let _0x57e33b = parseInt(Config.warncount) || 3;
    if (_0x15bf3a[_0x302c94.chat].length > _0x57e33b && !_0x302c94.checkBot(_0x4ea22b)) {
      if (_0x302c94.isGroup) {
        if (_0x302c94.isBotAdmin) {
          await _0x302c94.send("*_Hey @" + _0x4ea22b.split("@")[0] + ", Kicking you from group!_*\n*_Because Your warn limit exceed!_*", {
            mentions: [_0x4ea22b]
          });
          await _0x302c94.bot.groupParticipantsUpdate(_0x302c94.chat, [_0x4ea22b], "remove");
        } else {
          return await _0x302c94.send("*_Hey @" + _0x4ea22b.split("@")[0] + " Dont Spam, Your warn limit exceed!_*");
        }
      } else {
        await _0x302c94.send("*_Hey @" + _0x4ea22b.split("@")[0] + ", Blocking you!_*\n*_Because Your warn limit exceed!_*", {
          mentions: [_0x4ea22b]
        });
        await _0x302c94.bot.updateBlockStatus(_0x4ea22b, "block");
      }
    } else {
      return await _0x302c94.send("*_Hey @" + _0x4ea22b.split("@")[0] + " warning added, Don't spam!_*", {
        mentions: [_0x4ea22b]
      });
    }
  } catch (_0x2f192f) {
    await _0x302c94.error(_0x2f192f + "\n\nCommand: warn ", _0x2f192f, false);
  }
});
smd({
  pattern: "resetwarn",
  desc: "create paste of text.",
  category: "general",
  filename: __filename,
  use: " user "
}, async (_0x280072, _0x1e4563) => {
  try {
    if (!_0x280072.isCreator && !_0x280072.isAdmin) {
      return await _0x280072.reply(tlang().admin);
    }
    let _0x1a359b = _0x280072.reply_message ? _0x280072.reply_message.sender : _0x280072.mentionedJid[0] ? _0x280072.mentionedJid[0] : false;
    if (!_0x1a359b) {
      return await _0x280072.send("*_Uhh please, reply to a user!!_*");
    }
    let _0x447576 = (await userdb.findOne({
      id: _0x1a359b
    })) || (await userdb.new({
      id: _0x1a359b
    })) || {};
    let _0x57200b = _0x447576.warn || {};
    if (_0x280072.isCreator && _0x1e4563.toLowerCase() === "all" && _0x57200b) {
      _0x57200b = {};
    } else {
      if (!_0x447576 || !_0x57200b || !_0x57200b[_0x280072.chat]) {
        return await _0x280072.send("*_User didn't have any warning yet!!_*");
      }
      delete _0x57200b[_0x280072.chat];
    }
    await userdb.updateOne({
      id: _0x1a359b
    }, {
      warn: _0x57200b
    });
    await _0x280072.reply("*User is free as a bird now!*\n*All warns has been deleted!*");
  } catch (_0x5b86ba) {
    await _0x280072.error(_0x5b86ba + "\n\nCommand: resetwarn", _0x5b86ba);
  }
});
smd({
  pattern: "act",
  alias: ["activate", "active"],
  desc: "Switches for varios works.",
  category: "moderation",
  filename: __filename
}, async (_0x265a14, _0x4a2b18) => {
  try {
    if (!_0x265a14.isGroup) {
      return _0x265a14.reply(tlang().group);
    }
    const _0x211602 = _0x265a14.botNumber;
    const _0x169457 = _0x265a14.isAdmin;
    let _0x3bfdde = _0x4a2b18?.split(" ")[0].toLowerCase()?.trim() || false;
    if (!_0x169457 && !_0x265a14.isCreator) {
      return _0x265a14.reply(tlang().admin);
    }
    let _0x336a7e = (await groupdb.findOne({
      id: _0x265a14.chat
    })) || (await groupdb.new({
      id: _0x265a14.chat
    })) || false;
    if (!_0x336a7e) {
      return await _0x265a14.reply("*_Uhh dear, Group not found in Databse!_*");
    }
    switch (_0x3bfdde) {
      case "antilink":
        {
          if (_0x336a7e.antilink !== "false") {
            return await _0x265a14.reply("*_Antilink was alredy enabled here!_*");
          }
          await groupdb.updateOne({
            id: _0x265a14.chat
          }, {
            antilink: "warn"
          });
          await _0x265a14.reply("*_Enabled antilink in current chat.!_*");
        }
        break;
      case "economy":
        {
          if (_0x336a7e.economy == "true") {
            return await _0x265a14.reply("*_Economy was alredy enabled.!_*");
          }
          await groupdb.updateOne({
            id: _0x265a14.chat
          }, {
            economy: "true"
          });
          await _0x265a14.reply("*_Economy enabled in current chat.!_*");
        }
        break;
      case "events":
      case "event":
        {
          await groupdb.updateOne({
            id: _0x265a14.chat
          }, {
            welcome: "true",
            goodbye: "true"
          });
          return await _0x265a14.reply("*Successfully Enabled Events!*");
        }
        break;
      case "nsfw":
        {
          if (_0x336a7e.nsfw == "true") {
            return await _0x265a14.reply("*_NSFW is already enabled!_*");
          }
          await groupdb.updateOne({
            id: _0x265a14.chat
          }, {
            nsfw: "true"
          });
          await _0x265a14.reply("*_Successfully Enabled NSFW_*");
        }
        break;
      case "bot":
        {
          if (_0x336a7e.botenable == "true") {
            return await _0x265a14.reply("*_bot is already enabled!_*");
          }
          await groupdb.updateOne({
            id: _0x265a14.chat
          }, {
            botenable: "true"
          });
          await _0x265a14.reply("*_Successfully Enabled bot_*");
        }
        break;
      default:
        {
          _0x265a14.reply("Please provide me term like.\n1-events\n2-antilink\n3-nsfw\n4-economy\n5-bot");
        }
    }
  } catch (_0x555b01) {
    await _0x265a14.error(_0x555b01 + "\n\ncommand: act", _0x555b01);
  }
});
smd({
  pattern: "deact",
  alias: ["deactive", "deactivate"],
  desc: "Switches for varios works.",
  category: "moderation",
  filename: __filename
}, async (_0x3692ba, _0x33a14d) => {
  try {
    if (!_0x3692ba.isGroup) {
      return _0x3692ba.reply(tlang().group);
    }
    const _0x3b566d = _0x3692ba.botNumber;
    const _0x355e9a = _0x3692ba.isAdmin;
    let _0x512c3d = _0x33a14d?.split(" ")[0].toLowerCase()?.trim() || false;
    if (!_0x512c3d) {
      return _0x3692ba.reply("❌ Please provide me term like like\n1-events\n2-antilink\n3-nsfw\n4-bot\n5-economy");
    }
    if (!_0x355e9a && !_0x3692ba.isCreator) {
      return _0x3692ba.reply(tlang().admin);
    }
    let _0x42b2d9 = (await groupdb.findOne({
      id: _0x3692ba.chat
    })) || (await groupdb.new({
      id: _0x3692ba.chat
    })) || false;
    if (!_0x42b2d9) {
      return await _0x3692ba.reply("*_Uhh dear, request not be proceed due to error!_*");
    }
    switch (_0x512c3d) {
      case "antilink":
        {
          if (_0x42b2d9.antilink == "false") {
            return _0x3692ba.reply("*_Antilink was alredy disabled_*");
          }
          await groupdb.updateOne({
            id: _0x3692ba.chat
          }, {
            antilink: "false"
          });
          _0x3692ba.reply("*_disabled antilink in current chat!_*");
        }
        break;
      case "economy":
        {
          if (_0x42b2d9.economy == "false") {
            return _0x3692ba.reply("*_Economy was alredy disabled!_*");
          }
          await groupdb.updateOne({
            id: _0x3692ba.chat
          }, {
            economy: "false"
          });
          _0x3692ba.reply("*disabled Economy in current chat.*");
        }
        break;
      case "events":
      case "event":
        {
          if (_0x42b2d9.events == "false") {
            return _0x3692ba.reply("*_Events are already disabled!_*");
          }
          await groupdb.updateOne({
            id: _0x3692ba.chat
          }, {
            welcome: "false",
            goodbye: "false"
          });
          return _0x3692ba.reply("*Successfully disabled Events!*");
        }
        break;
      case "nsfw":
        {
          if (_0x42b2d9.nsfw == "false") {
            return _0x3692ba.reply("*_NSFW is already disabled!_*");
          }
          await groupdb.updateOne({
            id: _0x3692ba.chat
          }, {
            nsfw: "false"
          });
          _0x3692ba.reply("*Successfully disabled NSFW*");
        }
        break;
      case "bot":
        {
          if (_0x42b2d9.botenable == "false") {
            return await _0x3692ba.reply("*_bot is already disabled!_*");
          }
          await groupdb.updateOne({
            id: _0x3692ba.chat
          }, {
            botenable: "true"
          });
          await _0x3692ba.reply("*_Successfully disabled bot_*");
        }
        break;
      default:
        {
          _0x3692ba.reply("Please provide me term like.\n1-events\n2-antilink\n3-nsfw\n4-bot\n5-economy");
        }
    }
  } catch (_0x549c05) {
    await _0x3692ba.error(_0x549c05 + "\n\ncommand: deact", _0x549c05);
  }
});
smd({
  pattern: "bot",
  desc: "activates and deactivates bot.\nuse buttons to toggle.",
  fromMe: true,
  category: "misc",
  filename: __filename
}, async (_0x40ea02, _0x2575d7) => {
  try {
    let _0x3a4d1c = _0x2575d7 ? _0x2575d7.toLowerCase().trim() : false;
    let _0x277eb9 = _0x3a4d1c ? _0x3a4d1c.split(" ")[0] : false;
    let _0x59eaf4 = (await groupdb.findOne({
      id: _0x40ea02.chat
    })) || (await groupdb.new({
      id: _0x40ea02.chat
    }));
    if (!_0x277eb9) {
      await _0x40ea02.send("*_Bot *" + (_0x59eaf4.botenable === "false" ? "Disabled" : "Enabled") + " in this Chat!_*");
    } else if (_0x277eb9.startsWith("off") || _0x277eb9.startsWith("deact") || _0x277eb9.startsWith("disable")) {
      if (_0x59eaf4.botenable === "false") {
        await _0x40ea02.send("*_Bot already disabled in current Chat!!_*");
      } else {
        await groupdb.updateOne({
          id: _0x40ea02.chat
        }, {
          botenable: "false"
        });
        await _0x40ea02.send("*_Bot Disabled Succesfully!_*");
      }
    } else if (_0x277eb9.startsWith("on") || _0x277eb9.startsWith("act") || _0x277eb9.startsWith("enable")) {
      if (_0x59eaf4.botenable === "true") {
        await _0x40ea02.send("*_Bot already enabled in current Chat!!_*");
      } else {
        await groupdb.updateOne({
          id: _0x40ea02.chat
        }, {
          botenable: "true"
        });
        await _0x40ea02.send("*_Bot Succesfully Enabled!_*");
      }
    } else {
      await _0x40ea02.send("*_Provide Valid Instruction_*\n*Ex: _" + prefix + "bot on/off_*");
    }
  } catch (_0x3fb7f0) {
    _0x40ea02.error(_0x3fb7f0 + "\n\ncommand: bot", _0x3fb7f0);
  }
});
smd({
  pattern: "antitag",
  desc: "detect tagall in group chat, then kick them",
  fromMe: true,
  category: "misc",
  filename: __filename
}, async (_0x16a0e3, _0xca495d) => {
  try {
    let _0x554fdc = _0xca495d ? _0xca495d.toLowerCase().trim() : false;
    let _0x51b908 = _0x554fdc ? _0x554fdc.split(" ")[0] : false;
    let _0xb69eea = (await groupdb.findOne({
      id: _0x16a0e3.chat
    })) || (await groupdb.new({
      id: _0x16a0e3.chat
    }));
    if (!_0x51b908) {
      await _0x16a0e3.send("*_Anti_tag *" + (_0xb69eea.antitag === "false" ? "Disabled" : "Enabled") + " in this Chat!_*");
    } else if (_0x51b908.startsWith("off") || _0x51b908.startsWith("deact") || _0x51b908.startsWith("disable")) {
      if (_0xb69eea.antitag === "false") {
        await _0x16a0e3.send("*_Anti_tag already disabled in current Chat!!_*");
      } else {
        await groupdb.updateOne({
          id: _0x16a0e3.chat
        }, {
          antitag: "false"
        });
        await _0x16a0e3.send("*_Anti_tag Disabled Succesfully!_*");
      }
    } else if (_0x51b908.startsWith("on") || _0x51b908.startsWith("act") || _0x51b908.startsWith("enable")) {
      if (_0xb69eea.antitag === "true") {
        await _0x16a0e3.send("*_Anti_tag already enabled in current Chat!!_*");
      } else {
        await groupdb.updateOne({
          id: _0x16a0e3.chat
        }, {
          antitag: "true"
        });
        await _0x16a0e3.send("*_Anti_tag succesfully enabled in chat!_*\n*_Now bot kick user who tag all members!_*");
      }
    } else {
      await _0x16a0e3.send("*_Provide Valid Instruction_*\n*Ex: _" + prefix + "antitag on/off_*");
    }
  } catch (_0x1b8e90) {
    _0x16a0e3.error(_0x1b8e90 + "\n\ncommand: antitag", _0x1b8e90);
  }
});
smd({
  pattern: "antilink",
  desc: "activates and deactivates antilink.\nuse buttons to toggle.",
  category: "group",
  filename: __filename
}, async (_0x2533a7, _0x45be1e, {
  smd: _0x4d6aaa
}) => {
  try {
    if (!_0x2533a7.isGroup) {
      return _0x2533a7.reply(tlang().group);
    }
    if (!_0x2533a7.isAdmin && !_0x2533a7.isCreator) {
      return _0x2533a7.reply(tlang().admin);
    }
    let _0x24b1ea = _0x45be1e ? _0x45be1e.toLowerCase().trim() : false;
    let _0x3c4e49 = _0x24b1ea ? _0x24b1ea.split(" ")[0] : false;
    let _0x8fbe3a = (await groupdb.findOne({
      id: _0x2533a7.chat
    })) || (await groupdb.new({
      id: _0x2533a7.chat
    }));
    if (!_0x3c4e49) {
      return await _0x2533a7.send("*_Antilink " + (_0x8fbe3a.antilink === "false" ? "Disabled" : "Enabled") + " in this Group!_* \n" + (_0x8fbe3a.antilink === "false" ? "" : "*Current Mode:* _" + _0x8fbe3a.antilink + "_") + "\n\n*Antilink Modes:* ```\n" + (prefix + _0x4d6aaa) + " kick (Delete Links & Kick Senders)\n" + (prefix + _0x4d6aaa) + " delete (Delete Links Only)\n" + (prefix + _0x4d6aaa) + " warn (warn & delete links)\n" + (prefix + _0x4d6aaa) + " off (Disable Antilink in chat) ```\n\n\n" + Config.caption);
    } else if (_0x3c4e49.startsWith("off") || _0x3c4e49.startsWith("deact") || _0x3c4e49.startsWith("disable")) {
      if (_0x8fbe3a.antilink === "false") {
        return await _0x2533a7.send("*_Anti_Link already disabled in current Chat!!_*");
      }
      await groupdb.updateOne({
        id: _0x2533a7.chat
      }, {
        antilink: "false"
      });
      return await _0x2533a7.send("*_Anti_Link Disabled Succesfully!_*");
    } else if (_0x3c4e49.startsWith("kick")) {
      if (_0x8fbe3a.antilink === "kick") {
        return await _0x2533a7.send("*_Anti_Link already set to kick link senders!!_*");
      }
      await groupdb.updateOne({
        id: _0x2533a7.chat
      }, {
        antilink: "kick"
      });
      return await _0x2533a7.send("*_Anti_Link Succesfully set to kick link senders!_*");
    } else if (_0x3c4e49.startsWith("delete")) {
      if (_0x8fbe3a.antilink === "delete") {
        return await _0x2533a7.send("*_Anti_Link already set to delete links!!_*");
      }
      await groupdb.updateOne({
        id: _0x2533a7.chat
      }, {
        antilink: "delete"
      });
      return await _0x2533a7.send("*_Anti_Link Succesfully set to delete links from chat!_*");
    } else if (_0x3c4e49.startsWith("warn")) {
      if (_0x8fbe3a.antilink === "warn") {
        return await _0x2533a7.send("*_Anti_Link already set to warn link senders!!_*");
      }
      await groupdb.updateOne({
        id: _0x2533a7.chat
      }, {
        antilink: "warn"
      });
      return await _0x2533a7.send("*_Anti_Link set to warn and delete links!_*");
    } else {
      return await _0x2533a7.send("*_Uhh Please, Provide Valid Instruction_*\n*Eg: _" + prefix + "antilink kick/delete/warn/off_*");
    }
  } catch (_0x2d28e8) {
    _0x2533a7.error(_0x2d28e8 + "\n\ncommand: antilink", _0x2d28e8);
  }
});
smd({
  pattern: "welcome",
  alias: ["setwelcome"],
  desc: "sets welcome message in specific group.",
  category: "group",
  filename: __filename
}, async (_0x3c5cf3, _0x445e92) => {
  try {
    if (!_0x3c5cf3.isGroup) {
      return _0x3c5cf3.reply(tlang().group);
    }
    if (!_0x3c5cf3.isAdmin && !_0x3c5cf3.isCreator) {
      return _0x3c5cf3.reply(tlang().admin);
    }
    let _0x4cf85f = _0x445e92.toLowerCase().trim();
    let _0x11bb08 = (await groupdb.findOne({
      id: _0x3c5cf3.chat
    })) || (await groupdb.new({
      id: _0x3c5cf3.chat
    }));
    if (_0x4cf85f === "on" || _0x4cf85f === "act" || _0x4cf85f === "enable") {
      if (_0x11bb08.welcome === "true") {
        return await _0x3c5cf3.send("*_Welcome already enabled in current group!!_*");
      }
      await groupdb.updateOne({
        id: _0x3c5cf3.chat
      }, {
        welcome: "true"
      });
      await _0x3c5cf3.send("*Welcome successfully enabled!!*");
    }
    if (_0x11bb08.welcome !== "true") {
      return await _0x3c5cf3.send("*_Welcome *Disabled in this Group!_* \n*_Use on/off to enable/disable welcome_*");
    }
    if (!_0x445e92 || _0x4cf85f === "get") {
      return await _0x3c5cf3.reply("*Welcome :* " + _0x11bb08.welcometext);
    }
    if (_0x4cf85f === "off" || _0x4cf85f === "deact" || _0x4cf85f === "disable") {
      if (_0x11bb08.welcome === "false") {
        return await _0x3c5cf3.send("*_Welcome already disabled in current group!!_*");
      }
      await groupdb.updateOne({
        id: _0x3c5cf3.chat
      }, {
        welcome: "false"
      });
      return await _0x3c5cf3.send("*Welcome message disabled!!*");
    }
    await groupdb.updateOne({
      id: _0x3c5cf3.chat
    }, {
      welcometext: _0x445e92,
      welcome: "true"
    });
    await sendWelcome(_0x3c5cf3, _0x445e92);
  } catch (_0x1a72be) {
    _0x3c5cf3.error(_0x1a72be + "\n\ncommand: setwelcome", _0x1a72be);
  }
});
smd({
  pattern: "goodbye",
  alias: ["setgoodbye", "setbye"],
  desc: "sets goodbye message in specific group.",
  category: "group",
  filename: __filename
}, async (_0xb86e0c, _0x105b24) => {
  try {
    if (!_0xb86e0c.isGroup) {
      return _0xb86e0c.reply(tlang().group);
    }
    if (!_0xb86e0c.isAdmin && !_0xb86e0c.isCreator) {
      return _0xb86e0c.reply(tlang().admin);
    }
    let _0x3b37f6 = _0x105b24.toLowerCase().trim();
    let _0x305a69 = (await groupdb.findOne({
      id: _0xb86e0c.chat
    })) || (await groupdb.new({
      id: _0xb86e0c.chat
    }));
    if (_0x3b37f6 === "on" || _0x3b37f6 === "act" || _0x3b37f6 === "enable") {
      if (_0x305a69.goodbye === "true") {
        return await _0xb86e0c.send("*_Goodbye already enabled in current group!!_*");
      }
      await groupdb.updateOne({
        id: _0xb86e0c.chat
      }, {
        goodbye: "true"
      });
      await _0xb86e0c.send("*Goodbye successfully enabled!!*");
    }
    if (_0x305a69.goodbye !== "true") {
      return await _0xb86e0c.send("*_Goodbye *Disabled in this Group!_* \n*_Use on/off to enable/disable goodbye_*");
    }
    if (!_0x105b24 || _0x3b37f6 === "get") {
      return await _0xb86e0c.reply("*Goodbye Message :* " + _0x305a69.goodbyetext);
    }
    if (_0x3b37f6 === "off" || _0x3b37f6 === "deact" || _0x3b37f6 === "disable") {
      if (_0x305a69.goodbye === "false") {
        return await _0xb86e0c.send("*_Goodbye already disabled in current group!!_*");
      }
      await groupdb.updateOne({
        id: _0xb86e0c.chat
      }, {
        goodbye: "false"
      });
      return await _0xb86e0c.send("*Goodbye message disabled!!*");
    }
    await groupdb.updateOne({
      id: _0xb86e0c.chat
    }, {
      goodbyetext: _0x105b24,
      goodbye: "true"
    });
    await sendWelcome(_0xb86e0c, _0x105b24);
  } catch (_0x1f130f) {
    _0xb86e0c.error(_0x1f130f + "\n\ncommand: setgoodbye", _0x1f130f);
  }
});
smd({
  pattern: "onlyadmin",
  alias: ["antimessge"],
  desc: "activates and deactivates onlyadmin.",
  category: "group",
  filename: __filename
}, async (_0x1965b9, _0x7fa7bf, {
  cmdName: _0x510afb
}) => {
  try {
    if (!_0x1965b9.isGroup) {
      return _0x1965b9.reply(tlang().group);
    }
    if (!_0x1965b9.isAdmin && !_0x1965b9.isCreator) {
      return _0x1965b9.reply(tlang().admin);
    }
    let _0x5d4349 = (await groupdb.findOne({
      id: _0x1965b9.chat
    })) || (await groupdb.new({
      id: _0x1965b9.chat
    }));
    let _0x3005a8 = _0x7fa7bf ? _0x7fa7bf.toLowerCase().trim() : false;
    let _0x5dfd01 = _0x3005a8 ? _0x3005a8.split(" ")[0] : false;
    if (!_0x5dfd01) {
      return await _0x1965b9.send("*_" + _0x510afb + " *" + (_0x5d4349.onlyadmin === "false" ? "Disabled" : "Enabled") + " in this Group!_*\n *_Use on/off to enable/disable_*");
    } else if (_0x5dfd01.startsWith("off") || _0x5dfd01.startsWith("deact") || _0x5dfd01.startsWith("disable")) {
      if (_0x5d4349.onlyadmin === "false") {
        return await _0x1965b9.reply("*_Onlyadmin Already Disabled in Current Chat_*");
      }
      await groupdb.updateOne({
        id: _0x1965b9.chat
      }, {
        onlyadmin: "false"
      });
      await _0x1965b9.bot.groupSettingUpdate(_0x1965b9.chat, "not_announcement");
      return await _0x1965b9.send("*" + _0x510afb + " succesfully disable in group!_*\n*_Now everyone send message in group_*");
    } else if (_0x5dfd01.startsWith("on") || _0x5dfd01.startsWith("act") || _0x5dfd01.startsWith("enable")) {
      if (_0x5d4349.onlyadmin === "true") {
        return await _0x1965b9.reply("*_Onlyadmin Already Enabled in Current Chat_*");
      }
      if (_0x1965b9.isBotAdmin) {
        await groupdb.updateOne({
          id: _0x1965b9.chat
        }, {
          onlyadmin: "true"
        });
        await _0x1965b9.bot.groupSettingUpdate(_0x1965b9.chat, "announcement");
        return await _0x1965b9.send("*" + _0x510afb + " succesfully set to kick msg senders!_*\n*_Now only admins allow to send msg in group_*");
      } else {
        return await _0x1965b9.reply("*_UHH Please, Provide Admin Role First_*");
      }
    } else {
      return await _0x1965b9.reply("*_Please Provide Valid Instruction_*\n*_Use on/off to enable/disable_*");
    }
  } catch (_0x2cff81) {
    _0x1965b9.error(_0x2cff81 + "\n\ncommand: onlyadmin", _0x2cff81);
  }
});
smd({
  pattern: "antibot",
  desc: "kick Bot Users from Group.!",
  category: "group",
  filename: __filename
}, async (_0xa43d98, _0xf97b24, {
  cmdName: _0x517093
}) => {
  try {
    if (!_0xa43d98.isGroup) {
      return _0xa43d98.reply(tlang().group);
    }
    if (!_0xa43d98.isAdmin && !_0xa43d98.isCreator) {
      return _0xa43d98.reply(tlang().admin);
    }
    let _0x203679 = (await groupdb.findOne({
      id: _0xa43d98.chat
    })) || (await groupdb.new({
      id: _0xa43d98.chat
    }));
    let _0x46e27b = _0xf97b24 ? _0xf97b24.toLowerCase().trim() : "";
    let _0x21d881 = _0x46e27b.startsWith("on") || _0x46e27b.startsWith("act") || _0x46e27b.startsWith("enable") || _0x46e27b.startsWith("del") || _0x46e27b.startsWith("warn") ? "warn" : _0x46e27b.startsWith("kic") ? "kick" : _0x46e27b.startsWith("off") || _0x46e27b.startsWith("reset") || _0x46e27b.startsWith("deact") || _0x46e27b.startsWith("disable") ? "false" : "";
    if (!_0x21d881) {
      return await _0xa43d98.send("*_Antibot Currently *" + (_0x203679.antibot === "false" ? "Disabled" : "Enabled") + " in this Group!_*\n*_Use warn/kick/off to enable/disable Antibot_*");
    } else if (_0x21d881 === "false") {
      if (_0x203679.antibot === "false") {
        return await _0xa43d98.reply("*_Antibot Already Disabled in Current Chat_*");
      }
      await groupdb.updateOne({
        id: _0xa43d98.chat
      }, {
        antibot: "false"
      });
      return await _0xa43d98.send("*_Antibot Succesfully Disable in group!_*");
    } else if (_0x21d881 === "warn" || _0x21d881 === "kick") {
      if (_0x203679.antibot === _0x21d881) {
        return await _0xa43d98.reply("*_Antibot Already set to " + _0x21d881 + " bots!_*");
      }
      if (!_0xa43d98.isBotAdmin) {
        return await _0xa43d98.reply("*_Uhh Please, Provide Admin Role First_*");
      }
      await groupdb.updateOne({
        id: _0xa43d98.chat
      }, {
        antibot: _0x21d881
      });
      return await _0xa43d98.send("*_Antibot Succesfully set to " + _0x21d881 + " Bot Users!_*");
    } else {
      return await _0xa43d98.reply("*_Please provide valid instructions!_*\n*_Use warn/kick/off to enable/disable Antibot!_*");
    }
  } catch (_0x59f2a7) {
    _0xa43d98.error(_0x59f2a7 + "\n\ncommand: antibot", _0x59f2a7);
  }
});
smd({
  pattern: "disable",
  desc: "disable cmds in Group.!",
  category: "group",
  filename: __filename
}, async (_0x57fd77, _0x368830) => {
  try {
    if (!_0x57fd77.isGroup) {
      return _0x57fd77.reply(tlang().group);
    }
    if (!_0x57fd77.isAdmin && !_0x57fd77.isCreator) {
      return _0x57fd77.reply(tlang().admin);
    }
    let _0x5e479b = (await groupdb.findOne({
      id: _0x57fd77.chat
    })) || (await groupdb.new({
      id: _0x57fd77.chat
    }));
    let _0x2c683c = _0x368830 ? _0x368830.toLowerCase().trim() : false;
    let _0x39d4ba = _0x2c683c ? _0x2c683c.split(" ")[0] : "";
    if (!_0x39d4ba) {
      return await _0x57fd77.send("*Provide cmd name to disable in group*\n*Ex " + prefix + "disable tag(to disabled 'tag' cmd)/info*");
    } else if (_0x39d4ba.startsWith("info") || _0x39d4ba.startsWith("list") || _0x39d4ba.startsWith("cmds")) {
      return await _0x57fd77.send(_0x5e479b.disablecmds === "false" ? "*_Uhh Dear, Theres no cmd disabled in current group_*" : "*_Disable cmds :_* ```" + _0x5e479b.disablecmds.replace("false,", "") + "```");
    } else if (_0x39d4ba.startsWith("enable") || _0x39d4ba.startsWith("disable") || _0x39d4ba.startsWith("bot")) {
      return await _0x57fd77.reply("*_Uhh Dear, I can't disable that cmd_*");
    } else if (_0x39d4ba) {
      const _0x122c70 = sᴜʜᴀɪʟ_ᴍᴅ.commands.find(_0x4be928 => _0x4be928.pattern === _0x39d4ba) || sᴜʜᴀɪʟ_ᴍᴅ.commands.find(_0xb39ccd => _0xb39ccd.alias && _0xb39ccd.alias.includes(_0x39d4ba));
      if (_0x122c70) {
        let _0x3be554 = _0x122c70.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        let _0xb4f9b2 = new RegExp("\\b" + _0x3be554 + "\\b");
        if (_0xb4f9b2.test(_0x5e479b.disablecmds)) {
          return await _0x57fd77.send("*Uhh Dear, Provided cmd already in disable cmds*");
        }
        var _0xc3e0c = _0x5e479b.disablecmds + "," + _0x122c70.pattern;
        await groupdb.updateOne({
          id: _0x57fd77.chat
        }, {
          disablecmds: _0xc3e0c
        });
        let _0x3403f2 = _0xc3e0c.replace("false,", "");
        return await _0x57fd77.send("*_\"" + _0x39d4ba + "\" Succesfully added in disable cmds_*" + (_0x3403f2 === "" ? "" : "\n*_Disable cmds :_* ```" + _0x3403f2 + "```"));
      } else {
        return await _0x57fd77.reply("*_'" + _0x39d4ba + "' is not a bot command, Provide valid command_*");
      }
    }
  } catch (_0x54e62c) {
    _0x57fd77.error(_0x54e62c + "\n\ncommand: enable", _0x54e62c);
  }
});
smd({
  pattern: "enable",
  desc: "enable a cmd in Group.!",
  category: "group",
  filename: __filename
}, async (_0x22dc90, _0x26f7a0) => {
  try {
    if (!_0x22dc90.isGroup) {
      return _0x22dc90.reply(tlang().group);
    }
    if (!_0x22dc90.isAdmin && !_0x22dc90.isCreator) {
      return _0x22dc90.reply(tlang().admin);
    }
    let _0x2a73ae = (await groupdb.findOne({
      id: _0x22dc90.chat
    })) || (await groupdb.new({
      id: _0x22dc90.chat
    }));
    let _0x51a36d = _0x26f7a0 ? _0x26f7a0.toLowerCase().trim() : false;
    let _0x7e021e = _0x51a36d ? _0x51a36d.split(" ")[0] : "";
    let _0x3ff298 = _0x7e021e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let _0x1e30cd = new RegExp("\\b" + _0x3ff298 + "\\b");
    if (!_0x7e021e || _0x7e021e === "") {
      return await _0x22dc90.send("*Please provide disabled cmd name to enable it*\n*Ex " + prefix + "enable tag(if 'tag' cmd disabled)/all(reset disables)*");
    } else if (_0x51a36d.startsWith("all")) {
      await groupdb.updateOne({
        id: _0x22dc90.chat
      }, {
        disablecmds: "false"
      });
      return await _0x22dc90.send("*_All disable cmds succesfully enabled_*");
    } else if (_0x1e30cd.test(_0x2a73ae.disablecmds) && _0x2a73ae.disablecmds.includes(_0x7e021e)) {
      let _0x53d67f = _0x2a73ae.disablecmds.replace(_0x1e30cd, "");
      await groupdb.updateOne({
        id: _0x22dc90.chat
      }, {
        disablecmds: _0x53d67f
      });
      return await _0x22dc90.send("*_\"" + _0x7e021e.replace(",", "") + "\" Succesfully removed from disable cmds_*");
    } else {
      return await _0x22dc90.send("_There's no cmd disabled with *" + _0x7e021e.replace(",", "") + "* name");
    }
  } catch (_0x1c6669) {
    _0x22dc90.error(_0x1c6669 + "\n\ncommand: disable", _0x1c6669);
  }
});
smd({
  pattern: "antifake",
  desc: "𝗗𝗲𝘁𝗲𝗰𝘁𝘀 𝗽𝗿𝗼𝗺𝗼𝘁𝗲/𝗱𝗲𝗺𝗼𝘁𝗲 𝗮𝗻𝗱 𝘀𝗲𝗻𝗱𝘀 𝗮𝗹𝗲𝗿𝘁. ",
  category: "group",
  filename: __filename
}, async (_0x157a41, _0x12674f) => {
  try {
    if (!_0x157a41.isGroup) {
      return _0x157a41.reply(tlang().group);
    }
    if (!_0x157a41.isAdmin && !_0x157a41.isCreator) {
      return _0x157a41.reply(tlang().admin);
    }
    let _0x994e2 = (await groupdb.findOne({
      id: _0x157a41.chat
    })) || (await groupdb.new({
      id: _0x157a41.chat
    }));
    let _0x399b24 = _0x12674f ? _0x12674f.toLowerCase().trim() : "";
    if (_0x399b24.startsWith("off") || _0x399b24.startsWith("deact") || _0x399b24.startsWith("disable")) {
      if (_0x994e2.antifake == "false") {
        return await _0x157a41.send("*Anti_Fake Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x157a41.chat
      }, {
        antifake: "false"
      });
      return await _0x157a41.send("*Anti_Fake Disable Succesfully!*");
    } else if (!_0x12674f) {
      return await _0x157a41.send("*_Antifake " + (_0x994e2.antifake === "false" ? "Not set to any" : "set to \"" + _0x994e2.antifake + "\"") + " Country Code!_*\n *Provide Country code to Update Antifake Status*\n*Eg: _.antifake 92_*");
    }
    let _0x16dd8f = _0x12674f ? _0x12674f.split(",").map(_0x254b9f => parseInt(_0x254b9f)).filter(_0x3a3739 => !isNaN(_0x3a3739)).join(",") : false;
    if (!_0x12674f || !_0x16dd8f) {
      return await _0x157a41.send("*_Please provide a country code First_*\n *_Only numbers to join this group._*\n*_eg: " + prefix + "antifake 92_*");
    } else if (_0x16dd8f) {
      await groupdb.updateOne({
        id: _0x157a41.chat
      }, {
        antifake: "" + _0x16dd8f
      });
      return await _0x157a41.send("*Anti_Fake Succesfully set to \"" + _0x16dd8f + "\"!*\n*_Now People Joined Group Who's Number Start With " + _0x16dd8f + "_*");
    } else {
      return await _0x157a41.send("*_Please provide a Valid country code First_*\n *_Only numbers to join this group._*\n*_eg: " + prefix + "antifake 92_*");
    }
  } catch (_0x2c645e) {
    _0x157a41.error(_0x2c645e + "\n\ncommand: antifake", _0x2c645e);
  }
});
smd({
  pattern: "antidemote",
  desc: "Detects Promote and Automaticaly demote promoted person.",
  category: "group",
  filename: __filename
}, async (_0x17b37d, _0x28540e) => {
  try {
    if (!_0x17b37d.isGroup) {
      return _0x17b37d.reply(tlang().group);
    }
    if (!_0x17b37d.isAdmin && !_0x17b37d.isCreator) {
      return _0x17b37d.reply(tlang().admin);
    }
    let _0x189bd8 = (await groupdb.findOne({
      id: _0x17b37d.chat
    })) || (await groupdb.new({
      id: _0x17b37d.chat
    }));
    let _0x35dcf2 = _0x28540e ? _0x28540e.toLowerCase().trim() : "";
    if (_0x35dcf2.startsWith("on") || _0x35dcf2.startsWith("act") || _0x35dcf2.startsWith("enable")) {
      if (_0x189bd8.antidemote == "true") {
        return await _0x17b37d.send("*Anti_Demote Already Enabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x17b37d.chat
      }, {
        antidemote: "true"
      });
      return await _0x17b37d.send("*Anti_Demote Enable Succesfully! _No One Demote Here Now_.*");
    } else if (_0x35dcf2.startsWith("off") || _0x35dcf2.startsWith("deact") || _0x35dcf2.startsWith("disable")) {
      if (_0x189bd8.antidemote == "false") {
        return await _0x17b37d.send("*Anti_Demote Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x17b37d.chat
      }, {
        antidemote: "false"
      });
      return await _0x17b37d.send("*Anti_Demote Disable Succesfully!*");
    } else {
      return await _0x17b37d.reply("*Uhh Dear, Please Toggle between \"On\" And \"Off\".* \n*_To Enable & Disable Stop Demoting Peoples!_*");
    }
  } catch (_0x3f67d7) {
    _0x17b37d.error(_0x3f67d7 + "\n\ncommand: antidemote", _0x3f67d7);
  }
});
smd({
  pattern: "antipromote",
  desc: "Detects Promote and Automaticaly demote promoted person.",
  category: "group",
  filename: __filename
}, async (_0x2eb558, _0x4b82b1) => {
  try {
    if (!_0x2eb558.isGroup) {
      return _0x2eb558.reply(tlang().group);
    }
    if (!_0x2eb558.isAdmin && !_0x2eb558.isCreator) {
      return _0x2eb558.reply(tlang().admin);
    }
    let _0x489b49 = (await groupdb.findOne({
      id: _0x2eb558.chat
    })) || (await groupdb.new({
      id: _0x2eb558.chat
    }));
    let _0x4fe583 = _0x4b82b1 ? _0x4b82b1.toLowerCase().trim() : "";
    if (_0x4fe583.startsWith("on") || _0x4fe583.startsWith("act") || _0x4fe583.startsWith("enable")) {
      if (_0x489b49.antipromote == "true") {
        return await _0x2eb558.send("*Anti_Promote Already Enabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x2eb558.chat
      }, {
        antipromote: "true"
      });
      return await _0x2eb558.send("*Anti_Promote Enable Succesfully! _No One Promote Here Now_.*");
    } else if (_0x4fe583.startsWith("off") || _0x4fe583.startsWith("deact") || _0x4fe583.startsWith("disable")) {
      if (_0x489b49.antipromote == "false") {
        return await _0x2eb558.send("*Anti_Promote Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x2eb558.chat
      }, {
        antipromote: "false"
      });
      return await _0x2eb558.send("*Anti_Promote Disable Succesfully!*");
    } else {
      return await _0x2eb558.reply("*Uhh Dear, Please Toggle between \"On\" And \"Off\".* \n*_To Stop Promoting Peoples in Chat_*");
    }
  } catch (_0x14b987) {
    _0x2eb558.error(_0x14b987 + "\n\ncommand: antipromote", _0x14b987);
  }
});
smd({
  pattern: "pdm",
  desc: "Detect Promote/Demote Users And Send Alerts in Chat ",
  category: "group",
  filename: __filename
}, async (_0x5e0b30, _0x3b1de0) => {
  try {
    if (!_0x5e0b30.isGroup) {
      return _0x5e0b30.reply(tlang().group);
    }
    if (!_0x5e0b30.isAdmin && !_0x5e0b30.isCreator) {
      return _0x5e0b30.reply(tlang().admin);
    }
    let _0x526ce1 = (await groupdb.findOne({
      id: _0x5e0b30.chat
    })) || (await groupdb.new({
      id: _0x5e0b30.chat
    }));
    let _0x3c651a = _0x3b1de0 ? _0x3b1de0.toLowerCase().trim() : "";
    if (_0x3c651a.startsWith("on") || _0x3c651a.startsWith("act") || _0x3c651a.startsWith("enable")) {
      if (_0x526ce1.pdm == "true") {
        return await _0x5e0b30.send("*Promote/Demote Alerts Already Enabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x5e0b30.chat
      }, {
        pdm: "true"
      });
      return await _0x5e0b30.send("*Promote/Demote Alerts Enable Succesfully!*");
    } else if (_0x3c651a.startsWith("off") || _0x3c651a.startsWith("deact") || _0x3c651a.startsWith("disable")) {
      if (_0x526ce1.pdm == "false") {
        return await _0x5e0b30.send("*Promote/Demote Alerts Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x5e0b30.chat
      }, {
        pdm: "false"
      });
      return await _0x5e0b30.send("*Promote/Demote Alerts Disable Succesfully!*");
    } else {
      return await _0x5e0b30.reply("*Uhh Dear, Please use between \"On\" And \"Off\".* \n*_To get And Stop Promote/Demote Alerts_*");
    }
  } catch (_0x5606b8) {
    _0x5e0b30.error(_0x5606b8 + "\n\ncommand: pdm", _0x5606b8);
  }
});
smd({
  pattern: "amute",
  desc: "sets auto mute time in group.",
  category: "moderation"
}, async (_0x40a933, _0x42047d) => {
  try {
    if (!_0x40a933.isGroup) {
      return _0x40a933.reply(tlang().group);
    }
    if (!_0x40a933.isAdmin && !_0x40a933.isCreator) {
      return _0x40a933.reply(tlang().admin);
    }
    let _0x2a0894 = (await groupdb.findOne({
      id: _0x40a933.chat
    })) || (await groupdb.new({
      id: _0x40a933.chat
    }));
    if (!_0x42047d) {
      return await _0x40a933.reply("*Auto_Mute *" + (_0x2a0894.mute === "false" ? "disable" : "enabled") + " for current group*" + (_0x2a0894.mute !== "false" ? "\n *Auto mute status set at : " + _0x2a0894.mute + "* " : ""));
    }
    let [_0x159db4, _0x1b2477] = _0x42047d.split(":").map(Number);
    if (isNaN(_0x159db4) || isNaN(_0x1b2477) || _0x159db4 < 0 || _0x159db4 >= 24 || _0x1b2477 < 0 || _0x1b2477 >= 60) {
      return _0x40a933.reply("Please provide correct form.\nEg: " + prefix + "amute 22:00");
    }
    let _0x223929 = _0x159db4.toString().padStart(2, "0") + ":" + _0x1b2477.toString().padStart(2, "0");
    await groupdb.updateOne({
      id: _0x40a933.chat
    }, {
      mute: _0x223929
    });
    return _0x40a933.reply("*_Successfully done, Group auto mute at " + _0x223929 + "_*");
  } catch (_0x5cb63b) {
    _0x40a933.error(_0x5cb63b + "\n\ncommand: amute", _0x5cb63b);
  }
});
smd({
  pattern: "aunmute",
  desc: "sets unmute time in group.",
  category: "moderation"
}, async (_0x20f896, _0x197285) => {
  try {
    if (!_0x20f896.isGroup) {
      return _0x20f896.reply(tlang().group);
    }
    if (!_0x20f896.isAdmin && !_0x20f896.isCreator) {
      return _0x20f896.reply(tlang().admin);
    }
    let _0x5de016 = (await groupdb.findOne({
      id: _0x20f896.chat
    })) || (await groupdb.new({
      id: _0x20f896.chat
    }));
    if (!_0x197285) {
      return await _0x20f896.reply("*Auto_Unmute *" + (_0x5de016.unmute === "false" ? "disable" : "enabled") + " for current group*" + (_0x5de016.unmute !== "false" ? "\n *Auto unmute status set at : " + _0x5de016.unmute + "* " : ""));
    }
    let [_0x405a82, _0x2e7bff] = _0x197285.split(":").map(Number);
    if (isNaN(_0x405a82) || isNaN(_0x2e7bff) || _0x405a82 < 0 || _0x405a82 >= 24 || _0x2e7bff < 0 || _0x2e7bff >= 60) {
      return _0x20f896.reply("Please provide correct form.\nEg: " + prefix + "aunmute 22:00");
    }
    let _0x3074bb = _0x405a82.toString().padStart(2, "0") + ":" + _0x2e7bff.toString().padStart(2, "0");
    await groupdb.updateOne({
      id: _0x20f896.chat
    }, {
      unmute: _0x3074bb
    });
    return _0x20f896.reply("*_Successfully done, Group auto unmute at " + _0x3074bb + "_*");
  } catch (_0x44f952) {
    _0x20f896.error(_0x44f952 + "\n\ncommand: aunmute", _0x44f952);
  }
});
smd({
  pattern: "dunmute",
  desc: "Delete unmute from group.",
  category: "moderation"
}, async _0x120fd5 => {
  try {
    if (!_0x120fd5.isGroup) {
      return _0x120fd5.reply(tlang().group);
    }
    if (!_0x120fd5.isAdmin && !_0x120fd5.isCreator) {
      return _0x120fd5.reply(tlang().admin);
    }
    let _0xecdeb4 = await groupdb.findOne({
      id: _0x120fd5.chat
    });
    if (!_0xecdeb4 || !_0xecdeb4.unmute || _0xecdeb4.unmute == "false") {
      return await _0x120fd5.reply("*There's no auto unmute set in group.*");
    }
    await groupdb.updateOne({
      id: _0x120fd5.chat
    }, {
      unmute: "false"
    });
    return await _0x120fd5.reply("*Auto unmute deleted successfully.*");
  } catch (_0x228ce4) {
    _0x120fd5.error(_0x228ce4 + "\n\ncommand: dunmute", _0x228ce4);
  }
});
smd({
  pattern: "dmute",
  desc: "Delete mute from group.",
  category: "moderation"
}, async (_0x73ceb0, _0x1d3d47) => {
  try {
    if (!_0x73ceb0.isGroup) {
      return _0x73ceb0.reply(tlang().group);
    }
    if (!_0x73ceb0.isAdmin && !_0x73ceb0.isCreator) {
      return _0x73ceb0.reply(tlang().admin);
    }
    let _0xe9d02 = await groupdb.findOne({
      id: _0x73ceb0.chat
    });
    if (!_0xe9d02 || !_0xe9d02.mute || _0xe9d02.mute == "false") {
      return await _0x73ceb0.reply("*There's no auto mute set in group.*");
    }
    await groupdb.updateOne({
      id: _0x73ceb0.chat
    }, {
      mute: "false"
    });
    return await _0x73ceb0.reply("*Auto mute deleted successfully.*");
  } catch (_0x2edc13) {
    _0x73ceb0.error(_0x2edc13 + "\n\ncommand: dmute", _0x2edc13);
  }
});
async function haveEqualMembers(_0x4299c5, _0x36f2ca) {
  if (_0x4299c5.length === 0 || _0x36f2ca.length === 0) {
    return false;
  }
  const _0x4b02b5 = _0x4299c5.filter(_0x390823 => _0x36f2ca.includes(_0x390823));
  const _0x4efcfe = _0x4b02b5.length / _0x4299c5.length * 100;
  return _0x4efcfe >= 80;
}
smd({
  pattern: "antiword",
  desc: "Detects words from chat,and delete/warn senders.",
  category: "group",
  filename: __filename,
  use: "< action | words >"
}, async (_0x4ff73f, _0x41e8ca, {
  cmdName: _0xf9ed5e
}) => {
  try {
    if (!_0x4ff73f.isGroup) {
      return _0x4ff73f.reply(tlang().group);
    }
    if (!_0x4ff73f.isAdmin && !_0x4ff73f.isCreator) {
      return _0x4ff73f.reply(tlang().admin);
    }
    let _0x288536 = (await groupdb.findOne({
      id: _0x4ff73f.chat
    })) || (await groupdb.new({
      id: _0x4ff73f.chat,
      antiword: {
        status: "false",
        words: ""
      }
    }));
    let _0x23a35d = _0x41e8ca ? _0x41e8ca.toLowerCase().trim() : false;
    let _0x3795eb = _0x288536.antiword;
    let _0x4691c8 = "*Antiword Currently *" + (_0x3795eb.status !== "false" ? "enabled" : "disabled") + "!!!* ```\n  STATUS: " + (_0x3795eb.status ? _0x3795eb.status : "--Empty Yet--") + " \n  WORDS: " + (_0x3795eb.words ? _0x3795eb.words.replace(/,/gi, " -- ") : "--Empty Yet--") + "```\n\n*Available Cmds:* ```\n  " + (prefix + _0xf9ed5e) + " off \n  " + (prefix + _0xf9ed5e) + " reset\n  " + (prefix + _0xf9ed5e) + " warn | bad,words\n  " + (prefix + _0xf9ed5e) + " delete | hot,badas\n``` \n\n\n " + Config.caption;
    if (!_0x23a35d || !_0x41e8ca) {
      return await _0x4ff73f.send(_0x4691c8);
    }
    let _0x4aeb18 = _0x23a35d.split("|")[1] || "";
    let _0x5c8c79 = _0x23a35d.startsWith("on") || _0x23a35d.startsWith("act") || _0x23a35d.startsWith("enable") || _0x23a35d.startsWith("del") ? "delete" : _0x23a35d.startsWith("warn") ? "warn" : _0x23a35d.startsWith("off") || _0x23a35d.startsWith("deact") || _0x23a35d.startsWith("disable") ? "false" : _0x23a35d.startsWith("reset") ? "reset" : "";
    _0x5c8c79 = !_0x5c8c79 && _0x4aeb18 && _0x3795eb.status !== "false" ? _0x3795eb.status : _0x5c8c79;
    if (_0x5c8c79 === "reset") {
      await groupdb.updateOne({
        id: _0x4ff73f.chat
      }, {
        antiword: {}
      });
      return await _0x4ff73f.send("*_Anti_Word status cleard!_*");
    } else if (_0x5c8c79 === "delete" || _0x5c8c79 === "warn") {
      if (_0x3795eb.status == _0x5c8c79 && !_0x4aeb18) {
        return await _0x4ff73f.send("*Please provide badWords, like " + (prefix + _0xf9ed5e) + " " + _0x5c8c79 + " | bad,words");
      }
      _0x4aeb18 = _0x4aeb18 ? _0x4aeb18 : _0x3795eb.words;
      await groupdb.updateOne({
        id: _0x4ff73f.chat
      }, {
        antiword: {
          status: _0x5c8c79,
          words: _0x4aeb18
        }
      });
      return await _0x4ff73f.send("*_Anti_Word succesfully set to '" + _0x5c8c79 + "' badward!_*\n*Antiwords are:```" + (_0x4aeb18 ? _0x4aeb18.replace(/,/gi, " | ") : "--Empty Yet--") + "``` *");
    } else if (_0x5c8c79 === "false") {
      if (_0x3795eb.status === _0x5c8c79) {
        return await _0x4ff73f.send("*Anti_Word Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({
        id: _0x4ff73f.chat
      }, {
        antiword: {
          status: "false",
          words: _0x3795eb.words
        }
      });
      return await _0x4ff73f.send("*Anti_Word Disable Succesfully!*");
    } else {
      return await _0x4ff73f.reply("*Uhh dear, Please follow instructions!!*\n\n" + _0x4691c8);
    }
  } catch (_0x17d461) {
    _0x4ff73f.error(_0x17d461 + "\n\ncommand: antiword", _0x17d461);
  }
});
let bott = false;
let chatbotCount = 0;
smd({
  on: "main"
}, async (_0x39d1ac, _0x22b59e, {
  botNumber: _0x1c3b73,
  isCreator: _0x3447c7,
  budy: _0x3338f4,
  body: _0x43b02e,
  icmd: _0x22254d
}) => {
  try {
    if (Config.MsgsInLog === "true") {
      console.log("" + (_0x39d1ac.isGroup ? "[MESSAGE IN GROUP] From => " + _0x39d1ac.metadata.subject + "\n[USER]:" : "[MESSAGE IN PRIVATE] From =>") + (" " + _0x39d1ac.senderName + " " + _0x39d1ac.senderNum + "\n[" + _0x39d1ac.mtype.toUpperCase() + "]: " + _0x39d1ac.body + "\n============== [SMD] ================="));
    }
    let _0x5305a4 = (await groupdb.findOne({
      id: _0x39d1ac.chat
    })) || false;
    let _0x51e325 = false;
    try {
      if (!global.SmdOfficial && global.SmdOfficial !== "yes") {
        return;
      }
      if (_0x5305a4 && _0x5305a4.antitag == "true" && !_0x39d1ac.checkBot() && _0x39d1ac.mtype !== "reactionMessage" && _0x5305a4.botenable == "true") {
        const _0x3c184c = await haveEqualMembers(_0x39d1ac.metadata.participants.map(_0x18479c => _0x18479c.id), _0x39d1ac.mentionedJid);
        if (_0x3c184c && _0x39d1ac.isBotAdmin) {
          let _0xf11499 = {
            reason: "tagging all members!",
            chat: _0x39d1ac.metadata?.subject || "GROUP",
            warnedby: tlang().title,
            date: _0x39d1ac.date
          };
          _0x51e325 = await warn.addwarn(_0x39d1ac.sender, _0x39d1ac.chat, _0xf11499);
          await _0x39d1ac.reply("*_[TAG DETECTED] Hey @" + _0x39d1ac.senderNum + " warning!!_*\n*_Tagging all members is not allowed!_*", {
            mentions: [_0x39d1ac.sender]
          });
          await _0x39d1ac.delete();
        } else if (_0x3c184c && !_0x39d1ac.isBotAdmin) {
          await _0x39d1ac.reply("*_[TAGALL DETECTED] Can't do anything, without getting admin role!_*", {
            mentions: [_0x39d1ac.sender]
          });
        }
      }
      if (_0x5305a4 && _0x39d1ac.isGroup && !_0x39d1ac.isAdmin && !_0x3447c7 && _0x39d1ac.mtype !== "reactionMessage" && _0x5305a4.botenable == "true") {
        if (_0x5305a4.antibot && _0x5305a4.antibot !== "false" && _0x39d1ac.isBot && !_0x39d1ac.checkBot(_0x39d1ac.sender)) {
          if (_0x39d1ac.isBotAdmin) {
            var _0x5b1bba = "*_Bot user not allowed, please make it private!_*";
            if (_0x5305a4.antibot === "warn") {
              let _0x21abc6 = {
                reason: "Bots not allowed!",
                chat: _0x39d1ac.metadata?.subject || "GROUP",
                date: _0x39d1ac.date
              };
              _0x51e325 = _0x51e325 ? _0x51e325 : await warn.addwarn(_0x39d1ac.sender, _0x39d1ac.chat, _0x21abc6);
              if (_0x51e325.status) {
                _0x5b1bba = "*_Hey @" + _0x39d1ac.senderNum + " warning, Due To Antibot!_*";
              }
            } else if (_0x5305a4.antibot === "kick") {
              try {
                sleep(1000);
                await _0x39d1ac.bot.groupParticipantsUpdate(_0x39d1ac.chat, [_0x39d1ac.sender], "remove");
                _0x5b1bba = "*_User @" + _0x39d1ac.senderNum + " kick Due To Antibot!_*";
              } catch {}
            }
            await _0x39d1ac.delete();
            await _0x39d1ac.send(_0x5b1bba, {
              mentions: [_0x39d1ac.sender]
            });
          } else if (!_0x39d1ac.isBotAdmin && _0x39d1ac.isBot) {
            await _0x39d1ac.reply("*_Uhh Please, Provide Admin Role To Kick Other Bot_*\n*_Or Disable Antibot (On/Off) In Current Group_*");
          }
        }
        if (_0x5305a4.onlyadmin && _0x5305a4.onlyadmin === "true" && SmdOfficial == "yes") {
          var _0x5b1bba = "";
          if (_0x39d1ac.isBotAdmin) {
            let _0x423964 = {
              reason: "Only Admin can Chat!",
              chat: _0x39d1ac.metadata?.subject || "PRIVATE",
              warnedby: tlang().title,
              date: _0x39d1ac.date
            };
            _0x51e325 = _0x51e325 ? _0x51e325 : await warn.addwarn(_0x39d1ac.sender, _0x39d1ac.chat, _0x423964);
            if (_0x51e325.status) {
              _0x5b1bba = "*Warns you for chat here!*\n";
            }
            await _0x39d1ac.delete();
            sleep(1500);
            await _0x39d1ac.send("*Hey @" + _0x39d1ac.senderNum + "* " + _0x5b1bba + "*Deleteing message,while onlyadmin activated!!* ", {
              mentions: [_0x39d1ac.sender]
            });
          } else {
            await _0x39d1ac.send("*_Provide admin role to kick Message Senders_*\n*Or _Disable onlyadmin(on/off) in currentchat_*");
          }
        }
        if (_0x5305a4.antilink && _0x5305a4.antilink !== "false" && SmdOfficial === "yes") {
          const _0x2856dd = Config.antilink_values && Config.antilink_values !== "all" ? Config.antilink_values.split(",").filter(_0x530f1e => _0x530f1e.trim() !== "") : ["https://", "chat.whatsapp.com", "fb.com"];
          let _0x482cec = _0x43b02e.toLowerCase();
          if (_0x2856dd.some(_0x3787e7 => _0x482cec.includes(_0x3787e7))) {
            if (!_0x39d1ac.isBotAdmin) {
              let _0x46235f = " *[LINK DETECTED]*\nUser @" + _0x39d1ac.sender.split("@")[0] + " detected sending a link.\nPromote " + Config.botname + " as admin to " + (_0x5305a4.antilink === "kick" ? "kick \nlink senders." : "delete \nlinks from this Chat") + " \n";
              await _0x39d1ac.send(_0x46235f, {
                mentions: [_0x39d1ac.sender]
              });
            } else if (_0x5305a4.antilink === "delete") {
              await _0x39d1ac.send("*_Link Detected.. Deletion Done!_*");
              await _0x39d1ac.delete();
            } else if (_0x5305a4.antilink === "warn" || _0x5305a4.antilink === "true") {
              let _0x144634 = {
                reason: "links not allowed!",
                chat: _0x39d1ac.metadata?.subject || "PRIVATE",
                warnedby: tlang().title,
                date: _0x39d1ac.date
              };
              _0x51e325 = _0x51e325 ? _0x51e325 : await warn.addwarn(_0x39d1ac.sender, _0x39d1ac.chat, _0x144634);
              var _0x5b1bba = _0x51e325.status ? "*_[LINK DETECTED] Hey @" + _0x39d1ac.senderNum + " warning!!_*\n*_links not allowed in current group!_*" : "*_[LINK DETECTED]!_*";
              await _0x39d1ac.reply(_0x5b1bba, {
                mentions: [_0x39d1ac.sender]
              });
              await _0x39d1ac.delete();
            } else if (_0x5305a4.antilink === "kick") {
              await _0x39d1ac.send("*_Link Detected!!_*");
              try {
                await _0x39d1ac.delete();
                await sleep(1500);
                await _0x39d1ac.bot.groupParticipantsUpdate(_0x39d1ac.chat, [_0x39d1ac.sender], "remove");
              } catch {
                await _0x39d1ac.send("*Link Detected*\n" + tlang().botAdmin);
              }
            }
          }
        }
      }
    } catch (_0x3a9f8d) {
      console.log("Error From Antilinks : ", _0x3a9f8d);
    }
    var _0xe8d652 = _0x5305a4?.antiword || {
      status: "false"
    };
    if (_0x22b59e.length > 1 && !_0x39d1ac.isBot && _0xe8d652 && _0xe8d652.status !== "false" && _0xe8d652.words) {
      var _0x27bcfa = _0xe8d652.words.split(",") || [];
      let _0x441ee8 = false;
      _0x27bcfa.map(async _0x55e61d => {
        if (_0x39d1ac.isAdmin || !global.SmdOfficial || global.SmdOfficial != "yes") {
          return;
        }
        let _0x48398e = new RegExp("\\b" + _0x55e61d?.trim() + "\\b", "ig");
        let _0x2cdbcc = _0x3338f4.toLowerCase();
        if (!_0x441ee8 && _0x55e61d && _0x48398e.test(_0x2cdbcc)) {
          _0x441ee8 = true;
          await sleep(500);
          try {
            var _0x19d37d = "";
            if (_0xe8d652.status === "warn") {
              let _0x3a1b65 = {
                reason: "For using Bad Word",
                chat: _0x39d1ac.metadata?.subject || "PRIVATE",
                warnedby: tlang().title,
                date: _0x39d1ac.date
              };
              _0x51e325 = _0x51e325 ? _0x51e325 : await warn.addwarn(_0x39d1ac.sender, _0x39d1ac.chat, _0x3a1b65);
              if (_0x51e325.status) {
                _0x19d37d = "\n*Warns you for using badWord!!*\n";
              }
            }
            if (_0x39d1ac.isBotAdmin) {
              await _0x39d1ac.send("*[BAD WORD DETECTED] Hey @" + _0x39d1ac.senderNum + "* " + _0x19d37d + "*Deleting your message from chat!*\n", {
                mentions: [_0x39d1ac.sender]
              }, "suhail", _0x39d1ac);
              await _0x39d1ac.delete();
            } else {
              await _0x39d1ac.reply("*_[BAD WORD DETECTED] provide admin to take action!_*", {
                mentions: [_0x39d1ac.sender]
              });
            }
          } catch (_0x2e1cd0) {
            console.log("Error From Bad Words : ", _0x2e1cd0);
          }
        }
      });
    }
    if (_0x51e325) {
      let _0x55d8b7 = parseInt(Config.warncount) || 3;
      if (_0x51e325.warning >= _0x55d8b7) {
        if (_0x39d1ac.isGroup) {
          if (_0x39d1ac.isBotAdmin) {
            await _0x39d1ac.send("*_Hey @" + _0x39d1ac.senderNum + " Kicking you from group!_*\n*_Because Your warn limit exceed!_*", {
              mentions: [_0x39d1ac.sender]
            });
            await _0x39d1ac.bot.groupParticipantsUpdate(_0x39d1ac.chat, [_0x39d1ac.sender], "remove");
          }
        } else {
          await _0x39d1ac.send("*_Hey @" + _0x39d1ac.senderNum + " Blocking you!_*\n*_Because Your warn limit exceed!_*", {
            mentions: [_0x39d1ac.sender]
          });
          await _0x39d1ac.bot.updateBlockStatus(_0x39d1ac.sender, "block");
        }
      }
    }
    try {
      if (!global.SmdOfficial || _0x39d1ac.mtype == "reactionMessage") {
        return;
      }
      let _0x1c5335 = (await groupdb.findOne({
        id: _0x39d1ac.chat
      })) || {
        chatbot: "false"
      };
      if (!bott || chatbotCount >= 10) {
        bott = (await bot_.findOne({
          id: "bot_" + _0x39d1ac.user
        })) || {
          chatbot: "false"
        };
      } else {
        chatbotCount++;
      }
      let _0x180c43 = bott && bott.chatbot && bott.chatbot == "true" ? "true" : _0x1c5335.chatbot || "false";
      if (_0x180c43 === "true" && !_0x22254d && !_0x39d1ac.isBot && _0x39d1ac.text) {
        let _0x274bb7 = !_0x39d1ac.isGroup ? _0x39d1ac.user : _0x39d1ac.quoted ? _0x39d1ac.quoted.sender : _0x39d1ac.mentionedJid[0] || false;
        if (_0x39d1ac.isGroup && _0x274bb7 && !_0x39d1ac.checkBot(_0x274bb7)) {
          return;
        }
        let {
          data: _0x5d0149
        } = await axios.get("http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[" + _0x39d1ac.senderNum + "]&msg=[" + _0x3338f4 + "]");
        if (_0x5d0149 && _0x5d0149.cnt) {
          _0x39d1ac.send(_0x5d0149.cnt, {}, "suhail", _0x39d1ac);
        } else {
          "";
        }
      }
    } catch (_0x4b3818) {
      console.log("Error From ChatBot : ", _0x4b3818);
    }
  } catch (_0x8d39a9) {
    console.log("Group Settings error in command.main() \n", _0x8d39a9);
  }
});
let users = {};
let user_warns = {};
smd({
  group: "add"
}, async (_0xa9045d, {
  Void: _0xc8824e
}) => {
  try {
    let _0x23eb4d = await groupdb.findOne({
      id: _0xa9045d.chat
    });
    if (!_0x23eb4d || !_0xa9045d.isGroup || _0x23eb4d.botenable !== "true" || _0xa9045d.blockJid || _0xa9045d.fromMe) {
      return;
    }
    let _0x2ccb00 = _0x23eb4d && _0x23eb4d.welcome ? _0x23eb4d.welcome : "false";
    let _0x156045 = _0x23eb4d && _0x23eb4d.antifake ? _0x23eb4d.antifake.toLowerCase() : "false";
    let _0x315fd6 = _0x156045.split(",");
    const _0x1879a4 = _0x315fd6.some(_0x1887ff => _0xa9045d.user.startsWith(_0x1887ff));
    if (_0x156045 !== "false" && !_0x1879a4 && !_0xa9045d.isCreator) {
      if (_0xa9045d.isBotAdmin) {
        try {
          await _0xa9045d.kick();
          return await sendWelcome(_0xa9045d, "*[ANTIFAKE START] @User kicked automaticaly!* @pp");
        } catch (_0x411703) {
          await _0xa9045d.error(" Can't kick user in antifake\n❲❒❳ GROUP: " + _0xa9045d.metadata.subject + "\n❲❒❳ ERROR: " + _0x411703 + "\n", _0x411703, false);
        }
      } else {
        await _0xa9045d.send("*[ANTI_FAKE ERROR] Need admin role to kick fake users!!*");
      }
    } else if (_0x2ccb00 === "true") {
      await sendWelcome(_0xa9045d, _0x23eb4d.welcometext);
    }
  } catch (_0x2b9374) {
    console.log("Error From Welcome : ", _0x2b9374);
  }
});
smd({
  group: "remove"
}, async (_0x2f100a, {
  Void: _0x29372e
}) => {
  try {
    let _0x433c18 = (await groupdb.findOne({
      id: _0x2f100a.chat
    })) || false;
    if (!_0x2f100a || !_0x433c18 || !_0x2f100a.isGroup || _0x433c18.botenable !== "true" || _0x2f100a.blockJid || _0x2f100a.fromMe) {
      return;
    }
    let _0x53ce44 = _0x433c18 && _0x433c18.goodbye ? _0x433c18.goodbye : "false";
    if (_0x53ce44 === "true") {
      await sendWelcome(_0x2f100a, _0x433c18.goodbyetext);
    }
  } catch (_0x1584f8) {
    console.log("Error From Goodbye : ", _0x1584f8);
  }
});
smd({
  group: "promote"
}, async (_0x5dad3d, {
  Void: _0x447115
}) => {
  try {
    let _0x5d4655 = (await groupdb.findOne({
      id: _0x5dad3d.chat
    })) || false;
    if (!_0x5d4655 || !_0x5dad3d.isGroup || _0x5d4655.botenable !== "true" || _0x5dad3d.blockJid) {
      return;
    }
    if (!user_warns[_0x5dad3d.sender]) {
      user_warns[_0x5dad3d.sender] = {
        [_0x5dad3d.action]: 1
      };
    } else {
      user_warns[_0x5dad3d.sender][_0x5dad3d.action]++;
    }
    let _0x468228;
    if (_0x5d4655.antipromote == "true" && !_0x5dad3d.isCreator) {
      _0x468228 = _0x5dad3d.isBotAdmin ? false : true;
      if (users[_0x5dad3d.sender] && users[_0x5dad3d.sender].previous_Action === "antidemote") {
        delete users[_0x5dad3d.sender];
        return;
      }
      if (_0x5dad3d.isBotAdmin) {
        try {
          await _0x5dad3d.demote();
          users[_0x5dad3d.sender] = {
            previous_Action: "antipromote"
          };
          if (user_warns[_0x5dad3d.sender][_0x5dad3d.action] > 2) {
            return;
          }
          return await sendWelcome(_0x5dad3d, "*[ANTIPROMOTE START] @User Demoted Automatically!* @pp ");
        } catch (_0x23d89b) {
          await _0x5dad3d.error(" Can't demote user in antipromote\n❲❒❳ GROUP: " + _0x5dad3d.metadata.subject + "\n❲❒❳ ERROR: " + _0x23d89b + "\n", _0x23d89b, false);
        }
      }
    }
    if (_0x5d4655.pdm == "true" || _0x468228) {
      if (user_warns[_0x5dad3d.sender][_0x5dad3d.action] > 2) {
        return;
      }
      var _0x34818c = " *[SOMEONE PROMOTE HERE]*\n" + (_0x468228 ? "*Note : _I'm Not Admin Here, So I Can't Demote Someone while Anti_Promote Activated_*" : "") + "\n           \n  ❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Member -> Admin_ @pp\n  ❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n\n\n" + Config.caption;
      return await sendWelcome(_0x5dad3d, _0x34818c);
    }
  } catch (_0x39d153) {
    console.log("Error From Promote : ", _0x39d153);
  }
});
smd({
  group: "demote"
}, async (_0x28f5ec, {
  Void: _0x20bfe6
}) => {
  try {
    let _0x47cda5 = (await groupdb.findOne({
      id: _0x28f5ec.chat
    })) || false;
    if (!_0x47cda5 || !_0x28f5ec.isGroup || _0x47cda5.botenable !== "true" || _0x28f5ec.blockJid) {
      return;
    }
    if (!user_warns[_0x28f5ec.sender]) {
      user_warns[_0x28f5ec.sender] = {
        [_0x28f5ec.action]: 1
      };
    } else {
      user_warns[_0x28f5ec.sender][_0x28f5ec.action]++;
    }
    let _0x48cf93;
    if (_0x47cda5.antidemote == "true" && !_0x28f5ec.isCreator) {
      _0x48cf93 = _0x28f5ec.isBotAdmin ? false : true;
      if (users[_0x28f5ec.sender] && users[_0x28f5ec.sender].previous_Action === "antipromote") {
        delete users[_0x28f5ec.sender];
        return;
      }
      if (_0x28f5ec.isBotAdmin) {
        try {
          await _0x28f5ec.promote();
          users[_0x28f5ec.sender] = {
            previous_Action: "antidemote"
          };
          if (user_warns[_0x28f5ec.sender][_0x28f5ec.action] > 2) {
            return;
          }
          return await sendWelcome(_0x28f5ec, "*[ANTIPROMOTE START] User promote automatically!* @pp ");
        } catch (_0x298984) {
          await _0x28f5ec.error(" Can't promote user in antidemote\n❲❒❳ GROUP: " + _0x28f5ec.metadata.subject + "\n❲❒❳ ERROR: " + _0x298984 + "\n", _0x298984, false);
        }
      }
    }
    if (_0x47cda5.pdm == "true" || _0x48cf93) {
      if (user_warns[_0x28f5ec.sender][_0x28f5ec.action] > 2) {
        return;
      }
      var _0x38c006 = " *[SOMEONE DEMOTE HERE]*\n  " + (_0x48cf93 ? "*Note : _I'm Not Admin Here, So I Can't promote Someone while Anti_Demote Activated_*" : "") + "\n\n  ❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Admin -> Member_ @pp\n  ❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n  \n\n" + Config.caption;
      return await sendWelcome(_0x28f5ec, _0x38c006);
    }
  } catch (_0x2cb5e6) {
    console.log("Error From Demote : ", _0x2cb5e6);
  }
});