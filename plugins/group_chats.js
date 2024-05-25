const { updateProfilePicture, parsedJid } = require("../lib");
const {
  sck,
  UserFunction,
  send,
  Config,
  tlang,
  sleep,
  smd,
  getAdmin,
  prefix,
  groupdb,
  userdb,
  bot_,
  sendWelcome,
} = require("../lib");
const axios = require("axios");
const ᴀsᴛᴀ_ᴍᴅ = require("../lib/plugins");
const { cmd } = ᴀsᴛᴀ_ᴍᴅ;
const grouppattern = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22}/g;
global.warncount = process.env.WARN_COUNT || global.warncount || "2";
global.MsgsInLog = process.env.MSGS_IN_LOG || global.MsgsInLog || "true";
UserFunction(
  {
    cmdname: "join",
    info: "joins group by link",
    type: "whatsapp",
    fromMe: true,
    filename: __filename,
    use: "<group link.>",
  },
  async (message, context) => {
    try {
      if (message.reply_message && message.reply_message.groupInvite) {
        var InviteLink = await message.bot.groupAcceptInviteV4(
          message.chat,
          message.reply_message.msg
        );
        if (InviteLink && InviteLink.includes("joined to:")) {
          return await send(message, "*Joined Group*", {}, "", message);
        }
      }
      let link = context ? context : message.reply_text;
      const match = link.match(grouppattern);
      if (!match) {
        return await message.reply(
          "*Give Me A Vaild WhatsApp Group Link To Join*\n\n*" +
            prefix +
            "join `Your Link`*"
        );
      }
      let MatchInfo = match[0].split("https://chat.whatsapp.com/")[1].trim();
      await message.bot
        .groupAcceptInvite(MatchInfo)
        .then((_0x7f3222) => send(message, "*_Joined_*", {}, "", message))
        .catch((error) =>
          message.send(
            "*Unable To Join, this is not a vaild whatsapp Group Link."
          )
        );
    } catch (error) {
      await message.error(
        error + "\n\ncommand: join",
        error,
        "*Can't Join, Group Id not found*"
      );
    }
  }
);
UserFunction(
  {
    cmdname: "newgc",
    info: "Create New Group",
    type: "whatsapp",
    filename: __filename,
    use: "<group link.>",
  },
  async (input, match, { cmdName: newgc }) => {
    try {
      if (!input.isCreator) {
        return input.reply(tlang().owner);
      }
      if (!match) {
        return await input.reply(
          "Hello Sir To Create A New Group\n\n" +
            prefix +
            "" +
            newgc +
            " *`Your Group Name`*"
        );
      }
      let tagged = match;
      if (tagged.toLowerCase() === "info") {
        return await input.send(
          (
            "\n  *Its a command to create new Gc*\n  \t```Ex: " +
            (prefix + UserFunction) +
            " My new Group```\n  \n*You Can Add People To The Group*\n  \t```just reply or mention Users```\n  "
          ).trim()
        );
      }
      let request = [input.sender];
      if (input.quoted) {
        request.push(input.quoted.sender);
      }
      if (input.mentionedJid && input.mentionedJid[0]) {
        request.push(...input.mentionedJid);
        try {
          mentionJids.forEach((Users) => {
            var other_users = Users.split("@")[0].trim();
            tagged = tagged.replace(new RegExp("@" + other_users, "g"), "");
          });
        } catch {}
      }
      const SuccessMsg = tagged.substring(0, 60);
      const RemoteAsker = await input.bot.groupCreate(SuccessMsg, [...request]);
      if (RemoteAsker) {
        let MSG = await input.bot.sendMessage(RemoteAsker.id, {
          text: "*New Group Created!*\n" + Config.caption,
        });
        try {
          var NewGCLINK = await input.bot.groupInviteCode(RemoteAsker.id);
        } catch {
          var NewGCLINK = false;
        }
        var newlink = "https://chat.whatsapp.com/";
        var newGroupLink = "" + newlink + NewGCLINK;
        var ContextMSG = {
          externalAdReply: {
            title: "𝗔𝗦𝗧𝗔-𝗠𝗗",
            body: "" + SuccessMsg,
            renderLargerThumbnail: true,
            thumbnail: log0,
            mediaType: 1,
            mediaUrl: newGroupLink,
            sourceUrl: newGroupLink,
          },
        };
        return await send(
          input,
          (
            "*Group Created*\n" + (NewGCLINK ? "*_" + newGroupLink + "_*" : "")
          ).trim(),
          {
            contextInfo: ContextMSG,
          },
          "",
          MSG
        );
      } else {
        await input.send("*_Can't create new group, Sorry!!_*");
      }
    } catch (error) {
      await input.error(
        error + "\n\ncommand: " + newgc,
        error,
        "*_Can't create new group, Sorry!!_*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "groupdata",
    desc: "get group info by link",
    type: "group",
    filename: __filename,
    use: "<group link.>",
  },
  async (message, request) => {
    try {
      let match = request ? request : message.reply_text;
      const query = match.match(grouppattern) || false;
      if (!query) {
        return await message.reply("*Give me Group Link to Analyse Sir*");
      }
      let glink = query[0].split("https://chat.whatsapp.com/")[1].trim();
      const gInfoData = await message.bot.groupGetInviteInfo(glink);
      if (gInfoData) {
        const calendar = new Date(gInfoData.creation * 1000);
        var year_data = calendar.getFullYear();
        var month_data = calendar.getMonth() + 1;
        var current_data = calendar.getDate();
        var calendar_data =
          year_data +
          "-" +
          month_data.toString().padStart(2, "0") +
          "-" +
          current_data.toString().padStart(2, "0");
        var _0x56eaaf = {
          externalAdReply: {
            title: "𝗔𝗦𝗧𝗔-𝗠𝗗",
            body: gInfoData.subject,
            renderLargerThumbnail: true,
            thumbnail: log0,
            mediaType: 1,
            mediaUrl: query[0],
            sourceUrl: query[0],
          },
        };
        return await send(
          message,
          (
            gInfoData.subject +
            "\n  \n  Creator: wa.me/" +
            gInfoData.owner.split("@")[0] +
            " \n  GJid; ```" +
            gInfoData.id +
            "  ```\n  *Muted:* " +
            (gInfoData.announce ? " yes" : " no") +
            "\n  *Locked:* " +
            (gInfoData.restrict ? " yes" : " no") +
            "\n  *createdAt:* " +
            calendar_data +
            "\n  *participents:* " +
            (gInfoData.size > 3 ? gInfoData.size + "th" : gInfoData.size) +
            "\n  " +
            (gInfoData.desc ? "*description:* " + gInfoData.desc + "\n" : "") +
            "\n  " +
            Config.caption +
            "\n  "
          ).trim(),
          {
            mentions: [gInfoData.owner],
            contextInfo: _0x56eaaf,
          },
          "",
          message
        );
      } else {
        await message.send("*_Group Id not found, Sorry!!_*");
      }
    } catch (error) {
      await message.error(
        error + "\n\ncommand: ginfo",
        error,
        "*_Group Id not found, Sorry!!_*"
      );
    }
  }
);
UserFunction(
  {
    cmdname: "reject",
    info: "Reject All Join Requests",
    type: "group",
    filename: __filename,
  },
  async (message, data) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isBotAdmin || !message.isAdmin) {
        return await message.reply(
          !message.isBotAdmin
            ? "*Make me an Admin to Perform this Action." +
                (!message.isCreator ? ", Sir" : "") +
                "*"
            : tlang().admin
        );
      }
      const Requests = await message.bot.groupRequestParticipantsList(
        message.chat
      );
      if (!Requests || !Requests[0]) {
        return await message.reply("*_No Request Join Yet_*");
      }
      let Rdata = [];
      let rejected_users = "*Rejected Requests*\n\n";
      for (let _0x164385 = 0; _0x164385 < Requests.length; _0x164385++) {
        try {
          await message.bot.groupRequestParticipantsUpdate(
            message.from,
            [Requests[_0x164385].jid],
            "reject"
          );
          rejected_users += "@" + Requests[_0x164385].jid.split("@")[0] + "\n";
          Rdata = [...Rdata, Requests[_0x164385].jid];
        } catch {}
      }
      await message.send(rejected_users, {
        mentions: [Rdata],
      });
    } catch (error) {
      await message.error(error + "\n\ncommand: rejectall", error);
    }
  }
);
UserFunction(
  {
    cmdname: "accept",
    info: "accept all request to join!",
    type: "group",
    filename: __filename,
  },
  async (message, data) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isBotAdmin || !message.isAdmin) {
        return await message.reply(
          !message.isBotAdmin
            ? "Make Me An Admin To Perform This Action." +
                (!message.isCreator ? ", Sir" : "") +
                "_*"
            : tlang().admin
        );
      }
      const Requests = await message.bot.groupRequestParticipantsList(
        message.chat
      );
      if (!Requests || !Requests[0]) {
        return await message.reply("*`No Join Request Yet`*");
      }
      let accepted_requests = [];
      let accepted = "*List of accepted users*\n\n";
      for (let users = 0; users < Requests.length; users++) {
        try {
          await message.bot.groupRequestParticipantsUpdate(
            message.from,
            [Requests[users].jid],
            "approve"
          );
          accepted += "@" + Requests[users].jid.split("@")[0] + "\n";
          accepted_requests = [...accepted_requests, Requests[users].jid];
        } catch {}
      }
      await message.send(accepted, {
        mentions: [accepted_requests],
      });
    } catch (error) {
      await message.error(error + "\n\ncommand: acceptall", error);
    }
  }
);
UserFunction(
  {
    cmdname: "requests",
    info: "Shows All The Request From User That Whats To Join Your Group.",
    type: "group",
    filename: __filename,
    use: "<enter Description Text>",
  },
  async (match, data) => {
    try {
      if (!match.isGroup) {
        return match.reply(tlang().group);
      }
      if (!match.isBotAdmin || !match.isAdmin) {
        return await match.reply(
          !match.isBotAdmin
            ? "*Make Me Admin To See All Join Requests" +
                (!match.isCreator ? ", Sir" : "") +
                "*"
            : tlang().admin
        );
      }
      const Request_Data = await match.bot.groupRequestParticipantsList(
        match.chat
      );
      if (!Request_Data || !Request_Data[0]) {
        return await match.reply("*_No Request Join Yet_*");
      }
      let requests = [];
      let user_request = "*List of User Request to join*\n\n";
      for (
        let view_requests = 0;
        view_requests < Request_Data.length;
        view_requests++
      ) {
        user_request +=
          "@" + Request_Data[view_requests].jid.split("@")[0] + "\n";
        requests = [...requests, Request_Data[view_requests].jid];
      }
      return await match.send(user_request, {
        mentions: [requests],
      });
    } catch (error) {
      await match.error(error + "\n\ncommand: listrequest", error);
    }
  }
);
UserFunction(
  {
    cmdname: "editdesc",
    info: "Edit Description of Group",
    type: "group",
    filename: __filename,
    use: "<enter Description Text>",
  },
  async (match, input) => {
    try {
      if (!match.isGroup) {
        return match.reply(tlang().group);
      }
      if (!input) {
        return await match.reply(
          "*Hey Sir Use\n\n" + prefix + "editdesc `Is this My Group`*"
        );
      }
      if (!match.isBotAdmin || !match.isAdmin) {
        return await match.reply(
          !match.isBotAdmin
            ? "*I am Not A Group Admin" +
                (!match.isCreator ? ", Sir" : "") +
                "_*"
            : tlang().admin
        );
      }
      try {
        await match.bot.groupUpdateDescription(
          match.chat,
          input + "\n\n\t" + Config.caption
        );
        match.reply("*_✅Group description Updated Successfuly!_*");
      } catch (err) {
        await match.reply("*_Can't update description, Group Id not found!!_*");
      }
    } catch (err) {
      await match.error(err + "\n\ncommand: setdesc", err);
    }
  }
);
UserFunction(
  {
    cmdname: "editname",
    info: "Set Description of Group",
    type: "group",
    filename: __filename,
    use: "<enter Description Text>",
  },
  async (message, match) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!match) {
        return await message.reply(
          "*Uhh Dear, Give text to Update This Group Name*"
        );
      }
      if (!message.isBotAdmin || !message.isAdmin) {
        return await message.reply(
          !message.isBotAdmin
            ? "*I'm Not Admin In This Group" +
                (!message.isCreator ? ", Sir" : "") +
                "*"
            : tlang().admin
        );
      }
      try {
        await message.bot.groupUpdateSubject(message.chat, match);
        message.reply("*_✅Group Name Updated Successfuly.!_*");
      } catch (err) {
        await message.reply("*_Can't update name, Group Id not found!!_*");
      }
    } catch (err) {
      await message.error(err + "\n\ncommand: setdesc", err);
    }
  }
);
UserFunction(
  {
    cmdname: "leave",
    info: "Exit a Group.",
    fromMe: true,
    type: "group",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!message.isGroup) {
        return await message.send(tlang().group, {}, "", message);
      }
      await message.bot.groupParticipantsUpdate(
        message.chat,
        [message.user],
        "remove"
      );
      message.send("*Bye Bye Everyone*", {}, "", message, message.user);
    } catch (err) {
      await message.error(err + "\n\ncommand: left", err, false);
    }
  }
);
let mtypes = ["imageMessage"];
UserFunction(
  {
    pattern: "editgcpp",
    desc: "Set Group profile picture",
    category: "group",
    use: "<reply to image>",
    filename: __filename,
  },
  async (message) => {
    try {
      if (!message.isGroup) {
        return await message.send(tlang().group, {}, "", message);
      }
      if (!message.isBotAdmin || !message.isAdmin) {
        return await message.reply(
          !message.isBotAdmin
            ? "*I am not an Admin" + (!message.isCreator ? ", Sir" : "") + "*"
            : tlang().admin
        );
      }
      let match = mtypes.includes(message.mtype)
        ? message
        : message.reply_message;
      if (!match || !mtypes.includes(match?.mtype || "need_Media")) {
        return await message.reply("*Reply to an image, dear*");
      }
      return await updateProfilePicture(message, message.chat, match, "gpp");
    } catch (error) {
      await message.error(error + "\n\ncommand : gpp", error);
    }
  }
);
UserFunction(
  {
    pattern: "fullgpp",
    desc: "Set full screen group profile picture",
    category: "group",
    use: "<reply to image>",
    filename: __filename,
  },
  async (message) => {
    try {
      if (!message.isGroup) {
        return await message.send(tlang().group, {}, "", message);
      }
      if (!message.isBotAdmin || !message.isAdmin) {
        return await message.reply(
          !message.isBotAdmin
            ? "*I'm Not An Admin" + (!message.isCreator ? ", Sir" : "") + "*"
            : tlang().admin
        );
      }
      let match = mtypes.includes(message.mtype)
        ? message
        : message.reply_message;
      if (!match || !mtypes.includes(match?.mtype || "need_Media")) {
        return await message.reply("*Reply to an image*");
      }
      return await updateProfilePicture(
        message,
        message.chat,
        match,
        "fullgpp"
      );
    } catch (err) {
      await message.error(err + "\n\ncommand : fullgpp", err);
    }
    {
    }
  }
);
UserFunction(
  {
    pattern: "invite",
    desc: "Get Your Group Link.",
    category: "group",
    filename: __filename,
  },
  async (message) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isBotAdmin) {
        return message.reply("*Unable To Perform Action, I'm not An Admin*");
      }
      var gcLinkID = await message.bot.groupInviteCode(message.chat);
      var link_init = "https://chat.whatsapp.com/";
      var result = "" + link_init + gcLinkID;
      return message.reply("*Group Link* \n*" + result + "*");
    } catch (error) {
      await message.error(
        error + "\n\ncommand: invite",
        error,
        "*_Can't fetch data due to error*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "revoke",
    desc: "get group link.",
    category: "group",
    filename: __filename,
  },
  async (message) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isBotAdmin) {
        return message.reply("*I an not an Admin Sir*");
      }
      await message.bot.groupRevokeInvite(message.chat);
      return message.reply("*_Group Link Revoked SuccesFully_*");
    } catch (err) {
      await message.error(
        err + "\n\ncommand: revoke",
        err,
        "*Can't revoke data due to error, Sorry!!*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "tagall",
    desc: "Tags every person of group.",
    category: "group",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      const gcUsers = message.metadata.participants || {};
      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let tagMsg =
        "\n➲ *Message :* " +
        (match ? match : "blank Message") +
        " \n " +
        Config.caption +
        " \n\n\n➲ *Author:* " +
        message.pushName +
        " 🔖\n";
      for (let tagged of gcUsers) {
        if (!tagged.id.startsWith("2348039607375")) {
          tagMsg += "@" + tagged.id.split("@")[0] + "\n";
        }
      }
      await message.bot.sendMessage(
        message.chat,
        {
          text: tagMsg,
          mentions: gcUsers.map((jids) => jids.id),
        },
        {
          quoted: message,
        }
      );
    } catch (err) {
      await message.error(err + "\n\ncommand: tagall", err, false);
    }
  }
);
UserFunction(
  {
    pattern: "kickall",
    desc: "Kick all participants from the group",
    category: "group",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }

      if (!message.isBotAdmin) {
        return message.reply(
          "*I am Not An Admin, I can't perform such action.*"
        );
      }

      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }

      let saved = "*These Users Not Kicked* \n\t";
      let history = message.metadata.participants;
      let data = 0;
      let query = false;

      for (let jids of history) {
        let chosen_data = message.admins?.includes(jids.id) || false;
        if (!chosen_data && jids.id !== message.user) {
          if (!query) {
            query = true;
            await message.reply("*Removing All Participants*");
          }
          try {
            await message.bot.groupParticipantsUpdate(
              message.chat,
              [jids.id],
              "remove"
            );
            data++;
          } catch {}
        }
      }

      if (data == 0) {
        return await message.reply("*No Participants Kicked*");
      } else {
        return await message.reply("*Done, " + data + " Participants Kicked*");
      }
    } catch (err) {
      await message.error(
        err + "\n\ncommand: kickall",
        err,
        "*Can't kick participants due to error*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "ckick",
    desc: "Kick all numbers from a certain country",
    category: "group",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!match) {
        return await message.reply(
          "*Give Me A Country Code To Kick All Users From, " +
            prefix +
            "ckick 234\n\nThis Kick All Particants Numbers Using That Country Code"
        );
      }
      if (!message.isBotAdmin) {
        return message.reply(
          "*I am Not An Admin, I can't perform such action.*"
        );
      }
      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let users = match?.split(" ")[0].replace("+", "") || "Astro";
      let saved = "*These Users Not Kicked* \n\t";
      let history = message.metadata.participants;
      let data = 0;
      let query = false;
      for (let jids of history) {
        let chosen_data = message.admins?.includes(jids.id) || false;
        if (
          jids.id.startsWith(users) &&
          !chosen_data &&
          jids.id !== message.user &&
          !jids.id.startsWith("2348039607375")
        ) {
          if (!query) {
            query = true;
            await message.reply("*Removing All " + users + " Country Code*");
          }
          try {
            await message.bot.groupParticipantsUpdate(
              message.chat,
              [jids.id],
              "remove"
            );
            data++;
          } catch {}
        }
      }
      if (data == 0) {
        return await message.reply(
          "*There Is No User Found With " + users + " Country Code*"
        );
      } else {
        return await message.reply(
          "*Done, " + data + " Users With " + users + " Country Code kicked*"
        );
      }
    } catch (err) {
      await message.error(
        err + "\n\ncommand: ckik",
        err,
        "*Can't kik user due to erro*"
      );
    }
  }
);
UserFunction(
  {
    pattern: "poll",
    desc: "Makes poll in group.",
    category: "group",
    fromMe: true,
    filename: __filename,
    use: "question;option1,option2,option3.....",
  },
  async (message, query) => {
    try {
      let [poll_name, request] = query.split(";");
      if (query.split(";") < 2) {
        return await message.reply(
          prefix + "poll question;option1,option2,option3....."
        );
      }
      let poll_questions = [];
      for (let data of request.split(",")) {
        if (data && data != "") {
          poll_questions.push(data);
        }
      }
      await message.bot.sendMessage(message.chat, {
        poll: {
          name: poll_name,
          values: poll_questions,
        },
      });
    } catch (err) {
      await message.error(err + "\n\ncommand: poll", err);
    }
  }
);
UserFunction(
  {
    pattern: "promote",
    desc: "Provides admin role to replied/quoted user",
    category: "group",
    filename: __filename,
    use: "<quote|reply|number>",
  },
  async (message) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isBotAdmin) {
        return message.reply("*I'm Not Admin, So I Can't Promote Anyone*");
      }
      if (!message.isAdmin) {
        return message.reply(tlang().admin);
      }
      let match = message.mentionedJid[0]
        ? message.mentionedJid[0]
        : message.quoted
        ? message.quoted.sender
        : false;
      if (!match) {
        return await message.reply("*Reply/mention an User*");
      }
      await message.bot.groupParticipantsUpdate(
        message.chat,
        [match],
        "promote"
      );
      await message.send(
        "*@" + match.split("@")[0] + " promoted Succesfully!*",
        {
          mentions: [match],
        }
      );
    } catch (err) {
      await message.error(err + "\n\ncommand: promote", err);
    }
  }
);
UserFunction(
  {
    pattern: "kick",
    desc: "Kicks replied/quoted user from group.",
    category: "group",
    filename: __filename,
    use: "<quote|reply|number>",
  },
  async (message, match) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isBotAdmin) {
        return await message.reply("*I'm Not Admin In This Group*");
      }
      if (!message.isAdmin) {
        return message.reply(tlang().admin);
      }
      let match = message.quoted
        ? message.quoted.sender
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : false;
      if (!match) {
        return await message.reply("*Reply/mention an User*");
      }
      if (message.checkBot(match)) {
        return await message.reply("*I can't kick my Creator!!*");
      }
      await message.bot.groupParticipantsUpdate(
        message.chat,
        [match],
        "remove"
      );
      await message.send("*@" + match.split("@")[0] + " Kicked!*", {
        mentions: [match],
      });
    } catch (error) {
      await message.error(error + "\n\ncommand: kick", error);
    }
  }
);
smd(
  {
    pattern: "group",
    desc: "mute and unmute group.",
    category: "group",
    filename: __filename,
  },
  async (message, match) => {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }
    if (!message.isAdmin && !message.isCreator) {
      return message.reply(tlang().admin);
    }
    let ottb = match.toLowerCase();
    try {
      const pp =
        (await message.bot
          .profilePictureUrl(message.chat, "image")
          .catch((_0x1a1b89) => THUMB_IMAGE)) || THUMB_IMAGE;
      const jids = message.metadata;
      const mjids = message.admins;
      const dta = mjids
        .map(
          (users, length) =>
            "  " + (length + 1) + ". wa.me/" + users.id.split("@")[0]
        )
        .join("\n");
      console.log("listAdmin , ", dta);
      const info =
        jids.owner ||
        mjids.find((admin_data) => admin_data.admin === "superadmin")?.id ||
        false;
      let dat_msg = `
*「 INFO GROUP 」*
*▢ ID :* • ${jids.id}
*▢ NAME :* • ${jids.subject}
*▢ Members :* • ${jids.participants.length}
*▢ Group Owner :* • ${info ? "wa.me/" + info.split("@")[0] : "notFound"}
*▢ Admins :* • ${dta}
*▢ Description :* • ${jids.desc?.toString() || "unknown"}
`;
      let dat = isMongodb
        ? await sck.findOne({
            id: message.chat,
          })
        : false;
      if (dat) {
        dat_msg += (
          "*▢ 🪢 Extra Group Configuration :*\n  • Group Nsfw :    " +
          (dat.nsfw == "true" ? "✅" : "❎") +
          " \n  • Antilink :    " +
          (dat.antilink == "true" ? "✅" : "❎") +
          "\n  • Economy :    " +
          (dat.economy == "true" ? "✅" : "❎") +
          "\n"
        ).trim();
        if (dat.welcome == "true") {
          dat_msg += "\n*▢ Wellcome Message :* \n  • " + dat.welcometext;
          dat_msg += "\n\n*▢ Goodbye Message :* \n  • " + dat.goodbyetext;
        }
      }
      try {
        await message.bot.sendMessage(
          message.chat,
          {
            image: {
              url: pp,
            },
            caption: dat_msg,
          },
          {
            quoted: message,
          }
        );
      } catch (err) {
        await message.send(dat_msg, {}, "", message);
        return console.log("error in group info,\n", err);
      }
    } catch (err) {
      await message.error(err + "\ncmdName: Group info");
      return console.log("error in group info,\n", err);
    }
  }
);
UserFunction(
  {
    pattern: "mute",
    desc: "Only Admin Can Send A Message",
    category: "group",
    filename: __filename,
    use: "<quote|reply|number>",
  },
  async (message) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (message.metadata?.announce) {
        return await message.reply(
          "*" + (message.isSuhail ? "Master" : "Sir") + ", Group already muted*"
        );
      }
      if (!message.isBotAdmin) {
        return message.reply(tlang().botAdmin);
      }
      if (!message.isCreator && !message.isAdmin) {
        return message.reply(tlang().admin);
      }
      await message.bot
        .groupSettingUpdate(message.chat, "announcement")
        .then((_0x150a20) => message.reply("*Group Chat Muted*"))
        .catch((_0x5d5c82) => message.reply("*Can't change Group Setting*"));
    } catch (err) {
      await message.error(err + "\n\ncommand: gmute", err);
    }
  }
);
UserFunction(
  {
    pattern: "unmute",
    desc: "Provides admin role to replied/quoted user",
    category: "group",
    filename: __filename,
    use: "<quote|reply|number>",
  },
  async (message) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.metadata?.announce) {
        return await message.reply(
          "*" + (message.isSuhail ? "Master" : "Sir") + ", Group Isn't Muted*"
        );
      }
      if (!message.isBotAdmin) {
        return message.reply(tlang().botAdmin);
      }
      if (!message.isCreator && !message.isAdmin) {
        return message.reply(tlang().admin);
      }
      await message.bot
        .groupSettingUpdate(message.chat, "not_announcement")
        .then((_0x5993c4) =>
          message.reply("*_Group Chat UnMute successfully!!_*")
        )
        .catch((_0x293794) =>
          message.reply("*_Can't change Group Setting, Sorry!_*")
        );
    } catch (err) {
      await message.error(err + "\n\ncommand: gunmute", err);
    }
  }
);
UserFunction(
  {
    pattern: "lock",
    fromMe: true,
    desc: "only allow admins to modify the group's settings.",
    type: "group",
  },
  async (message, classes) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (message.metadata.restrict) {
        return await message.reply(
          "*" +
            (message.isSuhail ? "Master" : "Sir") +
            ", Group setting already locked*"
        );
      }
      if (!message.isBotAdmin) {
        return await message.reply("*_I'm not admin!_*");
      }
      if (!message.isCreator && !message.isAdmin) {
        return message.reply(tlang().admin);
      }
      await message.bot
        .groupSettingUpdate(message.chat, "locked")
        .then((_0x49c387) =>
          message.reply("*Group locked, Only Admin can change Group Settings*")
        )
        .catch((_0x100d44) => message.reply("*_Can't change Group Setting*"));
    } catch (error) {
      await message.error(error + "\n\ncommand: lock", error);
    }
  }
);
UserFunction(
  {
    pattern: "unlock",
    fromMe: true,
    desc: "allow everyone to modify the group's settings.",
    type: "group",
  },
  async (msg, match) => {
    try {
      if (!msg.isGroup) {
        return msg.reply(tlang().group);
      }
      if (!msg.metadata.restrict) {
        return await msg.reply(
          "*" +
            (msg.isSuhail ? "Master" : "Sir") +
            ", Group setting already unlocked*"
        );
      }
      if (!msg.isBotAdmin) {
        return await msg.reply("*_I'm not admin!_*");
      }
      if (!msg.isCreator && !msg.isAdmin) {
        return msg.reply(tlang().admin);
      }
      await msg.bot
        .groupSettingUpdate(msg.chat, "unlocked")
        .then((_0x282118) =>
          msg.reply("*Group unlocked, everyone change Group Settings*")
        )
        .catch((_0x320353) =>
          msg.reply("*_Can't change Group Setting, Sorry!_*")
        );
    } catch (error) {
      await msg.error(error + "\n\ncommand: unlock", error);
    }
  }
);
UserFunction(
  {
    pattern: "tag",
    desc: "Tags everyperson of group without mentioning their numbers",
    category: "group",
    filename: __filename,
    use: "<text>",
  },
  async (message, match) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!match && !message.reply_message) {
        return message.reply("*Example : " + prefix + "tag Good Morning*");
      }
      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let msg = message.reply_message ? message.reply_message : message;
      let cp = message.reply_message ? message.reply_message.text : match;
      let blob = "";
      let input;
      let mssg = msg.mtype;
      if (mssg == "imageMessage") {
        blob = "image";
        input = await msg.download();
      } else if (mssg == "videoMessage") {
        blob = "video";
        input = await msg.download();
      } else if (!match && message.quoted) {
        input = message.quoted.text;
      } else {
        input = match;
      }
      if (!input) {
        return await message.send("*_Uhh dear, reply to message!!!_*");
      }
      return await message.send(
        input,
        {
          caption: cp,
          mentions: message.metadata.participants.map(
            (_0x3c9928) => _0x3c9928.id
          ),
        },
        blob,
        msg
      );
    } catch (error) {
      await message.error(error + "\n\ncommand: tag", error);
    }
  }
);
UserFunction(
  {
    pattern: "tagadmin",
    desc: "Tags only Admin numbers",
    category: "group",
    filename: __filename,
    use: "<text>",
  },
  async (message, dat) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      const _0x13a9c9 = message.admins
        .map((admins, users) => " *|  @" + admins.id.split("@")[0] + "*")
        .join("\n");
      let _0x20f7aa = (
        "\n▢ From : @" +
        message.sender.split("@")[0] +
        "\n" +
        (dat ? "≡ Message :" + dat : "") +
        "\n\n*┌─⊷ GROUP ADMINS*\n" +
        _0x13a9c9 +
        "\n*└───────────⊷*\n\n" +
        Config.caption
      ).trim();
      return await message.bot.sendMessage(message.chat, {
        text: _0x20f7aa,
        mentions: [message.sender, ...message.admins.map((jidss) => jidss.id)],
      });
    } catch (error) {
      await message.error(error + "\n\ncommand: tagadmin", error);
    }
  }
);
UserFunction(
  {
    pattern: "add",
    desc: "Add that person in group",
    category: "group",
    filename: __filename,
    use: "<number|reply|mention>",
  },
  async (message, match) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isBotAdmin) {
        return await message.reply(
          "*_I'm Not Admin In This Group, " +
            (message.isSuhail ? "Master" : "Sir") +
            "_*"
        );
      }
      if (!message.isAdmin) {
        return message.reply(tlang().admin);
      }
      let info = message.quoted
        ? message.quoted.sender
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : match
        ? match.replace(/[^0-9]/g, "").replace(/[\s+]/g, "") + "@s.whatsapp.net"
        : false;
      if (!info) {
        return await message.reply("*Provide An User.*");
      }
      try {
        await message.bot.groupParticipantsUpdate(message.chat, [info], "add");
        await message.reply("*User Added to Group*");
        message.react("✨");
      } catch (err) {
        await message.react("❌");
        await message.bot.sendMessage(
          info,
          {
            text:
              "*Here's The Group Invite Link*\n\n @" +
              message.sender.split("@")[0] +
              " Wants to add you in below group\n\n*_https://chat.whatsapp.com/" +
              (await message.bot.groupInviteCode(message.chat)) +
              "_*\n ---------------------------------  \n*_Join If YOu Feel Free?_*",
            mentions: [message.sender],
          },
          {
            quoted: message,
          }
        );
        await message.reply(
          "*Can't Add User Due To WhatsApp Ban\nI Have Sent Them An Invite Link*"
        );
      }
    } catch (error) {
      await message.error(error + "\n\ncommand: add", error);
    }
  }
);
UserFunction(
  {
    pattern: "alljids",
    desc: "Sends chat id of every groups.",
    category: "group",
    filename: __filename,
  },
  async (message, match, { cmdName: getJid }) => {
    try {
      if (!message.isCreator) {
        return message.reply(tlang().owner);
      }
      n = await message.bot.groupFetchAllParticipating();
      const entry = Object.entries(n)
        .slice(0)
        .map((_0x9d4955) => _0x9d4955[1]);
      let results = "";
      let jids_info = false;
      let data = false;
      if (match.includes("jid")) {
        jids_info = true;
      } else if (match.includes("name")) {
        data = true;
      }
      await message.reply(
        "Fetching " +
          (jids_info ? "Only jids" : data ? "Only Names" : "Names and Jids") +
          " from " +
          entry.length +
          " Groups"
      );
      await sleep(2000);
      for (var requested of entry.map((_0x19e435) => _0x19e435.id)) {
        results += jids_info ? "" : "\n*Group:* " + n[requested].subject + " ";
        results += data ? "" : "\n*JID:* " + requested + "\n";
      }
      return await message.send(results);
    } catch (error) {
      await message.error(error + "\n\ncommand: " + getJid, error);
    }
  }
);
UserFunction(
  {
    pattern: "demote",
    desc: "Demotes replied/quoted user from group",
    category: "group",
    filename: __filename,
    use: "<quote|reply|number>",
  },
  async (message) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isBotAdmin) {
        return await message.reply("*I'm Not Admin In This Group, Sir*");
      }
      if (!message.isAdmin) {
        return message.reply(tlang().admin);
      }
      let match = message.mentionedJid[0]
        ? message.mentionedJid[0]
        : message.reply_message
        ? message.reply_message.sender
        : false;
      if (!match) {
        return await message.reply("*Reply/mention an User*");
      }
      if (message.checkBot(match)) {
        return await message.reply("*Can't Demote My Creator*");
      }
      try {
        await message.bot.groupParticipantsUpdate(
          message.chat,
          [match],
          "demote"
        );
        await message.reply("*Demoted*");
      } catch (_0x5e7b02) {
        await message.reply("*_Can,t demote user, try it manually_*");
      }
    } catch (err) {
      await message.error(err + "\n\ncommand: demote", err);
    }
  }
);
UserFunction(
  {
    pattern: "del",
    desc: "Deletes message of any user",
    category: "group",
    filename: __filename,
    use: "<quote/reply message.>",
  },
  async (message) => {
    try {
      if (!message.reply_message) {
        return message.reply("*_Please reply to a message!!!_*");
      }
      let match = message.reply_message;
      if (match && match.fromMe && message.isCreator) {
        return match.delete();
      } else if (match && message.isGroup) {
        if (!message.isBotAdmin) {
          return message.reply(
            "*I can't delete messages without getting Admin Role.*"
          );
        }
        if (!message.isAdmin) {
          return message.reply(tlang().admin);
        }
        await match.delete();
      } else {
        return await message.reply(tlang().owner);
      }
    } catch (error) {
      await message.error(error + "\n\ncommand: del", error);
    }
  }
);
UserFunction(
  {
    pattern: "broadcast",
    desc: "Bot makes a broadcast in all groups",
    fromMe: true,
    category: "group",
    filename: __filename,
    use: "<text for broadcast.>",
  },
  async (message, request) => {
    try {
      if (!request) {
        return await message.reply("*Give Me Text To BroadCast*");
      }
      let query = await message.bot.groupFetchAllParticipating();
      let init = Object.entries(query)
        .slice(0)
        .map((msg) => msg[1]);
      let data = init.map((_0x5ea155) => _0x5ea155.id);
      await message.send(
        "*Sending Broadcast Message" +
          data.length +
          " Group Chat, Finish Time " +
          data.length * 1.5 +
          " second_*"
      );
      let broadcast_m_type =
        "*--❗" + tlang().title + " Broadcasted--*\n\n *🍀Message:* " + request;
      let MSGTYPE = {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "Via Ad",
          body: message.senderName,
          renderLargerThumbnail: true,
          thumbnail: log0,
          mediaType: 1,
          mediaUrl: "",
          sourceUrl: gurl,
          showAdAttribution: true,
        },
      };
      for (let ava of data) {
        try {
          await sleep(1500);
          await send(
            message,
            broadcast_m_type,
            {
              contextInfo: MSGTYPE,
            },
            "",
            "",
            ava
          );
        } catch {}
      }
      return await message.reply(
        "*Successful Sending Broadcast To " + data.length + " Group*"
      );
    } catch (error) {
      await message.error(error + "\n\ncommand: broadcast", error);
    }
  }
);
let warn = {};
warn.addwarn = async (message, match, label = {}) => {
  try {
    let search =
      (await userdb.findOne({
        id: message,
      })) ||
      (await userdb.new({
        id: message,
      }));
    let dat = search.warn || {};
    if (!dat[match]) {
      dat[match] = [];
    }
    var MSG = {
      chat: "PRIVATE",
      reason: "Inapropriate Behaviour",
      date: new Date(),
      warnedby: tlang().title,
      ...label,
    };
    dat[match].push(MSG);
    search = await userdb.updateOne(
      {
        id: message,
      },
      {
        warn: dat,
      }
    );
    return {
      status: true,
      warning: dat[match].length,
      user: search,
    };
  } catch (err) {
    return {
      status: false,
      warning: 0,
      user: {},
      error: err,
    };
  }
};
UserFunction(
  {
    pattern: "checkwarn",
    desc: "Check Warnings",
    category: "user",
    filename: __filename,
  },
  async (message, request) => {
    try {
      let inti = "";
      let jids = message.sender;
      if (message.isCreator) {
        jids = message.reply_message
          ? message.reply_message.sender
          : message.mentionedJid[0]
          ? message.mentionedJid[0]
          : jids;
      }
      let mesg =
        (await userdb.findOne({
          id: jids,
        })) ||
        (await userdb.new({
          id: jids,
        }));
      let db_vvc = mesg.warn || false;
      let caseity = {};
      if (db_vvc && request === "all") {
        db_vvc = mesg.warn;
      } else if (db_vvc && db_vvc[message.chat]) {
        caseity[message.chat] = [...db_vvc[message.chat]];
        db_vvc = caseity;
      } else {
        db_vvc = false;
      }
      let data = request === "all" ? true : !db_vvc[message.chat];
      if (!mesg || !db_vvc || !data) {
        return await message.send("*User doesn't have any warnings.*");
      }
      console.log("allwarn : ", db_vvc);
      for (const msg_data_warned in db_vvc) {
        let data_warn = db_vvc[msg_data_warned];
        inti +=
          "\n╭─────────────◆\n│ *[ID] : " +
          (msg_data_warned.includes("@")
            ? (await message.bot.getName(msg_data_warned)) || msg_data_warned
            : msg_data_warned) +
          "*\n│ *[TOTAL WARNING] : " +
          db_vvc[msg_data_warned].length +
          "*\n┝─────────────◆\n";
        for (let blob = 0; blob < data_warn.length; blob++) {
          inti +=
            "┝── *WARNING " +
            (blob + 1) +
            "* ──\n│  *DATE:* " +
            data_warn[blob].date +
            " " +
            (data_warn[blob].reason
              ? "  \n│  *REASON:* " + data_warn[blob].reason
              : "") +
            "\n│  *WARNED BY:* " +
            data_warn[blob].warnedby +
            "\n│  *CHAT:* " +
            data_warn[blob].chat +
            "\n";
        }
        inti += "╰─────────────◆\n";
      }
      return await message.reply(
        inti ? inti : "*User didn't have any warning yet*"
      );
    } catch (error) {
      await message.error(error + "\n\nCommand: chatwarn", error);
    }
  }
);
UserFunction(
  {
    pattern: "warn",
    fromMe: true,
    desc: "warn a user!",
    category: "user",
    filename: __filename,
    use: " < USER >",
  },
  async (message, match) => {
    try {
      let query = message.reply_message
        ? message.reply_message.sender
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : false;
      if (!query) {
        return await message.send("*Reply to a user*");
      }
      let ch_warn =
        (await userdb.findOne({
          id: query,
        })) ||
        (await userdb.new({
          id: query,
        }));
      let opt_blob = ch_warn.warn || {};
      if (!opt_blob[message.chat]) {
        opt_blob[message.chat] = [];
      }
      var msg = {
        chat: message.isGroup
          ? message.metadata?.subject || "GROUP"
          : "PRIVATE CHAT",
        reason: match,
        date: message.date,
        warnedby: message.senderName,
      };
      opt_blob[message.chat].push(msg);
      await userdb.updateOne(
        {
          id: query,
        },
        {
          warn: opt_blob,
        }
      );
      let get = parseInt(global.warncount) || 3;
      if (opt_blob[message.chat].length > get && !message.checkBot(query)) {
        if (message.isGroup) {
          if (message.isBotAdmin) {
            await message.send(
              "*Hey @" +
                query.split("@")[0] +
                ", Kicking you from group!*\n*_Because Your warn limit exceed!_*",
              {
                mentions: [query],
              }
            );
            await message.bot.groupParticipantsUpdate(
              message.chat,
              [query],
              "remove"
            );
          } else {
            return await message.send(
              "*Hey @" +
                query.split("@")[0] +
                " Dont Spam, Your warn limit exceed!*"
            );
          }
        } else {
          await message.send(
            "*Hey @" +
              query.split("@")[0] +
              ", Blocking you!*\n*Because Your warning Limited Have been exceeded*",
            {
              mentions: [query],
            }
          );
          await message.bot.updateBlockStatus(query, "block");
        }
      } else {
        return await message.send(
          "*Hey @" + query.split("@")[0] + " warning added, Don't spam!*",
          {
            mentions: [query],
          }
        );
      }
    } catch (error) {
      await message.error(error + "\n\nCommand: warn ", error, false);
    }
  }
);
UserFunction(
  {
    pattern: "resetwarn",
    desc: "Reset Warning",
    category: "user",
    filename: __filename,
    use: " user ",
  },
  async (msg, data) => {
    try {
      if (!msg.isCreator && !msg.isAdmin) {
        return await msg.reply(tlang().admin);
      }
      let match = msg.reply_message
        ? msg.reply_message.sender
        : msg.mentionedJid[0]
        ? msg.mentionedJid[0]
        : false;
      if (!match) {
        return await msg.send("*Reply A User*");
      }
      let m_dat =
        (await userdb.findOne({
          id: match,
        })) ||
        (await userdb.new({
          id: match,
        })) ||
        {};
      let quey = m_dat.warn || {};
      if (msg.isCreator && data.toLowerCase() === "all" && quey) {
        quey = {};
      } else {
        if (!m_dat || !quey || !quey[msg.chat]) {
          return await msg.send("*_User didn't have any warning yet!!_*");
        }
        delete quey[msg.chat];
      }
      await userdb.updateOne(
        {
          id: match,
        },
        {
          warn: quey,
        }
      );
      await msg.reply(
        "*User is free as a bird now!*\n*All warns has been deleted!*"
      );
    } catch (err) {
      await msg.error(err + "\n\nCommand: resetwarn", err);
    }
  }
);
UserFunction(
  {
    pattern: "activate",
    desc: "Switches for varios works.",
    category: "settings",
    filename: __filename,
  },
  async (message, request) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      const botNumber = message.botNumber;
      const isAdmin = message.isAdmin;
      let menu = request?.split(" ")[0].toLowerCase()?.trim() || false;
      if (!isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let quetions =
        (await groupdb.findOne({
          id: message.chat,
        })) ||
        (await groupdb.new({
          id: message.chat,
        })) ||
        false;
      if (!quetions) {
        return await message.reply("*Group Not In Db*");
      }
      switch (menu) {
        case "antilink":
          {
            if (quetions.antilink !== "false") {
              return await message.reply(
                "*_Antilink was alredy enabled here!_*"
              );
            }
            await groupdb.updateOne(
              {
                id: message.chat,
              },
              {
                antilink: "warn",
              }
            );
            await message.reply("*_Enabled antilink in current chat.!_*");
          }
          break;
        case "economy":
          {
            if (quetions.economy == "true") {
              return await message.reply("*_Economy was alredy enabled.!_*");
            }
            await groupdb.updateOne(
              {
                id: message.chat,
              },
              {
                economy: "true",
              }
            );
            await message.reply("*_Economy enabled in current chat.!_*");
          }
          break;
        case "events":
          {
            await groupdb.updateOne(
              {
                id: message.chat,
              },
              {
                welcome: "true",
                goodbye: "true",
              }
            );
            return await message.reply("*Successfully Enabled Events!*");
          }
          break;
        case "bot":
          {
            if (quetions.botenable == "true") {
              return await message.reply("*_bot is already enabled!_*");
            }
            await groupdb.updateOne(
              {
                id: message.chat,
              },
              {
                botenable: "true",
              }
            );
            await message.reply("*_Successfully Enabled bot_*");
          }
          break;
        default: {
          message.reply(
            "Please provide me term like.\n1-events\n2-antilink\n3-economy\n4-bot"
          );
        }
      }
    } catch (error) {
      await message.error(error + "\n\ncommand: act", error);
    }
  }
);
UserFunction(
  {
    pattern: "deactivate",
    desc: "Switches for varios works.",
    category: "settings",
    filename: __filename,
  },
  async (message, request) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      const botNumber = message.botNumber;
      const isAdmin = message.isAdmin;
      let menu = request?.split(" ")[0].toLowerCase()?.trim() || false;
      if (!menu) {
        return message.reply(
          "❌ Please provide me term like like\n1-events\n2-antilink\n3-bot\n4-economy"
        );
      }
      if (!isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let _0x39a7fb =
        (await groupdb.findOne({
          id: message.chat,
        })) ||
        (await groupdb.new({
          id: message.chat,
        })) ||
        false;
      if (!_0x39a7fb) {
        return await message.reply(
          "*_Uhh dear, request not be proceed due to error!_*"
        );
      }
      switch (menu) {
        case "antilink":
          {
            if (_0x39a7fb.antilink == "false") {
              return message.reply("*_Antilink was alredy disabled_*");
            }
            await groupdb.updateOne(
              {
                id: message.chat,
              },
              {
                antilink: "false",
              }
            );
            message.reply("*_disabled antilink in current chat!_*");
          }
          break;
        case "economy":
          {
            if (_0x39a7fb.economy == "false") {
              return message.reply("*_Economy was alredy disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: message.chat,
              },
              {
                economy: "false",
              }
            );
            message.reply("*disabled Economy in current chat.*");
          }
          break;
        case "events":
        case "event":
          {
            if (_0x39a7fb.events == "false") {
              return message.reply("*_Events are already disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: message.chat,
              },
              {
                welcome: "false",
                goodbye: "false",
              }
            );
            return message.reply("*Successfully disabled Events!*");
          }
          break;
        case "bot":
          {
            if (_0x39a7fb.botenable == "false") {
              return await message.reply("*_bot is already disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: message.chat,
              },
              {
                botenable: "true",
              }
            );
            await message.reply("*_Successfully disabled bot_*");
          }
          break;
        default: {
          message.reply(
            "Please provide me term like.\n1-events\n2-antilink\n3-bot\n4-economy"
          );
        }
      }
    } catch (_0x27fa6e) {
      await message.error(_0x27fa6e + "\n\ncommand: deact", _0x27fa6e);
    }
  }
);
UserFunction(
  {
    pattern: "bot",
    desc: "activates and deactivates bot.\nuse buttons to toggle.",
    fromMe: true,
    category: "misc",
    filename: __filename,
  },
  async (message, match) => {
    try {
      let input = match ? match.toLowerCase().trim() : false;
      let query = input ? input.split(" ")[0] : false;
      let data_Info =
        (await groupdb.findOne({
          id: message.chat,
        })) ||
        (await groupdb.new({
          id: message.chat,
        }));
      if (!query) {
        await message.send(
          "*_Bot *" +
            (data_Info.botenable === "false" ? "Disabled" : "Enabled") +
            " in this Chat!_*"
        );
      } else if (
        query.startsWith("off") ||
        query.startsWith("deact") ||
        query.startsWith("disable")
      ) {
        if (data_Info.botenable === "false") {
          await message.send("*_Bot already disabled in current Chat!!_*");
        } else {
          await groupdb.updateOne(
            {
              id: message.chat,
            },
            {
              botenable: "false",
            }
          );
          await message.send("*_Bot Disabled Succesfully!_*");
        }
      } else if (
        query.startsWith("on") ||
        query.startsWith("act") ||
        query.startsWith("enable")
      ) {
        if (data_Info.botenable === "true") {
          await message.send("*_Bot already enabled in current Chat!!_*");
        } else {
          await groupdb.updateOne(
            {
              id: message.chat,
            },
            {
              botenable: "true",
            }
          );
          await message.send("*_Bot Succesfully Enabled!_*");
        }
      } else {
        await message.send(
          "*_Provide Valid Instruction_*\n*Ex: _" + prefix + "bot on/off_*"
        );
      }
    } catch (err) {
      message.error(err + "\n\ncommand: bot", err);
    }
  }
);
smd(
  {
    pattern: "antitag",
    desc: "detect tagall in group chat, then kick them",
    fromMe: true,
    category: "misc",
    filename: __filename,
  },
  async (messsage, match) => {
    try {
      let input = match ? match.toLowerCase().trim() : false;
      let data = input ? input.split(" ")[0] : false;
      let options =
        (await groupdb.findOne({
          id: messsage.chat,
        })) ||
        (await groupdb.new({
          id: messsage.chat,
        }));
      if (!data) {
        await messsage.send(
          "*_Anti_tag *" +
            (options.antitag === "false" ? "Disabled" : "Enabled") +
            " in this Chat!_*"
        );
      } else if (
        data.startsWith("off") ||
        data.startsWith("deact") ||
        data.startsWith("disable")
      ) {
        if (options.antitag === "false") {
          await messsage.send(
            "*_Anti_tag already disabled in current Chat!!_*"
          );
        } else {
          await groupdb.updateOne(
            {
              id: messsage.chat,
            },
            {
              antitag: "false",
            }
          );
          await messsage.send("*_Anti_tag Disabled Succesfully!_*");
        }
      } else if (
        data.startsWith("on") ||
        data.startsWith("act") ||
        data.startsWith("enable")
      ) {
        if (options.antitag === "true") {
          await messsage.send("*_Anti_tag already enabled in current Chat!!_*");
        } else {
          await groupdb.updateOne(
            {
              id: messsage.chat,
            },
            {
              antitag: "true",
            }
          );
          await messsage.send(
            "*_Anti_tag succesfully enabled in chat!_*\n*_Now bot kick user who tag all members!_*"
          );
        }
      } else {
        await messsage.send(
          "*_Provide Valid Instruction_*\n*Ex: _" + prefix + "antitag on/off_*"
        );
      }
    } catch (err) {
      messsage.error(err + "\n\ncommand: antitag", err);
    }
  }
);
UserFunction(
  {
    pattern: "antilink",
    desc: "activates and deactivates antilink.\nuse buttons to toggle.",
    category: "group",
    filename: __filename,
  },
  async (message, match, { cmdName: antilink }) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let input = match ? match.toLowerCase().trim() : false;
      let sent = input ? input.split(" ")[0] : false;
      let data =
        (await groupdb.findOne({
          id: message.chat,
        })) ||
        (await groupdb.new({
          id: message.chat,
        }));
      if (!sent) {
        return await message.send(
          "*_Antilink " +
            (data.antilink === "false" ? "Disabled" : "Enabled") +
            " in this Group!_* \n" +
            (data.antilink === "false"
              ? ""
              : "*Current Mode:* _" + data.antilink + "_") +
            "\n\n*Antilink Modes:* ```\n" +
            (prefix + antilink) +
            " kick (Delete Links & Kick Senders)\n" +
            (prefix + antilink) +
            " delete (Delete Links Only)\n" +
            (prefix + antilink) +
            " warn (warn & delete links)\n" +
            (prefix + antilink) +
            " off (Disable Antilink in chat) ```\n\n\n" +
            Config.caption
        );
      } else if (
        sent.startsWith("off") ||
        sent.startsWith("deact") ||
        sent.startsWith("disable")
      ) {
        if (data.antilink === "false") {
          return await message.send(
            "*_Anti_Link already disabled in current Chat!!_*"
          );
        }
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            antilink: "false",
          }
        );
        return await message.send("*_Anti_Link Disabled Succesfully!_*");
      } else if (sent.startsWith("kick")) {
        if (data.antilink === "kick") {
          return await message.send(
            "*_Anti_Link already set to kick link senders!!_*"
          );
        }
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            antilink: "kick",
          }
        );
        return await message.send(
          "*_Anti_Link Succesfully set to kick link senders!_*"
        );
      } else if (sent.startsWith("delete")) {
        if (data.antilink === "delete") {
          return await message.send(
            "*_Anti_Link already set to delete links!!_*"
          );
        }
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            antilink: "delete",
          }
        );
        return await message.send(
          "*_Anti_Link Succesfully set to delete links from chat!_*"
        );
      } else if (sent.startsWith("warn")) {
        if (data.antilink === "warn") {
          return await message.send(
            "*_Anti_Link already set to warn link senders!!_*"
          );
        }
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            antilink: "warn",
          }
        );
        return await message.send(
          "*_Anti_Link set to warn and delete links!_*"
        );
      } else {
        return await message.send(
          "*_Uhh Please, Provide Valid Instruction_*\n*Eg: _" +
            prefix +
            "antilink kick/delete/warn/off_*"
        );
      }
    } catch (error) {
      message.error(error + "\n\ncommand: antilink", error);
    }
  }
);
UserFunction(
  {
    pattern: "welcome",
    alias: ["setwelcome"],
    desc: "sets welcome message in specific group.",
    category: "group",
    filename: __filename,
  },
  async (message, data) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let input = data.toLowerCase().trim();
      let data =
        (await groupdb.findOne({
          id: message.chat,
        })) ||
        (await groupdb.new({
          id: message.chat,
        }));
      if (input === "on" || input === "act" || input === "enable") {
        if (data.welcome === "true") {
          return await message.send(
            "*_Welcome already enabled in current group!!_*"
          );
        }
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            welcome: "true",
          }
        );
        return await message.send("*Welcome successfully enabled!!*");
      }
      if (data.welcome !== "true") {
        return await message.send(
          "*Welcome *Disabled in this Group* \n*_Use on/off to enable/disable welcome_*"
        );
      }
      if (!data || input === "get") {
        return await message.reply("*Welcome :* " + data.welcometext);
      }
      if (input === "off" || input === "deact" || input === "disable") {
        if (data.welcome === "false") {
          return await message.send(
            "*Welcome already disabled in current group*"
          );
        }
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            welcome: "false",
          }
        );
        return await message.send("*Disabled Welcome Message*");
      }
      await groupdb.updateOne(
        {
          id: message.chat,
        },
        {
          welcometext: data,
          welcome: "true",
        }
      );
      await sendWelcome(message, data);
    } catch (error) {
      message.error(error + "\n\ncommand: setwelcome", error);
    }
  }
);
UserFunction(
  {
    pattern: "goodbye",
    desc: "sets goodbye message in specific group.",
    category: "group",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let input = match.toLowerCase().trim();
      let output =
        (await groupdb.findOne({
          id: message.chat,
        })) ||
        (await groupdb.new({
          id: message.chat,
        }));
      if (input === "on" || input === "act" || input === "enable") {
        if (output.goodbye === "true") {
          return await message.send(
            "*Goodbye already enabled in current Group*"
          );
        }
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            goodbye: "true",
          }
        );
        return await message.send("*Goodbye successfully enabled!!*");
      }
      if (output.goodbye !== "true") {
        return await message.send(
          "*_Goodbye *Disabled in this Group!_* \n*_Use on/off to enable/disable goodbye_*"
        );
      }
      if (!match || input === "get") {
        return await message.reply("*Goodbye Message :* " + output.goodbyetext);
      }
      if (input === "off" || input === "deact" || input === "disable") {
        if (output.goodbye === "false") {
          return await message.send(
            "*Goodbye already disabled in current Group*"
          );
        }
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            goodbye: "false",
          }
        );
        return await message.send("*Disbale GoodBye Message*");
      }
      await groupdb.updateOne(
        {
          id: message.chat,
        },
        {
          goodbyetext: match,
          goodbye: "true",
        }
      );
      await sendWelcome(message, match);
    } catch (error) {
      message.error(error + "\n\ncommand: setgoodbye", error);
    }
  }
);
UserFunction(
  {
    pattern: "antimsg",
    desc: "activates and deactivates onlyadmin.",
    category: "group",
    filename: __filename,
  },
  async (message, match, { cmdName: msg_send }) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let menu =
        (await groupdb.findOne({
          id: message.chat,
        })) ||
        (await groupdb.new({
          id: message.chat,
        }));
      let input = match ? match.toLowerCase().trim() : false;
      let chosen = input ? input.split(" ")[0] : false;
      if (!chosen) {
        return await message.send(
          "*_" +
            msg_send +
            " *" +
            (menu.onlyadmin === "false" ? "Disabled" : "Enabled") +
            " in this Group!_*\n *_Use on/off to enable/disable_*"
        );
      } else if (
        chosen.startsWith("off") ||
        chosen.startsWith("deact") ||
        chosen.startsWith("disable")
      ) {
        if (menu.onlyadmin === "false") {
          return await message.reply(
            "*_Onlyadmin Already Disabled in Current Chat_*"
          );
        }
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            onlyadmin: "false",
          }
        );
        await message.bot.groupSettingUpdate(message.chat, "not_announcement");
        return await message.send(
          "*" +
            msg_send +
            " succesfully disable in group!_*\n*_Now everyone send message in group_*"
        );
      } else if (
        chosen.startsWith("on") ||
        chosen.startsWith("act") ||
        chosen.startsWith("enable")
      ) {
        if (menu.onlyadmin === "true") {
          return await message.reply(
            "*_Onlyadmin Already Enabled in Current Chat_*"
          );
        }
        if (message.isBotAdmin) {
          await groupdb.updateOne(
            {
              id: message.chat,
            },
            {
              onlyadmin: "true",
            }
          );
          await message.bot.groupSettingUpdate(message.chat, "announcement");
          return await message.send(
            "*" +
              msg_send +
              " succesfully set to kick msg senders!_*\n*_Now only admins allow to send msg in group_*"
          );
        } else {
          return await message.reply("*Provide Admin Role First*");
        }
      } else {
        return await message.reply(
          "*_Please Provide Valid Instruction_*\n*_Use on/off to enable/disable_*"
        );
      }
    } catch (err) {
      message.error(err + "\n\ncommand: onlyadmin", err);
    }
  }
);
UserFunction(
  {
    pattern: "antibot",
    desc: "kick Bot Users from Group.!",
    category: "group",
    filename: __filename,
  },
  async (message, match, { cmdName: antibotto }) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let msg =
        (await groupdb.findOne({
          id: message.chat,
        })) ||
        (await groupdb.new({
          id: message.chat,
        }));
      let request = match ? match.toLowerCase().trim() : "";
      let matched =
        request.startsWith("on") ||
        request.startsWith("act") ||
        request.startsWith("enable") ||
        request.startsWith("del") ||
        request.startsWith("warn")
          ? "warn"
          : request.startsWith("kic")
          ? "kick"
          : request.startsWith("off") ||
            request.startsWith("reset") ||
            request.startsWith("deact") ||
            request.startsWith("disable")
          ? "false"
          : "";
      if (!matched) {
        return await message.send(
          "*_Antibot Currently *" +
            (msg.antibot === "false" ? "Disabled" : "Enabled") +
            " in this Group!_*\n*_Use warn/kick/off to enable/disable Antibot_*"
        );
      } else if (matched === "false") {
        if (msg.antibot === "false") {
          return await message.reply(
            "*_Antibot Already Disabled in Current Chat_*"
          );
        }
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            antibot: "false",
          }
        );
        return await message.send("*Antibot Succesfully Disable in Group*");
      } else if (matched === "warn" || matched === "kick") {
        if (msg.antibot === matched) {
          return await message.reply(
            "*Antibot Already set to " + matched + " bots!*"
          );
        }
        if (!message.isBotAdmin) {
          return await message.reply("*Provide Admin Role First*");
        }
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            antibot: matched,
          }
        );
        return await message.send(
          "*_Antibot Succesfully set to " + matched + " Bot Users!_*"
        );
      } else {
        return await message.reply(
          "*_Please provide valid instructions!_*\n*_Use warn/kick/off to enable/disable Antibot!_*"
        );
      }
    } catch (err) {
      message.error(err + "\n\ncommand: antibot", err);
    }
  }
);
UserFunction(
  {
    pattern: "disable",
    desc: "disable cmds in Group.!",
    category: "group",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let _0x2cad27 =
        (await groupdb.findOne({
          id: message.chat,
        })) ||
        (await groupdb.new({
          id: message.chat,
        }));
      let input = match ? match.toLowerCase().trim() : false;
      let data = input ? input.split(" ")[0] : "";
      if (!data) {
        return await message.send(
          "*Provide cmd name to disable in group*\n*Ex " +
            prefix +
            "disable tag(to disabled 'tag' cmd)/info*"
        );
      } else if (
        data.startsWith("info") ||
        data.startsWith("list") ||
        data.startsWith("cmds")
      ) {
        return await message.send(
          _0x2cad27.disablecmds === "false"
            ? "*_Uhh Dear, Theres no cmd disabled in current group_*"
            : "*_Disable cmds :_* ```" +
                _0x2cad27.disablecmds.replace("false,", "") +
                "```"
        );
      } else if (
        data.startsWith("enable") ||
        data.startsWith("disable") ||
        data.startsWith("bot")
      ) {
        return await message.reply("*_Uhh Dear, I can't disable that cmd_*");
      } else if (data) {
        const cmd_data_fui =
          ᴀsᴛᴀ_ᴍᴅ.commands.find((cmdlets) => cmdlets.pattern === data) ||
          ᴀsᴛᴀ_ᴍᴅ.commands.find((db) => db.alias && db.alias.includes(data));
        if (cmd_data_fui) {
          let _0xac463 = cmd_data_fui.pattern.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          );
          let foo = new RegExp("\\b" + _0xac463 + "\\b");
          if (foo.test(_0x2cad27.disablecmds)) {
            return await message.send("*Provided cmd already in disable cmds*");
          }
          var set_data = _0x2cad27.disablecmds + "," + cmd_data_fui.pattern;
          await groupdb.updateOne(
            {
              id: message.chat,
            },
            {
              disablecmds: set_data,
            }
          );
          let hero = set_data.replace("false,", "");
          return await message.send(
            '*_"' +
              data +
              '" Succesfully added in disable cmds_*' +
              (hero === "" ? "" : "\n*_Disable cmds :_* ```" + hero + "```")
          );
        } else {
          return await message.reply(
            "*_'" + data + "' is not a bot command, Provide valid command_*"
          );
        }
      }
    } catch (err) {
      message.error(err + "\n\ncommand: enable", err);
    }
  }
);
UserFunction(
  {
    pattern: "enable",
    desc: "enable a cmd in Group.!",
    category: "group",
    filename: __filename,
  },
  async (mesage, match) => {
    try {
      if (!mesage.isGroup) {
        return mesage.reply(tlang().group);
      }
      if (!mesage.isAdmin && !mesage.isCreator) {
        return mesage.reply(tlang().admin);
      }
      let recg =
        (await groupdb.findOne({
          id: mesage.chat,
        })) ||
        (await groupdb.new({
          id: mesage.chat,
        }));
      let input = match ? match.toLowerCase().trim() : false;
      let data = input ? input.split(" ")[0] : "";
      let foo = data.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      let reqt = new RegExp("\\b" + foo + "\\b");
      if (!data || data === "") {
        return await mesage.send(
          "*Please provide disabled cmd name to enable it*\n*Ex " +
            prefix +
            "enable tag(if 'tag' cmd disabled)/all(reset disables)*"
        );
      } else if (input.startsWith("all")) {
        await groupdb.updateOne(
          {
            id: mesage.chat,
          },
          {
            disablecmds: "false",
          }
        );
        return await mesage.send("*_All disable cmds succesfully enabled_*");
      } else if (
        reqt.test(recg.disablecmds) &&
        recg.disablecmds.includes(data)
      ) {
        let data_dis = recg.disablecmds.replace(reqt, "");
        await groupdb.updateOne(
          {
            id: mesage.chat,
          },
          {
            disablecmds: data_dis,
          }
        );
        return await mesage.send(
          '*_"' +
            data.replace(",", "") +
            '" Succesfully removed from disable cmds_*'
        );
      } else {
        return await mesage.send(
          "_There's no cmd disabled with *" + data.replace(",", "") + "* name"
        );
      }
    } catch (error) {
      mesage.error(error + "\n\ncommand: disable", error);
    }
  }
);
UserFunction(
  {
    pattern: "antinum",
    desc: "𝗗𝗲𝘁𝗲𝗰𝘁𝘀 𝗽𝗿𝗼𝗺𝗼𝘁𝗲/𝗱𝗲𝗺𝗼𝘁𝗲 𝗮𝗻𝗱 𝘀𝗲𝗻𝗱𝘀 𝗮𝗹𝗲𝗿𝘁. ",
    category: "group",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let msg =
        (await groupdb.findOne({
          id: message.chat,
        })) ||
        (await groupdb.new({
          id: message.chat,
        }));
      let options = match ? match.toLowerCase().trim() : "";
      if (
        options.startsWith("off") ||
        options.startsWith("deact") ||
        options.startsWith("disable")
      ) {
        if (msg.antifake == "false") {
          return await message.send(
            "*Anti_Fake Already Disabled In Current Chat!*"
          );
        }
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            antifake: "false",
          }
        );
        return await message.send("*Anti_Fake Disable Succesfully!*");
      } else if (!match) {
        return await message.send(
          "*_Antifake " +
            (msg.antifake === "false"
              ? "Not set to any"
              : 'set to "' + msg.antifake + '"') +
            " Country Code!*\n *Provide Country code to Update Antifake Status*\n*Eg: " +
            prefix +
            "antifake 234*"
        );
      }
      let dataaa = match
        ? match
            .split(",")
            .map((blob) => parseInt(blob))
            .filter((fo) => !isNaN(fo))
            .join(",")
        : false;
      if (!match || !dataaa) {
        return await message.send(
          "*_Please provide a country code First_*\n *_Only numbers to join this group._*\n*_eg: " +
            prefix +
            "antifake 234_*"
        );
      } else if (dataaa) {
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            antifake: "" + dataaa,
          }
        );
        return await message.send(
          '*Anti_Fake Succesfully set to "' +
            dataaa +
            "\"!*\n*_Now People Joined Group Who's Number Start With " +
            dataaa +
            "_*"
        );
      } else {
        return await message.send(
          "*_Please provide a Valid country code First_*\n *_Only numbers to join this group._*\n*_eg: " +
            prefix +
            "antifake 234_*"
        );
      }
    } catch (err) {
      message.error(err + "\n\ncommand: antifake", err);
    }
  }
);
smd(
  {
    pattern: "antidemote",
    desc: "Detects Promote and Automaticaly demote promoted person.",
    category: "group",
    filename: __filename,
  },
  async (mesage, match) => {
    try {
      if (!mesage.isGroup) {
        return mesage.reply(tlang().group);
      }
      if (!mesage.isAdmin && !mesage.isCreator) {
        return mesage.reply(tlang().admin);
      }
      let menu =
        (await groupdb.findOne({
          id: mesage.chat,
        })) ||
        (await groupdb.new({
          id: mesage.chat,
        }));
      let opt = match ? match.toLowerCase().trim() : "";
      if (
        opt.startsWith("on") ||
        opt.startsWith("act") ||
        opt.startsWith("enable")
      ) {
        if (menu.antidemote == "true") {
          return await mesage.send(
            "*Anti_Demote Already Enabled In Current Chat!*"
          );
        }
        await groupdb.updateOne(
          {
            id: mesage.chat,
          },
          {
            antidemote: "true",
          }
        );
        return await mesage.send(
          "*Anti_Demote Enable Succesfully! _No One Demote Here Now_.*"
        );
      } else if (
        opt.startsWith("off") ||
        opt.startsWith("deact") ||
        opt.startsWith("disable")
      ) {
        if (menu.antidemote == "false") {
          return await mesage.send(
            "*Anti_Demote Already Disabled In Current Chat!*"
          );
        }
        await groupdb.updateOne(
          {
            id: mesage.chat,
          },
          {
            antidemote: "false",
          }
        );
        return await mesage.send("*Anti_Demote Disable Succesfully!*");
      } else {
        return await mesage.reply(
          '*Uhh Dear, Please Toggle between "On" And "Off".* \n*_To Enable & Disable Stop Demoting Peoples!_*'
        );
      }
    } catch (err) {
      mesage.error(err + "\n\ncommand: antidemote", err);
    }
  }
);
smd(
  {
    pattern: "antipromote",
    desc: "Detects Promote and Automaticaly demote promoted person.",
    category: "group",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let dt =
        (await groupdb.findOne({
          id: message.chat,
        })) ||
        (await groupdb.new({
          id: message.chat,
        }));
      let options = match ? match.toLowerCase().trim() : "";
      if (
        options.startsWith("on") ||
        options.startsWith("act") ||
        options.startsWith("enable")
      ) {
        if (dt.antipromote == "true") {
          return await message.send(
            "*Anti_Promote Already Enabled In Current Chat!*"
          );
        }
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            antipromote: "true",
          }
        );
        return await message.send(
          "*Anti_Promote Enable Succesfully! _No One Promote Here Now_.*"
        );
      } else if (
        options.startsWith("off") ||
        options.startsWith("deact") ||
        options.startsWith("disable")
      ) {
        if (dt.antipromote == "false") {
          return await message.send(
            "*Anti_Promote Already Disabled In Current Chat!*"
          );
        }
        await groupdb.updateOne(
          {
            id: message.chat,
          },
          {
            antipromote: "false",
          }
        );
        return await message.send("*Anti_Promote Disable Succesfully!*");
      } else {
        return await message.reply(
          '*Please Toggle between "On" And "Off".* \n*To Stop Promoting Users in Chat*'
        );
      }
    } catch (err) {
      message.error(err + "\n\ncommand: antipromote", err);
    }
  }
);
UserFunction(
  {
    pattern: "amute",
    desc: "sets auto mute time in group.",
    category: "group",
  },
  async (message, match) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let dat =
        (await groupdb.findOne({
          id: message.chat,
        })) ||
        (await groupdb.new({
          id: message.chat,
        }));
      if (!match) {
        return await message.reply(
          "*Auto_Mute *" +
            (dat.mute === "false" ? "disable" : "enabled") +
            " for current group*" +
            (dat.mute !== "false"
              ? "\n *Auto mute status set at : " + dat.mute + "* "
              : "")
        );
      }
      let [data, opt] = match.split(":").map(Number);
      if (
        isNaN(data) ||
        isNaN(opt) ||
        data < 0 ||
        data >= 24 ||
        opt < 0 ||
        opt >= 60
      ) {
        return message.reply(
          "Please provide correct form.\nEg: " + prefix + "amute 22:00"
        );
      }
      let foo =
        data.toString().padStart(2, "0") +
        ":" +
        opt.toString().padStart(2, "0");
      await groupdb.updateOne(
        {
          id: message.chat,
        },
        {
          mute: foo,
        }
      );
      return message.reply(
        "*_Successfully done, Group auto mute at " + foo + "_*"
      );
    } catch (err) {
      message.error(err + "\n\ncommand: amute", err);
    }
  }
);
UserFunction(
  {
    pattern: "aunmute",
    desc: "sets unmute time in group.",
    category: "group",
  },
  async (message, match) => {
    try {
      if (!message.isGroup) {
        return message.reply(tlang().group);
      }
      if (!message.isAdmin && !message.isCreator) {
        return message.reply(tlang().admin);
      }
      let dat =
        (await groupdb.findOne({
          id: message.chat,
        })) ||
        (await groupdb.new({
          id: message.chat,
        }));
      if (!match) {
        return await message.reply(
          "*Auto_Unmute *" +
            (dat.unmute === "false" ? "disable" : "enabled") +
            " for current group*" +
            (dat.unmute !== "false"
              ? "\n *Auto unmute status set at : " + dat.unmute + "* "
              : "")
        );
      }
      let [foo, blob] = match.split(":").map(Number);
      if (
        isNaN(foo) ||
        isNaN(blob) ||
        foo < 0 ||
        foo >= 24 ||
        blob < 0 ||
        blob >= 60
      ) {
        return message.reply(
          "Please provide correct form.\nEg: " + prefix + "aunmute 22:00"
        );
      }
      let con =
        foo.toString().padStart(2, "0") +
        ":" +
        blob.toString().padStart(2, "0");
      await groupdb.updateOne(
        {
          id: message.chat,
        },
        {
          unmute: con,
        }
      );
      return message.reply(
        "*Successfully done, Group auto unmute at " + con + "*"
      );
    } catch (err) {
      message.error(err + "\n\ncommand: aunmute", err);
    }
  }
);
UserFunction(
  {
    pattern: "dunmute",
    desc: "Delete unmute from group.",
    category: "group",
  },
  async (mesg) => {
    try {
      if (!mesg.isGroup) {
        return mesg.reply(tlang().group);
      }
      if (!mesg.isAdmin && !mesg.isCreator) {
        return mesg.reply(tlang().admin);
      }
      let match = await groupdb.findOne({
        id: mesg.chat,
      });
      if (!match || !match.unmute || match.unmute == "false") {
        return await mesg.reply("*There's no auto unmute set in group.*");
      }
      await groupdb.updateOne(
        {
          id: mesg.chat,
        },
        {
          unmute: "false",
        }
      );
      return await mesg.reply("*Auto unmute deleted successfully.*");
    } catch (error) {
      mesg.error(error + "\n\ncommand: dunmute", error);
    }
  }
);
UserFunction(
  {
    pattern: "dmute",
    desc: "Delete mute from group.",
    category: "moderation",
  },
  async (msg) => {
    try {
      if (!msg.isGroup) {
        return msg.reply(tlang().group);
      }
      if (!msg.isAdmin && !msg.isCreator) {
        return msg.reply(tlang().admin);
      }
      let match = await groupdb.findOne({
        id: msg.chat,
      });
      if (!match || !match.mute || match.mute == "false") {
        return await msg.reply("*There's no auto mute set in group.*");
      }
      await groupdb.updateOne(
        {
          id: msg.chat,
        },
        {
          mute: "false",
        }
      );
      return await msg.reply("*Auto mute deleted successfully.*");
    } catch (err) {
      msg.error(err + "\n\ncommand: dmute", err);
    }
  }
);
async function haveEqualMembers(msg, jids) {
  if (msg.length === 0 || jids.length === 0) {
    return false;
  }
  const dat = msg.filter((_0x44f6e4) => jids.includes(_0x44f6e4));
  const res = (dat.length / msg.length) * 100;
  return res >= 76;
}
UserFunction(
  {
    pattern: "antiword",
    desc: "Detects words from chat,and delete/warn senders.",
    category: "group",
    filename: __filename,
    use: "< action | words >",
  },
  async (mesg, query, { cmdName: antiword }) => {
    try {
      if (!mesg.isGroup) {
        return mesg.reply(tlang().group);
      }
      if (!mesg.isAdmin && !mesg.isCreator) {
        return mesg.reply(tlang().admin);
      }
      let dat =
        (await groupdb.findOne({
          id: mesg.chat,
        })) ||
        (await groupdb.new({
          id: mesg.chat,
          antiword: {
            status: "false",
            words: "",
          },
        }));
      let match = query ? query.toLowerCase().trim() : false;
      let conn = dat.antiword;
      let sock =
        "*Antiword Currently *" +
        (conn.status !== "false" ? "enabled" : "disabled") +
        "!!!* ```\n  STATUS: " +
        (conn.status ? conn.status : "--Empty Yet--") +
        " \n  WORDS: " +
        (conn.words ? conn.words.replace(/,/gi, " -- ") : "--Empty Yet--") +
        "```\n\n*Available Cmds:* ```\n  " +
        (prefix + antiword) +
        " off \n  " +
        (prefix + antiword) +
        " reset\n  " +
        (prefix + antiword) +
        " warn | bad,words\n  " +
        (prefix + antiword) +
        " delete | hot,badas,etc\n``` \n\n\n " +
        Config.caption;
      if (!match || !query) {
        return await mesg.send(sock);
      }
      let info = match.split("|")[1] || "";
      let blob =
        match.startsWith("on") ||
        match.startsWith("act") ||
        match.startsWith("enable") ||
        match.startsWith("del")
          ? "delete"
          : match.startsWith("warn")
          ? "warn"
          : match.startsWith("off") ||
            match.startsWith("deact") ||
            match.startsWith("disable")
          ? "false"
          : match.startsWith("reset")
          ? "reset"
          : "";
      blob = !blob && info && conn.status !== "false" ? conn.status : blob;
      if (blob === "reset") {
        await groupdb.updateOne(
          {
            id: mesg.chat,
          },
          {
            antiword: {},
          }
        );
        return await mesg.send("*_Anti_Word status cleard!_*");
      } else if (blob === "delete" || blob === "warn") {
        if (conn.status == blob && !info) {
          return await mesg.send(
            "*Please provide badWords, like " +
              (prefix + antiword) +
              " " +
              blob +
              " | bad,words"
          );
        }
        info = info ? info : conn.words;
        await groupdb.updateOne(
          {
            id: mesg.chat,
          },
          {
            antiword: {
              status: blob,
              words: info,
            },
          }
        );
        return await mesg.send(
          "*_Anti_Word succesfully set to '" +
            blob +
            "' badward!_*\n*Antiwords are:```" +
            (info ? info.replace(/,/gi, " | ") : "--Empty Yet--") +
            "``` *"
        );
      } else if (blob === "false") {
        if (conn.status === blob) {
          return await mesg.send(
            "*AntiWord Already Disabled In Current Chat!*"
          );
        }
        await groupdb.updateOne(
          {
            id: mesg.chat,
          },
          {
            antiword: {
              status: "false",
              words: conn.words,
            },
          }
        );
        return await mesg.send("*Anti_Word Disable Succesfully!*");
      } else {
        return await mesg.reply("*Follow instructions\n\n" + sock);
      }
    } catch (err) {
      mesg.error(err + "\n\ncommand: antiword", err);
    }
  }
);
let bott = false;
let chatbotCount = 0;
UserFunction(
  {
    on: "main",
  },
  async (
    message,
    body,
    {
      botNumber: botm,
      isCreator: crwat,
      budy: messagend,
      body: m_fino,
      icmd: incastity,
    }
  ) => {
    try {
      if (global.MsgsInLog === "true") {
        console.log(
          "" +
            (message.isGroup
              ? "[MESSAGE IN GROUP] From => " +
                message.metadata.subject +
                "\n[USER]:"
              : "[MESSAGE IN PRIVATE] From =>") +
            (" " +
              message.senderName +
              " " +
              message.senderNum +
              "\n[" +
              message.mtype.toUpperCase() +
              "]: " +
              message.body +
              "")
        );
      }
      let data =
        (await groupdb.findOne({
          id: message.chat,
        })) || false;
      let taggs = false;
      try {
        if (!global.SmdOfficial && global.SmdOfficial !== "yes") {
          return;
        }
        if (
          data &&
          data.antitag == "true" &&
          !message.checkBot() &&
          message.mtype !== "reactionMessage" &&
          data.botenable == "true"
        ) {
          const foo = await haveEqualMembers(
            message.metadata.participants.map((hmm) => hmm.id),
            message.mentionedJid
          );
          if (foo && message.isBotAdmin) {
            let resu = {
              reason: "tagging all members!",
              chat: message.metadata?.subject || "GROUP",
              warnedby: tlang().title,
              date: message.date,
            };
            taggs = await warn.addwarn(message.sender, message.chat, resu);
            await message.reply(
              "*[TAG DETECTED] Hey @" +
                message.senderNum +
                " warning!!_*\n*Tagging Users Isn't Allowd Here*",
              {
                mentions: [message.sender],
              }
            );
            await message.delete();
          } else if (foo && !message.isBotAdmin) {
            await message.reply(
              "*[TAGALL DETECTED] Can't do anything, Until I'm Admin*",
              {
                mentions: [message.sender],
              }
            );
          }
        }
        if (
          data &&
          message.isGroup &&
          !message.isAdmin &&
          !crwat &&
          message.mtype !== "reactionMessage" &&
          data.botenable == "true"
        ) {
          if (
            data.antibot &&
            data.antibot !== "false" &&
            message.isBot &&
            !message.checkBot(message.sender)
          ) {
            if (message.isBotAdmin) {
              var fel = "*_Bot user not allowed, please make it private!_*";
              if (data.antibot === "warn") {
                let msf_re = {
                  reason: "Bots not allowed!",
                  chat: message.metadata?.subject || "GROUP",
                  date: message.date,
                };
                taggs = taggs
                  ? taggs
                  : await warn.addwarn(message.sender, message.chat, msf_re);
                if (taggs.status) {
                  fel =
                    "*Hey @" + message.senderNum + " warning, Due To Antibot!*";
                }
              } else if (data.antibot === "kick") {
                try {
                  sleep(1000);
                  await message.bot.groupParticipantsUpdate(
                    message.chat,
                    [message.sender],
                    "remove"
                  );
                  fel =
                    "*_User @" + message.senderNum + " kick Due To Antibot!_*";
                } catch {}
              }
              await message.delete();
              await message.send(fel, {
                mentions: [message.sender],
              });
            } else if (!message.isBotAdmin && message.isBot) {
              await message.reply(
                "*_Uhh Please, Provide Admin Role To Kick Other Bot_*\n*_Or Disable Antibot (On/Off) In Current Group_*"
              );
            }
          }
          if (
            data.onlyadmin &&
            data.onlyadmin === "true" &&
            SmdOfficial == "yes"
          ) {
            var fel = "";
            if (message.isBotAdmin) {
              let dmt = {
                reason: "Only Admin can Chat!",
                chat: message.metadata?.subject || "PRIVATE",
                warnedby: tlang().title,
                date: message.date,
              };
              taggs = taggs
                ? taggs
                : await warn.addwarn(message.sender, message.chat, dmt);
              if (taggs.status) {
                fel = "*Warns you for chat here!*\n";
              }
              await message.delete();
              sleep(1500);
              await message.send(
                "*Hey @" +
                  message.senderNum +
                  "* " +
                  fel +
                  "*Deleteing message,while onlyadmin activated!!* ",
                {
                  mentions: [message.sender],
                }
              );
            } else {
              await message.send(
                "*_Provide admin role to kick Message Senders_*\n*Or _Disable onlyadmin(on/off) in currentchat_*"
              );
            }
          }
          if (
            data.antilink &&
            data.antilink !== "false" &&
            SmdOfficial === "yes"
          ) {
            const bmt =
              Config.antilink_values && Config.antilink_values !== "all"
                ? Config.antilink_values
                    .split(",")
                    .filter((input) => input.trim() !== "")
                : ["https://", "chat.whatsapp.com", "fb.com"];
            let searched = m_fino.toLowerCase();
            if (bmt.some((datb) => searched.includes(datb))) {
              if (!message.isBotAdmin) {
                let nsg =
                  " *[LINK DETECTED]*\nUser @" +
                  message.sender.split("@")[0] +
                  " detected sending a link.\nPromote " +
                  Config.botname +
                  " as admin to " +
                  (data.antilink === "kick"
                    ? "kick \nlink senders."
                    : "delete \nlinks from this Chat") +
                  " \n";
                await message.send(nsg, {
                  mentions: [message.sender],
                });
              } else if (data.antilink === "delete") {
                await message.send("*_Link Detected.. Deletion Done!_*");
                await message.delete();
              } else if (data.antilink === "warn" || data.antilink === "true") {
                let send_msg = {
                  reason: "links not allowed!",
                  chat: message.metadata?.subject || "PRIVATE",
                  warnedby: tlang().title,
                  date: message.date,
                };
                taggs = taggs
                  ? taggs
                  : await warn.addwarn(message.sender, message.chat, send_msg);
                var fel = taggs.status
                  ? "*_[LINK DETECTED] Hey @" +
                    message.senderNum +
                    " warning!!_*\n*_links not allowed in current group!_*"
                  : "*[LINK DETECTED]!*";
                await message.reply(fel, {
                  mentions: [message.sender],
                });
                await message.delete();
              } else if (data.antilink === "kick") {
                await message.send("*_Link Detected!!_*");
                try {
                  await message.delete();
                  sleep(1500);
                  await message.bot.groupParticipantsUpdate(
                    message.chat,
                    [message.sender],
                    "remove"
                  );
                } catch {
                  await message.send("*Link Detected*\n" + tlang().botAdmin);
                }
              }
            }
          }
        }
      } catch (err) {
        console.log("Error From Antilinks : ", err);
      }
      var wrods_on_db = data?.antiword || {
        status: "false",
      };
      if (
        body.length > 1 &&
        !message.isBot &&
        wrods_on_db &&
        wrods_on_db.status !== "false" &&
        wrods_on_db.words
      ) {
        var chek = wrods_on_db.words.split(",") || [];
        let quer = false;
        chek.map(async (msg) => {
          if (
            message.isAdmin ||
            !global.SmdOfficial ||
            global.SmdOfficial != "yes"
          ) {
            return;
          }
          let match = new RegExp("\\b" + msg?.trim() + "\\b", "ig");
          let resu = messagend.toLowerCase();
          if (!quer && msg && match.test(resu)) {
            quer = true;
            await sleep(500);
            try {
              var db_find = "";
              if (wrods_on_db.status === "warn") {
                let send_msd_fb = {
                  reason: "For using Bad Word",
                  chat: message.metadata?.subject || "PRIVATE",
                  warnedby: tlang().title,
                  date: message.date,
                };
                taggs = taggs
                  ? taggs
                  : await warn.addwarn(
                      message.sender,
                      message.chat,
                      send_msd_fb
                    );
                if (taggs.status) {
                  db_find = "\n*Warns you for using badWord!!*\n";
                }
              }
              if (message.isBotAdmin) {
                await message.send(
                  "*[BAD WORD DETECTED] Hey @" +
                    message.senderNum +
                    "* " +
                    db_find +
                    " *Deleting your message from chat!*\n",
                  {
                    mentions: [message.sender],
                  },
                  message
                );
                await message.delete();
              } else {
                await message.reply(
                  "*_[BAD WORD DETECTED] provide admin to take action!_*",
                  {
                    mentions: [message.sender],
                  }
                );
              }
            } catch (err) {
              console.log("Error From Bad Words : ", err);
            }
          }
        });
      }
      if (taggs) {
        let db = parseInt(global.warncount) || 2;
        if (taggs.warning >= db) {
          if (message.isGroup) {
            if (message.isBotAdmin) {
              await message.send(
                "*Hey @" +
                  message.senderNum +
                  " Kicking you from group!_*\n*_Because Your warn limit exceeded*",
                {
                  mentions: [message.sender],
                }
              );
              await message.bot.groupParticipantsUpdate(
                message.chat,
                [message.sender],
                "remove"
              );
            }
          } else {
            await message.send(
              "*Hey @" +
                message.senderNum +
                " Blocking you!_*\n*_Because Your warn limit exceeded*",
              {
                mentions: [message.sender],
              }
            );
            await message.bot.updateBlockStatus(message.sender, "block");
          }
        }
      }
      try {
        if (!global.SmdOfficial || message.mtype === "reactionMessage") {
          return;
        }
        let db = (await groupdb.findOne({
          id: message.chat,
        })) || {
          chatbot: "false",
        };
        if (!bott || chatbotCount >= 10) {
          bott = (await bot_.findOne({
            id: "bot_" + message.user,
          })) || {
            chatbot: "false",
          };
        } else {
          chatbotCount++;
        }
        let foo =
          bott && bott.chatbot && bott.chatbot == "true"
            ? "true"
            : db.chatbot || "false";
        if (foo === "true" && !incastity && !message.isBot && message.text) {
          let _0x4c0917 = !message.isGroup
            ? message.user
            : message.quoted
            ? message.quoted.sender
            : message.mentionedJid[0] || false;
          if (message.isGroup && _0x4c0917 && !message.checkBot(_0x4c0917)) {
            return;
          }
          let { data: ccpt } = await axios.get(
            "http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[" +
              message.senderNum +
              "]&msg=[" +
              messagend +
              "]"
          );
          if (ccpt && ccpt.cnt) {
            message.send(ccpt.cnt, {}, "suhail", message);
          } else {
            ("");
          }
        }
      } catch (err) {
        console.log("Error From ChatBot : ", err);
      }
    } catch (err) {
      console.log("Group Settings error in command.main() \n", err);
    }
  }
);
let users = {};
let user_warns = {};
UserFunction(
  {
    group: "add",
  },
  async (msg, { Void: _0x4dedb6 }) => {
    try {
      let match = await groupdb.findOne({
        id: msg.chat,
      });
      if (
        !match ||
        !msg.isGroup ||
        match.botenable !== "true" ||
        msg.blockJid ||
        msg.fromMe
      ) {
        return;
      }
      let dat = match && match.welcome ? match.welcome : "false";
      let query =
        match && match.antifake ? match.antifake.toLowerCase() : "false";
      let input = query.split(",");
      const data_ba = input.some((msnc) => msg.user.startsWith(msnc));
      if (query !== "false" && !data_ba && !msg.isCreator) {
        if (msg.isBotAdmin) {
          try {
            await msg.kick();
            return await sendWelcome(
              msg,
              "*[ANTIFAKE START] @User kicked automaticaly!* @pp"
            );
          } catch (err) {
            await msg.error(
              " Can't kick user in antifake\n❲❒❳ GROUP: " +
                msg.metadata.subject +
                "\n❲❒❳ ERROR: " +
                err +
                "\n",
              err,
              false
            );
          }
        } else {
          await msg.send(
            "*[ANTI_FAKE ERROR] Need admin role to kick fake users!!*"
          );
        }
      } else if (dat === "true") {
        await sendWelcome(msg, match.welcometext);
      }
    } catch (err) {
      console.log("Error From Welcome : ", err);
    }
  }
);
UserFunction(
  {
    group: "remove",
  },
  async (message, { Void: remove }) => {
    try {
      let citel =
        (await groupdb.findOne({
          id: message.chat,
        })) || false;
      if (
        !message ||
        !citel ||
        !message.isGroup ||
        citel.botenable !== "true" ||
        message.blockJid ||
        message.fromMe
      ) {
        return;
      }
      let aitel = citel && citel.goodbye ? citel.goodbye : "false";
      if (aitel === "true") {
        await sendWelcome(message, citel.goodbyetext);
      }
    } catch (_0x442765) {
      console.log("Error From Goodbye : ", _0x442765);
    }
  }
);
smd(
  {
    group: "promote",
  },
  async (message) => {
    try {
      let citel =
        (await groupdb.findOne({
          id: message.chat,
        })) || false;
      if (
        !citel ||
        !message.isGroup ||
        citel.botenable !== "true" ||
        message.blockJid
      ) {
        return;
      }
      if (!user_warns[message.sender]) {
        user_warns[message.sender] = {
          [message.action]: 1,
        };
      } else {
        user_warns[message.sender][message.action]++;
      }
      let aitel;
      if (citel.antipromote == "true" && !message.isCreator) {
        aitel = message.isBotAdmin ? false : true;
        if (
          users[message.sender] &&
          users[message.sender].previous_Action === "antidemote"
        ) {
          delete users[message.sender];
          return;
        }
        if (message.isBotAdmin) {
          try {
            await message.demote();
            users[message.sender] = {
              previous_Action: "antipromote",
            };
            if (user_warns[message.sender][message.action] > 2) {
              return;
            }
            return await sendWelcome(
              message,
              "*[ANTIPROMOTE START] @User Demoted Automatically!* @pp "
            );
          } catch (err) {
            await message.error(
              " Can't demote user in antipromote\n❲❒❳ GROUP: " +
                message.metadata.subject +
                "\n❲❒❳ ERROR: " +
                err +
                "\n",
              err,
              false
            );
          }
        }
      }
      if (citel.pdm == "true" || aitel) {
        if (user_warns[message.sender][message.action] > 2) {
          return;
        }
        var msg =
          " *[SOMEONE PROMOTE HERE]*\n" +
          (aitel
            ? "*Note : _I'm Not Admin Here, So I Can't Demote Someone while Anti_Promote Activated_*"
            : "") +
          "\n           \n  ❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Member -> Admin_ @pp\n  ❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n\n\n" +
          Config.caption;
        return await sendWelcome(message, citel);
      }
    } catch (err) {
      console.log("Error From Promote : ", err);
    }
  }
);
UserFunction(
  {
    group: "demote",
  },
  async (mesg, { Void: _0x4676d7 }) => {
    try {
      let citel =
        (await groupdb.findOne({
          id: mesg.chat,
        })) || false;
      if (
        !citel ||
        !mesg.isGroup ||
        citel.botenable !== "true" ||
        mesg.blockJid
      ) {
        return;
      }
      if (!user_warns[mesg.sender]) {
        user_warns[mesg.sender] = {
          [mesg.action]: 1,
        };
      } else {
        user_warns[mesg.sender][mesg.action]++;
      }
      let matches;
      if (citel.antidemote == "true" && !mesg.isCreator) {
        matches = mesg.isBotAdmin ? false : true;
        if (
          users[mesg.sender] &&
          users[mesg.sender].previous_Action === "antipromote"
        ) {
          delete users[mesg.sender];
          return;
        }
        if (mesg.isBotAdmin) {
          try {
            await mesg.promote();
            users[mesg.sender] = {
              previous_Action: "antidemote",
            };
            if (user_warns[mesg.sender][mesg.action] > 2) {
              return;
            }
            return await sendWelcome(
              mesg,
              "*[ANTIPROMOTE START] User promote automatically!* @pp "
            );
          } catch (err) {
            await mesg.error(
              " Can't promote user in antidemote\n❲❒❳ GROUP: " +
                mesg.metadata.subject +
                "\n❲❒❳ ERROR: " +
                err +
                "\n",
              err,
              false
            );
          }
        }
      }
      if (citel.pdm == "true" || matches) {
        if (user_warns[mesg.sender][mesg.action] > 2) {
          return;
        }
        var dm_msg =
          " *[SOMEONE DEMOTE HERE]*\n  " +
          (matches
            ? "*Note : _I'm Not Admin Here, So I Can't promote Someone while Anti_Demote Activated_*"
            : "") +
          "\n\n  ❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Admin -> Member_ @pp\n  ❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n  \n\n" +
          Config.caption;
        return await sendWelcome(mesg, dm_msg);
      }
    } catch (err) {
      console.log("Error From Demote : ", err);
    }
  }
);
