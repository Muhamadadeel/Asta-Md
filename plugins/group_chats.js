global.warncount = process.env.WARN_COUNT || global.warncount || "3";
global.MsgsInLog = process.env.MSGS_IN_LOG || global.MsgsInLog || "true";
const {
  updateProfilePicture,
  parsedJid
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
          title: "𝗔𝗦𝗧𝗔-𝗠𝗗",
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
UserFunction({
  cmdname: "reject",
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
      } catch { }
    }
    await _0xb81e45.send(_0x32f437, {
      mentions: [_0x3b870c]
    });
  } catch (_0x13cc87) {
    await _0xb81e45.error(_0x13cc87 + "\n\ncommand: rejectall", _0x13cc87);
  }
});
UserFunction({
  cmdname: "accept",
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
      } catch { }
    }
    await _0x90a6de.send(_0x26ddf1, {
      mentions: [_0x4f391e]
    });
  } catch (_0x366bd4) {
    await _0x90a6de.error(_0x366bd4 + "\n\ncommand: acceptall", _0x366bd4);
  }
});
UserFunction({
  cmdname: "requests",
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
UserFunction({
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
UserFunction({
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
UserFunction({
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
UserFunction({
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
UserFunction({
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
  { }
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
        } catch { }
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
UserFunction({
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
UserFunction({
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
UserFunction({
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
UserFunction({
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
UserFunction({
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
UserFunction({
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
UserFunction({
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
UserFunction({
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
UserFunction({
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
        title: "Asta-Md Broadcast",
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
      } catch { }
    }
    return await _0x553d05.reply("*Successful Sending Broadcast To " + _0x4ef191.length + " Group*");
  } catch (_0x2a8ad8) {
    await _0x553d05.error(_0x2a8ad8 + "\n\ncommand: broadcast", _0x2a8ad8);
  }
});

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

let bott = false;
let chatbotCount = 0;
async function haveEqualMembers(_0x31ae7e, _0x107896) {
  if (_0x31ae7e.length === 0 || _0x107896.length === 0) {
    return false;
  }
  const _0x5aee47 = _0x31ae7e.filter(_0x44f6e4 => _0x107896.includes(_0x44f6e4));
  const _0x3a93d0 = _0x5aee47.length / _0x31ae7e.length * 100;
  return _0x3a93d0 >= 76;
}


//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
UserFunction({
  on: "main"
}, async (_0x39f91d, _0x4baec9, {
  botNumber: _0x4ac038,
  isCreator: _0x184989,
  budy: _0x47409a,
  body: _0x66fc82,
  icmd: _0x250d65
}) => {
  try {
    if (global.MsgsInLog === "true") {
      console.log("" + (_0x39f91d.isGroup ? "[MESSAGE IN GROUP] From => " + _0x39f91d.metadata.subject + "\n[USER]:" : "[MESSAGE IN PRIVATE] From =>") + (" " + _0x39f91d.senderName + " " + _0x39f91d.senderNum + "\n[" + _0x39f91d.mtype.toUpperCase() + "]: " + _0x39f91d.body + "\n============== [CHATS] ================="));
    }
    let _0x273393 = (await groupdb.findOne({
      id: _0x39f91d.chat
    })) || false;
    let _0xea5278 = false;
    try {
      if (!global.SmdOfficial && global.SmdOfficial !== "yes") {
        return;
      }
      if (_0x273393 && _0x273393.antitag == "true" && !_0x39f91d.checkBot() && _0x39f91d.mtype !== "reactionMessage" && _0x273393.botenable == "true") {
        const _0x50265a = await haveEqualMembers(_0x39f91d.metadata.participants.map(_0x406321 => _0x406321.id), _0x39f91d.mentionedJid);
        if (_0x50265a && _0x39f91d.isBotAdmin) {
          let _0x40ef27 = {
            reason: "tagging all members!",
            chat: _0x39f91d.metadata?.subject || "GROUP",
            warnedby: tlang().title,
            date: _0x39f91d.date
          };
          _0xea5278 = await warn.addwarn(_0x39f91d.sender, _0x39f91d.chat, _0x40ef27);
          await _0x39f91d.reply("*_[TAG DETECTED] Hey @" + _0x39f91d.senderNum + " warning!!_*\n*_Tagging all members is not allowed!_*", {
            mentions: [_0x39f91d.sender]
          });
          await _0x39f91d.delete();
        } else if (_0x50265a && !_0x39f91d.isBotAdmin) {
          await _0x39f91d.reply("*_[TAGALL DETECTED] Can't do anything, without getting admin role!_*", {
            mentions: [_0x39f91d.sender]
          });
        }
      }
      if (_0x273393 && _0x39f91d.isGroup && !_0x39f91d.isAdmin && !_0x184989 && _0x39f91d.mtype !== "reactionMessage" && _0x273393.botenable == "true") {
        if (_0x273393.antibot && _0x273393.antibot !== "false" && _0x39f91d.isBot && !_0x39f91d.checkBot(_0x39f91d.sender)) {
          if (_0x39f91d.isBotAdmin) {
            var _0x3c86e4 = "*_Bot user not allowed, please make it private!_*";
            if (_0x273393.antibot === "warn") {
              let _0x50d0d8 = {
                reason: "Bots not allowed!",
                chat: _0x39f91d.metadata?.subject || "GROUP",
                date: _0x39f91d.date
              };
              _0xea5278 = _0xea5278 ? _0xea5278 : await warn.addwarn(_0x39f91d.sender, _0x39f91d.chat, _0x50d0d8);
              if (_0xea5278.status) {
                _0x3c86e4 = "*_Hey @" + _0x39f91d.senderNum + " warning, Due To Antibot!_*";
              }
            } else if (_0x273393.antibot === "kick") {
              try {
                sleep(1000);
                await _0x39f91d.bot.groupParticipantsUpdate(_0x39f91d.chat, [_0x39f91d.sender], "remove");
                _0x3c86e4 = "*_User @" + _0x39f91d.senderNum + " kick Due To Antibot!_*";
              } catch { }
            }
            await _0x39f91d.delete();
            await _0x39f91d.send(_0x3c86e4, {
              mentions: [_0x39f91d.sender]
            });
          } else if (!_0x39f91d.isBotAdmin && _0x39f91d.isBot) {
            await _0x39f91d.reply("*_Uhh Please, Provide Admin Role To Kick Other Bot_*\n*_Or Disable Antibot (On/Off) In Current Group_*");
          }
        }
        if (_0x273393.onlyadmin && _0x273393.onlyadmin === "true" && SmdOfficial == "yes") {
          var _0x3c86e4 = "";
          if (_0x39f91d.isBotAdmin) {
            let _0x5c4aae = {
              reason: "Only Admin can Chat!",
              chat: _0x39f91d.metadata?.subject || "PRIVATE",
              warnedby: tlang().title,
              date: _0x39f91d.date
            };
            _0xea5278 = _0xea5278 ? _0xea5278 : await warn.addwarn(_0x39f91d.sender, _0x39f91d.chat, _0x5c4aae);
            if (_0xea5278.status) {
              _0x3c86e4 = "*Warns you for chat here!*\n";
            }
            await _0x39f91d.delete();
            sleep(1500);
            await _0x39f91d.send("*Hey @" + _0x39f91d.senderNum + "* " + _0x3c86e4 + "*Deleteing message,while onlyadmin activated!!* ", {
              mentions: [_0x39f91d.sender]
            });
          } else {
            await _0x39f91d.send("*_Provide admin role to kick Message Senders_*\n*Or _Disable onlyadmin(on/off) in currentchat_*");
          }
        }
        if (_0x273393.antilink && _0x273393.antilink !== "false" && SmdOfficial === "yes") {
          const _0x37bc15 = Config.antilink_values && Config.antilink_values !== "all" ? Config.antilink_values.split(",").filter(_0x3da281 => _0x3da281.trim() !== "") : ["https://", "chat.whatsapp.com", "fb.com"];
          let _0x5cbc1d = _0x66fc82.toLowerCase();
          if (_0x37bc15.some(_0x81b040 => _0x5cbc1d.includes(_0x81b040))) {
            if (!_0x39f91d.isBotAdmin) {
              let _0x26aa7f = " *[LINK DETECTED]*\nUser @" + _0x39f91d.sender.split("@")[0] + " detected sending a link.\nPromote " + Config.botname + " as admin to " + (_0x273393.antilink === "kick" ? "kick \nlink senders." : "delete \nlinks from this Chat") + " \n";
              await _0x39f91d.send(_0x26aa7f, {
                mentions: [_0x39f91d.sender]
              });
            } else if (_0x273393.antilink === "delete") {
              await _0x39f91d.send("*_Link Detected.. Deletion Done!_*");
              await _0x39f91d.delete();
            } else if (_0x273393.antilink === "warn" || _0x273393.antilink === "true") {
              let _0x75abf8 = {
                reason: "links not allowed!",
                chat: _0x39f91d.metadata?.subject || "PRIVATE",
                warnedby: tlang().title,
                date: _0x39f91d.date
              };
              _0xea5278 = _0xea5278 ? _0xea5278 : await warn.addwarn(_0x39f91d.sender, _0x39f91d.chat, _0x75abf8);
              var _0x3c86e4 = _0xea5278.status ? "*_[LINK DETECTED] Hey @" + _0x39f91d.senderNum + " warning!!_*\n*_links not allowed in current group!_*" : "*_[LINK DETECTED]!_*";
              await _0x39f91d.reply(_0x3c86e4, {
                mentions: [_0x39f91d.sender]
              });
              await _0x39f91d.delete();
            } else if (_0x273393.antilink === "kick") {
              await _0x39f91d.send("*_Link Detected!!_*");
              try {
                await _0x39f91d.delete();
                sleep(1500);
                await _0x39f91d.bot.groupParticipantsUpdate(_0x39f91d.chat, [_0x39f91d.sender], "remove");
              } catch {
                await _0x39f91d.send("*Link Detected*\n" + tlang().botAdmin);
              }
            }
          }
        }
      }
    } catch (_0x1a7fb0) {
      console.log("Error From Antilinks : ", _0x1a7fb0);
    }
    var _0x219875 = _0x273393?.antiword || {
      status: "false"
    };
    if (_0x4baec9.length > 1 && !_0x39f91d.isBot && _0x219875 && _0x219875.status !== "false" && _0x219875.words) {
      var _0x4e66ac = _0x219875.words.split(",") || [];
      let _0x2298c9 = false;
      _0x4e66ac.map(async _0x5e94de => {
        if (_0x39f91d.isAdmin || !global.SmdOfficial || global.SmdOfficial != "yes") {
          return;
        }
        let _0x520e96 = new RegExp("\\b" + _0x5e94de?.trim() + "\\b", "ig");
        let _0x1ae0c5 = _0x47409a.toLowerCase();
        if (!_0x2298c9 && _0x5e94de && _0x520e96.test(_0x1ae0c5)) {
          _0x2298c9 = true;
          await sleep(500);
          try {
            var _0x3dc4df = "";
            if (_0x219875.status === "warn") {
              let _0x5f3cee = {
                reason: "For using Bad Word",
                chat: _0x39f91d.metadata?.subject || "PRIVATE",
                warnedby: tlang().title,
                date: _0x39f91d.date
              };
              _0xea5278 = _0xea5278 ? _0xea5278 : await warn.addwarn(_0x39f91d.sender, _0x39f91d.chat, _0x5f3cee);
              if (_0xea5278.status) {
                _0x3dc4df = "\n*Warns you for using badWord!!*\n";
              }
            }
            if (_0x39f91d.isBotAdmin) {
              await _0x39f91d.send("*[BAD WORD DETECTED] Hey @" + _0x39f91d.senderNum + "* " + _0x3dc4df + " *Deleting your message from chat!*\n", {
                mentions: [_0x39f91d.sender]
              }, "suhail", _0x39f91d);
              await _0x39f91d.delete();
            } else {
              await _0x39f91d.reply("*_[BAD WORD DETECTED] provide admin to take action!_*", {
                mentions: [_0x39f91d.sender]
              });
            }
          } catch (_0x44e136) {
            console.log("Error From Bad Words : ", _0x44e136);
          }
        }
      });
    }
    if (_0xea5278) {
      let _0x4cb16b = parseInt(global.warncount) || 3;
      if (_0xea5278.warning >= _0x4cb16b) {
        if (_0x39f91d.isGroup) {
          if (_0x39f91d.isBotAdmin) {
            await _0x39f91d.send("*_Hey @" + _0x39f91d.senderNum + " Kicking you from group!_*\n*_Because Your warn limit exceed!_*", {
              mentions: [_0x39f91d.sender]
            });
            await _0x39f91d.bot.groupParticipantsUpdate(_0x39f91d.chat, [_0x39f91d.sender], "remove");
          }
        } else {
          await _0x39f91d.send("*_Hey @" + _0x39f91d.senderNum + " Blocking you!_*\n*_Because Your warn limit exceed!_*", {
            mentions: [_0x39f91d.sender]
          });
          await _0x39f91d.bot.updateBlockStatus(_0x39f91d.sender, "block");
        }
      }
    }
    try {
      if (!global.SmdOfficial || _0x39f91d.mtype === "reactionMessage") {
        return;
      }
      let _0x294e10 = (await groupdb.findOne({
        id: _0x39f91d.chat
      })) || {
        chatbot: "false"
      };
      if (!bott || chatbotCount >= 10) {
        bott = (await bot_.findOne({
          id: "bot_" + _0x39f91d.user
        })) || {
          chatbot: "false"
        };
      } else {
        chatbotCount++;
      }
      let _0x3f3751 = bott && bott.chatbot && bott.chatbot == "true" ? "true" : _0x294e10.chatbot || "false";
      if (_0x3f3751 === "true" && !_0x250d65 && !_0x39f91d.isBot && _0x39f91d.text) {
        let _0x4c0917 = !_0x39f91d.isGroup ? _0x39f91d.user : _0x39f91d.quoted ? _0x39f91d.quoted.sender : _0x39f91d.mentionedJid[0] || false;
        if (_0x39f91d.isGroup && _0x4c0917 && !_0x39f91d.checkBot(_0x4c0917)) {
          return;
        }
        let {
          data: _0x1a5d20
        } = await axios.get("http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[" + _0x39f91d.senderNum + "]&msg=[" + _0x47409a + "]");
        if (_0x1a5d20 && _0x1a5d20.cnt) {
          _0x39f91d.send(_0x1a5d20.cnt, {}, "suhail", _0x39f91d);
        } else {
          "";
        }
      }
    } catch (_0x418db7) {
      console.log("Error From ChatBot : ", _0x418db7);
    }
  } catch (_0x4eac84) {
    console.log("Group Settings error in command.main() \n", _0x4eac84);
  }
});
let users = {};
let user_warns = {};
UserFunction({
  group: "add"
}, async (_0x28d76c, {
  Void: _0x4dedb6
}) => {
  try {
    let _0x3a7fc2 = await groupdb.findOne({
      id: _0x28d76c.chat
    });
    if (!_0x3a7fc2 || !_0x28d76c.isGroup || _0x3a7fc2.botenable !== "true" || _0x28d76c.blockJid || _0x28d76c.fromMe) {
      return;
    }
    let _0x21c5eb = _0x3a7fc2 && _0x3a7fc2.welcome ? _0x3a7fc2.welcome : "false";
    let _0x3fc86e = _0x3a7fc2 && _0x3a7fc2.antifake ? _0x3a7fc2.antifake.toLowerCase() : "false";
    let _0x5dd590 = _0x3fc86e.split(",");
    const _0xdb6223 = _0x5dd590.some(_0x25ffc0 => _0x28d76c.user.startsWith(_0x25ffc0));
    if (_0x3fc86e !== "false" && !_0xdb6223 && !_0x28d76c.isCreator) {
      if (_0x28d76c.isBotAdmin) {
        try {
          await _0x28d76c.kick();
          return await sendWelcome(_0x28d76c, "*[ANTIFAKE START] @User kicked automaticaly!* @pp");
        } catch (_0x52d6df) {
          await _0x28d76c.error(" Can't kick user in antifake\n❲❒❳ GROUP: " + _0x28d76c.metadata.subject + "\n❲❒❳ ERROR: " + _0x52d6df + "\n", _0x52d6df, false);
        }
      } else {
        await _0x28d76c.send("*[ANTI_FAKE ERROR] Need admin role to kick fake users!!*");
      }
    } else if (_0x21c5eb === "true") {
      await sendWelcome(_0x28d76c, _0x3a7fc2.welcometext);
    }
  } catch (_0x476537) {
    console.log("Error From Welcome : ", _0x476537);
  }
});
UserFunction({
  group: "remove"
}, async (_0x1b9988, {
  Void: _0xcb3386
}) => {
  try {
    let _0xa3ec6 = (await groupdb.findOne({
      id: _0x1b9988.chat
    })) || false;
    if (!_0x1b9988 || !_0xa3ec6 || !_0x1b9988.isGroup || _0xa3ec6.botenable !== "true" || _0x1b9988.blockJid || _0x1b9988.fromMe) {
      return;
    }
    let _0x9f4c7b = _0xa3ec6 && _0xa3ec6.goodbye ? _0xa3ec6.goodbye : "false";
    if (_0x9f4c7b === "true") {
      await sendWelcome(_0x1b9988, _0xa3ec6.goodbyetext);
    }
  } catch (_0x442765) {
    console.log("Error From Goodbye : ", _0x442765);
  }
});
UserFunction({
  group: "promote"
}, async (_0x482975, {
  Void: _0x3481d2
}) => {
  try {
    let _0x390d91 = (await groupdb.findOne({
      id: _0x482975.chat
    })) || false;
    if (!_0x390d91 || !_0x482975.isGroup || _0x390d91.botenable !== "true" || _0x482975.blockJid) {
      return;
    }
    if (!user_warns[_0x482975.sender]) {
      user_warns[_0x482975.sender] = {
        [_0x482975.action]: 1
      };
    } else {
      user_warns[_0x482975.sender][_0x482975.action]++;
    }
    let _0x4124fa;
    if (_0x390d91.antipromote == "true" && !_0x482975.isCreator) {
      _0x4124fa = _0x482975.isBotAdmin ? false : true;
      if (users[_0x482975.sender] && users[_0x482975.sender].previous_Action === "antidemote") {
        delete users[_0x482975.sender];
        return;
      }
      if (_0x482975.isBotAdmin) {
        try {
          await _0x482975.demote();
          users[_0x482975.sender] = {
            previous_Action: "antipromote"
          };
          if (user_warns[_0x482975.sender][_0x482975.action] > 2) {
            return;
          }
          return await sendWelcome(_0x482975, "*[ANTIPROMOTE START] @User Demoted Automatically!* @pp ");
        } catch (_0x5ae38b) {
          await _0x482975.error(" Can't demote user in antipromote\n❲❒❳ GROUP: " + _0x482975.metadata.subject + "\n❲❒❳ ERROR: " + _0x5ae38b + "\n", _0x5ae38b, false);
        }
      }
    }
    if (_0x390d91.pdm == "true" || _0x4124fa) {
      if (user_warns[_0x482975.sender][_0x482975.action] > 2) {
        return;
      }
      var _0x218901 = " *[SOMEONE PROMOTE HERE]*\n" + (_0x4124fa ? "*Note : _I'm Not Admin Here, So I Can't Demote Someone while Anti_Promote Activated_*" : "") + "\n           \n  ❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Member -> Admin_ @pp\n  ❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n\n\n" + Config.caption;
      return await sendWelcome(_0x482975, _0x218901);
    }
  } catch (_0x3a436e) {
    console.log("Error From Promote : ", _0x3a436e);
  }
});
UserFunction({
  group: "demote"
}, async (_0x2b38a5, {
  Void: _0x4676d7
}) => {
  try {
    let _0x1273fa = (await groupdb.findOne({
      id: _0x2b38a5.chat
    })) || false;
    if (!_0x1273fa || !_0x2b38a5.isGroup || _0x1273fa.botenable !== "true" || _0x2b38a5.blockJid) {
      return;
    }
    if (!user_warns[_0x2b38a5.sender]) {
      user_warns[_0x2b38a5.sender] = {
        [_0x2b38a5.action]: 1
      };
    } else {
      user_warns[_0x2b38a5.sender][_0x2b38a5.action]++;
    }
    let _0x5878b4;
    if (_0x1273fa.antidemote == "true" && !_0x2b38a5.isCreator) {
      _0x5878b4 = _0x2b38a5.isBotAdmin ? false : true;
      if (users[_0x2b38a5.sender] && users[_0x2b38a5.sender].previous_Action === "antipromote") {
        delete users[_0x2b38a5.sender];
        return;
      }
      if (_0x2b38a5.isBotAdmin) {
        try {
          await _0x2b38a5.promote();
          users[_0x2b38a5.sender] = {
            previous_Action: "antidemote"
          };
          if (user_warns[_0x2b38a5.sender][_0x2b38a5.action] > 2) {
            return;
          }
          return await sendWelcome(_0x2b38a5, "*[ANTIPROMOTE START] User promote automatically!* @pp ");
        } catch (_0x275310) {
          await _0x2b38a5.error(" Can't promote user in antidemote\n❲❒❳ GROUP: " + _0x2b38a5.metadata.subject + "\n❲❒❳ ERROR: " + _0x275310 + "\n", _0x275310, false);
        }
      }
    }
    if (_0x1273fa.pdm == "true" || _0x5878b4) {
      if (user_warns[_0x2b38a5.sender][_0x2b38a5.action] > 2) {
        return;
      }
      var _0x168c92 = " *[SOMEONE DEMOTE HERE]*\n  " + (_0x5878b4 ? "*Note : _I'm Not Admin Here, So I Can't promote Someone while Anti_Demote Activated_*" : "") + "\n\n  ❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Admin -> Member_ @pp\n  ❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n  \n\n" + Config.caption;
      return await sendWelcome(_0x2b38a5, _0x168c92);
    }
  } catch (_0x3ef55d) {
    console.log("Error From Demote : ", _0x3ef55d);
  }
});