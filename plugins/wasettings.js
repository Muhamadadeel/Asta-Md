let Asta_Md = "Asta"
let {smd , prefix,Config} = require("../lib")
const moment = require("moment-timezone");
let {
  fancytext,
  tlang,
  tiny,
  botpic,
  updateProfilePicture,
  parsedJid
} = require("../lib");
const {
	cmd
  } = require("../lib/plugins");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
smd({
	pattern: 'clear',
	fromMe: true,
	alias: ["clear", "clearchat"],
	desc: 'delete whatsapp chat',
	type: 'whatsapp settings'
}, async (message, match) => { 
    try{   
	await message.bot.chatModify({
                
		delete: true,
		lastMessages: [{
			key: message.key,
			messageTimestamp: message.messageTimestamp
		}]
	}, message.jid)

	await message.send('_Cleared!_')
    }catch(e){ message.error(`${e}\n\nCommand : clear` , e, false) }
})
smd({
	pattern: 'archive',
	fromMe: true,
	alias: ["archive", "archivechat"],
	desc: 'archive whatsapp chat',
	type: 'whatsapp settings'
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
smd({
	pattern: 'unarchive',
	fromMe: true,
	alias: ["unarchive", "unarchivechat"],
	desc: 'unarchive whatsapp chat',
	type: 'whatsapp settings'
}, async (message, match) => {
    try{
	const lstMsg = {
		message: message.message,
		key: message.key,
		messageTimestamp: message.messageTimestamp
	};
	await message.bot.chatModify({
		archive: false,
		lastMessages: [lstMsg]
	}, message.jid);
	await message.send('_Unarchived_')
}catch(e){ message.error(`${e}\n\nCommand : unarchive` , e, false) }
})
smd({
	pattern: 'pin',
  alias :["pinchat", "pin"],
	fromMe: true,
	desc: 'pin a chat',
	type: 'whatsapp settings'
}, async (message, match) => {
    try{
	await message.bot.chatModify({
		pin: true
	}, message.jid);
	await message.send('_Pined_')
}catch(e){ message.error(`${e}\n\nCommand : chatpin` , e, false) }
})
smd({
	pattern: 'unpin',
  alias :["unpinchat","unpin","chatunpin"],
	fromMe: true,
	desc: 'unpin a msg',
	type: 'whatsapp settings'
}, async (message, match) => {
    try{
	await message.bot.chatModify({
		pin: false
	}, message.jid);
	await message.send('_Unpined_')
}catch(e){ message.error(`${e}\n\nCommand : unpin` , e, false) }
})
smd({
	pattern: 'read',
	fromMe: true,
	alias: ["read", "markread"],
	desc: 'mark as readed',
	type: 'whatsapp settings'
}, async (message, match) => {

    try{
  let msg = await message.react("🍁")
	await message.bot.chatModify(
		{ markRead: true, lastMessages: [message] }, 
    message.jid
    );
    }catch(e){ message.error(`${e}\n\nCommand : markread` , e, false) }
})
smd({
	pattern: 'unread',  
	fromMe: true,
	alias: ["unread", "markunread"],
	desc: 'mark as UnRead',
	type: 'whatsapp settings'
}, async (message, match) => {

    try{
  let msg = await message.send("🍁",{},"react")
  console.log({msg})
	await message.bot.chatModify(
		{ markRead: false, lastMessages: [message] }, 
    message.jid
    );
    }catch(e){ message.error(`${e}\n\nCommand : markunread` , e, false) }
})

smd({
	pattern: 'chatunmute',
	alias: ["unmutechat", "unmutec"],
	fromMe: true,
	desc: 'unmute a chat',
	type: 'whatsapp settings'
}, async (message, match) => {
    try{
	await message.bot.chatModify( { mute: null }, message.jid );
	await message.send('_Chat Unmuted!_')
}catch(e){ message.error(`${e}\n\nCommand : unmutechat` , e, false) }

})

smd({
	pattern: 'name',
	fromMe: true,
	alias: ["name", "profilename", "proname", "pname"],
	desc: 'To change your profile name',
	type: 'whatsapp'
}, async (message, match) => {
    try{
	match = match || message.reply_message.text
	if (!match) return await message.send('*Need Name!*\n*Example: profilename your name*.')
	await message.bot.updateProfileName(match)
	await message.send('_Profile name updated!_')
}catch(e){ message.error(`${e}\n\nCommand : profilename` , e, false) }
})

smd({
	pattern: 'wasettings',
	fromMe: true,
	alias: ["wasettings", "wasetting", "settingswa", "privacy"],
	desc: 'get your privacy settings',
	type: 'privacy'
}, async (message, match) => {
	const {
		readreceipts,
		profile,
		status,
		online,
		last,
		groupadd,
		calladd
	} = await message.bot.fetchPrivacySettings(true);
	const msg = `*♺ whatsapp settings*

*ᝄ name :* ${(message.fromMe &&  message.pushName ? message.pushName :  message.bot.user.name).split("\n").join("  ") }
*ᝄ number :* ${message.user.split("@")[0]}

*ᝄ online :* ${online}
*ᝄ profile :* ${profile}
*ᝄ last seen :* ${last}
*ᝄ whts status :* ${status}
*ᝄ read receipt :* ${readreceipts}

*ᝄ who can add in group :* ${groupadd}
*ᝄ who can call :* ${calladd}`;
	let img = await message.getpp(message.user)
	await message.send(img, {
		caption: msg
	}, 'img');
})

smd({
	pattern: 'lastseen-mode',
	fromMe: true,
	alias: ["lastseen"],
	desc: 'to change lastseen privacy',
	type: 'privacy'
}, async (message, match, {smd }) => {
    try{
	if (!match) return await message.send(`_*Example:-* .lastseen all_\n_to change last seen privacy settings_`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join(' / ')}* values_`);
	await message.bot.updateLastSeenPrivacy(match)
	await message.send(`_Privacy settings *last seen* Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : lastseen` , e, false) }
})


smd({
	pattern: 'online-mode',
	fromMe: true,
	alias: ["onlinemode", "online", "online-mode"],
	desc: 'to change online privacy',
	type: 'privacy'
}, async (message, match,) => {
    try{
	if (!match) return await message.send(`_*Example:-* .online all_\n_to change *online*  privacy settings_`);
	const available_privacy = ['all', 'match_last_seen'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.bot.updateOnlinePrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : online` , e, false) }
})


smd({
	pattern: 'set-mypp',
	fromMe: true,
	alias: ["dp","set-mypp", "pp", "profilepic", "wadp"],
	desc: 'privacy setting profile picture',
	type: 'privacy'
}, async (message, match) => {
    try{
	if (!match) return await message.send(`_*Example:-* .mypp all_\n_to change *profile picture*  privacy settings_`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.bot.updateProfilePicturePrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : mypp` , e, false) }
})

smd({
	pattern: 'set-mystatus',
	fromMe: true,
	alias: ["mystatus","set-mystatus", "status"],
	desc: 'privacy for my status',
	type: 'privacy'
}, async (message, match,) => {
    try{
	if (!match) return await message.send(`_*Example:-* .mystatus all_\n_to change *status*  privacy settings_`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.bot.updateStatusPrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : mystatus` , e, false) }
})

smd({
	pattern: 'readmsgs',
	fromMe: true,
	alias: ["readmmsgs"],
	desc: 'privacy for read message',
	type: 'privacy'
}, async (message, match, smd) => {
    try{
	if (!match) return await message.send(`*Example:-* .read all`);
	const available_privacy = ['all', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.bot.updateReadReceiptsPrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : read` , e, false) }
})

smd({
	pattern: 'set-groupadd',
	fromMe: true,
	alias: ["groupadd","set-groupadd", "gcadd"],
	desc: 'privacy for group add',
	type: 'privacy'
}, async (message, match, smd) => {
    try{
	if (!match) return await message.send(`*Example:-* .groupadd 'all', 'contacts', 'contact_blacklist', 'none'`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.bot.updateGroupsAddPrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : groupadd` , e, false) }
})
cmd(
	{
	  pattern: "privacysettings",
	  desc: "send ptv Message of video",
	  category: "whatsapp settings",
	  filename: __filename,
	},
	async (message, _, { cmdName }) => {
	  try {
		const privacySettings = await message.bot.fetchPrivacySettings();
  
		const text = `*[WHATSAPP PRIVACY SETTINGS]*\n\n*PROFILE:* ${privacySettings.profile}\n*STATUS:* ${privacySettings.status}\n*ONLINE:* ${privacySettings.online}\n*LASTSEEN:* ${privacySettings.last}\n*MESSAGE READ:* ${privacySettings.readreceipts}\n\n*Who can add in group:* ${privacySettings.groupadd}\n*Who can call:* ${privacySettings.calladd}\n `;
  
		await message.send(text);
	  } catch (error) {
		await message.error(`${error}\n\ncommand : ${cmdName}`, error);
	  }
	}
  );
  let mtypes = ["imageMessage"];
  smd(
	{
	  pattern: "pp",
	  desc: "Set profile picture",
	  category: "whatsapp settings",
	  use: "<reply to image>",
	  fromMe: true,
	  filename: __filename,
	},
	async (message) => {
	  try {
		let replyMessage =
		  mtypes.includes(message.mtype)
			? message
			: message.reply_message;
  
		if (!replyMessage || !mtypes.includes(replyMessage?.mtype || "need_Media")) {
		  return await message.reply("*Reply to an image, dear*");
		}
  
		return await updateProfilePicture(message, message.user, replyMessage, "pp");
	  } catch (error) {
		await message.error(`${error}\n\ncommand : pp`, error);
	  }
	}
  );
  
  smd(
	{
	  pattern: "fullpp",
	  desc: "Set full screen profile picture",
	  category: "whatsapp settings",
	  use: "<reply to image>",
	  fromMe: true,
	  filename: __filename,
	},
	async (message) => {
	  try {
		let replyMessage =
		  mtypes.includes(message.mtype)
			? message
			: message.reply_message;
  
		if (!replyMessage || !mtypes.includes(replyMessage?.mtype || "need_Media")) {
		  return await message.reply("*Reply to an image, dear*");
		}
  
		return await updateProfilePicture(message, message.user, replyMessage, "fullpp");
	  } catch (error) {
		await message.error(`${error}\n\ncommand : fullpp`, error);
	  }
	}
  );
  
  smd(
	{
	  pattern: "rpp",
	  desc: "remove profile picture",
	  category: "whatsapp settings",
	  use: "<chat>",
	  fromMe: true,
	  filename: __filename,
	},
	async (message) => {
	  try {
		await message.removepp();
		message.send("*_Profile picture removed successfully!_*");
	  } catch (error) {
		await message.error(`${error}\n\ncommand : rpp`, error);
	  }
	}
  );
  
  smd(
	{
	  pattern: "edit-bio",
	  desc: "update profile status of whatsapp",
	  alias: ["bio", "editbio"],
	  category: "whatsapp settings",
	  use: "<text>",
	  fromMe: true,
	  filename: __filename,
	},
	async (message, text) => {
	  try {
		if (!text) {
		  return await message.send(
			`*_provide text to update profile status!_*\n*_Example: ${prefix}bio Suhail Md_*`
		  );
		}
  
		await message.bot.updateProfileStatus(text);
		message.send("*Profile status updated successfully!*");
	  } catch (error) {
		await message.error(`${error}\n\ncommand : bio`, error);
	  }
	}
  );
  cmd(
	{
	  pattern: "ptv",
	  desc: "send ptv Message of video",
	  category: "whatsapp settings",
	  filename: __filename,
	},
	async (message, _, { cmdName }) => {
	  try {
		if (!message.quoted) {
		  return await message.send("*Uhh Please, reply to video*");
		}
  
		const quoteType = message.quoted.mtype;
		if (quoteType !== "videoMessage") {
		  return await message.send("*Uhh Dear, reply to a video message*");
		}
  
		return await message.bot.forwardOrBroadCast2(message.chat, message.quoted, {}, cmdName);
	  } catch (error) {
		await message.error(`${error}\n\ncommand : ${cmdName}`, error);
	  }
	}
  );
  
  cmd(
	{
	  pattern: "save",
	  desc: "Save Message to log number",
	  category: "whatsapp settings",
	  filename: __filename,
	},
	async (message, _, { cmdName }) => {
	  try {
		const replyMessage = message.reply_message;
		if (!replyMessage) {
		  return await message.send("*Uhh Please, reply to to a Message*");
		}
  
		const forwardedMessage = await message.bot.forwardOrBroadCast(message.user, replyMessage);
	  } catch (error) {
		await message.error(`${error}\n\ncommand : ${cmdName}`, error);
	  }
	}
  );
  
  cmd(
	{
	  pattern: "quoted",
	  desc: "get reply Message from Replied Message",
	  category: "user",
	  filename: __filename,
	},
	async (message) => {
	  try {
		if (!message.quoted) {
		  return await message.send("*_Uhh Dear, Reply to a Message_*");
		}
  
		const serializedMessage = await message.bot.serializeM(await message.getQuotedObj());
		if (!serializedMessage || !serializedMessage.quoted) {
		  return await message.replay("*Message you replied does not contain a reply Message*");
		}
  
		try {
		  await message.react("✨", message);
		  const quotedMessage = await message.bot.serializeM(await serializedMessage.getQuotedObj());
		  return await message.bot.copyNForward(message.chat, quotedMessage, false);
		} catch (error) {
		  await message.bot.forward(message.chat, serializedMessage.quoted, {}, message);
		  console.log(error);
		}
	  } catch (error) {
		await message.error(`${error}\n\ncommand : quoted`, error);
	  }
	}
  );
  
  cmd(
	{
	  pattern: "blocklist",
	  desc: "get list of all Blocked Numbers",
	  category: "whatsapp settings",
	  fromMe: true,
	  filename: __filename,
	  use: "<text>",
	},
	async (message) => {
	  try {
		const blockedList = await message.bot.fetchBlocklist();
		if (blockedList.length === 0) {
		  return await message.reply("Uhh Dear, You don't have any Blocked Numbers.");
		}
  
		let listText = "\n*≡ List*\n\n*_Total Users:* " + blockedList.length + "_\n\n┌─⊷ \t*BLOCKED USERS*\n";
		for (let i = 0; i < blockedList.length; i++) {
		  listText += `▢ ${i + 1}:- wa.me/${blockedList[i].split("@")[0]}\n`;
		}
		listText += "└───────────";
  
		return await message.bot.sendMessage(message.chat, { text: listText });
	  } catch (error) {
		await message.error(`${error}\n\ncommand : blocklist`, error);
	  }
	}
  );
  cmd({
	pattern: "location",
	desc: "Adds *readmore* in given text.",
	category: "whatsapp settings",
	filename: __filename
  }, async (_0x4ee956, _0x22e2dc) => {
	try {
	  if (!_0x22e2dc) {
		return await _0x4ee956.reply("*Give Coordinates To Send Location!*\n *Ex: " + prefix + "location 24.121231,55.1121221*");
	  }
	  let _0x23101b = parseFloat(_0x22e2dc.split(",")[0]) || "";
	  let _0x4b8436 = parseFloat(_0x22e2dc.split(",")[1]) || "";
	  if (!_0x23101b || isNaN(_0x23101b) || !_0x4b8436 || isNaN(_0x4b8436)) {
		return await _0x4ee956.reply("*_Cordinates Not In Formate, Try Again_*");
	  }
	  await _0x4ee956.reply("*----------LOCATION------------*\n```Sending Location Of Given Data:\n Latitude: " + _0x23101b + "\n Longitude: " + _0x4b8436 + "```\n\n" + Config.caption);
	  return await _0x4ee956.sendMessage(_0x4ee956.jid, {
		location: {
		  degreesLatitude: _0x23101b,
		  degreesLongitude: _0x4b8436
		}
	  }, {
		quoted: _0x4ee956
	  });
	} catch (_0x4d92d0) {
	  await _0x4ee956.error(_0x4d92d0 + "\n\ncommand : location", _0x4d92d0);
	}
  });
  smd({
	pattern: "listpc",
	category: "whatsapp settings",
	desc: "Finds info about personal chats",
	filename: __filename
  }, async (_0x144fd0, _0x21857a, {
	store: _0x563c73
  }) => {
	try {
	  _0x144fd0.react("🫡");
	  let _0x196bf6 = await _0x563c73.chats.all().filter(_0x8b2b5 => _0x8b2b5.id.endsWith(".net")).map(_0x434198 => _0x434198);
	  let _0x4b7ff3 = " 「  " + Config.botname + "'s pm user list  」\n\nTotal " + _0x196bf6.length + " users are text in personal chat.";
	  for (let _0x15740d of _0x196bf6) {
		_0x4b7ff3 += "\n\nUser: @" + _0x15740d.id.split("@")[0] + "\nMessages : " + _0x15740d.unreadCount + "\nLastchat : " + moment(_0x15740d.conversationTimestamp * 1000).tz(timezone).format("DD/MM/YYYY HH:mm:ss");
	  }
	  _0x144fd0.bot.sendTextWithMentions(_0x144fd0.chat, _0x4b7ff3, _0x144fd0);
	} catch (_0x170045) {
	  return await _0x144fd0.error(_0x170045 + "\n\n command: listpc", _0x170045, "*_Didn't get any results, Sorry!_*");
	}
  });
  smd({
	pattern: "listgc",
	category: "whatsapp settings",
	desc: "Finds info about all active groups",
	filename: __filename
  }, async (_0xa220f, _0x123a92, {
	store: _0x4ff3e9,
	Void: _0x573654
  }) => {
	try {
	  _0xa220f.react("🫡");
	  let _0x369bef = await _0x4ff3e9.chats.all().filter(_0x17a722 => _0x17a722.id.endsWith("@g.us")).map(_0x2555de => _0x2555de);
	  let _0x162811 = " 「  " + Config.botname + "'s group user list  」\n\nTotal " + _0x369bef.length + " active Groups found!";
	  for (let _0x37fd61 of _0x369bef) {
		let _0x10ff83 = await _0x573654.groupMetadata(_0x37fd61.id);
		_0x162811 += "\n\nName : " + _0x10ff83.subject + " " + (_0x10ff83.owner ? "\nOwner : @" + _0x10ff83.owner.split("@")[0] : "") + "\nID : " + _0x37fd61.id + "\nMade : " + (_0x10ff83.creation ? moment(_0x10ff83.creation * 1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss") : _0x10ff83.creation) + "\nMember : " + (_0x10ff83.participants.length || 0) + "\n\nMessages : " + _0x37fd61.unreadCount + "\nLastchat : " + moment(_0x37fd61.conversationTimestamp * 1000).tz(timezone).format("DD/MM/YYYY HH:mm:ss");
	  }
	  _0xa220f.send(_0x162811, {}, "suhail", _0xa220f);
	} catch (_0x383d75) {
	  return await _0xa220f.error(_0x383d75 + "\n\n command: listpc", _0x383d75, "*_Didn't get any results, Sorry!_*");
	}
  });
  cmd({
	pattern: "vcard",
	desc: "Create Contact by given name.",
	category: "whatsapp settings",
	filename: __filename
  }, async (_0x2721c0, _0x4a39c4) => {
	try {
	  if (!_0x2721c0.quoted) {
		return _0x2721c0.reply("*Please Reply to User With Name*");
	  }
	  if (!_0x4a39c4) {
		return _0x2721c0.reply("Please Give Me User Name, \n *Example : " + prefix + "vcard Suhail Tech Info* ");
	  }
	  var _0x96de1e = _0x4a39c4.split(" ");
	  if (_0x96de1e.length > 3) {
		_0x4a39c4 = _0x96de1e.slice(0, 3).join(" ");
	  }
	  const _0x4ef0e2 = "BEGIN:VCARD\nVERSION:3.0\nFN:" + _0x4a39c4 + "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" + _0x2721c0.quoted.sender.split("@")[0] + ":+" + owner[0] + "\nEND:VCARD";
	  let _0x2438e1 = {
		contacts: {
		  displayName: _0x4a39c4,
		  contacts: [{
			vcard: _0x4ef0e2
		  }]
		}
	  };
	  return await _0x2721c0.bot.sendMessage(_0x2721c0.chat, _0x2438e1, {
		quoted: _0x2721c0
	  });
	} catch (_0x4812de) {
	  await _0x2721c0.error(_0x4812de + "\n\ncommand : vcard", _0x4812de);
	}
  });
  smd(
	{
	  pattern: "edit",
	  fromMe: true,
	  desc: "edit message that sended by bot",
	  type: "whatsapp settings",
	},
	async (message, newText) => {
	  try {
		const replyMessage = message.reply_message && message.reply_message.fromMe ? message.reply_message : false;
		if (!replyMessage) {
		  return await message.reply("_Reply to a message that sent by you!_");
		}
		if (!newText) {
		  return await message.reply("_Need text, Example: edit hi_");
		}
		return await message.edit(newText, { edit: replyMessage });
	  } catch (error) {
		await message.error(`${error}\n\ncommand : edit`, error);
	  }
	}
  );
  
  smd(
	{
	  pattern: "forward",
	  alias: ["send"],
	  desc: "forward your messages in your jid",
	  type: "whatsapp settings",
	},
	async (message, targetJid) => {
	  try {
		if (!message.reply_message) {
		  return message.reply("*_Reply to something!_*");
		}
		const parsedJids = await parsedJid(targetJid);
		if (!targetJid || !parsedJids || !parsedJids[0]) {
		  return await message.send(`*Provide jid to forward message*\n*use _${prefix}jid,_ to get jid of users!*`);
		}
		for (let i = 0; i < parsedJids.length; i++) {
		  message.bot.forwardOrBroadCast(parsedJids[i], message.reply_message);
		}
	  } catch (error) {
		await message.error(`${error}\n\ncommand : forward`, error);
	  }
	}
  );
  
  smd(
	{
	  cmdname: "block",
	  info: "blocks a person",
	  fromMe: true,
	  type: "whatsapp settings",
	  filename: __filename,
	  use: "<quote/reply user.>",
	},
	async (message) => {
	  try {
		let targetUser = message.reply_message
		  ? message.reply_message.sender
		  : !message.isGroup
		  ? message.from
		  : message.mentionedJid[0]
		  ? message.mentionedJid[0]
		  : "";
  
		if (!targetUser || !targetUser.includes("@s.whatsapp.net")) {
		  return await message.reply("*Uhh dear, reply/mention an User*");
		}
  
		if (message.checkBot(targetUser)) {
		  return await message.reply("*Huh, I can't block my Creator!!*");
		}
  
		await message.bot.updateBlockStatus(targetUser, "block")
		  .then(() => {
			message.react("✨", message);
		  })
		  .catch(() => message.reply("*_Can't block user, Sorry!!_*"));
	  } catch (error) {
		await message.error(`${error}\n\ncommand: block`, error, false);
	  }
	}
  );
  
  smd(
	{
	  cmdname: "unblock",
	  info: "Unblocked user.",
	  type: "whatsapp settings",
	  fromMe: true,
	  filename: __filename,
	},
	async (message) => {
	  try {
		let targetUser = message.reply_message
		  ? message.reply_message.sender
		  : !message.isGroup
		  ? message.from
		  : message.mentionedJid[0]
		  ? message.mentionedJid[0]
		  : "";
  
		if (!targetUser || !targetUser.includes("@s.whatsapp.net")) {
		  return await message.reply("*Uhh dear, reply/mention an User*");
		}
  
		await message.bot.updateBlockStatus(targetUser, "unblock")
		  .then(() =>
			message.send(`*@${targetUser.split("@")[0]} Unblocked Successfully..!*`, { mentions: [users] })
		  )
		  .catch(() => message.reply("*_Can't Unblock user, Make sure user blocked!!_*"));
	  } catch (error) {
		await message.error(`${error}\n\ncommand: unblock`, error);
	  }
	}
  );
  cmd({
	pattern: "vv",
	alias: ["viewonce", "retrive"],
	desc: "download viewOnce Message.",
	category: "whatsapp settings",
	use: "<query>",
	filename: __filename
  }, async (_0x9034b9, _0x25fb23) => {
	try {
	  var _0x1fd65b = _0x9034b9.reply_message && _0x9034b9.reply_message.viewOnce ? _0x9034b9.reply_message : false;
	  if (!_0x1fd65b) {
		return _0x9034b9.reply("```Please Reply A ViewOnce Message```");
	  }
	  let _0x1bc847 = {
		key: _0x1fd65b.key,
		message: {
		  conversation: "```[VIEWONCE FOUND DOWNLOAD 100%]```"
		}
	  };
	  let _0x201e84 = await _0x9034b9.bot.downloadAndSaveMediaMessage(_0x1fd65b.msg);
	  await _0x9034b9.bot.sendMessage(_0x9034b9.jid, {
		[_0x1fd65b.mtype2.split("Mes")[0]]: {
		  url: _0x201e84
		},
		caption: _0x1fd65b.body
	  }, {
		quoted: _0x1bc847
	  });
	} catch (_0x1a1295) {
	  await message.error(_0x1a1295 + "\n\ncommand: vv", _0x1a1295);
	}
  });