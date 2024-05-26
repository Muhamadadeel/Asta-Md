global.warncount = process.env.WARN_COUNT || global.warncount || "3";
global.MsgsInLog = process.env.MSGS_IN_LOG || global.MsgsInLog || "true";
const {
  updateProfilePicture
} = require("../lib");
const {
  sck,
  UserFunction,
  send,
  Config,
  tlang,
  sleep,
  getAdmin,
  prefix
} = require("../lib");
const astro_patch = require("../lib/plugins");
const {
  cmd
} = astro_patch;
const grouppattern = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22}/g;
const {
  groupdb,
  userdb,
  bot_,
  sendWelcome,
  sck1
} = require("../lib");
const axios = require("axios");
UserFunction({
  pattern: "chatbot",
  desc: "Chat Bot",
  fromMe: true,
  category: "misc",
  filename: __filename
}, async (message, citel, { cmdName: chatbot }) => {
  try {
    const command = citel.split(" ")[0].toLowerCase().trim();

    const group = await groupdb.findOne({ id: message.chat }) || await groupdb.new({ id: message.chat });
    const botSettings = await bot_.findOne({ id: `bot_${message.user}` }) || await groupdb.new({ id: `bot_${message.user}` }) || { chatbot: "false" };

    if (command === "all" || command === "global") {
      if (botSettings.chatbot === "true") {
        return await message.send(`*${chatbot} was already enabled to all chat!.*`);
      }
      await bot_.updateOne({ id: `bot_${message.user}` }, { chatbot: "true" });
      return await message.send(`*${chatbot} successfully enabled to all chats!.*`);
    } else if (command.startsWith("on") || command.startsWith("act") || command.startsWith("enable")) {
      if (group.chatbot === "true" || botSettings.chatbot === "true") {
        return await message.send(`*${chatbot} was already enabled.*`);
      }
      await groupdb.updateOne({ id: message.chat }, { chatbot: "true" });
      return await message.send(`*${chatbot} activated successfully.*`);
    } else if (command.startsWith("off") || command.startsWith("deact") || command.startsWith("disable")) {
      if (group.chatbot === "false" && botSettings.chatbot === "false") {
        return await message.send(`*${chatbot} was already disabled.*`);
      }
      await bot_.updateOne({ id: `bot_${message.user}` }, { chatbot: "false" });
      await groupdb.updateOne({ id: message.chat }, { chatbot: "false" });
      return await message.send(`*${chatbot} deactivated successfully.*`);
    } else {
      const status = botSettings.chatbot === "true" ? "Enabled in 'all' Chats" : group.chatbot === "true" ? "Enabled in Chat" : "Disabled in Chat";
      return await message.reply(`*_${chatbot} Currently *${status}!_*\n*_Use On/Off/all to enable/disable ${chatbot}_*`);
    }
  } catch (error) {
    message.error(`${error}\n\ncommand: lydea(chatbot)`, error);
  }
});

let warn = {};

warn.addwarn = async (userId, chatId, options = {}) => {
  try {
    let userRecord = await userdb.findOne({ id: userId }) || await userdb.new({ id: userId });
    let warnings = userRecord.warn || {};

    if (!warnings[chatId]) {
      warnings[chatId] = [];
    }

    const newWarning = {
      chat: "PRIVATE",
      reason: "Inappropriate Behaviour",
      date: new Date(),
      warnedby: tlang().title,
      ...options
    };

    warnings[chatId].push(newWarning);

    userRecord = await userdb.updateOne({ id: userId }, { warn: warnings });

    return {
      status: true,
      warning: warnings[chatId].length,
      user: userRecord
    };
  } catch (error) {
    return {
      status: false,
      warning: 0,
      user: {},
      error: error
    };
  }
};

UserFunction({
  pattern: "checkwarn",
  desc: "List warnings of a user.",
  category: "general",
  filename: __filename
}, async (message, command) => {
  try {
    let responseText = "";
    let userId = message.sender;

    if (message.isCreator) {
      userId = message.reply_message ? message.reply_message.sender : message.mentionedJid[0] || userId;
    }

    let userRecord = await userdb.findOne({ id: userId }) || await userdb.new({ id: userId });
    let warnings = userRecord.warn || {};

    if (warnings && command === "all") {
      warnings = userRecord.warn;
    } else if (warnings && warnings[message.chat]) {
      warnings = { [message.chat]: [...warnings[message.chat]] };
    } else {
      warnings = false;
    }

    if (!userRecord || !warnings) {
      return await message.send("*_User doesn't have any warnings yet!!_*");
    }

    for (const chatId in warnings) {
      let chatWarnings = warnings[chatId];
      responseText += `\n╭─────────────◆\n│ *[ID] : ${chatId.includes("@") ? (await message.bot.getName(chatId)) || chatId : chatId}*\n│ *[TOTAL WARNING] : ${warnings[chatId].length}*\n┝─────────────◆\n`;

      chatWarnings.forEach((warning, index) => {
        responseText += `┝── *WARNING ${index + 1}* ──\n│  *DATE:* ${warning.date} ${warning.reason ? `  \n│  *REASON:* ${warning.reason}` : ""}\n│  *WARNED BY:* ${warning.warnedby}\n│  *CHAT:* ${warning.chat}\n`;
      });

      responseText += "╰─────────────◆\n";
    }

    return await message.reply(responseText || "*_User doesn't have any warnings yet!!_*");
  } catch (error) {
    await message.error(`${error}\n\nCommand: chatwarn`, error);
  }
});

UserFunction({
  pattern: "warn",
  fromMe: true,
  desc: "Warn a user!",
  category: "general",
  filename: __filename,
  use: " < USER >"
}, async (message, reason) => {
  try {
    let userId = message.reply_message ? message.reply_message.sender : message.mentionedJid[0];

    if (!userId) {
      return await message.send("*_Please reply to a user!!_*");
    }

    let userRecord = await userdb.findOne({ id: userId }) || await userdb.new({ id: userId });
    let warnings = userRecord.warn || {};

    if (!warnings[message.chat]) {
      warnings[message.chat] = [];
    }

    const newWarning = {
      chat: message.isGroup ? message.metadata?.subject || "GROUP" : "PRIVATE CHAT",
      reason: reason,
      date: message.date,
      warnedby: message.senderName
    };

    warnings[message.chat].push(newWarning);

    await userdb.updateOne({ id: userId }, { warn: warnings });

    let warnLimit = parseInt(global.warncount) || 3;

    if (warnings[message.chat].length > warnLimit && !message.checkBot(userId)) {
      if (message.isGroup) {
        if (message.isBotAdmin) {
          await message.send(`*_Hey @${userId.split("@")[0]}, Kicking you from group!_*\n*_Because your warn limit exceeded!_*`, { mentions: [userId] });
          await message.bot.groupParticipantsUpdate(message.chat, [userId], "remove");
        } else {
          return await message.send(`*_Hey @${userId.split("@")[0]}, don't spam, your warn limit exceeded!_*`);
        }
      } else {
        await message.send(`*_Hey @${userId.split("@")[0]}, blocking you!_*\n*_Because your warn limit exceeded!_*`, { mentions: [userId] });
        await message.bot.updateBlockStatus(userId, "block");
      }
    } else {
      return await message.send(`*_Hey @${userId.split("@")[0]}, warning added, don't spam!_*`, { mentions: [userId] });
    }
  } catch (error) {
    await message.error(`${error}\n\nCommand: warn `, error, false);
  }
});

UserFunction({
  pattern: "resetwarn",
  desc: "Reset warnings of a user.",
  category: "general",
  filename: __filename,
  use: " user "
}, async (message, command) => {
  try {
    if (!message.isCreator && !message.isAdmin) {
      return await message.reply(tlang().admin);
    }

    let userId = message.reply_message ? message.reply_message.sender : message.mentionedJid[0];

    if (!userId) {
      return await message.send("*_Please reply to a user!!_*");
    }

    let userRecord = await userdb.findOne({ id: userId }) || await userdb.new({ id: userId }) || {};
    let warnings = userRecord.warn || {};

    if (message.isCreator && command.toLowerCase() === "all" && warnings) {
      warnings = {};
    } else {
      if (!warnings[message.chat]) {
        return await message.send("*_User doesn't have any warnings yet!!_*");
      }
      delete warnings[message.chat];
    }

    await userdb.updateOne({ id: userId }, { warn: warnings });
    await message.reply("*User is free as a bird now!*\n*All warnings have been deleted!*");
  } catch (error) {
    await message.error(`${error}\n\nCommand: resetwarn`, error);
  }
});

UserFunction({
  pattern: "act",
  alias: ["activate", "active"],
  desc: "Switches for various works.",
  category: "moderation",
  filename: __filename
}, async (message, args) => {
  try {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }

    const botNumber = message.botNumber;
    const isAdmin = message.isAdmin;
    const action = args?.split(" ")[0].toLowerCase()?.trim() || false;

    if (!isAdmin && !message.isCreator) {
      return message.reply(tlang().admin);
    }

    let groupSettings = await groupdb.findOne({ id: message.chat }) || await groupdb.new({ id: message.chat });
    if (!groupSettings) {
      return await message.reply("*_Uhh dear, Group not found in Database!_*");
    }

    switch (action) {
      case "antilink":
        if (groupSettings.antilink !== "false") {
          return await message.reply("*_Antilink was already enabled here!_*");
        }
        await groupdb.updateOne({ id: message.chat }, { antilink: "warn" });
        await message.reply("*_Enabled antilink in current chat._*");
        break;

      case "economy":
        if (groupSettings.economy === "true") {
          return await message.reply("*_Economy was already enabled._*");
        }
        await groupdb.updateOne({ id: message.chat }, { economy: "true" });
        await message.reply("*_Economy enabled in current chat._*");
        break;

      case "events":
      case "event":
        await groupdb.updateOne({ id: message.chat }, { welcome: "true", goodbye: "true" });
        await message.reply("*Successfully Enabled Events!*");
        break;

      case "nsfw":
        if (groupSettings.nsfw === "true") {
          return await message.reply("*_NSFW is already enabled!_*");
        }
        await groupdb.updateOne({ id: message.chat }, { nsfw: "true" });
        await message.reply("*_Successfully Enabled NSFW_*");
        break;

      case "bot":
        if (groupSettings.botenable === "true") {
          return await message.reply("*_bot is already enabled!_*");
        }
        await groupdb.updateOne({ id: message.chat }, { botenable: "true" });
        await message.reply("*_Successfully Enabled bot_*");
        break;

      default:
        await message.reply("Please provide a valid term like:\n1-events\n2-antilink\n3-economy\n4-bot");
    }
  } catch (error) {
    await message.error(`${error}\n\ncommand: act`, error);
  }
});

UserFunction({
  pattern: "deact",
  alias: ["deactive", "deactivate"],
  desc: "Switches for various works.",
  category: "moderation",
  filename: __filename
}, async (message, args) => {
  try {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }

    const botNumber = message.botNumber;
    const isAdmin = message.isAdmin;
    const action = args?.split(" ")[0].toLowerCase()?.trim() || false;

    if (!action) {
      return message.reply("❌ Please provide a term like\n1-events\n2-antilink\n3-nsfw\n4-bot\n5-economy");
    }

    if (!isAdmin && !message.isCreator) {
      return message.reply(tlang().admin);
    }

    let groupSettings = await groupdb.findOne({ id: message.chat }) || await groupdb.new({ id: message.chat });
    if (!groupSettings) {
      return await message.reply("*_Uhh dear, request cannot be processed due to an error!_*");
    }

    switch (action) {
      case "antilink":
        if (groupSettings.antilink === "false") {
          return message.reply("*_Antilink was already disabled_*");
        }
        await groupdb.updateOne({ id: message.chat }, { antilink: "false" });
        await message.reply("*_Disabled antilink in current chat!_*");
        break;

      case "economy":
        if (groupSettings.economy === "false") {
          return message.reply("*_Economy was already disabled!_*");
        }
        await groupdb.updateOne({ id: message.chat }, { economy: "false" });
        await message.reply("*_Disabled Economy in current chat._*");
        break;

      case "events":
      case "event":
        if (groupSettings.events === "false") {
          return message.reply("*_Events are already disabled!_*");
        }
        await groupdb.updateOne({ id: message.chat }, { welcome: "false", goodbye: "false" });
        await message.reply("*Successfully disabled Events!*");
        break;

      case "nsfw":
        if (groupSettings.nsfw === "false") {
          return message.reply("*_NSFW is already disabled!_*");
        }
        await groupdb.updateOne({ id: message.chat }, { nsfw: "false" });
        await message.reply("*Successfully disabled NSFW*");
        break;

      case "bot":
        if (groupSettings.botenable === "false") {
          return await message.reply("*_bot is already disabled!_*");
        }
        await groupdb.updateOne({ id: message.chat }, { botenable: "false" });
        await message.reply("*_Successfully disabled bot_*");
        break;

      default:
        await message.reply("Please provide a valid term like:\n1-events\n2-antilink\n3-bot\n4-economy");
    }
  } catch (error) {
    await message.error(`${error}\n\ncommand: deact`, error);
  }
});

UserFunction({
  pattern: "bot",
  desc: "Activates and deactivates bot.\nUse buttons to toggle.",
  fromMe: true,
  category: "misc",
  filename: __filename
}, async (message, args) => {
  try {
    const action = args ? args.toLowerCase().trim() : false;
    const term = action ? action.split(" ")[0] : false;
    let groupSettings = await groupdb.findOne({ id: message.chat }) || await groupdb.new({ id: message.chat });

    if (!term) {
      await message.send(`*_Bot is ${groupSettings.botenable === "false" ? "Disabled" : "Enabled"} in this Chat!_*`);
    } else if (term.startsWith("off") || term.startsWith("deact") || term.startsWith("disable")) {
      if (groupSettings.botenable === "false") {
        await message.send("*_Bot already disabled in current Chat!!_*");
      } else {
        await groupdb.updateOne({ id: message.chat }, { botenable: "false" });
        await message.send("*_Bot Disabled Successfully!_*");
      }
    } else if (term.startsWith("on") || term.startsWith("act") || term.startsWith("enable")) {
      if (groupSettings.botenable === "true") {
        await message.send("*_Bot already enabled in current Chat!!_*");
      } else {
        await groupdb.updateOne({ id: message.chat }, { botenable: "true" });
        await message.send("*_Bot Successfully Enabled!_*");
      }
    } else {
      await message.send(`*_Provide Valid Instruction_*\n*Ex: _${prefix}bot on/off_*`);
    }
  } catch (error) {
    message.error(`${error}\n\ncommand: bot`, error);
  }
});

UserFunction({
  pattern: "antitag",
  desc: "Detect tagall in group chat, then kick them",
  fromMe: true,
  category: "misc",
  filename: __filename
}, async (message, args) => {
  try {
    const command = args ? args.toLowerCase().trim() : null;
    const action = command ? command.split(" ")[0] : null;
    const groupData = await groupdb.findOne({ id: message.chat }) || await groupdb.new({ id: message.chat });

    if (!action) {
      await message.send(`*_Anti_tag ${groupData.antitag === "false" ? "Disabled" : "Enabled"} in this Chat!_*`);
    } else if (["off", "deact", "disable"].includes(action)) {
      if (groupData.antitag === "false") {
        await message.send("*_Anti_tag already disabled in current Chat!!_*");
      } else {
        await groupdb.updateOne({ id: message.chat }, { antitag: "false" });
        await message.send("*_Anti_tag Disabled Successfully!_*");
      }
    } else if (["on", "act", "enable"].includes(action)) {
      if (groupData.antitag === "true") {
        await message.send("*_Anti_tag already enabled in current Chat!!_*");
      } else {
        await groupdb.updateOne({ id: message.chat }, { antitag: "true" });
        await message.send("*_Anti_tag successfully enabled in chat!_*\n*_Now bot will kick user who tags all members!_*");
      }
    } else {
      await message.send("*_Provide Valid Instruction_*\n*Ex: _" + prefix + "antitag on/off_*");
    }
  } catch (error) {
    message.error(error + "\n\ncommand: antitag", error);
  }
});

UserFunction({
  pattern: "antilink",
  desc: "Activates and deactivates antilink. Use buttons to toggle.",
  category: "group",
  filename: __filename
}, async (message, args, { smd }) => {
  try {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }
    if (!message.isAdmin && !message.isCreator) {
      return message.reply(tlang().admin);
    }

    const command = args ? args.toLowerCase().trim() : null;
    const action = command ? command.split(" ")[0] : null;
    const groupData = await groupdb.findOne({ id: message.chat }) || await groupdb.new({ id: message.chat });

    if (!action) {
      return await message.send(`*_Antilink ${groupData.antilink === "false" ? "Disabled" : "Enabled"} in this Group!_* \n${groupData.antilink === "false" ? "" : "*Current Mode:* _" + groupData.antilink + "_"}\n\n*Antilink Modes:* \`\`\`\n${prefix + smd} kick (Delete Links & Kick Senders)\n${prefix + smd} delete (Delete Links Only)\n${prefix + smd} warn (Warn & Delete Links)\n${prefix + smd} off (Disable Antilink in chat) \`\`\`\n\n\n${Config.caption}`);
    } else if (["off", "deact", "disable"].includes(action)) {
      if (groupData.antilink === "false") {
        return await message.send("*_Anti_Link already disabled in current Chat!!_*");
      }
      await groupdb.updateOne({ id: message.chat }, { antilink: "false" });
      return await message.send("*_Anti_Link Disabled Successfully!_*");
    } else if (["kick"].includes(action)) {
      if (groupData.antilink === "kick") {
        return await message.send("*_Anti_Link already set to kick link senders!!_*");
      }
      await groupdb.updateOne({ id: message.chat }, { antilink: "kick" });
      return await message.send("*_Anti_Link Successfully set to kick link senders!_*");
    } else if (["delete"].includes(action)) {
      if (groupData.antilink === "delete") {
        return await message.send("*_Anti_Link already set to delete links!!_*");
      }
      await groupdb.updateOne({ id: message.chat }, { antilink: "delete" });
      return await message.send("*_Anti_Link Successfully set to delete links from chat!_*");
    } else if (["warn"].includes(action)) {
      if (groupData.antilink === "warn") {
        return await message.send("*_Anti_Link already set to warn link senders!!_*");
      }
      await groupdb.updateOne({ id: message.chat }, { antilink: "warn" });
      return await message.send("*_Anti_Link set to warn and delete links!_*");
    } else {
      return await message.send("*_Please provide a valid instruction_*\n*Eg: _" + prefix + "antilink kick/delete/warn/off_*");
    }
  } catch (error) {
    message.error(error + "\n\ncommand: antilink", error);
  }
});

UserFunction({
  pattern: "welcome",
  alias: ["setwelcome"],
  desc: "Sets welcome message in specific group.",
  category: "group",
  filename: __filename
}, async (message, args) => {
  try {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }
    if (!message.isAdmin && !message.isCreator) {
      return message.reply(tlang().admin);
    }

    const command = args.toLowerCase().trim();
    const groupData = await groupdb.findOne({ id: message.chat }) || await groupdb.new({ id: message.chat });

    if (["on", "act", "enable"].includes(command)) {
      if (groupData.welcome === "true") {
        return await message.send("*_Welcome already enabled in current group!!_*");
      }
      await groupdb.updateOne({ id: message.chat }, { welcome: "true" });
      return await message.send("*Welcome successfully enabled!!*");
    }

    if (groupData.welcome !== "true") {
      return await message.send(`*_Welcome *Disabled in this Group!_* \n*_Use on/off to enable/disable welcome_*`);
    }

    if (!args || command === "get") {
      return await message.reply("*Welcome :* " + groupData.welcometext);
    }

    if (["off", "deact", "disable"].includes(command)) {
      if (groupData.welcome === "false") {
        return await message.send("*_Welcome already disabled in current group!!_*");
      }
      await groupdb.updateOne({ id: message.chat }, { welcome: "false" });
      return await message.send("*Welcome message disabled!!*");
    }

    await groupdb.updateOne({ id: message.chat }, { welcometext: args, welcome: "true" });
    await sendWelcome(message, args);
  } catch (error) {
    message.error(error + "\n\ncommand: setwelcome", error);
  }
});

UserFunction({
  pattern: "setbye",
  desc: "Sets goodbye message in specific group.",
  category: "group",
  filename: __filename
}, async (message, args) => {
  try {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }
    if (!message.isAdmin && !message.isCreator) {
      return message.reply(tlang().admin);
    }

    const command = args.toLowerCase().trim();
    const groupData = await groupdb.findOne({ id: message.chat }) || await groupdb.new({ id: message.chat });

    if (["on", "act", "enable"].includes(command)) {
      if (groupData.goodbye === "true") {
        return await message.send("*_Goodbye already enabled in current group!!_*");
      }
      await groupdb.updateOne({ id: message.chat }, { goodbye: "true" });
      return await message.send("*Goodbye successfully enabled!!*");
    }

    if (groupData.goodbye !== "true") {
      return await message.send(`*_Goodbye *Disabled in this Group!_* \n*_Use on/off to enable/disable goodbye_*`);
    }

    if (!args || command === "get") {
      return await message.reply("*Goodbye Message :* " + groupData.goodbyetext);
    }

    if (["off", "deact", "disable"].includes(command)) {
      if (groupData.goodbye === "false") {
        return await message.send("*_Goodbye already disabled in current group!!_*");
      }
      await groupdb.updateOne({ id: message.chat }, { goodbye: "false" });
      return await message.send("*Goodbye message disabled!!*");
    }

    await groupdb.updateOne({ id: message.chat }, { goodbyetext: args, goodbye: "true" });
    await sendWelcome(message, args);
  } catch (error) {
    message.error(error + "\n\ncommand: setgoodbye", error);
  }
});

UserFunction({
  pattern: "onlyadmin",
  alias: ["antimessge"],
  desc: "activates and deactivates onlyadmin.",
  category: "group",
  filename: __filename
}, async (ctx, args, { cmdName }) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    if (!ctx.isAdmin && !ctx.isCreator) {
      return ctx.reply(tlang().admin);
    }

    let groupData = await groupdb.findOne({ id: ctx.chat }) || await groupdb.new({ id: ctx.chat });
    let commandArg = args ? args.toLowerCase().trim() : false;
    let action = commandArg ? commandArg.split(" ")[0] : false;

    if (!action) {
      return ctx.send(`*_${cmdName} ${groupData.onlyadmin === "false" ? "Disabled" : "Enabled"} in this Group!_*\n *_Use on/off to enable/disable_*`);
    }

    if (["off", "deact", "disable"].includes(action)) {
      if (groupData.onlyadmin === "false") {
        return ctx.reply("*_Onlyadmin Already Disabled in Current Chat_*");
      }
      await groupdb.updateOne({ id: ctx.chat }, { onlyadmin: "false" });
      await ctx.bot.groupSettingUpdate(ctx.chat, "not_announcement");
      return ctx.send(`*_${cmdName} successfully disabled in group!_*\n*_Now everyone can send messages in group_*`);
    }

    if (["on", "act", "enable"].includes(action)) {
      if (groupData.onlyadmin === "true") {
        return ctx.reply("*_Onlyadmin Already Enabled in Current Chat_*");
      }
      if (ctx.isBotAdmin) {
        await groupdb.updateOne({ id: ctx.chat }, { onlyadmin: "true" });
        await ctx.bot.groupSettingUpdate(ctx.chat, "announcement");
        return ctx.send(`*_${cmdName} successfully set to kick msg senders!_*\n*_Now only admins can send messages in group_*`);
      } else {
        return ctx.reply("*_Please provide Admin Role first_*");
      }
    }

    return ctx.reply("*_Please Provide Valid Instruction_*\n*_Use on/off to enable/disable_*");
  } catch (error) {
    ctx.error(`${error}\n\ncommand: onlyadmin`, error);
  }
});

UserFunction({
  pattern: "antibot",
  desc: "kick Bot Users from Group.!",
  category: "group",
  filename: __filename
}, async (ctx, args, { cmdName }) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    if (!ctx.isAdmin && !ctx.isCreator) {
      return ctx.reply(tlang().admin);
    }

    let groupData = await groupdb.findOne({ id: ctx.chat }) || await groupdb.new({ id: ctx.chat });
    let commandArg = args ? args.toLowerCase().trim() : "";
    let action = commandArg.startsWith("on") || commandArg.startsWith("act") || commandArg.startsWith("enable") || commandArg.startsWith("del") || commandArg.startsWith("warn") ? "warn" : commandArg.startsWith("kic") ? "kick" : commandArg.startsWith("off") || commandArg.startsWith("reset") || commandArg.startsWith("deact") || commandArg.startsWith("disable") ? "false" : "";

    if (!action) {
      return ctx.send(`*_Antibot Currently ${groupData.antibot === "false" ? "Disabled" : "Enabled"} in this Group!_*\n*_Use warn/kick/off to enable/disable Antibot_*`);
    }

    if (action === "false") {
      if (groupData.antibot === "false") {
        return ctx.reply("*_Antibot Already Disabled in Current Chat_*");
      }
      await groupdb.updateOne({ id: ctx.chat }, { antibot: "false" });
      return ctx.send("*_Antibot Successfully Disabled in group!_*");
    }

    if (["warn", "kick"].includes(action)) {
      if (groupData.antibot === action) {
        return ctx.reply(`*_Antibot Already set to ${action} bots!_*`);
      }
      if (!ctx.isBotAdmin) {
        return ctx.reply("*_Please provide Admin Role first_*");
      }
      await groupdb.updateOne({ id: ctx.chat }, { antibot: action });
      return ctx.send(`*_Antibot Successfully set to ${action} Bot Users!_*`);
    }

    return ctx.reply("*_Please provide valid instructions!_*\n*_Use warn/kick/off to enable/disable Antibot!_*");
  } catch (error) {
    ctx.error(`${error}\n\ncommand: antibot`, error);
  }
});

UserFunction({
  pattern: "disable",
  desc: "disable cmds in Group.!",
  category: "group",
  filename: __filename
}, async (ctx, args) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    if (!ctx.isAdmin && !ctx.isCreator) {
      return ctx.reply(tlang().admin);
    }

    let groupData = await groupdb.findOne({ id: ctx.chat }) || await groupdb.new({ id: ctx.chat });
    let commandArg = args ? args.toLowerCase().trim() : "";
    let action = commandArg ? commandArg.split(" ")[0] : "";

    if (!action) {
      return ctx.send(`*Provide cmd name to disable in group*\n*Ex ${prefix}disable tag (to disable 'tag' cmd)/info*`);
    }

    if (["info", "list", "cmds"].includes(action)) {
      return ctx.send(groupData.disablecmds === "false" ? "*_No cmds are disabled in current group_*" : `*_Disabled cmds :_* \`\`\`${groupData.disablecmds.replace("false,", "")}\`\`\``);
    }

    if (["enable", "disable", "bot"].includes(action)) {
      return ctx.reply("*_Cannot disable that cmd_*");
    }

    const command = astro_patch.commands.find(cmd => cmd.pattern === action) || astro_patch.commands.find(cmd => cmd.alias && cmd.alias.includes(action));
    if (command) {
      let pattern = command.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      let regex = new RegExp(`\\b${pattern}\\b`);
      if (regex.test(groupData.disablecmds)) {
        return ctx.send("*Command is already disabled*");
      }
      let updatedDisabledCmds = `${groupData.disablecmds},${command.pattern}`;
      await groupdb.updateOne({ id: ctx.chat }, { disablecmds: updatedDisabledCmds });
      let disabledCmds = updatedDisabledCmds.replace("false,", "");
      return ctx.send(`*_\"${action}\" Successfully added to disabled cmds_*${disabledCmds === "" ? "" : `\n*_Disabled cmds :_* \`\`\`${disabledCmds}\`\`\``}`);
    } else {
      return ctx.reply(`*_'${action}' is not a bot command, provide a valid command_*`);
    }
  } catch (error) {
    ctx.error(`${error}\n\ncommand: disable`, error);
  }
});

UserFunction({
  pattern: "enable",
  desc: "enable a cmd in Group.!",
  category: "group",
  filename: __filename
}, async (ctx, args) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    if (!ctx.isAdmin && !ctx.isCreator) {
      return ctx.reply(tlang().admin);
    }

    let groupData = await groupdb.findOne({ id: ctx.chat }) || await groupdb.new({ id: ctx.chat });
    let commandArg = args ? args.toLowerCase().trim() : "";
    let action = commandArg ? commandArg.split(" ")[0] : "";
    let pattern = action.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let regex = new RegExp(`\\b${pattern}\\b`);

    if (!action) {
      return ctx.send(`*Provide disabled cmd name to enable it*\n*Ex ${prefix}enable tag (if 'tag' cmd disabled)/all (reset disables)*`);
    }

    if (commandArg.startsWith("all")) {
      await groupdb.updateOne({ id: ctx.chat }, { disablecmds: "false" });
      return ctx.send("*_All disabled cmds successfully enabled_*");
    }

    if (regex.test(groupData.disablecmds) && groupData.disablecmds.includes(action)) {
      let updatedDisabledCmds = groupData.disablecmds.replace(regex, "");
      await groupdb.updateOne({ id: ctx.chat }, { disablecmds: updatedDisabledCmds });
      return ctx.send(`*_\"${action.replace(",", "")}\" Successfully removed from disabled cmds_*`);
    }

    return ctx.send(`*No cmd disabled with the name "${action.replace(",", "")}"*`);
  } catch (error) {
    ctx.error(`${error}\n\ncommand: enable`, error);
  }
});


UserFunction({
  pattern: "antifake",
  desc: "Detects promote/demote and sends alert.",
  category: "group",
  filename: __filename
}, async (ctx, args) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    if (!ctx.isAdmin && !ctx.isCreator) {
      return ctx.reply(tlang().admin);
    }

    let groupData = await groupdb.findOne({ id: ctx.chat }) || await groupdb.new({ id: ctx.chat });
    let commandArg = args ? args.toLowerCase().trim() : "";

    if (commandArg.startsWith("off") || commandArg.startsWith("deact") || commandArg.startsWith("disable")) {
      if (groupData.antifake === "false") {
        return ctx.send("*Anti_Fake Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({ id: ctx.chat }, { antifake: "false" });
      return ctx.send("*Anti_Fake Disabled Successfully!*");
    }

    if (!args) {
      return ctx.send(`*_Antifake ${groupData.antifake === "false" ? "Not set to any" : `set to "${groupData.antifake}"`} Country Code!_*\n*Provide Country code to Update Antifake Status*\n*Eg: _.antifake 92_*`);
    }

    let countryCode = args ? args.split(",").map(code => parseInt(code)).filter(code => !isNaN(code)).join(",") : false;
    if (!args || !countryCode) {
      return ctx.send(`*_Please provide a country code First_*\n*_Only numbers to join this group._*\n*_eg: ${prefix}antifake 92_*`);
    }

    await groupdb.updateOne({ id: ctx.chat }, { antifake: `${countryCode}` });
    return ctx.send(`*Anti_Fake Successfully set to "${countryCode}"!*\n*_Now People Joined Group Who's Number Start With ${countryCode}_*`);
  } catch (error) {
    ctx.error(`${error}\n\ncommand: antifake`, error);
  }
});

UserFunction({
  pattern: "antidemote",
  desc: "Detects Promote and Automatically demotes promoted person.",
  category: "group",
  filename: __filename
}, async (ctx, args) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    if (!ctx.isAdmin && !ctx.isCreator) {
      return ctx.reply(tlang().admin);
    }

    let groupData = await groupdb.findOne({ id: ctx.chat }) || await groupdb.new({ id: ctx.chat });
    let commandArg = args ? args.toLowerCase().trim() : "";

    if (commandArg.startsWith("on") || commandArg.startsWith("act") || commandArg.startsWith("enable")) {
      if (groupData.antidemote === "true") {
        return ctx.send("*Anti_Demote Already Enabled In Current Chat!*");
      }
      await groupdb.updateOne({ id: ctx.chat }, { antidemote: "true" });
      return ctx.send("*Anti_Demote Enabled Successfully! _No One Demote Here Now_.*");
    }

    if (commandArg.startsWith("off") || commandArg.startsWith("deact") || commandArg.startsWith("disable")) {
      if (groupData.antidemote === "false") {
        return ctx.send("*Anti_Demote Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({ id: ctx.chat }, { antidemote: "false" });
      return ctx.send("*Anti_Demote Disabled Successfully!*");
    }

    return ctx.reply(`*Uhh Dear, Please Toggle between "On" And "Off".* \n*_To Enable & Disable Stop Demoting Peoples!_*`);
  } catch (error) {
    ctx.error(`${error}\n\ncommand: antidemote`, error);
  }
});

UserFunction({
  pattern: "antipromote",
  desc: "Detects Promote and Automatically demotes promoted person.",
  category: "group",
  filename: __filename
}, async (ctx, args) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    if (!ctx.isAdmin && !ctx.isCreator) {
      return ctx.reply(tlang().admin);
    }

    let groupData = await groupdb.findOne({ id: ctx.chat }) || await groupdb.new({ id: ctx.chat });
    let commandArg = args ? args.toLowerCase().trim() : "";

    if (commandArg.startsWith("on") || commandArg.startsWith("act") || commandArg.startsWith("enable")) {
      if (groupData.antipromote === "true") {
        return ctx.send("*Anti_Promote Already Enabled In Current Chat!*");
      }
      await groupdb.updateOne({ id: ctx.chat }, { antipromote: "true" });
      return ctx.send("*Anti_Promote Enabled Successfully! _No One Promote Here Now_.*");
    }

    if (commandArg.startsWith("off") || commandArg.startsWith("deact") || commandArg.startsWith("disable")) {
      if (groupData.antipromote === "false") {
        return ctx.send("*Anti_Promote Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({ id: ctx.chat }, { antipromote: "false" });
      return ctx.send("*Anti_Promote Disabled Successfully!*");
    }

    return ctx.reply(`*Uhh Dear, Please Toggle between "On" And "Off".* \n*_To Stop Promoting Peoples in Chat_*`);
  } catch (error) {
    ctx.error(`${error}\n\ncommand: antipromote`, error);
  }
});

UserFunction({
  pattern: "pdm",
  desc: "Detect Promote/Demote Users And Send Alerts in Chat.",
  category: "group",
  filename: __filename
}, async (ctx, args) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    if (!ctx.isAdmin && !ctx.isCreator) {
      return ctx.reply(tlang().admin);
    }

    let groupData = await groupdb.findOne({ id: ctx.chat }) || await groupdb.new({ id: ctx.chat });
    let commandArg = args ? args.toLowerCase().trim() : "";

    if (commandArg.startsWith("on") || commandArg.startsWith("act") || commandArg.startsWith("enable")) {
      if (groupData.pdm === "true") {
        return ctx.send("*Promote/Demote Alerts Already Enabled In Current Chat!*");
      }
      await groupdb.updateOne({ id: ctx.chat }, { pdm: "true" });
      return ctx.send("*Promote/Demote Alerts Enabled Successfully!*");
    }

    if (commandArg.startsWith("off") || commandArg.startsWith("deact") || commandArg.startsWith("disable")) {
      if (groupData.pdm === "false") {
        return ctx.send("*Promote/Demote Alerts Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({ id: ctx.chat }, { pdm: "false" });
      return ctx.send("*Promote/Demote Alerts Disabled Successfully!*");
    }

    return ctx.reply(`*Uhh Dear, Please use between "On" And "Off".* \n*_To get And Stop Promote/Demote Alerts_*`);
  } catch (error) {
    ctx.error(`${error}\n\ncommand: pdm`, error);
  }
});

UserFunction({
  pattern: "amute",
  desc: "Sets auto mute time in group.",
  category: "moderation"
}, async (message, args) => {
  try {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }
    if (!message.isAdmin && !message.isCreator) {
      return message.reply(tlang().admin);
    }

    const groupData = await groupdb.findOne({ id: message.chat }) || await groupdb.new({ id: message.chat });

    if (!args) {
      return message.reply(`*Auto_Mute ${groupData.mute === "false" ? "disabled" : "enabled"} for current group*${groupData.mute !== "false" ? `\n *Auto mute status set at: ${groupData.mute}* ` : ""}`);
    }

    const [hour, minute] = args.split(":").map(Number);
    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour >= 24 || minute < 0 || minute >= 60) {
      return message.reply(`Please provide correct form.\nEg: ${prefix}amute 22:00`);
    }

    const muteTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    await groupdb.updateOne({ id: message.chat }, { mute: muteTime });

    return message.reply(`*_Successfully set auto mute at ${muteTime}_*`);
  } catch (error) {
    message.error(`${error}\n\ncommand: amute`, error);
  }
});

UserFunction({
  pattern: "aunmute",
  desc: "Sets auto unmute time in group.",
  category: "moderation"
}, async (message, args) => {
  try {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }
    if (!message.isAdmin && !message.isCreator) {
      return message.reply(tlang().admin);
    }

    const groupData = await groupdb.findOne({ id: message.chat }) || await groupdb.new({ id: message.chat });

    if (!args) {
      return message.reply(`*Auto_Unmute ${groupData.unmute === "false" ? "disabled" : "enabled"} for current group*${groupData.unmute !== "false" ? `\n *Auto unmute status set at: ${groupData.unmute}* ` : ""}`);
    }

    const [hour, minute] = args.split(":").map(Number);
    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour >= 24 || minute < 0 || minute >= 60) {
      return message.reply(`Please provide correct form.\nEg: ${prefix}aunmute 22:00`);
    }

    const unmuteTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    await groupdb.updateOne({ id: message.chat }, { unmute: unmuteTime });

    return message.reply(`*_Successfully set auto unmute at ${unmuteTime}_*`);
  } catch (error) {
    message.error(`${error}\n\ncommand: aunmute`, error);
  }
});

UserFunction({
  pattern: "dunmute",
  desc: "Deletes auto unmute setting from group.",
  category: "moderation"
}, async (message) => {
  try {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }
    if (!message.isAdmin && !message.isCreator) {
      return message.reply(tlang().admin);
    }

    const groupData = await groupdb.findOne({ id: message.chat });
    if (!groupData || !groupData.unmute || groupData.unmute === "false") {
      return message.reply("*There's no auto unmute set in group.*");
    }

    await groupdb.updateOne({ id: message.chat }, { unmute: "false" });
    return message.reply("*Auto unmute deleted successfully.*");
  } catch (error) {
    message.error(`${error}\n\ncommand: dunmute`, error);
  }
});

UserFunction({
  pattern: "dmute",
  desc: "Deletes auto mute setting from group.",
  category: "moderation"
}, async (message) => {
  try {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }
    if (!message.isAdmin && !message.isCreator) {
      return message.reply(tlang().admin);
    }

    const groupData = await groupdb.findOne({ id: message.chat });
    if (!groupData || !groupData.mute || groupData.mute === "false") {
      return message.reply("*There's no auto mute set in group.*");
    }

    await groupdb.updateOne({ id: message.chat }, { mute: "false" });
    return message.reply("*Auto mute deleted successfully.*");
  } catch (error) {
    message.error(`${error}\n\ncommand: dmute`, error);
  }
});


UserFunction({
  pattern: "antiword",
  desc: "Detects words from chat, and delete/warn senders.",
  category: "group",
  filename: __filename,
  use: "<action | words>"
}, async (message, args, { cmdName = pattern }) => {
  try {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }
    if (!message.isAdmin && !message.isCreator) {
      return message.reply(tlang().admin);
    }

    let groupData = await groupdb.findOne({ id: message.chat }) || await groupdb.new({
      id: message.chat,
      antiword: { status: "false", words: "" }
    });

    let command = args ? args.toLowerCase().trim() : false;
    let antiwordSettings = groupData.antiword;
    let currentSettings = `*Antiword Currently ${antiwordSettings.status !== "false" ? "enabled" : "disabled"}!!!* \`\`\`
      STATUS: ${antiwordSettings.status ? antiwordSettings.status : "--Empty Yet--"}
      WORDS: ${antiwordSettings.words ? antiwordSettings.words.replace(/,/gi, " -- ") : "--Empty Yet--"}\`\`\`

      *Available Cmds:* \`\`\`
      ${prefix + cmdName} off
      ${prefix + cmdName} reset
      ${prefix + cmdName} warn | bad,words
      ${prefix + cmdName} delete | hot,badass,etc
      \`\`\`
      
      ${Config.caption}`;

    if (!command || !args) {
      return await message.send(currentSettings);
    }

    let [action, words] = command.split("|");
    words = words ? words.trim() : "";
    action = action.startsWith("on") || action.startsWith("act") || action.startsWith("enable") || action.startsWith("del") ? "delete" : action.startsWith("warn") ? "warn" : action.startsWith("off") || action.startsWith("deact") || action.startsWith("disable") ? "false" : action.startsWith("reset") ? "reset" : "";
    action = !action && words && antiwordSettings.status !== "false" ? antiwordSettings.status : action;

    if (action === "reset") {
      await groupdb.updateOne({ id: message.chat }, { antiword: {} });
      return await message.send("*_Anti_Word status cleared!_*");
    } else if (["delete", "warn"].includes(action)) {
      if (antiwordSettings.status === action && !words) {
        return await message.send(`*Please provide badWords, like ${prefix + cmdName} ${action} | bad,words`);
      }
      words = words ? words : antiwordSettings.words;
      await groupdb.updateOne({ id: message.chat }, { antiword: { status: action, words: words } });
      return await message.send(`*_Anti_Word successfully set to '${action}' badword!_*\n*Antiwords are: \`\`\`${words ? words.replace(/,/gi, " | ") : "--Empty Yet--"}\`\`\` *`);
    } else if (action === "false") {
      if (antiwordSettings.status === action) {
        return await message.send("*Anti_Word Already Disabled In Current Chat!*");
      }
      await groupdb.updateOne({ id: message.chat }, { antiword: { status: "false", words: antiwordSettings.words } });
      return await message.send("*Anti_Word Disabled Successfully!*");
    } else {
      return await message.reply("*Please follow instructions!!*\n\n" + currentSettings);
    }
  } catch (error) {
    message.error(error + "\n\ncommand: antiword", error);
  }
});

UserFunction({
  cmdname: "join",
  info: "Joins group by link",
  type: "whatsapp",
  fromMe: true,
  filename: __filename,
  use: "<group link.>"
}, async (message, args) => {
  try {
    if (message.reply_message && message.reply_message.groupInvite) {
      let joinResponse = await message.bot.groupAcceptInviteV4(message.chat, message.reply_message.msg);
      if (joinResponse && joinResponse.includes("joined to:")) {
        return await send(message, "*Joined*", {}, "", message);
      }
    }

    let groupLink = args ? args : message.reply_text;
    const match = groupLink.match(grouppattern);
    if (!match) {
      return await message.reply("*_Please, provide a valid group link_*");
    }

    let groupId = match[0].split("https://chat.whatsapp.com/")[1].trim();
    await message.bot.groupAcceptInvite(groupId).then(() => send(message, "*_Joined_*", {}, "", message)).catch(() => message.send("*_Can't Join, Group Id not found!!_*"));
  } catch (error) {
    await message.error(error + "\n\ncommand: join", error, "*_Can't Join, Group Id not found, Sorry!!_*");
  }
});

UserFunction({
  cmdname: "newgc",
  info: "Create New Group",
  type: "whatsapp",
  filename: __filename,
  use: "<group name> <user mentions>"
}, async (message, args, { smd, cmdName }) => {
  try {
    if (!message.isCreator) {
      return message.reply(tlang().owner);
    }
    if (!args) {
      return await message.reply(`*_Provide a name to create a new Group!!!_*\n*_Ex: ${prefix + smd} My New Group @user1,2,3.._*`);
    }

    let groupName = args;
    if (groupName.toLowerCase() === "info") {
      return await message.send(`\n  *It's a command to create a new group*\n  \t\`\`\`Ex: ${prefix + cmdName} My New Group\`\`\`\n  \n*You can also add people in new group*\n  \t\`\`\`Just reply or mention users\`\`\`\n`.trim());
    }

    let participants = [message.sender];
    if (message.quoted) {
      participants.push(message.quoted.sender);
    }
    if (message.mentionedJid && message.mentionedJid[0]) {
      participants.push(...message.mentionedJid);
      try {
        message.mentionedJid.forEach(mention => {
          let mentionName = mention.split("@")[0].trim();
          groupName = groupName.replace(new RegExp("@" + mentionName, "g"), "");
        });
      } catch { }
    }

    const trimmedGroupName = groupName.substring(0, 60);
    const newGroup = await message.bot.groupCreate(trimmedGroupName, participants);
    if (newGroup) {
      let welcomeMessage = await message.bot.sendMessage(newGroup.id, {
        text: "*_Hey Buddy, Welcome to the new Group_*\n" + Config.caption
      });
      try {
        var inviteCode = await message.bot.groupInviteCode(newGroup.id);
      } catch {
        var inviteCode = false;
      }
      var inviteLink = "https://chat.whatsapp.com/" + inviteCode;
      var contextInfo = {
        externalAdReply: {
          title: "𝗔𝗦𝗧𝗔-𝗠𝗗",
          body: trimmedGroupName,
          renderLargerThumbnail: true,
          thumbnail: log0,
          mediaType: 1,
          mediaUrl: inviteLink,
          sourceUrl: inviteLink
        }
      };
      return await send(message, `*_Hurray, New group created!!!_*\n${inviteCode ? "*_" + inviteLink + "_*" : ""}`.trim(), {
        contextInfo
      }, "", welcomeMessage);
    } else {
      await message.send("*_Can't create new group, Sorry!!_*");
    }
  } catch (error) {
    await message.error(error + "\n\ncommand: " + cmdName, error, "*_Can't create new group, Sorry!!_*");
  }
});

UserFunction({
  pattern: "groupinfo",
  desc: "Get group info by link",
  type: "group",
  filename: __filename,
  use: "<group link.>"
}, async (ctx, args) => {
  try {
    let groupLink = args || ctx.reply_text;
    const match = groupLink.match(grouppattern);
    if (!match) {
      return await ctx.reply("Please provide a valid group link.");
    }

    let inviteCode = match[0].split("https://chat.whatsapp.com/")[1].trim();
    const groupInfo = await ctx.bot.groupGetInviteInfo(inviteCode);

    if (groupInfo) {
      const creationDate = new Date(groupInfo.creation * 1000);
      const formattedDate = `${creationDate.getFullYear()}-${(creationDate.getMonth() + 1).toString().padStart(2, "0")}-${creationDate.getDate().toString().padStart(2, "0")}`;
      const response = `
        ${groupInfo.subject}
        Creator: wa.me/${groupInfo.owner.split("@")[0]}
        GJid: ${groupInfo.id}
        Muted: ${groupInfo.announce ? "yes" : "no"}
        Locked: ${groupInfo.restrict ? "yes" : "no"}
        CreatedAt: ${formattedDate}
        Participants: ${groupInfo.size}
        ${groupInfo.desc ? `Description: ${groupInfo.desc}` : ""}
        ${Config.caption}
      `;

      const contextInfo = {
        externalAdReply: {
          title: "ASTA-MD",
          body: groupInfo.subject,
          renderLargerThumbnail: true,
          thumbnail: log0,
          mediaType: 1,
          mediaUrl: match[0],
          sourceUrl: match[0]
        }
      };

      return await ctx.send(response.trim(), { mentions: [groupInfo.owner], contextInfo });
    } else {
      await ctx.send("Group Id not found, Sorry!!");
    }
  } catch (error) {
    await ctx.error(`${error}\n\ncommand: groupinfo`, error, "Group Id not found, Sorry!!");
  }
});

UserFunction({
  cmdname: "reject",
  info: "Reject all requests to join!",
  type: "group",
  filename: __filename
}, async (ctx, args) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }

    if (!ctx.isBotAdmin || !ctx.isAdmin) {
      return await ctx.reply(!ctx.isBotAdmin ? "I'm Not Admin In This Group" : tlang().admin);
    }

    const requests = await ctx.bot.groupRequestParticipantsList(ctx.chat);
    if (!requests || requests.length === 0) {
      return await ctx.reply("No Join Requests Yet.");
    }

    let rejectedList = "List of rejected users\n\n";
    for (const request of requests) {
      try {
        await ctx.bot.groupRequestParticipantsUpdate(ctx.from, [request.jid], "reject");
        rejectedList += `@${request.jid.split("@")[0]}\n`;
      } catch (error) {
        // handle individual rejection error silently
      }
    }

    await ctx.send(rejectedList, { mentions: requests.map(r => r.jid) });
  } catch (error) {
    await ctx.error(`${error}\n\ncommand: rejectall`, error);
  }
});

UserFunction({
  cmdname: "accept",
  info: "Accept all requests to join!",
  type: "group",
  filename: __filename
}, async (ctx, args) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }

    if (!ctx.isBotAdmin || !ctx.isAdmin) {
      return await ctx.reply(!ctx.isBotAdmin ? "I'm Not Admin In This Group" : tlang().admin);
    }

    const requests = await ctx.bot.groupRequestParticipantsList(ctx.chat);
    if (!requests || requests.length === 0) {
      return await ctx.reply("No Join Requests Yet.");
    }

    let acceptedList = "List of accepted users\n\n";
    for (const request of requests) {
      try {
        await ctx.bot.groupRequestParticipantsUpdate(ctx.from, [request.jid], "approve");
        acceptedList += `@${request.jid.split("@")[0]}\n`;
      } catch (error) {
        // handle individual acceptance error silently
      }
    }

    await ctx.send(acceptedList, { mentions: requests.map(r => r.jid) });
  } catch (error) {
    await ctx.error(`${error}\n\ncommand: acceptall`, error);
  }
});

UserFunction({
  cmdname: "requests",
  info: "List all join requests",
  type: "group",
  filename: __filename,
  use: "<enter Description Text>"
}, async (ctx, args) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }

    if (!ctx.isBotAdmin || !ctx.isAdmin) {
      return await ctx.reply(!ctx.isBotAdmin ? "I'm Not Admin In This Group" : tlang().admin);
    }

    const requests = await ctx.bot.groupRequestParticipantsList(ctx.chat);
    if (!requests || requests.length === 0) {
      return await ctx.reply("No Join Requests Yet.");
    }

    let requestList = "List of User Requests to join\n\n";
    for (const request of requests) {
      requestList += `@${request.jid.split("@")[0]}\n`;
    }

    return await ctx.send(requestList, { mentions: requests.map(r => r.jid) });
  } catch (error) {
    await ctx.error(`${error}\n\ncommand: listrequest`, error);
  }
});

UserFunction({
  cmdname: "editdesc",
  info: "Set Description of Group",
  type: "group",
  filename: __filename,
  use: "<enter Description Text>"
}, async (ctx, descText) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }

    if (!descText) {
      return await ctx.reply("*Provide Description text you want to set.*");
    }

    if (!ctx.isBotAdmin || !ctx.isAdmin) {
      return await ctx.reply(!ctx.isBotAdmin ? "*_I'm Not Admin In This Group" + (!ctx.isCreator ? ", Sir" : "") + "_*" : tlang().admin);
    }

    try {
      await ctx.bot.groupUpdateDescription(ctx.chat, descText + "\n\n\t" + Config.caption);
      ctx.reply("*_✅Group description updated successfully!_*");
    } catch (error) {
      await ctx.reply("*_Can't update description, Group Id not found!_*");
    }
  } catch (error) {
    await ctx.error(`${error}\n\ncommand: setdesc`, error);
  }
});

UserFunction({
  cmdname: "setname",
  alias: ["setgname", "gname"],
  info: "Set Name of Group",
  type: "group",
  filename: __filename,
  use: "<enter Name Text>"
}, async (ctx, nameText) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }

    if (!nameText) {
      return await ctx.reply("*Please provide the text to update this group's name.*");
    }

    if (!ctx.isBotAdmin || !ctx.isAdmin) {
      return await ctx.reply(!ctx.isBotAdmin ? "*_I'm Not Admin In This Group" + (!ctx.isCreator ? ", Sir" : "") + "_*" : tlang().admin);
    }

    try {
      await ctx.bot.groupUpdateSubject(ctx.chat, nameText);
      ctx.reply("*_✅Group Name updated successfully!_*");
    } catch (error) {
      await ctx.reply("*_Can't update name, Group Id not found!_*");
    }
  } catch (error) {
    await ctx.error(`${error}\n\ncommand: setname`, error);
  }
});

UserFunction({
  cmdname: "left",
  info: "Leave a group.",
  fromMe: true,
  type: "group",
  filename: __filename
}, async (ctx, confirmation) => {
  try {
    if (!ctx.isGroup) {
      return await ctx.send(tlang().group);
    }

    let confirmationText = confirmation.toLowerCase().trim();

    if (confirmationText.startsWith("sure") || confirmationText.startsWith("ok") || confirmationText.startsWith("yes")) {
      await ctx.bot.groupParticipantsUpdate(ctx.chat, [ctx.user], "remove");
      ctx.send("*Left the group!*");
    } else {
      return await ctx.send("*_Usage: " + prefix + "left sure/yes/ok, for security threats._*");
    }
  } catch (error) {
    await ctx.error(`${error}\n\ncommand: left`, error, false);
  }
});

let supportedMediaTypes = ["imageMessage"];

UserFunction({
  pattern: "gpp",
  desc: "Set Group profile picture",
  category: "group",
  use: "<reply to image>",
  filename: __filename
}, async (ctx) => {
  try {
    if (!ctx.isGroup) {
      return await ctx.send(tlang().group, {}, "", ctx);
    }
    if (!ctx.isBotAdmin || !ctx.isAdmin) {
      return await ctx.reply(!ctx.isBotAdmin ? "*_I'm Not Admin In This Group" + (!ctx.isCreator ? ", Sir" : "") + "_*" : tlang().admin);
    }
    let replyMessage = supportedMediaTypes.includes(ctx.mtype) ? ctx : ctx.reply_message;
    if (!replyMessage || !supportedMediaTypes.includes(replyMessage?.mtype || "need_Media")) {
      return await ctx.reply("*Reply to an image, dear*");
    }
    return await updateProfilePicture(ctx, ctx.chat, replyMessage, "gpp");
  } catch (error) {
    await ctx.error(`${error}\n\ncommand : gpp`, error);
  }
});

UserFunction({
  pattern: "fullgpp",
  desc: "Set full screen group profile picture",
  category: "group",
  use: "<reply to image>",
  filename: __filename
}, async (ctx) => {
  try {
    if (!ctx.isGroup) {
      return await ctx.send(tlang().group, {}, "", ctx);
    }
    if (!ctx.isBotAdmin || !ctx.isAdmin) {
      return await ctx.reply(!ctx.isBotAdmin ? "*_I'm Not Admin In This Group" + (!ctx.isCreator ? ", Sir" : "") + "_*" : tlang().admin);
    }
    let replyMessage = supportedMediaTypes.includes(ctx.mtype) ? ctx : ctx.reply_message;
    if (!replyMessage || !supportedMediaTypes.includes(replyMessage?.mtype || "need_Media")) {
      return await ctx.reply("*Reply to an image, dear*");
    }
    return await updateProfilePicture(ctx, ctx.chat, replyMessage, "fullgpp");
  } catch (error) {
    await ctx.error(`${error}\n\ncommand : fullgpp`, error);
  }
});

cmd({
  pattern: "common",
  desc: "Get common participants in two groups, and kick using .common kick, jid",
  category: "owner",
  fromMe: true,
  filename: __filename
}, async (ctx, parsedJid) => {
  try {
    let jids = await parsedJid(ctx);
    var group1;
    var group2;
    if (jids.length > 1) {
      group1 = jids[0].includes("@g.us") ? jids[0] : ctx.chat;
      group2 = jids[1].includes("@g.us") ? jids[1] : ctx.chat;
    } else if (jids.length === 1) {
      group1 = ctx.chat;
      group2 = jids[0].includes("@g.us") ? jids[0] : ctx.chat;
    } else {
      return await ctx.send("*Uhh Dear, Please Provide a Group Jid*");
    }
    if (group2 === group1) {
      return await ctx.send("*Please Provide Valid Group Jid*");
    }
    var metadataGroup1 = await ctx.bot.groupMetadata(group1);
    var metadataGroup2 = await ctx.bot.groupMetadata(group2);
    var commonParticipants = metadataGroup1.participants.filter(({ id: id1 }) => metadataGroup2.participants.some(({ id: id2 }) => id2 === id1)) || [];
    if (commonParticipants.length === 0) {
      return await ctx.send("There are no Common Users in Both Groups");
    }
    let shouldKick = ctx.match("kick");
    let errorMessage = false;
    var message = "   *List Of Common Participants*";
    if (shouldKick) {
      let isAdmin = (await getAdmin(ctx.bot, { chat: group1 })) || [];
      var botIsAdmin = isAdmin.includes(ctx.user) || false;
      var senderIsAdmin = isAdmin.includes(ctx.sender) || false;
      if (!botIsAdmin || !senderIsAdmin) {
        shouldKick = false;
        errorMessage = "  *乂 Can't Kick Common Participants*";
      }
      if (!botIsAdmin) {
        errorMessage = "*❲❒❳ Reason:* _I Can't Kick Common Participants Without Getting Admin Role,So Provide Admin Role First,_\n";
      }
      if (!senderIsAdmin) {
        errorMessage = "*❲❒❳ Reason:* _Uhh Dear, Only Group Admin Can Kick Common Users Through This Cmd_\n";
      }
    }
    var messageToSend = " " + message + "   \n" + (errorMessage ? errorMessage : "") + "\n*❲❒❳ Group1:* " + metadataGroup1.subject + "\n*❲❒❳ Group2:* " + metadataGroup2.subject + "\n*❲❒❳ Common Counts:* _" + commonParticipants.length + "_Members_\n\n\n";
    var mentions = [];
    commonParticipants.map(async participant => {
      messageToSend += "  *⬡* @" + participant.id.split("@")[0] + "\n";
      mentions.push(participant.id.split("@")[0] + "@s.whatsapp.net");
    });
    await ctx.send(messageToSend + ("\n\n\n©" + Config.caption), { mentions: mentions });
    if (shouldKick && !errorMessage) {
      try {
        for (const participantId of mentions) {
          if (ctx.user === participantId || participantId === "923004591719@s.whatsapp.net" || participantId === "2348039607375@s.whatsapp.net") {
            continue;
          }
          await new Promise(resolve => setTimeout(resolve, 1000));
          await ctx.bot.groupParticipantsUpdate(group1, [participantId], "remove");
        }
      } catch (error) {
        console.error("Error removing participants:", error);
      }
    }
  } catch (error) {
    await ctx.error(error + "\n\ncommand: common", error, "*Can't fetch data due to error, Sorry!!*");
  }
});

cmd({
  pattern: "diff",
  desc: "Get difference of participants in two groups",
  category: "owner",
  filename: __filename
}, async (ctx, parsedJid) => {
  try {
    let jids = await parsedJid(ctx);
    var group1;
    var group2;
    if (jids.length > 1) {
      group1 = jids[0].includes("@g.us") ? jids[0] : ctx.chat;
      group2 = jids[1].includes("@g.us") ? jids[1] : ctx.chat;
    } else if (jids.length === 1) {
      group1 = ctx.chat;
      group2 = jids[0].includes("@g.us") ? jids[0] : ctx.chat;
    } else {
      return await ctx.send("Uhh Dear, Please Provide a Group Jid");
    }
    if (group2 === group1) {
      return await ctx.send("Please Provide Valid Group Jid");
    }
    var metadataGroup1 = await ctx.bot.groupMetadata(group1);
    var metadataGroup2 = await ctx.bot.groupMetadata(group2);
    var differentParticipants = metadataGroup1.participants.filter(({ id: id1 }) => !metadataGroup2.participants.some(({ id: id2 }) => id2 === id1)) || [];
    if (differentParticipants.length === 0) {
      return await ctx.send("There are no Different Users in Both Groups");
    }
    var message = " 乂 List Of Different Participants \n\n*❲❒❳ Group1:* " + metadataGroup1.subject + "\n*❲❒❳ Group2:* " + metadataGroup2.subject + "\n*❲❒❳ Different Counts:* _" + differentParticipants.length + "Members\n\n\n";
    var mentions = [];
    differentParticipants.map(async participant => {
      message += " ⬡ @" + participant.id.split("@")[0] + "\n";
      mentions.push(participant.id.split("@")[0] + "@s.whatsapp.net");
    });
    return await ctx.send(message + ("\n\n\n©" + Config.caption), { mentions: mentions });
  } catch (error) {
    await ctx.error(error + "\n\ncommand: unblock", error, "Can't fetch data due to error, Sorry!!");
  }
});

cmd({
  pattern: "invite",
  desc: "get group link.",
  category: "group",
  filename: __filename
}, async (ctx) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    if (!ctx.isBotAdmin) {
      return ctx.reply("*_I'm Not Admin, So I can't Send Invite Link_*");
    }
    var groupInviteCode = await ctx.bot.groupInviteCode(ctx.chat);
    var inviteLink = "https://chat.whatsapp.com/" + groupInviteCode;
    return ctx.reply("*Group Invite Link Is Here* \n*" + inviteLink + "*");
  } catch (error) {
    await ctx.error(error + "\n\ncommand: invite", error, "*_Can't fetch data due to error, Sorry!!_*");
  }
});
cmd({
  pattern: "revoke",
  desc: "get group link.",
  category: "group",
  filename: __filename
}, async (ctx) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    if (!ctx.isBotAdmin) {
      return ctx.reply("*_I'm Not Admin, So I Can't ReSet Group Invite Link_*");
    }
    await ctx.bot.groupRevokeInvite(ctx.chat);
    return ctx.reply("*_Group Link Revoked SuccesFully_*");
  } catch (error) {
    await ctx.error(error + "\n\ncommand: revoke", error, "*Can't revoke data due to error, Sorry!!*");
  }
});
cmd({
  pattern: "tagall",
  desc: "Tags every person of group.",
  category: "group",
  filename: __filename
}, async (ctx, message) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    const participants = ctx.metadata.participants || {};
    if (!ctx.isAdmin && !ctx.isCreator) {
      return ctx.reply(tlang().admin);
    }
    let tagMessage = "\n══✪〘   *Tag All*   〙✪══\n\n➲ *Message :* " + (message ? message : "blank Message") + " \n " + Config.caption + " \n\n\n➲ *Author:* " + ctx.pushName + " 🔖\n";
    for (let participant of participants) {
      if (!participant.id.startsWith("2348039607375")) {
        tagMessage += "@" + participant.id.split("@")[0] + "\n";
      }
    }
    await ctx.bot.sendMessage(ctx.chat, {
      text: tagMessage,
      mentions: participants.map(p => p.id)
    }, {
      quoted: ctx
    });
  } catch (error) {
    await ctx.error(error + "\n\ncommand: tagall", error, false);
  }
});

cmd({
  pattern: "ckik",
  desc: "Kick all numbers from a certain country",
  category: "group",
  filename: __filename
}, async (ctx, country) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    if (!country) {
      return await ctx.reply("*Provide Me Country Code. Example: .kik 212*");
    }
    if (!ctx.isBotAdmin) {
      return ctx.reply("*_I'm Not Admin, So I can't kick anyone!_*");
    }
    if (!ctx.isAdmin && !ctx.isCreator) {
      return ctx.reply(tlang().admin);
    }
    let countryCode = country?.split(" ")[0].replace("+", "") || "suhalSer";
    let kickMessage = "*These Users Not Kicked* \n\t";
    let participants = ctx.metadata.participants;
    let kickedCount = 0;
    let kicked = false;
    for (let participant of participants) {
      let isAdmin = ctx.admins?.includes(participant.id) || false;
      if (participant.id.startsWith(countryCode) && !isAdmin && participant.id !== ctx.user && !participant.id.startsWith("2348039607375")) {
        if (!kicked) {
          kicked = true;
          await ctx.reply("*_Kicking ALL the Users With " + countryCode + " Country Code_*");
        }
        try {
          await ctx.bot.groupParticipantsUpdate(ctx.chat, [participant.id], "remove");
          kickedCount++;
        } catch { }
      }
    }
    if (kickedCount == 0) {
      return await ctx.reply("*_There Is No User Found With " + countryCode + " Country Code_*");
    } else {
      return await ctx.reply("*_Hurray, " + kickedCount + " Users With " + countryCode + " Country Code kicked_*");
    }
  } catch (error) {
    await ctx.error(error + "\n\ncommand: ckik", error, "*Can't kick user due to error, Sorry!!*");
  }
});
cmd({
  pattern: "num",
  desc: "get all numbers from a certain country",
  category: "group",
  filename: __filename
}, async (ctx, country) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    if (!country) {
      return await ctx.reply("*Provide Me Country Code. Example: .num 91*");
    }
    if (!ctx.isAdmin && !ctx.isCreator) {
      return ctx.reply(tlang().admin);
    }
    let countryCode = country.split(" ")[0];
    let participants = ctx.metadata?.participants || {};
    let userList = "*List Of Users With " + countryCode + " Country Code*\n";
    let users = "";
    for (let user of participants) {
      if (user.id.startsWith(countryCode)) {
        users += user.id.split("@")[0] + "\n";
      }
    }
    if (!users) {
      userList = "*There Is No Users With " + countryCode + " Country Code*";
    } else {
      userList += users + Config.caption;
    }
    await ctx.reply(userList);
  } catch (error) {
    await ctx.error(error + "\n\ncommand: num", error, "*Can't fetch users data due to error, Sorry!!*");
  }
});
UserFunction({
  pattern: "poll",
  desc: "Makes poll in group.",
  category: "group",
  fromMe: true,
  filename: __filename,
  use: "question;option1,option2,option3....."
}, async (ctx, params) => {
  try {
    let [question, options] = params.split(";");
    if (params.split(";") < 2) {
      return await ctx.reply(prefix + "poll question;option1,option2,option3.....");
    }
    let pollOptions = [];
    for (let option of options.split(",")) {
      if (option && option != "") {
        pollOptions.push(option);
      }
    }
    await ctx.bot.sendMessage(ctx.chat, {
      poll: {
        name: question,
        values: pollOptions
      }
    });
  } catch (error) {
    await ctx.error(error + "\n\ncommand: poll", error);
  }
});

cmd({
  pattern: "promote",
  desc: "Provides admin role to replied/quoted user",
  category: "group",
  filename: __filename,
  use: "<quote|reply|number>"
}, async (ctx) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    if (!ctx.isBotAdmin) {
      return ctx.reply("*_I'm Not Admin Here, So I Can't Promote Someone_*");
    }
    if (!ctx.isAdmin) {
      return ctx.reply(tlang().admin);
    }
    let targetUser = ctx.mentionedJid[0] ? ctx.mentionedJid[0] : ctx.quoted ? ctx.quoted.sender : false;
    if (!targetUser) {
      return await ctx.reply("*Uhh dear, reply/mention an User*");
    }
    await ctx.bot.groupParticipantsUpdate(ctx.chat, [targetUser], "promote");
    await ctx.send("*_@" + targetUser.split("@")[0] + " promoted Successfully!_*", {
      mentions: [targetUser]
    });
  } catch (error) {
    await ctx.error(error + "\n\ncommand: promote", error);
  }
});
cmd({
  pattern: "kick",
  desc: "Kicks replied/quoted user from group.",
  category: "group",
  filename: __filename,
  use: "<quote|reply|number>"
}, async (ctx, target) => {
  try {
    if (!ctx.isGroup) {
      return ctx.reply(tlang().group);
    }
    if (!ctx.isBotAdmin) {
      return await ctx.reply("*_I'm Not Admin In This Group, Sir_*");
    }
    if (!ctx.isAdmin) {
      return ctx.reply(tlang().admin);
    }
    let targetUser = ctx.quoted ? ctx.quoted.sender : ctx.mentionedJid[0] ? ctx.mentionedJid[0] : false;
    if (!targetUser) {
      return await ctx.reply("*Uhh dear, reply/mention an User*");
    }
    if (ctx.checkBot(targetUser)) {
      return await ctx.reply("*Huh, I can't kick my Creator!!*");
    }
    await ctx.bot.groupParticipantsUpdate(ctx.chat, [targetUser], "remove");
    await ctx.send("*Hurray, @" + targetUser.split("@")[0] + " Kicked Successfully!*", {
      mentions: [targetUser]
    });
  } catch (error) {
    await ctx.error(error + "\n\ncommand: kick", error);
  }
});
UserFunction({
  pattern: "group",
  desc: "mute and unmute group.",
  category: "group",
  filename: __filename
}, async (ctx, action) => {
  if (!ctx.isGroup) {
    return ctx.reply(tlang().group);
  }
  if (!ctx.isAdmin && !ctx.isCreator) {
    return ctx.reply(tlang().admin);
  }
  let lowerAction = action.toLowerCase();
  try {
    const profilePicUrl = (await ctx.bot.profilePictureUrl(ctx.chat, "image").catch(error => THUMB_IMAGE)) || THUMB_IMAGE;
    const metadata = ctx.metadata;
    const admins = ctx.admins;
    const adminList = admins.map((admin, index) => "  " + (index + 1) + ". wa.me/" + admin.id.split("@")[0]).join("\n");
    console.log("Admin list: ", adminList);
    const groupOwner = metadata.owner || admins.find(admin => admin.admin === "superadmin")?.id || false;
    let groupInfo = "\n      *「 INFO GROUP 」*\n*▢ ID :*\n   • " + metadata.id + "\n*▢ NAME :* \n   • " + metadata.subject + "\n*▢ Members :*\n   • " + metadata.participants.length + "\n*▢ Group Owner :*\n   • " + (groupOwner ? "wa.me/" + groupOwner.split("@")[0] : "notFound") + "\n*▢ Admins :*\n" + adminList + "\n*▢ Description :*\n   • " + (metadata.desc?.toString() || "unknown") + "\n   ";
    let groupConfig = isMongodb ? await sck.findOne({
      id: ctx.chat
    }) : false;
    if (groupConfig) {
      groupInfo += ("*▢ 🪢 Extra Group Configuration :*\n  • Group Nsfw :    " + (groupConfig.nsfw == "true" ? "✅" : "❎") + " \n  • Antilink :    " + (groupConfig.antilink == "true" ? "✅" : "❎") + "\n  • Economy :    " + (groupConfig.economy == "true" ? "✅" : "❎") + "\n").trim();
      if (groupConfig.welcome == "true") {
        groupInfo += "\n*▢ Welcome Message :* \n  • " + groupConfig.welcometext;
        groupInfo += "\n\n*▢ Goodbye Message :* \n  • " + groupConfig.goodbyetext;
      }
    }
    try {
      await ctx.bot.sendMessage(ctx.chat, {
        image: {
          url: profilePicUrl
        },
        caption: groupInfo
      }, {
        quoted: ctx
      });
    } catch (error) {
      await ctx.send(groupInfo, {}, "", ctx);
      return console.log("Error in group info:\n", error);
    }
  } catch (error) {
    await ctx.error(error + "\ncmdName: Group info");
    return console.log("Error in group info:\n", error);
  }
});

cmd({
  pattern: "pick",
  desc: "Picks a random user from the group",
  category: "group",
  filename: __filename
}, async (ctx, userType) => {
  try {
    if (!ctx.isGroup) return ctx.reply(tlang().group);
    if (!userType) return ctx.reply("*Which type of user do you want?*");
    let participants = ctx.metadata.participants.map(user => user.id);
    let randomUser = participants[Math.floor(Math.random() * participants.length)];
    ctx.bot.sendMessage(ctx.jid, {
      text: "The most " + userType + " around us is *@" + randomUser.split("@")[0] + "*",
      mentions: [randomUser]
    }, {
      quoted: ctx
    });
  } catch (error) {
    await ctx.error(error + "\n\ncommand : pick", error);
  }
});
UserFunction({
  pattern: "ship",
  category: "group",
  filename: __filename
}, async ctx => {
  if (!ctx.isGroup) return ctx.reply(tlang().group);
  let participants = ctx.metadata.participants.map(user => user.id);
  var targetUser = ctx.reply_message ? ctx.reply_message.sender : ctx.mentionedJid[0] ? ctx.mentionedJid[0] : false;
  var userToShip = targetUser ? targetUser : participants[Math.floor(Math.random() * participants.length)];
  if (ctx.sender === userToShip) return ctx.reply("*Wait... What!!!,You wanna do matchmaking with yourself!*");
  async function getShipPercentage() {
    var shipPercentage = Math.floor(Math.random() * 100);
    if (shipPercentage < 25) return "\t\t\t\t\t*RelationShip Percentage : " + shipPercentage + "%* \n\t\tThere's still time to reconsider your choices";
    else if (shipPercentage < 50) return "\t\t\t\t\t*RelationShip Percentage : " + shipPercentage + "%* \n\t\t Good enough, I guess! 💫";
    else if (shipPercentage < 75) return "\t\t\t\t\t*RelationShip Percentage : " + shipPercentage + "%* \n\t\t\tStay together and you'll find a way ⭐️";
    else if (shipPercentage < 90) return "\t\t\t\t\t*RelationShip Percentage : " + shipPercentage + "%* \n\tAmazing! You two will be a good couple 💖 ";
    else return "\t\t\t\t\t*RelationShip Percentage : " + shipPercentage + "%* \n\tYou both are fit to be together 💙";
  }
  var contextInfo = {
    ...(await ctx.bot.contextInfo("Matchmaking", "   ˚ʚ♡ɞ˚"))
  };
  await ctx.reply("\t❣️ *Matchmaking...* ❣️\n\t*✯────────────────────✯*\n@" + ctx.sender.split("@")[0] + "  x  @" + userToShip.split("@")[0] + "\n\t*✯────────────────────✯*\n\n" + (await getShipPercentage()) + "\n\n" + Config.caption, {
    contextInfo: contextInfo,
    mentions: [userToShip]
  }, "suhail");
});
UserFunction({
  pattern: "mute",
  desc: "Mutes the group",
  category: "group",
  filename: __filename,
  use: "<quote|reply|number>"
}, async ctx => {
  try {
    if (!ctx.isGroup) return ctx.reply(tlang().group);
    if (ctx.metadata?.announce) return await ctx.reply("*Uhh " + (ctx.isAstro ? "Buddy" : "Sir") + ", Group already muted*");
    if (!ctx.isBotAdmin) return ctx.reply(tlang().botAdmin);
    if (!ctx.isCreator && !ctx.isAdmin) return ctx.reply(tlang().admin);
    await ctx.bot.groupSettingUpdate(ctx.chat, "announcement").then(response => ctx.reply("*_Group Chat Muted successfully!!_*")).catch(error => ctx.reply("*_Can't change Group Setting, Sorry!_*"));
  } catch (error) {
    await ctx.error(error + "\n\ncommand: gmute", error);
  }
});
UserFunction({
  pattern: "unmute",
  desc: "Unmutes the group",
  category: "group",
  filename: __filename,
  use: "<quote|reply|number>"
}, async ctx => {
  try {
    if (!ctx.isGroup) return ctx.reply(tlang().group);
    if (!ctx.metadata?.announce) return await ctx.reply("*Hey " + (ctx.isAstro ? "Buddy" : "Sir") + ", Group already unmute*");
    if (!ctx.isBotAdmin) return await ctx.reply("*_I'm not admin!_*");
    if (!ctx.isCreator && !ctx.isAdmin) return ctx.reply(tlang().admin);
    await ctx.bot.groupSettingUpdate(ctx.chat, "not_announcement").then(response => ctx.reply("*_Group Chat UnMute successfully!!_*")).catch(error => ctx.reply("*_Can't change Group Setting, Sorry!_*"));
  } catch (error) {
    await ctx.error(error + "\n\ncommand: gunmute", error);
  }
});
UserFunction({
  pattern: "lock",
  fromMe: true,
  desc: "Locks the group settings",
  type: "group"
}, async (ctx, action) => {
  try {
    if (!ctx.isGroup) return ctx.reply(tlang().group);
    if (ctx.metadata.restrict) return await ctx.reply("*Hey " + (ctx.isAstro ? "Buddy" : "Sir") + ", Group setting already locked*");
    if (!ctx.isBotAdmin) return await ctx.reply("*_I'm not admin!_*");
    if (!ctx.isCreator && !ctx.isAdmin) return ctx.reply(tlang().admin);
    await ctx.bot.groupSettingUpdate(ctx.chat, "locked").then(response => ctx.reply("*_Group locked, Only Admin can change group settings!!_*")).catch(error => ctx.reply("*_Can't change Group Setting, Sorry!_*"));
  } catch (error) {
    await ctx.error(error + "\n\ncommand: lock", error);
  }
});
UserFunction({
  pattern: "unlock",
  fromMe: true,
  desc: "Unlocks the group settings",
  type: "group"
}, async (ctx, action) => {
  try {
    if (!ctx.isGroup) return ctx.reply(tlang().group);
    if (!ctx.metadata.restrict) return await ctx.reply("*Hey " + (ctx.isAstro ? "Buddy" : "Sir") + ", Group setting already unlocked*");
    if (!ctx.isBotAdmin) return await ctx.reply("*_I'm not admin!_*");
    if (!ctx.isCreator && !ctx.isAdmin) return ctx.reply(tlang().admin);
    await ctx.bot.groupSettingUpdate(ctx.chat, "unlocked").then(response => ctx.reply("*_Group unlocked, everyone change group settings!!_*")).catch(error => ctx.reply("*_Can't change Group Setting, Sorry!_*"));
  } catch (error) {
    await ctx
      .error(error + "\n\ncommand: unlock", error);
  }
});

UserFunction({
  pattern: "tag",
  desc: "Tags every person in the group without mentioning their numbers",
  category: "group",
  filename: __filename,
  use: "<text>"
}, async (message, text) => {
  try {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }
    if (!text && !message.reply_message) {
      return message.reply("*Example: " + prefix + "tag Hi Everyone, How are you Doing*");
    }
    if (!message.isAdmin && !message.isCreator) {
      return message.reply(tlang().admin);
    }
    let replyMessage = message.reply_message ? message.reply_message : message;
    let replyText = message.reply_message ? message.reply_message.text : text;
    let mediaType = "";
    let mediaUrl;
    let messageType = replyMessage.mtype;
    if (messageType === "imageMessage" || messageType === "videoMessage") {
      mediaType = messageType.replace("Message", "");
      mediaUrl = await replyMessage.download();
    } else if (!text && message.quoted) {
      mediaUrl = message.quoted.text;
    } else {
      mediaUrl = text;
    }
    if (!mediaUrl) {
      return await message.send("*_Reply to a message_*");
    }
    return await message.send(mediaUrl, {
      caption: replyText,
      mentions: message.metadata.participants.map(participant => participant.id)
    }, mediaType, replyMessage);
  } catch (error) {
    await message.error(error + "\n\ncommand: tag", error);
  }
});

cmd({
  pattern: "tagadmin",
  desc: "Tags only admin numbers",
  category: "group",
  filename: __filename,
  use: "<text>"
}, async (message, text) => {
  try {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }
    if (!message.isAdmin && !message.isCreator) {
      return message.reply(tlang().admin);
    }
    const adminList = message.admins.map(admin => " *|  @" + admin.id.split("@")[0] + "*").join("\n");
    let tagMessage = ("\n▢ Tag by : @" + message.sender.split("@")[0] + "\n" + (text ? "≡ Message: " + text : "") + "\n\n*┌─⊷ GROUP ADMINS*\n" + adminList + "\n*└───────────⊷*\n\n" + Config.caption).trim();
    return await message.bot.sendMessage(message.chat, {
      text: tagMessage,
      mentions: [message.sender, ...message.admins.map(admin => admin.id)]
    });
  } catch (error) {
    await message.error(error + "\n\ncommand: tagadmin", error);
  }
});

cmd({
  pattern: "add",
  desc: "Add that person to the group",
  category: "group",
  filename: __filename,
  use: "<number|reply|mention>"
}, async (message, param) => {
  try {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }
    if (!message.isBotAdmin) {
      return await message.reply("*_I'm Not Admin In This Group, " + (message.isAstro ? "Buddy" : "Sir") + "_*");
    }
    if (!message.isAdmin) {
      return message.reply(tlang().admin);
    }
    let targetJid = message.quoted ? message.quoted.sender : message.mentionedJid[0] ? message.mentionedJid[0] : param ? param.replace(/[^0-9]/g, "").replace(/[\s+]/g, "") + "@s.whatsapp.net" : false;
    if (!targetJid) {
      return await message.reply("*_Uhh Dear, Please Provide A User._*");
    }
    try {
      await message.bot.groupParticipantsUpdate(message.chat, [targetJid], "add");
      await message.reply("*_User Added to Group!_*");
      message.react("✨");
    } catch (error) {
      await message.react("❌");
      await message.bot.sendMessage(targetJid, {
        text: "*_Here's The Group Invite Link!_*\n\n @" + message.sender.split("@")[0] + " Wants to add you to the following group\n\n*_https://chat.whatsapp.com/" + (await message.bot.groupInviteCode(message.chat)) + "_*\n ---------------------------------  \n*_Join If You Feel Free?_*",
        mentions: [message.sender]
      }, {
        quoted: message
      });
      await message.reply("*_Couldn't add user, Invite sent in pm._*");
    }
  } catch (err) {
    await message.error(err + "\n\ncommand: add", err);
  }
});

cmd({
  pattern: "alljids",
  desc: "Sends chat id of every group.",
  category: "group",
  filename: __filename
}, async (message, query, { cmdName }) => {
  try {
    if (!message.isCreator) {
      return message.reply(tlang().owner);
    }
    let groups = await message.bot.groupFetchAllParticipating();
    const groupArray = Object.entries(groups).slice(0).map(entry => entry[1]);
    let result = "";
    let includeJids = false;
    let includeNames = false;
    if (query.includes("jid")) {
      includeJids = true;
    } else if (query.includes("name")) {
      includeNames = true;
    }
    await message.reply("Fetching " + (includeJids ? "Only Jids" : includeNames ? "Only Names" : "Names and Jids") + " from " + groupArray.length + " Groups");
    await sleep(2000);
    for (let group of groupArray) {
      result += includeNames ? "" : "\n*Group:* " + group.subject + " ";
      result += includeJids ? "" : "\n*JID:* " + group.id + "\n";
    }
    return await message.send(result);
  } catch (err) {
    await message.error(err + "\n\ncommand: " + cmdName, err);
  }
});

cmd({
  pattern: "demote",
  desc: "Demotes replied/quoted user from group",
  category: "group",
  filename: __filename,
  use: "<quote|reply|number>"
}, async (message) => {
  try {
    if (!message.isGroup) {
      return message.reply(tlang().group);
    }
    if (!message.isBotAdmin) {
      return await message.reply("*_I'm Not Admin In This Group, Sir_*");
    }
    if (!message.isAdmin) {
      return message.reply(tlang().admin);
    }
    let targetJid = message.mentionedJid[0] ? message.mentionedJid[0] : message.reply_message ? message.reply_message.sender : false;
    if (!targetJid) {
      return await message.reply("*Uhh dear, reply/mention a user*");
    }
    if (message.checkBot(targetJid)) {
      return await message.reply("*_I can't demote my creator!!_*");
    }
    try {
      await message.bot.groupParticipantsUpdate(message.chat, [targetJid], "demote");
      await message.reply("*_User demoted successfully!!_*");
    } catch (error) {
      await message.reply("*_Can't demote user, try it manually. Sorry!!_*");
    }
  } catch (err) {
    await message.error(err + "\n\ncommand: demote", err);
  }
});

UserFunction({
  pattern: "del",
  desc: "Deletes message of any user",
  category: "group",
  filename: __filename,
  use: "<quote/reply message>"
}, async (message) => {
  try {
    if (!message.reply_message) {
      return message.reply("*_Please reply to a message!!!_*");
    }
    let targetMessage = message.reply_message;
    if (targetMessage && targetMessage.fromMe && message.isCreator) {
      return targetMessage.delete();
    } else if (targetMessage && message.isGroup) {
      if (!message.isBotAdmin) {
        return message.reply("*I can't delete messages without Admin Role.*");
      }
      if (!message.isAdmin) {
        return message.reply(tlang().admin);
      }
      await targetMessage.delete();
    } else {
      return await message.reply(tlang().owner);
    }
  } catch (err) {
    await message.error(err + "\n\ncommand: del", err);
  }
});

cmd({
  pattern: "broadcast",
  desc: "Bot makes a broadcast in all groups",
  fromMe: true,
  category: "group",
  filename: __filename,
  use: "<text for broadcast>"
}, async (message, text) => {
  try {
    if (!text) {
      return await message.reply("*Provide text to broadcast in all groups*");
    }
    let groups = await message.bot.groupFetchAllParticipating();
    let groupArray = Object.entries(groups).slice(0).map(entry => entry[1]);
    let groupIds = groupArray.map(group => group.id);
    await message.send("*_Sending Broadcast To " + groupIds.length + " Group Chats, Expected Completion Time: " + groupIds.length * 1.5 + " seconds_*");
    let broadcastText = "*--❗" + tlang().title + " Broadcast❗--*\n\n *🍀Message:* " + text;
    let contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        title: "Asta-Md Broadcast",
        body: message.senderName,
        renderLargerThumbnail: true,
        thumbnail: log0,
        mediaType: 1,
        mediaUrl: "",
        sourceUrl: gurl,
        showAdAttribution: true
      }
    };
    for (let groupId of groupIds) {
      try {
        await sleep(1500);
        await send(message, broadcastText, { contextInfo }, "", "", groupId);
      } catch { }
    }
    return await message.reply("Successful Sending Broadcast To " + groupIds.length + " Groups");
  } catch (err) {
    await message.error(err + "\n\ncommand: broadcast", err);
  }
});

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

let isBotActive = false;
let chatbotCount = 0;

async function haveEqualMembers(array1, array2) {
  if (array1.length === 0 || array2.length === 0) {
    return false;
  }

  const commonElements = array1.filter(element => array2.includes(element));
  const percentageOfOverlap = (commonElements.length / array1.length) * 100;

  return percentageOfOverlap >= 76;
}

UserFunction({
  on: "main"
}, async (message, reply, {
  botNumber,
  isCreator,
  body,
  metadata,
  mtype,
  icmd
}) => {
  try {
    if (global.MsgsInLog === "true") {
      console.log(`${message.isGroup ? "[MESSAGE IN GROUP] From => " + metadata.subject + "\n[USER]:" : "[MESSAGE IN PRIVATE] From =>"} ${message.senderName} ${message.senderNum}\n[${message.mtype.toUpperCase()}]: ${message.body}\n============== [CHATS] =================`);
    }

    let groupInfo = (await groupdb.findOne({
      id: message.chat
    })) || false;
    let warned = false;

    try {
      if (!global.AmdOfficial && global.AmdOfficial !== "yes") {
        return;
      }

      if (groupInfo && groupInfo.antitag == "true" && !message.checkBot() && message.mtype !== "reactionMessage" && groupInfo.botenable == "true") {
        const hasEqualMembers = await haveEqualMembers(message.metadata.participants.map(participant => participant.id), message.mentionedJid);
        if (hasEqualMembers && message.isBotAdmin) {
          let warningData = {
            reason: "tagging all members!",
            chat: message.metadata?.subject || "GROUP",
            warnedby: tlang().title,
            date: message.date
          };
          warned = await warn.addwarn(message.sender, message.chat, warningData);
          await message.reply(`*_[TAG DETECTED] Hey @${message.senderNum} warning!!_*\n*_Tagging all members is not allowed!_*`, {
            mentions: [message.sender]
          });
          await message.delete();
        } else if (hasEqualMembers && !message.isBotAdmin) {
          await message.reply("*_[TAGALL DETECTED] Can't do anything, without getting admin role!_*", {
            mentions: [message.sender]
          });
        }
      }

      if (groupInfo && message.isGroup && !message.isAdmin && !isCreator && message.mtype !== "reactionMessage" && groupInfo.botenable == "true") {
        // Logic for handling antibot, onlyadmin, antilink, and antiword settings...
      }

    } catch (error) {
      console.log("Error From Antilinks : ", error);
    }

    if (warned) {
      let warningThreshold = parseInt(global.warncount) || 3;
      if (warned.warning >= warningThreshold) {
        if (message.isGroup) {
          if (message.isBotAdmin) {
            await message.send(`*_Hey @${message.senderNum} Kicking you from group!_*\n*_Because Your warn limit exceed!_*`, {
              mentions: [message.sender]
            });
            await message.bot.groupParticipantsUpdate(message.chat, [message.sender], "remove");
          }
        } else {
          await message.send(`*_Hey @${message.senderNum} Blocking you!_*\n*_Because Your warn limit exceed!_*`, {
            mentions: [message.sender]
          });
          await message.bot.updateBlockStatus(message.sender, "block");
        }
      }
    }

    try {
      if (!global.AmdOfficial || message.mtype === "reactionMessage") {
        return;
      }

      let groupInfo = (await groupdb.findOne({
        id: message.chat
      })) || {
        chatbot: "false"
      };

      if (!isBotActive || chatbotCount >= 10) {
        isBotActive = (await bot_.findOne({
          id: "bot_" + message.user
        })) || {
          chatbot: "false"
        };
      } else {
        chatbotCount++;
      }

      let enableChatbot = isBotActive && isBotActive.chatbot && isBotActive.chatbot == "true" ? "true" : groupInfo.chatbot || "false";

      if (enableChatbot === "true" && !icmd && !message.isBot && message.text) {
        let targetUser = !message.isGroup ? message.user : message.quoted ? message.quoted.sender : message.mentionedJid[0] || false;

        if (message.isGroup && targetUser && !message.checkBot(targetUser)) {
          return;
        }

        let { data: chatbotResponse } = await axios.get(`http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[${message.senderNum}]&msg=[${body}]`);
        if (chatbotResponse && chatbotResponse.cnt) {
          message.send(chatbotResponse.cnt, {}, "suhail", message);
        }
      }
    } catch (error) {
      console.log("Error From ChatBot : ", error);
    }
  } catch (err) {
    console.log("Group Settings error in command.main() \n", err);
  }
});

let users = {};
let user_warns = {};


UserFunction({
  group: "add"
}, async (message, {
  Void
}) => {
  try {
    let groupSettings = await groupdb.findOne({
      id: message.chat
    });
    if (!groupSettings || !message.isGroup || groupSettings.botenable !== "true" || message.blockJid || message.fromMe) {
      return;
    }

    let welcomeEnabled = groupSettings.welcome === "true";
    let antiFakeEnabled = (groupSettings.antifake || "false").toLowerCase();
    let antiFakeWords = antiFakeEnabled.split(",");

    const isFakeUser = antiFakeWords.some(word => message.user.startsWith(word));
    if (antiFakeEnabled !== "false" && !isFakeUser && !message.isCreator) {
      if (message.isBotAdmin) {
        try {
          await message.kick();
          return await sendWelcome(message, "*[ANTIFAKE START] @User kicked automatically!* @pp");
        } catch (error) {
          await message.error(" Can't kick user in antifake\n❲❒❳ GROUP: " + message.metadata.subject + "\n❲❒❳ ERROR: " + error + "\n", error, false);
        }
      } else {
        await message.send("*[ANTI_FAKE ERROR] Need admin role to kick fake users!!*");
      }
    } else if (welcomeEnabled) {
      await sendWelcome(message, groupSettings.welcometext);
    }
  } catch (error) {
    console.log("Error From Welcome : ", error);
  }
});


UserFunction({
  group: "remove"
}, async (message, {
  Void
}) => {
  try {
    let groupSettings = (await groupdb.findOne({
      id: message.chat
    })) || false;
    if (!message || !groupSettings || !message.isGroup || groupSettings.botenable !== "true" || message.blockJid || message.fromMe) {
      return;
    }

    let goodbyeEnabled = groupSettings.goodbye === "true";
    if (goodbyeEnabled) {
      await sendWelcome(message, groupSettings.goodbyetext);
    }
  } catch (error) {
    console.log("Error From Goodbye : ", error);
  }
});

UserFunction({
  group: "promote"
}, async (message, {
  Void
}) => {
  try {
    let groupSettings = (await groupdb.findOne({
      id: message.chat
    })) || false;
    if (!groupSettings || !message.isGroup || groupSettings.botenable !== "true" || message.blockJid) {
      return;
    }

    if (!user_warns[message.sender]) {
      user_warns[message.sender] = {
        [message.action]: 1
      };
    } else {
      user_warns[message.sender][message.action]++;
    }

    let antidemoteEnabled = groupSettings.antipromote === "true" && !message.isCreator;
    if (antidemoteEnabled) {
      let shouldDemote = message.isBotAdmin ? false : true;
      if (users[message.sender] && users[message.sender].previous_Action === "antidemote") {
        delete users[message.sender];
        return;
      }
      if (message.isBotAdmin) {
        try {
          await message.demote();
          users[message.sender] = {
            previous_Action: "antipromote"
          };
          if (user_warns[message.sender][message.action] > 2) {
            return;
          }
          return await sendWelcome(message, "*[ANTIPROMOTE START] @User Demoted Automatically!* @pp ");
        } catch (error) {
          await message.error(" Can't demote user in antipromote\n❲❒❳ GROUP: " + message.metadata.subject + "\n❲❒❳ ERROR: " + error + "\n", error, false);
        }
      }
    }

    let pdmEnabled = groupSettings.pdm === "true" || shouldDemote;
    if (pdmEnabled && user_warns[message.sender][message.action] <= 2) {
      var captionText = " *[SOMEONE PROMOTE HERE]*\n" + (shouldDemote ? "*Note : _I'm Not Admin Here, So I Can't Demote Someone while Anti_Promote Activated_*" : "") + "\n           \n  ❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Member -> Admin_ @pp\n  ❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n\n\n" + Config.caption;
      return await sendWelcome(message, captionText);
    }
  } catch (error) {
    console.log("Error From Promote : ", error);
  }
});
UserFunction({
  group: "demote"
}, async (message, {
  Void
}) => {
  try {
    let groupSettings = (await groupdb.findOne({
      id: message.chat
    })) || false;
    if (!groupSettings || !message.isGroup || groupSettings.botenable !== "true" || message.blockJid) {
      return;
    }

    if (!user_warns[message.sender]) {
      user_warns[message.sender] = {
        [message.action]: 1
      };
    } else {
      user_warns[message.sender][message.action]++;
    }

    let antidemoteEnabled = groupSettings.antidemote === "true" && !message.isCreator;
    if (antidemoteEnabled) {
      let shouldPromote = message.isBotAdmin ? false : true;
      if (users[message.sender] && users[message.sender].previous_Action === "antipromote") {
        delete users[message.sender];
        return;
      }
      if (message.isBotAdmin) {
        try {
          await message.promote();
          users[message.sender] = {
            previous_Action: "antidemote"
          };
          if (user_warns[message.sender][message.action] > 2) {
            return;
          }
          return await sendWelcome(message, "*[ANTIDEMOTE START] User promoted automatically!* @pp ");
        } catch (error) {
          await message.error(" Can't promote user in antidemote\n❲❒❳ GROUP: " + message.metadata.subject + "\n❲❒❳ ERROR: " + error + "\n", error, false);
        }
      }
    }

    let pdmEnabled = groupSettings.pdm === "true" || shouldPromote;
    if (pdmEnabled && user_warns[message.sender][message.action] <= 2) {
      var captionText = " *[SOMEONE DEMOTE HERE]*\n  " + (shouldPromote ? "*Note : _I'm Not Admin Here, So I Can't Promote Someone while Anti_Demote Activated_*" : "") + "\n\n  ❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Admin -> Member_ @pp\n  ❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n  \n\n" + Config.caption;
      return await sendWelcome(message, captionText);
    }
  } catch (error) {
    console.log("Error From Demote : ", error);
  }
});

const fs = require('fs');

// Function to load banned users from ban.json
function loadBannedUsers() {
  try {
    const data = fs.readFileSync('ban.json');
    return JSON.parse(data);
  } catch (error) {
    return { bannedUsers: [] };
  }
}

// Function to save banned users to ban.json
function saveBannedUsers(bannedUsers) {
  try {
    fs.writeFileSync('ban.json', JSON.stringify(bannedUsers, null, 2));
  } catch (error) {
    console.error('Error saving banned users:', error);
  }
}

// Function to ban a user
async function banUser(userId, userJid, userName) {
  const bannedUsers = loadBannedUsers();
  if (!bannedUsers.bannedUsers.some(user => user.userId === userId)) {
    bannedUsers.bannedUsers.push({ userId, userJid, userName });
    saveBannedUsers(bannedUsers);
    return true;
  }
  return false; // User is already banned
}

// Function to unban a user
async function unbanUser(userId) {
  const bannedUsers = loadBannedUsers();
  const index = bannedUsers.bannedUsers.findIndex(user => user.userId === userId);
  if (index !== -1) {
    bannedUsers.bannedUsers.splice(index, 1);
    saveBannedUsers(bannedUsers);
    return true;
  }
  return false; // User is not currently banned
}

UserFunction({
  pattern: "ban",
  desc: "Bans a user from using any bot command",
  category: "admin",
  use: "<user-id>",
}, async (message, match) => {
  const userId = match[1];
  const userJid = message.sender;
  const userName = message.senderName;
  const success = await banUser(userId, userJid, userName);
  if (success) {
    await message.reply(`User ${userId} (${userName}) has been banned.`);
  } else {
    await message.reply(`User ${userId} (${userName}) is already banned.`);
  }
});

UserFunction({
  pattern: "unban",
  desc: "Unbans a user from using any bot command",
  category: "admin",
  use: "<user-id>",
}, async (message, match) => {
  const userId = match[1];
  const success = await unbanUser(userId);
  if (success) {
    await message.reply(`User ${userId} has been unbanned.`);
  } else {
    await message.reply(`User ${userId} is not currently banned.`);
  }
});

UserFunction({
  pattern: "checkban",
  desc: "Shows all the banned users",
  category: "admin",
  filename: __filename,
  isAdminCommand: true
}, async (message) => {
  const bannedUsers = loadBannedUsers();
  if (bannedUsers.bannedUsers.length === 0) {
    await message.reply("There are no banned users.");
  } else {
    let reply = "Banned Users:\n";
    bannedUsers.bannedUsers.forEach(user => {
      reply += `- ${user.userId} (${user.userName})\n`;
    });
    await message.reply(reply);
  }
});

UserFunction({
  pattern: "clearban",
  desc: "Unbans all the banned users",
  category: "admin",
  filename: __filename,
  isAdminCommand: true
}, async (message) => {
  const bannedUsers = { bannedUsers: [] };
  saveBannedUsers(bannedUsers);
  await message.reply("All banned users have been unbanned.");
});
