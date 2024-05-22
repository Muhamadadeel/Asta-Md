const { updateProfilePicture, parsedJid } = require("../lib");
const {
  sck,
  UserFunction,
  send,
  Config,
  tlang,
  sleep,
  getAdmin,
  prefix,
} = require("../lib");
const ᴀsᴛᴀ_ᴍᴅ = require("../lib/plugins");
const { cmd } = ᴀsᴛᴀ_ᴍᴅ;
const grouppattern = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22}/g;
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
  async (input, match, { UserFunction: newgc, cmdName: newgc }) => {
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
            (prefix + cmd) +
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
