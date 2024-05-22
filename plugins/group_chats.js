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
