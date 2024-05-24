const moment = require("moment-timezone");
const Config = require("../config");
let { amd, prefix, parsedJid, UserFunction } = require("../lib");
UserFunction(
  {
    pattern: "jids",
    desc: "get jid of all user in a group.",
    category: "whatsapp",
    filename: __filename,
    use: "<@user>",
  },
  async ({ jid: users, reply: data, quoted: scraped }) => {
    if (scraped) {
      return data(scraped.sender);
    } else {
      return data(users);
    }
  }
);
UserFunction(
  {
    pattern: "getpp",
    desc: "Get Profile Pic For Given User",
    category: "whatsapp",
    filename: __filename,
  },
  async (message) => {
    try {
      let request = message.reply_message
        ? message.reply_message.sender
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : message.from;
      let output;
      try {
        output = await message.bot.profilePictureUrl(request, "image");
      } catch (_0x42ab42) {
        return message.reply("```Profile Pic Not Fetched```");
      }
      return await message.bot.sendMessage(
        message.chat,
        {
          image: {
            url: output,
          },
        },
        {
          quoted: message,
        }
      );
    } catch (err) {
      await message.error(err + "\n\ncommand : getpp", err);
    }
  }
);
UserFunction(
  {
    pattern: "wa",
    desc: "Makes wa me of quoted or mentioned user.",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    try {
      let match = message.reply_message
        ? message.reply_message.sender
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : false;
      await message.reply(
        !match
          ? "*Please Reply Or Mention A User*"
          : "https://wa.me/" + match.split("@")[0]
      );
    } catch (err) {
      await message.error(err + "\n\ncommand : wa", err, false);
    }
  }
);
UserFunction(
  {
    pattern: "wame",
    desc: "Makes wa me for user.",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    try {
      return await message.reply(
        "https://wa.me/" + message.sender.split("@")[0]
      );
    } catch {}
  }
);

UserFunction(
  {
    pattern: "blocked",
    desc: "Get list of all Blocked Numbers",
    category: "whatsapp",
    fromMe: true,
    filename: __filename,
    use: "<text>",
  },
  async (msg) => {
    try {
      const MSG = await msg.bot.fetchBlocklist();
      if (MSG.length === 0) {
        return await msg.reply("No Blocked Numbers Found!");
      }
      let Info_MSG = `
*≡ List*
*_Total Users:* ${MSG.length}
┌─⊷ \t*BLOCKED USERS*
`;
      for (let each_found = 0; each_found < MSG.length; each_found++) {
        Info_MSG +=
          "▢ " +
          (each_found + 1) +
          ":- wa.me/" +
          MSG[each_found].split("@")[0] +
          "\n";
      }
      Info_MSG += "└───────────";
      return await msg.bot.sendMessage(msg.chat, {
        text: Info_MSG,
      });
    } catch (err) {
      await msg.error(err + "\n\ncommand : blocklist", err);
    }
  }
);
amd(
  {
    pattern: "chats",
    category: "whatsapp",
    desc: "Finds info about personal chats",
    filename: __filename,
  },
  async (message, match, { store: data }) => {
    try {
      message.react("🗨️");
      let results = await data.chats
        .all()
        .filter((jids) => jids.id.endsWith(".net"))
        .map((users) => users);
      let msg = `
[ ${Config.botname}' Chats 」
ALl ${results.length} Users In Personal Chat.
`;
      for (let _0x4d6030 of results) {
        msg +=
          "\n\nUser: @" +
          _0x4d6030.id.split("@")[0] +
          "\nMessages : " +
          _0x4d6030.unreadCount +
          "\nLastchat : " +
          moment(_0x4d6030.conversationTimestamp * 1000)
            .tz(timezone)
            .format("DD/MM/YYYY HH:mm:ss");
      }
      message.bot.sendTextWithMentions(message.chat, msg, message);
    } catch (erro) {
      return await message.error(
        erro + "\n\n command: chats",
        erro,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
amd(
  {
    pattern: "groups",
    category: "whatsapp",
    desc: "Finds info about all active groups",
    filename: __filename,
  },
  async (message, match, { store: data, Void: groups }) => {
    try {
      message.react("🫡");
      let data = await data.chats
        .all()
        .filter((jids) => jids.id.endsWith("@g.us"))
        .map((gc_data) => gc_data);
      let msg =
        " 「  " +
        Config.botname +
        "' Groups  」\n\nAll " +
        data.length +
        " active Groups found!";
      for (let _0xd36fa of data) {
        let found_data = await groups.groupMetadata(_0xd36fa.id);
        msg +=
          "\n\nName : " +
          found_data.subject +
          " " +
          (found_data.owner
            ? "\nOwner : @" + found_data.owner.split("@")[0]
            : "") +
          "\nID : " +
          _0xd36fa.id +
          "\nMade : " +
          (found_data.creation
            ? moment(found_data.creation * 1000)
                .tz("Asia/Kolkata")
                .format("DD/MM/YYYY HH:mm:ss")
            : found_data.creation) +
          "\nMember : " +
          (found_data.participants.length || 0) +
          "\n\nMessages : " +
          _0xd36fa.unreadCount +
          "\nLastchat : " +
          moment(_0xd36fa.conversationTimestamp * 1000)
            .tz(timezone)
            .format("DD/MM/YYYY HH:mm:ss");
      }
      message.send(msg, {}, "suhail", message);
    } catch (err) {
      return await message.error(
        err + "\n\n command: listpc",
        err,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "vcard",
    desc: "Create Contact by given name.",
    category: "whatsapp",
    filename: __filename,
  },
  async (mesage, match) => {
    try {
      if (!mesage.quoted) {
        return mesage.reply("*Please Reply to User With Name*");
      }
      if (!match) {
        return mesage.reply(
          "Please Give Me User Name, \n *Example : " +
            prefix +
            "vcard Astropeda* "
        );
      }
      var data = match.split(" ");
      if (data.length > 3) {
        match = data.slice(0, 3).join(" ");
      }
      const reults =
        "BEGIN:VCARD\nVERSION:3.0\nFN:" +
        match +
        "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" +
        mesage.quoted.sender.split("@")[0] +
        ":+" +
        owner[0] +
        "\nEND:VCARD";
      let output = {
        contacts: {
          displayName: match,
          contacts: [
            {
              vcard: reults,
            },
          ],
        },
      };
      return await mesage.bot.sendMessage(mesage.chat, output, {
        quoted: mesage,
      });
    } catch (err) {
      await mesage.error(err + "\n\ncommand : vcard", err);
    }
  }
);
amd(
  {
    pattern: "edit",
    fromMe: true,
    desc: "edit message that sended by bot",
    type: "whatsapp",
  },
  async (mesg, match) => {
    try {
      let message =
        mesg.reply_message && mesg.reply_message.fromMe
          ? mesg.reply_message
          : false;
      if (!message) {
        return await mesg.reply("_Reply to a message that sent by you!_");
      }
      if (!match) {
        return await mesg.reply("Need text, Example: " + prefix + "edit hi");
      }
      return await mesg.edit(match, {
        edit: message,
      });
    } catch (err) {
      await mesg.error(err + "\n\ncommand : edit", err);
    }
  }
);
amd(
  {
    pattern: "forward",
    alias: ["send"],
    desc: "forward your messages in jid",
    type: "whatsapp",
  },
  async (m, math) => {
    try {
      if (!m.reply_message) {
        return m.reply("*_Reply to something!_*");
      }
      let match = await parsedJid(math);
      if (!match || !match[0]) {
        return await m.send(
          "*Provide jid to forward message*\n*use _" +
            prefix +
            "jid,_ to get jid of users!*"
        );
      }
      for (let text = 0; text < match.length; text++) {
        m.bot.forwardOrBroadCast(match[text], m.reply_message);
      }
    } catch (err) {
      await m.error(err + "\n\ncommand : forward", err);
    }
  }
);
amd(
  {
    cmdname: "block",
    info: "blocks a person",
    fromMe: true,
    type: "whatsapp",
    filename: __filename,
    use: "<quote/reply user.>",
  },
  async (msg) => {
    try {
      let match = msg.reply_message
        ? msg.reply_message.sender
        : !msg.isGroup
        ? msg.from
        : msg.mentionedJid[0]
        ? msg.mentionedJid[0]
        : "";
      if (!match && !match.includes("@s.whatsapp.net")) {
        return await msg.reply("*Reply/mention an User*");
      }
      if (msg.checkBot(match)) {
        return await msg.reply("*I can't block my Creator!!*");
      }
      await msg.bot
        .updateBlockStatus(match, "block")
        .then((_0x112d4d) => {
          msg.react("✨", msg);
        })
        .catch((err) => msg.reply("*_Can't block user, Sorry!!_*"));
    } catch (err) {
      await msg.error(err + "\n\ncommand: block", err, false);
    }
  }
);
amd(
  {
    cmdname: "unblock",
    info: "Unblocked user.",
    type: "whatsapp",
    fromMe: true,
    filename: __filename,
  },
  async (msg) => {
    try {
      let match = msg.reply_message
        ? msg.reply_message.sender
        : !msg.isGroup
        ? msg.from
        : msg.mentionedJid[0]
        ? msg.mentionedJid[0]
        : "";
      if (!match && !match.includes("@s.whatsapp.net")) {
        return await msg.reply("*Reply/mention an User*");
      }
      await msg.bot
        .updateBlockStatus(match, "unblock")
        .then((_0x4f3a25) =>
          msg.send("*@" + match.split("@")[0] + " Unblocked Successfully..!*", {
            mentions: [users],
          })
        )
        .catch((_0x2f7e88) =>
          msg.reply("*_Can't Unblock user, Make sure user blocked!!_*")
        );
    } catch (err) {
      await msg.error(err + "\n\ncommand: unblock", err);
    }
  }
);
UserFunction(
  {
    pattern: "vv",
    desc: "download viewOnce Message.",
    category: "whatsapp",
    use: "<query>",
    filename: __filename,
  },
  async (message, match) => {
    try {
      var int = false;
      if (message.reply_message) {
        if (
          message.reply_message.viewOnce ||
          (message.device === "ios" &&
            /audioMessage|videoMessage|imageMessage/g.test(
              message.reply_message.mtype
            ))
        ) {
          int = message.reply_message;
        }
      }
      int.mtype = int.mtype2;
      if (!int) {
        return message.reply("```Please Reply A ViewOnce Message```");
      }
      /*  let m_body = {
          key: int.key,
          message: {
            conversation: "\`\`\`[VIEWONCE FOUND DOWNLOAD 100%]\`\`\`",
          },
        }; */
      let saved_msf = await message.bot.downloadAndSaveMediaMessage(int.msg);
      await message.bot.sendMessage(message.sender, {
        [int.mtype2.split("Mess")[0]]: {
          url: saved_msf,
        },
        caption: int.body,
      });
    } catch (err) {
      await message.error(err + "\n\ncommand: vv", err);
    }
  }
);
global.pinging = class _Ping {
  constructor() {
    this._before = new Date().getTime();
    this._after = new Date().getTime();
  }
  before() {
    this._before = new Date().getTime();
  }
  start() {
    this._before = new Date().getTime();
  }
  after() {
    this._after = new Date().getTime();
  }
  end() {
    this._after = new Date().getTime();
  }
  ping() {
    return this._after - this._before;
  }
};
UserFunction(
  {
    pattern: "save",
    desc: "Save whatsapp status",
    category: "whatsapp",
    filename: __filename,
    use: "< status >",
  },
  async (message) => {
    try {
      let mm =
        message.reply_message && message.reply_message.status
          ? message.reply_message
          : false;
      if (mm) {
        message.bot.forwardOrBroadCast(message.user, mm, {
          quoted: { key: mm.key, message: mm.message },
        });
      } else message.send("*reply to whatsapp status*");
    } catch (e) {
      await message.error(`${e}\n\ncommand : #(Status Saver)`, e, false);
    }
  }
);
global.waPresence =
  process.env.WAPRESENCE && process.env.WAPRESENCE === "online"
    ? "available"
    : process.env.WAPRESENCE || "";
global.YT_PROMOTE = "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z";
global.config_dir = require("path").join(__dirname, "../", "./config");

global.gurl =
  process.env.GURL || "https://whatsapp.com/channel/0029VaPGt3QEwEjpBXT4Rv0z";
global.THUMB_IMAGE =
  process.env.IMAGE ||
  process.env.THUMB_IMAGE ||
  "https://i.imgur.com/JMsAFRD.jpeg";
global.devs = `2348039607375,${global.spidy || global.miles || "spider_man"}`;
global.sudo = process.env.SUDO
  ? process.env.SUDO.replace(/[\s+]/g, "")
  : "2348039607375";
global.owner = process.env.OWNER_NUMBER
  ? process.env.OWNER_NUMBER.replace(/[\s+]/g, "")
  : "2348039607375";

global.read_status_from =
  process.env.READ_STATUS_FROM || "2348039607375,2349027862116";

try {
  return;

  if (
    require(lib_dir + "/schemes.js").tempdb &&
    require(__dirname + `/bot/setting.js`)
  ) {
    console.log("Asta-Md");
    return "Botto";
  }

  global.auto_send_status = process.env.AUTO_SEND_STATUS || "true";

  const regexSend = new RegExp(
    `\\b(?:${[
      "send",
      "share",
      "snd",
      "give",
      "save",
      "sendme",
      "forward",
      "fwd",
    ].join("|")})\\b`,
    "i"
  );
  UserFunction({ on: "quoted" }, async (message, text) => {
    try {
      let mm = message.reply_message.status ? message.reply_message : false;
      if (mm && regexSend.test(text.toLowerCase())) {
        if (global.auto_send_status == "true")
          message.bot.forwardOrBroadCast(
            message.fromMe ? message.user : message.from,
            mm,
            { quoted: { key: mm.key, message: mm.message } }
          );
      }
    } catch (e) {
      console.log(e);
    }
  });

  let status = false,
    times = 0;
  UserFunction({ on: "main" }, async (message, text, { icmd }) => {
    try {
      if (!status) {
        try {
          status = true;
        } catch (e) {}
      }

      if (message.status) return;
      if (
        `${global.readmessagefrom}`.includes(message.senderNum) ||
        ["yes", "true", "ok", "sure"].includes(global.readmessage) ||
        (icmd && ["yes", "true", "ok", "sure"].includes(global.readcmds))
      )
        message.bot.readMessages([message.key]);
    } catch (e) {
      console.log(e);
    }
  });

  UserFunction({ on: "text" }, async (message, text, { icmd }) => {
    try {
      if (
        [
          "unavailable",
          "available",
          "composing",
          "recording",
          "paused",
        ].includes(waPresence)
      )
        message.bot.sendPresenceUpdate(waPresence, message.from);
    } catch (e) {
      console.log(e);
    }
  });
  UserFunction({ on: "status" }, async (message, text) => {
    try {
      if (
        `${global.read_status_from}`
          .split(",")
          .includes(message.key.participant.split("@")[0]) ||
        ["yes", "true", "ok", "sure"].includes(global.read_status) ||
        message.fromMe ||
        message.isSuhail
      ) {
        await message.bot.readMessages([{ ...message.key, fromMe: false }]);
      }
      if (
        (`${global.save_status_from}`
          .split(",")
          .includes(message.key.participant.split("@")[0]) ||
          ["yes", "true", "ok", "sure"].includes(global.save_status)) &&
        !message.fromMe
      ) {
        await message.bot.forwardOrBroadCast(message.user, message, {
          quoted: { key: message.key, message: message.message },
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
} catch (e) {}
