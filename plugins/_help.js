const os = require("os");
const fs = require("fs");
const Config = require("../config");
let {
  fancytext,
  tlang,
  tiny,
  runtime,
  formatp,
  prefix,
  smd,
} = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const util = require("util");
const events = astro_patch;
const { commands } = require("../lib");
const { exec } = require("child_process");
const translatte = require("translatte");
const cron = require("node-cron");
var cronStart = false;

// Command: help
smd(
  {
    cmdname: "help",
    alias: ["categories", "ctgry", "category"],
    desc: "category list",
    category: "general",
  },
  async (message, match) => {
    try {
      if (match.split(" ")[0]) {
        let response = [];
        const command = commands.find(
          (cmd) => cmd.pattern === match.split(" ")[0].toLowerCase(),
        );
        if (command) {
          response.push(`*🍁Command:* ${command.pattern}`);
          if (command.category) {
            response.push(`*🧩Category:* ${command.category}`);
          }
          if (command.alias && command.alias[0]) {
            response.push(`*🧩Alias:* ${command.alias.join(", ")}`);
          }
          if (command.desc) {
            response.push(`*🧩Description:* ${command.desc}`);
          }
          if (command.use) {
            response.push(
              `*〽️Usage:*\n \`\`\`${prefix}${command.pattern} ${command.use}\`\`\``,
            );
          }
          await message.reply(response.join("\n"));
        }
      }

      const categories = {};
      commands.map(async (cmd, index) => {
        if (cmd.dontAddCommandList === false && cmd.pattern !== undefined) {
          if (!categories[cmd.category]) {
            categories[cmd.category] = [];
          }
          categories[cmd.category].push(cmd.pattern);
        }
      });

      let menuType = Math.round(Math.random()) === 0 ? "MENU" : "COMMANDS";
      let response = `┏━━━━━━━━━━━━━━━━━━━━━━━━\n┃\t *SUHAIL-MD_${menuType}_LIST* \n┗━━━━━━━━━━━━━━━━━━━━━━━━\n\n\t\`\`\`Reply the number you wants to select\`\`\`\n\n`;
      let counter = 1;
      let categoryCounter = 0;

      for (const category in categories) {
        categoryCounter += 1;
        if (match.toLowerCase() === category.toLowerCase()) {
          response = `┏━━⟪ *${category.toUpperCase()}* ⟫━━⦿\n\n`;
          for (const cmd of categories[category]) {
            response += `┃ ✗ ${fancytext(cmd, 1)}\n`;
          }
          response += "\n┗━━━━━━━━━━━━━━⦿";
          break;
        }
        if (categoryCounter >= 10) {
          counter += 1;
          categoryCounter = 0;
        }
        response += `\n*${counter}.${categoryCounter} |${category.toUpperCase()} ${menuType}*\n`;
      }

      response += `\n\n${Config.caption}`;
      return await message.sendUi(message.jid, { caption: response });
    } catch (error) {
      await message.error(`${error}\nCommand:help`, error);
    }
  },
);

// Command: menus
smd(
  {
    pattern: "menus",
    type: "MENU list",
    info: "general",
    dontAddCommandList: true,
  },
  async (message) => {
    try {
      const response = `
*🦄 ᴜᴘ ᴛɪᴍᴇ :* ${runtime(process.uptime())}
*🍁 ᴛᴏᴅᴀʏ ɪs :* ${message.date}
*🎗 ɴᴏᴡ ᴛɪᴍᴇ :* ${message.time}
➮Fᴏᴜɴᴅᴇʀ- SuhailTechInfo𝛁
➮Oᴡɴᴇʀ - ${Config.ownername}
➮Nᴜᴍ - ${owner.split(",")[0]}
➮Mᴇᴍᴏ - ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
 *🧑‍💻 :* Sᴜʜᴀɪʟ-Mᴜʟᴛɪᴅᴇᴠɪᴄᴇ ɪꜱ ɴᴏᴡ Aᴠᴀɪʟᴀʙʟᴇ
${readmore}
╭──❰ *ALL MENU* ❱
│🏮 Lɪꜱᴛ
│🏮 Cᴀᴛᴇɢᴏʀʏ
│🏮 Hᴇʟᴘ
│🏮 Aʟɪᴠᴇ
│🏮 Uᴘᴛɪᴍᴇ
│🏮 Wᴇᴀᴛʜᴇʀ
│🏮 Lɪɴᴋ
│🏮 Cᴘᴜ
│🏮 Rᴇᴘᴏꜱɪᴛᴏʀʏ
╰─────────────⦁`.trim();
      return await message.bot.sendUi(message.from, { caption: response });
    } catch (error) {
      await message.error(`${error}\nCommand:menus`, error);
    }
  },
);
astro_patch.cmd(
  {
    pattern: "setcmd",
    desc: "To check ping",
    category: "general",
    fromMe: true,
    filename: __filename,
  },
  async (message, match, { Void }) => {
    try {
      if (!match) {
        return await message.send(
          "*_Please provide cmd name by replying a Sticker_*",
        );
      }

      let [cmdName, cmdPattern] = match.split(",");
      let isSticker = false;
      let stickerHash;

      if (message.quoted) {
        const quotedMessageType = message.quoted.mtype;
        if (quotedMessageType === "stickerMessage" && match) {
          isSticker = true;
          cmdPattern = match.split(" ")[0];
          stickerHash = "sticker-" + message.quoted.msg.fileSha256;
        }
      }

      if (!isSticker && cmdName && cmdPattern) {
        cmdName = cmdName.trim().toLowerCase();
        cmdPattern = cmdPattern.trim().toLowerCase();
      } else if (!isSticker) {
        return await message.send(
          "*_Uhh Dear, Give Cmd With New Name_*\n*Eg: _.setcmd New_Name, Cmd_Name_*",
        );
      }

      if (cmdName.length < 1) {
        return await message.reply(
          "*_Uhh Please, Provide New_Cmd Name First_*",
        );
      }

      if (global.setCmdAlias[cmdName]) {
        return await message.send(
          `*_"${isSticker ? "Given Sticker" : cmdName}" Already set for "${global.setCmdAlias[cmdName]}" Cmd, Please try another ${isSticker ? "Sticker" : "Name"}_*`,
        );
      }

      const command =
        astro_patch.commands.find((cmd) => cmd.pattern === cmdPattern) ||
        astro_patch.commands.find(
          (cmd) => cmd.alias && cmd.alias.includes(cmdPattern),
        );

      if (command) {
        global.setCmdAlias[cmdName] = command.pattern;
        return await message.send(
          `*_Cmd "${global.setCmdAlias[cmdName]}" Succesfully set to "${isSticker ? "Sticker" : cmdName}"._*\n*_These all names are reset, If bot restart_*`,
        );
      } else {
        return await message.send(
          `*_Provided Cmd( ${cmdPattern}) not found in bot cmds. Please Provide Valid cmd Name_*`,
        );
      }
    } catch (error) {
      await message.error(`${error}\nCommand:setcmd`, error);
    }
  },
);

astro_patch.cmd(
  {
    pattern: "delcmd",
    desc: "To check ping",
    category: "general",
    fromMe: true,
    filename: __filename,
  },
  async (message, match, { Void }) => {
    try {
      let cmdName = match ? match.split(" ")[0].trim().toLowerCase() : "";
      let isSticker = false;

      if (message.quoted) {
        if (message.quoted.mtype === "stickerMessage") {
          isSticker = true;
          cmdName = "sticker-" + message.quoted.msg.fileSha256;
        } else if (!match) {
          return await message.send(
            "*_Please reply to a Sticker that set for a Cmd_*",
          );
        }
      } else if (!match) {
        return await message.send(
          "*_Uhh Dear, provide Name that set to a cmd_*\n*Eg: _.delcmd Cmd_Name_*",
        );
      }

      if (global.setCmdAlias[cmdName]) {
        await message.send(
          `*_"${isSticker ? "Given Sticker" : cmdName}" deleted Succesfully at "${global.setCmdAlias[cmdName]}" cmd_*`,
        );
        delete global.setCmdAlias[cmdName];
        return;
      } else {
        return await message.send(
          `*_"${isSticker ? "Given Sticker" : cmdName}" not Set for any cmd._*\n *_Please Provide Valid ${isSticker ? "Sticker" : "cmd Name"} to delete_*`,
        );
      }
    } catch (error) {
      await message.error(`${error}\nCommand:delcmd`, error);
    }
  },
);
astro_patch.smd(
  {
    pattern: "ping",
    desc: "To check ping",
    category: "general",
    filename: __filename,
  },
  async (message) => {
    const startTime = new Date().getTime();
    const { key } = await message.reply("*Testing Ping!!!*");
    const endTime = new Date().getTime();
    return await message.send(
      `*Pong*\n *${endTime - startTime} ms* `,
      { edit: key },
      "",
      message,
    );
  },
);

astro_patch.cmd(
  {
    pattern: "uptime",
    alias: ["runtime"],
    desc: "Tells runtime/uptime of bot.",
    category: "misc",
    filename: __filename,
  },
  async (message) => {
    try {
      message.reply(
        `*_Uptime of ${tlang().title}: ${runtime(process.uptime())}_*`,
      );
    } catch (error) {
      await message.error(`${error}\n\ncommand : uptime`, error, false);
    }
  },
);

astro_patch.cmd(
  {
    cmdname: "menu",
    desc: "Help list",
    type: "general",
    filename: __filename,
  },
  async (message, input) => {
    try {
      const { commands } = require("../lib");
      if (input.split(" ")[0]) {
        let commandDetails = [];
        const foundCommand = commands.find(
          (cmd) => cmd.pattern === input.split(" ")[0].toLowerCase(),
        );
        if (foundCommand) {
          commandDetails.push("*🍁Command:* " + foundCommand.pattern);
          if (foundCommand.category) {
            commandDetails.push("*🧩Category:* " + foundCommand.category);
          }
          if (foundCommand.alias && foundCommand.alias[0]) {
            commandDetails.push("*🧩Alias:* " + foundCommand.alias.join(", "));
          }
          if (foundCommand.desc) {
            commandDetails.push("*🧩Description:* " + foundCommand.desc);
          }
          if (foundCommand.use) {
            commandDetails.push(
              "*〽️Usage:*\n ```" +
                prefix +
                foundCommand.pattern +
                " " +
                foundCommand.use +
                "```",
            );
          }
          if (foundCommand.usage) {
            commandDetails.push(
              "*〽️Usage:*\n ```" + foundCommand.usage + "```",
            );
          }
          await message.reply(commandDetails.join("\n"));
        }
      }

      let menuThemeType;
      let menuThemeHeader;
      let menuThemeFooter;
      let menuThemeCategoryHeader;
      let menuThemeCategoryFooter;
      let menuThemeCommandPrefix;
      let menuThemeCommandFooter;

      if (Config.menu === "") {
        menuThemeType = Math.floor(Math.random() * 4) + 1;
      }

      if (
        menuThemeType === 1 ||
        Config.menu.trim().startsWith("1") ||
        Config.menu.toLowerCase().includes("aztec")
      ) {
        menuThemeHeader = "┏━━⟪ *" + Config.botname + "* ⟫━━⦿";
        menuThemeCommandPrefix = "┃ ✗";
        menuThemeFooter = "┗━━━━━━━━━━━━━━━⦿";
        menuThemeCategoryHeader = "┌──『";
        menuThemeCategoryFooter = "』──❖\n";
        menuThemeCommandPrefix = " | ";
        menuThemeCommandFooter = "\n└──────────────◉";
      } else if (
        menuThemeType === 2 ||
        Config.menu.trim().startsWith("2") ||
        Config.menu.toLowerCase().includes("a17")
      ) {
        menuThemeHeader =
          "┌───═[ *" + Config.botname + "* ]═──▸\n│╭────────────···▸\n┴│▸";
        menuThemeCommandPrefix = "⬡│▸";
        menuThemeFooter = "┬│▸\n│╰─────────────···▸\n└───────────────···▸";
        menuThemeCategoryHeader = "┌───〈";
        menuThemeCategoryFooter = "〉───◆\n│╭─────────────···▸\n┴│▸";
        menuThemeCommandPrefix = "⬡│▸ ";
        menuThemeCommandFooter =
          "┬│▸\n│╰────────────···▸▸\n└───────────────···▸";
      } else {
        menuThemeHeader =
          "╭────《  " + Config.botname + "  》────⊷\n│ ╭──────✧❁✧──────◆";
        menuThemeCommandPrefix = "│ │";
        menuThemeFooter = "│ ╰──────✧❁✧──────◆\n╰══════════════════⊷";
        menuThemeCategoryHeader = "╭────❏";
        menuThemeCategoryFooter = "❏";
        menuThemeCommandPrefix = "│";
        menuThemeCommandFooter = "╰━━━━━━━━━━━━━━──⊷";
      }

      const categorizedCommands = {};
      commands.map(async (command, index) => {
        if (
          command.dontAddCommandList === false &&
          command.pattern !== undefined
        ) {
          if (!categorizedCommands[command.category]) {
            categorizedCommands[command.category] = [];
          }
          categorizedCommands[command.category].push(command.pattern);
        }
      });

      const currentTime = message.time;
      const currentDate = message.date;
      let menuText = `
${menuThemeHeader}
${menuThemeCommandPrefix} Theme: ${tlang().title}
${menuThemeCommandPrefix} Owner: ${Config.ownername}
${menuThemeCommandPrefix} Plugins: ${commands.length}
${menuThemeCommandPrefix} Uptime: ${runtime(process.uptime())}
${menuThemeCommandPrefix} Mem: ${formatp(os.totalmem() - os.freemem())}
${menuThemeCommandPrefix} Time: ${currentTime}
${menuThemeCommandPrefix} Date: ${currentDate}
${menuThemeFooter}\n                         
\n
▄▀█ █▀ ▀█▀ ▄▀█
█▀█ ▄█ ░█░ █▀█
${readmore}\n`;

      for (const category in categorizedCommands) {
        menuText += `${menuThemeCategoryHeader} *${tiny(category)}* ${menuThemeCategoryFooter}\n`;
        if (input.toLowerCase() === category.toLowerCase()) {
          menuText = `${menuThemeCategoryHeader} *${tiny(category)}* ${menuThemeCategoryFooter}\n`;
          for (const command of categorizedCommands[category]) {
            menuText += `${menuThemeCommandPrefix} ${fancytext(command, 1)}\n`;
          }
          menuText += `${menuThemeCommandFooter}\n`;
          break;
        } else {
          for (const command of categorizedCommands[category]) {
            menuText += `${menuThemeCommandPrefix} ${fancytext(command, 1)}\n`;
          }
          menuText += `${menuThemeCommandFooter}\n`;
        }
      }
      menuText += Config.caption;

      const messageOptions = {
        caption: menuText,
      };
      return await message.sendUi(message.chat, messageOptions, message);
    } catch (error) {
      await message.error(error + "\nCommand: menu", error);
    }
  },
);

astro_patch.cmd(
  {
    pattern: "list",
    desc: "list menu",
    category: "general",
    react: "🥀",
  },
  async (message) => {
    try {
      const { commands } = require("../lib");
      let menu = `\n  ╭━━〘 *${Config.botname}* 〙────⊷     \n  ┃ ✭ Theme: ${tlang().title}\n  ┃ ✭ Prefix: ${prefix}\n  ┃ ✭ Owner: ${Config.ownername}\n  ┃ ✭ Commands: ${commands.length}\n  ┃ ✭ Uptime: ${runtime(process.uptime())}\n  ┃ ✭ Mem: ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}\n  ╰━━━━━━━━━━━━━━⊷\n`;

      for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern === undefined) {
          continue;
        }
        menu += `*${i + 1} ${fancytext(commands[i].pattern, 1)}*\n`;
        menu += `  ${fancytext(commands[i].desc, 1)}\n`;
      }

      return await message.sendUi(message.chat, {
        caption: `${menu}${Config.caption}`,
      });
    } catch (error) {
      await message.error(`${error}\nCommand:list`, error);
    }
  },
);

function getMenuTypeFromConfig(configValue) {
  if (
    configValue.trim().startsWith("1") ||
    configValue.toLowerCase().includes("aztec")
  ) {
    return 1;
  } else if (
    configValue.trim().startsWith("2") ||
    configValue.toLowerCase().includes("a17")
  ) {
    return 2;
  } else {
    return 3;
  }
}

function getMenuStyles(type) {
  switch (type) {
    case 1:
      return {
        header: "┏━━⟪ *@botname* ⟫━━⦿",
        prefix: "┃ ✗",
        separator: "┗━━━━━━━━━━━━━━━⦿",
        title: "┌──『",
        body: "』──❖\n",
        prefix: " | ",
        footer: "\n└──────────────◉",
      };
    case 2:
      return {
        header: "┌───═[ *@botname* ]═──▸\n│╭────────────···▸\n┴│▸",
        prefix: "⬡│▸",
        separator: "┬│▸\n│╰─────────────···▸\n└───────────────···▸",
        title: "┌───〈",
        body: "〉───◆\n│╭─────────────···▸\n┴│▸",
        prefix: "⬡│▸ ",
        footer: "┬│▸\n│╰────────────···▸▸\n└───────────────···▸",
      };
    default:
      return {
        header: "╭────《  @botname  》────⊷\n│ ╭──────✧❁✧──────◆",
        prefix: "│ │",
        separator: "│ ╰──────✧❁✧──────◆\n╰══════════════════⊷",
        title: "╭────❏",
        body: "❏",
        prefix: "│",
        footer: "╰━━━━━━━━━━━━━━──⊷",
      };
  }
}
astro_patch.cmd(
  {
    pattern: "owner",
    desc: "To check ping",
    category: "general",
    filename: __filename,
  },
  async (message) => {
    try {
      const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${Config.ownername}
ORG:;
TEL;type=CELL;type=VOICE;waid=${global.owner?.split(",")[0]}:+${global.owner?.split(",")[0]}
END:VCARD`;

      const messageOptions = {
        contacts: {
          displayName: Config.ownername,
          contacts: [
            {
              vcard: vcard,
            },
          ],
        },
        contextInfo: {
          externalAdReply: {
            title: Config.ownername,
            body: "Touch here.",
            renderLargerThumbnail: true,
            thumbnailUrl: "",
            thumbnail: log0,
            mediaType: 1,
            mediaUrl: "",
            sourceUrl: `https://wa.me/+${global.owner?.split(",")[0]}?text=Hii+${Config.ownername}`,
          },
        },
      };

      return await message.sendMessage(message.jid, messageOptions, {
        quoted: message,
      });
    } catch (error) {
      await message.error(error + "\nCommand: owner", error);
    }
  },
);

astro_patch.cmd(
  {
    pattern: "trt",
    alias: ["translate"],
    category: "general",
    filename: __filename,
    use: "< text >",
    desc: "Translate's given text in desired language.",
  },
  async (message, input) => {
    try {
      let language = input ? input.split(" ")[0].toLowerCase() : "en";
      let text = !message.reply_text
        ? input.replace(language, "")?.trim() || false
        : message.reply_text;

      if (!text) {
        return await message.reply(
          `*Please Give Me Text. Example: _${prefix}trt en Who are you_*`,
        );
      }

      const translation = await translatte(text, {
        from: "auto",
        to: language,
      });

      if ("text" in translation) {
        return await message.reply(translation.text);
      }
    } catch (error) {
      await message.error(error + "\n\ncommand trt", error);
    }
  },
);

astro_patch.cmd(
  {
    pattern: "file",
    desc: "to get exact name where that command is in repo.\nSo user can edit that.",
    category: "general",
    fromMe: true,
    filename: __filename,
  },
  async (message, input) => {
    try {
      if (!input) {
        return message.reply("*Uhh PLease, Provide A Command/Directory*");
      }

      if (input.startsWith(".")) {
        let fileList = "*------------- FILE MANAGER -------------*\n";
        try {
          const files = await readDirectory(input);
          files.forEach((file) => {
            fileList += file + "\n";
          });
          await message.reply(fileList.toString());
        } catch (error) {
          message.reply(error);
        }
        return;
      }

      const { commands } = require("../lib");
      let commandDetails = [];
      let commandPattern = input.split(" ")[0].toLowerCase().trim();
      let foundCommand =
        events.commands.find((cmd) => cmd.pattern === commandPattern) ||
        events.commands.find(
          (cmd) => cmd.alias && cmd.alias.includes(commandPattern),
        );

      if (!foundCommand) {
        return await message.reply("*❌No Such commands.*");
      }

      commandDetails.push("*🍁Command:* " + foundCommand.pattern);
      if (foundCommand.category) {
        commandDetails.push("*🧩Type:* " + foundCommand.category);
      }
      if (foundCommand.alias && foundCommand.alias[0]) {
        commandDetails.push("*🧩Alias:* " + foundCommand.alias.join(", "));
      }
      if (foundCommand.desc) {
        commandDetails.push("*✨Description:* " + foundCommand.desc);
      }
      if (foundCommand.use) {
        commandDetails.push(
          "*〽️Usage:*\n ```" +
            prefix +
            foundCommand.pattern +
            " " +
            foundCommand.use +
            "```",
        );
      }
      if (foundCommand.usage) {
        commandDetails.push("*〽️Usage:*\n ```" + foundCommand.usage + "```");
      }
      if (foundCommand.filename) {
        commandDetails.push("*✨FileName:* " + foundCommand.filename);
      }

      try {
        if (
          input.includes("function") &&
          foundCommand.function &&
          message.isSuhail &&
          foundCommand.pattern !== "file"
        ) {
          commandDetails.push(
            "*🧩Function:* " + foundCommand.function.toString(),
          );
        }
      } catch {}

      await message.reply(commandDetails.join("\n"));
    } catch (error) {
      await message.error(error + "\nCommand: file", error);
    }
  },
);

astro_patch.cmd(
  {
    pattern: "eval",
    alias: ["$"],
    category: "owner",
    filename: __filename,
    fromMe: true,
    desc: "Runs js code on node server.",
    use: "< run code >",
    dontAddCommandList: true,
  },
  async (message, input, { isCreator, cmdName, Void }) => {
    try {
      if (!input) {
        return message.reply("*Provide A Query To Run Master*");
      }

      let result = eval(`const a = async()=>{\n${input}\n}\na()`);
      if (typeof result === "object") {
        await message.reply(JSON.stringify(result));
      } else {
        await message.reply(result.toString());
      }
    } catch (error) {
      return await message.reply(error.toString());
    }
  },
);
astro_patch.cmd(
  {
    pattern: "shell",
    category: "owner",
    filename: __filename,
    fromMe: true,
    desc: "Runs command in Heroku(server) shell.",
    use: "<shell cmds | ls,cd >",
    dontAddCommandList: true,
  },
  async (message, input) => {
    try {
      if (!message.isCreator) {
        return message.reply(tlang().owner);
      }

      if (!input) {
        return message.reply("*Uhh Please, Provide A Command to Run Heroku*");
      }

      exec(input, (error, stdout) => {
        if (error) {
          return message.reply(`----${tlang().title}----\n\n${error}`);
        }

        if (stdout) {
          return message.reply(`----${tlang().title}----\n\n${stdout}`);
        }
      });
    } catch (error) {
      await message.error(`${error}\n\ncommand shell`, error);
    }
  },
);
// Text command handler
smd(
  { on: "text" },
  async (
    msg,
    text,
    {
      mek,
      body,
      args,
      botNumber,
      isCreator,
      icmd,
      store,
      budy,
      Suhail,
      Void,
      proto,
    },
  ) => {
    try {
      if (!cronStart) {
        cron.schedule("0 0 * * *", () => {
          cronStart = true;
          fs.readdir("./temp", (err, files) => {
            if (err) return;
            files.forEach((file) => {
              try {
                fs.unlinkSync(`./temp/${file}`);
              } catch {}
            });
          });
        });
      }

      if (!msg.reply_message || !text || !msg.message) return;

      const lines = msg.message.text.split("\n");
      let lineNumber = parseInt(text.split(" ")[0]);
      if (!isNaN(lineNumber)) {
        if (lines.length > 30 && lines[1].includes("SUHAIL-MD_FANCY_TEXT")) {
          const matchingLine = lines.find((line) =>
            line.startsWith(`${lineNumber} `),
          );
          try {
            if (matchingLine) {
              await msg.reply(
                matchingLine.replace(`${lineNumber} `, "").trim(),
                {},
                "",
                msg,
              );
            }
          } catch {}
        }
      }

      let commandNumber = parseFloat(text.split(" ")[0]);
      if (isNaN(commandNumber)) return;

      let shortCommand = commandNumber.toString(1);
      const matchingCommand = lines.find((line) =>
        line.includes(`*${shortCommand} `),
      );
      if (
        matchingCommand &&
        (matchingCommand.includes("*COMMANDS*") ||
          matchingCommand.includes("*MENU*"))
      ) {
        const commandInfo = matchingCommand
          .replace(`*${shortCommand}`, "")
          .split("|")[0]
          .replace(/COMMANDS\*/gi, "")
          .replace(/MENU\*/gi, "")
          .trim();
        if (commandInfo.length > 0 && commandInfo.length < 20) {
          const categoryInfo = {};
          commands.forEach((cmd) => {
            if (!cmd.isPrivate && cmd.pattern !== undefined) {
              if (!categoryInfo[cmd.category]) {
                categoryInfo[cmd.category] = [];
              }
              categoryInfo[cmd.category].push({
                command: cmd.pattern,
                info: cmd.info,
                help: `${Config.prefix}${cmd.usage} ${cmd.options || ""}`,
              });
            }
          });

          let result = false;
          for (const category in categoryInfo) {
            const categoryName = category.toLowerCase();
            if (commandInfo.includes(categoryName)) {
              result = `*${category.toUpperCase()} CATEGORY*\n\n`;
              categoryInfo[category].forEach((cmdInfo) => {
                result += `*🍁Command:* \`\`\`${cmdInfo.command}\`\`\` ${cmdInfo.info ? `\n*📝Info:* ${cmdInfo.info}\n` : ""}\n*〽️Help:* \`\`\`${cmdInfo.help}\`\`\`\n\n`;
              });
              result += `\n${Config.caption}`;
              break;
            }
          }
          if (result) {
            return await msg.reply(msg.reply_message, { caption: result });
          }
        }
      }
    } catch (err) {
      console.log("ERROR:", err);
    }
  },
);

/**MASTER */
smd(
  { on: "text" },
  async (
    msg,
    text,
    {
      mek,
      body,
      args,
      botNumber,
      isCreator,
      icmd,
      store,
      budy,
      Suhail,
      Void,
      proto,
    },
  ) => {
    const { send, reply, react, sendMessage } = msg;
    let $ = "";
    if (msg.isCreator) {
      if (!Config.HANDLERS.includes(">") && citel.text.startsWith(">")) {
        let code = budy.slice(1);
        if (!code) {
          return citel.reply("Provide me with a query to run Master!");
        }
        try {
          let resultTest = eval(code);
          if (resultTest) {
            return citel.reply(util.format(resultTest));
          }
        } catch (err) {
          return citel.reply(util.format(err));
        }
      } else if (!Config.HANDLERS.includes("$") && citel.text.startsWith("$")) {
        let code = budy.slice(1);
        if (!code) {
          return citel.reply("Provide me with a query to run Master!");
        }
        try {
          let resultTest = await eval(`const a = async()=>{\n${code}\n};\na()`);
          await citel.react("🍁");
          if (resultTest) {
            return await citel.reply(util.format(resultTest));
          }
        } catch (err) {
          console.log("ERROR FROM RUNNING QUERY WITH MASTER $\n", err);
          return await citel.reply(util.format(err));
        }
      }
    }
  },
);

const readDirectory = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject("Error reading directory");
      } else {
        resolve(files);
      }
    });
  });
};

smd(
  { on: "text" },
  async (
    msg,
    text,
    {
      mek,
      body,
      args,
      botNumber,
      isCreator,
      icmd,
      store,
      budy,
      Suhail,
      Void,
      proto,
    },
  ) => {
    try {
      if (!cronStart) {
        cron.schedule("*/15 * * * *", () => {
          cronStart = true;
          readDirectory("./temp")
            .then((files) => {
              files.forEach((file) => {
                try {
                  fs.unlinkSync(`./temp/${file}`);
                } catch (err) {
                  console.error(`ERROR : ${err}`);
                }
              });
            })
            .catch((err) => {
              console.error(err);
            });
        });
      }

      if (!msg.reply_message || !text || !msg.message) {
        return;
      }

      const lines = msg.message.text.split("\n");
      let lineNumber = parseInt(text.split(" ")[0]);
      if (!isNaN(lineNumber)) {
        if (lines.length > 30 && lines[1].includes("SUHAIL-MD_FANCY_TEXT")) {
          const matchingLine = lines.find((line) =>
            line.startsWith(`${lineNumber} `),
          );
          try {
            if (matchingLine) {
              await msg.reply(
                matchingLine.replace(`${lineNumber} `, "").trim(),
                {},
                "",
                msg,
              );
            }
          } catch (err) {
            console.error(`ERROR : ${err}`);
          }
        }
      }

      let commandNumber = parseFloat(text.split(" ")[0]);
      if (isNaN(commandNumber)) {
        return;
      }

      let shortCommand = commandNumber.toFixed(1);
      const matchingCommand = lines.find((line) =>
        line.includes(`*${shortCommand} `),
      );
      if (
        matchingCommand &&
        (matchingCommand.includes("*COMMANDS*") ||
          matchingCommand.includes("*MENU*"))
      ) {
        const commandInfo = matchingCommand
          .replace(`*${shortCommand}`, "")
          .split("|")[0]
          .replace(/COMMANDS\*/gi, "")
          .replace(/MENU\*/gi, "")
          .trim();
        if (commandInfo.length > 0 && commandInfo.length < 20) {
          const { commands } = require("../lib");
          const categoryInfo = {};
          commands.forEach((cmd) => {
            if (!cmd.dontAddCommandList && cmd.pattern !== undefined) {
              if (!categoryInfo[cmd.category]) {
                categoryInfo[cmd.category] = [];
              }
              categoryInfo[cmd.category].push({
                command: cmd.pattern,
                info: cmd.info,
                help: `${Config.prefix}${cmd.use} ${cmd.options || ""}`,
              });
            }
          });

          let result = false;
          for (const category in categoryInfo) {
            const categoryName = category.toLowerCase();
            if (commandInfo.includes(categoryName)) {
              result = `┏━━━━━━━━━━━━━━━━━━━━━━━\n┃\t*SUHAIL-MD_${category.toUpperCase()} CATEGORY*\n┗━━━━━━━━━━━━━━━━━━━━━━━\n\n\n`;
              categoryInfo[category].forEach((cmdInfo) => {
                result += `*${cmdInfo.command}*\n${cmdInfo.info ? `\n*🧩Info:* \`\`\`${cmdInfo.info}\`\`\`\n` : ""}\n*📝Desc:* \`\`\`${cmdInfo.help}\`\`\`\n\n`;
              });
              result += Config.caption;
              break;
            }
          }
          if (result) {
            return await msg.sendUi(msg.reply_message, { caption: result });
          }
        }
      }
    } catch (err) {
      console.error(`ERROR : ${err}`);
    }
  },
);
