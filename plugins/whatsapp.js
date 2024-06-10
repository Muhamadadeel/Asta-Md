global.pinging = class _Ping {
  constructor() { this._before = new Date().getTime(); this._after = new Date().getTime(); }
  before() { this._before = new Date().getTime(); }
  start() { this._before = new Date().getTime(); }
  after() { this._after = new Date().getTime(); }
  end() { this._after = new Date().getTime(); }
  ping() { return this._after - this._before; }
}
const {
  UserFunction, Config, prefix
} = require('../lib')
let counter_name = { name: "asta-md" }
try { global.Package_ = JSON.parse(require('fs').readFileSync('package.json', 'utf8')) || counter_name } catch { }
UserFunction({
	pattern: 'archive',
	fromMe: true,
	desc: 'archive whatsapp chat',
	type: 'chats'
}, async (message, match) => {
    try{
	const lstMsg = {
		message: message.message,
		key: message.key,
		messageTimestamp: message.messageTimestamp
	};
	await message.bot.chatModify({
		archive: true,
		lastMessages: [lstMsg]
	}, message.jid);
	await message.send('_Archived_')
}catch(e){ message.error(`${e}\n\nCommand : archive` , e, false) }
})
UserFunction({
  pattern: "jid",
  desc: "Get JID of a user in a group.",
  category: "user",
  filename: __filename,
  use: "<@user>"
}, async ({ jid, reply, quoted }) => {
  if (quoted) {
    return reply(quoted.sender);
  } else {
    return reply(jid);
  }
});

UserFunction({
  pattern: "getpp",
  desc: "Get profile picture of a given user.",
  category: "user",
  filename: __filename
}, async message => {
  try {
    let targetJid = message.reply_message ? message.reply_message.sender : message.mentionedJid[0] ? message.mentionedJid[0] : message.from;
    let profilePicUrl;
    try {
      profilePicUrl = await message.bot.profilePictureUrl(targetJid, "image");
    } catch (error) {
      return message.reply("Profile picture not fetched.");
    }
    await message.bot.sendMessage(message.chat, {
      image: { url: profilePicUrl },
      caption: "  *---Profile Picture is here---*\n" + Config.caption
    }, { quoted: message });
  } catch (error) {
    await message.error(error + "\n\ncommand: getpp", error);
  }
});

UserFunction({
  pattern: "spp",
  desc: "Send photo of replied sticker.",
  category: "user",
  use: "<reply to any person>",
  filename: __filename
}, async message => {
  try {
    let targetJid = message.reply_message ? message.reply_message.sender : message.mentionedJid[0] ? message.mentionedJid[0] : false;
    if (!targetJid && message.isGroup) {
      const groupProfilePic = (await message.bot.profilePictureUrl(message.chat, "image").catch(() => "https://telegra.ph/file/29a8c892a1d18fdb26028.jpg")) || THUMB_IMAGE;
      const groupMetadata = message.metadata;
      const groupAdmins = message.admins.map((admin, index) => "  " + (index + 1) + ". wa.me/" + admin.id.split("@")[0]).join("\n");
      const groupOwner = groupMetadata.owner || message.admins.find(admin => admin.admin === "superadmin")?.id || false;
      let groupInfo = `\n      *「 GROUP INFORMATION 」*\n*▢ NAME :* \n   • ${groupMetadata.subject}\n*▢ Members :*\n   • ${groupMetadata.participants.length}\n*▢ Group Owner :*\n   • ${groupOwner ? "wa.me/" + groupOwner.split("@")[0] : "notFound"}\n*▢ Admins :*\n${groupAdmins}\n*▢ Description :*\n   • ${groupMetadata.desc?.toString() || "_not set_"}\n   `;
      await message.reply(groupProfilePic, { caption: groupInfo }, "image");
    } else {
      if (!targetJid) {
        return message.reply("Please reply to a person!");
      }
      let userStatus, setStatusAt;
      try {
        const statusInfo = await message.bot.fetchStatus(targetJid);
        userStatus = statusInfo.status;
        setStatusAt = statusInfo.setAt.toString().split(" ").slice(0, 5).join(" ");
      } catch {
        userStatus = "undefined";
        setStatusAt = "";
      }
      const userNumber = targetJid.split("@")[0];
      let userProfilePic;
      try {
        userProfilePic = await message.bot.profilePictureUrl(targetJid, "image");
      } catch {
        userProfilePic = "https://telegra.ph/file/29a8c892a1d18fdb26028.jpg";
      }
      const userName = await message.bot.getName(targetJid);
      await message.bot.sendMessage(message.jid, {
        image: { url: userProfilePic },
        caption:
 `
  *『User Information』*
 ║
 ║ *Name:* ${userName || "unknown"} 
 ║ *Num:* ${userNumber || "unknown"}
 ║ *Bio:*  ${userStatus || "unknown"}
 ║ *LastUpdated:* ${setStatusAt || "unknown"}
 ╚════════════════╝\n`
      }, { quoted: message });
    }
  } catch (error) {
    await message.error(error + "\n\ncommand: ssp", error);
  }
});

UserFunction({
  pattern: "wa",
  desc: "Generate WhatsApp link of quoted or mentioned user.",
  category: "user",
  filename: __filename
}, async message => {
  try {
    let targetJid = message.reply_message ? message.reply_message.sender : message.mentionedJid[0] ? message.mentionedJid[0] : false;
    await message.reply(!targetJid ? "Please reply or mention a user" : "https://wa.me/" + targetJid.split("@")[0]);
  } catch (error) {
    await message.error(error + "\n\ncommand: wa", error, false);
  }
});

UserFunction({
  pattern: "mee",
  desc: "Generate WhatsApp link for the user.",
  category: "user",
  filename: __filename
}, async message => {
  try {
    return await message.reply("https://wa.me/" + message.sender.split("@")[0]);
  } catch { }
});

UserFunction({
  pattern: "save",
  desc: "Save whatsapp status",
  category: "whatsapp",
  filename: __filename,
  use: "< status >",
}, async (message) => {
  try {
    let mm = message.reply_message && message.reply_message.status ? message.reply_message : false;
    if (mm) { message.bot.forwardOrBroadCast(message.user, mm, { quoted: { key: mm.key, message: mm.message } }) }
    else message.send("*reply to whatsapp status*")
  } catch (e) { await message.error(`${e}\n\ncommand : #(Status Saver)`, e, false) }
})
global.waPresence = process.env.WAPRESENCE && process.env.WAPRESENCE === "online" ? "available" : process.env.WAPRESENCE || "";
global.config_dir = require("path").join(__dirname, '../', './config')
global.gurl = process.env.GURL || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z";

try {

  return
  global.auto_send_status = process.env.AUTO_SEND_STATUS || 'true';


  const regexSend = new RegExp(`\\b(?:${["send", "share", "snd", "get", "save", "extract", "forward", "fwd"].join('|')})\\b`, 'i');
  UserFunction(
    { on: "quoted" },
    async (message, text) => {
      try {
        let mm = message.reply_message.status ? message.reply_message : false;
        if (mm && regexSend.test(text.toLowerCase())) {
          if (global.auto_send_status == "true") message.bot.forwardOrBroadCast(message.fromMe ? message.user : message.from, mm, { quoted: { key: mm.key, message: mm.message } })
        }
      } catch (e) { console.log(e) }
    })
  let status = false, times = 0;
  UserFunction(
    { on: "main" },
    async (message, text, { icmd }) => {
      try {
        if (!status) {
          try {
          } catch (e) { }
        }

        if (message.status) return
        if (`${global.readmessagefrom}`.includes(message.senderNum) || ["yes", "true", "ok", "sure"].includes(global.readmessage) || (icmd && ["yes", "true", "ok", "sure"].includes(global.readcmds))) message.bot.readMessages([message.key])
      } catch (e) { console.log(e) }
    })

  UserFunction(
    { on: "text" },
    async (message, text, { icmd }) => {
      try {
        if (['unavailable', 'available', 'composing', 'recording', 'paused'].includes(waPresence)) message.bot.sendPresenceUpdate(waPresence, message.from)
      } catch (e) { console.log(e) }
    })
  UserFunction(
    { on: "status" },
    async (message, text) => {
      try {
        if (`${global.read_status_from}`.split(",").includes(message.key.participant.split("@")[0]) || ["yes", "true", "ok", "sure"].includes(global.read_status) || message.fromMe || message.isAstro) { await message.bot.readMessages([{ ...message.key, fromMe: false }]) }
        if ((`${global.save_status_from}`.split(",").includes(message.key.participant.split("@")[0]) || ["yes", "true", "ok", "sure"].includes(global.save_status)) && !message.fromMe) {
          await message.bot.forwardOrBroadCast(message.user, message, { quoted: { key: message.key, message: message.message }, })
        }
      } catch (e) { console.log(e) }
    })
} catch (e) { }
